import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { c as cn, g as getFeed, s as searchAll } from "./router-CFClAfxv.mjs";
import { b as bgLoop } from "./bg-loop.mp4.asset-D8QQ3CZg.mjs";
import { r as resolveStorageUrl } from "./storage-C0T7Obi-.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { h as Search, i as Play } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-rhKTeA7I.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client.server-LV8D9vnO.mjs";
import "./createSsrRpc-BvEa_6le.mjs";
import "./server-BFmo0EM4.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "events";
import "http";
import "https";
import "os";
const MOOD_TAGS = ["chill", "hype", "lofi", "trap", "ambient", "synthwave", "drill", "pop", "rnb", "house"];
const AI_TOOLS = ["suno", "udio", "riffusion", "stable-audio", "soundraw", "boomy"];
function DiscoverPage() {
  const fetchFeed = getFeed;
  const search = searchAll;
  const {
    user
  } = useAuth();
  const [q, setQ] = reactExports.useState("");
  const [tag, setTag] = reactExports.useState(null);
  const [aiTool, setAiTool] = reactExports.useState(null);
  const {
    data: trending
  } = useQuery({
    queryKey: ["trending", user?.id ?? null, tag, aiTool],
    queryFn: () => fetchFeed({
      data: {
        limit: 24,
        viewerId: user?.id ?? null,
        tag,
        aiTool
      }
    })
  });
  const {
    data: results
  } = useQuery({
    queryKey: ["search", q],
    queryFn: () => search({
      data: {
        q
      }
    }),
    enabled: q.trim().length > 1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-5 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundVideo, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]", children: "Discover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search creators, tracks, tags", className: "w-full rounded-md border border-gold/30 bg-card/95 px-9 py-2.5 text-sm text-foreground placeholder:text-foreground/70 outline-none focus:border-gold/70" })
    ] }),
    q.trim().length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 space-y-6", children: [
      results?.profiles && results.profiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] uppercase tracking-[0.2em] text-gold-soft", children: "Creators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: results.profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/u/$handle", params: {
          handle: p.handle
        }, className: "flex items-center gap-3 rounded-md border border-gold/20 bg-card/95 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { url: p.avatar_url, name: p.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground drop-shadow-sm", children: [
              "@",
              p.handle
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground", children: p.display_name })
          ] })
        ] }) }, p.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PostGrid, { posts: results?.posts ?? [] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5 text-[10px] uppercase tracking-[0.2em] text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]", children: "Mood" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { options: MOOD_TAGS, value: tag, onChange: setTag })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5 text-[10px] uppercase tracking-[0.2em] text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]", children: "AI Tool" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChips, { options: AI_TOOLS, value: aiTool, onChange: setAiTool })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 mt-5 text-[11px] uppercase tracking-[0.2em] text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]", children: tag || aiTool ? "Filtered" : "Trending" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PostGrid, { posts: trending?.items ?? [] })
    ] })
  ] }) });
}
function FilterChips({
  options,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((o) => {
    const active = value === o;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(active ? null : o), className: cn("rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wide transition", active ? "border-gold/60 bg-gold/15 text-gold" : "border-gold/30 bg-card/95 text-foreground hover:border-gold/60 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]"), children: o }, o);
  }) });
}
function BackgroundVideo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: bgLoop.url, autoPlay: true, loop: true, muted: true, playsInline: true, "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0 bg-background/55" })
  ] });
}
function PostGrid({
  posts
}) {
  if (posts.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70", children: "Nothing yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: posts.map((p) => {
    const isVideo = p.type === "video";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/p/$id", params: {
      id: p.id
    }, className: "relative aspect-[3/4] overflow-hidden rounded-md bg-card", children: [
      p.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveStorageUrl(p.cover_url), alt: p.title, className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }) : isVideo && p.media_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: `${resolveStorageUrl(p.media_url)}#t=0.1`, preload: "metadata", muted: true, playsInline: true, className: "absolute inset-0 h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-card to-background" }),
      isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-2.5 w-2.5 fill-white text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[11px] text-white", children: p.title }) })
    ] }, p.id);
  }) });
}
function Avatar({
  url,
  name
}) {
  if (url) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: name, className: "h-10 w-10 rounded-full object-cover ring-1 ring-gold/30" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-sm font-bold text-primary-foreground", children: name.slice(0, 1).toUpperCase() });
}
export {
  DiscoverPage as component
};
