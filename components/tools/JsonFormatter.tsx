"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics/track";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      analytics.copyClicked("json-formatter");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="JSON to format"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder='Paste JSON here, e.g. {"name":"Alex","age":30}'
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => format(false)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Beautify
        </button>
        <button
          onClick={() => format(true)}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Minify
        </button>
        <button
          onClick={copy}
          disabled={!output}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          Copy result
        </button>
      </div>
      {error && (
        <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">Invalid JSON: {error}</div>
      )}
      {output && !error && (
        <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
      )}
    </div>
  );
}
