import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { getProfileByHandle } from "@/lib/feed.functions";
import { toggleFollow } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/u/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.handle} — AlgoRhythm` },
      { name: "description", content: `AI-made music and videos by @${params.handle} on AlgoRhythm.` },
      { property: "og:title", content: `@${params.handle} on AlgoRhythm` },
      { property: "og:description", content: `AI music and videos by @${params.handle}.` },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { handle } = Route.useParams();
  const fetch = useServerFn(getProfileByHandle);
  const follow = useServerFn(toggleFollow);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["profile", handle],
    queryFn: () => fetch({ data: { handle } }),
  });

  const onFollow = async () => {
    if (!user) return navigate({ to: "/login" });
    if (!data?.profile) return;
    try { await follow({ data: { targetUserId: data.profile.id } }); refetch(); }
    catch (e) { toast.error((e as Error).message); }
  };

  if (!data) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading…</div></AppShell>;
  if (!data.profile) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Profile not found.</div></AppShell>;

  const p = data.profile;
  return (
    <AppShell>
      <div className="px-5 pt-6">
        <div className="flex items-center gap-4">
          {p.avatar_url ? (
            <img src={p.avatar_url} className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/40" alt={p.display_name} />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground">
              {p.display_name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="text-lg font-medium">{p.display_name}</div>
            <div className="text-sm text-gold">@{p.handle}</div>
          </div>
          {user?.id !== p.id && (
            <button onClick={onFollow} className="rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground">
              Follow
            </button>
          )}
        </div>
        <div className="mt-5 flex items-center gap-6 text-sm">
          <Stat label="Posts" v={p.post_count} />
          <Stat label="Followers" v={p.follower_count} />
          <Stat label="Following" v={p.following_count} />
        </div>
        {p.bio && <p className="mt-3 text-sm text-foreground/90">{p.bio}</p>}

        <div className="mt-6 grid grid-cols-3 gap-1.5 pb-12">
          {data.posts.map((post) => (
            <Link key={post.id} to="/p/$id" params={{ id: post.id }} className="relative aspect-[3/4] overflow-hidden rounded-md bg-card">
              {post.cover_url ? (
                <img src={post.cover_url} className="absolute inset-0 h-full w-full object-cover" alt={post.title} />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-card to-background" />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                <div className="line-clamp-2 text-[10px] text-white">{post.title}</div>
              </div>
            </Link>
          ))}
          {data.posts.length === 0 && (
            <p className="col-span-3 py-8 text-center text-sm text-muted-foreground">No posts yet.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, v }: { label: string; v: number }) {
  return (
    <div className="text-center">
      <div className="text-lg font-medium tabular-nums">{v}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}