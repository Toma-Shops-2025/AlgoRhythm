import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/payouts")({
  head: () => ({
    meta: [
      { title: "Creator Payouts & Fees — AlgoRhythm" },
      { name: "description", content: "How creators earn on AlgoRhythm — platform fee, payout schedule, eligibility, and tax responsibilities." },
      { property: "og:title", content: "Creator Payouts — AlgoRhythm" },
      { property: "og:description", content: "How creators get paid on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/payouts" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/payouts" }],
  }),
  component: PayoutsPage,
});

function PayoutsPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Creator Payouts & Fees</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <Section title="How creators earn">
          <ul>
            <li><strong>Tips</strong> — one-time payments from fans, $1–$500 per tip.</li>
            <li><strong>Creator subscriptions</strong> — recurring $4.99/month from fans for ongoing support.</li>
          </ul>
        </Section>

        <Section title="Platform fee">
          <p>AlgoRhythm takes a flat <strong>5% platform fee</strong> on tips and creator subscriptions. The remaining 95% is your gross earnings — payment processing fees (typically 2.9% + $0.30 per transaction) are deducted by our payment processor before payout.</p>
          <p>Example: a $10 tip → $9.50 after AlgoRhythm fee → ~$8.91 after processing fees lands in your payout account.</p>
        </Section>

        <Section title="Payout schedule">
          <ul>
            <li>Earnings are held by our payment processor until your account meets the minimum payout threshold (currently <strong>$10</strong>).</li>
            <li>Payouts run on a <strong>weekly</strong> schedule.</li>
            <li>New creator accounts have a 7-day initial holding period for fraud review.</li>
          </ul>
        </Section>

        <Section title="Eligibility">
          <p>To receive payouts you must:</p>
          <ul>
            <li>Be at least <strong>18 years old</strong> (or the age of majority in your country).</li>
            <li>Reside in a country supported by our payment processor.</li>
            <li>Complete payout onboarding (identity verification, bank or card account, tax info).</li>
            <li>Not be on any sanctions list (OFAC, EU, UN).</li>
            <li>Comply with our <Link to="/guidelines" className="text-gold">Community Guidelines</Link> and <Link to="/terms" className="text-gold">Terms</Link>.</li>
          </ul>
        </Section>

        <Section title="Taxes">
          You are responsible for reporting and paying taxes on your AlgoRhythm earnings in your jurisdiction. For US creators, we (or our payment processor) will issue a <strong>1099-K</strong> if your earnings exceed the IRS reporting threshold for the year.
        </Section>

        <Section title="Refunds & chargebacks">
          <ul>
            <li>If a tip or subscription is refunded or charged back, the corresponding amount is deducted from your future earnings.</li>
            <li>Excessive chargebacks (over 1% of your volume) may trigger account review.</li>
          </ul>
        </Section>

        <Section title="Account termination">
          If your account is terminated for violating our policies, you forfeit any earnings not yet paid out. We will not knowingly enrich bad-faith actors.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/terms" className="text-gold">Terms</Link> · <Link to="/refunds" className="text-gold">Refunds</Link> · <Link to="/contact" className="text-gold">Contact</Link>
        </p>
      </article>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
      <h2 className="text-base font-medium text-gold">{title}</h2>
      {children}
    </section>
  );
}