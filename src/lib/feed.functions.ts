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
    const limit = data.limit ?? 60;

    // Simple query first to ensure we get results
    let q = supabaseAdmin
      .from("posts")
      .select(`
        id, creator_id, type, media_url, cover_url, title, description,
        tags, ai_tools, like_count, comment_count, view_count, save_count,
        play_count, complete_count, loop_count, duration_seconds, created_at
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (data.cursor) q = q.lt("created_at", data.cursor);

    const { data: posts, error } = await q;
    if (error) {
        console.error("Feed Error:", error);
        return { items: [], nextCursor: null };
    }

    if (!posts || posts.length === 0) {
        return { items: [], nextCursor: null };
    }

    const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
    const { data: creators } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, follower_count")
      .in("id", creatorIds);

    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    // Return the posts immediately, bypassing heavy scoring if it might fail
    const finalItems = posts.map((p) => ({
        ...p,
        creator: byId.get(p.creator_id) ?? { display_name: "Creator", handle: "user" }
    }));

    return {
      items: shuffle(finalItems),
      nextCursor: posts.length === limit ? posts[posts.length - 1].created_at : null,
    };
  });
