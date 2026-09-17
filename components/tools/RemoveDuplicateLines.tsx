"use client";

import { analytics } from "@/lib/analytics/track";
import { useMemo, useState } from "react";

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [trim, setTrim] = useState(true);

  const output = useMemo(() => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const result: string[] = [];
    for (const rawLine of lines) {
      const line = trim ? rawLine.trim() : rawLine;
      const key = caseInsensitive ? line.toLowerCase() : line;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }
    return result.join("\n");
  }, [input, caseInsensitive, trim]);

  const removedCount = input ? input.split("\n").length - output.split("\n").filter((l, i, arr) => !(i === arr.length - 1 && l === "")).length : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste text with duplicate lines here..."
        aria-label="Text with duplicate lines to remove"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />
          Case-insensitive
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
          Trim whitespace
        </label>
        <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("remove-duplicate-lines"); }} disabled={!output} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          Copy result
        </button>
      </div>
      {input && <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>}
    </div>
  );
}
