"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics/track";

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

function toSentenceCase(s: string) {
  const lower = s.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

export default function CaseConverter() {
  const [text, setText] = useState("");

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    analytics.copyClicked("case-converter");
  };

  const variants = [
    { label: "UPPERCASE", value: text.toUpperCase() },
    { label: "lowercase", value: text.toLowerCase() },
    { label: "Title Case", value: toTitleCase(text) },
    { label: "Sentence case", value: toSentenceCase(text) },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text to convert case"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Type or paste your text here..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-4 space-y-2">
        {variants.map((v) => (
          <div key={v.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
            <div className="min-w-0 flex-1 truncate text-sm text-gray-800">
              <span className="mr-2 font-medium text-gray-500">{v.label}:</span>
              {v.value || <span className="text-gray-500">—</span>}
            </div>
            <button
              onClick={() => copy(v.value)}
              disabled={!v.value}
              className="ml-3 shrink-0 rounded-lg bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-50 disabled:opacity-40"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
