import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getPostById, getCreatorPostIds } from "@/lib/feed.functions";
import { deletePost } from "@/lib/posts.functions";
import { toggleLike } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2, ArrowRight, Pencil, RefreshCw, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { SITE_URL, SITE_NAME, buildPostTitle, buildPostDescription, absUrl } from "@/lib/seo";

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
  const search = Route.useSearch();
  const like = useServerFn(toggleLike);
  const removePost = useServerFn(deletePost);
  const siblingsFn = useServerFn(getCreatorPostIds);
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [regenBusy, setRegenBusy] = useState(false);

  const { data } = useSuspenseQuery(postQueryOptions(id));
  if (!data.post) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Post not found.</div></AppShell>;
  const p = data.post;
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

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: p.title, text: p.description ?? undefined, url }).catch(() => {});
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
