"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentTools, clearRecentTools, RECENTS_EVENT, StoredToolItem } from "@/lib/storage/recent-tools";
import FavoriteButton from "./FavoriteButton";

export default function RecentToolsSection() {
  const [recents, setRecents] = useState<StoredToolItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecents(getRecentTools());

    const handleUpdate = () => {
      setRecents(getRecentTools());
    };

    window.addEventListener(RECENTS_EVENT, handleUpdate);
    return () => window.removeEventListener(RECENTS_EVENT, handleUpdate);
  }, []);

  // Spec requirement: Only show the section when the user has previous tool history
  if (!mounted || recents.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xl font-bold text-gray-900">Recently Used Tools</h2>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            Stored locally on your device for quick access. Private &amp; secure.
          </p>
        </div>

        <button
          type="button"
          onClick={() => clearRecentTools()}
          className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          Clear History
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {recents.map((item) => (
          <div
            key={item.slug}
            className="group relative flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs transition hover:border-blue-300 hover:shadow-sm"
          >
            <Link
              href={`/${item.category}/${item.slug}`}
              className="min-w-0 flex-1 pr-2"
            >
              <span className="block truncate text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.toolName}
              </span>
              <span className="mt-0.5 block text-xs capitalize text-gray-400">
                {item.category}
              </span>
            </Link>
            <FavoriteButton
              slug={item.slug}
              toolName={item.toolName}
              category={item.category}
              metaDescription={item.metaDescription}
              size="sm"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
