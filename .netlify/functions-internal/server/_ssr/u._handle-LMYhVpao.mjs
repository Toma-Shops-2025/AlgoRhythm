import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as Route$8, B as Button, p as profileQueryOptions } from "./router-CFClAfxv.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, c as useSuspenseQuery, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { P as PostGridItem } from "./PostGridItem-BNgDsiJk.mjs";
import { F as FeedItem } from "./FeedItem-CnkQr2eK.mjs";
import { C as CommentsSheet, t as toggleFollow, g as getMyInteractions } from "./CommentsSheet-D1ahEYAg.mjs";
import { a as updatePost, d as deletePost } from "./posts.functions-HCsiXm05.mjs";
import { a as useCreatorSubscription } from "./useSubscription-B2-XPe1t.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-BFSxUYhI.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-tmNTbjN8.mjs";
import { L as Label, T as Textarea } from "./label-BfBOhddq.mjs";
import { I as Input } from "./input-D7X7k8h4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import "../_libs/stripe__stripe-js.mjs";
import "../_libs/stripe__react-stripe-js.mjs";
import { A as ArrowLeft, P as Pencil, b as Trash2, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./storage-C0T7Obi-.mjs";
import "./Logo-BGOt1dsf.mjs";
import "./payments.functions-CI6_eqWr.mjs";
import "./stripe-FMfoOcDi.mjs";
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
import "./safety.functions-CxQbTYIp.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/prop-types.mjs";
function ProfilePage() {
  const {
    handle
  } = Route$8.useParams();
  const follow = toggleFollow;
  const interactionsFn = getMyInteractions;
  const editPost = updatePost;
  const removePost = deletePost;
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  useQueryClient();
  const [tipOpen, setTipOpen] = reactExports.useState(false);
  const [subOpen, setSubOpen] = reactExports.useState(false);
  const [reportOpen, setReportOpen] = reactExports.useState(false);
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const [muted, setMuted] = reactExports.useState(true);
  const [commentsFor, setCommentsFor] = reactExports.useState(null);
  const [editingPost, setEditingPost] = reactExports.useState(null);
  const [editTitle, setEditTitle] = reactExports.useState("");
  const [editDesc, setEditDesc] = reactExports.useState("");
  const [editTags, setEditTags] = reactExports.useState("");
  const [editPinned, setEditPinned] = reactExports.useState("");
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [postBusy, setPostBusy] = reactExports.useState(false);
  const {
    data,
    refetch
  } = useSuspenseQuery(profileQueryOptions(handle));
  useCreatorSubscription(data?.profile?.id);
  const {
    data: interactions,
    refetch: refetchInteractions
  } = useQuery({
    queryKey: ["profile-follow", user?.id, data?.profile?.id],
    queryFn: () => interactionsFn({
      data: {
        postIds: [],
        creatorIds: [data.profile.id]
      }
    }),
    enabled: !!user && !!data?.profile && user.id !== data.profile.id
  });
  const isFollowing = !!interactions?.followingIds?.includes(data?.profile?.id ?? "");
  const onFollow = async () => {
    if (!user) return navigate({
      to: "/welcome"
    });
    try {
      const res = await follow({
        data: {
          targetUserId: data.profile.id
        }
      });
      toast.success(res.following ? `Following @${data.profile.handle}` : `Unfollowed @${data.profile.handle}`);
      await Promise.all([refetch(), refetchInteractions()]);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const savePostEdit = async () => {
    if (!editingPost) return;
    setPostBusy(true);
    try {
      const tagList = editTags.split(/[,\s]+/).map((t) => t.replace(/^#/, "").trim().toLowerCase()).filter(Boolean).slice(0, 12);
      await editPost({
        data: {
          id: editingPost.id,
          title: editTitle.trim(),
          description: editDesc,
          tags: tagList,
          pinned_comment: editPinned.trim() || null
        }
      });
      toast.success("Post updated");
      refetch();
      setEditingPost(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPostBusy(false);
    }
  };
  const confirmDelete = async () => {
    if (!deletingId) return;
    setPostBusy(true);
    try {
      await removePost({
        data: {
          id: deletingId
        }
      });
      toast.success("Post deleted");
      refetch();
      setDeletingId(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPostBusy(false);
    }
  };
  if (!data.profile) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-sm text-muted-foreground", children: "Profile not found." }) });
  const p = data.profile;
  const isOwner = user?.id === p.id;
  if (viewMode === "feed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-dvh w-full overflow-hidden bg-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("grid"), className: "flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-white drop-shadow", children: [
            "@",
            p.handle,
            "'s Posts"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar", children: data.posts.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full snap-start relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeedItem, { post: {
            ...post,
            creator: p
          }, active: idx === activeIdx, liked: false, following: isFollowing, saved: false, onLike: () => {
          }, onFollow: () => {
          }, onComment: () => setCommentsFor(post.id), onSave: () => {
          }, muted, onToggleMute: () => setMuted(!muted) }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setEditingPost(post);
              setEditTitle(post.title);
              setEditDesc(post.description || "");
              setEditTags(post.tags?.map((t) => `#${t}`).join(" ") || "");
              setEditPinned(post.pinned_comment || "");
            }, className: "h-10 w-10 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeletingId(post.id), className: "h-10 w-10 grid place-items-center rounded-full bg-black/40 text-destructive backdrop-blur border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }) })
          ] })
        ] }, post.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: commentsFor, open: !!commentsFor, onClose: () => setCommentsFor(null) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        p.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.avatar_url, className: "h-20 w-20 rounded-full object-cover ring-2 ring-gold/40", alt: p.display_name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground", children: p.display_name.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-medium", children: p.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gold", children: [
            "@",
            p.handle
          ] })
        ] }),
        !isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onFollow, className: isFollowing ? "rounded-full border border-gold/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold" : "rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground", children: isFollowing ? "Following" : "Follow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Posts", v: p.post_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Followers", v: p.follower_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Following", v: p.following_count })
      ] }),
      p.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/90", children: p.bio }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-1.5 pb-12", children: [
        data.posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostGridItem, { post, onClick: () => {
          setActiveIdx(i);
          setViewMode("feed");
        } }, post.id)),
        data.posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-3 py-8 text-center text-sm text-muted-foreground", children: "No posts yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingPost, onOpenChange: (o) => !o && setEditingPost(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit post" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editTitle, onChange: (e) => setEditTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Caption" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: editDesc, onChange: (e) => setEditDesc(e.target.value), rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editTags, onChange: (e) => setEditTags(e.target.value), placeholder: "#chill #beats" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pinned Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: editPinned, onChange: (e) => setEditPinned(e.target.value), placeholder: "Pin a message to the top...", rows: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setEditingPost(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: savePostEdit, disabled: postBusy, className: "bg-gradient-gold text-primary-foreground", children: postBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Save" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deletingId, onOpenChange: (o) => !o && setDeletingId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete post?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This is permanent." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: confirmDelete, className: "bg-destructive text-white", children: "Delete" })
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
  ProfilePage as component
};
