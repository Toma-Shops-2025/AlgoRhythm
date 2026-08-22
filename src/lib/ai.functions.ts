import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { userIsPro, ProRequiredError } from "./pro.server";
import { geminiJsonObject, geminiGenerateImage } from "./gemini.server";

function claimEmail(claims: { email?: unknown } | undefined): string | null {
  return typeof claims?.email === "string" ? claims.email : null;
}

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
  .handler(async ({ data, context }) => {
    const email = claimEmail(context.claims);
    if (!(await userIsPro(context.userId, email))) throw new ProRequiredError();

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

    const parsed = await geminiJsonObject(system, user);
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

async function generateOneImageWithRetry(prompt: string, attempts = 3): Promise<string> {
  let lastErr: unknown;
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

export const generateCoverImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { prompt: string }) =>
    z.object({ prompt: z.string().min(2).max(500) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const email = claimEmail(context.claims);
    if (!(await userIsPro(context.userId, email))) throw new ProRequiredError();

    const prompt = `Square album cover art for a track titled or themed: "${data.prompt}". Striking, modern, high-contrast, cinematic lighting, no text, no watermark.`;
    const b64 = await geminiGenerateImage(prompt);
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
  .handler(async ({ data, context }) => {
    const email = claimEmail(context.claims);
    if (!(await userIsPro(context.userId, email))) throw new ProRequiredError();

    const count = data.count ?? 5;
    const style =
      data.style?.trim() ||
      "cinematic music video still, dramatic lighting, rich color grading, shallow depth of field, 35mm film grain, no text, no watermark";

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

    const settled = await Promise.all(
      prompts.map((p) => generateOneImageWithRetry(p).catch(() => null)),
    );
    const good = settled.filter((b): b is string => !!b);
    if (good.length < 2) {
      throw new Error("Could not generate enough scenes. Please try again with a different description.");
    }
    const images = settled.map((b, i) => b ?? good[i % good.length]);
    return { images };
  });
