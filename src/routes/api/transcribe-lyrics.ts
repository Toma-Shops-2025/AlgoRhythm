import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { userIsPro } from "@/lib/pro.server";
import { geminiTranscribeAudio } from "@/lib/gemini.server";

type LyricLine = { start: number; end: number; text: string };

function pickAudioMime(mime: string, name: string): string {
  const m = mime.toLowerCase();
  if (m.includes("mpeg") || m.includes("mp3") || /\.mp3$/i.test(name)) return "audio/mpeg";
  if (m.includes("wav") || /\.wav$/i.test(name)) return "audio/wav";
  if (m.includes("ogg") || /\.ogg$/i.test(name)) return "audio/ogg";
  if (m.includes("flac") || /\.flac$/i.test(name)) return "audio/flac";
  if (m.includes("aac") || /\.aac$/i.test(name)) return "audio/aac";
  if (m.includes("webm") || /\.webm$/i.test(name)) return "audio/webm";
  if (m.includes("mp4") || m.includes("m4a") || /\.(m4a|mp4)$/i.test(name)) return "audio/mp4";
  return mime || "audio/mpeg";
}

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function distributeEvenly(text: string, duration: number): LyricLine[] {
  const lines = text
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^\[.*\]$/.test(s));
  if (lines.length === 0) return [];
  const per = duration / lines.length;
  return lines.map((text, i) => ({ start: i * per, end: (i + 1) * per, text }));
}

export const Route = createFileRoute("/api/transcribe-lyrics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
          return new Response(JSON.stringify({ error: "Auth not configured" }), { status: 500 });
        }
        const sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
        });
        const { data: claims, error: claimsErr } = await sb.auth.getClaims(token);
        if (claimsErr || !claims?.claims?.sub) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const userId = claims.claims.sub as string;
        const email =
          typeof claims.claims.email === "string" ? (claims.claims.email as string) : null;
        if (!(await userIsPro(userId, email))) {
          return new Response(
            JSON.stringify({ error: "AI lyric transcription is a Pro feature. Upgrade to Pro to unlock it." }),
            { status: 402 },
          );
        }

        const form = await request.formData();
        const file = form.get("audio");
        const durationRaw = form.get("duration");
        const duration = typeof durationRaw === "string" ? parseFloat(durationRaw) : 0;
        if (!(file instanceof File)) {
          return new Response(JSON.stringify({ error: "missing audio file" }), { status: 400 });
        }
        if (file.size > 20 * 1024 * 1024) {
          return new Response(JSON.stringify({ error: "Audio too large for transcription (max 20MB)" }), { status: 400 });
        }

        const buf = new Uint8Array(await file.arrayBuffer());
        const b64 = toBase64(buf);
        const mimeType = pickAudioMime(file.type || "", file.name || "");

        const prompt =
          "Transcribe the vocals of this song into lyric lines with timing. " +
          "Return ONLY valid JSON of the shape " +
          `{"lines":[{"start":<seconds>,"end":<seconds>,"text":"<one lyric line>"}]} ` +
          "with no markdown. Keep each line short (3-10 words). " +
          "If the song is instrumental or you cannot make out lyrics, return {\"lines\":[]}.";

        try {
          const content = await geminiTranscribeAudio({ prompt, mimeType, base64: b64 });
          let parsed: { lines?: unknown };
          try {
            parsed = JSON.parse(content);
          } catch {
            const match = content.match(/\{[\s\S]*\}/);
            parsed = match ? JSON.parse(match[0]) : {};
          }
          let lines: LyricLine[] = [];
          if (Array.isArray(parsed.lines)) {
            lines = (parsed.lines as Array<Record<string, unknown>>)
              .map((l) => ({
                start: Number(l.start ?? 0),
                end: Number(l.end ?? 0),
                text: String(l.text ?? "").trim(),
              }))
              .filter((l) => l.text.length > 0 && Number.isFinite(l.start) && Number.isFinite(l.end));
          }
          if (lines.length === 0 && duration > 0 && content.trim()) {
            lines = distributeEvenly(content, duration);
          }
          lines.sort((a, b) => a.start - b.start);
          if (duration > 0) {
            lines = lines.map((l) => ({
              ...l,
              start: Math.max(0, Math.min(duration, l.start)),
              end: Math.max(0, Math.min(duration, l.end || l.start + 3)),
            }));
          }
          return Response.json({ lines });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Transcription failed";
          return new Response(JSON.stringify({ error: msg }), { status: 502 });
        }
      },
    },
  },
});
