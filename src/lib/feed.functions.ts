import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

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
  .handler(async () => {
    // Use the standard public client (reliable across Netlify)
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Feed Fetch Error:", error.message);
      return { items: [], nextCursor: null };
    }

    if (!posts || posts.length === 0) {
      return { items: [], nextCursor: null };
    }

    // Fetch creators for these posts
    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    const finalItems = posts.map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) || { display_name: "Toma Creator", handle: "user" }
    }));

    return {
      items: shuffle(finalItems),
      nextCursor: null,
    };
  });

// Simple fallbacks for other functions to ensure build success
export const getPostById = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async ({ data }: any) => {
    const { data: post } = await supabase.from("posts").select("*").eq("id", data.id).maybeSingle();
    return { post, creator: null };
});

export const getProfileByHandle = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async ({ data }: any) => {
    const { data: profile } = await supabase.from("profiles").select("*").eq("handle", data.handle).maybeSingle();
    const { data: posts } = profile ? await supabase.from("posts").select("*").eq("creator_id", profile.id).limit(20) : { data: [] };
    return { profile, posts: posts ?? [] };
});

export const getCreatorPostIds = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async ({ data }: any) => {
    const { data: posts } = await supabase.from("posts").select("id").eq("creator_id", data.creatorId).limit(50);
    return { ids: (posts ?? []).map((p: any) => p.id) };
});

export const searchAll = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async ({ data }: any) => {
    const term = `%${data.q}%`;
    const { data: posts } = await supabase.from("posts").select("*").ilike("title", term).limit(10);
    return { posts: posts ?? [], profiles: [] };
});
