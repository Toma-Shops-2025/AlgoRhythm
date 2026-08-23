import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const deleteAccount_createServerFn_handler = createServerRpc({
  id: "6532c0418ba9329af9f16b7b8e7fcee96c637a7170910bf85d988011b35489bc",
  name: "deleteAccount",
  filename: "../algorhythm/src/lib/account.functions.ts"
}, (opts) => deleteAccount.__executeServer(opts));
const deleteAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(deleteAccount_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  for (const bucket of ["media", "covers", "avatars"]) {
    try {
      const {
        data: files
      } = await supabaseAdmin.storage.from(bucket).list(userId, {
        limit: 1e3
      });
      if (files && files.length) {
        await supabaseAdmin.storage.from(bucket).remove(files.map((f) => `${userId}/${f.name}`));
      }
    } catch {
    }
  }
  await supabaseAdmin.from("comments").delete().eq("user_id", userId);
  await supabaseAdmin.from("likes").delete().eq("user_id", userId);
  await supabaseAdmin.from("follows").delete().eq("follower_id", userId);
  await supabaseAdmin.from("follows").delete().eq("following_id", userId);
  await supabaseAdmin.from("posts").delete().eq("creator_id", userId);
  await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
  await supabaseAdmin.from("profiles").delete().eq("id", userId);
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  deleteAccount_createServerFn_handler
};
