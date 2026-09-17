import Link from "next/link";
import { tools } from "@/data/tools";
import SearchBox from "@/components/SearchBox";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Free Online Tools, Calculators &amp; Student Utilities
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Fast, simple and useful tools for students, professionals, developers and everyday tasks — no signup
            required.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBox />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900">Browse by category</h2>
        <CategoryGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-gray-900">Popular tools</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.category}/${t.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-900">{t.toolName}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{t.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
