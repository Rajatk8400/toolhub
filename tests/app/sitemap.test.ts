import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { tools } from "@/data/tools";
import { guides } from "@/data/guides";

describe("sitemap", () => {
  it("includes every indexable tool", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const t of tools.filter((t) => t.indexable)) {
      expect(urls.has(`http://localhost:3000/${t.category}/${t.slug}`)).toBe(true);
    }
  });

  it("excludes non-indexable tools", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const t of tools.filter((t) => !t.indexable)) {
      expect(urls.has(`http://localhost:3000/${t.category}/${t.slug}`)).toBe(false);
    }
  });

  it("includes every indexable guide", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const g of guides.filter((g) => g.indexable)) {
      expect(urls.has(`http://localhost:3000/guides/${g.slug}`)).toBe(true);
    }
  });

  it("includes the homepage", () => {
    const entries = sitemap();
    expect(entries.some((e) => e.url === "http://localhost:3000")).toBe(true);
  });

  it("produces no duplicate URLs", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
