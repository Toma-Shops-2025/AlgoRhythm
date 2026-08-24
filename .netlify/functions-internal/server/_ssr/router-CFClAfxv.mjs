import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { u as userIsPro, b as geminiTranscribeAudio } from "./gemini.server-Blu19axI.mjs";
import { s as sendLovableEmail } from "../_libs/lovable.dev__email-js.mjs";
import { c as createStripeClient, a as getWebhookSecret } from "./stripe.server-B9htgGZ_.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/stripe.mjs";
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
function toastErrorMessage(err, fallback = "Something went wrong") {
  const raw = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  if (!raw) return fallback;
  const lower = raw.toLowerCase();
  if (lower.includes("<!doctype") || lower.includes("<html") || lower.includes("inactivity timeout") || lower.includes("without sending any data")) {
    return "AI timed out — try again in a moment";
  }
  const cleaned = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 180) || fallback;
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
const appCss = "/assets/styles-CwudzGy_.css";
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
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
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
const Route$r = createRootRouteWithContext()({
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
  const { queryClient } = Route$r.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthListener, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, theme: "dark", position: "top-center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fixed bottom-2 right-2 text-[8px] opacity-10 uppercase font-black z-[9999] pointer-events-none", children: "Build v2.1.8-master" })
  ] }) });
}
function AuthListener() {
  const router2 = useRouter();
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      router2.invalidate();
      qc.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router2, qc]);
  return null;
}
const $$splitComponentImporter$l = () => import("./welcome-DfbfGkCA.mjs");
const Route$q = createFileRoute("/welcome")({
  head: () => ({
    meta: [{
      property: "og:url",
      content: "https://myalgorhythm.online/welcome"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/welcome"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./upload-DIfXJi5D.mjs");
const Route$p = createFileRoute("/upload")({
  validateSearch: (search) => {
    const r = Number(search.regen);
    const regen = Number.isFinite(r) ? Math.min(Math.max(Math.trunc(r), 0), 2) : 0;
    return {
      regen: regen || void 0
    };
  },
  head: () => ({
    meta: [{
      title: "Post — AlgoRhythm"
    }, {
      name: "description",
      content: "Upload your AI-made track or music video to the AlgoRhythm feed."
    }, {
      property: "og:title",
      content: "Post to AlgoRhythm"
    }, {
      property: "og:description",
      content: "Publish your AI music or video to the AlgoRhythm feed."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/upload"
    }, {
      name: "robots",
      content: "noindex"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/upload"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./terms-CC05tzhI.mjs");
const Route$o = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service — AlgoRhythm"
    }, {
      name: "description",
      content: "The rules for using AlgoRhythm — accounts, content, payments, and AI-generated media."
    }, {
      property: "og:title",
      content: "Terms of Service — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Rules for using AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/terms"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/terms"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const BASE_URL = "https://myalgorhythm.online";
const Route$n = createFileRoute("/sitemap.xml")({
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
const $$splitComponentImporter$i = () => import("./signup-B4kwtnbA.mjs");
const Route$m = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create your profile — AlgoRhythm"
    }, {
      name: "description",
      content: "Create your AlgoRhythm profile and start posting AI-made music and videos to a viral vertical feed."
    }, {
      property: "og:title",
      content: "Create your profile — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Join AlgoRhythm — the home for AI music creators."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/signup"
    }, {
      name: "robots",
      content: "noindex"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/signup"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./refunds-DQ1EDCEO.mjs");
const Route$l = createFileRoute("/refunds")({
  head: () => ({
    meta: [{
      title: "Refund Policy — AlgoRhythm"
    }, {
      name: "description",
      content: "Refund and cancellation policy for AlgoRhythm Pro subscriptions, creator subscriptions, and tips."
    }, {
      property: "og:title",
      content: "Refund Policy — AlgoRhythm"
    }, {
      property: "og:description",
      content: "How refunds and cancellations work on AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/refunds"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/refunds"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./privacy-B-thNs4r.mjs");
const Route$k = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy — AlgoRhythm"
    }, {
      name: "description",
      content: "How AlgoRhythm collects, uses, and protects your data."
    }, {
      property: "og:title",
      content: "Privacy Policy — AlgoRhythm"
    }, {
      property: "og:description",
      content: "How AlgoRhythm collects, uses, and protects your data."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/privacy"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/privacy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./pricing-CLvUhm24.mjs");
const Route$j = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "AlgoRhythm Pro — Pricing"
    }, {
      name: "description",
      content: "Go Pro on AlgoRhythm for ad-free listening, higher quality, and exclusive feeds."
    }, {
      property: "og:title",
      content: "AlgoRhythm Pro"
    }, {
      property: "og:description",
      content: "$6.99/mo or $29.99/yr — support the platform and unlock Pro."
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/pricing"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./payouts-Bz4qqfPl.mjs");
const Route$i = createFileRoute("/payouts")({
  head: () => ({
    meta: [{
      title: "Creator Payouts & Fees — AlgoRhythm"
    }, {
      name: "description",
      content: "How creators earn on AlgoRhythm — platform fee, payout schedule, eligibility, and tax responsibilities."
    }, {
      property: "og:title",
      content: "Creator Payouts — AlgoRhythm"
    }, {
      property: "og:description",
      content: "How creators get paid on AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/payouts"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/payouts"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./me-D7-9Q8uU.mjs");
const Route$h = createFileRoute("/me")({
  head: () => ({
    meta: [{
      title: "Your profile — AlgoRhythm"
    }, {
      name: "description",
      content: "Manage your AlgoRhythm creator profile, posts, and account."
    }, {
      property: "og:title",
      content: "Your profile — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Manage your creator profile on AlgoRhythm."
    }, {
      property: "og:type",
      content: "profile"
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/me"
    }, {
      name: "robots",
      content: "noindex"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/me"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./login-ODtepfc_.mjs");
const Route$g = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — AlgoRhythm"
    }, {
      name: "description",
      content: "Sign in to AlgoRhythm to like, comment, follow, and post AI music and videos."
    }, {
      property: "og:title",
      content: "Sign in — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Sign in to your AlgoRhythm account."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/login"
    }, {
      name: "robots",
      content: "noindex"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/login"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./guidelines-GIJ9G39N.mjs");
const Route$f = createFileRoute("/guidelines")({
  head: () => ({
    meta: [{
      title: "Community Guidelines — AlgoRhythm"
    }, {
      name: "description",
      content: "The rules of the road for AlgoRhythm — what's allowed, what isn't, and how we keep the platform safe."
    }, {
      property: "og:title",
      content: "Community Guidelines — AlgoRhythm"
    }, {
      property: "og:description",
      content: "What's allowed and what isn't on AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/guidelines"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/guidelines"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./dmca-CV-fplk5.mjs");
const Route$e = createFileRoute("/dmca")({
  head: () => ({
    meta: [{
      title: "DMCA & Content Policy — AlgoRhythm"
    }, {
      name: "description",
      content: "How to report copyright infringement or other policy violations on AlgoRhythm."
    }, {
      property: "og:title",
      content: "DMCA & Content Policy — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Report copyright infringement on AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/dmca"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/dmca"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./discover-B27pKbjY.mjs");
const Route$d = createFileRoute("/discover")({
  head: () => ({
    meta: [{
      title: "Discover — AlgoRhythm"
    }, {
      name: "description",
      content: "Discover trending AI-made tracks, music videos, and creators on AlgoRhythm."
    }, {
      property: "og:title",
      content: "Discover — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Trending AI music and creators on AlgoRhythm."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/discover"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/discover"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./contact-R7twt1hu.mjs");
const Route$c = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact & Support — AlgoRhythm"
    }, {
      name: "description",
      content: "Get in touch with AlgoRhythm support, report abuse, or send a copyright notice."
    }, {
      property: "og:title",
      content: "Contact & Support — AlgoRhythm"
    }, {
      property: "og:description",
      content: "Contact AlgoRhythm support."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/contact"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin-DoVxDpZI.mjs");
const Route$b = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — AlgoRhythm"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./account-deletion-D_Mgpoih.mjs");
const Route$a = createFileRoute("/account-deletion")({
  head: () => ({
    meta: [{
      title: "Delete your AlgoRhythm account"
    }, {
      name: "description",
      content: "Instructions for permanently deleting your AlgoRhythm account and all associated data."
    }, {
      property: "og:title",
      content: "Delete your AlgoRhythm account"
    }, {
      property: "og:description",
      content: "How to permanently delete your AlgoRhythm account."
    }, {
      property: "og:url",
      content: "https://myalgorhythm.online/account-deletion"
    }],
    links: [{
      rel: "canonical",
      href: "https://myalgorhythm.online/account-deletion"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-By0FXdrv.mjs");
const Route$9 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const getFeed = createServerFn({
  method: "GET"
}).inputValidator((input) => input ?? {}).handler(createSsrRpc("fc0d7715fd0d19256893ad23ee2ce5fd4981e6aaabceb7937ebe325914a8c0c2"));
const getPostById = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("e669ae5258d9ab70a42161b03d793c032c1cffe9208ba2dc3df32984a384679b"));
const getProfileByHandle = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("d50679e7c231d9c02881ff5cf06fa337ba85f8cd50ff87380bdac24c20e60222"));
const getCreatorPostIds = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("9bf00170f6272183f9f478915e9d90be15a69863c4e64d1696854edb80fda2bb"));
const searchAll = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("fb44eec9f4f73c49a4f725bedb9be34921e773376a64025294fd06511c3b7e2c"));
const profileQueryOptions = (handle) => queryOptions({
  queryKey: ["profile", handle],
  queryFn: () => getProfileByHandle({
    data: {
      handle
    }
  })
});
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
const $$splitComponentImporter$4 = () => import("./u._handle-LMYhVpao.mjs");
const Route$8 = createFileRoute("/u/$handle")({
  loader: ({
    context,
    params
  }) => context.queryClient.ensureQueryData(profileQueryOptions(params.handle)),
  head: ({
    params,
    loaderData
  }) => {
    const url = `${SITE_URL}/u/${params.handle}`;
    const profile = loaderData?.profile;
    if (!profile) return {
      meta: [{
        title: `Profile not found — ${SITE_NAME}`
      }]
    };
    const displayName = profile.display_name ?? params.handle;
    const title = buildProfileTitle(displayName, profile.handle);
    const description = buildProfileDescription({
      displayName,
      handle: profile.handle,
      bio: profile.bio,
      postCount: profile.post_count
    });
    const image = profile.avatar_url ? absUrl(profile.avatar_url) : null;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:type",
        "content": "profile"
      }, {
        property: "og:url",
        content: url
      }, ...image ? [{
        property: "og:image",
        content: image
      }] : [], {
        name: "twitter:card",
        content: image ? "summary_large_image" : "summary"
      }],
      links: [{
        rel: "canonical",
        href: url
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const postQueryOptions = (id) => queryOptions({
  queryKey: ["post", id],
  queryFn: () => getPostById({
    data: {
      id
    }
  })
});
const $$splitComponentImporter$3 = () => import("./p._id-CjFfi6UG.mjs");
const Route$7 = createFileRoute("/p/$id")({
  validateSearch: (search) => {
    const regenRaw = Number(search.regen);
    const regen = Number.isFinite(regenRaw) ? Math.min(Math.max(Math.trunc(regenRaw), 0), 2) : 0;
    return {
      new: search.new === "1" || search.new === 1 ? 1 : void 0,
      regen: regen || void 0
    };
  },
  loader: ({
    context,
    params
  }) => context.queryClient.ensureQueryData(postQueryOptions(params.id)),
  head: ({
    params,
    loaderData
  }) => {
    const url = `${SITE_URL}/p/${params.id}`;
    const post = loaderData?.post;
    const creator = loaderData?.creator;
    if (!post) {
      return {
        meta: [{
          title: `Post not found — ${SITE_NAME}`
        }, {
          name: "description",
          content: `This post is no longer available on ${SITE_NAME}.`
        }, {
          name: "robots",
          content: "noindex"
        }, {
          property: "og:url",
          content: url
        }],
        links: [{
          rel: "canonical",
          href: url
        }]
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
    const meta = [{
      title
    }, {
      name: "description",
      content: description
    }, {
      name: "keywords",
      content: keywords
    }, {
      property: "og:title",
      content: title
    }, {
      property: "og:description",
      content: description
    }, {
      property: "og:url",
      content: url
    }, {
      property: "og:type",
      content: ogType
    }, {
      property: "og:site_name",
      content: SITE_NAME
    }, {
      name: "twitter:title",
      content: title
    }, {
      name: "twitter:description",
      content: description
    }, {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary"
    }];
    if (image) {
      meta.push({
        property: "og:image",
        content: image
      });
      meta.push({
        property: "og:image:alt",
        content: post.title
      });
      meta.push({
        name: "twitter:image",
        content: image
      });
    }
    if (isVideo) {
      meta.push({
        property: "og:video",
        content: absUrl(post.media_url)
      });
      meta.push({
        property: "og:video:type",
        content: "video/mp4"
      });
    } else {
      meta.push({
        property: "og:audio",
        content: absUrl(post.media_url)
      });
      meta.push({
        property: "og:audio:type",
        content: "audio/mpeg"
      });
      if (creator?.display_name) meta.push({
        property: "music:musician",
        content: creator.display_name
      });
    }
    if (creator?.handle) meta.push({
      name: "author",
      content: `@${creator.handle}`
    });
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
      url,
      ...image ? {
        thumbnailUrl: image,
        image
      } : {},
      contentUrl: absUrl(post.media_url),
      uploadDate: post.created_at,
      ...post.duration_seconds ? {
        duration: `PT${Math.round(post.duration_seconds)}S`
      } : {},
      ...post.tags?.length ? {
        genre: post.tags,
        keywords: post.tags.join(", ")
      } : {},
      ...creatorPerson ? {
        creator: creatorPerson,
        author: creatorPerson
      } : {},
      interactionStatistic: [{
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: post.like_count ?? 0
      }, {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: post.comment_count ?? 0
      }, {
        "@type": "InteractionCounter",
        interactionType: isVideo ? "https://schema.org/WatchAction" : "https://schema.org/ListenAction",
        userInteractionCount: post.view_count ?? 0
      }]
    };
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      }, ...creator ? [{
        "@type": "ListItem",
        position: 2,
        name: `@${creator.handle}`,
        item: `${SITE_URL}/u/${creator.handle}`
      }] : [], {
        "@type": "ListItem",
        position: creator ? 3 : 2,
        name: post.title,
        item: url
      }]
    };
    return {
      meta,
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(mediaSchema)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbs)
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./checkout.return-BBaitCGP.mjs");
const Route$6 = createFileRoute("/checkout/return")({
  validateSearch: (search) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : void 0
  }),
  head: () => ({
    meta: [{
      title: "Payment complete — AlgoRhythm"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./block._userId-D81ErV1f.mjs");
const Route$5 = createFileRoute("/block/$userId")({
  validateSearch: (search) => ({
    handle: typeof search.handle === "string" ? search.handle : void 0
  }),
  head: () => ({
    meta: [{
      title: "Block creator — AlgoRhythm"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
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
const Route$4 = createFileRoute("/api/transcribe-lyrics")({
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
const $$splitComponentImporter = () => import("./report.user._userId-CG-o7Yrl.mjs");
const Route$3 = createFileRoute("/report/user/$userId")({
  validateSearch: (search) => ({
    handle: typeof search.handle === "string" ? search.handle : void 0
  }),
  head: () => ({
    meta: [{
      title: "Report creator — AlgoRhythm"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
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
        const url = new URL(request.url);
        const envParam = url.searchParams.get("env");
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
const WelcomeRoute = Route$q.update({
  id: "/welcome",
  path: "/welcome",
  getParentRoute: () => Route$r
});
const UploadRoute = Route$p.update({
  id: "/upload",
  path: "/upload",
  getParentRoute: () => Route$r
});
const TermsRoute = Route$o.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$r
});
const SitemapDotxmlRoute = Route$n.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$r
});
const SignupRoute = Route$m.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$r
});
const RefundsRoute = Route$l.update({
  id: "/refunds",
  path: "/refunds",
  getParentRoute: () => Route$r
});
const PrivacyRoute = Route$k.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$r
});
const PricingRoute = Route$j.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$r
});
const PayoutsRoute = Route$i.update({
  id: "/payouts",
  path: "/payouts",
  getParentRoute: () => Route$r
});
const MeRoute = Route$h.update({
  id: "/me",
  path: "/me",
  getParentRoute: () => Route$r
});
const LoginRoute = Route$g.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$r
});
const GuidelinesRoute = Route$f.update({
  id: "/guidelines",
  path: "/guidelines",
  getParentRoute: () => Route$r
});
const DmcaRoute = Route$e.update({
  id: "/dmca",
  path: "/dmca",
  getParentRoute: () => Route$r
});
const DiscoverRoute = Route$d.update({
  id: "/discover",
  path: "/discover",
  getParentRoute: () => Route$r
});
const ContactRoute = Route$c.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$r
});
const AdminRoute = Route$b.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$r
});
const AccountDeletionRoute = Route$a.update({
  id: "/account-deletion",
  path: "/account-deletion",
  getParentRoute: () => Route$r
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$r
});
const UHandleRoute = Route$8.update({
  id: "/u/$handle",
  path: "/u/$handle",
  getParentRoute: () => Route$r
});
const PIdRoute = Route$7.update({
  id: "/p/$id",
  path: "/p/$id",
  getParentRoute: () => Route$r
});
const CheckoutReturnRoute = Route$6.update({
  id: "/checkout/return",
  path: "/checkout/return",
  getParentRoute: () => Route$r
});
const BlockUserIdRoute = Route$5.update({
  id: "/block/$userId",
  path: "/block/$userId",
  getParentRoute: () => Route$r
});
const ApiTranscribeLyricsRoute = Route$4.update({
  id: "/api/transcribe-lyrics",
  path: "/api/transcribe-lyrics",
  getParentRoute: () => Route$r
});
const ReportUserUserIdRoute = Route$3.update({
  id: "/report/user/$userId",
  path: "/report/user/$userId",
  getParentRoute: () => Route$r
});
const ApiAdminRestoreMediaRoute = Route$2.update({
  id: "/api/admin/restore-media",
  path: "/api/admin/restore-media",
  getParentRoute: () => Route$r
});
const LovableEmailQueueProcessRoute = Route$1.update({
  id: "/lovable/email/queue/process",
  path: "/lovable/email/queue/process",
  getParentRoute: () => Route$r
});
const ApiPublicPaymentsWebhookRoute = Route.update({
  id: "/api/public/payments/webhook",
  path: "/api/public/payments/webhook",
  getParentRoute: () => Route$r
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
  BlockUserIdRoute,
  CheckoutReturnRoute,
  PIdRoute,
  UHandleRoute,
  ApiAdminRestoreMediaRoute,
  ReportUserUserIdRoute,
  ApiPublicPaymentsWebhookRoute,
  LovableEmailQueueProcessRoute
};
const routeTree = Route$r._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Route$p as R,
  Route$8 as a,
  buttonVariants as b,
  cn as c,
  Route$7 as d,
  postQueryOptions as e,
  getCreatorPostIds as f,
  getFeed as g,
  Route$6 as h,
  Route$5 as i,
  Route$3 as j,
  profileQueryOptions as p,
  router as r,
  searchAll as s,
  toastErrorMessage as t
};
