import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Wordmark } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AlgoRhythm" },
      { name: "description", content: "Sign in to AlgoRhythm to like, comment, follow, and post AI music and videos." },
      { property: "og:title", content: "Sign in — AlgoRhythm" },
      { property: "og:description", content: "Sign in to your AlgoRhythm account." },
      { property: "og:url", content: "https://myalgorhythm.online/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate({ to: "/" });
  };

  const onGoogle = async () => {
    setLoading(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/",
    });
    setLoading(false);
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res?.redirected) navigate({ to: "/" });
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="px-5 pt-6">
        <Link to="/"><Wordmark /></Link>
      </header>
      <main className="mx-auto mt-12 max-w-sm px-6">
        <h1 className="text-3xl tracking-tight text-gradient-gold">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back to the feed.</p>

        <button
          onClick={onGoogle}
          disabled={loading}
          className="mt-6 w-full rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-gold/40 disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onEmail} className="space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" />
          <button disabled={loading} type="submit"
            className="w-full rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50">
            Sign in
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          No account? <Link to="/signup" className="text-gold">Create one</Link>
        </p>
      </main>
    </div>
  );
}
