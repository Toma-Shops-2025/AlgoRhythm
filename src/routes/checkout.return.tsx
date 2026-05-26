import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Payment complete — AlgoRhythm" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReturnPage,
});

function ReturnPage() {
  const { session_id } = Route.useSearch();
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h1 className="mt-4 text-2xl font-semibold">Thanks for supporting AlgoRhythm</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {session_id ? "Your payment is being confirmed." : "Welcome back."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/feed" className="rounded-full bg-gradient-gold px-5 py-2 text-sm text-primary-foreground">
            Back to feed
          </Link>
          <Link to="/me" className="rounded-full border border-border px-5 py-2 text-sm">
            My profile
          </Link>
        </div>
      </div>
    </AppShell>
  );
}