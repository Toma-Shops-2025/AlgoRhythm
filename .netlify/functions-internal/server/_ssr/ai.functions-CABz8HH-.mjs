import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { u as userIsPro, P as ProRequiredError, g as geminiJsonObject, a as geminiGenerateImage } from "./gemini.server-Blu19axI.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, e as enumType, s as stringType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client.server-LV8D9vnO.mjs";
function claimEmail(claims) {
  return typeof claims?.email === "string" ? claims.email : null;
}
const generatePostMetadata_createServerFn_handler = createServerRpc({
  id: "caddf6fb90b8e97b64f718ef8c86ac722a1da6bfaca886e671a553653c67b259",
  name: "generatePostMetadata",
  filename: "src/lib/ai.functions.ts"
}, (opts) => generatePostMetadata.__executeServer(opts));
const generatePostMetadata = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  idea: stringType().min(2).max(500),
  mediaType: enumType(["audio", "video"]).optional()
}).parse(input)).handler(generatePostMetadata_createServerFn_handler, async ({
  data,
  context
}) => {
  const email = claimEmail(context.claims);
  if (!await userIsPro(context.userId, email)) throw new ProRequiredError();
  const kind = data.mediaType ?? "audio";
  const system = "You are a music marketing copywriter for AI-made tracks and music videos. Write punchy, scroll-stopping copy in the voice of an artist — confident, modern, no corporate fluff, no emojis unless they really fit. Return ONLY valid JSON matching the requested schema, nothing else.";
  const user = `Generate post metadata for an AI-made ${kind} post on a social feed. Source idea: "${data.idea}".

Return JSON with exactly these keys:
- "title": string, 3-8 words, headline-style, no quotes, no trailing punctuation
- "caption": string, 1-3 short sentences (max ~220 chars), hook the listener
- "hashtags": array of 6-10 lowercase hashtag strings WITHOUT the # symbol, no spaces, relevant to genre/mood/AI-music culture`;
  const parsed = await geminiJsonObject(system, user);
  const hashtags = Array.isArray(parsed.hashtags) ? parsed.hashtags.map((t) => String(t).replace(/^#/, "").trim().toLowerCase().replace(/\s+/g, "")).filter(Boolean).slice(0, 12) : [];
  return {
    title: String(parsed.title ?? "").trim().slice(0, 140),
    caption: String(parsed.caption ?? "").trim().slice(0, 2e3),
    hashtags
  };
});
async function generateOneImageWithRetry(prompt, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await geminiGenerateImage(prompt);
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Image generation failed");
}
const generateCoverImage_createServerFn_handler = createServerRpc({
  id: "fe49f39b9fe191c28a813af5ab418392190eca0e6f2c2f3f3032d0b13a158913",
  name: "generateCoverImage",
  filename: "src/lib/ai.functions.ts"
}, (opts) => generateCoverImage.__executeServer(opts));
const generateCoverImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500)
}).parse(input)).handler(generateCoverImage_createServerFn_handler, async ({
  data,
  context
}) => {
  const email = claimEmail(context.claims);
  if (!await userIsPro(context.userId, email)) throw new ProRequiredError();
  const prompt = `Square album cover art for a track titled or themed: "${data.prompt}". Striking, modern, high-contrast, cinematic lighting, no text, no watermark.`;
  const b64 = await geminiGenerateImage(prompt);
  return {
    b64
  };
});
const generateMusicVideoScenes_createServerFn_handler = createServerRpc({
  id: "3ad115ed8cea7df480a8b1aa5a7060d4a2ef7d3588e40e75036e22671254d41b",
  name: "generateMusicVideoScenes",
  filename: "src/lib/ai.functions.ts"
}, (opts) => generateMusicVideoScenes.__executeServer(opts));
const generateMusicVideoScenes = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500),
  count: numberType().int().min(2).max(8).optional(),
  style: stringType().max(200).optional()
}).parse(input)).handler(generateMusicVideoScenes_createServerFn_handler, async ({
  data,
  context
}) => {
  const email = claimEmail(context.claims);
  if (!await userIsPro(context.userId, email)) throw new ProRequiredError();
  const count = data.count ?? 5;
  const style = data.style?.trim() || "cinematic music video still, dramatic lighting, rich color grading, shallow depth of field, 35mm film grain, no text, no watermark";
  const shots = ["wide establishing shot", "intimate close-up portrait", "low angle hero shot", "dreamy slow-motion moment", "neon-lit atmospheric scene", "high contrast silhouette", "overhead aerial composition", "soft golden hour wide"];
  const prompts = Array.from({
    length: count
  }, (_, i) => `${shots[i % shots.length]} for a music video about: "${data.prompt}". ${style}. 9:16 vertical framing.`);
  const settled = await Promise.all(prompts.map((p) => generateOneImageWithRetry(p).catch(() => null)));
  const good = settled.filter((b) => !!b);
  if (good.length < 2) {
    throw new Error("Could not generate enough scenes. Please try again with a different description.");
  }
  const images = settled.map((b, i) => b ?? good[i % good.length]);
  return {
    images
  };
});
export {
  generateCoverImage_createServerFn_handler,
  generateMusicVideoScenes_createServerFn_handler,
  generatePostMetadata_createServerFn_handler
};
