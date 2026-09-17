"use client";

import { analytics } from "@/lib/analytics/track";
import { useMemo, useState } from "react";

export default function TextSorter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"az" | "za" | "length" | "numeric">("az");

  const output = useMemo(() => {
    const lines = input.split("\n").filter((l) => l.trim().length > 0);
    const sorted = [...lines];
    if (mode === "az") sorted.sort((a, b) => a.localeCompare(b));
    else if (mode === "za") sorted.sort((a, b) => b.localeCompare(a));
    else if (mode === "length") sorted.sort((a, b) => a.length - b.length);
    else if (mode === "numeric") sorted.sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0));
    return sorted.join("\n");
  }, [input, mode]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Lines to sort"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste a list, one item per line..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {([["az", "A → Z"], ["za", "Z → A"], ["length", "By length"], ["numeric", "Numeric"]] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            {label}
          </button>
        ))}
        <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("text-sorter"); }} disabled={!output} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50">Copy result</button>
      </div>
      {input && <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>}
    </div>
  );
}
