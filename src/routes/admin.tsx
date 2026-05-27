import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import {
  getAdminStats,
  listUsers,
  toggleUserRole,
  adminDeleteUser,
  listPosts,
  adminTogglePublish,
  adminDeletePost,
  listComments,
  adminDeleteComment,
  listTransactions,
} from "@/lib/admin.functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  FileText,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  Trash2,
  EyeOff,
  Eye,
  Crown,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AlgoRhythm" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, loading, navigate]);

  if (loading || isAdmin === null) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  if (!isAdmin) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md p-6 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-3 text-xl font-semibold">Admin only</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You don't have permission to view this page.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <header className="mb-6 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-gold" />
          <h1 className="text-2xl font-semibold">Admin</h1>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="tx">Money</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <UsersTab currentUserId={user!.id} />
          </TabsContent>
          <TabsContent value="posts" className="mt-6">
            <PostsTab />
          </TabsContent>
          <TabsContent value="comments" className="mt-6">
            <CommentsTab />
          </TabsContent>
          <TabsContent value="tx" className="mt-6">
            <TransactionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

/* ============ OVERVIEW ============ */
function OverviewTab() {
  const fn = useServerFn(getAdminStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });
  if (isLoading || !data) return <SkeletonGrid />;
  const cards = [
    { label: "Users", value: data.userCount, icon: Users },
    { label: "Posts", value: data.postCount, icon: FileText },
    { label: "Comments", value: data.commentCount, icon: MessageSquare },
    { label: "Active Pro subs (live)", value: data.activeSubsLive, icon: Crown },
    { label: "Tips count (live)", value: data.tipCount, icon: DollarSign },
    {
      label: "Tip revenue (live)",
      value: `$${(data.tipTotalCents / 100).toFixed(2)}`,
      icon: DollarSign,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-lg border border-border/60 bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {c.label}
            </span>
            <c.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 text-2xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted/40" />
      ))}
    </div>
  );
}

