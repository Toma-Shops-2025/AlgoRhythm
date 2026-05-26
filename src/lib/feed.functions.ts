import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getFeed = createServerFn({ method: "GET" })
  .inputValidator((input: { cursor?: string | null; limit?: number } | undefined) =>
    z
      .object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(30).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const limit = data.limit ?? 10;
    let q = supabaseAdmin
      .from("posts")
      .select(
        "id, creator_id, type, media_url, cover_url, title, description, tags, ai_tools, like_count, comment_count, view_count, duration_seconds, created_at",
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data.cursor) q = q.lt("created_at", data.cursor);
    const { data: posts, error } = await q;
    if (error) throw new Error(error.message);

    const creatorIds = Array.from(new Set((posts ?? []).map((p) => p.creator_id)));
    const { data: creators } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, follower_count")
      .in("id", creatorIds.length ? creatorIds : ["00000000-0000-0000-0000-000000000000"]);
    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    return {
      items: (posts ?? []).map((p) => ({ ...p, creator: byId.get(p.creator_id) ?? null })),
      nextCursor: posts && posts.length === limit ? posts[posts.length - 1].created_at : null,
    };
  });

export const getPostById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", data.id)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) return { post: null, creator: null };
    const { data: creator } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, follower_count, bio")
      .eq("id", post.creator_id)
      .maybeSingle();
    return { post, creator };
  });

export const getProfileByHandle = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string }) =>
    z.object({ handle: z.string().min(1).max(64) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("handle", data.handle)
      .maybeSingle();
    if (!profile) return { profile: null, posts: [] };
    const { data: posts } = await supabaseAdmin
      .from("posts")
      .select("id, type, cover_url, media_url, title, like_count, view_count, created_at")
      .eq("creator_id", profile.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(60);
    return { profile, posts: posts ?? [] };
  });

export const searchAll = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) =>
    z.object({ q: z.string().min(1).max(80) }).parse(input),
  )
  .handler(async ({ data }) => {
    const safe = data.q.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
    if (!safe) return { posts: [], profiles: [] };
    const term = `%${safe}%`;
    const [{ data: posts }, { data: profiles }] = await Promise.all([
      supabaseAdmin
        .from("posts")
        .select("id, title, type, cover_url, creator_id, like_count")
        .eq("is_published", true)
        .ilike("title", term)
        .limit(20),
      supabaseAdmin
        .from("profiles")
        .select("id, handle, display_name, avatar_url, follower_count")
        .or(`handle.ilike.${term},display_name.ilike.${term}`)
        .limit(20),
    ]);
    return { posts: posts ?? [], profiles: profiles ?? [] };
  });