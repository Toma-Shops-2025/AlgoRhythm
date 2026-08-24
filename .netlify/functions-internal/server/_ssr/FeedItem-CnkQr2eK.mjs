import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AudioVisualizer } from "./CommentsSheet-D1ahEYAg.mjs";
import { a as Watermark } from "./Logo-BGOt1dsf.mjs";
import { C as CheckoutDialog, b as createTipCheckout } from "./payments.functions-CI6_eqWr.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-BFSxUYhI.mjs";
import { g as getStripeEnvironment } from "./stripe-FMfoOcDi.mjs";
import { c as cn, B as Button } from "./router-CFClAfxv.mjs";
import { R as RadioGroup, L as Label, a as RadioGroupItem, T as Textarea } from "./label-BfBOhddq.mjs";
import { s as submitReport } from "./safety.functions-CxQbTYIp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { u as useAuth } from "./AppShell-D17K3a5v.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { r as resolveStorageUrl } from "./storage-C0T7Obi-.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { i as Play, j as VolumeX, k as Volume2, l as Heart, m as MessageCircle, B as Bookmark, n as Gift, o as EllipsisVertical, p as Share2, X, q as ChevronRight, a as Check, r as Circle } from "../_libs/lucide-react.mjs";
import { o as objectType, n as numberType, e as enumType, s as stringType } from "../_libs/zod.mjs";
const DropdownMenu = Root2;
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
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
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
DropdownMenuContent.displayName = Content2.displayName;
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
const recordPlayback = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  postId: stringType().uuid(),
  event: enumType(["play", "complete", "loop"]),
  listenedMs: numberType().int().min(0).max(60 * 60 * 1e3).optional()
}).parse(input)).handler(createSsrRpc("8474282713a173c5c5e084437a69230af29801b798f65eecc0128c5494782098"));
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
  volume,
  onUnmute,
  onMute,
  onVolumeChange,
  autoAdvance,
  onEnded
}) {
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [tipOpen, setTipOpen] = reactExports.useState(false);
  const [reportPostOpen, setReportPostOpen] = reactExports.useState(false);
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
  }, [active, post.id, post.type]);
  reactExports.useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el || !active) return;
    el.muted = muted;
    el.volume = volume;
    if (!muted) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [muted, volume, active, post.type]);
  reactExports.useEffect(() => {
    const onVisibility = () => {
      const el = post.type === "video" ? videoRef.current : audioRef.current;
      if (!el) return;
      if (document.hidden) {
        el.pause();
        setPlaying(false);
      } else if (active) {
        el.muted = muted;
        el.volume = volume;
        void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, muted, volume, post.type]);
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
        crossOrigin: "anonymous",
        preload: "auto",
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "audio",
        {
          ref: audioRef,
          src: mediaUrl,
          crossOrigin: "anonymous",
          preload: "auto",
          muted,
          loop: !autoAdvance
        }
      ),
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
          if (muted) onUnmute();
          else onMute();
        },
        className: "absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur",
        children: muted || volume === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" })
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
              onVolumeChange(v);
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "aria-label": "More options",
            className: "flex flex-col items-center gap-1",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-white/90", children: "More" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DropdownMenuContent,
          {
            align: "end",
            side: "left",
            className: "z-[80] min-w-[11rem]",
            onClick: (e) => e.stopPropagation(),
            children: user && post.creator && user.id === post.creator.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { disabled: true, children: "This is your post" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuItem,
                {
                  onSelect: () => {
                    if (!user) return navigate({ to: "/login" });
                    setReportPostOpen(true);
                  },
                  children: "Report post"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuItem,
                {
                  onSelect: () => {
                    if (!user) return navigate({ to: "/login" });
                    if (!post.creator) return;
                    navigate({
                      to: "/report/user/$userId",
                      params: { userId: post.creator.id },
                      search: { handle: post.creator.handle }
                    });
                  },
                  children: "Report creator"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuItem,
                {
                  className: "text-rose-400 focus:text-rose-400",
                  onSelect: () => {
                    if (!user) return navigate({ to: "/login" });
                    if (!post.creator) return;
                    navigate({
                      to: "/block/$userId",
                      params: { userId: post.creator.id },
                      search: { handle: post.creator.handle }
                    });
                  },
                  children: "Block creator"
                }
              )
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { onClick: openShare, ariaLabel: "Share post", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-7 w-7" }) })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { url: post.creator.avatar_url, name: post.creator.display_name }),
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
function Avatar({ url, name }) {
  if (url) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: name, className: "h-9 w-9 rounded-full object-cover ring-1 ring-gold/40" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary-foreground", children: name.slice(0, 1).toUpperCase() });
}
function formatCount(n) {
  if (n < 1e3) return String(n);
  if (n < 1e6) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
}
export {
  DropdownMenu as D,
  FeedItem as F,
  DropdownMenuTrigger as a,
  DropdownMenuContent as b,
  DropdownMenuItem as c
};
