import Link from "next/link";
import { toolCollections } from "@/data/collections";

const ICONS: Record<string, string> = {
  GraduationCap: "🎓",
  Briefcase: "💼",
  Search: "🎯",
  Code: "💻",
  FileText: "📄",
};

export default function ToolCollectionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {toolCollections.map((col) => {
        const iconEmoji = ICONS[col.iconName] || "🛠️";

        return (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
          >
            {/* Top gradient highlight strip */}
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${col.accentColor}`} />

            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                  {iconEmoji}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {col.toolSlugs.length} Tools Included
                </span>
              </div>

              <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {col.badge}
              </span>

              <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {col.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {col.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span className="group-hover:underline">Explore Collection</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
