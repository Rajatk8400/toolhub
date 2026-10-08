import React from "react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface ToolCardProps {
  slug: string;
  toolName: string;
  category: string;
  description: string;
  className?: string;
}

const CATEGORY_STYLES: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  calculators: { label: "Calculator", bg: "bg-blue-50", text: "text-blue-700", icon: "🔢" },
  students: { label: "Student", bg: "bg-indigo-50", text: "text-indigo-700", icon: "🎓" },
  developer: { label: "Developer", bg: "bg-violet-50", text: "text-violet-700", icon: "💻" },
  text: { label: "Text", bg: "bg-sky-50", text: "text-sky-700", icon: "✍️" },
  converters: { label: "Converter", bg: "bg-teal-50", text: "text-teal-700", icon: "🔄" },
  image: { label: "Image", bg: "bg-amber-50", text: "text-amber-700", icon: "🖼️" },
  pdf: { label: "PDF", bg: "bg-rose-50", text: "text-rose-700", icon: "📄" },
  seo: { label: "SEO", bg: "bg-emerald-50", text: "text-emerald-700", icon: "🎯" },
  ai: { label: "AI Tool", bg: "bg-purple-50", text: "text-purple-700", icon: "✨" },
};

export default function ToolCard({
  slug,
  toolName,
  category,
  description,
  className = "",
}: ToolCardProps) {
  const catStyle = CATEGORY_STYLES[category] || {
    label: category,
    bg: "bg-gray-100",
    text: "text-gray-700",
    icon: "⚙️",
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}
          >
            <span>{catStyle.icon}</span>
            <span>{catStyle.label}</span>
          </span>
          <FavoriteButton
            slug={slug}
            toolName={toolName}
            category={category}
            metaDescription={description}
            size="sm"
          />
        </div>

        <Link href={`/${category}/${slug}`} className="mt-3 block focus:outline-none">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {toolName}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </Link>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
        <Link
          href={`/${category}/${slug}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <span>Open Tool</span>
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <span className="text-gray-400">Free &amp; Instant</span>
      </div>
    </div>
  );
}
