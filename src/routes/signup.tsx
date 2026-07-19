import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Wordmark } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your profile — AlgoRhythm" },
      { name: "description", content: "Create your AlgoRhythm profile and start posting AI-made music and videos to a viral vertical feed." },
      { property: "og:title", content: "Create your profile — AlgoRhythm" },
      { property: "og:description", content: "Join AlgoRhythm — the home for AI music creators." },
      { property: "og:url", content: "https://myalgorhythm.online/signup" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/signup" }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [copyrightConfirmed, setCopyrightConfirmed] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const yr = parseInt(birthYear, 10);
    const thisYear = new Date().getFullYear();
    if (!yr || yr < 1900 || yr > thisYear) return toast.error("Enter a valid birth year");
    if (thisYear - yr < 13) return toast.error("You must be at least 13 years old to sign up");
    if (!ageConfirmed) return toast.error("Please confirm you meet the minimum age requirement");
    if (!agreed) return toast.error("Please accept the Terms, Privacy Policy, and Community Guidelines");
    if (!copyrightConfirmed) return toast.error("Please confirm you'll only post content you have rights to");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/",
        data: {
          display_name: displayName,
          birth_year: yr,
          terms_accepted_at: new Date().toISOString(),
          marketing_opt_in: marketingOptIn,
        },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);

    // Auto-login after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      toast.success("Account created!", {
        description: "Please sign in with your new credentials.",
      });
      navigate({ to: "/login" });
    } else {
      toast.success("Welcome to AlgoRhythm");
      navigate({ to: "/" });
    }
  };

  const onGoogle = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/",
    });
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res?.redirected) navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-5 pt-6"><Link to="/"><Wordmark /></Link></header>
      <main className="mx-auto mt-10 max-w-sm px-6">
        <h1 className="text-3xl tracking-tight text-gradient-gold">Create your profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start posting AI tracks and videos to a viral, gold-tinged feed.
        </p>

        <button onClick={onGoogle} className="mt-6 w-full rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-gold/40">
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onEmail} className="space-y-3">
          <input required placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <input type="password" required minLength={8} placeholder="Password (8+ chars)" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <input type="number" required min="1900" max={new Date().getFullYear()} placeholder="Birth year (e.g. 1995)" value={birthYear} onChange={(e) => setBirthYear(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <div className="space-y-2 rounded-md border border-gold/20 bg-card/30 p-3">
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={ageConfirmed} onChange={(e) => setAgeConfirmed(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
              <span>I confirm I'm at least 13 years old (or the minimum age in my country).</span>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-gold">Terms</Link>,{" "}
                <Link to="/privacy" className="text-gold">Privacy Policy</Link>, and{" "}
                <Link to="/guidelines" className="text-gold">Community Guidelines</Link>.
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={copyrightConfirmed} onChange={(e) => setCopyrightConfirmed(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
              <span>
                I'll only upload music and content I own or have permission to share, per our{" "}
                <Link to="/dmca" className="text-gold">DMCA / Copyright Policy</Link>.
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
              <span>(Optional) Send me product updates and creator tips by email. I can unsubscribe anytime.</span>
            </label>
          </div>
          <button disabled={loading} type="submit"
            className="w-full rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50">
            Create account
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Have an account? <Link to="/login" className="text-gold">Sign in</Link>
        </p>
      </main>
    </div>
  );
}

