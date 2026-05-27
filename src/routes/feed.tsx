import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getFeed } from "@/lib/feed.functions";
import { toggleLike, toggleFollow, getMyInteractions } from "@/lib/social.functions";
import { toggleSave } from "@/lib/saves.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed — AlgoRhythm" },
      { name: "description", content: "The vertical feed for AI-made music and music videos." },
      { property: "og:title", content: "Feed — AlgoRhythm" },
      { property: "og:description", content: "Swipe through AI-made tracks and music videos from creators worldwide." },
      { property: "og:url", content: "https://myalgorhythm.online/feed" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/feed" }],
  }),
  component: FeedPage,
});

function FeedPage() {
  const fetchFeed = useServerFn(getFeed);
  const fetchInteractions = useServerFn(getMyInteractions);
  const like = useServerFn(toggleLike);
  const follow = useServerFn(toggleFollow);
  const save = useServerFn(toggleSave);
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const [cycles, setCycles] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  // Shuffle seed regenerated on every visit so the order changes each time.
  const [shuffleSeed] = useState(() => Math.random());

  const { data, isLoading } = useQuery({
    queryKey: ["feed", user?.id ?? null],
    queryFn: () => fetchFeed({ data: { viewerId: user?.id ?? null } }),
  });

  const basePosts: FeedPost[] = useMemo(() => {
    const items = (data?.items ?? []) as unknown as FeedPost[];
    // Fisher–Yates shuffle, seeded so it's stable across re-renders in the same visit.
    let s = Math.floor(shuffleSeed * 1_000_000) + 1;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }, [data, shuffleSeed]);

  // Endless feed: repeat the available posts as the user approaches the end.
  // Each cycle reshuffles so it doesn't feel like the same scroll twice.
  const posts: FeedPost[] = useMemo(() => {
    if (basePosts.length === 0) return [];
    const out: FeedPost[] = [...basePosts];
    for (let c = 1; c < cycles; c++) {
      const shuffled = [...basePosts]
        .map((p) => ({ p, k: Math.sin(c * 9301 + basePosts.indexOf(p) * 49297) }))
        .sort((a, b) => a.k - b.k)
        .map((x, i) => ({ ...x.p, id: `${x.p.id}__c${c}_${i}` } as FeedPost));
      out.push(...shuffled);
    }
    return out;
  }, [basePosts, cycles]);

  // Map cycled IDs back to the original post id for interactions
  const realId = (id: string) => id.split("__c")[0];

  const { data: me } = useQuery({
    queryKey: ["interactions", user?.id, basePosts.map((p) => p.id).join(",")],
    queryFn: () =>
      fetchInteractions({
        data: {
          postIds: basePosts.map((p) => p.id),
          creatorIds: Array.from(new Set(basePosts.map((p) => p.creator_id))),
        },
      }),
    enabled: !!user && basePosts.length > 0,
  });

  const likedIds = new Set(me?.likedPostIds ?? []);
  const followingIds = new Set(me?.followingIds ?? []);
  const savedIds = new Set(me?.savedPostIds ?? []);

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

  // Append another cycle as the viewer nears the end so the feed never stops.
  useEffect(() => {
    if (basePosts.length === 0) return;
    if (active >= posts.length - 3) setCycles((c) => c + 1);
  }, [active, posts.length, basePosts.length]);

  const onLike = async (post: FeedPost) => {
    if (!user) { navigate({ to: "/login" }); return; }
    try {
      const pid = realId(post.id);
      const res = await like({ data: { postId: pid } });
      qc.setQueryData(["interactions", user.id, basePosts.map((p) => p.id).join(",")], (old: { likedPostIds: string[]; followingIds: string[] } | undefined) => ({
        likedPostIds: res.liked
          ? [...(old?.likedPostIds ?? []), pid]
          : (old?.likedPostIds ?? []).filter((id) => id !== pid),
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

  const onSave = async (post: FeedPost) => {
    if (!user) { navigate({ to: "/login" }); return; }
    try {
      const pid = realId(post.id);
      const res = await save({ data: { postId: pid } });
      qc.setQueryData(["interactions", user.id, basePosts.map((p) => p.id).join(",")], (old: { likedPostIds: string[]; followingIds: string[]; savedPostIds: string[] } | undefined) => ({
        likedPostIds: old?.likedPostIds ?? [],
        followingIds: old?.followingIds ?? [],
        savedPostIds: res.saved
          ? [...(old?.savedPostIds ?? []), pid]
          : (old?.savedPostIds ?? []).filter((id) => id !== pid),
      }));
      toast.success(res.saved ? "Saved to your library" : "Removed from library");
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <AppShell>
      <h1 className="sr-only">AI Music and Video Feed</h1>
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
              post={{ ...post, id: realId(post.id) }}
              active={idx === active}
              liked={likedIds.has(realId(post.id))}
              following={post.creator ? followingIds.has(post.creator.id) : false}
              saved={savedIds.has(realId(post.id))}
              onLike={() => onLike(post)}
              onFollow={() => onFollow(post)}
              onComment={() => setCommentsFor(realId(post.id))}
              onSave={() => onSave(post)}
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