import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const toggleLike = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { postId: string }) =>
    z.object({ postId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("likes")
      .select("post_id")
      .eq("post_id", data.postId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase.from("likes").delete().eq("post_id", data.postId).eq("user_id", userId);
      return { liked: false };
    }
    await supabase.from("likes").insert({ post_id: data.postId, user_id: userId });
    return { liked: true };
  });

export const toggleFollow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { targetUserId: string }) =>
    z.object({ targetUserId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (userId === data.targetUserId) throw new Error("Cannot follow yourself");
    const { data: existing } = await supabase
      .from("follows")
      .select("follower_id")
      .eq("follower_id", userId)
      .eq("following_id", data.targetUserId)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", userId)
        .eq("following_id", data.targetUserId);
      return { following: false };
    }
    await supabase
      .from("follows")
      .insert({ follower_id: userId, following_id: data.targetUserId });
    return { following: true };
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { postId: string; body: string }) =>
    z
      .object({ postId: z.string().uuid(), body: z.string().min(1).max(500) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("comments")
      .insert({ post_id: data.postId, user_id: userId, body: data.body })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { comment: row };
  });

export const getComments = createServerFn({ method: "GET" })
  .inputValidator((input: { postId: string }) =>
    z.object({ postId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: comments } = await supabaseAdmin
      .from("comments")
      .select("id, body, created_at, user_id")
      .eq("post_id", data.postId)
      .order("created_at", { ascending: false })
      .limit(100);
    const userIds = Array.from(new Set((comments ?? []).map((c) => c.user_id)));
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url")
      .in("id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]);
    const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
    return {
      comments: (comments ?? []).map((c) => ({ ...c, user: byId.get(c.user_id) ?? null })),
    };
  });

export const getMyInteractions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { postIds: string[]; creatorIds: string[] }) =>
    z
      .object({
        postIds: z.array(z.string().uuid()).max(50),
        creatorIds: z.array(z.string().uuid()).max(50),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const [{ data: likes }, { data: follows }] = await Promise.all([
      data.postIds.length
        ? supabase.from("likes").select("post_id").eq("user_id", userId).in("post_id", data.postIds)
        : Promise.resolve({ data: [] as { post_id: string }[] }),
      data.creatorIds.length
        ? supabase
            .from("follows")
            .select("following_id")
            .eq("follower_id", userId)
            .in("following_id", data.creatorIds)
        : Promise.resolve({ data: [] as { following_id: string }[] }),
    ]);
    return {
      likedPostIds: (likes ?? []).map((l) => l.post_id),
      followingIds: (follows ?? []).map((f) => f.following_id),
    };
  });