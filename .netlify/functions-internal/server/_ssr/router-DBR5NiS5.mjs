import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useSuspenseQuery, b as useQuery, q as queryOptions, c as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { u as updatePost, d as deletePost, c as createPost, a as updateMyProfile, b as createSsrRpc, g as getMyProfile } from "./posts.functions-ByLWJTvJ.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { E as EmbeddedCheckoutProvider, a as EmbeddedCheckout } from "../_libs/stripe__react-stripe-js.mjs";
import { R as Root2$2, T as Trigger, P as Portal2$1, C as Content2$1, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { r as resolveStorageUrl, i as isPlayablePost } from "./storage-C0T7Obi-.mjs";
import { R as Root2$3, I as Item2$1, a as Indicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-label.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, b as Trigger2, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { R as Root2$1, L as List, T as Trigger$1, C as Content$1 } from "../_libs/radix-ui__react-tabs.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { u as userIsPro, b as geminiTranscribeAudio } from "./gemini.server-DPBa5Xmb.mjs";
import { s as sendLovableEmail } from "../_libs/lovable.dev__email-js.mjs";
import { c as createStripeClient, a as getWebhookSecret } from "./stripe.server-B9htgGZ_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { A as ArrowLeft, P as Pencil, T as Trash2, L as LoaderCircle, C as CircleCheck, a as ArrowRight, R as RefreshCw, H as Heart, M as MessageCircle, S as Share2, b as ChevronLeft, c as ChevronRight, d as Sparkles, F as Film, e as Music, I as Image$1, V as Video, f as Type, g as Crown, h as Check, i as Camera, j as LogOut, k as ShieldCheck, l as Settings, G as Grid3x3, B as Bookmark, m as Plus, n as Search, o as Mail, p as ShieldAlert, q as FileText, r as CreditCard, s as TriangleAlert, t as Play, u as VolumeX, v as Volume2, w as Gift, E as EllipsisVertical, X, x as Pin, y as Send, z as Ellipsis, U as Users, D as MessageSquare, J as DollarSign, K as Flag, N as ExternalLink, O as EyeOff, Q as Eye, W as House, Y as User, Z as Circle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType, b as booleanType, a as arrayType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/prop-types.mjs";
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
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "http";
import "https";
import "os";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const KEY = "ar_cookie_consent_v1";
function CookieBanner() {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);
  const set = (value) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: value, t: Date.now() }));
    } catch {
    }
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-[60] border-t border-gold/30 bg-card/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/90 sm:flex-1", children: [
      "We use essential cookies to run AlgoRhythm and optional analytics cookies to improve it. Read our ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold underline", children: "Privacy Policy" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => set("essential"), children: "Essential only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: () => set("all"),
          className: "bg-gradient-gold text-primary-foreground",
          children: "Accept all"
        }
      )
    ] })
  ] }) });
}
const appCss = "/assets/styles-DuDmN4-k.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$p = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "AlgoRhythm — Music That Moves" },
      { name: "description", content: "Discover, share, and monetize music on AlgoRhythm." },
      { name: "theme-color", content: "#000000" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$p.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthListener, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, theme: "dark", position: "top-center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fixed bottom-2 right-2 text-[8px] opacity-10 uppercase font-black z-[9999] pointer-events-none", children: "Build v2.1.8-master" })
  ] }) });
}
function AuthListener() {
  const router = useRouter();
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      router.invalidate();
      qc.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, qc]);
  return null;
}
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => setSession(sess)
    );
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return { user: session?.user ?? null, session, loading };
}
async function signOut() {
  await supabase.auth.signOut();
}
const items = [
  { to: "/", label: "Feed", icon: House },
  { to: "/discover", label: "Discover", icon: Search },
  { to: "/upload", label: "Post", icon: Plus, primary: true, authed: true },
  { to: "/me", label: "Me", icon: User, authed: true }
];
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-dvh text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pb-20", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function BottomNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const { user } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mx-auto grid max-w-md grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]", children: items.map(({ to, label, icon: Icon, primary, authed }) => {
    const target = authed && !user ? "/login" : to;
    const active = pathname === to;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: target,
        className: cn(
          "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors",
          active ? "text-gold" : "text-muted-foreground hover:text-foreground"
        ),
        children: [
          primary ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-gradient-gold text-primary-foreground shadow-[0_0_24px_-4px_var(--gold)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
        ]
      }
    ) }, to);
  }) }) });
}
const logoSrc = "/assets/logo-CIjToI5B.png";
function LogoMark({ className, size = 36 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: logoSrc,
      alt: "AlgoRhythm",
      width: size,
      height: size,
      className: cn("select-none", className),
      draggable: false
    }
  );
}
function Wordmark({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { size: 28 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-tight text-gradient-gold", style: { fontFamily: "var(--font-display)" }, children: "AlgoRhythm" })
  ] });
}
function Watermark({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("pointer-events-none flex items-center gap-1.5 opacity-70", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { size: 18 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-[11px] uppercase tracking-[0.2em] text-gold",
        style: { fontFamily: "var(--font-sans)" },
        children: "AlgoRhythm"
      }
    )
  ] });
}
const url = "/__l5e/assets-v1/5cd1e56f-0515-4cdd-b020-67138298d36e/bg-loop.mp4";
const bgLoop = {
  url
};
const Route$o = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://myalgorhythm.online/welcome" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/welcome" }]
  }),
  component: Index
});
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: bgLoop.url,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        "aria-hidden": true,
        className: "pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-20"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0 bg-background/55" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/login",
          className: "text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold",
          children: "Sign in"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-16 pb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-card/90 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " AI music, made viral"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-gradient-gold text-5xl leading-[1.05] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]", children: [
        "The vertical feed",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "for AI music creators."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-sm text-balance text-sm text-foreground/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]", children: "Post your AI-made tracks and music videos. Get discovered. Earn from the people who love it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/signup",
            className: "rounded-md bg-gradient-gold px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-6px_var(--gold)]",
            children: "Create your profile"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/",
            className: "rounded-md border border-gold/40 bg-card/70 backdrop-blur-sm px-5 py-3 text-sm text-foreground hover:border-gold/70",
            children: "Watch the feed"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] uppercase tracking-[0.2em] text-foreground/70", children: "No account needed to browse" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto grid max-w-md gap-3 px-5 pb-12", children: [
      { k: "01", t: "Audio + video, one feed", d: "Tracks auto-render a gold visualizer so they feel native next to videos." },
      { k: "02", t: "Built to go viral", d: "A discovery algorithm that rewards new creators, not just established names." },
      { k: "03", t: "Monetize from day one", d: "Tips, subscriptions, boosts, and sponsor matches — built in." }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "rounded-xl border border-gold/20 bg-card/95 p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.2em] text-gold", children: f.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-gradient-gold mt-2 text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]", children: f.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]", children: f.d })
        ]
      },
      f.k
    )) })
  ] });
}
const clientToken$1 = "pk_live_51TbZFYAGzfh2ib0mkr1qXZUfk37oLthPPcvezCY1MvLWyUPCj6DTZgP0onzn1p1Hu6yvx3yMrtgpttxtHRb6Kz3a00tt3269pY";
const environment = clientToken$1?.startsWith("pk_test_") ? "sandbox" : "live";
let stripePromise = null;
function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(clientToken$1);
  }
  return stripePromise;
}
function getStripeEnvironment() {
  return environment;
}
const ADMIN_EMAILS = /* @__PURE__ */ new Set(["admin@myalgorhythm.online"]);
function isActive(s) {
  const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
  const future = end > Date.now();
  if (["active", "trialing", "past_due"].includes(s.status)) return future;
  if (s.status === "canceled") return future;
  return false;
}
function useProSubscription() {
  const { user } = useAuth();
  const [sub, setSub] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) {
      setSub(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    let mounted = true;
    const env = getStripeEnvironment();
    const emailAdmin = !!(user.email && ADMIN_EMAILS.has(user.email.trim().toLowerCase()));
    const fetch2 = async () => {
      const [{ data: subData }, { data: roleData }] = await Promise.all([
        supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("kind", "pro").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle()
      ]);
      if (!mounted) return;
      setSub(subData ?? null);
      setIsAdmin(emailAdmin || !!roleData);
      setLoading(false);
    };
    fetch2();
    const ch = supabase.channel(`subs:${user.id}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
      () => fetch2()
    ).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [user]);
  const isPro = isAdmin || (sub ? isActive(sub) : false);
  return { subscription: sub, isPro, isAdmin, loading };
}
function useCreatorSubscription(creatorId) {
  const { user } = useAuth();
  const [sub, setSub] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user || !creatorId) {
      setSub(null);
      return;
    }
    let mounted = true;
    const env = getStripeEnvironment();
    const fetch2 = async () => {
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("creator_id", creatorId).eq("kind", "creator").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (mounted) setSub(data ?? null);
    };
    fetch2();
    const ch = supabase.channel(`csub:${user.id}:${creatorId}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
      () => fetch2()
    ).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [user, creatorId]);
  return { subscription: sub, isSubscribed: sub ? isActive(sub) : false };
}
const generatePostMetadata = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  idea: stringType().min(2).max(500),
  mediaType: enumType(["audio", "video"]).optional()
}).parse(input)).handler(createSsrRpc("b8668797fbe536266e8f08e6fa8a32c5ff980fc41a37c09d4f4e777b62cc4a5d"));
const generateCoverImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500)
}).parse(input)).handler(createSsrRpc("eb5ec1725113399880fc72467127579b911a0826030b8f3514fb6be963bbaca2"));
const generateMusicVideoScenes = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500),
  count: numberType().int().min(2).max(8).optional(),
  style: stringType().max(200).optional()
}).parse(input)).handler(createSsrRpc("bf1104e5ba8677c7db268238fc25cfe78269cd6764fc9a95551aa90f14cc2053"));
async function audioToVideo(audioFile, coverFile) {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("Your browser does not support video conversion. Try Chrome or Edge.");
  }
  const coverUrl = URL.createObjectURL(coverFile);
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("Could not load cover image"));
    i.src = coverUrl;
  });
  const W = 720, H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  const arrayBuf = await audioFile.arrayBuffer();
  const AC = window.AudioContext || window.webkitAudioContext;
  const ac = new AC();
  const decoded = await ac.decodeAudioData(arrayBuf.slice(0));
  const duration = decoded.duration;
  const source = ac.createBufferSource();
  source.buffer = decoded;
  const dest = ac.createMediaStreamDestination();
  const analyser = ac.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  analyser.connect(dest);
  const videoStream = canvas.captureStream(30);
  const tracks = [...videoStream.getVideoTracks(), ...dest.stream.getAudioTracks()];
  const stream = new MediaStream(tracks);
  const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 25e5 });
  const chunks = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const done = new Promise((resolve) => {
    rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
  });
  const data = new Uint8Array(analyser.frequencyBinCount);
  let raf = 0;
  const start = performance.now();
  const draw = () => {
    raf = requestAnimationFrame(draw);
    const t = (performance.now() - start) / 1e3;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.filter = "blur(40px)";
    const bgScale = 1.2;
    ctx.drawImage(img, -W * 0.1, -H * 0.1, W * bgScale, H * bgScale);
    ctx.restore();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, W, H);
    analyser.getByteFrequencyData(data);
    const pulse = 1 + Math.sin(t * 1.5) * 0.01;
    const size = 520 * pulse;
    const x = (W - size) / 2;
    const y = (H - size) / 2 - 100;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 40;
    ctx.beginPath();
    const r = 24;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + size, y, x + size, y + size, r);
    ctx.arcTo(x + size, y + size, x, y + size, r);
    ctx.arcTo(x, y + size, x, y, r);
    ctx.arcTo(x, y, x + size, y, r);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
    const bars = 48;
    const usable = W * 0.86;
    const bw = usable / bars;
    const startX = (W - usable) / 2;
    const baseY = H - 240;
    for (let i = 0; i < bars; i++) {
      const v = data[Math.floor(i * data.length / bars)] / 255;
      const bh = Math.max(4, v * 240);
      ctx.fillStyle = `rgba(240,215,140,${0.5 + v * 0.5})`;
      ctx.fillRect(startX + i * bw + 2, baseY - bh / 2, bw - 4, bh);
    }
  };
  draw();
  rec.start(250);
  source.start();
  await new Promise((r) => setTimeout(r, Math.ceil(duration * 1e3) + 300));
  try {
    source.stop();
  } catch {
  }
  rec.stop();
  const blob = await done;
  cancelAnimationFrame(raf);
  try {
    await ac.close();
  } catch {
  }
  URL.revokeObjectURL(coverUrl);
  return blob;
}
function b64ToFile(b64, filename, mime = "image/png") {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}
function loadImageFromB64(b64) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        if (img.decode) await img.decode();
      } catch {
      }
      resolve(img);
    };
    img.onerror = () => reject(new Error("Could not load generated image"));
    img.src = b64.startsWith("data:") ? b64 : `data:image/png;base64,${b64}`;
  });
}
function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
async function audioToLyricVideo(audioFile, sceneImages, lyrics) {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("Your browser does not support video conversion. Try Chrome or Edge.");
  }
  if (sceneImages.length === 0) throw new Error("No scenes to render");
  const W = 720, H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  const arrayBuf = await audioFile.arrayBuffer();
  const AC = window.AudioContext || window.webkitAudioContext;
  const ac = new AC();
  const decoded = await ac.decodeAudioData(arrayBuf.slice(0));
  const duration = decoded.duration;
  const source = ac.createBufferSource();
  source.buffer = decoded;
  const dest = ac.createMediaStreamDestination();
  source.connect(dest);
  const videoStream = canvas.captureStream(30);
  const stream = new MediaStream([...videoStream.getVideoTracks(), ...dest.stream.getAudioTracks()]);
  const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 3e6 });
  const chunks = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const done = new Promise((resolve) => {
    rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
  });
  const sceneDuration = duration / sceneImages.length;
  const fadeDuration = Math.min(1.2, sceneDuration * 0.4);
  const sorted = [...lyrics].sort((a, b) => a.start - b.start);
  const drawScene = (img, progress, alpha) => {
    const zoom = 1.08 + 0.18 * progress;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(W / iw, H / ih) * zoom;
    const dw = iw * scale, dh = ih * scale;
    const panX = (W - dw) / 2 + Math.sin(progress * Math.PI) * 24;
    const panY = (H - dh) / 2 + (progress - 0.5) * 40;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, panX, panY, dw, dh);
    ctx.restore();
  };
  let raf = 0;
  const start = performance.now();
  const draw = () => {
    raf = requestAnimationFrame(draw);
    const t = (performance.now() - start) / 1e3;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    const idx = Math.min(sceneImages.length - 1, Math.floor(t / sceneDuration));
    const localT = t - idx * sceneDuration;
    const progress = Math.min(1, localT / sceneDuration);
    drawScene(sceneImages[idx], progress, 1);
    if (idx < sceneImages.length - 1 && localT > sceneDuration - fadeDuration) {
      const fadeT = (localT - (sceneDuration - fadeDuration)) / fadeDuration;
      drawScene(sceneImages[idx + 1], 0, fadeT);
    }
    const grd = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    grd.addColorStop(0, "rgba(0,0,0,0.72)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    const active = sorted.find((l) => t >= l.start && t <= l.end);
    if (active) {
      const span = Math.max(0.3, active.end - active.start);
      const into = Math.min(1, (t - active.start) / Math.min(0.35, span * 0.3));
      const outOf = Math.min(1, (active.end - t) / Math.min(0.35, span * 0.3));
      const alpha = Math.max(0, Math.min(1, Math.min(into, outOf)));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 44px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      const maxWidth = W * 0.86;
      const lines = wrapText(ctx, active.text, maxWidth);
      const lineHeight = 56;
      const cy = H * 0.12;
      lines.forEach((line, i) => {
        const y = cy + i * lineHeight + lineHeight / 2;
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowBlur = 18;
        ctx.fillStyle = "#fff";
        ctx.fillText(line, W / 2, y);
      });
      ctx.restore();
    }
    ctx.fillStyle = "rgba(240,215,140,0.5)";
    ctx.fillRect(W * 0.4, H - 60, W * 0.2, 2);
  };
  draw();
  rec.start(250);
  source.start();
  await new Promise((r) => setTimeout(r, Math.ceil(duration * 1e3) + 300));
  try {
    source.stop();
  } catch {
  }
  rec.stop();
  const blob = await done;
  cancelAnimationFrame(raf);
  try {
    await ac.close();
  } catch {
  }
  return blob;
}
const Route$n = createFileRoute("/upload")({
  validateSearch: (search) => {
    const r = Number(search.regen);
    const regen = Number.isFinite(r) ? Math.min(Math.max(Math.trunc(r), 0), 2) : 0;
    return { regen: regen || void 0 };
  },
  head: () => ({
    meta: [
      { title: "Post — AlgoRhythm" },
      { name: "description", content: "Upload your AI-made track or music video to the AlgoRhythm feed." },
      { property: "og:title", content: "Post to AlgoRhythm" },
      { property: "og:description", content: "Publish your AI music or video to the AlgoRhythm feed." },
      { property: "og:url", content: "https://myalgorhythm.online/upload" },
      { name: "robots", content: "noindex" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/upload" }]
  }),
  component: UploadPage
});
function UploadPage() {
  const { user, loading } = useAuth();
  const { isPro } = useProSubscription();
  const navigate = useNavigate();
  const search = Route$n.useSearch();
  const regenCount = search.regen ?? 0;
  const post = createPost;
  const genCover = generateCoverImage;
  const genMeta = generatePostMetadata;
  const genScenes = generateMusicVideoScenes;
  const [media, setMedia] = reactExports.useState(null);
  const [cover, setCover] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [caption, setCaption] = reactExports.useState("");
  const [tags, setTags] = reactExports.useState("");
  const [hashtags, setHashtags] = reactExports.useState("");
  const [idea, setIdea] = reactExports.useState("");
  const [genMetaLoading, setGenMetaLoading] = reactExports.useState(false);
  const [aiTools, setAiTools] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [busyLabel, setBusyLabel] = reactExports.useState("");
  const [generating, setGenerating] = reactExports.useState(false);
  const [convertToVideo, setConvertToVideo] = reactExports.useState(false);
  const [videoMode, setVideoMode] = reactExports.useState("visualizer");
  const [ownsRights, setOwnsRights] = reactExports.useState(false);
  const [aiDisclosed, setAiDisclosed] = reactExports.useState(false);
  const coverPreview = reactExports.useMemo(() => cover ? URL.createObjectURL(cover) : null, [cover]);
  if (!loading && !user) {
    navigate({ to: "/login" });
    return null;
  }
  const type = media ? media.type.startsWith("video") ? "video" : media.type.startsWith("audio") ? "audio" : null : null;
  const uploadTo = async (bucket, file) => {
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      upsert: false
    });
    if (error) throw new Error(error.message);
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };
  const handleGenerateCover = async () => {
    if (!isPro) {
      toast.error("AI cover art is a Pro feature");
      navigate({ to: "/pricing" });
      return;
    }
    const prompt = title.trim() || caption.trim() || idea.trim() || tags.trim();
    if (!prompt) {
      toast.error("Add a title first so the AI knows what to draw");
      return;
    }
    setGenerating(true);
    try {
      const { b64 } = await genCover({ data: { prompt } });
      const file = b64ToFile(b64, `cover-${Date.now()}.png`, "image/png");
      setCover(file);
      toast.success("Cover generated");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };
  const handleGenerateMeta = async () => {
    if (!isPro) {
      toast.error("AI captions are a Pro feature");
      navigate({ to: "/pricing" });
      return;
    }
    const seed = idea.trim() || title.trim() || caption.trim();
    if (!seed) {
      toast.error("Type a quick idea or title first");
      return;
    }
    setGenMetaLoading(true);
    try {
      const meta = await genMeta({ data: { idea: seed, mediaType: type ?? "audio" } });
      if (meta.title) setTitle(meta.title);
      if (meta.caption) setCaption(meta.caption);
      if (meta.hashtags.length) setHashtags(meta.hashtags.map((h) => `#${h}`).join(" "));
      toast.success("Title, caption & hashtags generated");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setGenMetaLoading(false);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!media || !type) return toast.error("Pick an audio or video file");
    if (!ownsRights) return toast.error("Confirm you own the rights to this content");
    if (!aiDisclosed) return toast.error("Confirm this was made with AI tools");
    if (type === "audio" && convertToVideo && videoMode === "visualizer" && !cover) {
      return toast.error("Converting to video needs a cover image — upload one or generate with AI");
    }
    setBusy(true);
    try {
      let mediaFile = media;
      let postType = type;
      let derivedCover = cover;
      if (type === "audio" && convertToVideo) {
        if (videoMode === "lyric") {
          setBusyLabel("Transcribing lyrics…");
          const fd = new FormData();
          fd.append("audio", media);
          const { data: sessData } = await supabase.auth.getSession();
          const token = sessData.session?.access_token;
          const lyricsRes = await fetch("/api/transcribe-lyrics", {
            method: "POST",
            body: fd,
            headers: token ? { Authorization: `Bearer ${token}` } : void 0
          });
          if (!lyricsRes.ok) {
            const err = await lyricsRes.json().catch(() => ({ error: "Transcription failed" }));
            throw new Error(err.error ?? "Transcription failed");
          }
          const { lines } = await lyricsRes.json();
          if (!lines || lines.length === 0) {
            throw new Error("Could not detect lyrics in the audio. Try the visualizer mode instead.");
          }
          setBusyLabel("Generating backdrop scenes…");
          const scenePrompt = [title.trim(), caption.trim(), idea.trim()].filter(Boolean).join(" — ") || "atmospheric music video backdrop";
          const { images } = await genScenes({ data: { prompt: scenePrompt, count: 4 } });
          const imgs = await Promise.all(images.map((b) => loadImageFromB64(b)));
          setBusyLabel("Rendering your lyric video…");
          const blob = await audioToLyricVideo(media, imgs, lines);
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, { type: "video/webm" });
          postType = "video";
          if (!derivedCover) {
            const canvas = document.createElement("canvas");
            canvas.width = imgs[0].naturalWidth;
            canvas.height = imgs[0].naturalHeight;
            const cctx = canvas.getContext("2d");
            if (cctx) {
              cctx.drawImage(imgs[0], 0, 0);
              const dataUrl = canvas.toDataURL("image/png");
              derivedCover = b64ToFile(dataUrl.split(",")[1], `cover-${Date.now()}.png`, "image/png");
            }
          }
        } else if (cover) {
          setBusyLabel("Rendering your video…");
          const blob = await audioToVideo(media, cover);
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, { type: "video/webm" });
          postType = "video";
        }
      }
      setBusyLabel("Uploading…");
      const mediaUrl = await uploadTo("media", mediaFile);
      const coverUrl = derivedCover ? await uploadTo("covers", derivedCover) : null;
      setBusyLabel("Publishing…");
      const tagList = [
        ...tags.split(/[,\s]+/),
        ...hashtags.split(/[,\s]+/)
      ].map((t) => t.replace(/^#+/, "").trim().toLowerCase()).filter(Boolean);
      const dedupedTags = Array.from(new Set(tagList)).slice(0, 15);
      const captionBody = caption.trim();
      const hashLine = hashtags.trim();
      const fullCaption = [captionBody, hashLine].filter(Boolean).join("\n\n");
      const { post: row } = await post({
        data: {
          type: postType,
          mediaUrl,
          coverUrl,
          title: title.trim(),
          description: fullCaption || void 0,
          tags: dedupedTags,
          aiTools: aiTools.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10)
        }
      });
      toast.success("Posted");
      navigate({
        to: "/p/$id",
        params: { id: row.id },
        search: { new: 1, regen: regenCount || void 0 }
      });
    } catch (e2) {
      toast.error(e2.message);
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "New post" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Audio or video. AI-made." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      !isPro && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/pricing",
          className: "block rounded-md border border-gold/40 bg-gradient-to-r from-gold/10 to-transparent p-3 text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-medium text-gold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              " Unlock AI features with Pro"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-muted-foreground", children: "AI cover art, AI title/caption/hashtags, lyric videos and scene generation are Pro perks. Upgrade →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilePick,
        {
          label: "Media (audio or video)",
          icon: type === "video" ? Film : Music,
          accept: "*/*",
          file: media,
          onChange: setMedia
        }
      ),
      (type === "audio" || type === "video") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePick,
          {
            label: type === "audio" ? "Cover image (optional)" : "Cover image (optional)",
            icon: Image$1,
            accept: "image/*",
            file: cover,
            onChange: setCover
          }
        ),
        coverPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: coverPreview, alt: "", className: "h-24 w-24 rounded-md object-cover ring-1 ring-gold/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: generating,
            onClick: handleGenerateCover,
            className: "flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50",
            children: [
              generating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              generating ? "Generating…" : cover ? "Regenerate cover with AI" : "Generate cover with AI"
            ]
          }
        )
      ] }),
      type === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: convertToVideo,
            onChange: (e) => setConvertToVideo(e.target.checked),
            className: "mt-1 accent-gold"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4 text-gold" }),
            " Turn this into a video"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block text-[11px] text-muted-foreground", children: "Render a video synced to your audio — pick a style below." })
        ] })
      ] }),
      type === "audio" && convertToVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-gold/20 bg-card/30 p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeOption,
            {
              active: videoMode === "visualizer",
              onClick: () => setVideoMode("visualizer"),
              icon: Video,
              title: "Visualizer",
              desc: "Cover art + reactive bars"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeOption,
            {
              active: videoMode === "lyric",
              onClick: () => {
                if (!isPro) {
                  toast.error("Lyric videos are a Pro feature");
                  navigate({ to: "/pricing" });
                  return;
                }
                setVideoMode("lyric");
              },
              icon: Type,
              title: "Lyric video",
              desc: isPro ? "AI lyrics + AI scenes" : "Pro only"
            }
          )
        ] }),
        videoMode === "visualizer" && !cover && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Pick or generate a cover image above to use as the visualizer background." }),
        videoMode === "visualizer" && cover && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Your cover will animate with a reactive visualizer synced to the audio." }),
        videoMode === "lyric" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "We'll auto-transcribe your vocals, generate cinematic backdrops, and sync the lyrics on-screen. Best with vocal tracks under ~20MB." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          required: true,
          maxLength: 140,
          value: title,
          onChange: (e) => setTitle(e.target.value),
          className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-gold/20 bg-card/30 p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quick idea (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: idea,
            onChange: (e) => setIdea(e.target.value),
            maxLength: 500,
            placeholder: "e.g. dreamy late-night drive synthwave",
            className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: genMetaLoading,
            onClick: handleGenerateMeta,
            className: "flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50",
            children: [
              genMetaLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              genMetaLoading ? "Writing…" : "Generate title, caption & hashtags"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Type a short idea (or just a title) and let AI write the rest." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Caption", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          rows: 3,
          maxLength: 2e3,
          value: caption,
          onChange: (e) => setCaption(e.target.value),
          className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hashtags", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: hashtags,
          onChange: (e) => setHashtags(e.target.value),
          placeholder: "#aimusic #synthwave #suno",
          className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Genre / Tags (comma separated)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: tags,
          onChange: (e) => setTags(e.target.value),
          placeholder: "synthwave, drill, lofi",
          className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "AI tools used", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: aiTools,
          onChange: (e) => setAiTools(e.target.value),
          placeholder: "Suno, Udio, Runway, Sora",
          className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md border border-gold/20 bg-card/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: ownsRights,
              onChange: (e) => setOwnsRights(e.target.checked),
              className: "mt-0.5 accent-gold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "I own or have permission to share this content and any samples it uses. I understand infringing posts can be removed under our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA policy" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: aiDisclosed,
              onChange: (e) => setAiDisclosed(e.target.checked),
              className: "mt-0.5 accent-gold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "This was made with AI tools and I'll follow the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: busy,
          type: "submit",
          className: "flex w-full items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50",
          children: [
            busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " ",
            busy && busyLabel ? busyLabel : "Publish to the feed"
          ]
        }
      )
    ] })
  ] }) });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    children
  ] });
}
function FilePick({
  label,
  icon: Icon,
  accept,
  file,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block cursor-pointer rounded-md border border-dashed border-border bg-card/40 p-4 hover:border-gold/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-md bg-background text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: file ? file.name : "Tap to choose a file" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept, className: "hidden", onChange: (e) => onChange(e.target.files?.[0] ?? null) })
  ] });
}
function ModeOption({
  active,
  onClick,
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `flex flex-col items-start gap-1 rounded-md border p-2.5 text-left transition ${active ? "border-gold/60 bg-card" : "border-border bg-card/40 hover:border-gold/30"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${active ? "text-gold" : "text-muted-foreground"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: active ? "text-gold" : "", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: desc })
      ]
    }
  );
}
const Route$m = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — AlgoRhythm" },
      { name: "description", content: "The rules for using AlgoRhythm — accounts, content, payments, and AI-generated media." },
      { property: "og:title", content: "Terms of Service — AlgoRhythm" },
      { property: "og:description", content: "Rules for using AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/terms" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/terms" }]
  }),
  component: TermsPage
});
function TermsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Terms of Service" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 27, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-foreground/90", children: `These Terms govern your use of AlgoRhythm, operated by Timothy Adkins ("we"). By using AlgoRhythm you agree to these Terms. If you don't agree, don't use the service.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Accounts", children: "You must be 13+ (16+ in the EEA) to create an account. You're responsible for your credentials and everything posted under your account. One person per account; no impersonation." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Your content", children: "You keep ownership of audio, video, images, and text you upload. By posting, you grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, transcode, display, and stream your content for the purpose of operating and promoting the service. This license ends when you delete the content, except for copies retained in backups for a limited time." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "AI-generated content", children: "AlgoRhythm offers AI features (lyric transcription, cover art, music-video scenes, post metadata). You are responsible for the prompts you submit and the outputs you publish. Do not use AI features to generate content that infringes someone else's rights or violates the rules below." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Acceptable use — you may NOT post", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Content you don't have rights to (samples, beats, vocals, images, voice clones, or trademarks you don't own or have licensed)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sexual content involving minors, or any content that exploits minors." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Non-consensual intimate imagery, doxxing, threats, harassment, or incitement to violence." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Hate speech, illegal content, malware, spam, or schemes to defraud users." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Voice or likeness of a real person without their consent." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempts to scrape, reverse engineer, or disrupt the service." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Payments, tips & subscriptions", children: "Tips and Pro subscriptions are processed by Stripe. Subscriptions renew automatically until canceled in your billing portal. Tips are non-refundable except where required by law. Platform fees and creator payouts are disclosed at checkout. Taxes may apply based on your location." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$6, { title: "Termination", children: [
      "You can delete your account at any time from",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/me", className: "text-gold", children: "your profile" }),
      ". We may suspend or terminate accounts that violate these Terms or applicable law, with or without notice."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Disclaimers", children: `AlgoRhythm is provided "as is". We don't warrant the service will be uninterrupted, error-free, or that AI outputs will be accurate, lawful, or fit for any purpose. To the maximum extent allowed by law, we disclaim all implied warranties.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Limitation of liability", children: "To the fullest extent permitted by law, our total liability for any claim arising out of or relating to the service is limited to the greater of (a) the amount you paid us in the 12 months before the claim or (b) USD $100." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Indemnity", children: "You agree to indemnify Timothy Adkins and AlgoRhythm from any claim arising out of your content or your violation of these Terms." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Governing law", children: "These Terms are governed by the laws of the United States and the state of the operator's residence, without regard to conflict-of-laws rules. Disputes will be resolved in the courts located there, unless you have non-waivable rights to your local courts." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$6, { title: "Changes", children: "We may update these Terms. Material changes will be announced in-app. Continued use after changes means you accept the new Terms." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "Contact: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA" })
    ] })
  ] }) });
}
function Section$6({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const BASE_URL = "https://myalgorhythm.online";
const Route$l = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/feed", changefreq: "hourly", priority: "0.9" },
          { path: "/discover", changefreq: "daily", priority: "0.8" },
          { path: "/pricing", changefreq: "monthly", priority: "0.7" },
          { path: "/guidelines", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "monthly", priority: "0.4" },
          { path: "/terms", changefreq: "monthly", priority: "0.4" },
          { path: "/refunds", changefreq: "monthly", priority: "0.3" },
          { path: "/payouts", changefreq: "monthly", priority: "0.3" },
          { path: "/dmca", changefreq: "monthly", priority: "0.3" },
          { path: "/contact", changefreq: "monthly", priority: "0.4" },
          { path: "/account-deletion", changefreq: "yearly", priority: "0.3" }
        ];
        const [{ data: posts }, { data: profiles }] = await Promise.all([
          supabaseAdmin.from("posts").select("id, created_at").eq("is_published", true).order("created_at", { ascending: false }).limit(5e3),
          supabaseAdmin.from("profiles").select("handle, updated_at").limit(5e3)
        ]);
        for (const p of posts ?? []) {
          entries.push({ path: `/p/${p.id}`, lastmod: p.created_at, changefreq: "weekly", priority: "0.6" });
        }
        for (const u of profiles ?? []) {
          entries.push({ path: `/u/${u.handle}`, lastmod: u.updated_at, changefreq: "weekly", priority: "0.5" });
        }
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
const Route$k = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your profile — AlgoRhythm" },
      { name: "description", content: "Create your AlgoRhythm profile and start posting AI-made music and videos to a viral vertical feed." },
      { property: "og:title", content: "Create your profile — AlgoRhythm" },
      { property: "og:description", content: "Join AlgoRhythm — the home for AI music creators." },
      { property: "og:url", content: "https://myalgorhythm.online/signup" },
      { name: "robots", content: "noindex" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/signup" }]
  }),
  component: SignupPage
});
function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [birthYear, setBirthYear] = reactExports.useState("");
  const [agreed, setAgreed] = reactExports.useState(false);
  const [ageConfirmed, setAgeConfirmed] = reactExports.useState(false);
  const [copyrightConfirmed, setCopyrightConfirmed] = reactExports.useState(false);
  const [marketingOptIn, setMarketingOptIn] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const onEmail = async (e) => {
    e.preventDefault();
    const yr = parseInt(birthYear, 10);
    const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
    if (!yr || yr < 1900 || yr > thisYear) return toast.error("Enter a valid birth year");
    if (thisYear - yr < 13) return toast.error("You must be at least 13 years old to sign up");
    if (!ageConfirmed) return toast.error("Please confirm you meet the minimum age requirement");
    if (!agreed) return toast.error("Please accept the Terms, Privacy Policy, and Community Guidelines");
    if (!copyrightConfirmed) return toast.error("Please confirm you'll only post content you have rights to");
    setLoading(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/",
        data: {
          display_name: displayName,
          birth_year: yr,
          terms_accepted_at: (/* @__PURE__ */ new Date()).toISOString(),
          marketing_opt_in: marketingOptIn
        }
      }
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      toast.success("Account created!", {
        description: "Please sign in with your new credentials."
      });
      navigate({ to: "/login" });
    } else {
      toast.success("Welcome to AlgoRhythm");
      navigate({ to: "/" });
    }
  };
  const onGoogle = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/"
    });
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res?.redirected) navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto mt-10 max-w-sm px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl tracking-tight text-gradient-gold", children: "Create your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Start posting AI tracks and videos to a viral, gold-tinged feed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onGoogle, className: "mt-6 w-full rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-gold/40", children: "Continue with Google" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onEmail, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            required: true,
            placeholder: "Display name",
            value: displayName,
            onChange: (e) => setDisplayName(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            required: true,
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            required: true,
            minLength: 8,
            placeholder: "Password (8+ chars)",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            required: true,
            min: "1900",
            max: (/* @__PURE__ */ new Date()).getFullYear(),
            placeholder: "Birth year (e.g. 1995)",
            value: birthYear,
            onChange: (e) => setBirthYear(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md border border-gold/20 bg-card/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: ageConfirmed, onChange: (e) => setAgeConfirmed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I confirm I'm at least 13 years old (or the minimum age in my country)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: agreed, onChange: (e) => setAgreed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "I agree to the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy Policy" }),
              ", and",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: copyrightConfirmed, onChange: (e) => setCopyrightConfirmed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "I'll only upload music and content I own or have permission to share, per our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA / Copyright Policy" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: marketingOptIn, onChange: (e) => setMarketingOptIn(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "(Optional) Send me product updates and creator tips by email. I can unsubscribe anytime." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: loading,
            type: "submit",
            className: "w-full rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50",
            children: "Create account"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-muted-foreground", children: [
        "Have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-gold", children: "Sign in" })
      ] })
    ] })
  ] });
}
const Route$j = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund Policy — AlgoRhythm" },
      { name: "description", content: "Refund and cancellation policy for AlgoRhythm Pro subscriptions, creator subscriptions, and tips." },
      { property: "og:title", content: "Refund Policy — AlgoRhythm" },
      { property: "og:description", content: "How refunds and cancellations work on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/refunds" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/refunds" }]
  }),
  component: RefundsPage
});
function RefundsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Refund & Cancellation Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 27, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$5, { title: "AlgoRhythm Pro subscriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Cancel anytime in your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/me", className: "text-gold", children: "account" }),
        " → Manage subscription. You keep Pro access until the end of the current billing period."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We don't pro-rate refunds for partial months or unused yearly time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "If you were billed by mistake (duplicate charge, billing after cancellation), email ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
        " within 14 days for a full refund."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$5, { title: "Creator subscriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You can cancel a creator subscription at any time from your account page. Access continues until the end of the paid month." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Creator subscriptions are non-refundable except in cases of fraud, billing error, or content that violates our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$5, { title: "Tips", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Tips are ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "final and non-refundable" }),
        ". Tips are gifts sent directly to creators and are not subject to cancellation. Exceptions:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Unauthorized charge / payment fraud — contact us within 14 days." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The recipient creator account is terminated for policy violations before the tip is processed." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$5, { title: "EU/UK consumers", children: "If you're a consumer in the EU or UK, you may have a 14-day right of withdrawal on subscription purchases under the Consumer Rights Directive. By starting to use the digital service immediately at checkout, you waive this right — but you can still cancel future renewals at any time." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$5, { title: "How to request a refund", children: [
      "Email ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
      " from the address on your account. Include the date, amount, and what you'd like refunded. We respond within 3 business days."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$5, { title: "Chargebacks", children: "We prefer working directly with you. Filing a chargeback without first contacting us may result in account suspension while the dispute is investigated." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/payouts", className: "text-gold", children: "Creator Payouts" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-gold", children: "Contact" })
    ] })
  ] }) });
}
function Section$5({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const Route$i = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AlgoRhythm" },
      { name: "description", content: "How AlgoRhythm collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — AlgoRhythm" },
      { property: "og:description", content: "How AlgoRhythm collects, uses, and protects your data." },
      { property: "og:url", content: "https://myalgorhythm.online/privacy" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/privacy" }]
  }),
  component: PrivacyPage
});
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24 prose-legal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Privacy Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 27, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-sm text-foreground/90", children: [
      'AlgoRhythm ("we", "us") is operated by Timothy Adkins. This policy explains what we collect, why, and the choices you have. Questions:',
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contactus@myalgorhythm.online", className: "text-gold", children: "contactus@myalgorhythm.online" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "Information we collect", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Account data" }),
        ": email, display name, handle, avatar, and (if you sign in with Google) basic profile info from your Google account."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Content you upload" }),
        ": audio, video, cover images, titles, captions, tags, and any text you submit."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Usage data" }),
        ": posts you view, like, comment on, follow; device, browser, and approximate location derived from IP."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Payments" }),
        ": handled by Stripe. We do not see or store full card numbers; we store transaction IDs and amounts for tips and subscriptions."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "How we use your data", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide the service: hosting your posts, the feed, comments, likes, follows, tipping, and Pro subscriptions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Process audio with AI providers (Google Gemini) to transcribe lyrics, generate cover art, scene images, and post metadata when you opt in." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Prevent abuse, enforce our Terms, comply with legal obligations." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email you about your account or important changes (no marketing email is sent without consent)." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$4, { title: "Third parties we share data with", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Supabase" }),
          " — database, auth, file storage."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Stripe" }),
          " — payments, subscriptions, tax forms."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Google Gemini" }),
          " — AI generation and transcription of content you submit for those features."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Netlify" }),
          " — hosting and edge delivery."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We do not sell your personal data." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "AI-generated content", children: "Audio you submit for lyric transcription is sent to our AI provider only to produce the transcript and is not used by us to train models. Cover images and scenes are generated from prompts you supply. You are responsible for content you publish." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "Cookies & local storage", children: "We use cookies and local storage strictly for sign-in sessions and remembering your preferences. We do not use third-party advertising cookies." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$4, { title: "Your rights", children: [
      "You can edit or delete your posts at any time. You can permanently delete your account and associated data from",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/me", className: "text-gold", children: "your profile settings" }),
      ". EU/UK/California residents have additional rights (access, correction, portability) — email us to exercise them."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "Data retention", children: "Account, profile, and post data are kept until you delete them or your account. Payment records are retained as required by tax/accounting law. Backups are purged on a rolling 30-day cycle." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "Children", children: "AlgoRhythm is not directed to children under 13 (or under 16 in the EEA). Do not use the service if you are under those ages." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$4, { title: "Changes", children: "We may update this policy. Material changes will be announced in-app or by email. Continued use means you accept the updated policy." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms of Service" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA / Content Policy" })
    ] })
  ] }) });
}
function Section$4({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline-offset-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const clientToken = "pk_live_51TbZFYAGzfh2ib0mkr1qXZUfk37oLthPPcvezCY1MvLWyUPCj6DTZgP0onzn1p1Hu6yvx3yMrtgpttxtHRb6Kz3a00tt3269pY";
function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 text-center text-[11px] uppercase tracking-[0.2em] text-amber-200", children: "Test mode — no real charges" });
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function StripeEmbeddedCheckoutPanel({
  fetchClientSecret
}) {
  const options = reactExports.useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[480px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckoutProvider, { stripe: getStripe(), options, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckout, {}) }) });
}
function CheckoutDialog({
  open,
  onOpenChange,
  title,
  fetchClientSecret
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-5 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: fetchClientSecret && /* @__PURE__ */ jsxRuntimeExports.jsx(StripeEmbeddedCheckoutPanel, { fetchClientSecret }) })
  ] }) });
}
const EnvSchema$1 = enumType(["sandbox", "live"]);
const createProCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema$1.parse(data.environment);
  if (!["pro_monthly", "pro_yearly"].includes(data.priceId)) throw new Error("Invalid priceId");
  return data;
}).handler(createSsrRpc("d48a0fb79d78fbe4b32acc3b665eec37cf8b36beadef0db7714e874e9569291b"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema$1.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  return data;
}).handler(createSsrRpc("ce2d2a42f62a147df0401eb2361ae01555318194c7b3a7ceed49466a35c47733"));
const createTipCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema$1.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  if (data.postId) stringType().uuid().parse(data.postId);
  if (!Number.isInteger(data.amountCents) || data.amountCents < 100 || data.amountCents > 5e4) {
    throw new Error("Tip must be between $1 and $500");
  }
  return data;
}).handler(createSsrRpc("f42e40be262e45cad258b367e7b763bf47ee62978203c91427702391d3e31b04"));
const createPortalSession = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema$1.parse(data.environment);
  return data;
}).handler(createSsrRpc("31161651da20ec442b05a176e4449f03e5b8a371bca41f8ca7f9c25e0eda0d1d"));
const Route$h = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "AlgoRhythm Pro — Pricing" },
      { name: "description", content: "Go Pro on AlgoRhythm for ad-free listening, higher quality, and exclusive feeds." },
      { property: "og:title", content: "AlgoRhythm Pro" },
      { property: "og:description", content: "$6.99/mo or $29.99/yr — support the platform and unlock Pro." }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/pricing" }]
  }),
  component: PricingPage
});
function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isPro } = useProSubscription();
  const checkoutFn = createProCheckout;
  const portalFn = createPortalSession;
  const [open, setOpen] = reactExports.useState(false);
  const [priceId, setPriceId] = reactExports.useState("pro_yearly");
  const start = (id) => {
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    setPriceId(id);
    setOpen(true);
  };
  const fetchSecret = open ? async () => {
    const res = await checkoutFn({
      data: {
        priceId,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`
      }
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;
  const manage = async () => {
    const res = await portalFn({
      data: { environment: getStripeEnvironment(), returnUrl: window.location.href }
    });
    if ("error" in res) return toast.error(res.error);
    window.open(res.url, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentTestModeBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mx-auto h-10 w-10 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-2xl font-semibold tracking-tight", children: "AlgoRhythm Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Support AI creators. Get the full experience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3 text-sm", children: [
        "AI title, caption & hashtags",
        "AI cover art",
        "AI lyric videos",
        "Ad-free listening",
        "Higher audio quality",
        "Pro badge on your profile"
      ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold" }),
        " ",
        f
      ] }, f)) }),
      isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "You're on AlgoRhythm Pro 🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: manage, className: "mt-3 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em]", children: "Manage subscription" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => start("pro_yearly"),
            className: "rounded-xl bg-gradient-gold px-5 py-4 text-left text-primary-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Yearly" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", children: [
                  "$29.99",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal", children: "/yr" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: "Save 50% — best value" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => start("pro_monthly"),
            className: "rounded-xl border border-border px-5 py-4 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Monthly" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", children: [
                  "$6.99",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/mo" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Cancel anytime" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckoutDialog,
      {
        open,
        onOpenChange: setOpen,
        title: "Go Pro",
        fetchClientSecret: fetchSecret
      }
    )
  ] });
}
const getMyEarnings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("26dd6e8190f511198bb5d3d37ebe2511a957e9a2f13ab145c1c74af17d9aa8e8"));
const EnvSchema = enumType(["sandbox", "live"]);
const getMyConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("03d6cb9cd588eede9c075db3c802de3c313b52fb0d478ad4fc7a2ac3fd9e4e11"));
const startConnectOnboarding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().url().parse(data.returnUrl);
  stringType().url().parse(data.refreshUrl);
  return data;
}).handler(createSsrRpc("03091e6a24c09119b34e5a0bf15014ccc84d46d04a00b496b4b2f4fd188b06a5"));
const refreshConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("ae929efe668da6b1f7e27a2911d5ea9f364599efe9587f41f0a1e8bdc24f42e4"));
const getConnectDashboardLink = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("3cb94bb50004e98b95c298d37c2d04180087e259b6be9d40d9a7497a2cc6dbfa"));
const Route$g = createFileRoute("/payouts")({
  head: () => ({
    meta: [
      { title: "Creator Payouts & Fees — AlgoRhythm" },
      { name: "description", content: "How creators earn on AlgoRhythm — platform fee, payout schedule, eligibility, and tax responsibilities." },
      { property: "og:title", content: "Creator Payouts — AlgoRhythm" },
      { property: "og:description", content: "How creators get paid on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/payouts" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/payouts" }]
  }),
  component: PayoutsPage
});
function PayoutsPage() {
  const { user } = useAuth();
  const fetchEarnings = getMyEarnings;
  const fetchStatus = getMyConnectStatus;
  const startOnboard = startConnectOnboarding;
  const refreshStatus = refreshConnectStatus;
  const getDashLink = getConnectDashboardLink;
  const qc = useQueryClient();
  const env = getStripeEnvironment();
  const [busy, setBusy] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const { data: earnings } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: () => fetchEarnings(),
    enabled: !!user
  });
  const { data: status } = useQuery({
    queryKey: ["connect-status", env],
    queryFn: () => fetchStatus({ data: { environment: env } }),
    enabled: !!user
  });
  const onboard = async () => {
    setBusy("onboard");
    setError(null);
    try {
      const returnUrl = `${window.location.origin}/payouts?connect=return`;
      const refreshUrl = `${window.location.origin}/payouts?connect=refresh`;
      const res = await startOnboard({ data: { environment: env, returnUrl, refreshUrl } });
      if ("error" in res) {
        setError(res.error);
        return;
      }
      window.location.href = res.url;
    } finally {
      setBusy(null);
    }
  };
  const refresh = async () => {
    setBusy("refresh");
    setError(null);
    try {
      await refreshStatus({ data: { environment: env } });
      await qc.invalidateQueries({ queryKey: ["connect-status", env] });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to refresh");
    } finally {
      setBusy(null);
    }
  };
  const openDash = async () => {
    setBusy("dash");
    setError(null);
    try {
      const res = await getDashLink({ data: { environment: env } });
      if ("error" in res) {
        setError(res.error);
        return;
      }
      window.open(res.url, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Creator Payouts & Fees" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 30, 2026" }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-gold", children: "Your earnings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$2, { label: "Tip balance", value: fmt(earnings?.totalBalanceCents ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$2, { label: "Lifetime tips", value: String(earnings?.tipCount ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$2, { label: "Active subscribers", value: String(earnings?.activeSubCount ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$2, { label: "Est. monthly sub net", value: fmt(earnings?.estMonthlySubNetCents ?? 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border/60 bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Payout account" }),
        !status?.hasAccount && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-foreground/80", children: "Set up your payout account to start receiving tips and subscriber payments directly to your bank." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onboard,
              disabled: busy === "onboard",
              className: "mt-3 w-full rounded-md bg-gradient-gold py-2 text-sm font-medium text-primary-foreground disabled:opacity-50",
              children: busy === "onboard" ? "Opening secure onboarding…" : "Set up payouts"
            }
          )
        ] }),
        status?.hasAccount && status.chargesEnabled && status.payoutsEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-emerald-400", children: "✓ Active — tips and subscriber payments are being sent to your account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: openDash,
                disabled: busy === "dash",
                className: "flex-1 rounded-md border border-gold/40 py-2 text-sm text-gold disabled:opacity-50",
                children: busy === "dash" ? "Opening…" : "Open payout dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: refresh,
                disabled: busy === "refresh",
                className: "rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50",
                children: busy === "refresh" ? "…" : "Refresh"
              }
            )
          ] })
        ] }),
        status?.hasAccount && !(status.chargesEnabled && status.payoutsEnabled) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-amber-400", children: [
            "Onboarding in progress. ",
            status.detailsSubmitted ? "Stripe is reviewing your details — this usually takes a few minutes." : "You haven't finished entering your details yet."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onboard,
                disabled: busy === "onboard",
                className: "flex-1 rounded-md bg-gradient-gold py-2 text-sm font-medium text-primary-foreground disabled:opacity-50",
                children: busy === "onboard" ? "Opening…" : "Continue onboarding"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: refresh,
                disabled: busy === "refresh",
                className: "rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50",
                children: busy === "refresh" ? "…" : "Refresh"
              }
            )
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] text-rose-400", children: error })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$3, { title: "How creators earn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tips" }),
        " — one-time payments from fans, $1–$500 per tip."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Creator subscriptions" }),
        " — recurring $4.99/month from fans for ongoing support."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$3, { title: "Platform fee", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "AlgoRhythm takes a flat ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "15% platform fee" }),
        " on tips and creator subscriptions. The remaining 85% is your gross earnings — payment processing fees (typically 2.9% + $0.30 per transaction) are deducted by our payment processor before payout."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Example: a $10 tip → $8.50 after AlgoRhythm fee → ~$7.91 after processing fees lands in your payout account." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$3, { title: "Payout schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Earnings are held by our payment processor until your account meets the minimum payout threshold (currently ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "$10" }),
        ")."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Payouts run on a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "weekly" }),
        " schedule."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "New creator accounts have a 7-day initial holding period for fraud review." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$3, { title: "Eligibility", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To receive payouts you must:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Be at least ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "18 years old" }),
          " (or the age of majority in your country)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reside in a country supported by our payment processor." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Complete payout onboarding (identity verification, bank or card account, tax info)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not be on any sanctions list (OFAC, EU, UN)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Comply with our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
          " and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$3, { title: "Taxes", children: [
      "You are responsible for reporting and paying taxes on your AlgoRhythm earnings in your jurisdiction. For US creators, we (or our payment processor) will issue a ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1099-K" }),
      " if your earnings exceed the IRS reporting threshold for the year."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$3, { title: "Refunds & chargebacks", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If a tip or subscription is refunded or charged back, the corresponding amount is deducted from your future earnings." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Excessive chargebacks (over 1% of your volume) may trigger account review." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$3, { title: "Account termination", children: "If your account is terminated for violating our policies, you forfeit any earnings not yet paid out. We will not knowingly enrich bad-faith actors." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/refunds", className: "text-gold", children: "Refunds" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-gold", children: "Contact" })
    ] })
  ] }) });
}
function Section$3({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
function Stat$2({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 bg-background/40 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-foreground", children: value })
  ] });
}
function fmt(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
const deleteAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6532c0418ba9329af9f16b7b8e7fcee96c637a7170910bf85d988011b35489bc"));
const DropdownMenu = Root2$2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2$1.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function PostGridItem({
  post,
  isOwner,
  onEdit,
  onDelete,
  onClick
}) {
  const isVideo = post.type === "video";
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const coverUrl = resolveStorageUrl(post.cover_url);
  const mediaUrl = resolveStorageUrl(post.media_url);
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: coverUrl,
        className: "absolute inset-0 h-full w-full object-cover",
        alt: post.title,
        loading: "lazy"
      }
    ) : isVideo && mediaUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: `${mediaUrl}#t=0.1`,
        preload: "metadata",
        muted: true,
        playsInline: true,
        className: "absolute inset-0 h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-card to-background" }),
    isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-2.5 w-2.5 fill-white text-white" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[10px] text-white", children: post.title }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-md bg-card", children: [
    onClick ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "absolute inset-0 w-full text-left", "aria-label": post.title, children: content }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/p/$id",
        params: { id: post.id },
        className: "absolute inset-0",
        "aria-label": post.title,
        children: content
      }
    ),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Post actions",
          onClick: (e) => e.stopPropagation(),
          className: "absolute left-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit?.(post), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-2 h-3.5 w-3.5" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            onClick: () => onDelete?.(post),
            className: "text-destructive focus:text-destructive",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-3.5 w-3.5" }),
              " Delete"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function AudioVisualizer({
  audio,
  playing,
  coverUrl
}) {
  const canvasRef = reactExports.useRef(null);
  const ctxRef = reactExports.useRef(null);
  const analyserRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!audio || !playing) return;
    let cancelled = false;
    const setup = async () => {
      try {
        if (!ctxRef.current) {
          const AC = window.AudioContext || window.webkitAudioContext;
          const ctx = new AC();
          ctxRef.current = ctx;
          const src = ctx.createMediaElementSource(audio);
          const analyser2 = ctx.createAnalyser();
          analyser2.fftSize = 256;
          src.connect(analyser2);
          analyser2.connect(ctx.destination);
          analyserRef.current = analyser2;
        }
        if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas || !analyser || cancelled) return;
        const data = new Uint8Array(analyser.frequencyBinCount);
        const c = canvas.getContext("2d");
        if (!c) return;
        const draw = () => {
          if (cancelled) return;
          rafRef.current = requestAnimationFrame(draw);
          const w = canvas.width;
          const h = canvas.height;
          analyser.getByteFrequencyData(data);
          c.clearRect(0, 0, w, h);
          const bars = 64;
          const step = Math.floor(data.length / bars);
          const bw = w / bars;
          const grad = c.createLinearGradient(0, 0, 0, h);
          grad.addColorStop(0, "rgba(240, 215, 140, 0.95)");
          grad.addColorStop(1, "rgba(201, 168, 76, 0.4)");
          c.fillStyle = grad;
          for (let i = 0; i < bars; i++) {
            const v = data[i * step] / 255;
            const bh = Math.max(2, v * h * 0.85);
            const x = i * bw + 1;
            const y = (h - bh) / 2;
            c.fillRect(x, y, bw - 2, bh);
          }
        };
        draw();
      } catch (e) {
        console.warn("Visualizer error", e);
      }
    };
    setup();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [audio, playing]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
    coverUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: coverUrl,
          alt: "",
          className: "absolute inset-0 h-full w-full object-cover blur-2xl opacity-50 scale-110"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: coverUrl,
          alt: "",
          className: "absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover shadow-2xl ring-1 ring-gold/30"
        }
      )
    ] }),
    !coverUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-card via-background to-black" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        width: 400,
        height: 120,
        className: "absolute inset-x-0 bottom-32 mx-auto h-28 w-[90%] max-w-md"
      }
    )
  ] });
}
const PRESETS = [100, 300, 500, 1e3, 2500];
function TipDialog({
  open,
  onOpenChange,
  creatorId,
  creatorName,
  postId
}) {
  const checkoutFn = createTipCheckout;
  const [amount, setAmount] = reactExports.useState(500);
  const [custom, setCustom] = reactExports.useState("");
  const [checkoutOpen, setCheckoutOpen] = reactExports.useState(false);
  const start = () => {
    onOpenChange(false);
    setCheckoutOpen(true);
  };
  const fetchSecret = checkoutOpen ? async () => {
    const cents = custom ? Math.round(parseFloat(custom) * 100) : amount;
    const res = await checkoutFn({
      data: {
        creatorId,
        amountCents: cents,
        postId,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`
      }
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-gold" }),
        " Tip ",
        creatorName
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 pt-2", children: PRESETS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setAmount(c);
            setCustom("");
          },
          className: `rounded-md border py-2 text-sm transition ${!custom && amount === c ? "border-gold/60 bg-gold/10 text-gold" : "border-border"}`,
          children: [
            "$",
            (c / 100).toFixed(c % 100 === 0 ? 0 : 2)
          ]
        },
        c
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 pt-1 text-sm text-muted-foreground", children: "$" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "1",
            max: "500",
            step: "0.01",
            value: custom,
            onChange: (e) => setCustom(e.target.value),
            placeholder: "Custom amount",
            className: "w-full rounded-md border border-border bg-card px-7 py-2 text-sm outline-none focus:border-gold/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "85% goes to the creator. AlgoRhythm keeps a 15% platform fee." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: start,
          disabled: !custom && !amount,
          className: "mt-2 w-full rounded-md bg-gradient-gold py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50",
          children: "Continue to payment"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckoutDialog,
      {
        open: checkoutOpen,
        onOpenChange: setCheckoutOpen,
        title: `Tip ${creatorName}`,
        fetchClientSecret: fetchSecret
      }
    )
  ] });
}
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$3, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = Root2$3.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2$1,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = Item2$1.displayName;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root$1.displayName;
const REPORT_REASONS = ["spam", "harassment", "hate", "sexual", "violence", "csam", "impersonation", "ip_violation", "self_harm", "illegal", "other"];
const submitReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetType: enumType(["post", "comment", "user"]),
  targetId: stringType().uuid(),
  reason: enumType(REPORT_REASONS),
  details: stringType().max(1e3).optional()
}).parse(input)).handler(createSsrRpc("e36fbc70a7b34db54231b924d19295cda1b7ce33f3afbb02edd76a53c2a3ff5b"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("1e0d4a13c7f29305bf83436dd1a48cb828c89579757496f12ee99dc52a33c955"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("12e6c1ddc252e8ebe6bb9c6023b7d9efdfea46f26e7f957701dd67d0733d18b1"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("57cc15186382dbb53d3e73a2b2a30e303ad85e32ed95e341410ae9539f98c149"));
const REASONS = [
  { value: "spam", label: "Spam or scam" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "hate", label: "Hate speech" },
  { value: "sexual", label: "Sexual content / nudity" },
  { value: "violence", label: "Violence or gore" },
  { value: "csam", label: "Child sexual abuse material" },
  { value: "self_harm", label: "Self-harm or suicide" },
  { value: "impersonation", label: "Impersonation" },
  { value: "ip_violation", label: "Copyright / IP violation" },
  { value: "illegal", label: "Illegal activity" },
  { value: "other", label: "Something else" }
];
function ReportDialog({
  open,
  onOpenChange,
  targetType,
  targetId
}) {
  const [reason, setReason] = reactExports.useState("spam");
  const [details, setDetails] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const reportFn = submitReport;
  const submit = async () => {
    setSubmitting(true);
    try {
      await reportFn({
        data: { targetType, targetId, reason, details: details.trim() || void 0 }
      });
      toast.success("Report submitted. Thank you.");
      onOpenChange(false);
      setDetails("");
      setReason("spam");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Report ",
        targetType
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Reports are reviewed by our moderation team. False reports may affect your account." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { value: reason, onValueChange: (v) => setReason(v), className: "grid gap-2 max-h-[40dvh] overflow-y-auto py-1", children: REASONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Label,
      {
        className: "flex cursor-pointer items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:border-gold/40",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: r.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label })
        ]
      },
      r.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value: details,
        onChange: (e) => setDetails(e.target.value),
        placeholder: "Optional details (max 1000 chars)",
        maxLength: 1e3,
        rows: 3
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, className: "bg-gradient-gold text-primary-foreground", children: submitting ? "Submitting…" : "Submit report" })
    ] })
  ] }) });
}
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function FeedItem({
  post,
  active,
  liked,
  following,
  saved,
  onLike,
  onFollow,
  onComment,
  onSave,
  muted,
  onToggleMute,
  autoAdvance,
  onEnded
}) {
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [volume, setVolume] = reactExports.useState(1);
  const [tipOpen, setTipOpen] = reactExports.useState(false);
  const [reportPostOpen, setReportPostOpen] = reactExports.useState(false);
  const [reportUserOpen, setReportUserOpen] = reactExports.useState(false);
  const [shareOpen, setShareOpen] = reactExports.useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const track = recordPlayback;
  const playStartRef = reactExports.useRef(null);
  const reportedPlayRef = reactExports.useRef(false);
  const reportedCompleteRef = reactExports.useRef(false);
  const loopsRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.muted = muted;
      el.volume = volume;
      reportedPlayRef.current = false;
      reportedCompleteRef.current = false;
      loopsRef.current = 0;
      playStartRef.current = Date.now();
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      if (playStartRef.current && reportedPlayRef.current) {
        const listenedMs = Date.now() - playStartRef.current;
        if (listenedMs > 1500) {
          track({ data: { postId: post.id, event: "play", listenedMs } }).catch(() => {
          });
        }
        playStartRef.current = null;
      }
      el.pause();
      setPlaying(false);
    }
  }, [active, post.type, muted]);
  reactExports.useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume, post.type]);
  reactExports.useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (!active) return;
      if (!reportedPlayRef.current && el.currentTime >= 2) {
        reportedPlayRef.current = true;
        track({ data: { postId: post.id, event: "play" } }).catch(() => {
        });
      }
      if (!reportedCompleteRef.current && el.duration > 0 && el.currentTime / el.duration >= 0.9) {
        reportedCompleteRef.current = true;
        track({ data: { postId: post.id, event: "complete" } }).catch(() => {
        });
      }
    };
    const onEndEvent = () => {
      if (!active) return;
      if (autoAdvance) {
        onEnded?.();
      }
    };
    const onSeekedToStart = () => {
      if (!active || autoAdvance) return;
      if (el.currentTime < 0.5 && reportedCompleteRef.current) {
        loopsRef.current += 1;
        if (loopsRef.current <= 5) {
          track({ data: { postId: post.id, event: "loop" } }).catch(() => {
          });
        }
        reportedCompleteRef.current = false;
      }
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("seeking", onSeekedToStart);
    el.addEventListener("ended", onEndEvent);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("seeking", onSeekedToStart);
      el.removeEventListener("ended", onEndEvent);
    };
  }, [active, post.id, post.type, track, autoAdvance, onEnded]);
  const togglePlay = () => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/p/${post.id}` : `/p/${post.id}`;
  const creatorHandle = post.creator?.handle ?? "creator";
  const baseTags = (post.tags ?? []).slice(0, 3).map((t) => `#${t.replace(/\s+/g, "")}`).join(" ");
  const caption = `${post.title} — by @${creatorHandle} on AlgoRhythm 🎧
${shareUrl}
${baseTags} #AlgoRhythm #AIMusic`.trim();
  const openShare = async () => {
    const isMobile = typeof navigator !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, text: caption, url: shareUrl });
        return;
      } catch {
      }
    }
    setShareOpen(true);
  };
  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Couldn't copy");
    }
  };
  const mediaUrl = resolveStorageUrl(post.media_url);
  const coverUrl = resolveStorageUrl(post.cover_url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-dvh w-full snap-start overflow-hidden bg-black", children: [
    post.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        src: mediaUrl,
        poster: coverUrl || void 0,
        playsInline: true,
        muted,
        loop: !autoAdvance,
        className: "absolute inset-0 h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      coverUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: coverUrl,
          alt: "",
          className: "absolute inset-0 h-full w-full object-cover opacity-60"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: mediaUrl, loop: !autoAdvance }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AudioVisualizer, { audio: audioRef.current, playing: playing && active, coverUrl: coverUrl || post.cover_url })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: togglePlay,
        className: "absolute inset-0 z-10",
        "aria-label": "Toggle play"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" }),
    !playing && active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-black/40 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-7 w-7 text-white" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Watermark, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": muted ? "Unmute" : "Mute",
        onClick: (e) => {
          e.stopPropagation();
          onToggleMute();
        },
        className: "absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur",
        children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "absolute left-4 top-[3.75rem] z-20 flex h-24 w-9 flex-col items-center justify-center rounded-full bg-black/40 px-1 py-2 backdrop-blur",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: muted ? 0 : volume,
            onChange: (e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (v > 0 && muted) onToggleMute();
            },
            "aria-label": "Volume",
            className: "h-20 w-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[var(--gold)] [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto absolute bottom-28 right-3 z-30 flex flex-col items-center gap-5 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { onClick: onLike, count: post.like_count + (liked ? 1 : 0), active: liked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-7 w-7", liked && "fill-current text-rose-400") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { onClick: onComment, count: post.comment_count, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionButton,
        {
          ariaLabel: saved ? "Remove from library" : "Save to library",
          onClick: onSave,
          count: (post.save_count ?? 0) + (saved ? 1 : 0),
          active: saved,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: cn("h-7 w-7", saved && "fill-current text-gold") })
        }
      ),
      post.creator && user?.id !== post.creator.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionButton,
        {
          ariaLabel: "Tip creator",
          onClick: () => {
            if (!user) return navigate({ to: "/login" });
            setTipOpen(true);
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-7 w-7 text-gold" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { onClick: openShare, ariaLabel: "Share post", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-7 w-7" }) }),
      user && post.creator && user.id !== post.creator.id && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "More options",
            className: "flex flex-col items-center gap-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-6 w-6" }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuContent,
          {
            align: "end",
            side: "left",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => setReportUserOpen(true), children: "Report creator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => setReportPostOpen(true), children: "Report post" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuItem,
                {
                  className: "text-rose-400 focus:text-rose-400",
                  onSelect: () => post.creator && navigate({ to: "/u/$handle", params: { handle: post.creator.handle } }),
                  children: "Block creator"
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-24 z-20 px-5 pb-2 pr-24 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        post.creator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              if (!user) return navigate({ to: "/welcome" });
              navigate({ to: "/u/$handle", params: { handle: post.creator.handle } });
            },
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar$1, { url: post.creator.avatar_url, name: post.creator.display_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
                  "@",
                  post.creator.handle
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-white/70", children: post.creator.display_name })
              ] })
            ]
          }
        ),
        !following && post.creator && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onFollow();
            },
            className: "rounded-full border border-gold/60 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gold",
            children: "Follow"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-base font-medium", children: post.title }),
      post.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-white/80", children: post.description }),
      post.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: post.tags.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80", children: [
        "#",
        t
      ] }, t)) })
    ] }),
    post.creator && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TipDialog,
      {
        open: tipOpen,
        onOpenChange: setTipOpen,
        creatorId: post.creator.id,
        creatorName: post.creator.display_name,
        postId: post.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportDialog,
      {
        open: reportPostOpen,
        onOpenChange: setReportPostOpen,
        targetType: "post",
        targetId: post.id
      }
    ),
    post.creator && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportDialog,
      {
        open: reportUserOpen,
        onOpenChange: setReportUserOpen,
        targetType: "user",
        targetId: post.creator.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: shareOpen, onOpenChange: setShareOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "rounded-t-2xl border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-left text-base", children: "Share this track" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShareRow,
          {
            label: "Copy link",
            sub: shareUrl,
            onClick: () => copy(shareUrl, "Link")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShareRow,
          {
            label: "Copy caption for TikTok / Reels / Shorts",
            sub: "Pre-formatted with title, @creator, link, and tags",
            onClick: () => copy(caption, "Caption")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40",
            onClick: () => setShareOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Share to X / Twitter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Opens the composer pre-filled" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40",
            onClick: () => setShareOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Share to Facebook" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Opens the share dialog" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40",
            onClick: () => setShareOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Send via WhatsApp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Opens WhatsApp with the link" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] leading-relaxed text-muted-foreground", children: "Tip: the AlgoRhythm watermark on the visualizer travels with every screen-recording, so shares always point friends back to the original." })
    ] }) })
  ] });
}
function ActionButton({
  children,
  count,
  onClick,
  active,
  ariaLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "aria-label": ariaLabel, onClick: (e) => {
    e.stopPropagation();
    onClick();
  }, className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur", active && "bg-rose-500/15"), children }),
    count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tabular-nums", children: formatCount(count) })
  ] });
}
function ShareRow({
  label,
  sub,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "block w-full rounded-lg border border-border bg-background/50 p-3 text-left text-sm hover:border-gold/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-xs text-muted-foreground", children: sub })
      ]
    }
  );
}
function Avatar$1({ url: url2, name }) {
  if (url2) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url2, alt: name, className: "h-9 w-9 rounded-full object-cover ring-1 ring-gold/40" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary-foreground", children: name.slice(0, 1).toUpperCase() });
}
function formatCount(n) {
  if (n < 1e3) return String(n);
  if (n < 1e6) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
}
const toggleLike = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("0e88bb8ac9b2e31dd061e05b2cf53a40f98890a68ac4eeac0c38345d71cebe54"));
const toggleFollow = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("ef51ff0239ef1c757014c75dcc09d28ed5c5b5ba85dac0298f205a26014a3d2a"));
const addComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid(),
  body: stringType().min(1).max(500)
}).parse(input)).handler(createSsrRpc("11bd0a6e14c7c045d88d5bce575cbe6506b2462b5ba7b084e0cc7d40432cb942"));
const getComments = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("27e4ec9d64d3dc3adcff06ba63017b7237e0755979c15b1bd5098dada294aaf0"));
const getMyInteractions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postIds: arrayType(stringType().uuid()).max(50),
  creatorIds: arrayType(stringType().uuid()).max(50)
}).parse(input)).handler(createSsrRpc("4c9297a8adfa09e97e8e202b0096a7e3c93a9f588908d734619ee410c5e38d1b"));
function CommentsSheet({ postId, open, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchComments = getComments;
  const postComment = addComment;
  const [body, setBody] = reactExports.useState("");
  const { data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments({ data: { postId } }),
    enabled: !!postId && open
  });
  reactExports.useEffect(() => {
    if (!open) setBody("");
  }, [open]);
  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate({ to: "/welcome" });
      return;
    }
    if (!body.trim() || !postId) return;
    try {
      await postComment({ data: { postId, body: body.trim() } });
      setBody("");
      qc.invalidateQueries({ queryKey: ["comments", postId] });
    } catch (e2) {
      toast.error(e2.message);
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto max-h-[75dvh] rounded-t-2xl border-t border-gold/20 bg-card", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Comments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Close comments", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[55dvh] overflow-y-auto px-4 py-4 no-scrollbar", children: [
      data?.pinned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-xl bg-gold/10 border border-gold/20 p-3 animate-in fade-in slide-in-from-top-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-3 w-3" }),
          " Pinned by Creator"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground text-xs font-bold", children: (data.pinned.user?.display_name ?? "?").slice(0, 1).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gold font-medium", children: [
              "@",
              data.pinned.user?.handle ?? "creator"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/90", children: data.pinned.body })
          ] })
        ] })
      ] }),
      data?.comments.length === 0 && !data?.pinned && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-10 text-center text-sm text-muted-foreground", children: "Be the first to comment." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4 py-2", children: data?.comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-xs", children: (c.user?.display_name ?? "?").slice(0, 1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gold", children: [
            "@",
            c.user?.handle ?? "user"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/90", children: c.body })
        ] })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex items-center gap-2 border-t border-border p-3 pb-[max(5rem,calc(env(safe-area-inset-bottom)+5rem))]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: body,
          onChange: (e) => setBody(e.target.value),
          placeholder: user ? "Add a comment…" : "Sign in to comment",
          className: "flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-gold/50 disabled:opacity-60"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", "aria-label": "Post comment", className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] }) });
}
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("50fcd38b52b4b1f1e9efff25c055bddc1d0bb02e59eb889b3ee7588b283ecafe"));
const getMyLibrary = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("aed92e546828fc97792f0912651ae937a88db06989c79e196b6bdcddfdea160e"));
const Route$f = createFileRoute("/me")({
  head: () => ({
    meta: [
      { title: "Your profile — AlgoRhythm" },
      { name: "description", content: "Manage your AlgoRhythm creator profile, posts, and account." },
      { property: "og:title", content: "Your profile — AlgoRhythm" },
      { property: "og:description", content: "Manage your creator profile on AlgoRhythm." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://myalgorhythm.online/me" },
      { name: "robots", content: "noindex" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/me" }]
  }),
  component: MePage
});
function MePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({ data: data2 }) => setIsAdmin(!!data2));
  }, [user]);
  const fetchMe = getMyProfile;
  const fetchLibrary = getMyLibrary;
  const update = updateMyProfile;
  const removePost = deletePost;
  const editPost = updatePost;
  const wipeAccount = deleteAccount;
  const portalFn = createPortalSession;
  const { isPro } = useProSubscription();
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
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);
  const { data } = useQuery({
    queryKey: ["me", user?.id],
    queryFn: () => fetchMe({}),
    enabled: !!user
  });
  const { data: library } = useQuery({
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
    const { error } = await supabase.storage.from("avatars").upload(path, file, { contentType: file.type });
    if (error) return toast.error(error.message);
    const url2 = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    await update({ data: { avatar_url: url2 } });
    qc.invalidateQueries({ queryKey: ["me"] });
    toast.success("Avatar updated");
  };
  const save = async () => {
    setBusy(true);
    try {
      await update({ data: { display_name: displayName, bio } });
      qc.invalidateQueries({ queryKey: ["me"] });
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
      data: { environment: getStripeEnvironment(), returnUrl: window.location.href }
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
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["my-library"] });
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
      await removePost({ data: { id: deletingPostId } });
      qc.invalidateQueries({ queryKey: ["me"] });
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
      target?.scrollIntoView({ behavior: "auto" });
    }
  }, [viewMode, activeIdx]);
  reactExports.useEffect(() => {
    const root = feedContainerRef.current;
    if (!root || viewMode !== "feed") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.7) {
            setActiveIdx(Number(e.target.dataset.idx));
          }
        });
      },
      { root, threshold: [0.7] }
    );
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeedItem,
            {
              post: { ...post, creator: tab === "posts" ? p : post.creator },
              active: idx === activeIdx,
              liked: false,
              following: false,
              saved: tab === "library",
              onLike: () => {
              },
              onFollow: () => {
              },
              onComment: () => setCommentsFor(post.id),
              onSave: () => {
              },
              muted,
              onToggleMute: () => setMuted(!muted),
              autoAdvance: tab === "library",
              onEnded: () => {
                if (tab === "library" && idx < feedItems.length - 1) {
                  const next = idx + 1;
                  setActiveIdx(next);
                  const target = feedContainerRef.current?.children[next];
                  target?.scrollIntoView({ behavior: "smooth" });
                }
              }
            }
          ),
          tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setEditingPost({ id: post.id, title: post.title, description: post.description || "", tags: post.tags?.map((t) => `#${t}`).join(" ") || "", pinned_comment: post.pinned_comment || "" });
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": true,
                className: "absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow ring-2 ring-background",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5" })
              }
            ),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            "aria-label": "Sign out",
            onClick: () => signOut().then(() => navigate({ to: "/" })),
            className: "grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
          }
        )
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          className: "mt-4 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
              " Admin panel"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gold", children: "Open →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Posts", v: p.post_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Followers", v: p.follower_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Following", v: p.following_count })
      ] }),
      isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AlgoRhythm Pro" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: manage, className: "text-xs uppercase tracking-[0.18em] text-gold", children: "Manage" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/pricing",
          className: "mt-5 flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-gold" }),
              " Go Pro"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "From $6.99/mo →" })
          ]
        }
      ),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: displayName,
            onChange: (e) => setDisplayName(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: bio,
            onChange: (e) => setBio(e.target.value),
            rows: 3,
            placeholder: "Bio",
            className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
          }
        ),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setTab("posts"),
              className: `inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${tab === "posts" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-3.5 w-3.5" }),
                " Posts"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setTab("library"),
              className: `inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${tab === "library" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
                " Library"
              ]
            }
          )
        ] }),
        tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", className: "inline-flex items-center gap-1 text-xs text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " New"
        ] })
      ] }),
      tab === "posts" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-1.5 pb-12", children: [
        data.posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PostGridItem,
          {
            post,
            isOwner: true,
            onClick: () => {
              setActiveIdx(i);
              setViewMode("feed");
            },
            onEdit: (pp) => setEditingPost({
              id: pp.id,
              title: pp.title,
              description: post.description ?? "",
              tags: (post.tags ?? []).map((t) => `#${t}`).join(" "),
              pinned_comment: post.pinned_comment || ""
            }),
            onDelete: (pp) => setDeletingPostId(pp.id)
          },
          post.id
        )),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setConfirmText("");
              setDeletingAccount(true);
            },
            className: "inline-flex items-center gap-2 rounded-md border border-destructive/50 px-3 py-2 text-xs text-destructive hover:bg-destructive/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              " Delete my account"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Permanently removes your profile, posts, comments, likes, follows, and uploaded files. This can't be undone." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingPost, onOpenChange: (o) => !o && setEditingPost(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit post" }) }),
      editingPost && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: editingPost.title,
              onChange: (e) => setEditingPost({ ...editingPost, title: e.target.value }),
              className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Caption" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 3,
              value: editingPost.description,
              onChange: (e) => setEditingPost({ ...editingPost, description: e.target.value }),
              className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: editingPost.tags,
              onChange: (e) => setEditingPost({ ...editingPost, tags: e.target.value }),
              placeholder: "#chill #lofi",
              className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Pinned Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 2,
              value: editingPost.pinned_comment,
              onChange: (e) => setEditingPost({ ...editingPost, pinned_comment: e.target.value }),
              placeholder: "Pin a comment to the top...",
              className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setEditingPost(null),
            className: "rounded-md border border-border px-3 py-2 text-sm",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: postBusy,
            onClick: savePostEdit,
            className: "rounded-md bg-gradient-gold px-3 py-2 text-sm text-primary-foreground disabled:opacity-60",
            children: postBusy ? "Saving…" : "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deletingPostId, onOpenChange: (o) => !o && setDeletingPostId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this post?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently removes the post from your profile and the feed. This can't be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: postBusy, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            disabled: postBusy,
            onClick: confirmDelete,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: postBusy ? "Deleting…" : "Delete"
          }
        )
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: confirmText,
          onChange: (e) => setConfirmText(e.target.value),
          placeholder: "Type DELETE to confirm",
          className: "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-destructive/60"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: accountBusy, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            disabled: accountBusy || confirmText !== "DELETE",
            onClick: async (e) => {
              e.preventDefault();
              setAccountBusy(true);
              try {
                await wipeAccount({});
                await signOut();
                toast.success("Your account has been deleted");
                navigate({ to: "/" });
              } catch (err) {
                toast.error(err.message);
                setAccountBusy(false);
              }
            },
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: accountBusy ? "Deleting…" : "Delete forever"
          }
        )
      ] })
    ] }) })
  ] });
}
function Stat$1({ label, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-medium tabular-nums", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label })
  ] });
}
const Route$e = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AlgoRhythm" },
      { name: "description", content: "Sign in to AlgoRhythm to like, comment, follow, and post AI music and videos." },
      { property: "og:title", content: "Sign in — AlgoRhythm" },
      { property: "og:description", content: "Sign in to your AlgoRhythm account." },
      { property: "og:url", content: "https://myalgorhythm.online/login" },
      { name: "robots", content: "noindex" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/login" }]
  }),
  component: LoginPage
});
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate({ to: "/" });
  };
  const onGoogle = async () => {
    setLoading(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/"
    });
    setLoading(false);
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res?.redirected) navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto mt-12 max-w-sm px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl tracking-tight text-gradient-gold", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Welcome back to the feed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onGoogle,
          disabled: loading,
          className: "mt-6 w-full rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-gold/40 disabled:opacity-50",
          children: "Continue with Google"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onEmail, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            required: true,
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            required: true,
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: loading,
            type: "submit",
            className: "w-full rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50",
            children: "Sign in"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-muted-foreground", children: [
        "No account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-gold", children: "Create one" })
      ] })
    ] })
  ] });
}
const Route$d = createFileRoute("/guidelines")({
  head: () => ({
    meta: [
      { title: "Community Guidelines — AlgoRhythm" },
      { name: "description", content: "The rules of the road for AlgoRhythm — what's allowed, what isn't, and how we keep the platform safe." },
      { property: "og:title", content: "Community Guidelines — AlgoRhythm" },
      { property: "og:description", content: "What's allowed and what isn't on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/guidelines" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/guidelines" }]
  }),
  component: GuidelinesPage
});
function GuidelinesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Community Guidelines" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 27, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-foreground/90", children: "AlgoRhythm is a home for AI music creators. To keep it that way, everyone — listener or creator — agrees to these rules. Violations can result in content removal, suspension, or permanent ban." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$2, { title: "Absolutely not allowed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Child sexual abuse material (CSAM)." }),
        " Any sexualized content involving minors will be removed, the account terminated, and reported to NCMEC and law enforcement."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Non-consensual intimate content" }),
        " (including AI-generated nudes of real people)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI voice or likeness of real people without consent" }),
        " — no deepfakes of real artists, public figures, or private individuals."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Threats of violence, doxxing, or stalking." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Hate speech" }),
        " targeting people based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Glorification of self-harm, suicide, or eating disorders." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sale or promotion of illegal goods" }),
        " (drugs, weapons, stolen property)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Copyrighted music or samples" }),
        " you don't own or aren't licensed for. See our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA policy" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$2, { title: "Be honest about AI", children: "AlgoRhythm is built for AI-made content — disclose the tools you used (Suno, Udio, Riffusion, Runway, Pika, etc.) in your post tags. Don't pass off AI work as fully human-made if asked." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$2, { title: "Respect other creators", children: "No targeted harassment, brigading, or coordinated downvoting. Disagreement is fine; abuse isn't." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$2, { title: "Reporting & enforcement", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Tap the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⋮ menu" }),
        " on any post, comment, or profile to report it."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We review reports as quickly as we can — typically within 24–72 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Repeat offenders are permanently banned. Account terminations include all content, tips received, and subscriptions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "If your account was actioned and you believe it was a mistake, email ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$2, { title: "Minimum age", children: [
      "You must be at least ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "13 years old" }),
      " to use AlgoRhythm. To send tips or subscribe, you must be ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "18 or older" }),
      " (or the age of majority in your jurisdiction)."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-gold", children: "Contact" })
    ] })
  ] }) });
}
function Section$2({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const Route$c = createFileRoute("/dmca")({
  head: () => ({
    meta: [
      { title: "DMCA & Content Policy — AlgoRhythm" },
      { name: "description", content: "How to report copyright infringement or other policy violations on AlgoRhythm." },
      { property: "og:title", content: "DMCA & Content Policy — AlgoRhythm" },
      { property: "og:description", content: "Report copyright infringement on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/dmca" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/dmca" }]
  }),
  component: DmcaPage
});
function DmcaPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "DMCA & Content Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 27, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-sm text-foreground/90", children: [
      "AlgoRhythm respects intellectual property rights and expects users to do the same. If you believe content on AlgoRhythm infringes your copyright, or violates our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms of Service" }),
      ", please send a notice to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$1, { title: "What to include in a DMCA notice", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your full legal name, address, phone number, and email." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the copyrighted work (or a representative list)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The exact URL(s) on AlgoRhythm of the allegedly infringing material." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement that you have a good-faith belief the use is not authorized by the owner, agent, or law." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement, under penalty of perjury, that the information is accurate and you are the owner or authorized to act on the owner's behalf." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your physical or electronic signature." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Incomplete notices may not be actionable." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: "Counter-notice", children: "If your content was removed and you believe it was a mistake or misidentification, you may send a counter-notice including the items above plus a statement, under penalty of perjury, that the content was removed by mistake or misidentification, and your consent to jurisdiction of the federal court in your district." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: "Repeat infringers", children: "Accounts that receive repeated valid copyright notices, or that repeatedly violate our Terms, will be terminated." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section$1, { title: "Other content reports", children: [
      "To report harassment, non-consensual imagery, impersonation, or other policy violations, email",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }),
      " with links and a brief description. We review reports as quickly as we can."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: "AI & rights", children: "You must own or be licensed for any samples, vocals, beats, images, or likenesses used as inputs to AI features on AlgoRhythm. Generating content that mimics a real artist's voice or likeness without consent is prohibited." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" })
    ] })
  ] }) });
}
function Section$1({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const getFeed = createServerFn({
  method: "GET"
}).inputValidator((input) => input ?? {}).handler(createSsrRpc("96c8135a3ac1702dccf040ea049bc468fa97ded4781973373df6dcf3b15a6824"));
const getPostById = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("bd20cc845229a9ef552ba97f6da70ec53f7b458ddee5a62bda484a06eeec3f2d"));
const getProfileByHandle = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("470ddfbc3603d8dbbe268aeac0cf519dbcb8d7fa11fd008e251b59c141c66793"));
const getCreatorPostIds = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("6e543eee6892f286d9ecc8d0255fcd21512adb7564c1ecfb48bd32cbd62df4e4"));
const searchAll = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("9ab81eabf349c2b3f495474589afdb920a10a80ce2afec31528e9caa00546980"));
const MOOD_TAGS = ["chill", "hype", "lofi", "trap", "ambient", "synthwave", "drill", "pop", "rnb", "house"];
const AI_TOOLS = ["suno", "udio", "riffusion", "stable-audio", "soundraw", "boomy"];
const Route$b = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — AlgoRhythm" },
      { name: "description", content: "Discover trending AI-made tracks, music videos, and creators on AlgoRhythm." },
      { property: "og:title", content: "Discover — AlgoRhythm" },
      { property: "og:description", content: "Trending AI music and creators on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/discover" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/discover" }]
  }),
  component: DiscoverPage
});
function DiscoverPage() {
  const fetchFeed = getFeed;
  const search = searchAll;
  const { user } = useAuth();
  const [q, setQ] = reactExports.useState("");
  const [tag, setTag] = reactExports.useState(null);
  const [aiTool, setAiTool] = reactExports.useState(null);
  const { data: trending } = useQuery({
    queryKey: ["trending", user?.id ?? null, tag, aiTool],
    queryFn: () => fetchFeed({ data: { limit: 24, viewerId: user?.id ?? null, tag, aiTool } })
  });
  const { data: results } = useQuery({
    queryKey: ["search", q],
    queryFn: () => search({ data: { q } }),
    enabled: q.trim().length > 1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-5 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundVideo, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]", children: "Discover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: q,
          onChange: (e) => setQ(e.target.value),
          placeholder: "Search creators, tracks, tags",
          className: "w-full rounded-md border border-gold/30 bg-card/95 px-9 py-2.5 text-sm text-foreground placeholder:text-foreground/70 outline-none focus:border-gold/70"
        }
      )
    ] }),
    q.trim().length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 space-y-6", children: [
      results?.profiles && results.profiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] uppercase tracking-[0.2em] text-gold-soft", children: "Creators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: results.profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/u/$handle", params: { handle: p.handle }, className: "flex items-center gap-3 rounded-md border border-gold/20 bg-card/95 p-3", children: [
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(active ? null : o),
        className: cn(
          "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wide transition",
          active ? "border-gold/60 bg-gold/15 text-gold" : "border-gold/30 bg-card/95 text-foreground hover:border-gold/60 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]"
        ),
        children: o
      },
      o
    );
  }) });
}
function BackgroundVideo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: bgLoop.url,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        "aria-hidden": true,
        className: "pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-20"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0 bg-background/55" })
  ] });
}
function PostGrid({ posts }) {
  if (posts.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70", children: "Nothing yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: posts.map((p) => {
    const isVideo = p.type === "video";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/p/$id", params: { id: p.id }, className: "relative aspect-[3/4] overflow-hidden rounded-md bg-card", children: [
      p.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveStorageUrl(p.cover_url), alt: p.title, className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }) : isVideo && p.media_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: `${resolveStorageUrl(p.media_url)}#t=0.1`, preload: "metadata", muted: true, playsInline: true, className: "absolute inset-0 h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-card to-background" }),
      isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-2.5 w-2.5 fill-white text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[11px] text-white", children: p.title }) })
    ] }, p.id);
  }) });
}
function Avatar({ url: url2, name }) {
  if (url2) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url2, alt: name, className: "h-10 w-10 rounded-full object-cover ring-1 ring-gold/30" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-sm font-bold text-primary-foreground", children: name.slice(0, 1).toUpperCase() });
}
const Route$a = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — AlgoRhythm" },
      { name: "description", content: "Get in touch with AlgoRhythm support, report abuse, or send a copyright notice." },
      { property: "og:title", content: "Contact & Support — AlgoRhythm" },
      { property: "og:description", content: "Contact AlgoRhythm support." },
      { property: "og:url", content: "https://myalgorhythm.online/contact" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/contact" }]
  }),
  component: ContactPage
});
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Contact & Support" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: "The fastest way to reach us is by email. We respond within 3 business days, usually much sooner." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Mail, title: "General support", desc: "Questions, bugs, account help.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online", children: "contactus@myalgorhythm.online" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: ShieldAlert, title: "Report abuse or harmful content", desc: "In-app: tap ⋮ on any post or profile. Urgent (CSAM, threats, doxxing):", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online?subject=URGENT%20Trust%20%26%20Safety", children: "contactus@myalgorhythm.online" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " (subject: URGENT)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: FileText, title: "Copyright (DMCA)", desc: "See requirements on our DMCA page.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA & Content Policy →" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: CreditCard, title: "Billing & refunds", desc: "Subscriptions, tips, refund requests.", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online?subject=Billing", children: "contactus@myalgorhythm.online" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " · " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/refunds", className: "text-gold", children: "Refund policy →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: TriangleAlert, title: "Security disclosure", desc: "Found a vulnerability? Please disclose responsibly.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online?subject=Security", children: "contactus@myalgorhythm.online" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-xs text-muted-foreground", children: "AlgoRhythm — a publication by an independent operator. For legal notices, mail address provided on request." })
  ] }) });
}
function Card({ icon: Icon, title, desc, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm", children })
  ] });
}
const getAdminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("35056b38ce3195dc744eca42b3cade83d9657ec6451d9be82458721b6325fcaa"));
const listUsers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("291f7acfc05dfc250b05c1a3bd36e196a44e28a097758280b8bd5ea46ef297d2"));
const toggleUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "creator", "user"]),
  enable: booleanType()
}).parse(d)).handler(createSsrRpc("f9b48c140bed96ea6811a7f20e2824cd46b65ec278661940f062dcaec83c8091"));
const adminDeleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("5ca6fa315c7cca7465e568f4b9defd2fca1ada841c89d3d4135e8aaae9c94905"));
const listPosts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("821e69dbf50f8f2649ea7dd9bfc50ff1e9ab2f85f8369dd0cd200162f0150e85"));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid(),
  publish: booleanType()
}).parse(d)).handler(createSsrRpc("bb3b8995d1af19e436917bc99baba410acac078d5e39093c3ffd4169fc37c96f"));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  postId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("3a46bc05aae4781c13bcaf99e0c8fedf51cd7fe214e23bf0c3c7d48393b43567"));
const listComments = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("fa8c3f0f1707ab03e64eab1d7c3780103d5d9d0c6270493d0bb537420e8e237c"));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  commentId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("ff5a1896352190ad255013ffbf2d731481c05f978b7f45f413e4c1325e873405"));
const listTransactions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("fb2dd32bb1e1a5dd94f06aff726aa876821a6f718a8bc97a7034b42a33cf39a7"));
const listReports = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("e9be76e4507615382a2b75178b5cb588505c3f0ca618aae3e51e794b4ac53ff7"));
const resolveReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  reportId: stringType().uuid(),
  action: enumType(["dismiss", "resolve"])
}).parse(d)).handler(createSsrRpc("3ed02a4fd26bb4dc44b858630b4db395f9a8bfaa62ab88c767095a0b94ebc71e"));
const Tabs = Root2$1;
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
  Trigger$1,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger$1.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content$1,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content$1.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
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
const Route$9 = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AlgoRhythm" },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
  component: AdminPage
});
function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({ data }) => setIsAdmin(!!data));
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
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {});
  const cards = [
    { label: "Users", value: data.userCount, icon: Users },
    { label: "Posts", value: data.postCount, icon: FileText },
    { label: "Comments", value: data.commentCount, icon: MessageSquare },
    { label: "Active Pro subs (live)", value: data.activeSubsLive, icon: Crown },
    { label: "Tips count (live)", value: data.tipCount, icon: DollarSign },
    {
      label: "Tip revenue (live)",
      value: `$${(data.tipTotalCents / 100).toFixed(2)}`,
      icon: DollarSign
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border/60 bg-card p-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold", children: c.value })
      ]
    },
    c.label
  )) });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 animate-pulse rounded-lg bg-muted/40" }, i)) });
}
function UsersTab({ currentUserId }) {
  const [search, setSearch] = reactExports.useState("");
  const fn = listUsers;
  const toggleFn = toggleUserRole;
  const delFn = adminDeleteUser;
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => fn({ data: { search } })
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-users"] });
  const toggle = async (userId, role, has) => {
    try {
      await toggleFn({ data: { userId, role, enable: !has } });
      toast.success(`${role} ${has ? "removed" : "granted"}`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const remove = async (userId, handle) => {
    try {
      await delFn({ data: { userId } });
      toast.success(`@${handle} deleted`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Search by handle or display name…",
        value: search,
        onChange: (e) => setSearch(e.target.value)
      }
    ),
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/u/$handle",
                params: { handle: u.handle },
                className: "text-xs text-muted-foreground hover:text-foreground",
                children: [
                  "@",
                  u.handle,
                  " · ",
                  u.follower_count,
                  " followers · ",
                  u.post_count,
                  " posts"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: isAdmin ? "default" : "outline",
                onClick: () => toggle(u.id, "admin", isAdmin),
                disabled: isSelf && isAdmin,
                title: isSelf && isAdmin ? "Cannot demote yourself here" : "",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: isCreator ? "default" : "outline",
                onClick: () => toggle(u.id, "creator", isCreator),
                children: "C"
              }
            ),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      className: "bg-destructive text-destructive-foreground",
                      onClick: () => remove(u.id, u.handle),
                      children: "Delete user"
                    }
                  )
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
  const { data, isLoading } = useQuery({
    queryKey: ["admin-posts", search],
    queryFn: () => fn({ data: { search } })
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-posts"] });
  const togglePublish = async (postId, currently) => {
    try {
      await togglePub({ data: { postId, publish: !currently } });
      toast.success(currently ? "Unpublished" : "Published");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const remove = async (postId) => {
    try {
      await delFn({ data: { postId } });
      toast.success("Post deleted");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Search post titles…",
        value: search,
        onChange: (e) => setSearch(e.target.value)
      }
    ),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: { id: p.id }, className: "p-2 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground",
                    onClick: () => remove(p.id),
                    children: "Delete"
                  }
                )
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
  const { data, isLoading } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: () => fn({ data: {} })
  });
  const remove = async (commentId) => {
    try {
      await delFn({ data: { commentId } });
      toast.success("Comment deleted");
      qc.invalidateQueries({ queryKey: ["admin-comments"] });
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: { id: c.post_id }, className: "hover:text-foreground", children: "view post" }),
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
  const { data, isLoading } = useQuery({ queryKey: ["admin-tx"], queryFn: () => fn() });
  if (isLoading || !data)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" });
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
  const { data, isLoading } = useQuery({
    queryKey: ["admin-reports", status],
    queryFn: () => fn({ data: { status } })
  });
  const act = async (reportId, action) => {
    try {
      await resolveFn({ data: { reportId, action } });
      toast.success(action === "dismiss" ? "Report dismissed" : "Report resolved");
      qc.invalidateQueries({ queryKey: ["admin-reports"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const linkFor = (r) => {
    if (r.target_type === "post") return `/p/${r.target_id}`;
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["pending", "resolved", "dismissed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: status === s ? "default" : "outline",
        onClick: () => setStatus(s),
        children: s
      },
      s
    )) }),
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
              link ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/p/$id", params: { id: r.target_id }, className: "text-xs text-muted-foreground hover:text-foreground", children: "view target" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
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
const Route$8 = createFileRoute("/account-deletion")({
  head: () => ({
    meta: [
      { title: "Delete your AlgoRhythm account" },
      { name: "description", content: "Instructions for permanently deleting your AlgoRhythm account and all associated data." },
      { property: "og:title", content: "Delete your AlgoRhythm account" },
      { property: "og:description", content: "How to permanently delete your AlgoRhythm account." },
      { property: "og:url", content: "https://myalgorhythm.online/account-deletion" }
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/account-deletion" }]
  }),
  component: AccountDeletionPage
});
function AccountDeletionPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Delete your AlgoRhythm account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: "You can permanently delete your AlgoRhythm account and all associated data at any time." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Delete from inside the app", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open AlgoRhythm and sign in." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Go to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/me", className: "text-gold", children: "Me" }),
          " → scroll to the bottom."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Delete my account" }),
          " and confirm."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The deletion is immediate. You'll be signed out and your data removed." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Delete by email", children: [
      "If you can't access your account, email ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-gold", href: "mailto:contactus@myalgorhythm.online?subject=Account%20Deletion%20Request", children: "contactus@myalgorhythm.online" }),
      " from the address on your account with the subject ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Account Deletion Request"' }),
      ". We process requests within 7 days."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "What gets deleted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your profile (handle, display name, avatar, bio, links)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All posts you created, including the audio/video files." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your comments, likes, follows, and follower relationships." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your account credentials and authentication records." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Any blocks you've created." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "What we may retain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Payment records" }),
        " — tip and subscription transaction history is retained for up to 7 years as required by tax and financial regulations. These records are tied to your previous user ID but do not include profile information."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Moderation records" }),
        " — if your account was actioned for policy violations, we retain a minimal record (user ID, date, reason) to prevent ban evasion."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Backups" }),
        " — encrypted backups are purged on a rolling 30-day schedule."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Cancel subscriptions first", children: "Deleting your account does NOT automatically cancel active paid subscriptions to creators or AlgoRhythm Pro. Please cancel them from your account page first, or email us and we'll handle it together." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy Policy" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-gold", children: "Contact" })
    ] })
  ] }) });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
