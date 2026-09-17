"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

export default function OrganizationSchemaGenerator() {
  const [name, setName] = useState("Acme Corporation");
  const [url, setUrl] = useState("https://example.com");
  const [logo, setLogo] = useState("https://example.com/logo.png");
  const [sameAs, setSameAs] = useState("https://twitter.com/acmecorp\nhttps://linkedin.com/company/acmecorp");
  const [copied, setCopied] = useState(false);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo ? { logo } : {}),
    ...(sameAs.trim() ? { sameAs: sameAs.split("\n").map((s) => s.trim()).filter(Boolean) } : {}),
  };
  const output = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  const valid = name.trim() && url.trim();

  const handleCopy = () => {
    if (!valid) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("organization-schema-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Organization name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Company or Organization Name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Website URL</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="https://example.com" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Logo URL (optional)</span>
          <input value={logo} onChange={(e) => setLogo(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="https://example.com/logo.png" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Social profile URLs (one per line, optional)</span>
          <textarea rows={3} value={sameAs} onChange={(e) => setSameAs(e.target.value)} placeholder={"https://twitter.com/yourbrand\nhttps://linkedin.com/company/yourbrand"} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
      </div>
      {valid && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated Organization schema</span>
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
