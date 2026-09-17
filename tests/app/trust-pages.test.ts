import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap: trust/legal pages", () => {
  it("includes the core static trust pages", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("http://localhost:3000/about");
    expect(urls).toContain("http://localhost:3000/contact");
    expect(urls).toContain("http://localhost:3000/faq");
  });

  it("excludes noindex legal template pages", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).not.toContain("http://localhost:3000/privacy-policy");
    expect(urls).not.toContain("http://localhost:3000/terms");
    expect(urls).not.toContain("http://localhost:3000/disclaimer");
    expect(urls).not.toContain("http://localhost:3000/cookie-policy");
    expect(urls).not.toContain("http://localhost:3000/dmca");
  });

  it("includes the human-readable HTML sitemap page", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("http://localhost:3000/sitemap");
  });
});
