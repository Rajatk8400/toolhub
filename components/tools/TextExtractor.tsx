"use client";

import { useMemo, useState } from "react";
import { analytics } from "@/lib/analytics/track";

const PATTERNS = {
  emails: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  urls: /https?:\/\/[^\s"'<>]+/g,
  numbers: /-?\d+(\.\d+)?/g,
};

export default function TextExtractor() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<keyof typeof PATTERNS>("emails");

  const results = useMemo(() => {
    const matches = text.match(PATTERNS[mode]) || [];
    return [...new Set(matches)];
  }, [text, mode]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text to extract from"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Paste text containing emails, URLs, or numbers..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {(["emails", "urls", "numbers"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Extract {m}
          </button>
        ))}
        <button onClick={() => { navigator.clipboard.writeText(results.join("\n")); analytics.copyClicked("text-extractor"); }} disabled={!results.length} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50">Copy all</button>
      </div>
      {text && (
        <div className="mt-3 rounded-lg bg-gray-50 p-4">
          <p className="mb-2 text-xs font-medium text-gray-500">{results.length} unique match{results.length === 1 ? "" : "es"}</p>
          <pre className="max-h-60 overflow-auto whitespace-pre-wrap text-sm">{results.join("\n") || "No matches found"}</pre>
        </div>
      )}
    </div>
  );
}
