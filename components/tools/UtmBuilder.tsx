"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

export default function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  let result = "";
  try {
    const trimmed = url.trim();
    if (trimmed) {
      const urlToParse = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const u = new URL(urlToParse);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      if (term) u.searchParams.set("utm_term", term);
      if (content) u.searchParams.set("utm_content", content);
      result = u.toString();
    }
  } catch {
    result = "";
  }

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    analytics.copyClicked("utm-builder");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Website URL</span>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" aria-label="Website URL" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
      </label>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Campaign source (e.g. newsletter)" aria-label="Campaign source" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        <input value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="Campaign medium (e.g. email)" aria-label="Campaign medium" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="Campaign name" aria-label="Campaign name" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Campaign term (optional)" aria-label="Campaign term" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Campaign content (optional)" aria-label="Campaign content" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none sm:col-span-2" />
      </div>
      {result && (
        <div className="mt-4 flex items-start justify-between gap-3 rounded-lg bg-blue-50 px-4 py-3">
          <code className="break-all text-sm text-blue-900">{result}</code>
          <button onClick={handleCopy} className="shrink-0 text-xs font-medium text-blue-700 hover:underline">
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      )}
      {!result && url.trim() && <p className="mt-3 text-sm text-red-600">Please enter a valid website URL or domain.</p>}
    </div>
  );
}
