import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getFeed } from "@/lib/feed.functions";
import { toggleLike, toggleFollow, getMyInteractions } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed — AlgoRhythm" },
      { name: "description", content: "The vertical feed for AI-made music and music videos." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const fetchFeed = useServerFn(getFeed);
  const fetchInteractions = useServerFn(getMyInteractions);
  const like = useServerFn(toggleLike);
  const follow = useServerFn(toggleFollow);
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: () => fetchFeed({ data: {} }),
  });

  const posts: FeedPost[] = useMemo(
    () => (data?.items ?? []) as unknown as FeedPost[],
    [data],
  );

  const { data: me } = useQuery({
    queryKey: ["interactions", user?.id, posts.map((p) => p.id).join(",")],
    queryFn: () =>
      fetchInteractions({
        data: {
          postIds: posts.map((p) => p.id),
          creatorIds: Array.from(new Set(posts.map((p) => p.creator_id))),
        },
      }),
    enabled: !!user && posts.length > 0,
  });

  const likedIds = new Set(me?.likedPostIds ?? []);
  const followingIds = new Set(me?.followingIds ?? []);

  // track which item is on screen
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.7) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { root, threshold: [0.7] },
    );
    root.querySelectorAll<HTMLElement>("[data-feed-item]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [posts]);

  const onLike = async (post: FeedPost) => {
    if (!user) { navigate({ to: "/login" }); return; }
    try {
      const res = await like({ data: { postId: post.id } });
      qc.setQueryData(["interactions", user.id, posts.map((p) => p.id).join(",")], (old: { likedPostIds: string[]; followingIds: string[] } | undefined) => ({
        likedPostIds: res.liked
          ? [...(old?.likedPostIds ?? []), post.id]
          : (old?.likedPostIds ?? []).filter((id) => id !== post.id),
        followingIds: old?.followingIds ?? [],
      }));
    } catch (e) { toast.error((e as Error).message); }
  };

  const onFollow = async (post: FeedPost) => {
    if (!user) { navigate({ to: "/login" }); return; }
    if (!post.creator) return;
    try {
      await follow({ data: { targetUserId: post.creator.id } });
      qc.invalidateQueries({ queryKey: ["interactions", user.id] });
      toast.success(`Following @${post.creator.handle}`);
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <AppShell>
      <div
        ref={containerRef}
        className="h-dvh snap-y snap-mandatory overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading && (
          <div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading the feed…</div>
        )}
        {!isLoading && posts.length === 0 && (
          <div className="grid h-dvh place-items-center px-8 text-center">
            <div>
              <h2 className="text-2xl text-gradient-gold">The feed is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">Be the first to drop a track or a video.</p>
              <a href="/upload" className="mt-5 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-primary-foreground">Post something</a>
            </div>
          </div>
        )}
        {posts.map((post, idx) => (
          <div key={post.id} data-feed-item data-idx={idx}>
            <FeedItem
              post={post}
              active={idx === active}
              liked={likedIds.has(post.id)}
              following={post.creator ? followingIds.has(post.creator.id) : false}
              onLike={() => onLike(post)}
              onFollow={() => onFollow(post)}
              onComment={() => setCommentsFor(post.id)}
              muted={muted}
              onToggleMute={() => setMuted((m) => !m)}
            />
          </div>
        ))}
      </div>
      <CommentsSheet postId={commentsFor} open={!!commentsFor} onClose={() => setCommentsFor(null)} />
    </AppShell>
  );
}