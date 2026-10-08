import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, categories } from "@/data/categories";
import { getToolsByCategory, tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/ads/AdSlot";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `/${cat.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const list = cat.slug === "tools" ? tools : getToolsByCategory(cat.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: cat.name, item: `/${cat.slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">{cat.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-gray-600 leading-relaxed">
            {cat.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {list.length} {list.length === 1 ? "Tool" : "Tools"}
        </span>
      </div>

      {cat.slug === "students" && (
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["exam", "Exam Info"],
            ["scholarship", "Scholarships"],
            ["admission", "Admissions"],
            ["job", "Government Jobs"],
          ].map(([type, label]) => (
            <Link
              key={type}
              href={`/students/hub/${type}`}
              className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <div className="my-12 rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
          More tools in this category are coming soon.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.map((t) => (
            <ToolCard
              key={t.slug}
              slug={t.slug}
              toolName={t.toolName}
              category={t.category}
              description={t.metaDescription}
            />
          ))}
        </div>
      )}

      {/* Ad slot between tools and other categories */}
      <AdSlot position="in-content" />

      {/* Other Categories */}
      <div className="mt-14 pt-8 border-t border-gray-200/80">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Other Categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== cat.slug && c.slug !== "tools")
            .map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:border-blue-300 hover:text-blue-600 transition"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
