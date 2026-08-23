import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { i as isPlayablePost } from "./storage-C0T7Obi-.mjs";
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
const getFeed_createServerFn_handler = createServerRpc({
  id: "96c8135a3ac1702dccf040ea049bc468fa97ded4781973373df6dcf3b15a6824",
  name: "getFeed",
  filename: "../algorhythm/src/lib/feed.functions.ts"
}, (opts) => getFeed.__executeServer(opts));
const getFeed = createServerFn({
  method: "GET"
}).inputValidator((input) => input ?? {}).handler(getFeed_createServerFn_handler, async ({
  data
}) => {
  const limit = data.limit ?? 50;
  let query = supabase.from("posts").select("*").eq("is_published", true);
  if (data.tag) query = query.contains("tags", [data.tag]);
  if (data.aiTool) query = query.contains("ai_tools", [data.aiTool]);
  const {
    count
  } = await supabase.from("posts").select("*", {
    count: "exact",
    head: true
  }).eq("is_published", true);
  const total = count || 0;
  const randomOffset = total > limit ? Math.floor(Math.random() * (total - limit)) : 0;
  const {
    data: posts,
    error
  } = await query.range(randomOffset, randomOffset + limit - 1);
  if (error) {
    console.error("Feed: DB Error", error.message);
    return {
      items: [],
      nextCursor: null
    };
  }
  if (!posts || posts.length === 0) {
    return {
      items: [],
      nextCursor: null
    };
  }
  const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
  const {
    data: creators
  } = await supabase.from("profiles").select("id, handle, display_name, avatar_url").in("id", creatorIds);
  const byId = new Map((creators ?? []).map((c) => [c.id, c]));
  const finalItems = posts.filter(isPlayablePost).map((p) => ({
    ...p,
    creator: byId.get(p.creator_id) || {
      display_name: "Creator",
      handle: "user",
      avatar_url: null
    }
  })).sort(() => Math.random() - 0.5);
  return {
    items: finalItems,
    nextCursor: null
  };
});
const getPostById_createServerFn_handler = createServerRpc({
  id: "bd20cc845229a9ef552ba97f6da70ec53f7b458ddee5a62bda484a06eeec3f2d",
  name: "getPostById",
  filename: "../algorhythm/src/lib/feed.functions.ts"
}, (opts) => getPostById.__executeServer(opts));
const getPostById = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(getPostById_createServerFn_handler, async ({
  data
}) => {
  const {
    data: post,
    error
  } = await supabase.from("posts").select("*").eq("id", data.id).eq("is_published", true).maybeSingle();
  if (error || !post) return {
    post: null,
    creator: null
  };
  const {
    data: creator
  } = await supabase.from("profiles").select("id, handle, display_name, avatar_url").eq("id", post.creator_id).maybeSingle();
  return {
    post,
    creator: creator ?? null
  };
});
const getProfileByHandle_createServerFn_handler = createServerRpc({
  id: "470ddfbc3603d8dbbe268aeac0cf519dbcb8d7fa11fd008e251b59c141c66793",
  name: "getProfileByHandle",
  filename: "../algorhythm/src/lib/feed.functions.ts"
}, (opts) => getProfileByHandle.__executeServer(opts));
const getProfileByHandle = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(getProfileByHandle_createServerFn_handler, async ({
  data
}) => {
  const {
    data: profile
  } = await supabase.from("profiles").select("id, handle, display_name, avatar_url, bio").eq("handle", data.handle).maybeSingle();
  if (!profile) return {
    profile: null,
    posts: []
  };
  const {
    data: posts
  } = await supabase.from("posts").select("*").eq("creator_id", profile.id).eq("is_published", true).order("created_at", {
    ascending: false
  });
  return {
    profile,
    posts: posts ?? []
  };
});
const getCreatorPostIds_createServerFn_handler = createServerRpc({
  id: "6e543eee6892f286d9ecc8d0255fcd21512adb7564c1ecfb48bd32cbd62df4e4",
  name: "getCreatorPostIds",
  filename: "../algorhythm/src/lib/feed.functions.ts"
}, (opts) => getCreatorPostIds.__executeServer(opts));
const getCreatorPostIds = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(getCreatorPostIds_createServerFn_handler, async ({
  data
}) => {
  const {
    data: posts
  } = await supabase.from("posts").select("id").eq("creator_id", data.creatorId).eq("is_published", true);
  return {
    ids: (posts ?? []).map((p) => p.id)
  };
});
const searchAll_createServerFn_handler = createServerRpc({
  id: "9ab81eabf349c2b3f495474589afdb920a10a80ce2afec31528e9caa00546980",
  name: "searchAll",
  filename: "../algorhythm/src/lib/feed.functions.ts"
}, (opts) => searchAll.__executeServer(opts));
const searchAll = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(searchAll_createServerFn_handler, async ({
  data
}) => {
  const q = data.q.trim();
  if (!q) return {
    posts: [],
    profiles: []
  };
  const {
    data: posts
  } = await supabase.from("posts").select("*").eq("is_published", true).or(`title.ilike.%${q}%,description.ilike.%${q}%`).limit(20);
  const {
    data: profiles
  } = await supabase.from("profiles").select("id, handle, display_name, avatar_url").or(`handle.ilike.%${q}%,display_name.ilike.%${q}%`).limit(20);
  return {
    posts: posts ?? [],
    profiles: profiles ?? []
  };
});
export {
  getCreatorPostIds_createServerFn_handler,
  getFeed_createServerFn_handler,
  getPostById_createServerFn_handler,
  getProfileByHandle_createServerFn_handler,
  searchAll_createServerFn_handler
};
