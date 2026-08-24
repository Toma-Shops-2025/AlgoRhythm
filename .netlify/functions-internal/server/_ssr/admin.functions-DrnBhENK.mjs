import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, b as booleanType, e as enumType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
async function assertAdmin(userId) {
  const {
    data,
    error
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}
const getAdminStats_createServerFn_handler = createServerRpc({
  id: "4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d",
  name: "getAdminStats",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminStats.__executeServer(opts));
const getAdminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAdminStats_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.userId);
  const [users, posts, comments, tips, subs] = await Promise.all([supabaseAdmin.from("profiles").select("id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("posts").select("id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("comments").select("post_id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("tips").select("amount_cents, status, environment"), supabaseAdmin.from("subscriptions").select("status, environment").in("status", ["active", "trialing"])]);
  const tipRows = (tips.data ?? []).filter((t) => t.status === "succeeded" && t.environment === "live");
  const tipTotalCents = tipRows.reduce((s, t) => s + (t.amount_cents ?? 0), 0);
  const activeSubsLive = (subs.data ?? []).filter((s) => s.environment === "live").length;
  return {
    userCount: users.count ?? 0,
    postCount: posts.count ?? 0,
    commentCount: comments.count ?? 0,
    tipCount: tipRows.length,
    tipTotalCents,
    activeSubsLive
  };
});
const listUsers_createServerFn_handler = createServerRpc({
  id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
  name: "listUsers",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(listUsers_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  let q = supabaseAdmin.from("profiles").select("id, handle, display_name, avatar_url, follower_count, post_count, created_at").order("created_at", {
    ascending: false
  }).limit(Math.min(data.limit ?? 100, 200));
  if (data.search && data.search.trim()) {
    const s = data.search.trim();
    q = q.or(`handle.ilike.%${s}%,display_name.ilike.%${s}%`);
  }
  const {
    data: profiles,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const ids = (profiles ?? []).map((p) => p.id);
  const {
    data: roles
  } = ids.length ? await supabaseAdmin.from("user_roles").select("user_id, role").in("user_id", ids) : {
    data: []
  };
  const rolesByUser = /* @__PURE__ */ new Map();
  for (const r of roles ?? []) {
    const arr = rolesByUser.get(r.user_id) ?? [];
    arr.push(r.role);
    rolesByUser.set(r.user_id, arr);
  }
  return (profiles ?? []).map((p) => ({
    ...p,
    roles: rolesByUser.get(p.id) ?? []
  }));
});
const toggleUserRole_createServerFn_handler = createServerRpc({
  id: "eceda78bcec2038c9739ee4a719cea79f404d3b06ed649e0c6f5742699b097c2",
  name: "toggleUserRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => toggleUserRole.__executeServer(opts));
const toggleUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "creator", "user"]),
  enable: booleanType()
}).parse(d)).handler(toggleUserRole_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  if (data.enable) {
    const {
      error
    } = await supabaseAdmin.from("user_roles").upsert({
      user_id: data.userId,
      role: data.role
    }, {
      onConflict: "user_id,role"
    });
    if (error) throw new Error(error.message);
  } else {
    if (data.role === "admin" && data.userId === context.userId) {
      const {
        count
      } = await supabaseAdmin.from("user_roles").select("user_id", {
        count: "exact",
        head: true
      }).eq("role", "admin");
      if ((count ?? 0) <= 1) throw new Error("Cannot remove the last admin");
    }
    const {
      error
    } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId).eq("role", data.role);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const adminDeleteUser_createServerFn_handler = createServerRpc({
  id: "75454526e81445e210b3752ed6012b474b177f745b67b452ea06088e76834860",
  name: "adminDeleteUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteUser.__executeServer(opts));
const adminDeleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(adminDeleteUser_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  if (data.userId === context.userId) throw new Error("Cannot delete yourself");
  for (const bucket of ["media", "covers", "avatars"]) {
    try {
      const {
        data: files
      } = await supabaseAdmin.storage.from(bucket).list(data.userId, {
        limit: 1e3
      });
      if (files?.length) {
        await supabaseAdmin.storage.from(bucket).remove(files.map((f) => `${data.userId}/${f.name}`));
      }
    } catch {
    }
  }
  await supabaseAdmin.from("comments").delete().eq("user_id", data.userId);
  await supabaseAdmin.from("likes").delete().eq("user_id", data.userId);
  await supabaseAdmin.from("follows").delete().eq("follower_id", data.userId);
  await supabaseAdmin.from("follows").delete().eq("following_id", data.userId);
  await supabaseAdmin.from("posts").delete().eq("creator_id", data.userId);
  await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
  await supabaseAdmin.from("profiles").delete().eq("id", data.userId);
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listPosts_createServerFn_handler = createServerRpc({
  id: "4e1fce0aa6f1049becfa63db3f60e946c335488318b3121122a1f5a62553bb28",
  name: "listPosts",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listPosts.__executeServer(opts));
const listPosts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(listPosts_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  let q = supabaseAdmin.from("posts").select("id, title, type, creator_id, is_published, like_count, comment_count, view_count, cover_url, media_url, created_at").order("created_at", {
    ascending: false
  }).limit(Math.min(data.limit ?? 100, 200));
  if (data.search?.trim()) {
    q = q.ilike("title", `%${data.search.trim()}%`);
  }
  const {
    data: posts,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const ids = [...new Set((posts ?? []).map((p) => p.creator_id))];
  const {
    data: profs
  } = ids.length ? await supabaseAdmin.from("profiles").select("id, handle, display_name").in("id", ids) : {
    data: []
  };
  const byId = new Map(profs?.map((p) => [p.id, p]));
  return (posts ?? []).map((p) => ({
    ...p,
    creator: byId.get(p.creator_id) ?? null
  }));
});
const adminTogglePublish_createServerFn_handler = createServerRpc({
  id: "4587620b23cd42114286fc00c107bde8089ec278c221ff7eebee1dec6af9875c",
  name: "adminTogglePublish",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminTogglePublish.__executeServer(opts));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid(),
  publish: booleanType()
}).parse(d)).handler(adminTogglePublish_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("posts").update({
    is_published: data.publish
  }).eq("id", data.postId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminDeletePost_createServerFn_handler = createServerRpc({
  id: "706974d253749a4b207ea9f45681167b7d9acb69ae04a29b711b2519d6b957f5",
  name: "adminDeletePost",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeletePost.__executeServer(opts));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid()
}).parse(d)).handler(adminDeletePost_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  await supabaseAdmin.from("comments").delete().eq("post_id", data.postId);
  await supabaseAdmin.from("likes").delete().eq("post_id", data.postId);
  const {
    error
  } = await supabaseAdmin.from("posts").delete().eq("id", data.postId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listComments_createServerFn_handler = createServerRpc({
  id: "f54eb1072d526aca7701ccece7405ccf35e2bbe89ed46ed95ff2ad1c6462d16e",
  name: "listComments",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listComments.__executeServer(opts));
const listComments = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(listComments_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    data: comments,
    error
  } = await supabaseAdmin.from("comments").select("id, body, post_id, user_id, created_at").order("created_at", {
    ascending: false
  }).limit(Math.min(data.limit ?? 100, 200));
  if (error) throw new Error(error.message);
  const userIds = [...new Set((comments ?? []).map((c) => c.user_id))];
  const {
    data: profs
  } = userIds.length ? await supabaseAdmin.from("profiles").select("id, handle, display_name").in("id", userIds) : {
    data: []
  };
  const byId = new Map(profs?.map((p) => [p.id, p]));
  return (comments ?? []).map((c) => ({
    ...c,
    user: byId.get(c.user_id) ?? null
  }));
});
const adminDeleteComment_createServerFn_handler = createServerRpc({
  id: "6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118",
  name: "adminDeleteComment",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteComment.__executeServer(opts));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  commentId: stringType().uuid()
}).parse(d)).handler(adminDeleteComment_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("comments").delete().eq("id", data.commentId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listTransactions_createServerFn_handler = createServerRpc({
  id: "1d7dd1759ab84778ab5b9b229f224047f59ac2c5105d78f3624bf14c13600b0f",
  name: "listTransactions",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listTransactions.__executeServer(opts));
const listTransactions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listTransactions_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.userId);
  const [tips, subs] = await Promise.all([supabaseAdmin.from("tips").select("id, amount_cents, currency, status, environment, from_user, to_user, created_at").order("created_at", {
    ascending: false
  }).limit(50), supabaseAdmin.from("subscriptions").select("id, user_id, kind, price_id, status, environment, current_period_end, cancel_at_period_end, created_at").order("created_at", {
    ascending: false
  }).limit(50)]);
  return {
    tips: tips.data ?? [],
    subs: subs.data ?? []
  };
});
const listReports_createServerFn_handler = createServerRpc({
  id: "c9956b44cec3c1fce949ecfd38437e467b57699a11f341d5b3196cf08648be73",
  name: "listReports",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listReports.__executeServer(opts));
const listReports = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(listReports_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const status = data.status ?? "pending";
  const {
    data: reports,
    error
  } = await supabaseAdmin.from("reports").select("id, reporter_id, target_type, target_id, reason, details, status, created_at, resolved_at, resolved_by").eq("status", status).order("created_at", {
    ascending: false
  }).limit(200);
  if (error) throw new Error(error.message);
  const reporterIds = [...new Set((reports ?? []).map((r) => r.reporter_id))];
  const {
    data: reporters
  } = reporterIds.length ? await supabaseAdmin.from("profiles").select("id, handle, display_name").in("id", reporterIds) : {
    data: []
  };
  const byId = new Map(reporters?.map((p) => [p.id, p]));
  return (reports ?? []).map((r) => ({
    ...r,
    reporter: byId.get(r.reporter_id) ?? null
  }));
});
const resolveReport_createServerFn_handler = createServerRpc({
  id: "6fac58f2682ac346176b61a1647ce58c52925ac2e4c76d5ec29c62561a8ac845",
  name: "resolveReport",
  filename: "src/lib/admin.functions.ts"
}, (opts) => resolveReport.__executeServer(opts));
const resolveReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  reportId: stringType().uuid(),
  action: enumType(["dismiss", "resolve"])
}).parse(d)).handler(resolveReport_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("reports").update({
    status: data.action === "dismiss" ? "dismissed" : "resolved",
    resolved_at: (/* @__PURE__ */ new Date()).toISOString(),
    resolved_by: context.userId
  }).eq("id", data.reportId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminDeleteComment_createServerFn_handler,
  adminDeletePost_createServerFn_handler,
  adminDeleteUser_createServerFn_handler,
  adminTogglePublish_createServerFn_handler,
  getAdminStats_createServerFn_handler,
  listComments_createServerFn_handler,
  listPosts_createServerFn_handler,
  listReports_createServerFn_handler,
  listTransactions_createServerFn_handler,
  listUsers_createServerFn_handler,
  resolveReport_createServerFn_handler,
  toggleUserRole_createServerFn_handler
};
