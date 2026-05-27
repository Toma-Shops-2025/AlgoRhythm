import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth, signOut } from "@/lib/auth";
import { getMyProfile, updateMyProfile, deletePost, updatePost } from "@/lib/posts.functions";
import { PostGridItem } from "@/components/PostGridItem";
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
import { createPortalSession } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useProSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Settings, Plus, Crown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/me")({
  head: () => ({
    meta: [
      { title: "Your profile — AlgoRhythm" },
      { name: "description", content: "Manage your AlgoRhythm creator profile, posts, and account." },
      { property: "og:title", content: "Your profile — AlgoRhythm" },
      { property: "og:description", content: "Manage your creator profile on AlgoRhythm." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://myalgorhythm.online/me" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/me" }],
  }),
  component: MePage,
});

function MePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchMe = useServerFn(getMyProfile);
  const update = useServerFn(updateMyProfile);
  const removePost = useServerFn(deletePost);
  const editPost = useServerFn(updatePost);
  const portalFn = useServerFn(createPortalSession);
  const { isPro } = useProSubscription();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingPost, setEditingPost] = useState<{ id: string; title: string; description: string; tags: string } | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [postBusy, setPostBusy] = useState(false);

  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [loading, user, navigate]);

  const { data } = useQuery({
    queryKey: ["me", user?.id],
    queryFn: () => fetchMe({}),
    enabled: !!user,
  });

  useEffect(() => {
    if (data?.profile) { setDisplayName(data.profile.display_name); setBio(data.profile.bio ?? ""); }
  }, [data]);

  const onAvatar = async (file: File) => {
    if (!user) return;
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { contentType: file.type });
    if (error) return toast.error(error.message);
    const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    await update({ data: { avatar_url: url } });
    qc.invalidateQueries({ queryKey: ["me"] });
    toast.success("Avatar updated");
  };

  const save = async () => {
    setBusy(true);
    try {
      await update({ data: { display_name: displayName, bio } });
      qc.invalidateQueries({ queryKey: ["me"] });
      setEditing(false);
      toast.success("Saved");
    } catch (e) { toast.error((e as Error).message); }
    finally { setBusy(false); }
  };

  const manage = async () => {
    const res = await portalFn({
      data: { environment: getStripeEnvironment(), returnUrl: window.location.href },
    });
    if ("error" in res) return toast.error(res.error);
    window.open(res.url, "_blank");
  };

  const savePostEdit = async () => {
    if (!editingPost) return;
    setPostBusy(true);
    try {
      const tagList = editingPost.tags
        .split(/[,\s]+/)
        .map((t) => t.replace(/^#/, "").trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 12);
      await editPost({
        data: {
          id: editingPost.id,
          title: editingPost.title.trim(),
          description: editingPost.description,
          tags: tagList,
        },
      });
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["post", editingPost.id] });
      setEditingPost(null);
      toast.success("Post updated");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setPostBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingPostId) return;
    setPostBusy(true);
    try {
      await removePost({ data: { id: deletingPostId } });
      qc.invalidateQueries({ queryKey: ["me"] });
      setDeletingPostId(null);
      toast.success("Post deleted");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setPostBusy(false);
    }
  };

  if (!data?.profile) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading…</div></AppShell>;
  const p = data.profile;

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer">
              {p.avatar_url ? (
                <img src={p.avatar_url} className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/40" alt={p.display_name} />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground">
                  {p.display_name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAvatar(e.target.files[0])} />
            </label>
            <div>
              <h1 className="text-lg font-medium">{p.display_name}</h1>
              <div className="text-sm text-gold">@{p.handle}</div>
            </div>
          </div>
          <button aria-label="Sign out" onClick={() => signOut().then(() => navigate({ to: "/" }))}
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground">
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-6 text-sm">
          <Stat label="Posts" v={p.post_count} />
          <Stat label="Followers" v={p.follower_count} />
          <Stat label="Following" v={p.following_count} />
        </div>

        {isPro ? (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-gold" />
              <span>AlgoRhythm Pro</span>
            </div>
            <button onClick={manage} className="text-xs uppercase tracking-[0.18em] text-gold">
              Manage
            </button>
          </div>
        ) : (
          <Link to="/pricing"
            className="mt-5 flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
            <span className="flex items-center gap-2"><Crown className="h-4 w-4 text-gold" /> Go Pro</span>
            <span className="text-xs text-muted-foreground">From $4.99/mo →</span>
          </Link>
        )}

        {editing ? (
          <div className="mt-5 space-y-2">
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Bio"
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50" />
            <div className="flex gap-2">
              <button disabled={busy} onClick={save} className="flex-1 rounded-md bg-gradient-gold py-2 text-sm text-primary-foreground">Save</button>
              <button onClick={() => setEditing(false)} className="flex-1 rounded-md border border-border py-2 text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            {p.bio && <p className="mt-3 text-sm text-foreground/90">{p.bio}</p>}
            <button onClick={() => setEditing(true)} className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs">
              <Settings className="h-3.5 w-3.5" /> Edit profile
            </button>
          </>
        )}

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Your posts</h2>
          <Link to="/upload" className="inline-flex items-center gap-1 text-xs text-gold"><Plus className="h-3.5 w-3.5" /> New</Link>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5 pb-12">
          {data.posts.map((post) => (
            <PostGridItem
              key={post.id}
              post={post}
              isOwner
              onEdit={(pp) =>
                setEditingPost({
                  id: pp.id,
                  title: pp.title,
                  description: (post.description as string | null) ?? "",
                  tags: ((post.tags as string[] | null) ?? []).map((t) => `#${t}`).join(" "),
                })
              }
              onDelete={(pp) => setDeletingPostId(pp.id)}
            />
          ))}
          {data.posts.length === 0 && (
            <p className="col-span-3 py-8 text-center text-sm text-muted-foreground">No posts yet.</p>
          )}
        </div>
      </div>

      <Dialog open={!!editingPost} onOpenChange={(o) => !o && setEditingPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Title</label>
                <input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Caption</label>
                <textarea
                  rows={3}
                  value={editingPost.description}
                  onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Tags</label>
                <input
                  value={editingPost.tags}
                  onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value })}
                  placeholder="#chill #lofi"
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold/50"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={() => setEditingPost(null)}
              className="rounded-md border border-border px-3 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              disabled={postBusy}
              onClick={savePostEdit}
              className="rounded-md bg-gradient-gold px-3 py-2 text-sm text-primary-foreground disabled:opacity-60"
            >
              {postBusy ? "Saving…" : "Save"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingPostId} onOpenChange={(o) => !o && setDeletingPostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the post from your profile and the feed. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={postBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={postBusy}
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {postBusy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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