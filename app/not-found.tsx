import Link from "next/link";
import { categories } from "@/data/categories";
import SearchBox from "@/components/SearchBox";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-900">404</h1>
      <p className="mt-3 text-lg text-gray-600">We couldn't find that page.</p>
      <p className="mt-1 text-sm text-gray-500">It may have moved, or the link might be outdated.</p>

      <div className="mt-8 w-full max-w-md">
        <SearchBox />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.filter((c) => c.slug !== "tools").map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
            {c.name}
          </Link>
        ))}
      </div>

      <Link href="/" className="mt-8 text-sm font-medium text-blue-700 hover:underline">
        ← Back to homepage
      </Link>
    </main>
  );
}
