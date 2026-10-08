import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getToolsByCategory } from "@/data/tools";
import { guides } from "@/data/guides";
import { toolCollections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Sitemap - ToolArena",
  description: "Every page on ToolArena, organized by category — tools, calculators, collections, guides, and more.",
  alternates: { canonical: "/sitemap" },
};

export default function HtmlSitemapPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Sitemap</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">ToolArena Sitemap</h1>
      <p className="mt-3 text-sm text-gray-600">
        Complete human-readable index of all pages and tools on ToolArena. Machine-readable version available at{" "}
        <Link href="/sitemap.xml" className="text-blue-600 font-semibold hover:underline">
          sitemap.xml
        </Link>
        .
      </p>

      {/* Tool Collections Section */}
      <section className="mt-10 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-gray-900">
          <Link href="/collections" className="hover:text-blue-600">
            Tool Collections
          </Link>
        </h2>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {toolCollections.map((col) => (
            <li key={col.slug}>
              <Link
                href={`/collections/${col.slug}`}
                className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
              >
                {col.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories & Tools */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {categories
          .filter((c) => c.slug !== "tools")
          .map((cat) => {
            const catTools = getToolsByCategory(cat.slug);
            if (catTools.length === 0) return null;
            return (
              <section key={cat.slug} className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
                <h2 className="text-lg font-bold text-gray-900">
                  <Link href={`/${cat.slug}`} className="hover:text-blue-600">
                    {cat.name}
                  </Link>
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {catTools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.category}/${t.slug}`}
                        className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                      >
                        {t.toolName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
      </div>

      {/* Guides */}
      {guides.length > 0 && (
        <section className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900">
            <Link href="/guides" className="hover:text-blue-600">
              Guides &amp; Tutorials
            </Link>
          </h2>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Site Pages */}
      <section className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-gray-900">Platform Pages</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {[
            ["/tools", "All Tools Directory"],
            ["/collections", "Tool Collections"],
            ["/favorites", "My Favorites"],
            ["/about", "About ToolArena"],
            ["/contact", "Contact"],
            ["/faq", "FAQ"],
            ["/privacy-policy", "Privacy Policy"],
            ["/terms", "Terms & Conditions"],
            ["/disclaimer", "Disclaimer"],
            ["/cookie-policy", "Cookie Policy"],
            ["/dmca", "DMCA / Content Policy"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-gray-500">
        {tools.length} tools across {categories.length - 1} categories and {toolCollections.length} curated toolkits.
      </p>
    </main>
  );
}
