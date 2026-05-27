import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";

async function generateOneImage(apiKey: string, prompt: string, size = "1024x1024"): Promise<string> {
  const res = await fetch(`${GATEWAY}/images/generations`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-image-2",
      prompt,
      quality: "low",
      size,
      n: 1,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image generation failed: ${res.status} ${text}`);
  }
  const json = (await res.json()) as { data?: Array<{ b64_json?: string }> };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image returned");
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

    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2",
        prompt,
        quality: "low",
        size: "1024x1024",
        n: 1,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Image generation failed: ${res.status} ${text}`);
    }
    const json = (await res.json()) as { data?: Array<{ b64_json?: string }> };
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image returned");
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
    const images = await Promise.all(prompts.map((p) => generateOneImage(apiKey, p, "1024x1536")));
    return { images };
  });