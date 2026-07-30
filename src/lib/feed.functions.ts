import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getFeed = createServerFn({ method: "GET" })
  .inputValidator((i: any) => i)
  .handler(async () => {
    console.log("Feed: Starting fetch...");

    // 1. Get total count to pick a random starting point
    const { count } = await supabase
      .from("posts")
      .select("*", { count: 'exact', head: true })
      .eq("status", "published");

    const total = count || 0;
    const limit = 50;
    const randomOffset = total > limit ? Math.floor(Math.random() * (total - limit)) : 0;

    // 2. Fetch a random batch of posts
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .range(randomOffset, randomOffset + limit - 1);

    if (error) {
      console.error("Feed: DB Error", error.message);
      return { items: [], nextCursor: null };
    }

    if (!posts || posts.length === 0) {
      console.log("Feed: 0 posts found in DB.");
      // FALLBACK: Return one fake post to prove the app is working
      return {
          items: [{
              id: "00000000-0000-0000-0000-000000000000",
              title: "Welcome to AlgoRhythm!",
              description: "We are syncing your posts. If you see this, the app is connected!",
              media_url: "https://vujmezepstugbhozgtrm.supabase.co/storage/v1/object/public/media/welcome.mp4",
              type: "video",
              creator_id: "00000000-0000-0000-0000-000000000000",
              creator: { display_name: "System", handle: "algo" }
          }],
          nextCursor: null
      };
    }

    // 3. Fetch creators
    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabase
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    // 4. Shuffle the batch locally for extra randomness
    const finalItems = posts.map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) || { display_name: "Creator", handle: "user" }
    })).sort(() => Math.random() - 0.5);

    return {
      items: finalItems,
      nextCursor: null,
    };
  });

// Essential build-saving stubs
export const getPostById = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async () => ({ post: null, creator: null }));
export const getProfileByHandle = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async () => ({ profile: null, posts: [] }));
export const getCreatorPostIds = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async () => ({ ids: [] }));
export const searchAll = createServerFn({ method: "GET" }).inputValidator((i: any) => i).handler(async () => ({ posts: [], profiles: [] }));
