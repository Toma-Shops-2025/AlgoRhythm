import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TipDialog } from "@/components/TipDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReportDialog } from "@/components/ReportDialog";
import { PostGridItem } from "@/components/PostGridItem";
import { getProfileByHandle } from "@/lib/feed.functions";
import { toggleFollow, getMyInteractions } from "@/lib/social.functions";
import { toggleBlock } from "@/lib/safety.functions";
import { createCreatorSubCheckout } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useCreatorSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/lib/auth";
import { Gift, Sparkles, Flag, Ban } from "lucide-react";
import { toast } from "sonner";
import { SITE_URL, SITE_NAME, buildProfileTitle, buildProfileDescription, absUrl } from "@/lib/seo";

const profileQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ["profile", handle],
    queryFn: () => getProfileByHandle({ data: { handle } }),
  });

export const Route = createFileRoute("/u/$handle")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(profileQueryOptions(params.handle)),
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/u/${params.handle}`;
    const profile = loaderData?.profile;
    if (!profile) {
      return {
        meta: [
          { title: `Profile not found — ${SITE_NAME}` },
          { name: "description", content: `No creator with handle @${params.handle} on ${SITE_NAME}.` },
          { name: "robots", content: "noindex" },
          { property: "og:url", content: url },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const displayName = profile.display_name ?? params.handle;
    const title = buildProfileTitle(displayName, profile.handle);
    const description = buildProfileDescription({
      displayName,
      handle: profile.handle,
      bio: profile.bio,
      postCount: profile.post_count,
    });
    const image = profile.avatar_url ? absUrl(profile.avatar_url) : null;

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { name: "author", content: `@${profile.handle}` },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "profile:username", content: profile.handle },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    ];
    if (image) {
      meta.push({ property: "og:image", content: image });
      meta.push({ property: "og:image:alt", content: displayName });
      meta.push({ name: "twitter:image", content: image });
    }

    const sameAs = Array.isArray((profile as { links?: unknown }).links)
      ? ((profile as { links: unknown[] }).links.filter((l): l is string => typeof l === "string"))
      : [];

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: displayName,
        alternateName: `@${profile.handle}`,
        url,
        ...(image ? { image } : {}),
        ...(profile.bio ? { description: profile.bio } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
    };

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema) }],
    };
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { handle } = Route.useParams();
  const follow = useServerFn(toggleFollow);
  const interactionsFn = useServerFn(getMyInteractions);
  const subFn = useServerFn(createCreatorSubCheckout);
  const blockFn = useServerFn(toggleBlock);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tipOpen, setTipOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const { data, refetch } = useSuspenseQuery(profileQueryOptions(handle));
  const { isSubscribed } = useCreatorSubscription(data?.profile?.id);

  const { data: interactions, refetch: refetchInteractions } = useQuery({
    queryKey: ["profile-follow", user?.id, data?.profile?.id],
    queryFn: () =>
      interactionsFn({ data: { postIds: [], creatorIds: [data!.profile!.id] } }),
    enabled: !!user && !!data?.profile && user.id !== data.profile.id,
  });
  const isFollowing = !!interactions?.followingIds?.includes(data?.profile?.id ?? "");
  const [followBusy, setFollowBusy] = useState(false);

  const onFollow = async () => {
    if (!user) return navigate({ to: "/login" });
    if (!data?.profile) return;
    setFollowBusy(true);
    try {
      const res = await follow({ data: { targetUserId: data.profile.id } });
      toast.success(res.following ? `Following @${data.profile.handle}` : `Unfollowed @${data.profile.handle}`);
      await Promise.all([refetch(), refetchInteractions()]);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setFollowBusy(false);
    }
  };

  const onBlock = async () => {
    if (!user) return navigate({ to: "/login" });
    if (!data?.profile) return;
    if (!confirm(`Block @${data.profile.handle}? You won't see their content and they can't follow or comment on yours.`)) return;
    try {
      const res = await blockFn({ data: { targetUserId: data.profile.id } });
      toast.success(res.blocked ? "User blocked" : "User unblocked");
      refetch();
    } catch (e) { toast.error((e as Error).message); }
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
            <button
              onClick={onFollow}
              disabled={followBusy}
              className={
                isFollowing
                  ? "rounded-full border border-gold/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold disabled:opacity-60"
                  : "rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
              }
            >
              {isFollowing ? "Following" : "Follow"}
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
        {!isOwner && (
          <div className="mt-2 flex gap-2 text-[11px] text-muted-foreground">
            <button onClick={() => setReportOpen(true)} className="inline-flex items-center gap-1 hover:text-foreground">
              <Flag className="h-3 w-3" /> Report
            </button>
            <span>·</span>
            <button onClick={onBlock} className="inline-flex items-center gap-1 hover:text-destructive">
              <Ban className="h-3 w-3" /> Block
            </button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-1.5 pb-12">
          {data.posts.map((post) => (
            <PostGridItem key={post.id} post={post} />
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
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        targetType="user"
        targetId={p.id}
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