import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuideBySlug } from "@/data/guides";
import { tools } from "@/data/tools";
import AdSlot from "@/components/ads/AdSlot";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    robots: guide.indexable ? "index, follow" : "noindex, nofollow",
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedTools = guide.relatedTools
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    dateModified: guide.lastUpdated,
    author: guide.author ? { "@type": "Organization", name: guide.author } : undefined,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <Link href="/guides" className="hover:text-blue-600">Guides</Link> {" / "}
        <span className="text-gray-700">{guide.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{guide.h1}</h1>
      <p className="mt-4 text-gray-700">{guide.intro}</p>

      {guide.sections.map((s, i) => (
        <section key={i} className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">{s.heading}</h2>
          <p className="mt-2 whitespace-pre-line text-gray-700">{s.content}</p>
        </section>
      ))}

      {/* Within guide content, between the body and FAQ — well clear of any link a reader
          might accidentally tap while reading. */}
      <AdSlot position="in-guide" />

      {guide.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-2 divide-y divide-gray-200">
            {guide.faq.map((f, i) => (
              <div key={i} className="py-3">
                <h3 className="font-medium text-gray-900">{f.question}</h3>
                <p className="mt-1 text-gray-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Related tools</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link key={t.slug} href={`/${t.category}/${t.slug}`} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                {t.toolName}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 text-xs text-gray-500">
        Last updated {guide.lastUpdated}
        {guide.reviewer ? ` · Reviewed by ${guide.reviewer}` : ""}
      </p>
    </main>
  );
}
