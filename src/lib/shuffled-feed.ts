import { supabase } from "@/integrations/supabase/client";
import { isPlayablePost } from "@/lib/storage";
import { sliceShuffledPage } from "@/lib/shuffle";

export type FeedPostRow = {
  id: string;
  creator_id: string;
  is_published: boolean;
  created_at: string;
  media_url?: string | null;
  cover_url?: string | null;
  type?: string | null;
  [key: string]: unknown;
};

export type FeedPostItem = FeedPostRow & {
  creator: {
    id?: string;
    display_name: string;
    handle: string;
    avatar_url: string | null;
  };
};

const FEED_PAGE_SIZE = 12;
const BATCH = 500;

const libraryCache = new Map<number, FeedPostRow[]>();

async function fetchAllPublishedPosts(): Promise<FeedPostRow[]> {
  const rows: FeedPostRow[] = [];
  for (let from = 0; ; from += BATCH) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(from, from + BATCH - 1);
    if (error) throw error;
    const batch = (data ?? []) as FeedPostRow[];
    rows.push(...batch);
    if (batch.length < BATCH) break;
  }
  return rows;
}

async function getPublishedLibrary(): Promise<FeedPostRow[]> {
  const hit = libraryCache.get(0);
  if (hit) return hit;

  const all = await fetchAllPublishedPosts();
  const playable = all.filter(isPlayablePost);
  const base = playable.length > 0 ? playable : all;
  libraryCache.set(0, base);
  return base;
}

async function attachCreators(posts: FeedPostRow[]): Promise<FeedPostItem[]> {
  if (posts.length === 0) return [];
  const creatorIds = [...new Set(posts.map((p) => p.creator_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, handle, display_name, avatar_url")
    .in("id", creatorIds);
  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

  return posts.map((p) => ({
    ...p,
    creator: profileMap.get(p.creator_id) || {
      display_name: "Creator",
      handle: "user",
      avatar_url: null,
    },
  }));
}

/** Shuffle per lap; each full pass through the library gets a new order. */
export async function fetchShuffledFeedPage(page: number, seed: number) {
  const library = await getPublishedLibrary();
  const { slice, hasMore } = sliceShuffledPage(library, seed, page, FEED_PAGE_SIZE);
  return {
    items: await attachCreators(slice),
    nextPage: page + 1,
    hasMore,
  };
}
