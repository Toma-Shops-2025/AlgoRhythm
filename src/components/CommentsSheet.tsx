import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getComments } from "@/lib/social.functions";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { X, Send, Pin } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CommentsSheet({ postId, open, onClose }: { postId: string | null; open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchComments = useServerFn(getComments);
  const postComment = useServerFn(addComment);
  const [body, setBody] = useState("");

  const { data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments({ data: { postId: postId! } }),
    enabled: !!postId && open,
  });

  useEffect(() => { if (!open) setBody(""); }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate({ to: "/welcome" }); return; }
    if (!body.trim() || !postId) return;
    try {
      await postComment({ data: { postId, body: body.trim() } });
      setBody("");
      qc.invalidateQueries({ queryKey: ["comments", postId] });
    } catch (e) { toast.error((e as Error).message); }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="mt-auto max-h-[75dvh] rounded-t-2xl border-t border-gold/20 bg-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-medium">Comments</div>
          <button aria-label="Close comments" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="max-h-[55dvh] overflow-y-auto px-4 py-4 no-scrollbar">
          {data?.pinned && (
            <div className="mb-4 rounded-xl bg-gold/10 border border-gold/20 p-3 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-gold">
                <Pin className="h-3 w-3" /> Pinned by Creator
              </div>
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground text-xs font-bold">
                  {(data.pinned.user?.display_name ?? "?").slice(0, 1).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="text-xs text-gold font-medium">@{data.pinned.user?.handle ?? "creator"}</div>
                  <div className="text-foreground/90">{data.pinned.body}</div>
                </div>
              </div>
            </div>
          )}

          {data?.comments.length === 0 && !data?.pinned && (
            <p className="py-10 text-center text-sm text-muted-foreground">Be the first to comment.</p>
          )}
          <ul className="space-y-4 py-2">
            {data?.comments.map((c) => (
              <li key={c.id} className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-xs">
                  {(c.user?.display_name ?? "?").slice(0, 1)}
                </div>
                <div className="text-sm">
                  <div className="text-xs text-gold">@{c.user?.handle ?? "user"}</div>
                  <div className="text-foreground/90">{c.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3 pb-[max(5rem,calc(env(safe-area-inset-bottom)+5rem))]">
          <input value={body} onChange={(e) => setBody(e.target.value)} placeholder={user ? "Add a comment…" : "Sign in to comment"}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-gold/50 disabled:opacity-60" />
          <button type="submit" aria-label="Post comment" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-primary-foreground">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
