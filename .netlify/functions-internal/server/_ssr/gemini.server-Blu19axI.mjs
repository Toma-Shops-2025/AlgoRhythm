import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
const ADMIN_EMAILS = /* @__PURE__ */ new Set(["admin@myalgorhythm.online"]);
async function userIsPro(userId, email) {
  if (email && ADMIN_EMAILS.has(email.trim().toLowerCase())) return true;
  try {
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: userId,
      _role: "admin"
    });
    if (isAdmin) return true;
  } catch {
  }
  try {
    const { data: roleRow } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    if (roleRow) return true;
  } catch {
  }
  const { data } = await supabaseAdmin.from("subscriptions").select("status, current_period_end").eq("user_id", userId).eq("kind", "pro").order("created_at", { ascending: false }).limit(5);
  if (!data || data.length === 0) return false;
  const now = Date.now();
  return data.some((s) => {
    const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
    const future = end > now;
    if (["active", "trialing", "past_due"].includes(s.status)) return future;
    if (s.status === "canceled") return future;
    return false;
  });
}
class ProRequiredError extends Error {
  constructor() {
    super("AI features are a Pro perk. Upgrade to Pro to use AI cover art, captions, lyric videos, and scene generation.");
    this.name = "ProRequiredError";
  }
}
const BASE = "https://generativelanguage.googleapis.com/v1beta";
const TEXT_MODELS = ["gemini-3.6-flash", "gemini-3.5-flash-lite"];
const FETCH_MS = 18e3;
TEXT_MODELS[0];
const GEMINI_IMAGE_MODEL = "gemini-3.1-flash-lite-image";
function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  return key.replace(/^["']|["']$/g, "");
}
async function generateContent(model, body) {
  const key = getGeminiApiKey();
  let res;
  try {
    res = await fetch(`${BASE}/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(FETCH_MS)
    });
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      throw new Error(`${model}: timed out — try again in a moment`);
    }
    throw e instanceof Error ? e : new Error(String(e));
  }
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message ?? `Gemini error ${res.status}`);
  }
  return json;
}
async function geminiJsonObject(system, user) {
  let lastErr = null;
  for (const model of TEXT_MODELS) {
    try {
      const json = await generateContent(model, {
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.9
        }
      });
      const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
      if (!text) {
        throw new Error(`${model}: empty response (${json.candidates?.[0]?.finishReason ?? "empty"})`);
      }
      try {
        return JSON.parse(text);
      } catch {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) return JSON.parse(match[0]);
        throw new Error(`${model}: response was not valid JSON`);
      }
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      const msg = lastErr.message.toLowerCase();
      if (msg.includes("api key") || msg.includes("permission") || msg.includes("403") || msg.includes("401") || msg.includes("quota") || msg.includes("resource_exhausted")) {
        break;
      }
    }
  }
  throw lastErr ?? new Error("Gemini request failed");
}
async function geminiGenerateImage(prompt) {
  const json = await generateContent(GEMINI_IMAGE_MODEL, {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"]
    }
  });
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) return part.inlineData.data;
  }
  throw new Error("No image returned from Gemini");
}
async function geminiTranscribeAudio(opts) {
  const parts = [
    { text: opts.prompt },
    { inlineData: { mimeType: opts.mimeType, data: opts.base64 } }
  ];
  let lastErr = null;
  for (const model of TEXT_MODELS) {
    try {
      const json = await generateContent(model, {
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
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
export {
  ProRequiredError as P,
  geminiGenerateImage as a,
  geminiTranscribeAudio as b,
  geminiJsonObject as g,
  userIsPro as u
};
