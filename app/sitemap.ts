import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { guides } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://toolhub-ecru.vercel.app"
        : "http://localhost:3000");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/sitemap`, changeFrequency: "monthly", priority: 0.3 },
    // privacy-policy, terms, disclaimer, cookie-policy, and dmca are deliberately excluded — they're
    // marked noindex (see their page metadata) since unmodified legal templates are
    // boilerplate/duplicate-content-prone, and the spec itself says noindex URLs must not
    // appear in the sitemap.
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Only indexable tool pages are included — noindex pages are deliberately excluded.
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((t) => t.indexable)
    .map((t) => ({
      url: `${base}/${t.category}/${t.slug}`,
      lastModified: t.lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const guidePages: MetadataRoute.Sitemap = guides
    .filter((g) => g.indexable)
    .map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: g.lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...categoryPages, ...toolPages, ...guidePages];
}
