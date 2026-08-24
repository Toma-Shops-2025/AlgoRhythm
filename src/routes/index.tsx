import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { getBlockedCreatorIds } from "@/lib/blocked-creators";
import { fetchShuffledFeedPage } from "@/lib/shuffled-feed";
import { newSessionSeed } from "@/lib/shuffle";

export const Route = createFileRoute("/")({
  component: FeedPage,
});

function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const unmuteFeed = () => {
    setMuted(false);
    setVolume(1);
  };

  const toggleMute = () => {
    if (muted) unmuteFeed();
    else setMuted(true);
  };

  const setFeedVolume = (v: number) => {
    setVolume(v);
    if (v > 0) setMuted(false);
    else setMuted(true);
  };

  // New seed every app open → full-library shuffle starts on a different post.
  const [sessionSeed] = useState(() => newSessionSeed());

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["feed", "shuffled", sessionSeed],
      initialPageParam: 0,
      staleTime: 30_000,
      retry: 1,
      queryFn: async ({ pageParam = 0 }) => {
        const withTimeout = <T,>(promise: PromiseLike<T>, ms = 12_000): Promise<T> =>
          Promise.race([
            Promise.resolve(promise),
            new Promise<T>((_, reject) =>
              window.setTimeout(
                () => reject(new Error("Feed timed out — check connection and try again")),
                ms,
              ),
            ),
          ]);
        return withTimeout(fetchShuffledFeedPage(pageParam, sessionSeed));
      },
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    });

  const [blockedTick, setBlockedTick] = useState(0);
  useEffect(() => {
    setBlockedTick((t) => t + 1);
    const onFocus = () => setBlockedTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const basePosts = useMemo(() => {
    const blocked = new Set(getBlockedCreatorIds());
    return ((data?.pages.flatMap((page) => page.items) ?? []) as unknown as FeedPost[]).filter(
      (p) => !blocked.has(p.creator_id),
    );
  }, [data, blockedTick]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || basePosts.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll<HTMLElement>("[data-feed-item]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [basePosts]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (active >= basePosts.length - 2) fetchNextPage();
  }, [active, basePosts.length, hasNextPage, isFetchingNextPage]);

  if (error) {
      return (
          <AppShell>
              <div className="grid h-dvh place-items-center bg-black p-8 text-center">
                  <div>
                      <h2 className="text-xl text-red-500 font-bold mb-2 tracking-tighter uppercase italic">Sync Error</h2>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{(error as any).message}</p>
                      <button onClick={() => refetch()} className="mt-8 bg-primary text-black px-10 py-3 rounded-full font-black uppercase text-xs shadow-glow">Retry Sync</button>
                  </div>
              </div>
          </AppShell>
      );
  }

  return (
    <AppShell>
      <div ref={containerRef} className="h-dvh snap-y snap-mandatory overflow-y-scroll bg-black no-scrollbar" style={{ scrollbarWidth: "none" }}>
        {isLoading && (
          <div className="grid h-dvh place-items-center text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic animate-pulse">Initializing Feed...</div>
        )}

        {!isLoading && basePosts.length === 0 && (
          <div className="grid h-dvh place-items-center px-8 text-center">
            <div>
              <h2 className="text-3xl text-gradient-gold font-black italic uppercase tracking-tighter">Feed Empty</h2>
              <p className="mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">Upload a track or video — your post goes live instantly on Supabase Storage.</p>
              <a href="/upload" className="mt-8 inline-block rounded-full bg-gradient-gold px-8 py-3 text-sm font-black text-black uppercase shadow-glow">Create First Post</a>
            </div>
          </div>
        )}

        {basePosts.map((post, idx) => (
          <div key={`${post.id}-${idx}`} data-feed-item data-idx={idx}>
            <FeedItem
              post={post}
              active={idx === active}
              liked={false}
              following={false}
              saved={false}
              onLike={() => {}}
              onFollow={() => {}}
              onComment={() => setCommentsFor(post.id)}
              onSave={() => {}}
              muted={muted}
              volume={volume}
              onUnmute={unmuteFeed}
              onMute={() => setMuted(true)}
              onVolumeChange={setFeedVolume}
            />
          </div>
        ))}
        {isFetchingNextPage && (
            <div className="h-20 w-full flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-primary h-6 w-6" />
            </div>
        )}
      </div>
      <CommentsSheet postId={commentsFor} open={!!commentsFor} onClose={() => setCommentsFor(null)} />
    </AppShell>
  );
}

function Loader2(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    )
}
