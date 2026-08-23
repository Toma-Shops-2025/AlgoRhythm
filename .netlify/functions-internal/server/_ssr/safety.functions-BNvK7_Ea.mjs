import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
const REPORT_REASONS = ["spam", "harassment", "hate", "sexual", "violence", "csam", "impersonation", "ip_violation", "self_harm", "illegal", "other"];
const submitReport_createServerFn_handler = createServerRpc({
  id: "e36fbc70a7b34db54231b924d19295cda1b7ce33f3afbb02edd76a53c2a3ff5b",
  name: "submitReport",
  filename: "../algorhythm/src/lib/safety.functions.ts"
}, (opts) => submitReport.__executeServer(opts));
const submitReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetType: enumType(["post", "comment", "user"]),
  targetId: stringType().uuid(),
  reason: enumType(REPORT_REASONS),
  details: stringType().max(1e3).optional()
}).parse(input)).handler(submitReport_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await supabaseAdmin.from("reports").insert({
    reporter_id: context.userId,
    target_type: data.targetType,
    target_id: data.targetId,
    reason: data.reason,
    details: data.details ?? null
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const toggleBlock_createServerFn_handler = createServerRpc({
  id: "1e0d4a13c7f29305bf83436dd1a48cb828c89579757496f12ee99dc52a33c955",
  name: "toggleBlock",
  filename: "../algorhythm/src/lib/safety.functions.ts"
}, (opts) => toggleBlock.__executeServer(opts));
const toggleBlock = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(toggleBlock_createServerFn_handler, async ({
  data,
  context
}) => {
  if (data.targetUserId === context.userId) throw new Error("You can't block yourself");
  const {
    supabase,
    userId
  } = context;
  const {
    data: existing
  } = await supabase.from("blocks").select("blocker_id").eq("blocker_id", userId).eq("blocked_id", data.targetUserId).maybeSingle();
  if (existing) {
    await supabase.from("blocks").delete().eq("blocker_id", userId).eq("blocked_id", data.targetUserId);
    return {
      blocked: false
    };
  }
  await supabase.from("follows").delete().or(`and(follower_id.eq.${userId},following_id.eq.${data.targetUserId}),and(follower_id.eq.${data.targetUserId},following_id.eq.${userId})`);
  const {
    error
  } = await supabase.from("blocks").insert({
    blocker_id: userId,
    blocked_id: data.targetUserId
  });
  if (error) throw new Error(error.message);
  return {
    blocked: true
  };
});
const listMyBlocks_createServerFn_handler = createServerRpc({
  id: "12e6c1ddc252e8ebe6bb9c6023b7d9efdfea46f26e7f957701dd67d0733d18b1",
  name: "listMyBlocks",
  filename: "../algorhythm/src/lib/safety.functions.ts"
}, (opts) => listMyBlocks.__executeServer(opts));
const listMyBlocks = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listMyBlocks_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: rows
  } = await supabase.from("blocks").select("blocked_id, created_at").eq("blocker_id", userId).order("created_at", {
    ascending: false
  });
  const ids = (rows ?? []).map((r) => r.blocked_id);
  if (!ids.length) return {
    blocked: []
  };
  const {
    data: profiles
  } = await supabaseAdmin.from("profiles").select("id, handle, display_name, avatar_url").in("id", ids);
  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
  return {
    blocked: (rows ?? []).map((r) => ({
      ...r,
      profile: byId.get(r.blocked_id) ?? null
    }))
  };
});
const isBlocking_createServerFn_handler = createServerRpc({
  id: "57cc15186382dbb53d3e73a2b2a30e303ad85e32ed95e341410ae9539f98c149",
  name: "isBlocking",
  filename: "../algorhythm/src/lib/safety.functions.ts"
}, (opts) => isBlocking.__executeServer(opts));
const isBlocking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(isBlocking_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: row
  } = await supabase.from("blocks").select("blocker_id").eq("blocker_id", userId).eq("blocked_id", data.targetUserId).maybeSingle();
  return {
    blocked: !!row
  };
});
export {
  isBlocking_createServerFn_handler,
  listMyBlocks_createServerFn_handler,
  submitReport_createServerFn_handler,
  toggleBlock_createServerFn_handler
};
