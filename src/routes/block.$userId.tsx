import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Ban } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toggleBlock } from "@/lib/safety.functions";
import { rememberBlockedCreator } from "@/lib/blocked-creators";
import { toast } from "sonner";

export const Route = createFileRoute("/block/$userId")({
  validateSearch: (search: Record<string, unknown>) => ({
    handle: typeof search.handle === "string" ? search.handle : undefined,
  }),
  head: () => ({ meta: [{ title: "Block creator — AlgoRhythm" }] }),
  component: BlockCreatorPage,
});

function BlockCreatorPage() {
  const { userId } = Route.useParams();
  const { handle } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user && user.id === userId) {
      toast.error("You can't block yourself");
      navigate({ to: "/", replace: true });
    }
  }, [user, userId, navigate]);

  const confirmBlock = async () => {
    setBusy(true);
    try {
      const res = await toggleBlock({ data: { targetUserId: userId } });
      if (res.blocked) {
        rememberBlockedCreator(userId);
        toast.success(handle ? `Blocked @${handle}` : "Creator blocked");
      } else {
        toast.success(handle ? `Unblocked @${handle}` : "Creator unblocked");
      }
      navigate({ to: "/", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to block creator");
    } finally {
      setBusy(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-dvh bg-background" />;
  }

  const label = handle ? `@${handle}` : "this creator";

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 pt-4 pb-8">
        <header className="mb-8 flex items-center gap-3">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate({ to: "/" })}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl tracking-tight text-gradient-gold">Block creator</h1>
        </header>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/15 text-rose-400">
            <Ban className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-medium">Block {label}?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You won&apos;t see their posts in your feed, and you&apos;ll unfollow each other.
            They won&apos;t be notified that you blocked them.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Button
            onClick={confirmBlock}
            disabled={busy}
            className="rounded-full bg-rose-500 text-white hover:bg-rose-500/90"
          >
            {busy ? "Blocking…" : `Block ${label}`}
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: "/" })} className="rounded-full">
            Cancel
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
