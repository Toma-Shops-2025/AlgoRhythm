import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "https://myalgorhythm.online";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/feed", changefreq: "hourly", priority: "0.9" },
          { path: "/discover", changefreq: "daily", priority: "0.8" },
          { path: "/pricing", changefreq: "monthly", priority: "0.7" },
          { path: "/guidelines", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "monthly", priority: "0.4" },
          { path: "/terms", changefreq: "monthly", priority: "0.4" },
          { path: "/refunds", changefreq: "monthly", priority: "0.3" },
          { path: "/payouts", changefreq: "monthly", priority: "0.3" },
          { path: "/dmca", changefreq: "monthly", priority: "0.3" },
          { path: "/contact", changefreq: "monthly", priority: "0.4" },
          { path: "/account-deletion", changefreq: "yearly", priority: "0.3" },
        ];

        const [{ data: posts }, { data: profiles }] = await Promise.all([
          supabaseAdmin
            .from("posts")
            .select("id, created_at")
            .eq("is_published", true)
            .order("created_at", { ascending: false })
            .limit(5000),
          supabaseAdmin.from("profiles").select("handle, updated_at").limit(5000),
        ]);

        for (const p of posts ?? []) {
          entries.push({ path: `/p/${p.id}`, lastmod: p.created_at, changefreq: "weekly", priority: "0.6" });
        }
        for (const u of profiles ?? []) {
          entries.push({ path: `/u/${u.handle}`, lastmod: u.updated_at, changefreq: "weekly", priority: "0.5" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
