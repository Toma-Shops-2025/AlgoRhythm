/**
 * Direct Google Gemini API (no Lovable gateway).
 * Set GEMINI_API_KEY in Netlify (from Google AI Studio).
 */

const BASE = "https://generativelanguage.googleapis.com/v1beta";

/** Cheap text model for captions / metadata. */
export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-lite";
/** Image model for covers + lyric scenes. */
export const GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image";

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  return key;
}

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType: string; data: string };
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; inlineData?: { mimeType?: string; data?: string } }> };
  }>;
  error?: { message?: string; code?: number };
};

async function generateContent(
  model: string,
  body: Record<string, unknown>,
): Promise<GeminiResponse> {
  const key = getGeminiApiKey();
  const res = await fetch(`${BASE}/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  model = GEMINI_TEXT_MODEL,
): Promise<Record<string, unknown>> {
  const json = await generateContent(model, {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.9,
    },
  });
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "{}";
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? (JSON.parse(match[0]) as Record<string, unknown>) : {};
  }
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
  const json = await generateContent(GEMINI_TEXT_MODEL, {
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });
  return json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "{}";
}
