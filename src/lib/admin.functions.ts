import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

// Throws if the calling user is not an admin.
async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// ----- Overview stats -----
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const [users, posts, comments, tips, subs] = await Promise.all([
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("posts").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("comments").select("post_id", { count: "exact", head: true }),
      supabaseAdmin.from("tips").select("amount_cents, status, environment"),
      supabaseAdmin
        .from("subscriptions")
        .select("status, environment")
        .in("status", ["active", "trialing"]),
    ]);
    const tipRows = (tips.data ?? []).filter(
      (t) => t.status === "succeeded" && t.environment === "live",
    );
    const tipTotalCents = tipRows.reduce((s, t) => s + (t.amount_cents ?? 0), 0);
    const activeSubsLive = (subs.data ?? []).filter((s) => s.environment === "live").length;
    return {
      userCount: users.count ?? 0,
      postCount: posts.count ?? 0,
      commentCount: comments.count ?? 0,
      tipCount: tipRows.length,
      tipTotalCents,
      activeSubsLive,
    };
  });

// ----- Users -----
export const listUsers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { search?: string; limit?: number }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    let q = supabaseAdmin
      .from("profiles")
      .select("id, handle, display_name, avatar_url, follower_count, post_count, created_at")
      .order("created_at", { ascending: false })
      .limit(Math.min(data.limit ?? 100, 200));
    if (data.search && data.search.trim()) {
      const s = data.search.trim();
      q = q.or(`handle.ilike.%${s}%,display_name.ilike.%${s}%`);
    }
    const { data: profiles, error } = await q;
    if (error) throw new Error(error.message);
    const ids = (profiles ?? []).map((p) => p.id);
    const { data: roles } = ids.length
      ? await supabaseAdmin.from("user_roles").select("user_id, role").in("user_id", ids)
      : { data: [] as { user_id: string; role: string }[] };
    const rolesByUser = new Map<string, string[]>();
    for (const r of roles ?? []) {
      const arr = rolesByUser.get(r.user_id) ?? [];
      arr.push(r.role);
      rolesByUser.set(r.user_id, arr);
    }
    return (profiles ?? []).map((p) => ({ ...p, roles: rolesByUser.get(p.id) ?? [] }));
  });

export const toggleUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      userId: z.string().uuid(),
      role: z.enum(["admin", "creator", "user"]),
      enable: z.boolean(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    if (data.enable) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: data.userId, role: data.role }, { onConflict: "user_id,role" });
      if (error) throw new Error(error.message);
    } else {
      // Safety: don't let the only admin demote themselves accidentally
      if (data.role === "admin" && data.userId === context.userId) {
        const { count } = await supabaseAdmin
          .from("user_roles")
          .select("user_id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) <= 1) throw new Error("Cannot remove the last admin");
      }
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", data.role);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    if (data.userId === context.userId) throw new Error("Cannot delete yourself");
    for (const bucket of ["media", "covers", "avatars"]) {
      try {
        const { data: files } = await supabaseAdmin.storage
          .from(bucket)
          .list(data.userId, { limit: 1000 });
        if (files?.length) {
          await supabaseAdmin.storage
            .from(bucket)
            .remove(files.map((f) => `${data.userId}/${f.name}`));
        }
      } catch {
        /* best effort */
      }
    }
    await supabaseAdmin.from("comments").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("likes").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("follows").delete().eq("follower_id", data.userId);
    await supabaseAdmin.from("follows").delete().eq("following_id", data.userId);
    await supabaseAdmin.from("posts").delete().eq("creator_id", data.userId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("profiles").delete().eq("id", data.userId);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ----- Posts -----
export const listPosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { search?: string; limit?: number }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    let q = supabaseAdmin
      .from("posts")
      .select(
        "id, title, type, creator_id, is_published, like_count, comment_count, view_count, cover_url, media_url, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(Math.min(data.limit ?? 100, 200));
    if (data.search?.trim()) {
      q = q.ilike("title", `%${data.search.trim()}%`);
    }
    const { data: posts, error } = await q;
    if (error) throw new Error(error.message);
    const ids = [...new Set((posts ?? []).map((p) => p.creator_id))];
    const { data: profs } = ids.length
      ? await supabaseAdmin.from("profiles").select("id, handle, display_name").in("id", ids)
      : { data: [] as { id: string; handle: string; display_name: string }[] };
    const byId = new Map(profs?.map((p) => [p.id, p]));
    return (posts ?? []).map((p) => ({ ...p, creator: byId.get(p.creator_id) ?? null }));
  });

export const adminTogglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ postId: z.string().uuid(), publish: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from("posts")
      .update({ is_published: data.publish })
      .eq("id", data.postId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ postId: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    await supabaseAdmin.from("comments").delete().eq("post_id", data.postId);
    await supabaseAdmin.from("likes").delete().eq("post_id", data.postId);
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", data.postId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ----- Comments -----
export const listComments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { limit?: number }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: comments, error } = await supabaseAdmin
      .from("comments")
      .select("id, body, post_id, user_id, created_at")
      .order("created_at", { ascending: false })
      .limit(Math.min(data.limit ?? 100, 200));
    if (error) throw new Error(error.message);
    const userIds = [...new Set((comments ?? []).map((c) => c.user_id))];
    const { data: profs } = userIds.length
      ? await supabaseAdmin.from("profiles").select("id, handle, display_name").in("id", userIds)
      : { data: [] as { id: string; handle: string; display_name: string }[] };
    const byId = new Map(profs?.map((p) => [p.id, p]));
    return (comments ?? []).map((c) => ({ ...c, user: byId.get(c.user_id) ?? null }));
  });

export const adminDeleteComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ commentId: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("comments").delete().eq("id", data.commentId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ----- Recent transactions (read-only) -----
export const listTransactions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const [tips, subs] = await Promise.all([
      supabaseAdmin
        .from("tips")
        .select(
          "id, amount_cents, currency, status, environment, from_user, to_user, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(50),
      supabaseAdmin
        .from("subscriptions")
        .select(
          "id, user_id, kind, price_id, status, environment, current_period_end, cancel_at_period_end, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    return { tips: tips.data ?? [], subs: subs.data ?? [] };
  });