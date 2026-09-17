"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

interface Entry {
  id: number;
  lang: string;
  url: string;
}

export default function HreflangGenerator() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, lang: "en", url: "https://example.com/" },
    { id: 2, lang: "es", url: "https://example.com/es/" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [includeDefault, setIncludeDefault] = useState(true);
  const [defaultUrl, setDefaultUrl] = useState("https://example.com/");
  const [copied, setCopied] = useState(false);

  const addEntry = () => {
    setEntries((e) => [...e, { id: nextId, lang: "", url: "" }]);
    setNextId((n) => n + 1);
  };
  const removeEntry = (id: number) => setEntries((e) => e.filter((x) => x.id !== id));
  const update = (id: number, field: "lang" | "url", value: string) =>
    setEntries((e) => e.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const valid = entries.filter((e) => e.lang.trim() && e.url.trim());
  const lines = valid.map((e) => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}" />`);
  if (includeDefault && defaultUrl.trim()) lines.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl.trim()}" />`);
  const output = lines.join("\n");

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("hreflang-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="flex items-center gap-2">
            <input value={e.lang} onChange={(ev) => update(e.id, "lang", ev.target.value)} placeholder="lang (e.g. en, es, fr-CA)" aria-label="Language code" className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <input value={e.url} onChange={(ev) => update(e.id, "url", ev.target.value)} placeholder="URL" aria-label="Alternate URL" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            {entries.length > 1 && <button onClick={() => removeEntry(e.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
          </div>
        ))}
      </div>
      <button onClick={addEntry} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add language</button>
      <div className="mt-4 flex items-center gap-2">
        <input type="checkbox" checked={includeDefault} onChange={(e) => setIncludeDefault(e.target.checked)} aria-label="Include x-default" />
        <span className="text-sm text-gray-700">Include x-default:</span>
        <input value={defaultUrl} aria-label="Default URL" onChange={(e) => setDefaultUrl(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
      </div>
      {output && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated hreflang tags</span>
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
