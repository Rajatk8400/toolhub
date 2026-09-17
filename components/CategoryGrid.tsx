"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { analytics } from "@/lib/analytics/track";

export default function CategoryGrid() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {categories.filter((c) => c.slug !== "tools").map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          onClick={() => analytics.categoryClicked(c.slug)}
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <span className="font-medium text-gray-900">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
