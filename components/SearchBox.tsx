"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { tools } from "@/data/tools";
import { analytics } from "@/lib/analytics/track";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const listboxId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((t) => {
        const haystack = [t.toolName, t.primaryKeyword, ...t.secondaryKeywords].join(" ").toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const timeout = setTimeout(() => analytics.searchPerformed(q, results.length), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative" role="search">
      <label htmlFor="site-search" className="sr-only">
        Search for a tool
      </label>
      <input
        id="site-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a tool..."
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={results.length > 0}
        className="w-full rounded-full border border-gray-300 px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      />
      {/* Announces result count changes to screen reader users without moving visible focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {query.trim() ? `${results.length} tool${results.length === 1 ? "" : "s"} found` : ""}
      </span>
      {results.length > 0 && (
        <div id={listboxId} role="listbox" className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 text-left shadow-lg">
          {results.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.category}/${t.slug}`}
              role="option"
              aria-selected="false"
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50 focus-visible:outline-none"
            >
              {t.toolName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
