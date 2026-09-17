import { describe, it, expect } from "vitest";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { componentRegistry } from "@/components/tools/registry";

describe("tool data integrity", () => {
  it("has no duplicate slugs", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every tool's category exists in the category registry", () => {
    const categorySlugs = new Set(categories.map((c) => c.slug));
    for (const t of tools) {
      expect(categorySlugs.has(t.category), `${t.slug} has unknown category "${t.category}"`).toBe(true);
    }
  });

  it("every tool's component is registered in componentRegistry", () => {
    for (const t of tools) {
      expect(componentRegistry[t.component], `${t.slug} references unregistered component "${t.component}"`).toBeDefined();
    }
  });

  it("every related tool slug points to a real tool", () => {
    const slugs = new Set(tools.map((t) => t.slug));
    for (const t of tools) {
      for (const related of t.relatedTools) {
        expect(slugs.has(related), `${t.slug} links to missing related tool "${related}"`).toBe(true);
      }
    }
  });

  it("every tool has required SEO fields filled in (no thin content)", () => {
    for (const t of tools) {
      expect(t.metaTitle.length, `${t.slug} metaTitle too short`).toBeGreaterThan(10);
      expect(t.metaDescription.length, `${t.slug} metaDescription too short`).toBeGreaterThan(30);
      expect(t.intro.length, `${t.slug} intro too short`).toBeGreaterThan(50);
      expect(t.faq.length, `${t.slug} has no FAQ entries`).toBeGreaterThan(0);
    }
  });

  it("meta titles stay under a reasonable length to avoid SERP truncation", () => {
    for (const t of tools) {
      expect(t.metaTitle.length, `${t.slug} metaTitle is ${t.metaTitle.length} chars`).toBeLessThanOrEqual(70);
    }
  });

  it("meta descriptions stay under a reasonable length to avoid SERP truncation", () => {
    for (const t of tools) {
      expect(t.metaDescription.length, `${t.slug} metaDescription is ${t.metaDescription.length} chars`).toBeLessThanOrEqual(200);
    }
  });
});
