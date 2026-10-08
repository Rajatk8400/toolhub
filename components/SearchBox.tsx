"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { tools } from "@/data/tools";
import { analytics } from "@/lib/analytics/track";

interface SearchBoxProps {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSelect?: () => void;
}

const QUICK_TAGS = ["PDF", "GST", "Percentage", "JSON", "Image", "CGPA", "EMI", "SEO"];

const CATEGORY_NAMES: Record<string, string> = {
  calculators: "Calculator",
  students: "Student",
  developer: "Developer",
  text: "Text",
  converters: "Converter",
  image: "Image",
  pdf: "PDF",
  seo: "SEO",
  ai: "AI",
};

export default function SearchBox({
  placeholder = "Search calculators, PDF tools, SEO tools, developer tools...",
  autoFocus = false,
  className = "",
  onSelect,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return tools
      .filter((t) => {
        const matchName = t.toolName.toLowerCase().includes(q);
        const matchCategory = t.category.toLowerCase().includes(q);
        const matchKeyword = t.primaryKeyword.toLowerCase().includes(q);
        const matchSecondary = t.secondaryKeywords.some((k) => k.toLowerCase().includes(q));
        const matchDesc = t.metaDescription.toLowerCase().includes(q);
        return matchName || matchCategory || matchKeyword || matchSecondary || matchDesc;
      })
      .slice(0, 7);
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const timeout = setTimeout(() => analytics.searchPerformed(q, results.length), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "ArrowDown" && results.length > 0) {
        setIsOpen(true);
        setSelectedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        const selected = results[selectedIndex];
        window.location.href = `/${selected.category}/${selected.slug}`;
        if (onSelect) onSelect();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} role="search">
      <label htmlFor="site-search" className="sr-only">
        What tool are you looking for?
      </label>

      {/* Input bar */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-4.5 flex items-center text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          id="site-search"
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen && Boolean(query.trim())}
          className="w-full rounded-2xl border border-gray-300/90 bg-white py-3.5 pl-12 pr-10 text-sm md:text-base text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/20"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search input"
            className="absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Screen reader live updates */}
      <span role="status" aria-live="polite" className="sr-only">
        {query.trim() ? `${results.length} tool${results.length === 1 ? "" : "s"} found` : ""}
      </span>

      {/* Quick Search Suggestions */}
      {!query && (
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500">
          <span className="font-medium text-gray-400">Popular:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Instant Dropdown Results */}
      {isOpen && query.trim() && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-xl ring-1 ring-black/5"
        >
          {results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((t, idx) => {
                const isSelected = selectedIndex === idx;
                const catName = CATEGORY_NAMES[t.category] || t.category;

                return (
                  <Link
                    key={t.slug}
                    href={`/${t.category}/${t.slug}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setIsOpen(false);
                      if (onSelect) onSelect();
                    }}
                    className={`flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 transition text-left ${
                      isSelected
                        ? "bg-blue-50/80 text-blue-900"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">
                          {t.toolName}
                        </span>
                        <span className="inline-block rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-800">
                          {catName}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                        {t.metaDescription}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-medium text-blue-600 self-center">
                      Open →
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                🔍
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-900">
                No tools found matching &quot;{query}&quot;
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try searching for a category like &quot;calculator&quot;, &quot;PDF&quot;, or &quot;developer&quot;.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
