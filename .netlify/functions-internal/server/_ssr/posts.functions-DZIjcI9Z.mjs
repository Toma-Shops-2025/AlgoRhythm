import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, a as arrayType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
async function requireVerifiedEmail(userId) {
  const {
    data,
    error
  } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (error) throw new Error(error.message);
  if (!data.user?.email_confirmed_at) {
    throw new Error("Please verify your email before posting. Check your inbox for a confirmation link.");
  }
}
const STORAGE_BASE = `${process.env.SUPABASE_URL ?? ""}/storage/v1/object/public/`;
const isBucketUrl = (bucket) => (u) => STORAGE_BASE !== "/storage/v1/object/public/" && u.startsWith(`${STORAGE_BASE}${bucket}/`);
const createPost_createServerFn_handler = createServerRpc({
  id: "dee99e0ac5def9629cb8b9b9fe9535cff849dbaaa6d14014cc0e8f85a17360dc",
  name: "createPost",
  filename: "../algorhythm/src/lib/posts.functions.ts"
}, (opts) => createPost.__executeServer(opts));
const createPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  type: enumType(["audio", "video"]),
  mediaUrl: stringType().url().refine(isBucketUrl("media"), "mediaUrl must point to the media bucket"),
  coverUrl: stringType().url().refine(isBucketUrl("covers"), "coverUrl must point to the covers bucket").nullish(),
  title: stringType().min(1).max(140),
  description: stringType().max(2e3).optional(),
  tags: arrayType(stringType().min(1).max(40)).max(12).optional(),
  aiTools: arrayType(stringType().min(1).max(60)).max(12).optional(),
  durationSeconds: numberType().int().min(1).max(60 * 60).nullish()
}).parse(input)).handler(createPost_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await requireVerifiedEmail(userId);
  let description = data.description?.trim() || null;
  if (!description) {
    const {
      data: profile
    } = await supabase.from("profiles").select("handle, display_name").eq("id", userId).maybeSingle();
    const who = profile?.handle ? `@${profile.handle}` : "an independent creator";
    const tagStr = (data.tags ?? []).slice(0, 5).map((t) => `#${t}`).join(" ");
    description = `AI-made ${data.type} "${data.title}" by ${who} on AlgoRhythm.${tagStr ? ` ${tagStr}` : ""}`.slice(0, 280);
  }
  const {
    data: post,
    error
  } = await supabase.from("posts").insert({
    creator_id: userId,
    type: data.type,
    media_url: data.mediaUrl,
    cover_url: data.coverUrl ?? null,
    title: data.title,
    description,
    tags: data.tags ?? [],
    ai_tools: data.aiTools ?? [],
    duration_seconds: data.durationSeconds ?? null
  }).select("*").single();
  if (error) throw new Error(error.message);
  return {
    post
  };
});
const deletePost_createServerFn_handler = createServerRpc({
  id: "9781eea9f07b5d50a9898caafe9147f78d9c8c33a09b5bb298f3d78326686166",
  name: "deletePost",
  filename: "../algorhythm/src/lib/posts.functions.ts"
}, (opts) => deletePost.__executeServer(opts));
const deletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deletePost_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("posts").delete().eq("id", data.id).eq("creator_id", userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const updatePost_createServerFn_handler = createServerRpc({
  id: "9ce5830f908e44fabf4b15199c54b71d19bdc79bd3480ac2213b37bcf1f6e63d",
  name: "updatePost",
  filename: "../algorhythm/src/lib/posts.functions.ts"
}, (opts) => updatePost.__executeServer(opts));
const updatePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  title: stringType().min(1).max(140).optional(),
  description: stringType().max(2e3).optional(),
  tags: arrayType(stringType().min(1).max(40)).max(12).optional(),
  pinned_comment: stringType().max(1e3).nullish()
}).parse(input)).handler(updatePost_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    id,
    ...patch
  } = data;
  const {
    data: row,
    error
  } = await supabase.from("posts").update(patch).eq("id", id).eq("creator_id", userId).select("*").single();
  if (error) throw new Error(error.message);
  return {
    post: row
  };
});
const getMyProfile_createServerFn_handler = createServerRpc({
  id: "0294383a2dcc8cda48ac2e0db0e570cdd658b49afb14d5eb20819767a9497104",
  name: "getMyProfile",
  filename: "../algorhythm/src/lib/posts.functions.ts"
}, (opts) => getMyProfile.__executeServer(opts));
const getMyProfile = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyProfile_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const [{
    data: profile
  }, {
    data: posts
  }] = await Promise.all([supabase.from("profiles").select("*").eq("id", userId).maybeSingle(), supabase.from("posts").select("id, type, cover_url, media_url, title, description, tags, like_count, view_count, created_at").eq("creator_id", userId).order("created_at", {
    ascending: false
  })]);
  return {
    profile,
    posts: posts ?? []
  };
});
const updateMyProfile_createServerFn_handler = createServerRpc({
  id: "4f6aeccb1ab551e8fc95e957a150b1dbc85b072c88e0aaaf578723d40279fcf3",
  name: "updateMyProfile",
  filename: "../algorhythm/src/lib/posts.functions.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
const updateMyProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  display_name: stringType().min(1).max(60).optional(),
  bio: stringType().max(280).optional(),
  avatar_url: stringType().url().nullish(),
  handle: stringType().min(3).max(24).regex(/^[a-z0-9_]+$/, "lowercase letters, numbers, underscores").optional()
}).parse(input)).handler(updateMyProfile_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: row,
    error
  } = await supabase.from("profiles").update(data).eq("id", userId).select("*").single();
  if (error) throw new Error(error.message);
  return {
    profile: row
  };
});
export {
  createPost_createServerFn_handler,
  deletePost_createServerFn_handler,
  getMyProfile_createServerFn_handler,
  updateMyProfile_createServerFn_handler,
  updatePost_createServerFn_handler
};
