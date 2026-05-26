import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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
          mediaUrl: z.string().url(),
          coverUrl: z.string().url().nullish(),
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
    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        creator_id: userId,
        type: data.type,
        media_url: data.mediaUrl,
        cover_url: data.coverUrl ?? null,
        title: data.title,
        description: data.description ?? null,
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

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: posts }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("posts")
        .select("id, type, cover_url, title, like_count, view_count, created_at")
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