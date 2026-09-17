"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

export default function CanonicalUrlGenerator() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  let normalized = "";
  let valid = false;
  try {
    const trimmed = url.trim();
    if (trimmed) {
      const urlToParse = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const u = new URL(urlToParse);
      u.search = "";
      u.hash = "";
      normalized = u.toString().replace(/\/$/, "");
      valid = true;
    }
  } catch {
    valid = false;
  }

  const output = valid ? `<link rel="canonical" href="${normalized}" />` : "";

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("canonical-url-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Page URL</span>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page?utm_source=x" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
      </label>
      {url.trim() && !valid && <p className="mt-2 text-sm text-red-600">Please enter a valid page URL or domain.</p>}
      {valid && (
        <>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
            <code className="break-all text-sm text-blue-900">{output}</code>
            <button onClick={handleCopy} className="ml-3 shrink-0 text-xs font-medium text-blue-700 hover:underline">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">Query parameters and fragments are stripped and the trailing slash is removed — the tool assumes those don&apos;t create a genuinely different page.</p>
        </>
      )}
    </div>
  );
}
