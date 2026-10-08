"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getFavorites,
  removeFavorite,
  clearFavorites,
  FAVORITES_EVENT,
} from "@/lib/storage/favorites";
import { StoredToolItem } from "@/lib/storage/recent-tools";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<StoredToolItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorites(getFavorites());

    const handleUpdate = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener(FAVORITES_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_EVENT, handleUpdate);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Favorites</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-500">★</span>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Favorite Tools
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Quickly access your pinned online calculators and utilities. Stored safely in your browser.
          </p>
        </div>

        {mounted && favorites.length > 0 && (
          <button
            type="button"
            onClick={() => clearFavorites()}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-red-300 hover:text-red-600 shadow-2xs transition"
          >
            Clear All Favorites
          </button>
        )}
      </div>

      {!mounted ? (
        <div className="py-20 text-center text-sm text-gray-400">Loading your favorites...</div>
      ) : favorites.length === 0 ? (
        <div className="my-12 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-500 shadow-2xs">
            ★
          </div>
          <h2 className="mt-4 text-lg font-bold text-gray-900">
            No Favorite Tools Pinned Yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 leading-relaxed">
            Click the star icon (☆) on any tool card or tool page to pin your most frequently used utilities right here for instant access.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/#popular"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              Explore Popular Tools
            </Link>
            <Link
              href="/collections"
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((item) => (
            <div
              key={item.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:border-blue-300 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 capitalize">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFavorite(item.slug)}
                    aria-label={`Remove ${item.toolName} from favorites`}
                    title="Remove from favorites"
                    className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <Link href={`/${item.category}/${item.slug}`} className="mt-3 block">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.toolName}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500 leading-relaxed">
                    {item.metaDescription || "Fast, free browser utility."}
                  </p>
                </Link>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/${item.category}/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Open Tool</span>
                  <span>→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => removeFavorite(item.slug)}
                  className="text-xs text-gray-400 hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
