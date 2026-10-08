import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { guides } from "@/data/guides";
import { toolCollections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://toolarena.vercel.app"
        : "http://localhost:3000");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/collections`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/sitemap`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const collectionPages: MetadataRoute.Sitemap = toolCollections.map((col) => ({
    url: `${base}/collections/${col.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug !== "tools")
    .map((c) => ({
      url: `${base}/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Only indexable tool pages are included
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

  return [
    ...staticPages,
    ...collectionPages,
    ...categoryPages,
    ...toolPages,
    ...guidePages,
  ];
}
