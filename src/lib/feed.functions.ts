import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const getFeed = createServerFn({ method: "GET" })
  .inputValidator(
    (input: { cursor?: string | null; limit?: number; viewerId?: string | null; tag?: string | null; aiTool?: string | null } | undefined) =>
    z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).optional(),
        viewerId: z.string().uuid().nullish(),
        tag: z.string().min(1).max(40).nullish(),
        aiTool: z.string().min(1).max(40).nullish(),
      }).parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const limit = data.limit ?? 40;

    // 1. Fetch EVERYTHING without filters first to see if anything is there
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
        console.error("Critical Feed Error:", error.message);
        return { items: [], nextCursor: null };
    }

    if (!posts || posts.length === 0) {
        console.log("Feed: Query returned 0 posts.");
        return { items: [], nextCursor: null };
    }

    // 2. Fetch creators
    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    const finalItems = posts.map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) || { display_name: "Toma Creator", handle: "creator" }
    }));

    return {
      items: shuffle(finalItems),
      nextCursor: posts.length === limit ? posts[posts.length - 1].created_at : null,
    };
  });

export const getPostById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) return { post: null, creator: null };
    const { data: creator } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, bio")
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
      .select("*")
      .eq("creator_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(60);
    return { profile, posts: posts ?? [] };
  });

export const getCreatorPostIds = createServerFn({ method: "GET" })
  .inputValidator((input: { creatorId: string }) =>
    z.object({ creatorId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: posts } = await supabaseAdmin
      .from("posts")
      .select("id")
      .eq("creator_id", data.creatorId)
      .order("created_at", { ascending: false })
      .limit(200);
    return { ids: (posts ?? []).map((p) => p.id) };
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
        .select("*")
        .ilike("title", term)
        .limit(20),
      supabaseAdmin
        .from("profiles")
        .select("*")
        .or(`handle.ilike.${term},display_name.ilike.${term}`)
        .limit(20),
    ]);
    return { posts: posts ?? [], profiles: profiles ?? [] };
  });
