import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { Watermark } from "./Logo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type FeedPost = {
  id: string;
  creator_id: string;
  type: string;
  media_url: string;
  cover_url: string | null;
  title: string;
  description: string | null;
  tags: string[];
  like_count: number;
  comment_count: number;
  creator: {
    id: string;
    handle: string;
    display_name: string;
    avatar_url: string | null;
  } | null;
};

export function FeedItem({
  post,
  active,
  liked,
  following,
  onLike,
  onFollow,
  onComment,
  muted,
  onToggleMute,
}: {
  post: FeedPost;
  active: boolean;
  liked: boolean;
  following: boolean;
  onLike: () => void;
  onFollow: () => void;
  onComment: () => void;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.muted = muted;
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [active, post.type, muted]);

  const togglePlay = () => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };

  const share = async () => {
    const url = `${window.location.origin}/p/${post.id}`;
    try {
      if (navigator.share) await navigator.share({ title: post.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch { /* user dismissed */ }
  };

  return (
    <section className="relative h-dvh w-full snap-start overflow-hidden bg-black">
      <button onClick={togglePlay} className="absolute inset-0 z-10" aria-label="Toggle play" />

      {post.type === "video" ? (
        <video
          ref={videoRef}
          src={post.media_url}
          poster={post.cover_url ?? undefined}
          playsInline
          loop
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <audio ref={audioRef} src={post.media_url} loop crossOrigin="anonymous" />
          <AudioVisualizer audio={audioRef.current} playing={playing && active} coverUrl={post.cover_url} />
        </>
      )}

      {/* dark gradient for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* play hint */}
      {!playing && active && (
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-black/40 backdrop-blur">
            <Play className="h-7 w-7 text-white" />
          </div>
        </div>
      )}

      {/* watermark */}
      <div className="absolute right-4 top-4 z-20"><Watermark /></div>

      {/* mute */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
        className="absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* right action rail */}
      <div className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-5 text-white">
        <ActionButton onClick={onLike} count={post.like_count + (liked ? 1 : 0)} active={liked}>
          <Heart className={cn("h-7 w-7", liked && "fill-current text-rose-400")} />
        </ActionButton>
        <ActionButton onClick={onComment} count={post.comment_count}>
          <MessageCircle className="h-7 w-7" />
        </ActionButton>
        <ActionButton onClick={share}>
          <Share2 className="h-7 w-7" />
        </ActionButton>
      </div>

      {/* bottom meta */}
      <div className="absolute inset-x-0 bottom-24 z-20 px-5 pb-2 text-white">
        <div className="flex items-center gap-3">
          {post.creator && (
            <Link to="/u/$handle" params={{ handle: post.creator.handle }} className="flex items-center gap-2">
              <Avatar url={post.creator.avatar_url} name={post.creator.display_name} />
              <div className="leading-tight">
                <div className="text-sm font-medium">@{post.creator.handle}</div>
                <div className="text-[11px] text-white/70">{post.creator.display_name}</div>
              </div>
            </Link>
          )}
          {!following && post.creator && (
            <button onClick={(e) => { e.stopPropagation(); onFollow(); }}
              className="ml-auto rounded-full border border-gold/60 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gold">
              Follow
            </button>
          )}
        </div>
        <h2 className="mt-3 text-base font-medium">{post.title}</h2>
        {post.description && <p className="mt-1 line-clamp-2 text-sm text-white/80">{post.description}</p>}
        {post.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ActionButton({
  children, count, onClick, active,
}: { children: React.ReactNode; count?: number; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="flex flex-col items-center gap-1">
      <span className={cn("grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur", active && "bg-rose-500/15")}>
        {children}
      </span>
      {count !== undefined && <span className="text-[11px] tabular-nums">{formatCount(count)}</span>}
    </button>
  );
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  if (url) return <img src={url} alt={name} className="h-9 w-9 rounded-full object-cover ring-1 ring-gold/40" />;
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary-foreground">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function formatCount(n: number) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
}