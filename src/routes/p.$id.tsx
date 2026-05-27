import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
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
import { SITE_URL, SITE_NAME, buildPostTitle, buildPostDescription, absUrl } from "@/lib/seo";

const postQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["post", id],
    queryFn: () => getPostById({ data: { id } }),
  });

export const Route = createFileRoute("/p/$id")({
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
  const like = useServerFn(toggleLike);
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { data } = useSuspenseQuery(postQueryOptions(id));
  if (!data.post) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Post not found.</div></AppShell>;
  const p = data.post;

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