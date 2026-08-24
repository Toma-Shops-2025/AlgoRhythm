import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { i as Route$5, B as Button } from "./router-CFClAfxv.mjs";
import { t as toggleBlock } from "./safety.functions-CxQbTYIp.mjs";
import { r as rememberBlockedCreator } from "./blocked-creators-BGPJbj6-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { A as ArrowLeft, _ as Ban } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
function BlockCreatorPage() {
  const {
    userId
  } = Route$5.useParams();
  const {
    handle
  } = Route$5.useSearch();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login",
      replace: true
    });
  }, [loading, user, navigate]);
  reactExports.useEffect(() => {
    if (user && user.id === userId) {
      toast.error("You can't block yourself");
      navigate({
        to: "/",
        replace: true
      });
    }
  }, [user, userId, navigate]);
  const confirmBlock = async () => {
    setBusy(true);
    try {
      const res = await toggleBlock({
        data: {
          targetUserId: userId
        }
      });
      if (res.blocked) {
        rememberBlockedCreator(userId);
        toast.success(handle ? `Blocked @${handle}` : "Creator blocked");
      } else {
        toast.success(handle ? `Unblocked @${handle}` : "Creator unblocked");
      }
      navigate({
        to: "/",
        replace: true
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to block creator");
    } finally {
      setBusy(false);
    }
  };
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-background" });
  }
  const label = handle ? `@${handle}` : "this creator";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 pt-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Back", onClick: () => navigate({
        to: "/"
      }), className: "grid h-9 w-9 place-items-center rounded-full hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl tracking-tight text-gradient-gold", children: "Block creator" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-rose-500/15 text-rose-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-medium", children: [
        "Block ",
        label,
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "You won't see their posts in your feed, and you'll unfollow each other. They won't be notified that you blocked them." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: confirmBlock, disabled: busy, className: "rounded-full bg-rose-500 text-white hover:bg-rose-500/90", children: busy ? "Blocking…" : `Block ${label}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
        to: "/"
      }), className: "rounded-full", children: "Cancel" })
    ] })
  ] }) });
}
export {
  BlockCreatorPage as component
};
