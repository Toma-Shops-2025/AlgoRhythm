import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Bots love unverified accounts. Require a confirmed email before any user
// can post or comment. We check the auth.users row via the service-role client
// because the JWT does not include `email_confirmed_at`.
export async function requireVerifiedEmail(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (error) throw new Error(error.message);
  if (!data.user?.email_confirmed_at) {
    throw new Error(
      "Please verify your email before posting. Check your inbox for a confirmation link.",
    );
  }
}

const STORAGE_BASE = `${process.env.SUPABASE_URL ?? ""}/storage/v1/object/public/`;
const isBucketUrl = (bucket: string) => (u: string) =>
  STORAGE_BASE !== "/storage/v1/object/public/" && u.startsWith(`${STORAGE_BASE}${bucket}/`);

export const createPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      type: "audio" | "video";
      mediaUrl: string;
      coverUrl?: string | null;
      title: string;
      description?: string;
      tags?: string[];
      aiTools?: string[];
      durationSeconds?: number | null;
    }) =>
      z
        .object({
          type: z.enum(["audio", "video"]),
          mediaUrl: z
            .string()
            .url()
            .refine(isBucketUrl("media"), "mediaUrl must point to the media bucket"),
          coverUrl: z
            .string()
            .url()
            .refine(isBucketUrl("covers"), "coverUrl must point to the covers bucket")
            .nullish(),
          title: z.string().min(1).max(140),
          description: z.string().max(2000).optional(),
          tags: z.array(z.string().min(1).max(40)).max(12).optional(),
          aiTools: z.array(z.string().min(1).max(60)).max(12).optional(),
          durationSeconds: z.number().int().min(1).max(60 * 60).nullish(),
        })
        .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await requireVerifiedEmail(userId);
    // SEO safety net: ensure every post ships with a usable description for
    // social cards & search snippets even if the creator left the caption blank.
    let description = data.description?.trim() || null;
    if (!description) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("handle, display_name")
        .eq("id", userId)
        .maybeSingle();
      const who = profile?.handle ? `@${profile.handle}` : "an independent creator";
      const tagStr = (data.tags ?? []).slice(0, 5).map((t) => `#${t}`).join(" ");
      description = `AI-made ${data.type} "${data.title}" by ${who} on AlgoRhythm.${tagStr ? ` ${tagStr}` : ""}`.slice(0, 280);
    }
    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        creator_id: userId,
        type: data.type,
        media_url: data.mediaUrl,
        cover_url: data.coverUrl ?? null,
        title: data.title,
        description,
        tags: data.tags ?? [],
        ai_tools: data.aiTools ?? [],
        duration_seconds: data.durationSeconds ?? null,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { post };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", data.id)
      .eq("creator_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updatePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { id: string; title?: string; description?: string; tags?: string[]; pinned_comment?: string | null }) =>
      z
        .object({
          id: z.string().uuid(),
          title: z.string().min(1).max(140).optional(),
          description: z.string().max(2000).optional(),
          tags: z.array(z.string().min(1).max(40)).max(12).optional(),
          pinned_comment: z.string().max(1000).nullish(),
        })
        .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { id, ...patch } = data;
    const { data: row, error } = await supabase
      .from("posts")
      .update(patch)
      .eq("id", id)
      .eq("creator_id", userId)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { post: row };
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: posts }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("posts")
        .select("id, type, cover_url, media_url, title, description, tags, like_count, view_count, created_at")
        .eq("creator_id", userId)
        .order("created_at", { ascending: false }),
    ]);
    return { profile, posts: posts ?? [] };
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { display_name?: string; bio?: string; avatar_url?: string | null; handle?: string }) =>
      z
        .object({
          display_name: z.string().min(1).max(60).optional(),
          bio: z.string().max(280).optional(),
          avatar_url: z.string().url().nullish(),
          handle: z
            .string()
            .min(3)
            .max(24)
            .regex(/^[a-z0-9_]+$/, "lowercase letters, numbers, underscores")
            .optional(),
        })
        .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { profile: row };
  });