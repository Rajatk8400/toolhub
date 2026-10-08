import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  toolCollections,
  getCollectionBySlug,
} from "@/data/collections";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/ads/AdSlot";

export function generateStaticParams() {
  return toolCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) return {};

  return {
    title: col.metaTitle,
    description: col.metaDescription,
    alternates: { canonical: `/collections/${col.slug}` },
    openGraph: {
      title: col.metaTitle,
      description: col.metaDescription,
      url: `/collections/${col.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: col.metaTitle,
      description: col.metaDescription,
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) notFound();

  // Find all tools belonging to this collection
  const includedTools = col.toolSlugs
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is (typeof tools)[0] => Boolean(t));

  const relatedCollections = col.relatedCollectionSlugs
    .map((s) => getCollectionBySlug(s))
    .filter((c): c is (typeof toolCollections)[0] => Boolean(c));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Collections", item: "/collections" },
      {
        "@type": "ListItem",
        position: 3,
        name: col.name,
        item: `/collections/${col.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: col.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {col.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <Link href="/collections" className="hover:text-blue-600">Collections</Link> {" / "}
        <span className="text-gray-700">{col.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          <span>{col.badge}</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {col.h1}
        </h1>
        <p className="mt-4 whitespace-pre-line text-base text-gray-700 leading-relaxed">
          {col.intro}
        </p>
      </div>

      {/* Included Tools Section */}
      <section className="mt-10">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Included Tools ({includedTools.length})
          </h2>
          <span className="text-xs text-gray-500">Click any card to launch immediately</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {includedTools.map((t) => (
            <ToolCard
              key={t.slug}
              slug={t.slug}
              toolName={t.toolName}
              category={t.category}
              description={t.metaDescription}
            />
          ))}
        </div>
      </section>

      {/* Middle AdSlot */}
      <AdSlot position="in-content" />

      {/* Features & Key Capabilities */}
      {col.features && col.features.length > 0 && (
        <section className="mt-12 rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">
            Toolkit Highlights &amp; Features
          </h2>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {col.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-800 font-bold">
                  ✓
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ Section */}
      {col.faqs && col.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 divide-y divide-gray-200/80 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
            {col.faqs.map((faq, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 text-base">{faq.question}</h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Collections */}
      {relatedCollections.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200/80">
          <h2 className="text-xl font-bold text-gray-900">
            Explore Related Toolkits
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedCollections.map((rc) => (
              <Link
                key={rc.slug}
                href={`/collections/${rc.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-2xs hover:border-blue-300 hover:text-blue-600 transition"
              >
                <span>{rc.name}</span>
                <span className="text-gray-400">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
