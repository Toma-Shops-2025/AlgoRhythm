import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as Route$7, e as postQueryOptions, f as getCreatorPostIds } from "./router-CFClAfxv.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppShell, u as useAuth } from "./AppShell-D17K3a5v.mjs";
import { A as AudioVisualizer, C as CommentsSheet, a as toggleLike } from "./CommentsSheet-D1ahEYAg.mjs";
import { d as deletePost } from "./posts.functions-HCsiXm05.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as resolveStorageUrl } from "./storage-C0T7Obi-.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { i as Play, j as VolumeX, k as Volume2, R as CircleCheck, W as ArrowRight, P as Pencil, Y as RefreshCw, l as Heart, m as MessageCircle, p as Share2, Z as ChevronLeft, q as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
function PostPage() {
  const {
    id
  } = Route$7.useParams();
  const {
    data
  } = useSuspenseQuery(postQueryOptions(id));
  if (!data.post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-sm text-muted-foreground", children: "Post not found." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostContent, { post: data.post, creator: data.creator });
}
function PostContent({
  post: p,
  creator
}) {
  const search = Route$7.useSearch();
  const like = toggleLike;
  const removePost = deletePost;
  const siblingsFn = getCreatorPostIds;
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const [audioEl, setAudioEl] = reactExports.useState(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [muted, setMuted] = reactExports.useState(true);
  const [volume, setVolume] = reactExports.useState(1);
  const [showComments, setShowComments] = reactExports.useState(false);
  const [regenBusy, setRegenBusy] = reactExports.useState(false);
  const mediaUrl = resolveStorageUrl(p.media_url);
  const coverUrl = resolveStorageUrl(p.cover_url);
  const isOwner = !!user && user.id === p.creator_id;
  const justPosted = search.new === 1 && isOwner;
  const regenCount = search.regen ?? 0;
  const regensLeft = Math.max(0, 2 - regenCount);
  const {
    data: siblings
  } = useSuspenseQuery({
    queryKey: ["creator-post-ids", p.creator_id],
    queryFn: () => siblingsFn({
      data: {
        creatorId: p.creator_id
      }
    })
  });
  const ids = siblings?.ids ?? [];
  const idx = ids.indexOf(p.id);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null;
  reactExports.useEffect(() => {
    setAudioEl(audioRef.current);
  }, [p.id, p.type, mediaUrl]);
  reactExports.useEffect(() => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el || !mediaUrl) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      el.muted = true;
      el.volume = volume;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    if (el.readyState >= 2) start();
    else el.addEventListener("canplay", start, {
      once: true
    });
    return () => {
      cancelled = true;
      el.removeEventListener("canplay", start);
      el.pause();
    };
  }, [p.id, p.type, mediaUrl]);
  reactExports.useEffect(() => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    el.muted = muted;
    el.volume = volume;
    if (!muted) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [muted, volume, p.type]);
  const unmuteAndPlay = async (vol = 1) => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    setMuted(false);
    setVolume(vol);
    el.muted = false;
    el.volume = vol;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };
  const regenerate = async () => {
    if (regensLeft <= 0) return;
    if (!confirm("Delete this post and start over?")) return;
    setRegenBusy(true);
    try {
      await removePost({
        data: {
          id: p.id
        }
      });
      navigate({
        to: "/upload",
        search: {
          regen: regenCount + 1
        }
      });
    } catch (e) {
      toast.error(e.message);
      setRegenBusy(false);
    }
  };
  const togglePlay = async () => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el || !mediaUrl) return;
    if (!el.paused) {
      el.pause();
      setPlaying(false);
      return;
    }
    if (volume > 0) {
      el.muted = false;
      setMuted(false);
    }
    el.volume = volume;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      el.muted = true;
      setMuted(true);
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
        toast.error("Could not play this file — check your connection and try again.");
      }
    }
  };
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({
      title: p.title,
      text: p.description ?? void 0,
      url
    }).catch(() => {
    });
    else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };
  const doLike = async () => {
    if (!user) return navigate({
      to: "/login"
    });
    try {
      await like({
        data: {
          postId: p.id
        }
      });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[70dvh] w-full overflow-hidden bg-black", children: [
      p.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, src: mediaUrl || void 0, poster: coverUrl || void 0, crossOrigin: "anonymous", preload: "auto", playsInline: true, loop: true, muted, className: "h-full w-full object-contain bg-black", onClick: togglePlay, onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onError: () => {
        setPlaying(false);
        toast.error("Could not load video — try refreshing.");
      } }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: mediaUrl || void 0, crossOrigin: "anonymous", preload: "auto", loop: true, muted, onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onError: () => {
          setPlaying(false);
          toast.error("Could not load audio — try refreshing.");
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AudioVisualizer, { audio: audioEl, playing, coverUrl: coverUrl || p.cover_url }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: togglePlay, className: "absolute inset-0 z-10", "aria-label": playing ? "Pause" : "Play" })
      ] }),
      !playing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-black/40 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-7 w-7 text-white" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": muted ? "Unmute" : "Mute", onClick: (e) => {
        e.stopPropagation();
        if (muted) void unmuteAndPlay(1);
        else setMuted(true);
      }, className: "absolute left-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur", children: muted || volume === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), className: "absolute left-4 top-[3.75rem] z-30 flex h-24 w-9 flex-col items-center justify-center rounded-full bg-black/40 px-1 py-2 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 1, step: 0.01, value: muted ? 0 : volume, onChange: (e) => {
        const v = Number.parseFloat(e.target.value);
        if (v === 0) {
          setMuted(true);
          setVolume(0);
          return;
        }
        void unmuteAndPlay(v);
      }, "aria-label": "Volume", className: "h-20 w-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[var(--gold)] [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5", children: [
      justPosted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-lg border border-gold/40 bg-gradient-to-br from-card/80 to-card/40 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " Posted! Preview it above."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "Happy with it? Send it to the feed. Or tweak the details, or start over." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
            to: "/"
          }), className: "inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_18px_-6px_var(--gold)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" }),
            " Continue to feed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
            to: "/upload"
          }), className: "inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Back to edit"
          ] }),
          p.type !== "video" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: regenerate, disabled: regenBusy || regensLeft <= 0, title: regensLeft <= 0 ? "No regenerations left" : `${regensLeft} regeneration${regensLeft === 1 ? "" : "s"} left`, className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-foreground hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3.5 w-3.5 ${regenBusy ? "animate-spin" : ""}` }),
            " ",
            regenBusy ? "Removing…" : regensLeft <= 0 ? "No regens left" : `Regenerate (${regensLeft} left)`
          ] })
        ] }),
        p.type !== "video" && regensLeft <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-muted-foreground", children: "You've used all 2 regenerations for this attempt. Continue to feed or edit instead." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl tracking-tight", children: p.title }),
      creator && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/u/$handle", params: {
        handle: creator.handle
      }, className: "mt-1 inline-block text-sm text-gold", children: [
        "@",
        creator.handle
      ] }),
      p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/90", children: p.description }),
      p.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: p.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-card px-2 py-0.5 text-[11px] text-muted-foreground", children: [
        "#",
        t
      ] }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: doLike, className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
          " ",
          p.like_count
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowComments(true), className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " ",
          p.comment_count
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: share, className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          " Share"
        ] })
      ] }),
      (prevId || nextId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => prevId && navigate({
          to: "/p/$id",
          params: {
            id: prevId
          }
        }), disabled: !prevId, className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
          " Newer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
          idx + 1,
          " / ",
          ids.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => nextId && navigate({
          to: "/p/$id",
          params: {
            id: nextId
          }
        }), disabled: !nextId, className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed", children: [
          "Older ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: showComments ? p.id : null, open: showComments, onClose: () => setShowComments(false) })
  ] });
}
export {
  PostPage as component
};
