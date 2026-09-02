import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getPostById, getCreatorPostIds } from "@/lib/feed.functions";
import { deletePost } from "@/lib/posts.functions";
import { toggleLike } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import {
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  Pencil,
  RefreshCw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";
import { SITE_URL, SITE_NAME, buildPostTitle, buildPostDescription, absUrl } from "@/lib/seo";
import { resolveStorageUrl } from "@/lib/storage";

const postQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["post", id],
    queryFn: () => getPostById({ data: { id } }),
  });

export const Route = createFileRoute("/p/$id")({
  validateSearch: (search: Record<string, unknown>) => {
    const regenRaw = Number(search.regen);
    const regen = Number.isFinite(regenRaw) ? Math.min(Math.max(Math.trunc(regenRaw), 0), 2) : 0;
    return {
      new: search.new === "1" || search.new === 1 ? 1 : undefined,
      regen: regen || undefined,
    } as { new?: 1; regen?: number };
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(postQueryOptions(params.id)),
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/p/${params.id}`;
    const post = loaderData?.post;
    const creator = loaderData?.creator;
    if (!post) {
      return {
        meta: [
          { title: `Post not found — ${SITE_NAME}` },
          { name: "description", content: `This post is no longer available on ${SITE_NAME}.` },
          { name: "robots", content: "noindex" },
          { property: "og:url", content: url },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const handle = creator?.handle ?? null;
    const title = buildPostTitle(post.title, handle);
    const description = buildPostDescription({
      description: post.description,
      type: post.type as "audio" | "video",
      handle,
      tags: post.tags,
    });
    const image = post.cover_url ? absUrl(post.cover_url) : null;
    const isVideo = post.type === "video";
    const ogType = isVideo ? "video.other" : "music.song";
    const keywords = [...(post.tags ?? []), ...(post.ai_tools ?? []), "AI music", SITE_NAME]
      .filter(Boolean)
      .join(", ");

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    ];
    if (image) {
      meta.push({ property: "og:image", content: image });
      meta.push({ property: "og:image:alt", content: post.title });
      meta.push({ name: "twitter:image", content: image });
    }
    if (isVideo) {
      meta.push({ property: "og:video", content: absUrl(post.media_url) });
      meta.push({ property: "og:video:type", content: "video/mp4" });
    } else {
      meta.push({ property: "og:audio", content: absUrl(post.media_url) });
      meta.push({ property: "og:audio:type", content: "audio/mpeg" });
      if (creator?.display_name) meta.push({ property: "music:musician", content: creator.display_name });
    }
    if (creator?.handle) meta.push({ name: "author", content: `@${creator.handle}` });

    const creatorPerson = creator
      ? {
          "@type": "Person",
          name: creator.display_name ?? `@${creator.handle}`,
          alternateName: `@${creator.handle}`,
          url: `${SITE_URL}/u/${creator.handle}`,
        }
      : undefined;

    const mediaSchema = {
      "@context": "https://schema.org",
      "@type": isVideo ? "VideoObject" : "MusicRecording",
      name: post.title,
      description,
      url,
      ...(image ? { thumbnailUrl: image, image } : {}),
      contentUrl: absUrl(post.media_url),
      uploadDate: post.created_at,
      ...(post.duration_seconds
        ? { duration: `PT${Math.round(post.duration_seconds)}S` }
        : {}),
      ...(post.tags?.length ? { genre: post.tags, keywords: post.tags.join(", ") } : {}),
      ...(creatorPerson ? { creator: creatorPerson, author: creatorPerson } : {}),
      interactionStatistic: [
        { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: post.like_count ?? 0 },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/CommentAction", userInteractionCount: post.comment_count ?? 0 },
        { "@type": "InteractionCounter", interactionType: isVideo ? "https://schema.org/WatchAction" : "https://schema.org/ListenAction", userInteractionCount: post.view_count ?? 0 },
      ],
    };

    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(creator
          ? [{ "@type": "ListItem", position: 2, name: `@${creator.handle}`, item: `${SITE_URL}/u/${creator.handle}` }]
          : []),
        { "@type": "ListItem", position: creator ? 3 : 2, name: post.title, item: url },
      ],
    };

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(mediaSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(postQueryOptions(id));
  if (!data.post) {
    return (
      <AppShell>
        <div className="grid h-dvh place-items-center text-sm text-muted-foreground">Post not found.</div>
      </AppShell>
    );
  }
  return <PostContent post={data.post} creator={data.creator} />;
}

function PostContent({
  post: p,
  creator,
}: {
  post: {
    id: string;
    creator_id: string;
    type: string;
    media_url: string;
    cover_url: string | null;
    title: string;
    description: string | null;
    tags: string[] | null;
    like_count: number;
    comment_count: number;
  };
  creator: { id: string; handle: string; display_name: string | null; avatar_url: string | null } | null;
}) {
  const search = Route.useSearch();
  const like = toggleLike;
  const removePost = deletePost;
  const siblingsFn = getCreatorPostIds;
  const { user } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [regenBusy, setRegenBusy] = useState(false);

  const mediaUrl = resolveStorageUrl(p.media_url);
  const coverUrl = resolveStorageUrl(p.cover_url);
  const isOwner = !!user && user.id === p.creator_id;
  const justPosted = search.new === 1 && isOwner;
  const regenCount = search.regen ?? 0;
  const regensLeft = Math.max(0, 2 - regenCount);

  const { data: siblings } = useSuspenseQuery({
    queryKey: ["creator-post-ids", p.creator_id],
    queryFn: () => siblingsFn({ data: { creatorId: p.creator_id } }),
  });
  const ids = siblings?.ids ?? [];
  const idx = ids.indexOf(p.id);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null;

  useEffect(() => {
    setAudioEl(audioRef.current);
  }, [p.id, p.type, mediaUrl]);

  // Autoplay muted on load (browser policy); unmute button enables sound.
  useEffect(() => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el || !mediaUrl) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      el.muted = true;
      el.volume = volume;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    if (el.readyState >= 2) start();
    else el.addEventListener("canplay", start, { once: true });

    return () => {
      cancelled = true;
      el.removeEventListener("canplay", start);
      el.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.id, p.type, mediaUrl]);

  useEffect(() => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    el.muted = muted;
    el.volume = volume;
    if (!muted) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [muted, volume, p.type]);

  const unmuteAndPlay = async (vol = 1) => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el) return;
    setMuted(false);
    setVolume(vol);
    el.muted = false;
    el.volume = vol;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const regenerate = async () => {
    if (regensLeft <= 0) return;
    if (!confirm("Delete this post and start over?")) return;
    setRegenBusy(true);
    try {
      await removePost({ data: { id: p.id } });
      navigate({ to: "/upload", search: { regen: regenCount + 1 } });
    } catch (e) {
      toast.error((e as Error).message);
      setRegenBusy(false);
    }
  };

  const togglePlay = async () => {
    const el = p.type === "video" ? videoRef.current : audioRef.current;
    if (!el || !mediaUrl) return;

    if (!el.paused) {
      el.pause();
      setPlaying(false);
      return;
    }

    // User gesture — start with sound unless they explicitly muted.
    if (volume > 0) {
      el.muted = false;
      setMuted(false);
    }
    el.volume = volume;

    try {
      await el.play();
      setPlaying(true);
    } catch {
      el.muted = true;
      setMuted(true);
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
        toast.error("Could not play this file — check your connection and try again.");
      }
    }
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: p.title, text: p.description ?? undefined, url }).catch(() => {});
    else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  const doLike = async () => {
    if (!user) return navigate({ to: "/login" });
    try {
      await like({ data: { postId: p.id } });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <AppShell>
      <div className="relative h-[70dvh] w-full overflow-hidden bg-black">
        {p.type === "video" ? (
          <video
            ref={videoRef}
            src={mediaUrl || undefined}
            poster={coverUrl || undefined}
            crossOrigin="anonymous"
            preload="metadata"
            playsInline
            loop
            muted={muted}
            className="h-full w-full object-contain bg-black"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setPlaying(false);
              toast.error("Could not load video — try refreshing.");
            }}
          />
        ) : (
          <>
            <audio
              ref={audioRef}
              src={mediaUrl || undefined}
              crossOrigin="anonymous"
              preload="metadata"
              loop
              muted={muted}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                toast.error("Could not load audio — try refreshing.");
              }}
            />
            <AudioVisualizer
              audio={audioEl}
              playing={playing}
              coverUrl={coverUrl || p.cover_url}
            />
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 z-10"
              aria-label={playing ? "Pause" : "Play"}
            />
          </>
        )}

        {!playing && (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-black/40 backdrop-blur">
              <Play className="h-7 w-7 text-white" />
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={(e) => {
            e.stopPropagation();
            if (muted) void unmuteAndPlay(1);
            else setMuted(true);
          }}
          className="absolute left-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur"
        >
          {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-4 top-[3.75rem] z-30 flex h-24 w-9 flex-col items-center justify-center rounded-full bg-black/40 px-1 py-2 backdrop-blur"
        >
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = Number.parseFloat(e.target.value);
              if (v === 0) {
                setMuted(true);
                setVolume(0);
                return;
              }
              void unmuteAndPlay(v);
            }}
            aria-label="Volume"
            className="h-20 w-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[var(--gold)] [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
          />
        </div>
      </div>

      <div className="px-5 py-5">
        {justPosted && (
          <div className="mb-5 rounded-lg border border-gold/40 bg-gradient-to-br from-card/80 to-card/40 p-4">
            <div className="flex items-center gap-2 text-sm text-gold">
              <CheckCircle2 className="h-4 w-4" /> Posted! Preview it above.
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Happy with it? Send it to the feed. Or tweak the details, or start over.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                onClick={() => navigate({ to: "/" })}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_18px_-6px_var(--gold)]"
              >
                <ArrowRight className="h-3.5 w-3.5" /> Continue to feed
              </button>
              <button
                onClick={() => navigate({ to: "/upload" })}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-card"
              >
                <Pencil className="h-3.5 w-3.5" /> Back to edit
              </button>
              {p.type !== "video" && (
                <button
                  onClick={regenerate}
                  disabled={regenBusy || regensLeft <= 0}
                  title={regensLeft <= 0 ? "No regenerations left" : `${regensLeft} regeneration${regensLeft === 1 ? "" : "s"} left`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-foreground hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${regenBusy ? "animate-spin" : ""}`} />{" "}
                  {regenBusy
                    ? "Removing…"
                    : regensLeft <= 0
                      ? "No regens left"
                      : `Regenerate (${regensLeft} left)`}
                </button>
              )}
            </div>
            {p.type !== "video" && regensLeft <= 0 && (
              <p className="mt-2 text-[10px] text-muted-foreground">
                You've used all 2 regenerations for this attempt. Continue to feed or edit instead.
              </p>
            )}
          </div>
        )}
        <h1 className="text-xl tracking-tight">{p.title}</h1>
        {creator && (
          <Link to="/u/$handle" params={{ handle: creator.handle }} className="mt-1 inline-block text-sm text-gold">
            @{creator.handle}
          </Link>
        )}
        {p.description && <p className="mt-3 text-sm text-foreground/90">{p.description}</p>}
        {p.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t: string) => (
              <span key={t} className="rounded-full bg-card px-2 py-0.5 text-[11px] text-muted-foreground">
                #{t}
              </span>
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
        {(prevId || nextId) && (
          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              onClick={() => prevId && navigate({ to: "/p/$id", params: { id: prevId } })}
              disabled={!prevId}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Newer
            </button>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {idx + 1} / {ids.length}
            </span>
            <button
              onClick={() => nextId && navigate({ to: "/p/$id", params: { id: nextId } })}
              disabled={!nextId}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Older <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      <CommentsSheet postId={showComments ? p.id : null} open={showComments} onClose={() => setShowComments(false)} />
    </AppShell>
  );
}
