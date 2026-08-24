import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { u as useProSubscription } from "./useSubscription-B2-XPe1t.mjs";
import { c as createPost } from "./posts.functions-HCsiXm05.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-BFSxUYhI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$p, t as toastErrorMessage } from "./router-CFClAfxv.mjs";
import "../_libs/stripe__stripe-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { S as Sparkles, F as Film, M as Music, I as Image$1, L as LoaderCircle, V as Video, T as Type } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./stripe-FMfoOcDi.mjs";
import "./client.server-LV8D9vnO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "events";
import "http";
import "https";
import "os";
const generatePostMetadata = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  idea: stringType().min(2).max(500),
  mediaType: enumType(["audio", "video"]).optional()
}).parse(input)).handler(createSsrRpc("caddf6fb90b8e97b64f718ef8c86ac722a1da6bfaca886e671a553653c67b259"));
const generateCoverImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500)
}).parse(input)).handler(createSsrRpc("fe49f39b9fe191c28a813af5ab418392190eca0e6f2c2f3f3032d0b13a158913"));
const generateMusicVideoScenes = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  prompt: stringType().min(2).max(500),
  count: numberType().int().min(2).max(8).optional(),
  style: stringType().max(200).optional()
}).parse(input)).handler(createSsrRpc("3ad115ed8cea7df480a8b1aa5a7060d4a2ef7d3588e40e75036e22671254d41b"));
function videoBitrateForDuration(durationSec, maxBytes = 48 * 1024 * 1024) {
  const audioBps = 128e3;
  const totalBps = Math.floor(maxBytes * 8 / Math.max(durationSec, 1));
  return Math.max(35e4, Math.min(25e5, totalBps - audioBps));
}
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
  const rec = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: videoBitrateForDuration(duration)
  });
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
  const rec = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: videoBitrateForDuration(duration)
  });
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
const SUPABASE_FREE_GLOBAL_BYTES = 50 * 1024 * 1024;
function formatMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(bytes >= 100 * 1024 * 1024 ? 0 : 1);
}
function isStorageSizeError(message) {
  const msg = message.toLowerCase();
  return msg.includes("maximum allowed size") || msg.includes("exceeds storage size") || msg.includes("caps uploads at 50mb") || msg.includes("storage size limit");
}
function UploadPage() {
  const {
    user,
    loading
  } = useAuth();
  const {
    isPro
  } = useProSubscription();
  const navigate = useNavigate();
  const search = Route$p.useSearch();
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
  const [sizeHelpOpen, setSizeHelpOpen] = reactExports.useState(false);
  const [sizeHelpMb, setSizeHelpMb] = reactExports.useState(null);
  const coverPreview = reactExports.useMemo(() => cover ? URL.createObjectURL(cover) : null, [cover]);
  const openSizeHelp = (fileBytes) => {
    setSizeHelpMb(fileBytes != null ? formatMb(fileBytes) : null);
    setSizeHelpOpen(true);
  };
  const onMediaPicked = (file) => {
    setMedia(file);
    if (file && file.type.startsWith("video") && file.size > SUPABASE_FREE_GLOBAL_BYTES) {
      openSizeHelp(file.size);
    }
  };
  if (!loading && !user) {
    navigate({
      to: "/login"
    });
    return null;
  }
  const type = media ? media.type.startsWith("video") ? "video" : media.type.startsWith("audio") ? "audio" : null : null;
  const MAX_MEDIA_BYTES = 500 * 1024 * 1024;
  const uploadTo = async (bucket, file) => {
    if (file.size > MAX_MEDIA_BYTES) {
      openSizeHelp(file.size);
      throw new Error(`File is ${formatMb(file.size)}MB — too large to upload.`);
    }
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const {
      error
    } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      upsert: false
    });
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("maximum allowed size") || msg.includes("exceeded") || msg.includes("payload too large")) {
        openSizeHelp(file.size);
        throw new Error(`Upload is ${formatMb(file.size)}MB — compress under 50MB and try again.`);
      }
      if (msg.includes("bucket not found")) {
        throw new Error(`Storage bucket "${bucket}" is missing. Run supabase/scripts/restore-playback.sql in project tmpdjywsnwzivetqludd, then try again.`);
      }
      throw new Error(error.message);
    }
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };
  const handleGenerateCover = async () => {
    if (!isPro) {
      toast.error("AI cover art is a Pro feature");
      navigate({
        to: "/pricing"
      });
      return;
    }
    const prompt = title.trim() || caption.trim() || idea.trim() || tags.trim();
    if (!prompt) {
      toast.error("Add a title first so the AI knows what to draw");
      return;
    }
    setGenerating(true);
    try {
      const {
        b64
      } = await genCover({
        data: {
          prompt
        }
      });
      const file = b64ToFile(b64, `cover-${Date.now()}.png`, "image/png");
      setCover(file);
      toast.success("Cover generated");
    } catch (e) {
      toast.error(toastErrorMessage(e, "Cover generation failed"));
    } finally {
      setGenerating(false);
    }
  };
  const handleGenerateMeta = async () => {
    if (!isPro) {
      toast.error("AI captions are a Pro feature");
      navigate({
        to: "/pricing"
      });
      return;
    }
    const seed = idea.trim() || title.trim() || caption.trim();
    if (!seed) {
      toast.error("Type a quick idea or title first");
      return;
    }
    setGenMetaLoading(true);
    try {
      const meta = await genMeta({
        data: {
          idea: seed,
          mediaType: type ?? "audio"
        }
      });
      if (meta.title) setTitle(meta.title);
      if (meta.caption) setCaption(meta.caption);
      if (meta.hashtags.length) setHashtags(meta.hashtags.map((h) => `#${h}`).join(" "));
      toast.success("Title, caption & hashtags generated");
    } catch (e) {
      toast.error(toastErrorMessage(e, "Could not generate caption"));
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
          const {
            data: sessData
          } = await supabase.auth.getSession();
          const token = sessData.session?.access_token;
          const lyricsRes = await fetch("/api/transcribe-lyrics", {
            method: "POST",
            body: fd,
            headers: token ? {
              Authorization: `Bearer ${token}`
            } : void 0
          });
          if (!lyricsRes.ok) {
            const err = await lyricsRes.json().catch(() => ({
              error: "Transcription failed"
            }));
            throw new Error(err.error ?? "Transcription failed");
          }
          const {
            lines
          } = await lyricsRes.json();
          if (!lines || lines.length === 0) {
            throw new Error("Could not detect lyrics in the audio. Try the visualizer mode instead.");
          }
          setBusyLabel("Generating backdrop scenes…");
          const scenePrompt = [title.trim(), caption.trim(), idea.trim()].filter(Boolean).join(" — ") || "atmospheric music video backdrop";
          const {
            images
          } = await genScenes({
            data: {
              prompt: scenePrompt,
              count: 4
            }
          });
          const imgs = await Promise.all(images.map((b) => loadImageFromB64(b)));
          setBusyLabel("Rendering your lyric video…");
          const blob = await audioToLyricVideo(media, imgs, lines);
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, {
            type: "video/webm"
          });
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
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, {
            type: "video/webm"
          });
          postType = "video";
        }
      }
      setBusyLabel("Uploading…");
      if (mediaFile.size > MAX_MEDIA_BYTES || mediaFile.size > SUPABASE_FREE_GLOBAL_BYTES) {
        openSizeHelp(mediaFile.size);
        throw new Error(`File is ${formatMb(mediaFile.size)}MB — compress under 50MB and try again.`);
      }
      const mediaUrl = await uploadTo("media", mediaFile);
      const coverUrl = derivedCover ? await uploadTo("covers", derivedCover) : null;
      setBusyLabel("Publishing…");
      const tagList = [...tags.split(/[,\s]+/), ...hashtags.split(/[,\s]+/)].map((t) => t.replace(/^#+/, "").trim().toLowerCase()).filter(Boolean);
      const dedupedTags = Array.from(new Set(tagList)).slice(0, 15);
      const captionBody = caption.trim();
      const hashLine = hashtags.trim();
      const fullCaption = [captionBody, hashLine].filter(Boolean).join("\n\n");
      const {
        post: row
      } = await post({
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
        params: {
          id: row.id
        },
        search: {
          new: 1,
          regen: regenCount || void 0
        }
      });
    } catch (e2) {
      const message = toastErrorMessage(e2, "Could not publish");
      if (isStorageSizeError(message)) {
        setSizeHelpOpen(true);
      } else {
        toast.error(message);
      }
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: sizeHelpOpen, onOpenChange: setSizeHelpOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm border-gold/30 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-gradient-gold", children: "Video too large to upload" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-left text-muted-foreground", children: sizeHelpMb ? `Your file is about ${sizeHelpMb}MB. AlgoRhythm currently accepts music videos under 50MB.` : "AlgoRhythm currently accepts music videos under 50MB." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Compress the MP4 (or export a smaller version), then choose the new file and publish again. Your caption and tags stay filled in — you only need to swap the video." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://videocompress.ai", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center rounded-md border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-medium text-gold hover:bg-gold/15", children: "Compress free at videocompress.ai →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc space-y-1.5 pl-4 text-xs leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Aim for under 50MB (720p / lower bitrate works great for feed posts)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Or post the audio track first, then add video later" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSizeHelpOpen(false), className: "w-full rounded-md bg-gradient-gold px-4 py-2.5 text-sm font-medium text-primary-foreground", children: "Got it — I'll compress and retry" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "New post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Audio or video. AI-made." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
        !isPro && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", className: "block rounded-md border border-gold/40 bg-gradient-to-r from-gold/10 to-transparent p-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-medium text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Unlock AI features with Pro"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-muted-foreground", children: "AI cover art, AI title/caption/hashtags, lyric videos and scene generation are Pro perks. Upgrade →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilePick, { label: "Media (audio or video)", icon: type === "video" ? Film : Music, accept: "*/*", file: media, onChange: onMediaPicked }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] leading-relaxed text-muted-foreground", children: [
          "Music videos work best under ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "50MB" }),
          ". Larger files usually fail — compress at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://videocompress.ai", target: "_blank", rel: "noopener noreferrer", className: "text-gold underline underline-offset-2 hover:text-gold/80", children: "videocompress.ai" }),
          ", then upload again."
        ] }),
        (type === "audio" || type === "video") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilePick, { label: type === "audio" ? "Cover image (optional)" : "Cover image (optional)", icon: Image$1, accept: "image/*", file: cover, onChange: setCover }),
          coverPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: coverPreview, alt: "", className: "h-24 w-24 rounded-md object-cover ring-1 ring-gold/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: generating, onClick: handleGenerateCover, className: "flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50", children: [
            generating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            generating ? "Generating…" : cover ? "Regenerate cover with AI" : "Generate cover with AI"
          ] })
        ] }),
        type === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card/40 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: convertToVideo, onChange: (e) => setConvertToVideo(e.target.checked), className: "mt-1 accent-gold" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(ModeOption, { active: videoMode === "visualizer", onClick: () => setVideoMode("visualizer"), icon: Video, title: "Visualizer", desc: "Cover art + reactive bars" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ModeOption, { active: videoMode === "lyric", onClick: () => {
              if (!isPro) {
                toast.error("Lyric videos are a Pro feature");
                navigate({
                  to: "/pricing"
                });
                return;
              }
              setVideoMode("lyric");
            }, icon: Type, title: "Lyric video", desc: isPro ? "AI lyrics + AI scenes" : "Pro only" })
          ] }),
          videoMode === "visualizer" && !cover && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Pick or generate a cover image above to use as the visualizer background." }),
          videoMode === "visualizer" && cover && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Your cover will animate with a reactive visualizer synced to the audio." }),
          videoMode === "lyric" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "We'll auto-transcribe your vocals, generate cinematic backdrops, and sync the lyrics on-screen. Best with vocal tracks under ~20MB." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, maxLength: 140, value: title, onChange: (e) => setTitle(e.target.value), className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-gold/20 bg-card/30 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quick idea (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: idea, onChange: (e) => setIdea(e.target.value), maxLength: 500, placeholder: "e.g. dreamy late-night drive synthwave", className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: genMetaLoading, onClick: handleGenerateMeta, className: "flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50", children: [
            genMetaLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            genMetaLoading ? "Writing…" : "Generate title, caption & hashtags"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Type a short idea (or just a title) and let AI write the rest." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Caption", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, maxLength: 2e3, value: caption, onChange: (e) => setCaption(e.target.value), className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hashtags", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: hashtags, onChange: (e) => setHashtags(e.target.value), placeholder: "#aimusic #synthwave #suno", className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Genre / Tags (comma separated)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: tags, onChange: (e) => setTags(e.target.value), placeholder: "synthwave, drill, lofi", className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "AI tools used", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: aiTools, onChange: (e) => setAiTools(e.target.value), placeholder: "Suno, Udio, Runway, Sora", className: "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md border border-gold/20 bg-card/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: ownsRights, onChange: (e) => setOwnsRights(e.target.checked), className: "mt-0.5 accent-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "I own or have permission to share this content and any samples it uses. I understand infringing posts can be removed under our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA policy" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: aiDisclosed, onChange: (e) => setAiDisclosed(e.target.checked), className: "mt-0.5 accent-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "This was made with AI tools and I'll follow the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: busy, type: "submit", className: "flex w-full items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50", children: [
          busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " ",
          busy && busyLabel ? busyLabel : "Publish to the feed"
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `flex flex-col items-start gap-1 rounded-md border p-2.5 text-left transition ${active ? "border-gold/60 bg-card" : "border-border bg-card/40 hover:border-gold/30"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${active ? "text-gold" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: active ? "text-gold" : "", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: desc })
  ] });
}
export {
  UploadPage as component
};
