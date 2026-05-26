import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getPostById } from "@/lib/feed.functions";
import { toggleLike } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/p/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `AlgoRhythm — track ${params.id.slice(0, 8)}` },
      { name: "description", content: "An AI-made track or video on AlgoRhythm." },
      { property: "og:title", content: "Listen on AlgoRhythm" },
      { property: "og:type", content: "music.song" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const fetch = useServerFn(getPostById);
  const like = useServerFn(toggleLike);
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { data } = useQuery({ queryKey: ["post", id], queryFn: () => fetch({ data: { id } }) });
  if (!data) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading…</div></AppShell>;
  if (!data.post) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Post not found.</div></AppShell>;
  const p = data.post;

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: p.title, url }).catch(() => {});
    else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
  };

  const doLike = async () => {
    if (!user) return navigate({ to: "/login" });
    try { await like({ data: { postId: p.id } }); } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <AppShell>
      <div className="relative h-[70dvh] w-full overflow-hidden bg-black" onClick={p.type === "audio" ? togglePlay : undefined}>
        {p.type === "video" ? (
          <video src={p.media_url} poster={p.cover_url ?? undefined} controls playsInline className="h-full w-full object-contain bg-black" />
        ) : (
          <>
            <audio ref={audioRef} src={p.media_url} crossOrigin="anonymous" />
            <AudioVisualizer audio={audioRef.current} playing={playing} coverUrl={p.cover_url} />
          </>
        )}
      </div>

      <div className="px-5 py-5">
        <h1 className="text-xl tracking-tight">{p.title}</h1>
        {data.creator && (
          <Link to="/u/$handle" params={{ handle: data.creator.handle }} className="mt-1 inline-block text-sm text-gold">
            @{data.creator.handle}
          </Link>
        )}
        {p.description && <p className="mt-3 text-sm text-foreground/90">{p.description}</p>}
        {p.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t: string) => (
              <span key={t} className="rounded-full bg-card px-2 py-0.5 text-[11px] text-muted-foreground">#{t}</span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center gap-3">
          <button onClick={doLike} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <Heart className="h-4 w-4" /> {p.like_count}
          </button>
          <button onClick={() => setShowComments(true)} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <MessageCircle className="h-4 w-4" /> {p.comment_count}
          </button>
          <button onClick={share} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
      <CommentsSheet postId={showComments ? p.id : null} open={showComments} onClose={() => setShowComments(false)} />
    </AppShell>
  );
}