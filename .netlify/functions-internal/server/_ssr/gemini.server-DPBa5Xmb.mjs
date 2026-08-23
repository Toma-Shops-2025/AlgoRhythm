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
const GEMINI_TEXT_MODEL = "gemini-2.5-flash-lite";
const GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image";
function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  return key;
}
async function generateContent(model, body) {
  const key = getGeminiApiKey();
  const res = await fetch(`${BASE}/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message ?? `Gemini error ${res.status}`);
  }
  return json;
}
async function geminiJsonObject(system, user, model = GEMINI_TEXT_MODEL) {
  const json = await generateContent(model, {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.9
    }
  });
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "{}";
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  }
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
  const json = await generateContent(GEMINI_TEXT_MODEL, {
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  });
  return json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "{}";
}
export {
  ProRequiredError as P,
  geminiGenerateImage as a,
  geminiTranscribeAudio as b,
  geminiJsonObject as g,
  userIsPro as u
};
