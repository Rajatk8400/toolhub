"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

export default function TwitterCardGenerator() {
  const [cardType, setCardType] = useState("summary_large_image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [site, setSite] = useState("");
  const [copied, setCopied] = useState(false);

  const output = `<meta name="twitter:card" content="${cardType}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
${site ? `<meta name="twitter:site" content="${site}" />\n` : ""}${image ? `<meta name="twitter:image" content="${image}" />` : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    analytics.copyClicked("twitter-card-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Card type</span>
          <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary with large image</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Page Title" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
          <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Short summary" />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Image URL</span>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="https://example.com/share.jpg" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">@site (optional)</span>
            <input value={site} onChange={(e) => setSite(e.target.value)} placeholder="@yourhandle" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Generated Twitter Card tags</span>
        <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
    </div>
  );
}
