import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { getFeed, searchAll } from "@/lib/feed.functions";
import { useAuth } from "@/lib/auth";
import { Search, Play } from "lucide-react";
import bgLoop from "@/assets/bg-loop.mp4.asset.json";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — AlgoRhythm" },
      { name: "description", content: "Discover trending AI-made tracks, music videos, and creators on AlgoRhythm." },
      { property: "og:title", content: "Discover — AlgoRhythm" },
      { property: "og:description", content: "Trending AI music and creators on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/discover" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/discover" }],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const fetchFeed = useServerFn(getFeed);
  const search = useServerFn(searchAll);
  const { user } = useAuth();
  const [q, setQ] = useState("");

  const { data: trending } = useQuery({
    queryKey: ["trending", user?.id ?? null],
    queryFn: () => fetchFeed({ data: { limit: 24, viewerId: user?.id ?? null } }),
  });
  const { data: results } = useQuery({
    queryKey: ["search", q],
    queryFn: () => search({ data: { q } }),
    enabled: q.trim().length > 1,
  });

  return (
    <AppShell>
      <div className="relative px-5 pt-6">
        <BackgroundVideo />
        <h1 className="text-2xl tracking-tight text-gradient-gold">Discover</h1>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search creators, tracks, tags"
            className="w-full rounded-md border border-border bg-card px-9 py-2.5 text-sm outline-none focus:border-gold/50" />
        </div>

        {q.trim().length > 1 ? (
          <section className="mt-6 space-y-6">
            {results?.profiles && results.profiles.length > 0 && (
              <div>
                <h2 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Creators</h2>
                <ul className="space-y-2">
                  {results.profiles.map((p) => (
                    <li key={p.id}>
                      <Link to="/u/$handle" params={{ handle: p.handle }} className="flex items-center gap-3 rounded-md border border-border bg-card/85 p-3">
                        <Avatar url={p.avatar_url} name={p.display_name} />
                        <div className="text-sm">
                          <div className="font-medium">@{p.handle}</div>
                          <div className="text-xs text-muted-foreground">{p.display_name}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <PostGrid posts={results?.posts ?? []} />
          </section>
        ) : (
          <section className="mt-6">
            <h2 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Trending</h2>
            <PostGrid posts={trending?.items ?? []} />
          </section>
        )}
      </div>
    </AppShell>
  );
}

function BackgroundVideo() {
  return (
    <>
    <video
      src={bgLoop.url}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-20"
    />
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-background/70" />
    </>
  );
}

function PostGrid({ posts }: { posts: Array<{ id: string; title: string; cover_url: string | null; type: string; media_url?: string | null }> }) {
  if (posts.length === 0) return <p className="text-sm text-muted-foreground">Nothing yet.</p>;
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {posts.map((p) => {
        const isVideo = p.type === "video";
        return (
          <Link key={p.id} to="/p/$id" params={{ id: p.id }} className="relative aspect-[3/4] overflow-hidden rounded-md bg-card">
            {p.cover_url ? (
              <img src={p.cover_url} alt={p.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : isVideo && p.media_url ? (
              <video src={`${p.media_url}#t=0.1`} preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-card to-background" />
            )}
            {isVideo && (
              <div className="pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur">
                <Play className="h-2.5 w-2.5 fill-white text-white" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <div className="line-clamp-2 text-[11px] text-white">{p.title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  if (url) return <img src={url} alt={name} className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30" />;
  return <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-sm font-bold text-primary-foreground">{name.slice(0, 1).toUpperCase()}</div>;
}