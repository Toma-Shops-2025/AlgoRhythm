import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { j as Route$3, B as Button } from "./router-CFClAfxv.mjs";
import { R as RadioGroup, L as Label, a as RadioGroupItem, T as Textarea } from "./label-BfBOhddq.mjs";
import { s as submitReport } from "./safety.functions-CxQbTYIp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
const REASONS = [{
  value: "spam",
  label: "Spam or scam"
}, {
  value: "harassment",
  label: "Harassment or bullying"
}, {
  value: "hate",
  label: "Hate speech"
}, {
  value: "sexual",
  label: "Sexual content / nudity"
}, {
  value: "violence",
  label: "Violence or gore"
}, {
  value: "csam",
  label: "Child sexual abuse material"
}, {
  value: "self_harm",
  label: "Self-harm or suicide"
}, {
  value: "impersonation",
  label: "Impersonation"
}, {
  value: "ip_violation",
  label: "Copyright / IP violation"
}, {
  value: "illegal",
  label: "Illegal activity"
}, {
  value: "other",
  label: "Something else"
}];
function ReportCreatorPage() {
  const {
    userId
  } = Route$3.useParams();
  const {
    handle
  } = Route$3.useSearch();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [reason, setReason] = reactExports.useState("spam");
  const [details, setDetails] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login",
      replace: true
    });
  }, [loading, user, navigate]);
  reactExports.useEffect(() => {
    if (user && user.id === userId) {
      toast.error("You can't report yourself");
      navigate({
        to: "/",
        replace: true
      });
    }
  }, [user, userId, navigate]);
  const submit = async () => {
    setSubmitting(true);
    try {
      await submitReport({
        data: {
          targetType: "user",
          targetId: userId,
          reason,
          details: details.trim() || void 0
        }
      });
      toast.success("Report submitted. Thank you.");
      navigate({
        to: "/",
        replace: true
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-background" });
  }
  const label = handle ? `@${handle}` : "this creator";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 pt-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Back", onClick: () => navigate({
        to: "/"
      }), className: "grid h-9 w-9 place-items-center rounded-full hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl tracking-tight text-gradient-gold", children: "Report creator" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-sm text-foreground/90", children: [
      "Reports are reviewed by our moderation team. Select a reason for reporting ",
      label,
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { value: reason, onValueChange: (v) => setReason(v), className: "grid gap-2", children: REASONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex cursor-pointer items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:border-gold/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: r.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label })
    ] }, r.value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: details, onChange: (e) => setDetails(e.target.value), placeholder: "Optional details (max 1000 chars)", maxLength: 1e3, rows: 3, className: "mt-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => navigate({
        to: "/"
      }), className: "flex-1", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, className: "flex-1 bg-gradient-gold text-primary-foreground", children: submitting ? "Submitting…" : "Submit report" })
    ] })
  ] }) });
}
export {
  ReportCreatorPage as component
};
