import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getToolsByCategory } from "@/data/tools";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Sitemap - ToolHub",
  description: "Every page on ToolHub, organized by category — tools, calculators, guides, and more.",
  alternates: { canonical: "/sitemap" },
};

export default function HtmlSitemapPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
      <p className="mt-3 text-gray-700">
        Every page on ToolHub, organized by category. Looking for a machine-readable version instead? See{" "}
        <Link href="/sitemap.xml" className="text-blue-700 hover:underline">sitemap.xml</Link>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {categories
          .filter((c) => c.slug !== "tools")
          .map((cat) => {
            const catTools = getToolsByCategory(cat.slug);
            if (catTools.length === 0) return null;
            return (
              <section key={cat.slug}>
                <h2 className="text-lg font-semibold text-gray-900">
                  <Link href={`/${cat.slug}`} className="hover:text-blue-700">{cat.name}</Link>
                </h2>
                <ul className="mt-2 space-y-1">
                  {catTools.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/${t.category}/${t.slug}`} className="text-sm text-gray-600 hover:text-blue-700 hover:underline">
                        {t.toolName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
      </div>

      {guides.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            <Link href="/guides" className="hover:text-blue-700">Guides</Link>
          </h2>
          <ul className="mt-2 space-y-1">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-sm text-gray-600 hover:text-blue-700 hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Site pages</h2>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {[
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/faq", "FAQ"],
            ["/privacy-policy", "Privacy Policy"],
            ["/terms", "Terms & Conditions"],
            ["/disclaimer", "Disclaimer"],
            ["/cookie-policy", "Cookie Policy"],
            ["/dmca", "DMCA / Content Policy"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="text-sm text-gray-600 hover:text-blue-700 hover:underline">{label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-gray-500">{tools.length} tools across {categories.length - 1} categories.</p>
    </main>
  );
}
