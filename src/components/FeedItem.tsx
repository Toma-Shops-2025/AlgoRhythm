import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2, Play, Volume2, VolumeX, Gift, MoreVertical, Bookmark } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { Watermark } from "./Logo";
import { TipDialog } from "./TipDialog";
import { ReportDialog } from "./ReportDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { recordPlayback } from "@/lib/playback.functions";

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
  save_count?: number;
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
  saved,
  onLike,
  onFollow,
  onComment,
  onSave,
  muted,
  onToggleMute,
}: {
  post: FeedPost;
  active: boolean;
  liked: boolean;
  following: boolean;
  saved: boolean;
  onLike: () => void;
  onFollow: () => void;
  onComment: () => void;
  onSave: () => void;
  muted: boolean;
  onToggleMute: () => void;
  autoAdvance?: boolean;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [tipOpen, setTipOpen] = useState(false);
  const [reportPostOpen, setReportPostOpen] = useState(false);
  const [reportUserOpen, setReportUserOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const track = useServerFn(recordPlayback);
  const playStartRef = useRef<number | null>(null);
  const reportedPlayRef = useRef(false);
  const reportedCompleteRef = useRef(false);
  const loopsRef = useRef(0);

  useEffect(() => {
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
      // Flush accumulated listen time when leaving the item
      if (playStartRef.current && reportedPlayRef.current) {
        const listenedMs = Date.now() - playStartRef.current;
        if (listenedMs > 1500) {
          track({ data: { postId: post.id, event: "play", listenedMs } }).catch(() => {});
        }
        playStartRef.current = null;
      }
      el.pause();
      setPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, post.type, muted]);

  // Apply volume changes live without restarting playback.
  useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume, post.type]);

  // Fire "play" once after 2s of active listening, then "complete"/"loop" as they happen.
  useEffect(() => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (!active) return;
      if (!reportedPlayRef.current && el.currentTime >= 2) {
        reportedPlayRef.current = true;
        track({ data: { postId: post.id, event: "play" } }).catch(() => {});
      }
      if (
        !reportedCompleteRef.current &&
        el.duration > 0 &&
        el.currentTime / el.duration >= 0.9
      ) {
        reportedCompleteRef.current = true;
        track({ data: { postId: post.id, event: "complete" } }).catch(() => {});
      }
    };
    const onSeekedToStart = () => {
      // Loop event: a loop=true element resets to ~0 when it wraps around.
      if (!active) return;
      if (el.currentTime < 0.5 && reportedCompleteRef.current) {
        if (autoAdvance) {
          onEnded?.();
          return;
        }
        loopsRef.current += 1;
        if (loopsRef.current <= 5) {
          track({ data: { postId: post.id, event: "loop" } }).catch(() => {});
        }
        reportedCompleteRef.current = false;
      }
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("seeking", onSeekedToStart);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("seeking", onSeekedToStart);
    };
  }, [active, post.id, post.type, track]);

  const togglePlay = () => {
    const el = post.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/p/${post.id}` : `/p/${post.id}`;
  const creatorHandle = post.creator?.handle ?? "creator";
  const baseTags = (post.tags ?? []).slice(0, 3).map((t) => `#${t.replace(/\s+/g, "")}`).join(" ");
  const caption = `${post.title} — by @${creatorHandle} on AlgoRhythm 🎧\n${shareUrl}\n${baseTags} #AlgoRhythm #AIMusic`.trim();

  const openShare = async () => {
    const isMobile =
      typeof navigator !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, text: caption, url: shareUrl });
        return;
      } catch {
        /* user dismissed — fall through to sheet */
      }
    }
    setShareOpen(true);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <section className="relative h-dvh w-full snap-start overflow-hidden bg-black">
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

      {/* tap-to-toggle-play overlay (kept below all controls) */}
      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 z-10"
        aria-label="Toggle play"
      />

      {/* dark gradient for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

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
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
        className="absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* volume slider — sits just under the mute button */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-4 top-[3.75rem] z-20 flex h-24 w-9 flex-col items-center justify-center rounded-full bg-black/40 px-1 py-2 backdrop-blur"
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (v > 0 && muted) onToggleMute();
          }}
          aria-label="Volume"
          className="h-20 w-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[var(--gold)] [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
        />
      </div>

      {/* right action rail */}
      <div className="pointer-events-auto absolute bottom-28 right-3 z-30 flex flex-col items-center gap-5 text-white">
        <ActionButton onClick={onLike} count={post.like_count + (liked ? 1 : 0)} active={liked}>
          <Heart className={cn("h-7 w-7", liked && "fill-current text-rose-400")} />
        </ActionButton>
        <ActionButton onClick={onComment} count={post.comment_count}>
          <MessageCircle className="h-7 w-7" />
        </ActionButton>
        <ActionButton
          ariaLabel={saved ? "Remove from library" : "Save to library"}
          onClick={onSave}
          count={(post.save_count ?? 0) + (saved ? 1 : 0)}
          active={saved}
        >
          <Bookmark className={cn("h-7 w-7", saved && "fill-current text-gold")} />
        </ActionButton>
        {post.creator && user?.id !== post.creator.id && (
          <ActionButton
            ariaLabel="Tip creator"
            onClick={() => {
              if (!user) return navigate({ to: "/login" });
              setTipOpen(true);
            }}
          >
            <Gift className="h-7 w-7 text-gold" />
          </ActionButton>
        )}
        <ActionButton onClick={openShare} ariaLabel="Share post">
          <Share2 className="h-7 w-7" />
        </ActionButton>
        {user && post.creator && user.id !== post.creator.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More options"
                className="flex flex-col items-center gap-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur">
                  <MoreVertical className="h-6 w-6" />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="left"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem onSelect={() => setReportUserOpen(true)}>
                Report creator
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setReportPostOpen(true)}>
                Report post
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-rose-400 focus:text-rose-400"
                onSelect={() =>
                  post.creator &&
                  navigate({ to: "/u/$handle", params: { handle: post.creator.handle } })
                }
              >
                Block creator
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* bottom meta */}
      <div className="absolute inset-x-0 bottom-24 z-20 px-5 pb-2 pr-24 text-white">
        <div className="flex items-center gap-3 flex-wrap">
          {post.creator && (
            <button
              onClick={() => {
                if (!user) return navigate({ to: "/welcome" });
                navigate({ to: "/u/$handle", params: { handle: post.creator!.handle } });
              }}
              className="flex items-center gap-2"
            >
              <Avatar url={post.creator.avatar_url} name={post.creator.display_name} />
              <div className="leading-tight text-left">
                <div className="text-sm font-medium">@{post.creator.handle}</div>
                <div className="text-[11px] text-white/70">{post.creator.display_name}</div>
              </div>
            </button>
          )}
          {!following && post.creator && (
            <button onClick={(e) => { e.stopPropagation(); onFollow(); }}
              className="rounded-full border border-gold/60 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gold">
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
      {post.creator && (
        <TipDialog
          open={tipOpen}
          onOpenChange={setTipOpen}
          creatorId={post.creator.id}
          creatorName={post.creator.display_name}
          postId={post.id}
        />
      )}
      <ReportDialog
        open={reportPostOpen}
        onOpenChange={setReportPostOpen}
        targetType="post"
        targetId={post.id}
      />
      {post.creator && (
        <ReportDialog
          open={reportUserOpen}
          onOpenChange={setReportUserOpen}
          targetType="user"
          targetId={post.creator.id}
        />
      )}
      <Sheet open={shareOpen} onOpenChange={setShareOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl border-border bg-card">
          <SheetHeader>
            <SheetTitle className="text-left text-base">Share this track</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            <ShareRow
              label="Copy link"
              sub={shareUrl}
              onClick={() => copy(shareUrl, "Link")}
            />
            <ShareRow
              label="Copy caption for TikTok / Reels / Shorts"
              sub="Pre-formatted with title, @creator, link, and tags"
              onClick={() => copy(caption, "Caption")}
            />
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40"
              onClick={() => setShareOpen(false)}
            >
              <div className="font-medium">Share to X / Twitter</div>
              <div className="text-xs text-muted-foreground">Opens the composer pre-filled</div>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40"
              onClick={() => setShareOpen(false)}
            >
              <div className="font-medium">Share to Facebook</div>
              <div className="text-xs text-muted-foreground">Opens the share dialog</div>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-background/50 p-3 text-sm hover:border-gold/40"
              onClick={() => setShareOpen(false)}
            >
              <div className="font-medium">Send via WhatsApp</div>
              <div className="text-xs text-muted-foreground">Opens WhatsApp with the link</div>
            </a>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            Tip: the AlgoRhythm watermark on the visualizer travels with every screen-recording, so
            shares always point friends back to the original.
          </p>
        </SheetContent>
      </Sheet>
    </section>
  );
}

function ActionButton({
  children, count, onClick, active, ariaLabel,
}: { children: React.ReactNode; count?: number; onClick: () => void; active?: boolean; ariaLabel?: string }) {
  return (
    <button aria-label={ariaLabel} onClick={(e) => { e.stopPropagation(); onClick(); }} className="flex flex-col items-center gap-1">
      <span className={cn("grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur", active && "bg-rose-500/15")}>
        {children}
      </span>
      {count !== undefined && <span className="text-[11px] tabular-nums">{formatCount(count)}</span>}
    </button>
  );
}

function ShareRow({
  label, sub, onClick,
}: { label: string; sub: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full rounded-lg border border-border bg-background/50 p-3 text-left text-sm hover:border-gold/40"
    >
      <div className="font-medium">{label}</div>
      <div className="line-clamp-1 text-xs text-muted-foreground">{sub}</div>
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