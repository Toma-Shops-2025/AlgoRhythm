import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-D17K3a5v.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { u as Mail, v as ShieldAlert, w as FileText, x as CreditCard, y as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "./router-CFClAfxv.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function Card({
  icon: Icon,
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm", children })
  ] });
}
export {
  ContactPage as component
};
