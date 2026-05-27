import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Permanently deletes the signed-in user's account, profile, posts, social
// graph, comments, likes, and follows. Storage objects in public buckets
// (media/covers/avatars) are best-effort cleaned up.
export const deleteAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    // Best-effort: remove the user's files from public buckets.
    for (const bucket of ["media", "covers", "avatars"]) {
      try {
        const { data: files } = await supabaseAdmin.storage
          .from(bucket)
          .list(userId, { limit: 1000 });
        if (files && files.length) {
          await supabaseAdmin.storage
            .from(bucket)
            .remove(files.map((f) => `${userId}/${f.name}`));
        }
      } catch {
        /* swallow — file cleanup is best effort */
      }
    }

    // Delete dependent rows (no FKs in schema, do it manually).
    await supabaseAdmin.from("comments").delete().eq("user_id", userId);
    await supabaseAdmin.from("likes").delete().eq("user_id", userId);
    await supabaseAdmin.from("follows").delete().eq("follower_id", userId);
    await supabaseAdmin.from("follows").delete().eq("following_id", userId);
    await supabaseAdmin.from("posts").delete().eq("creator_id", userId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
    await supabaseAdmin.from("profiles").delete().eq("id", userId);

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);

    return { ok: true };
  });