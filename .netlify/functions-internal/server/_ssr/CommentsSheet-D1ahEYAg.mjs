import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { u as useAuth } from "./AppShell-D17K3a5v.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { X, s as Pin, t as Send } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
const wiredElements = /* @__PURE__ */ new WeakSet();
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
    const drawIdle = () => {
      const canvas = canvasRef.current;
      const c = canvas?.getContext("2d");
      if (!canvas || !c || cancelled) return;
      const w = canvas.width;
      const h = canvas.height;
      c.clearRect(0, 0, w, h);
      c.strokeStyle = "rgba(201, 168, 76, 0.35)";
      c.setLineDash([6, 8]);
      c.beginPath();
      c.moveTo(0, h / 2);
      c.lineTo(w, h / 2);
      c.stroke();
      c.setLineDash([]);
    };
    const setup = async () => {
      const canvas = canvasRef.current;
      const c = canvas?.getContext("2d");
      if (!canvas || !c) return;
      const corsReady = audio.crossOrigin === "anonymous" || audio.crossOrigin === "use-credentials";
      if (!corsReady) {
        drawIdle();
        return;
      }
      try {
        if (!ctxRef.current) {
          const AC = window.AudioContext || window.webkitAudioContext;
          ctxRef.current = new AC();
        }
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") await ctx.resume();
        if (!wiredElements.has(audio)) {
          const src = ctx.createMediaElementSource(audio);
          const analyser2 = ctx.createAnalyser();
          analyser2.fftSize = 256;
          src.connect(analyser2);
          analyser2.connect(ctx.destination);
          analyserRef.current = analyser2;
          wiredElements.add(audio);
        }
        const analyser = analyserRef.current;
        if (!analyser || cancelled) return;
        const data = new Uint8Array(analyser.frequencyBinCount);
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
        console.warn("Visualizer unavailable — audio still plays natively", e);
        drawIdle();
      }
    };
    void setup();
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
const toggleLike = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("3065a0b86fec5ca02eaff7d682d9e952b4aa1070b01e799803d6b5eef80cf9f0"));
const toggleFollow = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  targetUserId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("dfbdfa08334b7454e8295c9056e30ce155a9665d10b348d9a98e7e2842c4b874"));
const addComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postId: stringType().uuid(),
  body: stringType().min(1).max(500)
}).parse(input)).handler(createSsrRpc("5f8a00e81aa90926bf5a9ed55938e2182c0448553b713e085f5ab30574157ddd"));
const getComments = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  postId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("f8b15ffc015f1dc8f3d3a67d551214cca78e7c3c1b9fba6a7b0e54b17d8a9f8c"));
const getMyInteractions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  postIds: arrayType(stringType().uuid()).max(50),
  creatorIds: arrayType(stringType().uuid()).max(50)
}).parse(input)).handler(createSsrRpc("62021290b0f36248181adccdab7522d8d24669d42593d1fc53573bcefa790518"));
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
export {
  AudioVisualizer as A,
  CommentsSheet as C,
  toggleLike as a,
  getMyInteractions as g,
  toggleFollow as t
};