const Route$7 = createFileRoute("/")({
  component: FeedPage
});
function shuffle(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function FeedPage() {
  useAuth();
  useNavigate();
  const [active, setActive] = reactExports.useState(0);
  const [muted, setMuted] = reactExports.useState(true);
  const [commentsFor, setCommentsFor] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const [sessionSeed] = reactExports.useState(() => Math.floor(Math.random() * 1e3));
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ["feed", "shuffled", sessionSeed],
    initialPageParam: 0,
    // Prevent infinite "Initializing Feed..." for Play reviewers / flaky networks.
    staleTime: 3e4,
    retry: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 12;
      const withTimeout = (promise, ms = 12e3) => Promise.race([
        Promise.resolve(promise),
        new Promise(
          (_, reject) => window.setTimeout(() => reject(new Error("Feed timed out — check connection and try again")), ms)
        )
      ]);
      const { count, error: countError } = await withTimeout(
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", true)
      );
      if (countError) throw countError;
      const total = count || 0;
      if (total === 0) return { items: [], nextPage: pageParam + 1, hasMore: false };
      const seedOffset = sessionSeed % Math.max(1, Math.max(total - pageSize, 1));
      const effectiveOffset = (seedOffset + pageParam * pageSize) % Math.max(1, total);
      const { data: posts, error: postError } = await withTimeout(
        supabase.from("posts").select("*").eq("is_published", true).order("created_at", { ascending: false }).range(effectiveOffset, effectiveOffset + pageSize - 1)
      );
      if (postError) throw postError;
      if (!posts || posts.length === 0) return { items: [], nextPage: pageParam + 1, hasMore: false };
      const creatorIds = Array.from(new Set(posts.map((p) => p.creator_id)));
      const { data: profiles } = await withTimeout(
        supabase.from("profiles").select("id, handle, display_name, avatar_url").in("id", creatorIds)
      );
      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
      const mapped = posts.map((p) => ({
        ...p,
        creator: profileMap.get(p.creator_id) || {
          display_name: "Creator",
          handle: "user",
          avatar_url: null
        }
      }));
      const playable = mapped.filter(isPlayablePost);
      const items2 = shuffle(playable.length > 0 ? playable : mapped);
      return {
        items: items2,
        nextPage: pageParam + 1,
        hasMore: total > (pageParam + 1) * pageSize
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : void 0
  });
  const basePosts = reactExports.useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);
  reactExports.useEffect(() => {
    const root = containerRef.current;
    if (!root || basePosts.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            setActive(Number(e.target.dataset.idx));
          }
        });
      },
      { root, threshold: 0.6 }
    );
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "h-dvh snap-y snap-mandatory overflow-y-scroll bg-black no-scrollbar", style: { scrollbarWidth: "none" }, children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic animate-pulse", children: "Initializing Feed..." }),
      !isLoading && basePosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl text-gradient-gold font-black italic uppercase tracking-tighter", children: "Feed Empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest", children: "Upload a track or video — your post goes live instantly on Supabase Storage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/upload", className: "mt-8 inline-block rounded-full bg-gradient-gold px-8 py-3 text-sm font-black text-black uppercase shadow-glow", children: "Create First Post" })
      ] }) }),
      basePosts.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-feed-item": true, "data-idx": idx, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeedItem,
        {
          post,
          active: idx === active,
          liked: false,
          following: false,
          saved: false,
          onLike: () => {
          },
          onFollow: () => {
          },
          onComment: () => setCommentsFor(post.id),
          onSave: () => {
          },
          muted,
          onToggleMute: () => setMuted((m) => !m)
        }
      ) }, `${post.id}-${idx}`)),
      isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-full flex items-center justify-center bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin text-primary h-6 w-6" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: commentsFor, open: !!commentsFor, onClose: () => setCommentsFor(null) })
  ] });
}
function Loader2(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) });
}
const SITE_URL = "https://myalgorhythm.online";
const SITE_NAME = "AlgoRhythm";
function absUrl(path) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
function clamp(str, max) {
  const s = (str ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}
function buildPostTitle(title, handle) {
  const base = handle ? `${title} — @${handle} on ${SITE_NAME}` : `${title} — ${SITE_NAME}`;
  return clamp(base, 60);
}
function buildPostDescription(args) {
  if (args.description && args.description.trim().length > 0) {
    return clamp(args.description, 155);
  }
  const tagStr = (args.tags ?? []).slice(0, 5).map((t) => `#${t}`).join(" ");
  const who = args.handle ? `by @${args.handle}` : "by an independent creator";
  return clamp(`AI-made ${args.type} ${who} on ${SITE_NAME}. ${tagStr}`.trim(), 155);
}
function buildProfileTitle(displayName, handle) {
  return clamp(`${displayName} (@${handle}) — AI music on ${SITE_NAME}`, 60);
}
function buildProfileDescription(args) {
  if (args.bio && args.bio.trim().length > 0) return clamp(args.bio, 155);
  const n = args.postCount ?? 0;
  return clamp(
    `AI-made music & videos by ${args.displayName} (@${args.handle}) on ${SITE_NAME}.${n ? ` ${n} posts.` : ""}`,
    155
  );
}
const profileQueryOptions = (handle) => queryOptions({
  queryKey: ["profile", handle],
  queryFn: () => getProfileByHandle({ data: { handle } })
});
const Route$6 = createFileRoute("/u/$handle")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(profileQueryOptions(params.handle)),
  head: ({ params, loaderData }) => {
    const url2 = `${SITE_URL}/u/${params.handle}`;
    const profile = loaderData?.profile;
    if (!profile) return { meta: [{ title: `Profile not found — ${SITE_NAME}` }] };
    const displayName = profile.display_name ?? params.handle;
    const title = buildProfileTitle(displayName, profile.handle);
    const description = buildProfileDescription({ displayName, handle: profile.handle, bio: profile.bio, postCount: profile.post_count });
    const image = profile.avatar_url ? absUrl(profile.avatar_url) : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", title },
        { property: "og:description", content: description },
        { property: "og:type", "content": "profile" },
        { property: "og:url", content: url2 },
        ...image ? [{ property: "og:image", content: image }] : [],
        { name: "twitter:card", content: image ? "summary_large_image" : "summary" }
      ],
      links: [{ rel: "canonical", href: url2 }]
    };
  },
  component: ProfilePage
});
function ProfilePage() {
  const { handle } = Route$6.useParams();
  const follow = toggleFollow;
  const interactionsFn = getMyInteractions;
  const editPost = updatePost;
  const removePost = deletePost;
  const { user } = useAuth();
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
  const { data, refetch } = useSuspenseQuery(profileQueryOptions(handle));
  useCreatorSubscription(data?.profile?.id);
  const { data: interactions, refetch: refetchInteractions } = useQuery({
    queryKey: ["profile-follow", user?.id, data?.profile?.id],
    queryFn: () => interactionsFn({ data: { postIds: [], creatorIds: [data.profile.id] } }),
    enabled: !!user && !!data?.profile && user.id !== data.profile.id
  });
  const isFollowing = !!interactions?.followingIds?.includes(data?.profile?.id ?? "");
  const onFollow = async () => {
    if (!user) return navigate({ to: "/welcome" });
    try {
      const res = await follow({ data: { targetUserId: data.profile.id } });
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
      await editPost({ data: { id: editingPost.id, title: editTitle.trim(), description: editDesc, tags: tagList, pinned_comment: editPinned.trim() || null } });
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
      await removePost({ data: { id: deletingId } });
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeedItem, { post: { ...post, creator: p }, active: idx === activeIdx, liked: false, following: isFollowing, saved: false, onLike: () => {
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
function Stat({ label, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-medium tabular-nums", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label })
  ] });
}
const postQueryOptions = (id) => queryOptions({
  queryKey: ["post", id],
  queryFn: () => getPostById({ data: { id } })
});
const Route$5 = createFileRoute("/p/$id")({
  validateSearch: (search) => {
    const regenRaw = Number(search.regen);
    const regen = Number.isFinite(regenRaw) ? Math.min(Math.max(Math.trunc(regenRaw), 0), 2) : 0;
    return {
      new: search.new === "1" || search.new === 1 ? 1 : void 0,
      regen: regen || void 0
    };
  },
  loader: ({ context, params }) => context.queryClient.ensureQueryData(postQueryOptions(params.id)),
  head: ({ params, loaderData }) => {
    const url2 = `${SITE_URL}/p/${params.id}`;
    const post = loaderData?.post;
    const creator = loaderData?.creator;
    if (!post) {
      return {
        meta: [
          { title: `Post not found — ${SITE_NAME}` },
          { name: "description", content: `This post is no longer available on ${SITE_NAME}.` },
          { name: "robots", content: "noindex" },
          { property: "og:url", content: url2 }
        ],
        links: [{ rel: "canonical", href: url2 }]
      };
    }
    const handle = creator?.handle ?? null;
    const title = buildPostTitle(post.title, handle);
    const description = buildPostDescription({
      description: post.description,
      type: post.type,
      handle,
      tags: post.tags
    });
    const image = post.cover_url ? absUrl(post.cover_url) : null;
    const isVideo = post.type === "video";
    const ogType = isVideo ? "video.other" : "music.song";
    const keywords = [...post.tags ?? [], ...post.ai_tools ?? [], "AI music", SITE_NAME].filter(Boolean).join(", ");
    const meta = [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url2 },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" }
    ];
    if (image) {
      meta.push({ property: "og:image", content: image });
      meta.push({ property: "og:image:alt", content: post.title });
      meta.push({ name: "twitter:image", content: image });
    }
    if (isVideo) {
      meta.push({ property: "og:video", content: absUrl(post.media_url) });
      meta.push({ property: "og:video:type", content: "video/mp4" });
    } else {
      meta.push({ property: "og:audio", content: absUrl(post.media_url) });
      meta.push({ property: "og:audio:type", content: "audio/mpeg" });
      if (creator?.display_name) meta.push({ property: "music:musician", content: creator.display_name });
    }
    if (creator?.handle) meta.push({ name: "author", content: `@${creator.handle}` });
    const creatorPerson = creator ? {
      "@type": "Person",
      name: creator.display_name ?? `@${creator.handle}`,
      alternateName: `@${creator.handle}`,
      url: `${SITE_URL}/u/${creator.handle}`
    } : void 0;
    const mediaSchema = {
      "@context": "https://schema.org",
      "@type": isVideo ? "VideoObject" : "MusicRecording",
      name: post.title,
      description,
      url: url2,
      ...image ? { thumbnailUrl: image, image } : {},
      contentUrl: absUrl(post.media_url),
      uploadDate: post.created_at,
      ...post.duration_seconds ? { duration: `PT${Math.round(post.duration_seconds)}S` } : {},
      ...post.tags?.length ? { genre: post.tags, keywords: post.tags.join(", ") } : {},
      ...creatorPerson ? { creator: creatorPerson, author: creatorPerson } : {},
      interactionStatistic: [
        { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: post.like_count ?? 0 },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/CommentAction", userInteractionCount: post.comment_count ?? 0 },
        { "@type": "InteractionCounter", interactionType: isVideo ? "https://schema.org/WatchAction" : "https://schema.org/ListenAction", userInteractionCount: post.view_count ?? 0 }
      ]
    };
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...creator ? [{ "@type": "ListItem", position: 2, name: `@${creator.handle}`, item: `${SITE_URL}/u/${creator.handle}` }] : [],
        { "@type": "ListItem", position: creator ? 3 : 2, name: post.title, item: url2 }
      ]
    };
    return {
      meta,
      links: [{ rel: "canonical", href: url2 }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(mediaSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbs) }
      ]
    };
  },
  component: PostPage
});
function PostPage() {
  const { id } = Route$5.useParams();
  const search = Route$5.useSearch();
  const like = toggleLike;
  const removePost = deletePost;
  const siblingsFn = getCreatorPostIds;
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [showComments, setShowComments] = reactExports.useState(false);
  const [regenBusy, setRegenBusy] = reactExports.useState(false);
  const { data } = useSuspenseQuery(postQueryOptions(id));
  if (!data.post) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-dvh place-items-center text-sm text-muted-foreground", children: "Post not found." }) });
  const p = data.post;
  const mediaUrl = resolveStorageUrl(p.media_url);
  const coverUrl = resolveStorageUrl(p.cover_url);
  const isOwner = !!user && user.id === p.creator_id;
  const justPosted = search.new === 1 && isOwner;
  const regenCount = search.regen ?? 0;
  const regensLeft = Math.max(0, 2 - regenCount);
  const { data: siblings } = useSuspenseQuery({
    queryKey: ["creator-post-ids", p.creator_id],
    queryFn: () => siblingsFn({ data: { creatorId: p.creator_id } })
  });
  const ids = siblings?.ids ?? [];
  const idx = ids.indexOf(p.id);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null;
  const regenerate = async () => {
    if (regensLeft <= 0) return;
    if (!confirm("Delete this post and start over?")) return;
    setRegenBusy(true);
    try {
      await removePost({ data: { id: p.id } });
      navigate({ to: "/upload", search: { regen: regenCount + 1 } });
    } catch (e) {
      toast.error(e.message);
      setRegenBusy(false);
    }
  };
  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };
  const share = async () => {
    const url2 = window.location.href;
    if (navigator.share) await navigator.share({ title: p.title, text: p.description ?? void 0, url: url2 }).catch(() => {
    });
    else {
      await navigator.clipboard.writeText(url2);
      toast.success("Link copied");
    }
  };
  const doLike = async () => {
    if (!user) return navigate({ to: "/login" });
    try {
      await like({ data: { postId: p.id } });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[70dvh] w-full overflow-hidden bg-black", onClick: p.type === "audio" ? togglePlay : void 0, children: p.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: mediaUrl, poster: coverUrl || void 0, controls: true, playsInline: true, className: "h-full w-full object-contain bg-black" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: mediaUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AudioVisualizer, { audio: audioRef.current, playing, coverUrl: coverUrl || p.cover_url })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5", children: [
      justPosted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-lg border border-gold/40 bg-gradient-to-br from-card/80 to-card/40 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " Posted! Preview it above."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "Happy with it? Send it to the feed. Or tweak the details, or start over." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate({ to: "/" }),
              className: "inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_18px_-6px_var(--gold)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" }),
                " Continue to feed"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate({ to: "/upload" }),
              className: "inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                " Back to edit"
              ]
            }
          ),
          p.type !== "video" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: regenerate,
              disabled: regenBusy || regensLeft <= 0,
              title: regensLeft <= 0 ? "No regenerations left" : `${regensLeft} regeneration${regensLeft === 1 ? "" : "s"} left`,
              className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-foreground hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3.5 w-3.5 ${regenBusy ? "animate-spin" : ""}` }),
                " ",
                regenBusy ? "Removing…" : regensLeft <= 0 ? "No regens left" : `Regenerate (${regensLeft} left)`
              ]
            }
          )
        ] }),
        p.type !== "video" && regensLeft <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-muted-foreground", children: "You've used all 2 regenerations for this attempt. Continue to feed or edit instead." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl tracking-tight", children: p.title }),
      data.creator && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/u/$handle", params: { handle: data.creator.handle }, className: "mt-1 inline-block text-sm text-gold", children: [
        "@",
        data.creator.handle
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => prevId && navigate({ to: "/p/$id", params: { id: prevId } }),
            disabled: !prevId,
            className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
              " Newer"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
          idx + 1,
          " / ",
          ids.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => nextId && navigate({ to: "/p/$id", params: { id: nextId } }),
            disabled: !nextId,
            className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed",
            children: [
              "Older ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSheet, { postId: showComments ? p.id : null, open: showComments, onClose: () => setShowComments(false) })
  ] });
}
const Route$4 = createFileRoute("/checkout/return")({
  validateSearch: (search) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : void 0
  }),
  head: () => ({
    meta: [
      { title: "Payment complete — AlgoRhythm" },
      { name: "robots", content: "noindex" }
    ]
  }),
  component: ReturnPage
});
function ReturnPage() {
  const { session_id } = Route$4.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-gold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-semibold", children: "Thanks for supporting AlgoRhythm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: session_id ? "Your payment is being confirmed." : "Welcome back." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-gradient-gold px-5 py-2 text-sm text-primary-foreground", children: "Back to feed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/me", className: "rounded-full border border-border px-5 py-2 text-sm", children: "My profile" })
    ] })
  ] }) });
}
function pickAudioMime(mime, name) {
  const m = mime.toLowerCase();
  if (m.includes("mpeg") || m.includes("mp3") || /\.mp3$/i.test(name)) return "audio/mpeg";
  if (m.includes("wav") || /\.wav$/i.test(name)) return "audio/wav";
  if (m.includes("ogg") || /\.ogg$/i.test(name)) return "audio/ogg";
  if (m.includes("flac") || /\.flac$/i.test(name)) return "audio/flac";
  if (m.includes("aac") || /\.aac$/i.test(name)) return "audio/aac";
  if (m.includes("webm") || /\.webm$/i.test(name)) return "audio/webm";
  if (m.includes("mp4") || m.includes("m4a") || /\.(m4a|mp4)$/i.test(name)) return "audio/mp4";
  return mime || "audio/mpeg";
}
function toBase64(bytes) {
  let bin = "";
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
function distributeEvenly(text, duration) {
  const lines = text.split(/\r?\n+/).map((s) => s.trim()).filter((s) => s.length > 0 && !/^\[.*\]$/.test(s));
  if (lines.length === 0) return [];
  const per = duration / lines.length;
  return lines.map((text2, i) => ({ start: i * per, end: (i + 1) * per, text: text2 }));
}
const Route$3 = createFileRoute("/api/transcribe-lyrics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
          return new Response(JSON.stringify({ error: "Auth not configured" }), { status: 500 });
        }
        const sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false, storage: void 0 }
        });
        const { data: claims, error: claimsErr } = await sb.auth.getClaims(token);
        if (claimsErr || !claims?.claims?.sub) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const userId = claims.claims.sub;
        const email = typeof claims.claims.email === "string" ? claims.claims.email : null;
        if (!await userIsPro(userId, email)) {
          return new Response(
            JSON.stringify({ error: "AI lyric transcription is a Pro feature. Upgrade to Pro to unlock it." }),
            { status: 402 }
          );
        }
        const form = await request.formData();
        const file = form.get("audio");
        const durationRaw = form.get("duration");
        const duration = typeof durationRaw === "string" ? parseFloat(durationRaw) : 0;
        if (!(file instanceof File)) {
          return new Response(JSON.stringify({ error: "missing audio file" }), { status: 400 });
        }
        if (file.size > 20 * 1024 * 1024) {
          return new Response(JSON.stringify({ error: "Audio too large for transcription (max 20MB)" }), { status: 400 });
        }
        const buf = new Uint8Array(await file.arrayBuffer());
        const b64 = toBase64(buf);
        const mimeType = pickAudioMime(file.type || "", file.name || "");
        const prompt = `Transcribe the vocals of this song into lyric lines with timing. Return ONLY valid JSON of the shape {"lines":[{"start":<seconds>,"end":<seconds>,"text":"<one lyric line>"}]} with no markdown. Keep each line short (3-10 words). If the song is instrumental or you cannot make out lyrics, return {"lines":[]}.`;
        try {
          const content = await geminiTranscribeAudio({ prompt, mimeType, base64: b64 });
          let parsed;
          try {
            parsed = JSON.parse(content);
          } catch {
            const match = content.match(/\{[\s\S]*\}/);
            parsed = match ? JSON.parse(match[0]) : {};
          }
          let lines = [];
          if (Array.isArray(parsed.lines)) {
            lines = parsed.lines.map((l) => ({
              start: Number(l.start ?? 0),
              end: Number(l.end ?? 0),
              text: String(l.text ?? "").trim()
            })).filter((l) => l.text.length > 0 && Number.isFinite(l.start) && Number.isFinite(l.end));
          }
          if (lines.length === 0 && duration > 0 && content.trim()) {
            lines = distributeEvenly(content, duration);
          }
          lines.sort((a, b) => a.start - b.start);
          if (duration > 0) {
            lines = lines.map((l) => ({
              ...l,
              start: Math.max(0, Math.min(duration, l.start)),
              end: Math.max(0, Math.min(duration, l.end || l.start + 3))
            }));
          }
          return Response.json({ lines });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Transcription failed";
          return new Response(JSON.stringify({ error: msg }), { status: 502 });
        }
      }
    }
  }
});
const BUCKETS = ["avatars", "media", "covers"];
async function restoreAlgoRhythmPlayback() {
  const created = [];
  const existing = [];
  for (const id of BUCKETS) {
    const { data: bucket } = await supabaseAdmin.storage.getBucket(id);
    if (bucket) {
      existing.push(id);
      continue;
    }
    const { error } = await supabaseAdmin.storage.createBucket(id, { public: true });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(`Bucket ${id}: ${error.message}`);
    }
    created.push(id);
  }
  const { count: publishedBefore } = await supabaseAdmin.from("posts").select("id", { count: "exact", head: true }).eq("is_published", true);
  const { error: hideErr } = await supabaseAdmin.from("posts").update({ is_published: false }).eq("is_published", true);
  if (hideErr) throw new Error(hideErr.message);
  const { count: publishedAfter } = await supabaseAdmin.from("posts").select("id", { count: "exact", head: true }).eq("is_published", true);
  return {
    buckets: { created, existing },
    publishedBefore: publishedBefore ?? 0,
    publishedAfter: publishedAfter ?? 0,
    note: "Storage policies still require restore-playback.sql if uploads fail. Re-upload tracks/videos to repopulate the feed."
  };
}
const Route$2 = createFileRoute("/api/admin/restore-media")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.MEDIA_RESTORE_SECRET;
        if (!secret) {
          return new Response(JSON.stringify({ error: "MEDIA_RESTORE_SECRET not configured" }), {
            status: 503,
            headers: { "Content-Type": "application/json" }
          });
        }
        let body = {};
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        if (body.secret !== secret) {
          return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
          });
        }
        try {
          const result = await restoreAlgoRhythmPlayback();
          return new Response(JSON.stringify({ ok: true, ...result }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (e) {
          console.error("restore-media failed:", e);
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Restore failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
const MAX_RETRIES = 5;
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_SEND_DELAY_MS = 200;
const DEFAULT_AUTH_TTL_MINUTES = 15;
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60;
function isRateLimited(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 429;
  }
  return error instanceof Error && error.message.includes("429");
}
function isForbidden(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 403;
  }
  return error instanceof Error && error.message.includes("403");
}
function getRetryAfterSeconds(error) {
  if (error && typeof error === "object" && "retryAfterSeconds" in error) {
    return error.retryAfterSeconds ?? 60;
  }
  return 60;
}
async function moveToDlq(supabase2, queue, msg, reason) {
  const payload = msg.message;
  await supabase2.from("email_send_log").insert({
    message_id: payload.message_id,
    template_name: payload.label || queue,
    recipient_email: payload.to,
    status: "dlq",
    error_message: reason
  });
  const { error } = await supabase2.rpc("move_to_dlq", {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload
  });
  if (error) {
    console.error("Failed to move message to DLQ", { queue, msg_id: msg.msg_id, reason, error });
  }
}
const Route$1 = createFileRoute("/lovable/email/queue/process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        const supabaseUrl = "https://tmpdjywsnwzivetqludd.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        if (token !== supabaseServiceKey) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const { data: state } = await supabase2.from("email_send_state").select("retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes").single();
        if (state?.retry_after_until && new Date(state.retry_after_until) > /* @__PURE__ */ new Date()) {
          return Response.json({ skipped: true, reason: "rate_limited" });
        }
        const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE;
        const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS;
        const ttlMinutes = {
          auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
          transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES
        };
        let totalProcessed = 0;
        for (const queue of ["auth_emails", "transactional_emails"]) {
          const { data: messages, error: readError } = await supabase2.rpc("read_email_batch", {
            queue_name: queue,
            batch_size: batchSize,
            vt: 30
          });
          if (readError) {
            console.error("Failed to read email batch", { queue, error: readError });
            continue;
          }
          if (!messages?.length) continue;
          const messageIds = Array.from(
            new Set(
              messages.map(
                (msg) => msg?.message?.message_id && typeof msg.message.message_id === "string" ? msg.message.message_id : null
              ).filter((id) => Boolean(id))
            )
          );
          const failedAttemptsByMessageId = /* @__PURE__ */ new Map();
          if (messageIds.length > 0) {
            const { data: failedRows, error: failedRowsError } = await supabase2.from("email_send_log").select("message_id").in("message_id", messageIds).eq("status", "failed");
            if (failedRowsError) {
              console.error("Failed to load failed-attempt counters", {
                queue,
                error: failedRowsError
              });
            } else {
              for (const row of failedRows ?? []) {
                const messageId = row?.message_id;
                if (typeof messageId !== "string" || !messageId) continue;
                failedAttemptsByMessageId.set(
                  messageId,
                  (failedAttemptsByMessageId.get(messageId) ?? 0) + 1
                );
              }
            }
          }
          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const payload = msg.message;
            const failedAttempts = payload?.message_id && typeof payload.message_id === "string" ? failedAttemptsByMessageId.get(payload.message_id) ?? 0 : msg.read_ct ?? 0;
            const queuedAt = payload.queued_at ?? msg.enqueued_at;
            if (queuedAt) {
              const ageMs = Date.now() - new Date(queuedAt).getTime();
              const maxAgeMs = ttlMinutes[queue] * 60 * 1e3;
              if (ageMs > maxAgeMs) {
                console.warn("Email expired (TTL exceeded)", {
                  queue,
                  msg_id: msg.msg_id,
                  queued_at: queuedAt,
                  ttl_minutes: ttlMinutes[queue]
                });
                await moveToDlq(supabase2, queue, msg, `TTL exceeded (${ttlMinutes[queue]} minutes)`);
                continue;
              }
            }
            if (failedAttempts >= MAX_RETRIES) {
              await moveToDlq(supabase2, queue, msg, `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`);
              continue;
            }
            if (payload.message_id) {
              const { data: alreadySent } = await supabase2.from("email_send_log").select("id").eq("message_id", payload.message_id).eq("status", "sent").maybeSingle();
              if (alreadySent) {
                console.warn("Skipping duplicate send (already sent)", {
                  queue,
                  msg_id: msg.msg_id,
                  message_id: payload.message_id
                });
                const { error: dupDelError } = await supabase2.rpc("delete_email", {
                  queue_name: queue,
                  message_id: msg.msg_id
                });
                if (dupDelError) {
                  console.error("Failed to delete duplicate message from queue", { queue, msg_id: msg.msg_id, error: dupDelError });
                }
                continue;
              }
            }
            try {
              await sendLovableEmail(
                {
                  run_id: payload.run_id,
                  to: payload.to,
                  from: payload.from,
                  sender_domain: payload.sender_domain,
                  subject: payload.subject,
                  html: payload.html,
                  text: payload.text,
                  purpose: payload.purpose,
                  label: payload.label,
                  idempotency_key: payload.idempotency_key,
                  unsubscribe_token: payload.unsubscribe_token,
                  message_id: payload.message_id
                },
                { apiKey, sendUrl: process.env.LOVABLE_SEND_URL }
              );
              await supabase2.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "sent"
              });
              const { error: delError } = await supabase2.rpc("delete_email", {
                queue_name: queue,
                message_id: msg.msg_id
              });
              if (delError) {
                console.error("Failed to delete sent message from queue", { queue, msg_id: msg.msg_id, error: delError });
              }
              totalProcessed++;
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              console.error("Email send failed", {
                queue,
                msg_id: msg.msg_id,
                read_ct: msg.read_ct,
                failed_attempts: failedAttempts,
                error: errorMsg
              });
              if (isRateLimited(error)) {
                await supabase2.from("email_send_log").insert({
                  message_id: payload.message_id,
                  template_name: payload.label || queue,
                  recipient_email: payload.to,
                  status: "failed",
                  error_message: errorMsg.slice(0, 1e3)
                });
                const retryAfterSecs = getRetryAfterSeconds(error);
                await supabase2.from("email_send_state").update({
                  retry_after_until: new Date(
                    Date.now() + retryAfterSecs * 1e3
                  ).toISOString(),
                  updated_at: (/* @__PURE__ */ new Date()).toISOString()
                }).eq("id", 1);
                return Response.json({ processed: totalProcessed, stopped: "rate_limited" });
              }
              if (isForbidden(error)) {
                await moveToDlq(supabase2, queue, msg, errorMsg.slice(0, 1e3));
                return Response.json({ processed: totalProcessed, stopped: "forbidden" });
              }
              await supabase2.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "failed",
                error_message: errorMsg.slice(0, 1e3)
              });
              if (payload?.message_id && typeof payload.message_id === "string") {
                failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1);
              }
            }
            if (i < messages.length - 1) {
              await new Promise((r) => setTimeout(r, sendDelayMs));
            }
          }
        }
        return Response.json({ processed: totalProcessed });
      }
    }
  }
});
const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url2 = new URL(request.url);
        const envParam = url2.searchParams.get("env");
        if (envParam !== "sandbox" && envParam !== "live") {
          return new Response("Invalid env", { status: 400 });
        }
        const env = envParam;
        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("Missing signature", { status: 400 });
        const body = await request.text();
        const stripe = createStripeClient(env);
        const secret = getWebhookSecret(env);
        let event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, secret);
        } catch (err) {
          console.error("Webhook signature failed", err);
          return new Response("Invalid signature", { status: 401 });
        }
        const { error: dupError } = await supabaseAdmin.from("processed_stripe_events").insert({ event_id: event.id, type: event.type, environment: env });
        if (dupError) {
          if (dupError.code === "23505") {
            return new Response("ok", { status: 200 });
          }
          console.error("event log insert failed", dupError);
        }
        try {
          await handleEvent(event, env, stripe);
        } catch (err) {
          console.error("Webhook handler error", err);
          return new Response("Handler error", { status: 500 });
        }
        return new Response("ok", { status: 200 });
      }
    }
  }
});
async function handleEvent(event, env, stripe) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const kind = session.metadata?.kind;
      if (kind === "tip") await recordTip(session, env);
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await upsertSubscription(sub, env);
      break;
    }
    case "account.updated": {
      const account = event.data.object;
      await upsertConnectAccount(account, env);
      break;
    }
  }
}
async function upsertConnectAccount(account, env) {
  const userId = account.metadata?.userId;
  if (!userId) return;
  await supabaseAdmin.from("connected_accounts").upsert(
    {
      user_id: userId,
      environment: env,
      stripe_account_id: account.id,
      charges_enabled: account.charges_enabled ?? false,
      payouts_enabled: account.payouts_enabled ?? false,
      details_submitted: account.details_submitted ?? false,
      country: account.country ?? null,
      default_currency: account.default_currency ?? null,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    { onConflict: "user_id,environment" }
  );
}
async function recordTip(session, env) {
  const md = session.metadata ?? {};
  const fromUser = md.userId;
  const toUser = md.creatorId;
  const amount = Number(md.amountCents ?? session.amount_total ?? 0);
  const fee = Number(md.feeCents ?? 0);
  const net = Number(md.netCents ?? amount - fee);
  const postId = md.postId || null;
  if (!fromUser || !toUser || !amount) return;
  const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
  await supabaseAdmin.from("tips").upsert(
    {
      from_user: fromUser,
      to_user: toUser,
      post_id: postId,
      amount_cents: amount,
      currency: session.currency ?? "usd",
      status: "succeeded",
      environment: env,
      platform_fee_cents: fee,
      creator_net_cents: net,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId
    },
    { onConflict: "stripe_checkout_session_id" }
  );
}
async function upsertSubscription(sub, env) {
  const md = sub.metadata ?? {};
  const userId = md.userId;
  const kind = md.kind === "creator" ? "creator" : "pro";
  const creatorId = md.creatorId || null;
  if (!userId) return;
  const item = sub.items.data[0];
  const priceLookupKey = item?.price?.lookup_key ?? item?.price?.id ?? "";
  const periodEndUnix = item?.current_period_end ?? sub.current_period_end ?? null;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      kind,
      creator_id: creatorId,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      price_id: priceLookupKey,
      status: sub.status,
      current_period_end: periodEndUnix ? new Date(periodEndUnix * 1e3).toISOString() : null,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      environment: env
    },
    { onConflict: "stripe_subscription_id" }
  );
}
const WelcomeRoute = Route$o.update({
  id: "/welcome",
  path: "/welcome",
  getParentRoute: () => Route$p
});
const UploadRoute = Route$n.update({
  id: "/upload",
  path: "/upload",
  getParentRoute: () => Route$p
});
const TermsRoute = Route$m.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$p
});
const SitemapDotxmlRoute = Route$l.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$p
});
const SignupRoute = Route$k.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$p
});
const RefundsRoute = Route$j.update({
  id: "/refunds",
  path: "/refunds",
  getParentRoute: () => Route$p
});
const PrivacyRoute = Route$i.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$p
});
const PricingRoute = Route$h.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$p
});
const PayoutsRoute = Route$g.update({
  id: "/payouts",
  path: "/payouts",
  getParentRoute: () => Route$p
});
const MeRoute = Route$f.update({
  id: "/me",
  path: "/me",
  getParentRoute: () => Route$p
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$p
});
const GuidelinesRoute = Route$d.update({
  id: "/guidelines",
  path: "/guidelines",
  getParentRoute: () => Route$p
});
const DmcaRoute = Route$c.update({
  id: "/dmca",
  path: "/dmca",
  getParentRoute: () => Route$p
});
const DiscoverRoute = Route$b.update({
  id: "/discover",
  path: "/discover",
  getParentRoute: () => Route$p
});
const ContactRoute = Route$a.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$p
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$p
});
const AccountDeletionRoute = Route$8.update({
  id: "/account-deletion",
  path: "/account-deletion",
  getParentRoute: () => Route$p
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$p
});
const UHandleRoute = Route$6.update({
  id: "/u/$handle",
  path: "/u/$handle",
  getParentRoute: () => Route$p
});
const PIdRoute = Route$5.update({
  id: "/p/$id",
  path: "/p/$id",
  getParentRoute: () => Route$p
});
const CheckoutReturnRoute = Route$4.update({
  id: "/checkout/return",
  path: "/checkout/return",
  getParentRoute: () => Route$p
});
const ApiTranscribeLyricsRoute = Route$3.update({
  id: "/api/transcribe-lyrics",
  path: "/api/transcribe-lyrics",
  getParentRoute: () => Route$p
});
const ApiAdminRestoreMediaRoute = Route$2.update({
  id: "/api/admin/restore-media",
  path: "/api/admin/restore-media",
  getParentRoute: () => Route$p
});
const LovableEmailQueueProcessRoute = Route$1.update({
  id: "/lovable/email/queue/process",
  path: "/lovable/email/queue/process",
  getParentRoute: () => Route$p
});
const ApiPublicPaymentsWebhookRoute = Route.update({
  id: "/api/public/payments/webhook",
  path: "/api/public/payments/webhook",
  getParentRoute: () => Route$p
});
const rootRouteChildren = {
  IndexRoute,
  AccountDeletionRoute,
  AdminRoute,
  ContactRoute,
  DiscoverRoute,
  DmcaRoute,
  GuidelinesRoute,
  LoginRoute,
  MeRoute,
  PayoutsRoute,
  PricingRoute,
  PrivacyRoute,
  RefundsRoute,
  SignupRoute,
  SitemapDotxmlRoute,
  TermsRoute,
  UploadRoute,
  WelcomeRoute,
  ApiTranscribeLyricsRoute,
  CheckoutReturnRoute,
  PIdRoute,
  UHandleRoute,
  ApiAdminRestoreMediaRoute,
  ApiPublicPaymentsWebhookRoute,
  LovableEmailQueueProcessRoute
};
const routeTree = Route$p._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
