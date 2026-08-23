import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { r as requireVerifiedEmail } from "./posts.functions-ByLWJTvJ.mjs";
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
const toggleLike_createServerFn_handler = createServerRpc({
  id: "0e88bb8ac9b2e31dd061e05b2cf53a40f98890a68ac4eeac0c38345d71cebe54",
  name: "toggleLike",
  filename: "../algorhythm/src/lib/social.functions.ts"
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
  id: "ef51ff0239ef1c757014c75dcc09d28ed5c5b5ba85dac0298f205a26014a3d2a",
  name: "toggleFollow",
  filename: "../algorhythm/src/lib/social.functions.ts"
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
  id: "11bd0a6e14c7c045d88d5bce575cbe6506b2462b5ba7b084e0cc7d40432cb942",
  name: "addComment",
  filename: "../algorhythm/src/lib/social.functions.ts"
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
  id: "27e4ec9d64d3dc3adcff06ba63017b7237e0755979c15b1bd5098dada294aaf0",
  name: "getComments",
  filename: "../algorhythm/src/lib/social.functions.ts"
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
  id: "4c9297a8adfa09e97e8e202b0096a7e3c93a9f588908d734619ee410c5e38d1b",
  name: "getMyInteractions",
  filename: "../algorhythm/src/lib/social.functions.ts"
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
