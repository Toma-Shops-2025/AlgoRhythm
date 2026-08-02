import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: FeedPage,
});

/** Fisher–Yates shuffle helper */
function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate a random seed once per session to maintain consistent "random" order during paging
  const [sessionSeed] = useState(() => Math.floor(Math.random() * 1000));

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["feed", "shuffled", sessionSeed],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 12;

      // 1. Get total count to calculate a random offset
      const { count } = await supabase
        .from("posts")
        .select("*", { count: 'exact', head: true })
        .eq("is_published", true);

      const total = count || 0;

      // Calculate a random starting point based on the seed
      // This ensures that page 1 follows page 0 logically within the same session
      const seedOffset = (sessionSeed % Math.max(1, total - pageSize));
      const effectiveOffset = (seedOffset + (pageParam * pageSize)) % Math.max(1, total);

      // 2. Fetch posts using the calculated offset
      const { data: posts, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .range(effectiveOffset, effectiveOffset + pageSize - 1);

      if (postError) throw postError;
      if (!posts || posts.length === 0) return { items: [], nextPage: pageParam + 1, hasMore: false };

      // 3. Fetch creators
      const creatorIds = Array.from(new Set(posts.map(p => p.creator_id)));
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, handle, display_name, avatar_url")
        .in("id", creatorIds);

      const profileMap = new Map((profiles || []).map(p => [p.id, p]));

      // 4. Attach creator info and SHUFFLE the individual page for extra variety
      const items = shuffle(posts.map(p => ({
          ...p,
          creator: profileMap.get(p.creator_id) || { display_name: "Creator", handle: "user", avatar_url: null }
      })));

      return {
          items,
          nextPage: pageParam + 1,
          hasMore: total > (pageParam + 1) * pageSize
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const basePosts = useMemo(() => {
    return (data?.pages.flatMap((page) => page.items) ?? []) as unknown as FeedPost[];
  }, [data]);

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
                      <button onClick={() => window.location.reload()} className="mt-8 bg-primary text-black px-10 py-3 rounded-full font-black uppercase text-xs shadow-glow">Retry Sync</button>
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
              <p className="mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">Connect to the grid to start syncing.</p>
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
              onToggleMute={() => setMuted((m) => !m)}
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
