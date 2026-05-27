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
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("saves")
      .select("post_id")
      .eq("post_id", data.postId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase.from("saves").delete().eq("post_id", data.postId).eq("user_id", userId);
      return { saved: false };
    }
    await supabase.from("saves").insert({ post_id: data.postId, user_id: userId });
    return { saved: true };
  });

export const getMyLibrary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: rows } = await supabase
      .from("saves")
      .select("post_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);
    const ids = (rows ?? []).map((r) => r.post_id);
    if (ids.length === 0) return { posts: [] };
    const { data: posts } = await supabaseAdmin
      .from("posts")
      .select("id, type, cover_url, media_url, title, like_count, view_count, created_at, creator_id")
      .in("id", ids)
      .eq("is_published", true);
    // preserve save order
    const byId = new Map((posts ?? []).map((p) => [p.id, p]));
    return { posts: ids.map((id) => byId.get(id)).filter(Boolean) };
  });