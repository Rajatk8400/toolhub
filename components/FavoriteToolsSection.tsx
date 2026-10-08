"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites, FAVORITES_EVENT } from "@/lib/storage/favorites";
import { StoredToolItem } from "@/lib/storage/recent-tools";
import ToolCard from "./ToolCard";

export default function FavoriteToolsSection() {
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

  // Spec requirement: Only show the section when the user has favorites
  if (!mounted || favorites.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★</span>
            <h2 className="text-xl font-bold text-gray-900">Your Pinned Favorites</h2>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              {favorites.length}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            Quick access to your most-needed calculators &amp; utilities.
          </p>
        </div>

        <Link
          href="/favorites"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Manage All Favorites →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {favorites.slice(0, 6).map((item) => (
          <ToolCard
            key={item.slug}
            slug={item.slug}
            toolName={item.toolName}
            category={item.category}
            description={item.metaDescription || "Fast, free browser utility."}
          />
        ))}
      </div>
    </section>
  );
}
