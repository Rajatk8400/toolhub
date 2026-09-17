import Link from "next/link";
import { ToolRecord } from "@/types/tool";
import { getRelatedTools } from "@/data/tools";
import { componentRegistry } from "@/components/tools/registry";
import ToolUsedTracker from "@/components/analytics/ToolUsedTracker";
import AdSlot from "@/components/ads/AdSlot";

export default function ToolPageTemplate({ tool }: { tool: ToolRecord }) {
  const ToolComponent = componentRegistry[tool.component];
  const related = getRelatedTools(tool);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: tool.category, item: `/${tool.category}` },
      { "@type": "ListItem", position: 3, name: tool.toolName, item: `/${tool.category}/${tool.slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <ToolUsedTracker slug={tool.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <Link href={`/${tool.category}`} className="capitalize hover:text-blue-600">{tool.category}</Link> {" / "}
        <span className="text-gray-700">{tool.toolName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{tool.h1}</h1>

      <div className="mt-4 whitespace-pre-line text-gray-700">{tool.intro}</div>

      <div className="mt-6">
        {ToolComponent ? <ToolComponent /> : (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">
            This tool's interface is not yet implemented — add a component in components/tools and register it.
          </div>
        )}
      </div>

      {/* Below the tool result, never overlapping its controls — spec §24 placement rule. */}
      <AdSlot position="below-tool-result" />

      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">How to use</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-gray-700">
            {tool.howToUse.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>
      )}

      {tool.formula && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Formula</h2>
          <p className="mt-2 rounded-lg bg-gray-50 px-4 py-2 font-mono text-sm text-gray-800">{tool.formula}</p>
        </section>
      )}

      {tool.features && tool.features.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Features</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
            {tool.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </section>
      )}

      {tool.useCases && tool.useCases.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Use cases</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
            {tool.useCases.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </section>
      )}

      {tool.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-2 divide-y divide-gray-200">
            {tool.faq.map((f, i) => (
              <div key={i} className="py-3">
                <h3 className="font-medium text-gray-900">{f.question}</h3>
                <p className="mt-1 text-gray-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Related tools</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.category}/${r.slug}`}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {r.toolName}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Between content sections, well clear of any clickable tool controls above. */}
      <AdSlot position="in-content" />

      <p className="mt-10 text-xs text-gray-500">
        Last updated {tool.lastUpdated}
        {tool.reviewer ? ` · Reviewed by ${tool.reviewer}` : ""}
        {tool.source ? ` · Source: ${tool.source}` : ""}
      </p>
    </main>
  );
}
