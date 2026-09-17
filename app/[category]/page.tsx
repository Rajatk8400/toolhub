import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";

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
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const list = getToolsByCategory(cat.slug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">{cat.name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900">{cat.name}</h1>
      <p className="mt-3 max-w-2xl text-gray-700">{cat.description}</p>

      {cat.slug === "students" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["exam", "Exam Info"],
            ["scholarship", "Scholarships"],
            ["admission", "Admissions"],
            ["job", "Government Jobs"],
          ].map(([type, label]) => (
            <Link key={type} href={`/students/hub/${type}`} className="rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-700 hover:bg-blue-100">
              {label}
            </Link>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <p className="mt-8 text-gray-500">More tools in this category are coming soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.category}/${t.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="font-semibold text-gray-900">{t.toolName}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{t.metaDescription}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.filter((c) => c.slug !== cat.slug).map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
            {c.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
