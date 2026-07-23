import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

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

  // DIRECT CLIENT-SIDE FETCH (Reliable like ViralSnap)
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["feed", "direct"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      console.log("Feed: Fetching page", pageParam);
      const pageSize = 12;
      const { data: posts, error: postError } = await supabase
        .from("posts")
        .select(`
            *,
            creator:profiles!posts_creator_id_fkey (
                id, handle, display_name, avatar_url
            )
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (postError) throw postError;
      return {
          items: posts || [],
          nextPage: pageParam + 1,
          hasMore: (posts || []).length === pageSize
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const basePosts = useMemo(() => {
    return (data?.pages.flatMap((page) => page.items) ?? []) as unknown as FeedPost[];
  }, [data]);

  // Track active video
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

  // Load more
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (active >= basePosts.length - 2) fetchNextPage();
  }, [active, basePosts.length, hasNextPage, isFetchingNextPage]);

  if (error) {
      return (
          <AppShell>
              <div className="grid h-dvh place-items-center bg-black p-8 text-center">
                  <div>
                      <h2 className="text-xl text-red-500 font-bold mb-2">Connection Error</h2>
                      <p className="text-white/40 text-sm">{(error as any).message}</p>
                      <button onClick={() => window.location.reload()} className="mt-4 bg-primary px-6 py-2 rounded-full font-bold">Retry</button>
                  </div>
              </div>
          </AppShell>
      );
  }

  return (
    <AppShell>
      <div
        ref={containerRef}
        className="h-dvh snap-y snap-mandatory overflow-y-scroll bg-black"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading && (
          <div className="grid h-dvh place-items-center text-sm text-muted-foreground italic animate-pulse">Loading viral tracks...</div>
        )}

        {!isLoading && basePosts.length === 0 && (
          <div className="grid h-dvh place-items-center px-8 text-center">
            <div>
              <h2 className="text-2xl text-gradient-gold font-black italic uppercase">The Feed is Cold</h2>
              <p className="mt-2 text-sm text-white/40 font-bold uppercase tracking-widest">No posts found in the database.</p>
              <a href="/upload" className="mt-8 inline-block rounded-full bg-gradient-gold px-8 py-3 text-sm font-black text-black uppercase">Post Something</a>
            </div>
          </div>
        )}

        {basePosts.map((post, idx) => (
          <div key={`${post.id}-${idx}`} data-feed-item data-idx={idx}>
            <FeedItem
              post={post}
              active={idx === active}
              liked={false} // Will restore social sync once feed is back
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
