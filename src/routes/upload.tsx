import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useServerFn } from "@tanstack/react-start";
import { createPost } from "@/lib/posts.functions";
import { generateCoverImage, generateMusicVideoScenes } from "@/lib/ai.functions";
import { audioToVideo, audioToMusicVideo, b64ToFile, loadImageFromB64 } from "@/lib/audioToVideo";
import { AppShell } from "@/components/AppShell";
import { toast } from "sonner";
import { Music, Film, Image as ImageIcon, Loader2, Sparkles, Video as VideoIcon, Wand2 } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Post — AlgoRhythm" },
      { name: "description", content: "Upload your AI-made track or music video to the AlgoRhythm feed." },
      { property: "og:title", content: "Post to AlgoRhythm" },
      { property: "og:description", content: "Publish your AI music or video to the AlgoRhythm feed." },
      { property: "og:url", content: "https://myalgorhythm.lovable.app/upload" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.lovable.app/upload" }],
  }),
  component: UploadPage,
});

function UploadPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const post = useServerFn(createPost);
  const genCover = useServerFn(generateCoverImage);
  const genScenes = useServerFn(generateMusicVideoScenes);

  const [media, setMedia] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [aiTools, setAiTools] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [convertToVideo, setConvertToVideo] = useState(false);
  const [videoMode, setVideoMode] = useState<"visualizer" | "music_video">("visualizer");
  const [scenePrompt, setScenePrompt] = useState("");

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
    const prompt = title.trim() || description.trim() || tags.trim();
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
        if (videoMode === "visualizer" && cover) {
          setBusyLabel("Rendering your video…");
          const blob = await audioToVideo(media, cover);
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, { type: "video/webm" });
          postType = "video";
        } else if (videoMode === "music_video") {
          const prompt = (scenePrompt.trim() || title.trim() || description.trim());
          if (!prompt) throw new Error("Add a title or scene description so the AI knows what to imagine");
          setBusyLabel("Imagining scenes with AI…");
          const { images } = await genScenes({ data: { prompt, count: 5 } });
          setBusyLabel("Editing your music video…");
          const imgs = await Promise.all(images.map((b) => loadImageFromB64(b)));
          const blob = await audioToMusicVideo(media, imgs);
          mediaFile = new File([blob], `${crypto.randomUUID()}.webm`, { type: "video/webm" });
          postType = "video";
          if (!derivedCover) {
            derivedCover = b64ToFile(images[0], `cover-${Date.now()}.png`, "image/png");
          }
        }
      }

      setBusyLabel("Uploading…");
      const mediaUrl = await uploadTo("media", mediaFile);
      const coverUrl = derivedCover ? await uploadTo("covers", derivedCover) : null;
      setBusyLabel("Publishing…");
      const { post: row } = await post({
        data: {
          type: postType,
          mediaUrl,
          coverUrl,
          title: title.trim(),
          description: description.trim() || undefined,
          tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 10),
          aiTools: aiTools.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10),
        },
      });
      toast.success("Posted");
      navigate({ to: "/p/$id", params: { id: row.id } });
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
            accept="audio/*,video/*,.mp3,.m4a,.aac,.wav,.flac,.ogg,.oga,.opus,.aiff,.aif,.wma,.mp4,.mov,.m4v,.webm,.mkv,.avi"
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
            <div className="space-y-3 rounded-md border border-gold/20 bg-card/30 p-3">
              <div className="grid grid-cols-2 gap-2">
                <ModeOption
                  active={videoMode === "visualizer"}
                  onClick={() => setVideoMode("visualizer")}
                  icon={VideoIcon}
                  title="Visualizer"
                  desc="Cover + reactive bars"
                />
                <ModeOption
                  active={videoMode === "music_video"}
                  onClick={() => setVideoMode("music_video")}
                  icon={Wand2}
                  title="AI music video"
                  desc="Cinematic scenes, edited"
                />
              </div>
              {videoMode === "music_video" && (
                <Field label="Scene direction (optional)">
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={scenePrompt}
                    onChange={(e) => setScenePrompt(e.target.value)}
                    placeholder="e.g. neon-soaked Tokyo streets at midnight, lone biker, slow motion rain"
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50"
                  />
                  <span className="mt-1 block text-[11px] text-muted-foreground">
                    Leave blank to use your title and description. 5 cinematic scenes are generated and edited to the audio.
                  </span>
                </Field>
              )}
              {videoMode === "visualizer" && !cover && (
                <p className="text-[11px] text-muted-foreground">Pick or generate a cover image above to use as the visualizer background.</p>
              )}
            </div>
          )}

          <Field label="Title">
            <input required maxLength={140} value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>
          <Field label="Description">
            <textarea rows={3} maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold/50" />
          </Field>
          <Field label="Tags (comma separated)">
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
      className={`flex flex-col items-start gap-1 rounded-md border p-3 text-left transition ${
        active ? "border-gold bg-gold/10 text-foreground" : "border-border bg-card/40 text-muted-foreground hover:border-gold/40"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-gold" : ""}`} />
      <span className="text-sm text-foreground">{title}</span>
      <span className="text-[11px] text-muted-foreground">{desc}</span>
    </button>
  );
}