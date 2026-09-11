import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const toggleSave = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { postId: string }) =>
    z.object({ postId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // Use service role for reliable writes (auth still required via middleware).
    const { data: existing, error: readErr } = await supabaseAdmin
      .from("saves")
      .select("post_id")
      .eq("post_id", data.postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (readErr) {
      throw new Error(
        readErr.message.includes("does not exist") || readErr.code === "42P01"
          ? "Library is not set up yet. Run the saves migration SQL in Supabase."
          : `Could not read library: ${readErr.message}`,
      );
    }

    if (existing) {
      const { error } = await supabaseAdmin
        .from("saves")
        .delete()
        .eq("post_id", data.postId)
        .eq("user_id", userId);
      if (error) throw new Error(`Could not remove from library: ${error.message}`);
      return { saved: false };
    }

    const { error } = await supabaseAdmin.from("saves").insert({
      post_id: data.postId,
      user_id: userId,
    });
    if (error) {
      throw new Error(
        error.message.includes("does not exist") || error.code === "42P01"
          ? "Library is not set up yet. Run the saves migration SQL in Supabase."
          : `Could not save to library: ${error.message}`,
      );
    }
    return { saved: true };
  });

export const getMyLibrary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    const { data: rows, error: savesErr } = await supabaseAdmin
      .from("saves")
      .select("post_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);

    if (savesErr) {
      throw new Error(
        savesErr.message.includes("does not exist") || savesErr.code === "42P01"
          ? "Library is not set up yet. Run the saves migration SQL in Supabase."
          : `Could not load library: ${savesErr.message}`,
      );
    }

    const ids = (rows ?? []).map((r) => r.post_id);
    if (ids.length === 0) return { posts: [] };

    const { data: posts, error: postsErr } = await supabaseAdmin
      .from("posts")
      .select(
        "id, type, cover_url, media_url, title, description, tags, like_count, comment_count, view_count, save_count, created_at, creator_id, is_published",
      )
      .in("id", ids)
      .eq("is_published", true);

    if (postsErr) throw new Error(`Could not load library posts: ${postsErr.message}`);

    const creatorIds = [...new Set((posts ?? []).map((p) => p.creator_id).filter(Boolean))];
    const { data: creators } = creatorIds.length
      ? await supabaseAdmin
          .from("profiles")
          .select("id, handle, display_name, avatar_url")
          .in("id", creatorIds)
      : { data: [] as Array<{ id: string; handle: string; display_name: string; avatar_url: string | null }> };

    const creatorById = new Map((creators ?? []).map((c) => [c.id, c]));
    const byId = new Map(
      (posts ?? []).map((p) => [
        p.id,
        {
          ...p,
          comment_count: p.comment_count ?? 0,
          creator: creatorById.get(p.creator_id) ?? null,
        },
      ]),
    );

    return { posts: ids.map((id) => byId.get(id)).filter(Boolean) };
  });
