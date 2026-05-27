import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useProSubscription } from "@/hooks/useSubscription";
import { useServerFn } from "@tanstack/react-start";
import { createPost } from "@/lib/posts.functions";
import { generateCoverImage, generatePostMetadata, generateMusicVideoScenes } from "@/lib/ai.functions";
import { audioToVideo, audioToLyricVideo, b64ToFile, loadImageFromB64, type LyricLine } from "@/lib/audioToVideo";
import { AppShell } from "@/components/AppShell";
import { toast } from "sonner";
import { Music, Film, Image as ImageIcon, Loader2, Sparkles, Video as VideoIcon, Type } from "lucide-react";

export const Route = createFileRoute("/upload")({
  validateSearch: (search: Record<string, unknown>) => {
    const r = Number(search.regen);
    const regen = Number.isFinite(r) ? Math.min(Math.max(Math.trunc(r), 0), 2) : 0;
    return { regen: regen || undefined } as { regen?: number };
  },
  head: () => ({
    meta: [
      { title: "Post — AlgoRhythm" },
      { name: "description", content: "Upload your AI-made track or music video to the AlgoRhythm feed." },
      { property: "og:title", content: "Post to AlgoRhythm" },
      { property: "og:description", content: "Publish your AI music or video to the AlgoRhythm feed." },
      { property: "og:url", content: "https://myalgorhythm.online/upload" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/upload" }],
  }),
  component: UploadPage,
});

function UploadPage() {
  const { user, loading } = useAuth();
  const { isPro } = useProSubscription();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const regenCount = search.regen ?? 0;
  const post = useServerFn(createPost);
  const genCover = useServerFn(generateCoverImage);
  const genMeta = useServerFn(generatePostMetadata);
  const genScenes = useServerFn(generateMusicVideoScenes);

  const [media, setMedia] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [idea, setIdea] = useState("");
  const [genMetaLoading, setGenMetaLoading] = useState(false);
  const [aiTools, setAiTools] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [convertToVideo, setConvertToVideo] = useState(false);
  const [videoMode, setVideoMode] = useState<"visualizer" | "lyric">("visualizer");

  const coverPreview = useMemo(() => (cover ? URL.createObjectURL(cover) : null), [cover]);

  if (!loading && !user) {
    navigate({ to: "/login" });
    return null;
  }

  const type: "audio" | "video" | null = media
    ? media.type.startsWith("video") ? "video" : media.type.startsWith("audio") ? "audio" : null
    : null;

  const uploadTo = async (bucket: string, file: File) => {
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${user!.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const handleGenerateCover = async () => {
    const prompt = title.trim() || caption.trim() || idea.trim() || tags.trim();
    if (!prompt) { toast.error("Add a title first so the AI knows what to draw"); return; }
    setGenerating(true);
    try {
      const { b64 } = await genCover({ data: { prompt } });
      const file = b64ToFile(b64, `cover-${Date.now()}.png`, "image/png");
      setCover(file);
      toast.success("Cover generated");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateMeta = async () => {
    const seed = idea.trim() || title.trim() || caption.trim();
    if (!seed) { toast.error("Type a quick idea or title first"); return; }
    setGenMetaLoading(true);
    try {
      const meta = await genMeta({ data: { idea: seed, mediaType: type ?? "audio" } });
      if (meta.title) setTitle(meta.title);
      if (meta.caption) setCaption(meta.caption);
      if (meta.hashtags.length) setHashtags(meta.hashtags.map((h) => `#${h}`).join(" "));
      toast.success("Title, caption & hashtags generated");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setGenMetaLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!media || !type) return toast.error("Pick an audio or video file");
    if (type === "audio" && convertToVideo && videoMode === "visualizer" && !cover) {
      return toast.error("Converting to video needs a cover image — upload one or generate with AI");
    }
    setBusy(true);
    try {
      let mediaFile: File = media;
      let postType: "audio" | "video" = type;
      let derivedCover: File | null = cover;

      if (type === "audio" && convertToVideo) {
        if (videoMode === "lyric") {
          setBusyLabel("Transcribing lyrics…");
          const fd = new FormData();
          fd.append("audio", media);
          // best-effort duration: rely on server to clamp
          const { data: sessData } = await supabase.auth.getSession();
          const token = sessData.session?.access_token;
          const lyricsRes = await fetch("/api/transcribe-lyrics", {
            method: "POST",
            body: fd,
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          if (!lyricsRes.ok) {
            const err = await lyricsRes.json().catch(() => ({ error: "Transcription failed" }));
            throw new Error((err as { error?: string }).error ?? "Transcription failed");
          }
          const { lines } = (await lyricsRes.json()) as { lines: LyricLine[] };
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
      // hashtags + tags both feed into tags[] (lowercased, deduped, # stripped)
      const tagList = [
        ...tags.split(/[,\s]+/),
        ...hashtags.split(/[,\s]+/),
      ]
        .map((t) => t.replace(/^#+/, "").trim().toLowerCase())
        .filter(Boolean);
      const dedupedTags = Array.from(new Set(tagList)).slice(0, 15);
      // caption stored in description column
      const captionBody = caption.trim();
      const hashLine = hashtags.trim();
      const fullCaption = [captionBody, hashLine].filter(Boolean).join("\n\n");
      const { post: row } = await post({
        data: {
          type: postType,
          mediaUrl,
          coverUrl,
          title: title.trim(),
          description: fullCaption || undefined,
          tags: dedupedTags,
          aiTools: aiTools.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10),
        },
      });
      toast.success("Posted");
      navigate({
        to: "/p/$id",
        params: { id: row.id },
        search: { new: 1, regen: regenCount || undefined },
      });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 pt-6">
        <h1 className="text-2xl tracking-tight text-gradient-gold">New post</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Audio or video. AI-made.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <FilePick
            label="Media (audio or video)"
            icon={type === "video" ? Film : Music}
            accept="*/*"
            file={media}
            onChange={setMedia}
          />
          {(type === "audio" || type === "video") && (
            <div className="space-y-2">
              <FilePick
                label={type === "audio" ? "Cover image (optional)" : "Cover image (optional)"}
                icon={ImageIcon}
                accept="image/*"
                file={cover}
                onChange={setCover}
              />
              {coverPreview && (
                <img src={coverPreview} alt="" className="h-24 w-24 rounded-md object-cover ring-1 ring-gold/30" />
              )}
              <button
                type="button"
                disabled={generating}
                onClick={handleGenerateCover}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50"
              >
                {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                {generating ? "Generating…" : cover ? "Regenerate cover with AI" : "Generate cover with AI"}
              </button>
            </div>
          )}

          {type === "audio" && (
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card/40 p-3">
              <input
                type="checkbox"
                checked={convertToVideo}
                onChange={(e) => setConvertToVideo(e.target.checked)}
                className="mt-1 accent-gold"
              />
              <span className="flex-1">
                <span className="flex items-center gap-2 text-sm">
                  <VideoIcon className="h-4 w-4 text-gold" /> Turn this into a video
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  Render a video synced to your audio — pick a style below.
                </span>
              </span>
            </label>
          )}

          {type === "audio" && convertToVideo && (
            <div className="rounded-md border border-gold/20 bg-card/30 p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <ModeOption
                  active={videoMode === "visualizer"}
                  onClick={() => setVideoMode("visualizer")}
                  icon={VideoIcon}
                  title="Visualizer"
                  desc="Cover art + reactive bars"
                />
                <ModeOption
                  active={videoMode === "lyric"}
                  onClick={() => setVideoMode("lyric")}
                  icon={Type}
                  title="Lyric video"
                  desc="AI lyrics + AI scenes"
                />
              </div>
              {videoMode === "visualizer" && !cover && (
                <p className="text-[11px] text-muted-foreground">Pick or generate a cover image above to use as the visualizer background.</p>
              )}
              {videoMode === "visualizer" && cover && (
                <p className="text-[11px] text-muted-foreground">Your cover will animate with a reactive visualizer synced to the audio.</p>
              )}
              {videoMode === "lyric" && (
                <p className="text-[11px] text-muted-foreground">We'll auto-transcribe your vocals, generate cinematic backdrops, and sync the lyrics on-screen. Best with vocal tracks under ~20MB.</p>
              )}
            </div>
          )}

          <Field label="Title">
            <input required maxLength={140} value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>

          <div className="rounded-md border border-gold/20 bg-card/30 p-3 space-y-2">
            <Field label="Quick idea (optional)">
              <input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                maxLength={500}
                placeholder="e.g. dreamy late-night drive synthwave"
                className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
              />
            </Field>
            <button
              type="button"
              disabled={genMetaLoading}
              onClick={handleGenerateMeta}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-card disabled:opacity-50"
            >
              {genMetaLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              {genMetaLoading ? "Writing…" : "Generate title, caption & hashtags"}
            </button>
            <p className="text-[11px] text-muted-foreground">
              Type a short idea (or just a title) and let AI write the rest.
            </p>
          </div>

          <Field label="Caption">
            <textarea rows={3} maxLength={2000} value={caption} onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>
          <Field label="Hashtags">
            <input value={hashtags} onChange={(e) => setHashtags(e.target.value)}
              placeholder="#aimusic #synthwave #suno"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>
          <Field label="Genre / Tags (comma separated)">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="synthwave, drill, lofi"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>
          <Field label="AI tools used">
            <input value={aiTools} onChange={(e) => setAiTools(e.target.value)} placeholder="Suno, Udio, Runway, Sora"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>

          <button disabled={busy} type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy && busyLabel ? busyLabel : "Publish to the feed"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function FilePick({
  label, icon: Icon, accept, file, onChange,
}: { label: string; icon: typeof Music; accept: string; file: File | null; onChange: (f: File | null) => void }) {
  return (
    <label className="block cursor-pointer rounded-md border border-dashed border-border bg-card/40 p-4 hover:border-gold/40">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-background text-gold"><Icon className="h-5 w-5" /></span>
        <div className="flex-1">
          <div className="text-sm">{label}</div>
          <div className="text-xs text-muted-foreground">{file ? file.name : "Tap to choose a file"}</div>
        </div>
      </div>
      <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
    </label>
  );
}

function ModeOption({
  active, onClick, icon: Icon, title, desc,
}: { active: boolean; onClick: () => void; icon: typeof Music; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-1 rounded-md border p-2.5 text-left transition ${active ? "border-gold/60 bg-card" : "border-border bg-card/40 hover:border-gold/30"}`}
    >
      <span className="flex items-center gap-1.5 text-xs">
        <Icon className={`h-3.5 w-3.5 ${active ? "text-gold" : "text-muted-foreground"}`} />
        <span className={active ? "text-gold" : ""}>{title}</span>
      </span>
      <span className="text-[10px] text-muted-foreground">{desc}</span>
    </button>
  );
}
