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
  .inputValidator((i: any) => i)
  .handler(async ({ data }) => {
    // 1. Fetch EVERYTHING - no filters, no math. Just get the 141 posts.
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .limit(100);

    if (error || !posts || posts.length === 0) {
      console.error("Feed Error:", error?.message);
      return { items: [], nextCursor: null };
    }

    // 2. Fetch creators
    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    // 3. Match posts to creators or use a fallback
    const finalItems = posts.map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) || { display_name: "Algo Creator", handle: "user" }
    }));

    return {
      items: shuffle(finalItems),
      nextCursor: null,
    };
  });

export const getPostById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: post } = await supabaseAdmin.from("posts").select("*").eq("id", data.id).maybeSingle();
    const { data: creator } = post ? await supabaseAdmin.from("profiles").select("*").eq("id", post.creator_id).maybeSingle() : { data: null };
    return { post, creator };
  });

export const getProfileByHandle = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string }) => z.object({ handle: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { data: profile } = await supabaseAdmin.from("profiles").select("*").eq("handle", data.handle).maybeSingle();
    const { data: posts } = profile ? await supabaseAdmin.from("posts").select("*").eq("creator_id", profile.id).limit(60) : { data: [] };
    return { profile, posts: posts ?? [] };
  });

export const getCreatorPostIds = createServerFn({ method: "GET" })
  .inputValidator((input: { creatorId: string }) => z.object({ creatorId: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { data: posts } = await supabaseAdmin.from("posts").select("id").eq("creator_id", data.creatorId).limit(200);
    return { ids: (posts ?? []).map((p) => p.id) };
  });

export const searchAll = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) => z.object({ q: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const term = `%${data.q}%`;
    const [{ data: posts }, { data: profiles }] = await Promise.all([
      supabaseAdmin.from("posts").select("*").ilike("title", term).limit(20),
      supabaseAdmin.from("profiles").select("*").or(`handle.ilike.${term},display_name.ilike.${term}`).limit(20),
    ]);
    return { posts: posts ?? [], profiles: profiles ?? [] };
  });
