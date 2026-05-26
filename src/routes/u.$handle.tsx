import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TipDialog } from "@/components/TipDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { getProfileByHandle } from "@/lib/feed.functions";
import { toggleFollow } from "@/lib/social.functions";
import { createCreatorSubCheckout } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useCreatorSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/lib/auth";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/u/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.handle} — AlgoRhythm` },
      { name: "description", content: `AI-made music and videos by @${params.handle} on AlgoRhythm.` },
      { property: "og:title", content: `@${params.handle} on AlgoRhythm` },
      { property: "og:description", content: `AI music and videos by @${params.handle}.` },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `https://myalgorhythm.lovable.app/u/${params.handle}` },
      { property: "profile:username", content: params.handle },
    ],
    links: [{ rel: "canonical", href: `https://myalgorhythm.lovable.app/u/${params.handle}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: params.handle,
          alternateName: `@${params.handle}`,
          url: `https://myalgorhythm.lovable.app/u/${params.handle}`,
        }),
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { handle } = Route.useParams();
  const fetch = useServerFn(getProfileByHandle);
  const follow = useServerFn(toggleFollow);
  const subFn = useServerFn(createCreatorSubCheckout);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tipOpen, setTipOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["profile", handle],
    queryFn: () => fetch({ data: { handle } }),
  });
  const { isSubscribed } = useCreatorSubscription(data?.profile?.id);

  const onFollow = async () => {
    if (!user) return navigate({ to: "/login" });
    if (!data?.profile) return;
    try { await follow({ data: { targetUserId: data.profile.id } }); refetch(); }
    catch (e) { toast.error((e as Error).message); }
  };

  const fetchSubSecret = subOpen && data?.profile ? async () => {
    const res = await subFn({
      data: {
        creatorId: data.profile!.id,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      },
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;

  if (!data) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading…</div></AppShell>;
  if (!data.profile) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Profile not found.</div></AppShell>;

  const p = data.profile;
  const isOwner = user?.id === p.id;
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
            <h1 className="text-lg font-medium">{p.display_name}</h1>
            <div className="text-sm text-gold">@{p.handle}</div>
          </div>
          {!isOwner && (
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

        {!isOwner && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => { if (!user) return navigate({ to: "/login" }); setSubOpen(true); }}
              disabled={isSubscribed}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isSubscribed ? "Subscribed" : "Subscribe $4.99/mo"}
            </button>
            <button
              onClick={() => { if (!user) return navigate({ to: "/login" }); setTipOpen(true); }}
              className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-gold"
            >
              <Gift className="h-3.5 w-3.5" /> Send a tip
            </button>
          </div>
        )}

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
      <TipDialog
        open={tipOpen}
        onOpenChange={setTipOpen}
        creatorId={p.id}
        creatorName={p.display_name}
      />
      <CheckoutDialog
        open={subOpen}
        onOpenChange={setSubOpen}
        title={`Subscribe to ${p.display_name}`}
        fetchClientSecret={fetchSubSecret}
      />
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