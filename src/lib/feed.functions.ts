import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getFeed = createServerFn({ method: "GET" })
  .inputValidator(
    (input: { cursor?: string | null; limit?: number; viewerId?: string | null } | undefined) =>
    z
      .object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(30).optional(),
        viewerId: z.string().uuid().nullish(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const limit = data.limit ?? 60;
    // Hide content from users the viewer has blocked, or who have blocked the viewer.
    let excludeCreatorIds: string[] = [];
    if (data.viewerId) {
      const [{ data: outgoing }, { data: incoming }] = await Promise.all([
        supabaseAdmin.from("blocks").select("blocked_id").eq("blocker_id", data.viewerId),
        supabaseAdmin.from("blocks").select("blocker_id").eq("blocked_id", data.viewerId),
      ]);
      excludeCreatorIds = [
        ...(outgoing ?? []).map((r) => r.blocked_id),
        ...(incoming ?? []).map((r) => r.blocker_id),
      ];
    }
    let q = supabaseAdmin
      .from("posts")
      .select(
        "id, creator_id, type, media_url, cover_url, title, description, tags, ai_tools, like_count, comment_count, view_count, save_count, play_count, complete_count, loop_count, duration_seconds, created_at",
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data.cursor) q = q.lt("created_at", data.cursor);
    if (excludeCreatorIds.length) {
      q = q.not("creator_id", "in", `(${excludeCreatorIds.join(",")})`);
    }
    const { data: posts, error } = await q;
    if (error) throw new Error(error.message);

    const creatorIds = Array.from(new Set((posts ?? []).map((p) => p.creator_id)));
    const { data: creators } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, follower_count")
      .in("id", creatorIds.length ? creatorIds : ["00000000-0000-0000-0000-000000000000"]);
    const byId = new Map((creators ?? []).map((c) => [c.id, c]));

    // Retention-weighted ranking with discovery sandbox boost.
    // Score combines:
    //   - recency decay (~7-day half-life)
    //   - audio retention (complete + loop rate per play)
    //   - high-intent engagement (saves > likes > comments)
    //   - sandbox boost: new posts (<24h) with <500 views get a multiplier
    //     so cold-start content has a fair shot in the shuffle.
    const now = Date.now();
    const scored = (posts ?? []).map((p) => {
      const ageHours = (now - new Date(p.created_at).getTime()) / 36e5;
      const recency = Math.exp(-ageHours / 168); // 7-day decay
      const plays = Math.max(1, p.play_count ?? 0);
      const completion = (p.complete_count ?? 0) / plays;
      const loopRate = (p.loop_count ?? 0) / plays;
      const retention = completion + loopRate * 0.6;
      const engagement =
        (p.save_count ?? 0) * 3 + (p.like_count ?? 0) * 1 + (p.comment_count ?? 0) * 2;
      const sandbox = ageHours < 24 && (p.view_count ?? 0) < 500 ? 1.8 : 1;
      const score = (recency * (1 + retention * 2) + Math.log1p(engagement) * 0.4) * sandbox;
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const ranked = scored.map((s) => s.p);

    return {
      items: ranked.map((p) => ({ ...p, creator: byId.get(p.creator_id) ?? null })),
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
      .select("id, handle, display_name, avatar_url, bio, links, follower_count, following_count, post_count, created_at")
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

export const getCreatorPostIds = createServerFn({ method: "GET" })
  .inputValidator((input: { creatorId: string }) =>
    z.object({ creatorId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: posts } = await supabaseAdmin
      .from("posts")
      .select("id")
      .eq("creator_id", data.creatorId)
      .eq("is_published", true)
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
        .select("id, title, type, cover_url, media_url, creator_id, like_count")
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