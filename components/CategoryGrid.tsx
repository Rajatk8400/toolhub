"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { analytics } from "@/lib/analytics/track";

const CATEGORY_META: Record<string, { icon: string; count: number; color: string; desc: string }> = {
  calculators: {
    icon: "🔢",
    count: tools.filter((t) => t.category === "calculators").length,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600",
    desc: "EMI, GST, percentage & math",
  },
  students: {
    icon: "🎓",
    count: tools.filter((t) => t.category === "students").length,
    color: "from-indigo-500/10 to-purple-500/10 text-indigo-600",
    desc: "CGPA, attendance & study tools",
  },
  developer: {
    icon: "💻",
    count: tools.filter((t) => t.category === "developer").length,
    color: "from-violet-500/10 to-pink-500/10 text-violet-600",
    desc: "JSON, Base64, UUID & regex",
  },
  text: {
    icon: "✍️",
    count: tools.filter((t) => t.category === "text").length,
    color: "from-sky-500/10 to-blue-500/10 text-sky-600",
    desc: "Word count, casing & text clean",
  },
  converters: {
    icon: "🔄",
    count: tools.filter((t) => t.category === "converters").length,
    color: "from-teal-500/10 to-emerald-500/10 text-teal-600",
    desc: "Length, weight, unit conversion",
  },
  image: {
    icon: "🖼️",
    count: tools.filter((t) => t.category === "image").length,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600",
    desc: "Compress, resize & convert",
  },
  pdf: {
    icon: "📄",
    count: tools.filter((t) => t.category === "pdf").length,
    color: "from-rose-500/10 to-red-500/10 text-rose-600",
    desc: "Merge, split, shrink & organize",
  },
  seo: {
    icon: "🎯",
    count: tools.filter((t) => t.category === "seo").length,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
    desc: "Meta tags, schema & SERP preview",
  },
  ai: {
    icon: "✨",
    count: tools.filter((t) => t.category === "ai").length,
    color: "from-purple-500/10 to-violet-500/10 text-purple-600",
    desc: "Summarizer, rewriter & email",
  },
};

export default function CategoryGrid() {
  const activeCats = categories.filter((c) => c.slug !== "tools");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {activeCats.map((c) => {
        const meta = CATEGORY_META[c.slug] || {
          icon: "🛠️",
          count: 0,
          color: "from-gray-500/10 to-slate-500/10 text-gray-700",
          desc: "Online utilities",
        };

        return (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            onClick={() => analytics.categoryClicked(c.slug)}
            className="group relative flex items-start gap-4 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-2xl transition group-hover:scale-105`}
            >
              {meta.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                  {meta.count} tools
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 line-clamp-1">{meta.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
