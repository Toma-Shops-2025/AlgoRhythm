import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getFeed = createServerFn({ method: "GET" })
  .inputValidator(
    (input?: {
      limit?: number;
      viewerId?: string | null;
      tag?: string | null;
      aiTool?: string | null;
    }) => input ?? {},
  )
  .handler(async ({ data }) => {
    const limit = data.limit ?? 50;

    let query = supabase.from("posts").select("*").eq("is_published", true);
    if (data.tag) query = query.contains("tags", [data.tag]);
    if (data.aiTool) query = query.contains("ai_tools", [data.aiTool]);

    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);

    const total = count || 0;
    const randomOffset = total > limit ? Math.floor(Math.random() * (total - limit)) : 0;

    const { data: posts, error } = await query.range(randomOffset, randomOffset + limit - 1);

    if (error) {
      console.error("Feed: DB Error", error.message);
      return { items: [], nextCursor: null };
    }

    if (!posts || posts.length === 0) {
      return { items: [], nextCursor: null };
    }

    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    const finalItems = posts
      .map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) || { display_name: "Creator", handle: "user", avatar_url: null },
      }))
      .sort(() => Math.random() - 0.5);

    return {
      items: finalItems,
      nextCursor: null,
    };
  });

export const getPostById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", data.id)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !post) return { post: null, creator: null };

    const { data: creator } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .eq("id", post.creator_id)
      .maybeSingle();

    return { post, creator: creator ?? null };
  });

export const getProfileByHandle = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string }) => input)
  .handler(async ({ data }) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url, bio")
      .eq("handle", data.handle)
      .maybeSingle();

    if (!profile) return { profile: null, posts: [] };

    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .eq("creator_id", profile.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    return { profile, posts: posts ?? [] };
  });

export const getCreatorPostIds = createServerFn({ method: "GET" })
  .inputValidator((input: { creatorId: string }) => input)
  .handler(async ({ data }) => {
    const { data: posts } = await supabase
      .from("posts")
      .select("id")
      .eq("creator_id", data.creatorId)
      .eq("is_published", true);

    return { ids: (posts ?? []).map((p) => p.id) };
  });

export const searchAll = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) => input)
  .handler(async ({ data }) => {
    const q = data.q.trim();
    if (!q) return { posts: [], profiles: [] };

    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
      .limit(20);

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .or(`handle.ilike.%${q}%,display_name.ilike.%${q}%`)
      .limit(20);

    return { posts: posts ?? [], profiles: profiles ?? [] };
  });
