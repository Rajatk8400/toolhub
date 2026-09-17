"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const OG_TYPES = ["website", "article", "product", "video.other", "music.song"];

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [type, setType] = useState(OG_TYPES[0]);
  const [copied, setCopied] = useState(false);

  const output = `<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${type}" />
${siteName ? `<meta property="og:site_name" content="${siteName}" />\n` : ""}${image ? `<meta property="og:image" content="${image}" />` : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    analytics.copyClicked("open-graph-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Page Title" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
          <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Page Description" />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">URL</span>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="https://example.com/page" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
              {OG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Image URL</span>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="https://example.com/image.jpg" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Site name (optional)</span>
            <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Brand or Site Name" />
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Generated Open Graph tags</span>
        <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
    </div>
  );
}
