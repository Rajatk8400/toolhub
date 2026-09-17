"use client";

import Link from "next/link";
import { guides } from "@/data/guides";
import { analytics } from "@/lib/analytics/track";

export default function GuidesList() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {guides.map((g) => (
        <Link
          key={g.slug}
          href={`/guides/${g.slug}`}
          onClick={() => analytics.guideClicked(g.slug)}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <h2 className="font-semibold text-gray-900">{g.title}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{g.metaDescription}</p>
        </Link>
      ))}
    </div>
  );
}
