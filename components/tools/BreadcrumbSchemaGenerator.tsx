"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

interface Crumb {
  id: number;
  name: string;
  url: string;
}

export default function BreadcrumbSchemaGenerator() {
  const [crumbs, setCrumbs] = useState<Crumb[]>([
    { id: 1, name: "Home", url: "https://example.com" },
    { id: 2, name: "Category", url: "https://example.com/category" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [copied, setCopied] = useState(false);

  const addCrumb = () => {
    setCrumbs((c) => [...c, { id: nextId, name: "", url: "" }]);
    setNextId((n) => n + 1);
  };
  const removeCrumb = (id: number) => setCrumbs((c) => c.filter((x) => x.id !== id));
  const update = (id: number, field: "name" | "url", value: string) =>
    setCrumbs((c) => c.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const valid = crumbs.filter((c) => c.name.trim() && c.url.trim());
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: valid.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  const output = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;

  const handleCopy = () => {
    if (!valid.length) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("breadcrumb-schema-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {crumbs.map((c, i) => (
          <div key={c.id} className="flex items-center gap-2">
            <span className="w-6 text-xs text-gray-500">{i + 1}.</span>
            <input value={c.name} onChange={(e) => update(c.id, "name", e.target.value)} placeholder="Name" aria-label="Breadcrumb name" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <input value={c.url} onChange={(e) => update(c.id, "url", e.target.value)} placeholder="URL" aria-label="Breadcrumb URL" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            {crumbs.length > 1 && <button onClick={() => removeCrumb(c.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
          </div>
        ))}
      </div>
      <button onClick={addCrumb} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add level</button>
      {valid.length > 0 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated BreadcrumbList schema</span>
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