/* ============ USERS ============ */
function UsersTab({ currentUserId }: { currentUserId: string }) {
  const [search, setSearch] = useState("");
  const fn = useServerFn(listUsers);
  const toggleFn = useServerFn(toggleUserRole);
  const delFn = useServerFn(adminDeleteUser);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => fn({ data: { search } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  const toggle = async (userId: string, role: "admin" | "creator", has: boolean) => {
    try {
      await toggleFn({ data: { userId, role, enable: !has } });
      toast.success(`${role} ${has ? "removed" : "granted"}`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const remove = async (userId: string, handle: string) => {
    try {
      await delFn({ data: { userId } });
      toast.success(`@${handle} deleted`);
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search by handle or display name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />}
      <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
        {(data ?? []).map((u) => {
          const isAdmin = u.roles.includes("admin");
          const isCreator = u.roles.includes("creator");
          const isSelf = u.id === currentUserId;
          return (
            <div key={u.id} className="flex items-center gap-3 p-3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                {u.avatar_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={u.avatar_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 truncate text-sm font-medium">
                  {u.display_name}
                  {isAdmin && <Badge variant="default" className="bg-gold text-primary-foreground">admin</Badge>}
                  {isCreator && <Badge variant="secondary">creator</Badge>}
                </div>
                <Link
                  to="/u/$handle"
                  params={{ handle: u.handle }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  @{u.handle} · {u.follower_count} followers · {u.post_count} posts
                </Link>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  size="sm"
                  variant={isAdmin ? "default" : "outline"}
                  onClick={() => toggle(u.id, "admin", isAdmin)}
                  disabled={isSelf && isAdmin}
                  title={isSelf && isAdmin ? "Cannot demote yourself here" : ""}
                >
                  <Crown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant={isCreator ? "default" : "outline"}
                  onClick={() => toggle(u.id, "creator", isCreator)}
                >
                  C
                </Button>
                {!isSelf && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete @{u.handle}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Permanently removes the account, all posts, comments, likes, and
                          follows. Cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={() => remove(u.id, u.handle)}
                        >
                          Delete user
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          );
        })}
        {!isLoading && !(data ?? []).length && (
          <div className="p-6 text-center text-sm text-muted-foreground">No users found</div>
        )}
      </div>
    </div>
  );
}

/* ============ POSTS ============ */
function PostsTab() {
  const [search, setSearch] = useState("");
  const fn = useServerFn(listPosts);
  const togglePub = useServerFn(adminTogglePublish);
  const delFn = useServerFn(adminDeletePost);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-posts", search],
    queryFn: () => fn({ data: { search } }),
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-posts"] });

  const togglePublish = async (postId: string, currently: boolean) => {
    try {
      await togglePub({ data: { postId, publish: !currently } });
      toast.success(currently ? "Unpublished" : "Published");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  const remove = async (postId: string) => {
    try {
      await delFn({ data: { postId } });
      toast.success("Post deleted");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search post titles…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />}
      <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
        {(data ?? []).map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
              {p.cover_url && (
                <img src={p.cover_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {p.title}
                {!p.is_published && (
                  <Badge variant="outline" className="ml-2">unpublished</Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                @{p.creator?.handle ?? "?"} · {p.type} · ♥ {p.like_count} · 💬 {p.comment_count}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link to="/p/$id" params={{ id: p.id }} className="p-2 text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Button size="sm" variant="outline" onClick={() => togglePublish(p.id, p.is_published)}>
                {p.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      "{p.title}" and all its comments/likes will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => remove(p.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
        {!isLoading && !(data ?? []).length && (
          <div className="p-6 text-center text-sm text-muted-foreground">No posts found</div>
        )}
      </div>
    </div>
  );
}

/* ============ COMMENTS ============ */
function CommentsTab() {
  const fn = useServerFn(listComments);
  const delFn = useServerFn(adminDeleteComment);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: () => fn({ data: {} }),
  });
  const remove = async (commentId: string) => {
    try {
      await delFn({ data: { commentId } });
      toast.success("Comment deleted");
      qc.invalidateQueries({ queryKey: ["admin-comments"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return (
    <div className="space-y-3">
      {isLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />}
      <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
        {(data ?? []).map((c) => (
          <div key={c.id} className="flex items-start gap-3 p-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>@{c.user?.handle ?? "?"}</span>
                <span>·</span>
                <Link to="/p/$id" params={{ id: c.post_id }} className="hover:text-foreground">
                  view post
                </Link>
                <span>·</span>
                <span>{new Date(c.created_at).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm">{c.body}</p>
            </div>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(c.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {!isLoading && !(data ?? []).length && (
          <div className="p-6 text-center text-sm text-muted-foreground">No comments</div>
        )}
      </div>
    </div>
  );
}

/* ============ TRANSACTIONS ============ */
function TransactionsTab() {
  const fn = useServerFn(listTransactions);
  const { data, isLoading } = useQuery({ queryKey: ["admin-tx"], queryFn: () => fn() });
  if (isLoading || !data)
    return <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />;
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent tips
        </h2>
        <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
          {data.tips.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">No tips yet</div>
          )}
          {data.tips.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 text-sm">
              <div>
                <div className="font-medium">
                  ${(t.amount_cents / 100).toFixed(2)} {t.currency?.toUpperCase()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.status} · {t.environment} · {new Date(t.created_at).toLocaleString()}
                </div>
              </div>
              <Badge variant={t.status === "succeeded" ? "default" : "outline"}>
                {t.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent subscriptions
        </h2>
        <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
          {data.subs.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">No subscriptions yet</div>
          )}
          {data.subs.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 text-sm">
              <div>
                <div className="font-medium">{s.price_id}</div>
                <div className="text-xs text-muted-foreground">
                  {s.kind} · {s.environment} ·{" "}
                  {s.current_period_end
                    ? `ends ${new Date(s.current_period_end).toLocaleDateString()}`
                    : ""}
                  {s.cancel_at_period_end ? " · canceling" : ""}
                </div>
              </div>
              <Badge variant={s.status === "active" ? "default" : "outline"}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}