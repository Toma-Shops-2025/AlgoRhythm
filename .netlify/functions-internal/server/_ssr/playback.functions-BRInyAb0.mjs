import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, e as enumType, s as stringType } from "../_libs/zod.mjs";
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
const recordPlayback_createServerFn_handler = createServerRpc({
  id: "8474282713a173c5c5e084437a69230af29801b798f65eecc0128c5494782098",
  name: "recordPlayback",
  filename: "src/lib/playback.functions.ts"
}, (opts) => recordPlayback.__executeServer(opts));
const recordPlayback = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  postId: stringType().uuid(),
  event: enumType(["play", "complete", "loop"]),
  listenedMs: numberType().int().min(0).max(60 * 60 * 1e3).optional()
}).parse(input)).handler(recordPlayback_createServerFn_handler, async ({
  data
}) => {
  const {
    data: row
  } = await supabaseAdmin.from("posts").select("play_count, complete_count, loop_count, view_count, total_listen_ms").eq("id", data.postId).maybeSingle();
  if (!row) return {
    ok: false
  };
  const update = {};
  if (data.event === "play") {
    update.play_count = (row.play_count ?? 0) + 1;
    update.view_count = (row.view_count ?? 0) + 1;
  } else if (data.event === "complete") {
    update.complete_count = (row.complete_count ?? 0) + 1;
  } else if (data.event === "loop") {
    update.loop_count = (row.loop_count ?? 0) + 1;
  }
  if (data.listenedMs && data.listenedMs > 0) {
    update.total_listen_ms = (row.total_listen_ms ?? 0) + data.listenedMs;
  }
  await supabaseAdmin.from("posts").update(update).eq("id", data.postId);
  return {
    ok: true
  };
});
export {
  recordPlayback_createServerFn_handler
};
