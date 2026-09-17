"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics/track";

export default function SerpPreview() {
  const [title, setTitle] = useState("Free Online Tools & Calculators | ToolHub");
  const [url, setUrl] = useState("https://example.com/calculators/percentage-calculator");
  const [description, setDescription] = useState(
    "Free online percentage calculator. Find what percent one number is of another, calculate percentage increase or decrease, and more."
  );
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const snippet = `<title>${title}</title>\n<meta name="description" content="${description}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    analytics.copyClicked("serp-snippet-preview");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <div className="mb-1 flex justify-between text-sm font-medium text-gray-700">
            <span>Page Title</span>
            <span className={title.length > 60 ? "text-amber-600 font-semibold" : "text-gray-500"}>{title.length}/60 chars</span>
          </div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Display URL</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <div className="mb-1 flex justify-between text-sm font-medium text-gray-700">
            <span>Meta Description</span>
            <span className={description.length > 160 ? "text-amber-600 font-semibold" : "text-gray-500"}>{description.length}/160 chars</span>
          </div>
          <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setDevice("desktop")}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${
                device === "desktop" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Desktop Google Result
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${
                device === "mobile" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Mobile Result
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs font-medium text-blue-700 hover:underline"
          >
            {copied ? "✓ Copied tags!" : "Copy Meta Tags"}
          </button>
        </div>

        <div className={`mt-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${device === "mobile" ? "max-w-md" : "w-full"}`}>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[9px] font-bold text-gray-600">G</div>
            <div className="truncate font-sans text-xs text-gray-800">{url || "https://example.com"}</div>
          </div>
          <div className="mt-1 line-clamp-1 font-sans text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer">
            {title || "Page Title Preview"}
          </div>
          <div className="mt-1 line-clamp-2 font-sans text-sm text-[#4d5156]">
            {description || "Meta description preview appears here..."}
          </div>
        </div>
      </div>

      {(title.length > 60 || description.length > 160) && (
        <p className="mt-3 text-xs text-amber-600">
          {title.length > 60 && "⚠️ Title exceeds 60 characters and may be truncated on search engines. "}
          {description.length > 160 && "⚠️ Description exceeds 160 characters and may be shortened in SERPs."}
        </p>
      )}
    </div>
  );
}
