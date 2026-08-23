/**
 * Direct Google Gemini API (no Lovable gateway).
 * Set GEMINI_API_KEY in Netlify (from Google AI Studio).
 */

const BASE = "https://generativelanguage.googleapis.com/v1beta";

const TEXT_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
] as const;

export const GEMINI_TEXT_MODEL = TEXT_MODELS[0];
/** Image model for covers + lyric scenes. */
export const GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image";

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  return key.replace(/^["']|["']$/g, "");
}

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType: string; data: string };
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; inlineData?: { mimeType?: string; data?: string } }> };
    finishReason?: string;
  }>;
  error?: { message?: string; code?: number };
};

async function generateContent(
  model: string,
  body: Record<string, unknown>,
): Promise<GeminiResponse> {
  const key = getGeminiApiKey();
  const res = await fetch(`${BASE}/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as GeminiResponse;
  if (!res.ok) {
    throw new Error(json.error?.message ?? `Gemini error ${res.status}`);
  }
  return json;
}

export async function geminiJsonObject(
  system: string,
  user: string,
): Promise<Record<string, unknown>> {
  let lastErr: Error | null = null;

  for (const model of TEXT_MODELS) {
    try {
      const json = await generateContent(model, {
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.9,
        },
      });
      const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
      if (!text) {
        throw new Error(`${model}: empty response (${json.candidates?.[0]?.finishReason ?? "empty"})`);
      }
      try {
        return JSON.parse(text) as Record<string, unknown>;
      } catch {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) return JSON.parse(match[0]) as Record<string, unknown>;
        throw new Error(`${model}: response was not valid JSON`);
      }
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      const msg = lastErr.message.toLowerCase();
      if (
        msg.includes("api key") ||
        msg.includes("permission") ||
        msg.includes("403") ||
        msg.includes("401") ||
        msg.includes("quota") ||
        msg.includes("resource_exhausted")
      ) {
        break;
      }
    }
  }

  throw lastErr ?? new Error("Gemini request failed");
}

export async function geminiGenerateImage(prompt: string): Promise<string> {
  const json = await generateContent(GEMINI_IMAGE_MODEL, {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) return part.inlineData.data;
  }
  throw new Error("No image returned from Gemini");
}

export async function geminiTranscribeAudio(opts: {
  prompt: string;
  mimeType: string;
  base64: string;
}): Promise<string> {
  const parts: GeminiPart[] = [
    { text: opts.prompt },
    { inlineData: { mimeType: opts.mimeType, data: opts.base64 } },
  ];
  let lastErr: Error | null = null;
  for (const model of TEXT_MODELS) {
    try {
      const json = await generateContent(model, {
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });
      const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "{}";
      if (text.trim()) return text;
      throw new Error(`${model}: empty transcript`);
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
    }
  }
  throw lastErr ?? new Error("Transcription failed");
}
