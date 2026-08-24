import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { B as Button, c as cn } from "./router-CFClAfxv.mjs";
import { I as Input } from "./input-D7X7k8h4.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-tmNTbjN8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { L as LoaderCircle, e as ShieldCheck, z as Users, w as FileText, D as MessageSquare, C as Crown, J as DollarSign, K as Flag, X, a as Check, b as Trash2, N as ExternalLink, O as EyeOff, Q as Eye } from "../_libs/lucide-react.mjs";
import { o as objectType, e as enumType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client.server-LV8D9vnO.mjs";
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/radix-ui__react-alert-dialog.mjs";
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
const getAdminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d"));
const listUsers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
const toggleUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "creator", "user"]),
  enable: booleanType()
}).parse(d)).handler(createSsrRpc("eceda78bcec2038c9739ee4a719cea79f404d3b06ed649e0c6f5742699b097c2"));
const adminDeleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("75454526e81445e210b3752ed6012b474b177f745b67b452ea06088e76834860"));
const listPosts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("4e1fce0aa6f1049becfa63db3f60e946c335488318b3121122a1f5a62553bb28"));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid(),
  publish: booleanType()
}).parse(d)).handler(createSsrRpc("4587620b23cd42114286fc00c107bde8089ec278c221ff7eebee1dec6af9875c"));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("706974d253749a4b207ea9f45681167b7d9acb69ae04a29b711b2519d6b957f5"));
const listComments = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("f54eb1072d526aca7701ccece7405ccf35e2bbe89ed46ed95ff2ad1c6462d16e"));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  commentId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118"));
const listTransactions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("1d7dd1759ab84778ab5b9b229f224047f59ac2c5105d78f3624bf14c13600b0f"));
const listReports = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("c9956b44cec3c1fce949ecfd38437e467b57699a11f341d5b3196cf08648be73"));
const resolveReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  reportId: stringType().uuid(),
  action: enumType(["dismiss", "resolve"])
}).parse(d)).handler(createSsrRpc("6fac58f2682ac346176b61a1647ce58c52925ac2e4c76d5ec29c62561a8ac845"));
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function AdminPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({
        to: "/login"
      });
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({
      data
    }) => setIsAdmin(!!data));
  }, [user, loading, navigate]);
  if (loading || isAdmin === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-xl font-semibold", children: "Admin only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "You don't have permission to view this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Go home" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reports", children: "Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "users", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "posts", children: "Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "comments", children: "Comments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tx", children: "Money" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reports", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { currentUserId: user.id }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "posts", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tx", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionsTab, {}) })
    ] })
  ] }) });
}
function OverviewTab() {
  const fn = getAdminStats;
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fn()
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {});
  const cards = [{
    label: "Users",
    value: data.userCount,
    icon: Users
  }, {
    label: "Posts",
    value: data.postCount,
    icon: FileText
  }, {
    label: "Comments",
    value: data.commentCount,
    icon: MessageSquare
  }, {
    label: "Active Pro subs (live)",
    value: data.activeSubsLive,
    icon: Crown
  }, {
    label: "Tips count (live)",
    value: data.tipCount,
    icon: DollarSign
  }, {
    label: "Tip revenue (live)",
    value: `$${(data.tipTotalCents / 100).toFixed(2)}`,
    icon: DollarSign
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold", children: c.value })
  ] }, c.label)) });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: Array.from({
    length: 6
  }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 animate-pulse rounded-lg bg-muted/40" }, i)) });
}
function UsersTab({
  currentUserId
}) {
  const [search, setSearch] = reactExports.useState("");
  const fn = listUsers;
  const toggleFn = toggleUserRole;
  const delFn = adminDeleteUser;
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => fn({
      data: {
        search
      }
    })
  });
  const invalidate = () => qc.invalidateQueries({
    queryKey: ["admin-users"]
  });
  const toggle = async (userId, role, has) => {
    try {
      await toggleFn({
        data: {
          userId,
          role,
          enable: !has
        }
      });
      toast.success(`${role} ${has ? "removed" : "granted"}`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const remove = async (userId, handle) => {
    try {
      await delFn({
        data: {
          userId
        }
      });
      toast.success(`@${handle} deleted`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by handle or display name…", value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
      (data ?? []).map((u) => {
        const isAdmin = u.roles.includes("admin");
        const isCreator = u.roles.includes("creator");
        const isSelf = u.id === currentUserId;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted", children: u.avatar_url && // eslint-disable-next-line @next/next/no-img-element
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.avatar_url, alt: "", className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 truncate text-sm font-medium", children: [
              u.display_name,
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "bg-gold text-primary-foreground", children: "admin" }),
              isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "creator" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/u/$handle", params: {
              handle: u.handle
            }, className: "text-xs text-muted-foreground hover:text-foreground", children: [
              "@",
              u.handle,
              " · ",
              u.follower_count,
              " followers · ",
              u.post_count,
              " posts"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: isAdmin ? "default" : "outline", onClick: () => toggle(u.id, "admin", isAdmin), disabled: isSelf && isAdmin, title: isSelf && isAdmin ? "Cannot demote yourself here" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: isCreator ? "default" : "outline", onClick: () => toggle(u.id, "creator", isCreator), children: "C" }),
            !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                    "Delete @",
                    u.handle,
                    "?"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Permanently removes the account, all posts, comments, likes, and follows. Cannot be undone." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground", onClick: () => remove(u.id, u.handle), children: "Delete user" })
                ] })
              ] })
            ] })
          ] })
        ] }, u.id);
      }),
      !isLoading && !(data ?? []).length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No users found" })
    ] })
  ] });
}
function PostsTab() {
  const [search, setSearch] = reactExports.useState("");
  const fn = listPosts;
  const togglePub = adminTogglePublish;
  const delFn = adminDeletePost;
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-posts", search],
    queryFn: () => fn({
      data: {
        search
      }
    })
  });
  const invalidate = () => qc.invalidateQueries({
    queryKey: ["admin-posts"]
  });
  const togglePublish = async (postId, currently) => {
    try {
      await togglePub({
        data: {
          postId,
          publish: !currently
        }
      });
      toast.success(currently ? "Unpublished" : "Published");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const remove = async (postId) => {
    try {
      await delFn({
        data: {
          postId
        }
      });
      toast.success("Post deleted");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search post titles…", value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
      (data ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 shrink-0 overflow-hidden rounded bg-muted", children: p.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover_url, alt: "", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-sm font-medium", children: [
            p.title,
            !p.is_published && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "ml-2", children: "unpublished" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "@",
            p.creator?.handle ?? "?",
            " · ",
            p.type,
            " · ♥ ",
            p.like_count,
            " · 💬 ",
            p.comment_count
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: {
            id: p.id
          }, className: "p-2 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => togglePublish(p.id, p.is_published), children: p.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete post?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  '"',
                  p.title,
                  '" and all its comments/likes will be permanently removed.'
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground", onClick: () => remove(p.id), children: "Delete" })
              ] })
            ] })
          ] })
        ] })
      ] }, p.id)),
      !isLoading && !(data ?? []).length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No posts found" })
    ] })
  ] });
}
function CommentsTab() {
  const fn = listComments;
  const delFn = adminDeleteComment;
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: () => fn({
      data: {}
    })
  });
  const remove = async (commentId) => {
    try {
      await delFn({
        data: {
          commentId
        }
      });
      toast.success("Comment deleted");
      qc.invalidateQueries({
        queryKey: ["admin-comments"]
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
      (data ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "@",
              c.user?.handle ?? "?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: {
              id: c.post_id
            }, className: "hover:text-foreground", children: "view post" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(c.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: c.body })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", onClick: () => remove(c.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, c.id)),
      !isLoading && !(data ?? []).length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No comments" })
    ] })
  ] });
}
function TransactionsTab() {
  const fn = listTransactions;
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-tx"],
    queryFn: () => fn()
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Recent tips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
        data.tips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "No tips yet" }),
        data.tips.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              "$",
              (t.amount_cents / 100).toFixed(2),
              " ",
              t.currency?.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              t.status,
              " · ",
              t.environment,
              " · ",
              new Date(t.created_at).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.status === "succeeded" ? "default" : "outline", children: t.status })
        ] }, t.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Recent subscriptions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
        data.subs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "No subscriptions yet" }),
        data.subs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s.price_id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              s.kind,
              " · ",
              s.environment,
              " ·",
              " ",
              s.current_period_end ? `ends ${new Date(s.current_period_end).toLocaleDateString()}` : "",
              s.cancel_at_period_end ? " · canceling" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: s.status === "active" ? "default" : "outline", children: s.status })
        ] }, s.id))
      ] })
    ] })
  ] });
}
function ReportsTab() {
  const [status, setStatus] = reactExports.useState("pending");
  const fn = listReports;
  const resolveFn = resolveReport;
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-reports", status],
    queryFn: () => fn({
      data: {
        status
      }
    })
  });
  const act = async (reportId, action) => {
    try {
      await resolveFn({
        data: {
          reportId,
          action
        }
      });
      toast.success(action === "dismiss" ? "Report dismissed" : "Report resolved");
      qc.invalidateQueries({
        queryKey: ["admin-reports"]
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const linkFor = (r) => {
    if (r.target_type === "post") return `/p/${r.target_id}`;
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["pending", "resolved", "dismissed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: status === s ? "default" : "outline", onClick: () => setStatus(s), children: s }, s)) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60", children: [
      (data ?? []).map((r) => {
        const link = linkFor(r);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "mt-1 h-4 w-4 shrink-0 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.reason }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: r.target_type }),
              link ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: {
                id: r.target_id
              }, className: "text-xs text-muted-foreground hover:text-foreground", children: "view target" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                r.target_id.slice(0, 8),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
              "by @",
              r.reporter?.handle ?? "?",
              " · ",
              new Date(r.created_at).toLocaleString()
            ] }),
            r.details && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: r.details })
          ] }),
          status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => act(r.id, "dismiss"), title: "Dismiss", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "default", onClick: () => act(r.id, "resolve"), title: "Mark resolved", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
          ] })
        ] }, r.id);
      }),
      !isLoading && !(data ?? []).length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center text-sm text-muted-foreground", children: [
        "No ",
        status,
        " reports"
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};
