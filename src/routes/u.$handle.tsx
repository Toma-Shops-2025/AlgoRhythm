import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useRef } from "react";
import { AppShell } from "@/components/AppShell";
import { TipDialog } from "@/components/TipDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReportDialog } from "@/components/ReportDialog";
import { PostGridItem } from "@/components/PostGridItem";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
import { getProfileByHandle } from "@/lib/feed.functions";
import { toggleFollow, getMyInteractions } from "@/lib/social.functions";
import { toggleBlock } from "@/lib/safety.functions";
import { updatePost, deletePost } from "@/lib/posts.functions";
import { createCreatorSubCheckout } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useCreatorSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/lib/auth";
import { Gift, Sparkles, Flag, Ban, ArrowLeft, Pencil, Trash2, Loader2, Grid3x3, LayoutList } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
    if (!profile) return { meta: [{ title: `Profile not found — ${SITE_NAME}` }] };
    const displayName = profile.display_name ?? params.handle;
    const title = buildProfileTitle(displayName, profile.handle);
    const description = buildProfileDescription({ displayName, handle: profile.handle, bio: profile.bio, postCount: profile.post_count });
    const image = profile.avatar_url ? absUrl(profile.avatar_url) : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", title },
        { property: "og:description", content: description },
        { property: "og:type", "content": "profile" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
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
  const editPost = useServerFn(updatePost);
  const removePost = useServerFn(deletePost);
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tipOpen, setTipOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "feed">("grid");
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);

  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editPinned, setEditPinned] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [postBusy, setPostBusy] = useState(false);

  const { data, refetch } = useSuspenseQuery(profileQueryOptions(handle));
  const { isSubscribed } = useCreatorSubscription(data?.profile?.id);

  const { data: interactions, refetch: refetchInteractions } = useQuery({
    queryKey: ["profile-follow", user?.id, data?.profile?.id],
    queryFn: () => interactionsFn({ data: { postIds: [], creatorIds: [data!.profile!.id] } }),
    enabled: !!user && !!data?.profile && user.id !== data.profile.id,
  });
  const isFollowing = !!interactions?.followingIds?.includes(data?.profile?.id ?? "");

  const onFollow = async () => {
    if (!user) return navigate({ to: "/welcome" });
    try {
      const res = await follow({ data: { targetUserId: data.profile!.id } });
      toast.success(res.following ? `Following @${data.profile!.handle}` : `Unfollowed @${data.profile!.handle}`);
      await Promise.all([refetch(), refetchInteractions()]);
    } catch (e) { toast.error((e as Error).message); }
  };

  const savePostEdit = async () => {
    if (!editingPost) return;
    setPostBusy(true);
    try {
      const tagList = editTags.split(/[,\s]+/).map((t) => t.replace(/^#/, "").trim().toLowerCase()).filter(Boolean).slice(0, 12);
      await editPost({ data: { id: editingPost.id, title: editTitle.trim(), description: editDesc, tags: tagList, pinned_comment: editPinned.trim() || null } as any });
      toast.success("Post updated");
      refetch();
      setEditingPost(null);
    } catch (e) { toast.error((e as Error).message); }
    finally { setPostBusy(false); }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setPostBusy(true);
    try {
      await removePost({ data: { id: deletingId } });
      toast.success("Post deleted");
      refetch();
      setDeletingId(null);
    } catch (e) { toast.error((e as Error).message); }
    finally { setPostBusy(false); }
  };

  if (!data.profile) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Profile not found.</div></AppShell>;
  const p = data.profile;
  const isOwner = user?.id === p.id;

  if (viewMode === "feed") {
    return (
      <AppShell>
        <div className="relative h-dvh w-full overflow-hidden bg-black">
          <header className="absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]">
            <button onClick={() => setViewMode("grid")} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"><ArrowLeft className="h-5 w-5" /></button>
            <div className="flex-1 text-center"><p className="font-medium text-sm text-white drop-shadow">@{p.handle}'s Posts</p></div>
            <div className="w-9" />
          </header>
          <div className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
            {data.posts.map((post, idx) => (
              <div key={post.id} className="h-full w-full snap-start relative">
                <FeedItem post={{ ...post, creator: p } as any} active={idx === activeIdx} liked={false} following={isFollowing} saved={false} onLike={() => {}} onFollow={() => {}} onComment={() => setCommentsFor(post.id)} onSave={() => {}} muted={muted} onToggleMute={() => setMuted(!muted)} />
                {isOwner && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
                    <button onClick={() => { setEditingPost(post); setEditTitle(post.title); setEditDesc((post as any).description || ""); setEditTags((post as any).tags?.map((t: string) => `#${t}`).join(" ") || ""); setEditPinned((post as any).pinned_comment || ""); }} className="h-10 w-10 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur border border-white/20"><Pencil className="h-5 w-5" /></button>
                    <button onClick={() => setDeletingId(post.id)} className="h-10 w-10 grid place-items-center rounded-full bg-black/40 text-destructive backdrop-blur border border-destructive/20"><Trash2 className="h-5 w-5" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <CommentsSheet postId={commentsFor} open={!!commentsFor} onClose={() => setCommentsFor(null)} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <div className="flex items-center gap-4">
          {p.avatar_url ? <img src={p.avatar_url} className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/40" alt={p.display_name} /> : <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground">{p.display_name.slice(0, 1).toUpperCase()}</div>}
          <div className="flex-1"><h1 className="text-lg font-medium">{p.display_name}</h1><div className="text-sm text-gold">@{p.handle}</div></div>
          {!isOwner && <button onClick={onFollow} className={isFollowing ? "rounded-full border border-gold/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold" : "rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground"}>{isFollowing ? "Following" : "Follow"}</button>}
        </div>
        <div className="mt-5 flex items-center gap-6 text-sm"><Stat label="Posts" v={p.post_count} /><Stat label="Followers" v={p.follower_count} /><Stat label="Following" v={p.following_count} /></div>
        {p.bio && <p className="mt-3 text-sm text-foreground/90">{p.bio}</p>}
        <div className="mt-6 grid grid-cols-3 gap-1.5 pb-12">
          {data.posts.map((post, i) => <PostGridItem key={post.id} post={post} onClick={() => { setActiveIdx(i); setViewMode("feed"); }} />)}
          {data.posts.length === 0 && <p className="col-span-3 py-8 text-center text-sm text-muted-foreground">No posts yet.</p>}
        </div>
      </div>
      <Dialog open={!!editingPost} onOpenChange={(o) => !o && setEditingPost(null)}>
        <DialogContent><DialogHeader><DialogTitle>Edit post</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Title</Label><Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></div>
            <div><Label>Caption</Label><Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={3} /></div>
            <div><Label>Tags</Label><Input value={editTags} onChange={(e) => setEditTags(e.target.value)} placeholder="#chill #beats" /></div>
            <div><Label>Pinned Comment</Label><Textarea value={editPinned} onChange={(e) => setEditPinned(e.target.value)} placeholder="Pin a message to the top..." rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button><Button onClick={savePostEdit} disabled={postBusy} className="bg-gradient-gold text-primary-foreground">{postBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete post?</AlertDialogTitle><AlertDialogDescription>This is permanent.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive text-white">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
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
