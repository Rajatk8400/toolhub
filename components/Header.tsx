"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBox from "@/components/SearchBox";
import { getFavorites, FAVORITES_EVENT } from "@/lib/storage/favorites";
import { categories } from "@/data/categories";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setFavoriteCount(getFavorites().length);

    const handleUpdate = () => {
      setFavoriteCount(getFavorites().length);
    };

    window.addEventListener(FAVORITES_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_EVENT, handleUpdate);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Logo size="md" />
          </div>

          {/* Desktop Search Trigger / Input */}
          <div className="hidden lg:block w-72">
            <SearchBox placeholder="Search tools..." />
          </div>

          {/* Primary Desktop Navigation */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-x-5 text-sm font-medium text-gray-700">
            <Link
              href="/tools"
              className="transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
            >
              All Tools
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
            >
              <span>Collections</span>
              <span className="rounded-full bg-blue-50 px-1.5 py-0.2 text-[10px] font-bold text-blue-700 border border-blue-200/60">New</span>
            </Link>
            <Link
              href="/guides"
              className="transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
            >
              Guides
            </Link>
            <Link
              href="/favorites"
              className="relative inline-flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md px-1"
            >
              <span className="text-amber-500">★</span>
              <span>Favorites</span>
              {favoriteCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                  {favoriteCount}
                </span>
              )}
            </Link>
            <Link
              href="/about"
              className="text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
            >
              About
            </Link>
          </nav>

          {/* Right Mobile / Tablet Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Open search"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/favorites"
              aria-label="Favorites"
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-amber-600 transition"
            >
              <span className="text-amber-500">★</span>
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-amber-500 px-0.5 text-[9px] font-bold text-white">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-gray-50/90 p-3 lg:hidden">
            <SearchBox
              placeholder="Search all online tools..."
              autoFocus
              onSelect={() => setSearchOpen(false)}
            />
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <SearchBox
                  placeholder="Search tools..."
                  onSelect={() => setMobileMenuOpen(false)}
                />
              </div>

              <nav className="mt-6 flex flex-col space-y-3 text-base font-medium text-gray-700">
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  All Tools
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  <span>Tool Collections</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">New</span>
                </Link>
                <Link
                  href="/guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  Guides
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-amber-50 hover:text-amber-800 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-amber-500">★</span>
                    <span>My Favorites</span>
                  </span>
                  {favoriteCount > 0 && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-600 transition"
                >
                  About ToolArena
                </Link>
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Popular Categories
                </p>
                <div className="mt-2 flex flex-col space-y-1 text-sm text-gray-600">
                  {categories.filter((c) => c.slug !== "tools").slice(0, 5).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md px-3 py-1.5 hover:bg-gray-50 hover:text-blue-600 transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} ToolArena
            </div>
          </div>
        </div>
      )}
    </>
  );
}
