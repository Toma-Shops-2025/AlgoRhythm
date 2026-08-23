import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { submitReport, type ReportReason } from "@/lib/safety.functions";
import { toast } from "sonner";

const REASONS: { value: ReportReason; label: string }[] = [
  { value: "spam", label: "Spam or scam" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "hate", label: "Hate speech" },
  { value: "sexual", label: "Sexual content / nudity" },
  { value: "violence", label: "Violence or gore" },
  { value: "csam", label: "Child sexual abuse material" },
  { value: "self_harm", label: "Self-harm or suicide" },
  { value: "impersonation", label: "Impersonation" },
  { value: "ip_violation", label: "Copyright / IP violation" },
  { value: "illegal", label: "Illegal activity" },
  { value: "other", label: "Something else" },
];

export const Route = createFileRoute("/report/user/$userId")({
  validateSearch: (search: Record<string, unknown>) => ({
    handle: typeof search.handle === "string" ? search.handle : undefined,
  }),
  head: () => ({ meta: [{ title: "Report creator — AlgoRhythm" }] }),
  component: ReportCreatorPage,
});

function ReportCreatorPage() {
  const { userId } = Route.useParams();
  const { handle } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [reason, setReason] = useState<ReportReason>("spam");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user && user.id === userId) {
      toast.error("You can't report yourself");
      navigate({ to: "/", replace: true });
    }
  }, [user, userId, navigate]);

  const submit = async () => {
    setSubmitting(true);
    try {
      await submitReport({
        data: {
          targetType: "user",
          targetId: userId,
          reason,
          details: details.trim() || undefined,
        },
      });
      toast.success("Report submitted. Thank you.");
      navigate({ to: "/", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-dvh bg-background" />;
  }

  const label = handle ? `@${handle}` : "this creator";

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 pt-4 pb-8">
        <header className="mb-6 flex items-center gap-3">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate({ to: "/" })}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl tracking-tight text-gradient-gold">Report creator</h1>
        </header>

        <p className="mb-4 text-sm text-foreground/90">
          Reports are reviewed by our moderation team. Select a reason for reporting {label}.
        </p>

        <RadioGroup
          value={reason}
          onValueChange={(v) => setReason(v as ReportReason)}
          className="grid gap-2"
        >
          {REASONS.map((r) => (
            <Label
              key={r.value}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:border-gold/40"
            >
              <RadioGroupItem value={r.value} />
              <span>{r.label}</span>
            </Label>
          ))}
        </RadioGroup>

        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Optional details (max 1000 chars)"
          maxLength={1000}
          rows={3}
          className="mt-4"
        />

        <div className="mt-6 flex gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: "/" })} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={submitting}
            className="flex-1 bg-gradient-gold text-primary-foreground"
          >
            {submitting ? "Submitting…" : "Submit report"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
