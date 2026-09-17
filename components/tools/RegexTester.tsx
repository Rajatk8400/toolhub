"use client";

import { useMemo, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as string[], error: null as string | null };
    try {
      const re = new RegExp(pattern, flags);
      const found = flags.includes("g") ? [...text.matchAll(re)].map((m) => m[0]) : (() => {
        const m = text.match(re);
        return m ? [m[0]] : [];
      })();
      return { matches: found, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex gap-2">
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Regular expression, e.g. \\d+"
          aria-label="Regular expression pattern"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
        />
        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="flags"
          aria-label="Regex flags"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Text to test against..."
        aria-label="Text to test the pattern against"
        className="mt-3 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {!error && (
        <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3 text-sm">
          <span className="font-medium text-gray-700">{matches.length} match{matches.length === 1 ? "" : "es"}:</span>{" "}
          {matches.length > 0 ? matches.map((m, i) => (
            <span key={i} className="mr-1 inline-block rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-800">{m}</span>
          )) : <span className="text-gray-500">none</span>}
        </div>
      )}
    </div>
  );
}
