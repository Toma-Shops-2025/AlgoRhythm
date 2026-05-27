import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";

export const generatePostMetadata = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { idea: string; mediaType?: "audio" | "video" }) =>
    z
      .object({
        idea: z.string().min(2).max(500),
        mediaType: z.enum(["audio", "video"]).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const kind = data.mediaType ?? "audio";
    const system =
      "You are a music marketing copywriter for AI-made tracks and music videos. " +
      "Write punchy, scroll-stopping copy in the voice of an artist — confident, modern, no corporate fluff, no emojis unless they really fit. " +
      "Return ONLY valid JSON matching the requested schema, nothing else.";
    const user =
      `Generate post metadata for an AI-made ${kind} post on a social feed. Source idea: "${data.idea}".\n\n` +
      `Return JSON with exactly these keys:\n` +
      `- "title": string, 3-8 words, headline-style, no quotes, no trailing punctuation\n` +
      `- "caption": string, 1-3 short sentences (max ~220 chars), hook the listener\n` +
      `- "hashtags": array of 6-10 lowercase hashtag strings WITHOUT the # symbol, no spaces, relevant to genre/mood/AI-music culture`;

    const res = await fetch(`${GATEWAY}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Metadata generation failed: ${res.status} ${text}`);
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    let parsed: { title?: string; caption?: string; hashtags?: unknown };
    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }
    const hashtags = Array.isArray(parsed.hashtags)
      ? (parsed.hashtags as unknown[])
          .map((t) => String(t).replace(/^#/, "").trim().toLowerCase().replace(/\s+/g, ""))
          .filter(Boolean)
          .slice(0, 12)
      : [];
    return {
      title: String(parsed.title ?? "").trim().slice(0, 140),
      caption: String(parsed.caption ?? "").trim().slice(0, 2000),
      hashtags,
    };
  });

// Lovable AI Gateway exposes image generation via the chat/completions
// endpoint on Gemini "image" models. The model returns the image as a
// data URL inside choices[0].message.images[].image_url.url. We strip the
// data-URL prefix and return raw base64.
async function generateOneImage(apiKey: string, prompt: string): Promise<string> {
  const res = await fetch(`${GATEWAY}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image generation failed: ${res.status} ${text}`);
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
  };
  const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!url) throw new Error("No image returned");
  const b64 = url.startsWith("data:") ? url.split(",")[1] : url;
  if (!b64) throw new Error("Empty image payload");
  return b64;
}

export const generateCoverImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { prompt: string }) =>
    z.object({ prompt: z.string().min(2).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Square album cover art for a track titled or themed: "${data.prompt}". Striking, modern, high-contrast, cinematic lighting, no text, no watermark.`;

    const b64 = await generateOneImage(apiKey, prompt);
    return { b64 };
  });

export const generateMusicVideoScenes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { prompt: string; count?: number; style?: string }) =>
      z
        .object({
          prompt: z.string().min(2).max(500),
          count: z.number().int().min(2).max(8).optional(),
          style: z.string().max(200).optional(),
        })
        .parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const count = data.count ?? 5;
    const style =
      data.style?.trim() ||
      "cinematic music video still, dramatic lighting, rich color grading, shallow depth of field, 35mm film grain, no text, no watermark";

    // Diverse shot angles so the slideshow feels like an edited video.
    const shots = [
      "wide establishing shot",
      "intimate close-up portrait",
      "low angle hero shot",
      "dreamy slow-motion moment",
      "neon-lit atmospheric scene",
      "high contrast silhouette",
      "overhead aerial composition",
      "soft golden hour wide",
    ];

    const prompts = Array.from({ length: count }, (_, i) =>
      `${shots[i % shots.length]} for a music video about: "${data.prompt}". ${style}. 9:16 vertical framing.`,
    );

    // Generate in parallel for speed.
    const images = await Promise.all(prompts.map((p) => generateOneImage(apiKey, p)));
    return { images };
  });