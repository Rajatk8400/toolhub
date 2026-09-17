import { describe, it, expect } from "vitest";
import { generateSeoDraft, slugify } from "@/lib/seo-draft";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Percentage Calculator")).toBe("percentage-calculator");
  });
  it("strips special characters", () => {
    expect(slugify("CGPA to % Calculator!")).toBe("cgpa-to-calculator");
  });
  it("collapses multiple spaces/hyphens", () => {
    expect(slugify("A   B---C")).toBe("a-b-c");
  });
  it("trims leading/trailing hyphens", () => {
    expect(slugify("  -Test-  ")).toBe("test");
  });
});

describe("generateSeoDraft", () => {
  it("produces a valid slug from the tool name", () => {
    const draft = generateSeoDraft("BMI Calculator", "calculators");
    expect(draft.slug).toBe("bmi-calculator");
  });

  it("includes the category label in the meta title", () => {
    const draft = generateSeoDraft("Word Counter", "text");
    expect(draft.metaTitle).toContain("Word Counter");
    expect(draft.metaTitle.toLowerCase()).toContain("text tool");
  });

  it("marks the intro as a draft needing review", () => {
    const draft = generateSeoDraft("JSON Formatter", "developer");
    expect(draft.intro).toContain("[DRAFT");
  });

  it("lowercases the tool name for the primary keyword", () => {
    const draft = generateSeoDraft("GST Calculator", "calculators");
    expect(draft.primaryKeyword).toBe("gst calculator");
  });

  it("falls back gracefully for an unrecognized category label", () => {
    // @ts-expect-error - deliberately testing an invalid category for robustness
    const draft = generateSeoDraft("Mystery Tool", "not-a-real-category");
    expect(draft.metaTitle).toContain("Tool");
  });
});
