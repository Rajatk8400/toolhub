import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const TOOLS_DIR = path.resolve(__dirname, "../../components/tools");

describe("tool component accessibility: form fields have accessible names", () => {
  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".tsx") && f !== "registry.ts");

  for (const file of files) {
    it(`${file}: every input/select/textarea has a label, aria-label, or aria-labelledby`, () => {
      const content = fs.readFileSync(path.join(TOOLS_DIR, file), "utf-8");
      const fieldCount = (content.match(/<input|<select|<textarea/g) || []).length;
      if (fieldCount === 0) return;

      // Count labeling sources: opening <label tags and aria-label=/aria-labelledby=
      // attributes. This is a per-file count comparison, not a per-field AST match, so it
      // can't verify a specific label targets a specific field — but it does catch the
      // common real-world gap of "some fields in this file are labeled, others aren't",
      // which a mere presence check (any labeling anywhere in the file) would miss.
      const labelCount = (content.match(/<label\b|aria-label=|aria-labelledby=/g) || []).length;
      expect(
        labelCount,
        `${file} has ${fieldCount} form field(s) but only ${labelCount} labeling source(s) — some fields are likely unlabeled`
      ).toBeGreaterThanOrEqual(fieldCount);
    });
  }
});
