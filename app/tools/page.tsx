import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import ToolCard from "@/components/ToolCard";
import SearchBox from "@/components/SearchBox";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "All Online Tools - Complete Directory | ToolArena",
  description:
    "Browse the complete directory of free online tools on ToolArena: calculators, student utilities, developer formatters, converters, SEO tools, and PDF utilities.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "All Online Tools - Free Digital Utilities | ToolArena",
    description:
      "Explore over 100+ free online tools and calculators on ToolArena. Fast, client-side, and no signup needed.",
  },
};

export default function AllToolsPage() {
  const activeCategories = categories.filter((c) => c.slug !== "tools");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">All Tools</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            <span>Complete Directory</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            All Online Tools ({tools.length})
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-xl">
            Every calculator, converter, and digital utility available on ToolArena, organized by category for fast discovery.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBox placeholder="Filter tools by keyword..." />
        </div>
      </div>

      {/* Category Anchor Pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {activeCategories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            {c.name}
          </a>
        ))}
      </div>

      {/* Tool Groups By Category */}
      <div className="mt-12 space-y-16">
        {activeCategories.map((cat, catIdx) => {
          const catTools = tools.filter((t) => t.category === cat.slug);
          if (catTools.length === 0) return null;

          return (
            <section key={cat.slug} id={`cat-${cat.slug}`} className="scroll-mt-24">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
                </div>
                <Link
                  href={`/${cat.slug}`}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View category page ({catTools.length}) →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {catTools.map((t) => (
                  <ToolCard
                    key={t.slug}
                    slug={t.slug}
                    toolName={t.toolName}
                    category={t.category}
                    description={t.metaDescription}
                  />
                ))}
              </div>

              {/* Controlled AdSlot every few categories */}
              {catIdx === 2 && (
                <div className="mt-10">
                  <AdSlot position="in-content" />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
