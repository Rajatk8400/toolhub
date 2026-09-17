"use client";

import { analytics } from "@/lib/analytics/track";
import { useMemo, useState } from "react";

export default function FindReplaceTool() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!find) return text;
    try {
      setError(null);
      if (useRegex) {
        const re = new RegExp(find, caseSensitive ? "g" : "gi");
        return text.replace(re, replace);
      }
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped, caseSensitive ? "g" : "gi");
      return text.replace(re, replace);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid pattern");
      return text;
    }
  }, [text, find, replace, caseSensitive, useRegex]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your text here..."
        aria-label="Text to find and replace within"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find" aria-label="Find" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        <input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace with" aria-label="Replace with" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-700">
        <label className="flex items-center gap-2"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case-sensitive</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Use regex</label>
        <button onClick={() => { navigator.clipboard.writeText(result); analytics.copyClicked("find-and-replace"); }} disabled={!text} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50">Copy result</button>
      </div>
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {text && <pre className="mt-3 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{result}</pre>}
    </div>
  );
}
