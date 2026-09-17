"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

interface Rule {
  id: number;
  agent: string;
  disallow: string;
}

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState<Rule[]>([{ id: 1, agent: "*", disallow: "/admin/" }]);
  const [nextId, setNextId] = useState(2);
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules((r) => [...r, { id: nextId, agent: "*", disallow: "" }]);
    setNextId((n) => n + 1);
  };
  const removeRule = (id: number) => setRules((r) => r.filter((x) => x.id !== id));
  const update = (id: number, field: "agent" | "disallow", value: string) =>
    setRules((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const byAgent = rules.reduce<Record<string, string[]>>((acc, r) => {
    if (!r.agent) return acc;
    acc[r.agent] = acc[r.agent] || [];
    if (r.disallow) acc[r.agent].push(r.disallow);
    return acc;
  }, {});

  const output = Object.entries(byAgent)
    .map(([agent, paths]) => `User-agent: ${agent}\n${paths.length ? paths.map((p) => `Disallow: ${p}`).join("\n") : "Disallow:"}`)
    .join("\n\n") + (sitemapUrl ? `\n\nSitemap: ${sitemapUrl}` : "");

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    analytics.copyClicked("robots-txt-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {rules.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <input value={r.agent} onChange={(e) => update(r.id, "agent", e.target.value)} placeholder="User-agent (e.g. *)" aria-label="User-agent" className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <input value={r.disallow} onChange={(e) => update(r.id, "disallow", e.target.value)} placeholder="Disallow path (e.g. /admin/)" aria-label="Disallow path" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            {rules.length > 1 && <button onClick={() => removeRule(r.id)} className="text-sm text-red-600 hover:underline">Remove</button>}
          </div>
        ))}
      </div>
      <button onClick={addRule} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add rule</button>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Sitemap URL</span>
        <input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} aria-label="Sitemap URL" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
      </label>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Generated robots.txt</span>
        <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
    </div>
  );
}
