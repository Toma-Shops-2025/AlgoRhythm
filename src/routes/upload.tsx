import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useServerFn } from "@tanstack/react-start";
import { createPost } from "@/lib/posts.functions";
import { AppShell } from "@/components/AppShell";
import { toast } from "sonner";
import { Music, Film, Image as ImageIcon, Loader2 } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Post — AlgoRhythm" }] }),
  component: UploadPage,
});

function UploadPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const post = useServerFn(createPost);

  const [media, setMedia] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [aiTools, setAiTools] = useState("");
  const [busy, setBusy] = useState(false);

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!media || !type) return toast.error("Pick an audio or video file");
    if (type === "audio" && !cover) return toast.error("Audio posts need a cover image");
    setBusy(true);
    try {
      const mediaUrl = await uploadTo("media", media);
      const coverUrl = cover ? await uploadTo("covers", cover) : null;
      const { post: row } = await post({
        data: {
          type,
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
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 pt-6">
        <h1 className="text-2xl tracking-tight text-gradient-gold">New post</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Audio or video. AI-made.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <FilePick label="Media (audio or video)" icon={type === "video" ? Film : Music} accept="audio/*,video/*" file={media} onChange={setMedia} />
          {type === "audio" && (
            <FilePick label="Cover image" icon={ImageIcon} accept="image/*" file={cover} onChange={setCover} />
          )}
          {type === "video" && (
            <FilePick label="Cover image (optional)" icon={ImageIcon} accept="image/*" file={cover} onChange={setCover} />
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
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Publish to the feed
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