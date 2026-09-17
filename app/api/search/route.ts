import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";
import { checkRateLimit } from "@/lib/rate-limit";

const SEARCH_LIMIT = 60; // requests
const SEARCH_WINDOW_MS = 60 * 1000; // per minute

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfterSeconds } = checkRateLimit(`search:${ip}`, SEARCH_LIMIT, SEARCH_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests, please slow down." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  if (!q) return NextResponse.json({ results: [] });

  const results = tools
    .filter((t) => {
      const haystack = [t.toolName, t.primaryKeyword, ...t.secondaryKeywords].join(" ").toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, 10)
    .map((t) => ({ slug: t.slug, category: t.category, toolName: t.toolName }));

  return NextResponse.json({ results });
}
