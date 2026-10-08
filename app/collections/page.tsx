import type { Metadata } from "next";
import Link from "next/link";
import { toolCollections } from "@/data/collections";
import ToolCollectionsGrid from "@/components/ToolCollectionsGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Tool Collections - Curated Toolkits & Workspaces",
  description:
    "Explore curated collections of online tools on ToolArena: Student Toolkit, Business & Finance Toolkit, Developer Toolkit, SEO Toolkit, and PDF/Image Toolkit.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Tool Collections - Curated Online Toolkits | ToolArena",
    description:
      "Explore curated suites of online tools on ToolArena designed for specific workflows and tasks.",
  },
};

export default function CollectionsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Collections", item: "/collections" },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Tool Collections</span>
      </nav>

      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          <span>Curated Workspaces</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Tool Collections
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Curated suites of related tools assembled to solve specific tasks. Whether you are calculating grades, running financial models, analyzing search ranking factors, or formatting code, these toolkits bundle everything you need in one place.
        </p>
      </div>

      <div className="mt-10">
        <ToolCollectionsGrid />
      </div>

      <div className="mt-16">
        <AdSlot position="homepage-bottom" />
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200/80 bg-gray-50/60 p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Need a custom tool collection?
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
          We are continuously expanding the ToolArena ecosystem. Have suggestions for an engineering toolkit, marketing suite, or writing workspace?{" "}
          <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
            Let us know via our contact page
          </Link>{" "}
          and our team will consider building it.
        </p>
      </div>
    </main>
  );
}
