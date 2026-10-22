/**
 * Central site configuration for ToolArena.
 * Canonical production website origin: https://toolarena-ecru.vercel.app
 */

export const CANONICAL_SITE_ORIGIN = "https://toolarena-ecru.vercel.app";
export const BRAND_NAME = "ToolArena";

/**
 * Returns the resolved site origin without trailing slash.
 * In production, it guarantees canonical origin https://toolarena-ecru.vercel.app
 * unless an explicitly verified non-obsolete env variable is provided.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (envUrl) {
    const cleaned = envUrl.trim().replace(/\/+$/, "");
    // Guard against obsolete hostnames or accidental typos
    if (
      cleaned.includes("toolhub") ||
      cleaned === "https://toolarena.vercel.app" ||
      cleaned === "http://toolarena.vercel.app"
    ) {
      return CANONICAL_SITE_ORIGIN;
    }
    return cleaned;
  }

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_SITE_ORIGIN;
  }

  return "http://localhost:3000";
}

/**
 * Builds an absolute canonical URL using the central site origin.
 * Example: absoluteUrl("/image/png-to-webp") -> "https://toolarena-ecru.vercel.app/image/png-to-webp"
 */
export function absoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/") {
    return base;
  }
  return `${base}${normalizedPath}`;
}

export const SITE_CONFIG = {
  name: BRAND_NAME,
  origin: CANONICAL_SITE_ORIGIN,
  defaultTitle: "ToolArena - Free Online Tools, Calculators & Utilities",
  titleTemplate: "%s | ToolArena",
  description:
    "ToolArena brings useful calculators, converters, SEO tools, developer utilities, PDF tools, image tools, text tools and everyday online utilities together in one fast and easy-to-use platform.",
  openGraphDescription:
    "All your essential online tools in one place. Fast, privacy-friendly calculators, converters, SEO utilities, and developer tools with zero signup.",
  twitterDescription:
    "All your essential online tools in one place. Fast, browser-based utilities with zero signup.",
  creator: "Rajat Kashyap",
  publisher: "ToolArena",
  googleVerification: "IsR2K4NMe0JYk4BQ4Hiv2aIDVKUGDR_6HPniQAOqY30",
};
