import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const TOOLS_DIR = path.resolve(__dirname, "../../components/tools");

describe("tool component analytics: copy/download actions are tracked", () => {
  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    it(`${file}: any clipboard copy or file download fires an analytics event`, () => {
      const content = fs.readFileSync(path.join(TOOLS_DIR, file), "utf-8");
      const hasCopyOrDownload = /navigator\.clipboard\.writeText|<a\b[^>]*\bdownload=/.test(content);
      if (!hasCopyOrDownload) return;

      expect(
        content.includes("analytics."),
        `${file} has a copy or download action but never calls analytics.copyClicked/downloadClicked`
      ).toBe(true);
    });
  }
});
