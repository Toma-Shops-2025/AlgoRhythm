import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const toggleSave_createServerFn_handler = createServerRpc({
  id: "37ab50dd74fdb6cf37a625654ef5859292af2db33d61b44eb97cf476b6660a18",
  name: "toggleSave",
  filename: "src/lib/saves.functions.ts"
}, (opts) => toggleSave.__executeServer(opts));
const toggleSave = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(toggleSave_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: existing
  } = await supabase.from("saves").select("post_id").eq("post_id", data.postId).eq("user_id", userId).maybeSingle();
  if (existing) {
    await supabase.from("saves").delete().eq("post_id", data.postId).eq("user_id", userId);
    return {
      saved: false
    };
  }
  await supabase.from("saves").insert({
    post_id: data.postId,
    user_id: userId
  });
  return {
    saved: true
  };
});
const getMyLibrary_createServerFn_handler = createServerRpc({
  id: "64025f727cb0e4f299dcfc839b692c8d4ec5e2a23d1b5b44007e2b609ad9baaf",
  name: "getMyLibrary",
  filename: "src/lib/saves.functions.ts"
}, (opts) => getMyLibrary.__executeServer(opts));
const getMyLibrary = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMyLibrary_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: rows
  } = await supabase.from("saves").select("post_id, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(200);
  const ids = (rows ?? []).map((r) => r.post_id);
  if (ids.length === 0) return {
    posts: []
  };
  const {
    data: posts
  } = await supabaseAdmin.from("posts").select("id, type, cover_url, media_url, title, like_count, view_count, created_at, creator_id").in("id", ids).eq("is_published", true);
  const byId = new Map((posts ?? []).map((p) => [p.id, p]));
  return {
    posts: ids.map((id) => byId.get(id)).filter(Boolean)
  };
});
export {
  getMyLibrary_createServerFn_handler,
  toggleSave_createServerFn_handler
};
