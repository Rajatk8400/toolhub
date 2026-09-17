import { describe, it, expect } from "vitest";
import { guides } from "@/data/guides";
import { tools } from "@/data/tools";

describe("guide data integrity", () => {
  it("has no duplicate slugs", () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every related tool reference points to a real tool", () => {
    const toolSlugs = new Set(tools.map((t) => t.slug));
    for (const g of guides) {
      for (const related of g.relatedTools) {
        expect(toolSlugs.has(related), `${g.slug} links to missing tool "${related}"`).toBe(true);
      }
    }
  });

  it("every related guide reference points to a real guide", () => {
    const guideSlugs = new Set(guides.map((g) => g.slug));
    for (const g of guides) {
      for (const related of g.relatedGuides) {
        expect(guideSlugs.has(related), `${g.slug} links to missing guide "${related}"`).toBe(true);
      }
    }
  });

  it("every guide has substantive sections, not filler", () => {
    for (const g of guides) {
      expect(g.sections.length, `${g.slug} has no sections`).toBeGreaterThan(0);
      for (const s of g.sections) {
        expect(s.content.length, `${g.slug} section "${s.heading}" too short`).toBeGreaterThan(50);
      }
    }
  });
});
