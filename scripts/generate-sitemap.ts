import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tools } from "../data/tools";
import { categories } from "../data/categories";
import { guides } from "../data/guides";
import { toolCollections } from "../data/collections";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const base = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://toolarena.vercel.app";

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const staticPages: SitemapEntry[] = [
  { url: base, changeFrequency: "weekly", priority: 1.0 },
  { url: `${base}/tools`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${base}/collections`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/sitemap`, changeFrequency: "monthly", priority: 0.3 },
];

const collectionPages: SitemapEntry[] = toolCollections.map((col) => ({
  url: `${base}/collections/${col.slug}`,
  changeFrequency: "weekly",
  priority: 0.8,
}));

const categoryPages: SitemapEntry[] = categories
  .filter((c) => c.slug !== "tools")
  .map((c) => ({
    url: `${base}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

const toolPages: SitemapEntry[] = tools
  .filter((t) => t.indexable)
  .map((t) => ({
    url: `${base}/${t.category}/${t.slug}`,
    lastModified: t.lastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

const guidePages: SitemapEntry[] = guides
  .filter((g) => g.indexable)
  .map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: g.lastUpdated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

const allEntries: SitemapEntry[] = [
  ...staticPages,
  ...collectionPages,
  ...categoryPages,
  ...toolPages,
  ...guidePages,
];

function buildXml(entries: SitemapEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      const dateStr =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      xml += `    <lastmod>${dateStr}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

const sitemapXml = buildXml(allEntries);

// 1. Write to root directory
const rootSitemapPath = path.join(rootDir, "sitemap.xml");
fs.writeFileSync(rootSitemapPath, sitemapXml, "utf-8");
console.log(`Generated sitemap in root folder: ${rootSitemapPath} (${allEntries.length} URLs)`);

// 2. Write to public directory for static web serving
const publicSitemapPath = path.join(rootDir, "public", "sitemap.xml");
fs.writeFileSync(publicSitemapPath, sitemapXml, "utf-8");
console.log(`Generated sitemap in public folder: ${publicSitemapPath} (${allEntries.length} URLs)`);
