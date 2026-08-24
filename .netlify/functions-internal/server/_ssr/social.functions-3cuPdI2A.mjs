import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { r as requireVerifiedEmail } from "./posts.functions-HCsiXm05.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
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
import "./createSsrRpc-BvEa_6le.mjs";
const toggleLike_createServerFn_handler = createServerRpc({
  id: "3065a0b86fec5ca02eaff7d682d9e952b4aa1070b01e799803d6b5eef80cf9f0",
  name: "toggleLike",
  filename: "src/lib/social.functions.ts"
}, (opts) => toggleLike.__executeServer(opts));
const toggleLike = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(toggleLike_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: existing
  } = await supabase.from("likes").select("post_id").eq("post_id", data.postId).eq("user_id", userId).maybeSingle();
  if (existing) {
    await supabase.from("likes").delete().eq("post_id", data.postId).eq("user_id", userId);
    return {
      liked: false
    };
  }
  await supabase.from("likes").insert({
    post_id: data.postId,
    user_id: userId
  });
  return {
    liked: true
  };
});
const toggleFollow_createServerFn_handler = createServerRpc({
  id: "dfbdfa08334b7454e8295c9056e30ce155a9665d10b348d9a98e7e2842c4b874",
  name: "toggleFollow",
  filename: "src/lib/social.functions.ts"
}, (opts) => toggleFollow.__executeServer(opts));
const toggleFollow = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(toggleFollow_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  if (userId === data.targetUserId) throw new Error("Cannot follow yourself");
  const {
    data: existing
  } = await supabase.from("follows").select("follower_id").eq("follower_id", userId).eq("following_id", data.targetUserId).maybeSingle();
  if (existing) {
    await supabase.from("follows").delete().eq("follower_id", userId).eq("following_id", data.targetUserId);
    return {
      following: false
    };
  }
  await supabase.from("follows").insert({
    follower_id: userId,
    following_id: data.targetUserId
  });
  return {
    following: true
  };
});
const addComment_createServerFn_handler = createServerRpc({
  id: "5f8a00e81aa90926bf5a9ed55938e2182c0448553b713e085f5ab30574157ddd",
  name: "addComment",
  filename: "src/lib/social.functions.ts"
}, (opts) => addComment.__executeServer(opts));
const addComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid(),
  body: stringType().min(1).max(500)
}).parse(input)).handler(addComment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await requireVerifiedEmail(userId);
  const {
    data: row,
    error
  } = await supabase.from("comments").insert({
    post_id: data.postId,
    user_id: userId,
    body: data.body
  }).select("*").single();
  if (error) throw new Error(error.message);
  return {
    comment: row
  };
});
const getComments_createServerFn_handler = createServerRpc({
  id: "f8b15ffc015f1dc8f3d3a67d551214cca78e7c3c1b9fba6a7b0e54b17d8a9f8c",
  name: "getComments",
  filename: "src/lib/social.functions.ts"
}, (opts) => getComments.__executeServer(opts));
const getComments = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(getComments_createServerFn_handler, async ({
  data
}) => {
  const [{
    data: post
  }, {
    data: comments
  }] = await Promise.all([supabaseAdmin.from("posts").select("pinned_comment, creator_id").eq("id", data.postId).maybeSingle(), supabaseAdmin.from("comments").select("id, body, created_at, user_id").eq("post_id", data.postId).order("created_at", {
    ascending: false
  }).limit(100)]);
  const userIds = Array.from(new Set((comments ?? []).map((c) => c.user_id)));
  if (post?.creator_id) userIds.push(post.creator_id);
  const {
    data: profiles
  } = await supabaseAdmin.from("profiles").select("id, handle, display_name, avatar_url").in("id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]);
  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
  let pinned = null;
  if (post?.pinned_comment && post.creator_id) {
    pinned = {
      body: post.pinned_comment,
      user: byId.get(post.creator_id) ?? null
    };
  }
  return {
    comments: (comments ?? []).map((c) => ({
      ...c,
      user: byId.get(c.user_id) ?? null
    })),
    pinned
  };
});
const getMyInteractions_createServerFn_handler = createServerRpc({
  id: "62021290b0f36248181adccdab7522d8d24669d42593d1fc53573bcefa790518",
  name: "getMyInteractions",
  filename: "src/lib/social.functions.ts"
}, (opts) => getMyInteractions.__executeServer(opts));
const getMyInteractions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postIds: arrayType(stringType().uuid()).max(50),
  creatorIds: arrayType(stringType().uuid()).max(50)
}).parse(input)).handler(getMyInteractions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const [{
    data: likes
  }, {
    data: follows
  }, {
    data: saves
  }] = await Promise.all([data.postIds.length ? supabase.from("likes").select("post_id").eq("user_id", userId).in("post_id", data.postIds) : Promise.resolve({
    data: []
  }), data.creatorIds.length ? supabase.from("follows").select("following_id").eq("follower_id", userId).in("following_id", data.creatorIds) : Promise.resolve({
    data: []
  }), data.postIds.length ? supabase.from("saves").select("post_id").eq("user_id", userId).in("post_id", data.postIds) : Promise.resolve({
    data: []
  })]);
  return {
    likedPostIds: (likes ?? []).map((l) => l.post_id),
    followingIds: (follows ?? []).map((f) => f.following_id),
    savedPostIds: (saves ?? []).map((s) => s.post_id)
  };
});
export {
  addComment_createServerFn_handler,
  getComments_createServerFn_handler,
  getMyInteractions_createServerFn_handler,
  toggleFollow_createServerFn_handler,
  toggleLike_createServerFn_handler
};
