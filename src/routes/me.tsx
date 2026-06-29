import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useMemo, useRef } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth, signOut } from "@/lib/auth";
import { getMyProfile, updateMyProfile, deletePost, updatePost } from "@/lib/posts.functions";
import { deleteAccount } from "@/lib/account.functions";
import { PostGridItem } from "@/components/PostGridItem";
import { FeedItem, type FeedPost } from "@/components/FeedItem";
import { CommentsSheet } from "@/components/CommentsSheet";
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
import { getMyLibrary } from "@/lib/saves.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useProSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Settings, Plus, Crown, Trash2, Camera, Bookmark, Grid3x3, ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";
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
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);
  const fetchMe = useServerFn(getMyProfile);
  const fetchLibrary = useServerFn(getMyLibrary);
  const update = useServerFn(updateMyProfile);
  const removePost = useServerFn(deletePost);
  const editPost = useServerFn(updatePost);
  const wipeAccount = useServerFn(deleteAccount);
  const portalFn = useServerFn(createPortalSession);
  const { isPro } = useProSubscription();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingPost, setEditingPost] = useState<{ id: string; title: string; description: string; tags: string; pinned_comment?: string } | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [postBusy, setPostBusy] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [accountBusy, setAccountBusy] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [tab, setTab] = useState<"posts" | "library">("posts");
  const [viewMode, setViewMode] = useState<"grid" | "feed">("grid");
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [loading, user, navigate]);

  const { data } = useQuery({
    queryKey: ["me", user?.id],
    queryFn: () => fetchMe({}),
    enabled: !!user,
  });

  const { data: library } = useQuery({
    queryKey: ["my-library", user?.id],
    queryFn: () => fetchLibrary({}),
    enabled: !!user && tab === "library",
  });

  useEffect(() => {
    if (data?.profile) { setDisplayName(data.profile.display_name); setBio(data.profile.bio ?? ""); }
  }, [data]);

  const shuffledLibrary = useMemo(() => {
    if (!library?.posts) return [];
    return [...library.posts].sort(() => Math.random() - 0.5);
  }, [library]);

  const feedItems = useMemo(() => {
    return tab === "posts" ? (data?.posts ?? []) : shuffledLibrary;
  }, [tab, data?.posts, shuffledLibrary]);

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
          pinned_comment: editingPost.pinned_comment?.trim() || null
        } as any,
      });
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["my-library"] });
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

  // Sync scroll position when entering feed mode
  useEffect(() => {
    if (viewMode === "feed" && feedContainerRef.current) {
      const target = feedContainerRef.current.children[activeIdx] as HTMLElement;
      target?.scrollIntoView({ behavior: "auto" });
    }
  }, [viewMode, activeIdx]);

  // Track which item is on screen during manual scroll
  useEffect(() => {
    const root = feedContainerRef.current;
    if (!root || viewMode !== "feed") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.7) {
            setActiveIdx(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { root, threshold: [0.7] },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [viewMode, feedItems]);

  if (!data?.profile) return <AppShell><div className="grid h-dvh place-items-center text-sm text-muted-foreground">Loading…</div></AppShell>;
  const p = data.profile;

  if (viewMode === "feed") {
    return (
      <AppShell>
        <div className="relative h-dvh w-full overflow-hidden bg-black">
          <header className="absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]">
            <button onClick={() => setViewMode("grid")} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"><ArrowLeft className="h-5 w-5" /></button>
            <div className="flex-1 text-center"><p className="font-medium text-sm text-white drop-shadow">{tab === "posts" ? "Your Posts" : "Your Library (Shuffled)"}</p></div>
            <div className="w-9" />
          </header>
          <div ref={feedContainerRef} className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
            {feedItems.map((post: any, idx: number) => (
              <div key={`${post.id}-${idx}`} data-idx={idx} className="h-full w-full snap-start relative">
                <FeedItem
                  post={{ ...post, creator: tab === "posts" ? p : post.creator } as any}
                  active={idx === activeIdx}
                  liked={false}
                  following={false}
                  saved={tab === "library"}
                  onLike={() => {}}
                  onFollow={() => {}}
                  onComment={() => setCommentsFor(post.id)}
                  onSave={() => {}}
                  muted={muted}
                  onToggleMute={() => setMuted(!muted)}
                  autoAdvance={tab === "library"}
                  onEnded={() => {
                    if (tab === "library" && idx < feedItems.length - 1) {
                      const next = idx + 1;
                      setActiveIdx(next);
                      const target = feedContainerRef.current?.children[next] as HTMLElement;
                      target?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
                {tab === "posts" && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
                    <button onClick={() => { setEditingPost({ id: post.id, title: post.title, description: post.description || "", tags: post.tags?.map((t: string) => `#${t}`).join(" ") || "", pinned_comment: post.pinned_comment || "" }); }} className="h-10 w-10 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur border border-white/20"><Pencil className="h-5 w-5" /></button>
                    <button onClick={() => setDeletingPostId(post.id)} className="h-10 w-10 grid place-items-center rounded-full bg-black/40 text-destructive backdrop-blur border border-destructive/20"><Trash2 className="h-5 w-5" /></button>
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
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow ring-2 ring-background"
              >
                <Camera className="h-3.5 w-3.5" />
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAvatar(e.target.files[0])} />
            </label>
            <div>
              <h1 className="text-lg font-medium">{p.display_name}</h1>
              <div className="text-sm text-gold">@{p.handle}</div>
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-[11px] text-muted-foreground hover:text-gold">
                <Camera className="h-3 w-3" /> Change avatar
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAvatar(e.target.files[0])} />
              </label>
            </div>
          </div>
          <button aria-label="Sign out" onClick={() => signOut().then(() => navigate({ to: "/" }))}
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground">
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="mt-4 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> Admin panel
            </span>
            <span className="text-xs text-gold">Open →</span>
          </Link>
        )}

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

        <div className="mt-8 flex items-center justify-between border-b border-border/60">
          <div className="flex gap-1">
            <button
              onClick={() => setTab("posts")}
              className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
                tab === "posts"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="h-3.5 w-3.5" /> Posts
            </button>
            <button
              onClick={() => setTab("library")}
              className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
                tab === "library"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" /> Library
            </button>
          </div>
          {tab === "posts" && (
            <Link to="/upload" className="inline-flex items-center gap-1 text-xs text-gold"><Plus className="h-3.5 w-3.5" /> New</Link>
          )}
        </div>
        {tab === "posts" ? (
          <div className="mt-3 grid grid-cols-3 gap-1.5 pb-12">
            {data.posts.map((post, i) => (
              <PostGridItem
                key={post.id}
                post={post}
                isOwner
                onClick={() => { setActiveIdx(i); setViewMode("feed"); }}
                onEdit={(pp) =>
                  setEditingPost({
                    id: pp.id,
                    title: pp.title,
                    description: (post.description as string | null) ?? "",
                    tags: ((post.tags as string[] | null) ?? []).map((t) => `#${t}`).join(" "),
                    pinned_comment: (post as any).pinned_comment || ""
                  })
                }
                onDelete={(pp) => setDeletingPostId(pp.id)}
              />
            ))}
            {data.posts.length === 0 && (
              <p className="col-span-3 py-8 text-center text-sm text-muted-foreground">No posts yet.</p>
            )}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-1.5 pb-12">
            {shuffledLibrary.map((post, i) => post && (
              <PostGridItem key={post.id} post={post} onClick={() => { setActiveIdx(i); setViewMode("feed"); }} />
            ))}
            {library && library.posts.length === 0 && (
              <p className="col-span-3 py-8 text-center text-sm text-muted-foreground">
                Tap the bookmark on any post to save it here.
              </p>
            )}
          </div>
        )}

        <div className="mt-10 border-t border-border/60 pt-6 pb-16 space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Legal</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
            <Link to="/dmca" className="hover:text-gold">DMCA & Content Policy</Link>
            <a href="mailto:contactus@myalgorhythm.online" className="hover:text-gold">Contact</a>
          </div>

          <h2 className="pt-4 text-[11px] uppercase tracking-[0.2em] text-destructive/80">Danger zone</h2>
          <button
            onClick={() => { setConfirmText(""); setDeletingAccount(true); }}
            className="inline-flex items-center gap-2 rounded-md border border-destructive/50 px-3 py-2 text-xs text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete my account
          </button>
          <p className="text-[11px] text-muted-foreground">
            Permanently removes your profile, posts, comments, likes, follows, and uploaded files. This can&apos;t be undone.
          </p>
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
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Pinned Comment</label>
                <textarea
                  rows={2}
                  value={editingPost.pinned_comment}
                  onChange={(e) => setEditingPost({ ...editingPost, pinned_comment: e.target.value })}
                  placeholder="Pin a comment to the top..."
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

      <AlertDialog open={deletingAccount} onOpenChange={(o) => !o && !accountBusy && setDeletingAccount(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes your profile, all of your posts, comments, likes, follows, and any uploaded media.
              This action is irreversible. Type <b>DELETE</b> below to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-destructive/60"
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={accountBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={accountBusy || confirmText !== "DELETE"}
              onClick={async (e) => {
                e.preventDefault();
                setAccountBusy(true);
                try {
                  await wipeAccount({});
                  await signOut();
                  toast.success("Your account has been deleted");
                  navigate({ to: "/" });
                } catch (err) {
                  toast.error((err as Error).message);
                  setAccountBusy(false);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {accountBusy ? "Deleting…" : "Delete forever"}
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
