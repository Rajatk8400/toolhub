// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  CANONICAL_SITE_ORIGIN,
  BRAND_NAME,
  getSiteUrl,
  absoluteUrl,
} from "@/lib/config/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Site Configuration & URL Migration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("has the correct canonical site origin and brand name", () => {
    expect(CANONICAL_SITE_ORIGIN).toBe("https://toolarena-ecru.vercel.app");
    expect(BRAND_NAME).toBe("ToolArena");
  });

  it("resolves to canonical origin in production", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = "production";
    expect(getSiteUrl()).toBe("https://toolarena-ecru.vercel.app");
    expect(absoluteUrl("/image/png-to-webp")).toBe(
      "https://toolarena-ecru.vercel.app/image/png-to-webp"
    );
  });

  it("safely rejects obsolete toolhub or non-ecru domains even if set in env", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://toolhub-ecru.vercel.app";
    expect(getSiteUrl()).toBe("https://toolarena-ecru.vercel.app");

    process.env.NEXT_PUBLIC_SITE_URL = "https://toolarena.vercel.app";
    expect(getSiteUrl()).toBe("https://toolarena-ecru.vercel.app");
  });

  it("robots.ts outputs canonical sitemap url in production", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = "production";
    const robotRules = robots();
    expect(robotRules.sitemap).toBe(
      "https://toolarena-ecru.vercel.app/sitemap.xml"
    );
  });

  it("sitemap generator outputs canonical URLs in production", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = "production";
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(100);
    for (const entry of entries) {
      expect(entry.url.startsWith("https://toolarena-ecru.vercel.app")).toBe(
        true
      );
      expect(entry.url).not.toContain("toolhub");
      expect(entry.url).not.toContain("toolarena.vercel.app");
    }
  });

  it("static sitemap.xml and public/sitemap.xml exist and use only the new canonical hostname", () => {
    const rootSitemapPath = path.resolve(process.cwd(), "sitemap.xml");
    const publicSitemapPath = path.resolve(
      process.cwd(),
      "public",
      "sitemap.xml"
    );

    expect(fs.existsSync(rootSitemapPath)).toBe(true);
    expect(fs.existsSync(publicSitemapPath)).toBe(true);

    const rootContent = fs.readFileSync(rootSitemapPath, "utf-8");
    const publicContent = fs.readFileSync(publicSitemapPath, "utf-8");

    expect(rootContent).toContain("<loc>https://toolarena-ecru.vercel.app</loc>");
    expect(rootContent).not.toContain("toolhub");
    expect(rootContent).not.toContain("https://toolarena.vercel.app");

    expect(publicContent).toContain(
      "<loc>https://toolarena-ecru.vercel.app</loc>"
    );
    expect(publicContent).not.toContain("toolhub");
    expect(publicContent).not.toContain("https://toolarena.vercel.app");
  });
});
