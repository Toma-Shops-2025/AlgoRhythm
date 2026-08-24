import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell, s as signOut } from "./AppShell-D17K3a5v.mjs";
import { u as updateMyProfile, a as updatePost, d as deletePost, g as getMyProfile } from "./posts.functions-HCsiXm05.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { P as PostGridItem } from "./PostGridItem-BNgDsiJk.mjs";
import { F as FeedItem } from "./FeedItem-CnkQr2eK.mjs";
import { C as CommentsSheet } from "./CommentsSheet-D1ahEYAg.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-BFSxUYhI.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-tmNTbjN8.mjs";
import { c as createPortalSession } from "./payments.functions-CI6_eqWr.mjs";
import { g as getStripeEnvironment } from "./stripe-FMfoOcDi.mjs";
import { u as useProSubscription } from "./useSubscription-B2-XPe1t.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/stripe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe__react-stripe-js.mjs";
import "../_libs/stripe__stripe-js.mjs";
import { A as ArrowLeft, P as Pencil, b as Trash2, c as Camera, d as LogOut, e as ShieldCheck, C as Crown, f as Settings, G as Grid3x3, B as Bookmark, g as Plus } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "events";
import "http";
import "https";
import "os";
import "./storage-C0T7Obi-.mjs";
import "./Logo-BGOt1dsf.mjs";
import "./label-BfBOhddq.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./safety.functions-CxQbTYIp.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/prop-types.mjs";
const deleteAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("605045233debcf4fbca7c93f06a21eab51d31e90e5fab3208ca6233b08e8f1d1"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("37ab50dd74fdb6cf37a625654ef5859292af2db33d61b44eb97cf476b6660a18"));
const getMyLibrary = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("64025f727cb0e4f299dcfc839b692c8d4ec5e2a23d1b5b44007e2b609ad9baaf"));
function MePage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({
      data: data2
    }) => setIsAdmin(!!data2));
  }, [user]);
  const fetchMe = getMyProfile;
  const fetchLibrary = getMyLibrary;
  const update = updateMyProfile;
  const removePost = deletePost;
  const editPost = updatePost;
  const wipeAccount = deleteAccount;
  const portalFn = createPortalSession;
  const {
    isPro
  } = useProSubscription();
  const [editing, setEditing] = reactExports.useState(false);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [editingPost, setEditingPost] = reactExports.useState(null);
  const [deletingPostId, setDeletingPostId] = reactExports.useState(null);
  const [postBusy, setPostBusy] = reactExports.useState(false);
  const [deletingAccount, setDeletingAccount] = reactExports.useState(false);
  const [accountBusy, setAccountBusy] = reactExports.useState(false);
  const [confirmText, setConfirmText] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("posts");
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const [muted, setMuted] = reactExports.useState(true);
  const [commentsFor, setCommentsFor] = reactExports.useState(null);
  const feedContainerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [loading, user, navigate]);
  const {
    data
  } = useQuery({
    queryKey: ["me", user?.id],
    queryFn: () => fetchMe({}),
    enabled: !!user
  });
  const {
    data: library
  } = useQuery({
    queryKey: ["my-library", user?.id],
    queryFn: () => fetchLibrary({}),
    enabled: !!user && tab === "library"
  });
  reactExports.useEffect(() => {
    if (data?.profile) {
      setDisplayName(data.profile.display_name);
      setBio(data.profile.bio ?? "");
    }
  }, [data]);
  const shuffledLibrary = reactExports.useMemo(() => {
    if (!library?.posts) return [];
    return [...library.posts].sort(() => Math.random() - 0.5);
  }, [library]);
  const feedItems = reactExports.useMemo(() => {
    return tab === "posts" ? data?.posts ?? [] : shuffledLibrary;
  }, [tab, data?.posts, shuffledLibrary]);
  const onAvatar = async (file) => {
    if (!user) return;
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const {
      error
    } = await supabase.storage.from("avatars").upload(path, file, {
      contentType: file.type
    });
    if (error) return toast.error(error.message);
    const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    await update({
      data: {
        avatar_url: url
      }
    });
    qc.invalidateQueries({
      queryKey: ["me"]
    });
    toast.success("Avatar updated");
  };
  const save = async () => {
    setBusy(true);
    try {
      await update({
        data: {
          display_name: displayName,
          bio
        }
      });
      qc.invalidateQueries({
        queryKey: ["me"]
      });
      setEditing(false);
      toast.success("Saved");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const manage = async () => {
    const res = await portalFn({
      data: {
        environment: getStripeEnvironment(),
        returnUrl: window.location.href
      }
    });
    if ("error" in res) return toast.error(res.error);
    window.open(res.url, "_blank");
  };
  const savePostEdit = async () => {
    if (!editingPost) return;
    setPostBusy(true);
    try {
      const tagList = editingPost.tags.split(/[,\s]+/).map((t) => t.replace(/^#/, "").trim().toLowerCase()).filter(Boolean).slice(0, 12);
      await editPost({
        data: {
          id: editingPost.id,
          title: editingPost.title.trim(),
          description: editingPost.description,
          tags: tagList,
          pinned_comment: editingPost.pinned_comment?.trim() || null
        }
      });
      qc.invalidateQueries({
        queryKey: ["me"]
      });
      qc.invalidateQueries({
        queryKey: ["my-library"]
      });
      setEditingPost(null);
      toast.success("Post updated");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPostBusy(false);
    }
  };
  const confirmDelete = async () => {
    if (!deletingPostId) return;
    setPostBusy(true);
    try {
      await removePost({
        data: {
          id: deletingPostId
        }
      });
      qc.invalidateQueries({
        queryKey: ["me"]
      });
      setDeletingPostId(null);
      toast.success("Post deleted");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPostBusy(false);
    }
  };
  reactExports.useEffect(() => {
    if (viewMode === "feed" && feedContainerRef.current) {
      const target = feedContainerRef.current.children[activeIdx];
      target?.scrollIntoView({
        behavior: "auto"
      });
    }
  }, [viewMode, activeIdx]);
  reactExports.useEffect(() => {
    const root = feedContainerRef.current;
    if (!root || viewMode !== "feed") return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.7) {
          setActiveIdx(Number(e.target.dataset.idx));
        }
      });
    }, {
      root,
      threshold: [0.7]
    });
    root.querySelectorAll("[data-idx]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [viewMode, feedItems]);
  if (!data?.profile) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-sm text-muted-foreground", children: "Loading…" }) });
  const p = data.profile;
  if (viewMode === "feed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-dvh w-full overflow-hidden bg-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("grid"), className: "flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-white drop-shadow", children: tab === "posts" ? "Your Posts" : "Your Library (Shuffled)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: feedContainerRef, className: "h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar", children: feedItems.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-idx": idx, className: "h-full w-full snap-start relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeedItem, { post: {
            ...post,
            creator: tab === "posts" ? p : post.creator
          }, active: idx === activeIdx, liked: false, following: false, saved: tab === "library", onLike: () => {
          }, onFollow: () => {
          }, onComment: () => setCommentsFor(post.id), onSave: () => {
          }, muted, onToggleMute: () => setMuted(!muted), autoAdvance: tab === "library", onEnded: () => {
            if (tab === "library" && idx < feedItems.length - 1) {
              const next = idx + 1;
              setActiveIdx(next);
              const target = feedContainerRef.current?.children[next];
              target?.scrollIntoView({
                behavior: "smooth"
              });
            }
          } }),
          tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setEditingPost({
                id: post.id,
                title: post.title,
                description: post.description || "",
                tags: post.tags?.map((t) => `#${t}`).join(" ") || "",
                pinned_comment: post.pinned_comment || ""
              });
            }, className: "h-10 w-10 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeletingPostId(post.id), className: "h-10 w-10 grid place-items-center rounded-full bg-black/40 text-destructive backdrop-blur border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }) })
          ] })
        ] }, `${post.id}-${idx}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: commentsFor, open: !!commentsFor, onClose: () => setCommentsFor(null) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative cursor-pointer", children: [
            p.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.avatar_url, className: "h-20 w-20 rounded-full object-cover ring-2 ring-gold/40", alt: p.display_name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground", children: p.display_name.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow ring-2 ring-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && onAvatar(e.target.files[0]) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-medium", children: p.display_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gold", children: [
              "@",
              p.handle
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-1 inline-flex cursor-pointer items-center gap-1 text-[11px] text-muted-foreground hover:text-gold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
              " Change avatar",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && onAvatar(e.target.files[0]) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Sign out", onClick: () => signOut().then(() => navigate({
          to: "/"
        })), className: "grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "mt-4 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
          " Admin panel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gold", children: "Open →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Posts", v: p.post_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Followers", v: p.follower_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Following", v: p.following_count })
      ] }),
      isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AlgoRhythm Pro" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: manage, className: "text-xs uppercase tracking-[0.18em] text-gold", children: "Manage" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", className: "mt-5 flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-gold" }),
          " Go Pro"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "From $6.99/mo →" })
      ] }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: displayName, onChange: (e) => setDisplayName(e.target.value), className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: bio, onChange: (e) => setBio(e.target.value), rows: 3, placeholder: "Bio", className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, onClick: save, className: "flex-1 rounded-md bg-gradient-gold py-2 text-sm text-primary-foreground", children: "Save" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(false), className: "flex-1 rounded-md border border-border py-2 text-sm", children: "Cancel" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        p.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/90", children: p.bio }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(true), className: "mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3.5 w-3.5" }),
          " Edit profile"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between border-b border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("posts"), className: `inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${tab === "posts" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-3.5 w-3.5" }),
            " Posts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("library"), className: `inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${tab === "library" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
            " Library"
          ] })
        ] }),
        tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", className: "inline-flex items-center gap-1 text-xs text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " New"
        ] })
      ] }),
      tab === "posts" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-1.5 pb-12", children: [
        data.posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostGridItem, { post, isOwner: true, onClick: () => {
          setActiveIdx(i);
          setViewMode("feed");
        }, onEdit: (pp) => setEditingPost({
          id: pp.id,
          title: pp.title,
          description: post.description ?? "",
          tags: (post.tags ?? []).map((t) => `#${t}`).join(" "),
          pinned_comment: post.pinned_comment || ""
        }), onDelete: (pp) => setDeletingPostId(pp.id) }, post.id)),
        data.posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-3 py-8 text-center text-sm text-muted-foreground", children: "No posts yet." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-1.5 pb-12", children: [
        shuffledLibrary.map((post, i) => post && /* @__PURE__ */ jsxRuntimeExports.jsx(PostGridItem, { post, onClick: () => {
          setActiveIdx(i);
          setViewMode("feed");
        } }, post.id)),
        library && library.posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-3 py-8 text-center text-sm text-muted-foreground", children: "Tap the bookmark on any post to save it here." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-border/60 pt-6 pb-16 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground", children: "Legal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "hover:text-gold", children: "Privacy Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "hover:text-gold", children: "Terms of Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "hover:text-gold", children: "DMCA & Content Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contactus@myalgorhythm.online", className: "hover:text-gold", children: "Contact" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-[11px] uppercase tracking-[0.2em] text-destructive/80", children: "Danger zone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setConfirmText("");
          setDeletingAccount(true);
        }, className: "inline-flex items-center gap-2 rounded-md border border-destructive/50 px-3 py-2 text-xs text-destructive hover:bg-destructive/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Delete my account"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Permanently removes your profile, posts, comments, likes, follows, and uploaded files. This can't be undone." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingPost, onOpenChange: (o) => !o && setEditingPost(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit post" }) }),
      editingPost && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editingPost.title, onChange: (e) => setEditingPost({
            ...editingPost,
            title: e.target.value
          }), className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Caption" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editingPost.description, onChange: (e) => setEditingPost({
            ...editingPost,
            description: e.target.value
          }), className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editingPost.tags, onChange: (e) => setEditingPost({
            ...editingPost,
            tags: e.target.value
          }), placeholder: "#chill #lofi", className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Pinned Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editingPost.pinned_comment, onChange: (e) => setEditingPost({
            ...editingPost,
            pinned_comment: e.target.value
          }), placeholder: "Pin a comment to the top...", className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingPost(null), className: "rounded-md border border-border px-3 py-2 text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: postBusy, onClick: savePostEdit, className: "rounded-md bg-gradient-gold px-3 py-2 text-sm text-primary-foreground disabled:opacity-60", children: postBusy ? "Saving…" : "Save" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deletingPostId, onOpenChange: (o) => !o && setDeletingPostId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this post?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently removes the post from your profile and the feed. This can't be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: postBusy, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { disabled: postBusy, onClick: confirmDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: postBusy ? "Deleting…" : "Delete" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deletingAccount, onOpenChange: (o) => !o && !accountBusy && setDeletingAccount(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Permanently delete your account?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This deletes your profile, all of your posts, comments, likes, follows, and any uploaded media. This action is irreversible. Type ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "DELETE" }),
          " below to confirm."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: confirmText, onChange: (e) => setConfirmText(e.target.value), placeholder: "Type DELETE to confirm", className: "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-destructive/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: accountBusy, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { disabled: accountBusy || confirmText !== "DELETE", onClick: async (e) => {
          e.preventDefault();
          setAccountBusy(true);
          try {
            await wipeAccount({});
            await signOut();
            toast.success("Your account has been deleted");
            navigate({
              to: "/"
            });
          } catch (err) {
            toast.error(err.message);
            setAccountBusy(false);
          }
        }, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: accountBusy ? "Deleting…" : "Delete forever" })
      ] })
    ] }) })
  ] });
}
function Stat({
  label,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-medium tabular-nums", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label })
  ] });
}
export {
  MePage as component
};
