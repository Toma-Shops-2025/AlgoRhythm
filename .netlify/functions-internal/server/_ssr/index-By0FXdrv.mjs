import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { F as FeedItem } from "./FeedItem-CnkQr2eK.mjs";
import { C as CommentsSheet } from "./CommentsSheet-D1ahEYAg.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { g as getBlockedCreatorIds } from "./blocked-creators-BGPJbj6-.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { i as isPlayablePost } from "./storage-C0T7Obi-.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import "../_libs/stripe__react-stripe-js.mjs";
import "../_libs/stripe__stripe-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./router-CFClAfxv.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client.server-LV8D9vnO.mjs";
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
import "./server-BFmo0EM4.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
import "./Logo-BGOt1dsf.mjs";
import "./payments.functions-CI6_eqWr.mjs";
import "./dialog-BFSxUYhI.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./stripe-FMfoOcDi.mjs";
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
import "./label-BfBOhddq.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./safety.functions-CxQbTYIp.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/prop-types.mjs";
function createRng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0;
    return s / 4294967296;
  };
}
function shuffleWithSeed(input, seed) {
  const arr = [...input];
  const rand = createRng(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function newSessionSeed() {
  return (Date.now() ^ Math.floor(Math.random() * 2147483647)) >>> 0;
}
const FEED_PAGE_SIZE = 12;
const BATCH = 500;
const libraryCache = /* @__PURE__ */ new Map();
async function fetchAllPublishedPosts() {
  const rows = [];
  for (let from = 0; ; from += BATCH) {
    const { data, error } = await supabase.from("posts").select("*").eq("is_published", true).order("created_at", { ascending: false }).range(from, from + BATCH - 1);
    if (error) throw error;
    const batch = data ?? [];
    rows.push(...batch);
    if (batch.length < BATCH) break;
  }
  return rows;
}
async function getShuffledLibrary(seed) {
  const hit = libraryCache.get(seed);
  if (hit) return hit;
  const all = await fetchAllPublishedPosts();
  const playable = all.filter(isPlayablePost);
  const base = playable.length > 0 ? playable : all;
  const shuffled = shuffleWithSeed(base, seed);
  libraryCache.set(seed, shuffled);
  return shuffled;
}
async function attachCreators(posts) {
  if (posts.length === 0) return [];
  const creatorIds = [...new Set(posts.map((p) => p.creator_id))];
  const { data: profiles } = await supabase.from("profiles").select("id, handle, display_name, avatar_url").in("id", creatorIds);
  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  return posts.map((p) => ({
    ...p,
    creator: profileMap.get(p.creator_id) || {
      display_name: "Creator",
      handle: "user",
      avatar_url: null
    }
  }));
}
async function fetchShuffledFeedPage(page, seed) {
  const library = await getShuffledLibrary(seed);
  const from = page * FEED_PAGE_SIZE;
  const slice = library.slice(from, from + FEED_PAGE_SIZE);
  return {
    items: await attachCreators(slice),
    nextPage: page + 1,
    hasMore: from + FEED_PAGE_SIZE < library.length
  };
}
function FeedPage() {
  useAuth();
  useNavigate();
  const [active, setActive] = reactExports.useState(0);
  const [muted, setMuted] = reactExports.useState(true);
  const [volume, setVolume] = reactExports.useState(1);
  const [commentsFor, setCommentsFor] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const unmuteFeed = () => {
    setMuted(false);
    setVolume(1);
  };
  const setFeedVolume = (v) => {
    setVolume(v);
    if (v > 0) setMuted(false);
    else setMuted(true);
  };
  const [sessionSeed] = reactExports.useState(() => newSessionSeed());
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["feed", "shuffled", sessionSeed],
    initialPageParam: 0,
    staleTime: 3e4,
    retry: 1,
    queryFn: async ({
      pageParam = 0
    }) => {
      const withTimeout = (promise, ms = 12e3) => Promise.race([Promise.resolve(promise), new Promise((_, reject) => window.setTimeout(() => reject(new Error("Feed timed out — check connection and try again")), ms))]);
      return withTimeout(fetchShuffledFeedPage(pageParam, sessionSeed));
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : void 0
  });
  const [blockedTick, setBlockedTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setBlockedTick((t) => t + 1);
    const onFocus = () => setBlockedTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);
  const basePosts = reactExports.useMemo(() => {
    const blocked = new Set(getBlockedCreatorIds());
    return (data?.pages.flatMap((page) => page.items) ?? []).filter((p) => !blocked.has(p.creator_id));
  }, [data, blockedTick]);
  reactExports.useEffect(() => {
    const root = containerRef.current;
    if (!root || basePosts.length === 0) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          setActive(Number(e.target.dataset.idx));
        }
      });
    }, {
      root,
      threshold: 0.6
    });
    root.querySelectorAll("[data-feed-item]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [basePosts]);
  reactExports.useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (active >= basePosts.length - 2) fetchNextPage();
  }, [active, basePosts.length, hasNextPage, isFetchingNextPage]);
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center bg-black p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl text-red-500 font-bold mb-2 tracking-tighter uppercase italic", children: "Sync Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] font-bold uppercase tracking-widest", children: error.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => refetch(), className: "mt-8 bg-primary text-black px-10 py-3 rounded-full font-black uppercase text-xs shadow-glow", children: "Retry Sync" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "h-dvh snap-y snap-mandatory overflow-y-scroll bg-black no-scrollbar", style: {
      scrollbarWidth: "none"
    }, children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic animate-pulse", children: "Initializing Feed..." }),
      !isLoading && basePosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl text-gradient-gold font-black italic uppercase tracking-tighter", children: "Feed Empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest", children: "Upload a track or video — your post goes live instantly on Supabase Storage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/upload", className: "mt-8 inline-block rounded-full bg-gradient-gold px-8 py-3 text-sm font-black text-black uppercase shadow-glow", children: "Create First Post" })
      ] }) }),
      basePosts.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-feed-item": true, "data-idx": idx, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedItem, { post, active: idx === active, liked: false, following: false, saved: false, onLike: () => {
      }, onFollow: () => {
      }, onComment: () => setCommentsFor(post.id), onSave: () => {
      }, muted, volume, onUnmute: unmuteFeed, onMute: () => setMuted(true), onVolumeChange: setFeedVolume }) }, post.id)),
      isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-full flex items-center justify-center bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin text-primary h-6 w-6" }) }),
      !isLoading && basePosts.length > 0 && !hasNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-[40vh] place-items-center bg-black px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.3em] text-white/35", children: "You’ve seen every post — reopen the app for a fresh shuffle" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: commentsFor, open: !!commentsFor, onClose: () => setCommentsFor(null) })
  ] });
}
function Loader2(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) });
}
export {
  FeedPage as component
};
