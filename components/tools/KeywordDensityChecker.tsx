"use client";

import { useMemo, useState } from "react";

const STOP_WORDS = new Set(["the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "in", "on", "at", "to", "of", "for", "with", "as", "by", "it", "this", "that", "be", "have", "has"]);

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");

  const { rows, totalWords, uniqueWords } = useMemo(() => {
    // Strip scripts, styles, and HTML tags if HTML is pasted
    const cleanText = text
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ");

    const words = cleanText.toLowerCase().match(/[a-z0-9']+/g) || [];
    const total = words.length;
    if (total === 0) return { rows: [], totalWords: 0, uniqueWords: 0 };
    
    const counts = new Map<string, number>();
    for (const w of words) {
      if (STOP_WORDS.has(w) || w.length < 3) continue;
      counts.set(w, (counts.get(w) || 0) + 1);
    }
    
    const allRows = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(2) }));

    const filtered = filter.trim()
      ? allRows.filter((r) => r.word.includes(filter.trim().toLowerCase()))
      : allRows;

    return {
      rows: filtered.slice(0, 25),
      totalWords: total,
      uniqueWords: counts.size,
    };
  }, [text, filter]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Content to analyze"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Paste your page text or HTML content here..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      {totalWords > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex gap-4 font-medium">
            <span>Total Words: <strong className="text-gray-900">{totalWords}</strong></span>
            <span>Meaningful Keywords: <strong className="text-gray-900">{uniqueWords}</strong></span>
          </div>
          <div className="w-full sm:w-48">
            <input
              type="text"
              aria-label="Filter keywords"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search keyword..."
              className="w-full rounded-md border border-gray-300 px-2.5 py-1 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
      {rows.length > 0 && (
        <table className="mt-4 w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="pb-2">Keyword</th>
              <th className="pb-2">Count</th>
              <th className="pb-2">Density</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.word}>
                <td className="py-1.5 font-medium text-gray-900">{r.word}</td>
                <td className="py-1.5 text-gray-600">{r.count}</td>
                <td className="py-1.5 text-gray-600">{r.density}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {totalWords > 0 && rows.length === 0 && (
        <p className="mt-4 text-center text-sm text-gray-500">No matching keywords found.</p>
      )}
      <p className="mt-3 text-xs text-gray-500">HTML tags and common stop words (the, a, and, etc.) are excluded automatically. Use this to audit keyword distribution and avoid keyword stuffing.</p>
    </div>
  );
}
