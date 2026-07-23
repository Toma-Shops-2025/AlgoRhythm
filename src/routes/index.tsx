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

function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["feed", "direct-split"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 12;

      // 1. Fetch posts only (Bypass relationship check)
      const { data: posts, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (postError) throw postError;
      if (!posts || posts.length === 0) return { items: [], nextPage: pageParam + 1, hasMore: false };

      // 2. Fetch creators for these specific posts manually
      const creatorIds = Array.from(new Set(posts.map(p => p.creator_id)));
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, handle, display_name, avatar_url")
        .in("id", creatorIds);

      const profileMap = new Map((profiles || []).map(p => [p.id, p]));

      // 3. Attach creator info manually
      const items = posts.map(p => ({
          ...p,
          creator: profileMap.get(p.creator_id) || { display_name: "Creator", handle: "user", avatar_url: null }
      }));

      return {
          items,
          nextPage: pageParam + 1,
          hasMore: posts.length === pageSize
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
      <div ref={containerRef} className="h-dvh snap-y snap-mandatory overflow-y-scroll bg-black" style={{ scrollbarWidth: "none" }}>
        {isLoading && (
          <div className="grid h-dvh place-items-center text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic animate-pulse">Initializing Feed...</div>
        )}

        {!isLoading && basePosts.length === 0 && (
          <div className="grid h-dvh place-items-center px-8 text-center">
            <div>
              <h2 className="text-3xl text-gradient-gold font-black italic uppercase tracking-tighter">Feed Empty</h2>
              <p className="mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">Your 141 posts are waiting in the database.</p>
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
      </div>
      <CommentsSheet postId={commentsFor} open={!!commentsFor} onClose={() => setCommentsFor(null)} />
    </AppShell>
  );
}
