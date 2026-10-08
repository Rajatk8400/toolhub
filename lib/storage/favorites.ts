"use client";

import { StoredToolItem } from "./recent-tools";

const FAVORITES_STORAGE_KEY = "toolarena_favorites";
export const FAVORITES_EVENT = "toolarena_favorites_updated";

export function getFavorites(): StoredToolItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  if (typeof window === "undefined" || !slug) return false;
  const list = getFavorites();
  return list.some((item) => item.slug === slug);
}

export function toggleFavorite(tool: {
  slug: string;
  toolName: string;
  category: string;
  metaDescription?: string;
}): boolean {
  if (typeof window === "undefined" || !tool.slug) return false;
  try {
    const list = getFavorites();
    const exists = list.some((item) => item.slug === tool.slug);
    let updated: StoredToolItem[];
    let nowFavorited: boolean;

    if (exists) {
      updated = list.filter((item) => item.slug !== tool.slug);
      nowFavorited = false;
    } else {
      updated = [
        {
          slug: tool.slug,
          toolName: tool.toolName,
          category: tool.category,
          metaDescription: tool.metaDescription || "",
          visitedAt: Date.now(),
        },
        ...list,
      ];
      nowFavorited = true;
    }

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
    return nowFavorited;
  } catch {
    return false;
  }
}

export function removeFavorite(slug: string): void {
  if (typeof window === "undefined" || !slug) return;
  try {
    const list = getFavorites();
    const updated = list.filter((item) => item.slug !== slug);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  } catch {
    // ignore
  }
}

export function clearFavorites(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  } catch {
    // ignore
  }
}
