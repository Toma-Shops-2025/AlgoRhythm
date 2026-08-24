import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-D17K3a5v.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
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
import "../_libs/lucide-react.mjs";
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
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
export {
  AccountDeletionPage as component
};
