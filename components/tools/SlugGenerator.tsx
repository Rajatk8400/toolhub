"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const slug = slugify(input);

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    analytics.copyClicked("slug-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Title or text</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="How to Calculate Percentage: A Guide" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
      </label>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
        <code className="break-all text-sm font-mono text-blue-900">{slug || "your-slug-will-appear-here"}</code>
        {slug && (
          <button onClick={handleCopy} className="shrink-0 text-xs font-medium text-blue-700 hover:underline">
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}
