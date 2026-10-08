"use client";

export interface StoredToolItem {
  slug: string;
  toolName: string;
  category: string;
  metaDescription?: string;
  visitedAt?: number;
}

const STORAGE_KEY = "toolarena_recent_tools";
const MAX_RECENTS = 8;
export const RECENTS_EVENT = "toolarena_recents_updated";

export function getRecentTools(): StoredToolItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export function recordRecentTool(tool: {
  slug: string;
  toolName: string;
  category: string;
  metaDescription?: string;
}): void {
  if (typeof window === "undefined" || !tool.slug) return;
  try {
    const existing = getRecentTools();
    const filtered = existing.filter((item) => item.slug !== tool.slug);
    const updated: StoredToolItem[] = [
      {
        slug: tool.slug,
        toolName: tool.toolName,
        category: tool.category,
        metaDescription: tool.metaDescription || "",
        visitedAt: Date.now(),
      },
      ...filtered,
    ].slice(0, MAX_RECENTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(RECENTS_EVENT));
  } catch {
    // localStorage full or restricted
  }
}

export function clearRecentTools(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(RECENTS_EVENT));
  } catch {
    // ignore
  }
}
