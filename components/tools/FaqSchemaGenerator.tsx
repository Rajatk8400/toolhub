"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

interface Faq {
  id: number;
  q: string;
  a: string;
}

export default function FaqSchemaGenerator() {
  const [faqs, setFaqs] = useState<Faq[]>([
    { id: 1, q: "What is this tool used for?", a: "This tool generates structured FAQPage JSON-LD schema markup for SEO." },
    { id: 2, q: "Where do I add the generated schema?", a: "Paste the script tag directly inside the <head> or <body> section of your page HTML." },
  ]);
  const [nextId, setNextId] = useState(3);
  const [copied, setCopied] = useState(false);

  const addFaq = () => {
    setFaqs((f) => [...f, { id: nextId, q: "", a: "" }]);
    setNextId((n) => n + 1);
  };
  const removeFaq = (id: number) => setFaqs((f) => f.filter((x) => x.id !== id));
  const update = (id: number, field: "q" | "a", value: string) =>
    setFaqs((f) => f.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const valid = faqs.filter((f) => f.q.trim() && f.a.trim());
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const output = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;

  const handleCopy = () => {
    if (!valid.length) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("faq-schema-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={f.id} className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Question {i + 1}</span>
              {faqs.length > 1 && <button onClick={() => removeFaq(f.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
            </div>
            <input value={f.q} onChange={(e) => update(f.id, "q", e.target.value)} placeholder="Question (e.g. What are your business hours?)" aria-label="FAQ question" className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <textarea value={f.a} onChange={(e) => update(f.id, "a", e.target.value)} placeholder="Answer" aria-label="FAQ answer" rows={2} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
        ))}
      </div>
      <button onClick={addFaq} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add question</button>
      {valid.length > 0 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated FAQPage schema</span>
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500">Only add FAQ schema to pages where these questions are visibly displayed as content — schema mismatching visible content violates Google&apos;s guidelines.</p>
    </div>
  );
}
