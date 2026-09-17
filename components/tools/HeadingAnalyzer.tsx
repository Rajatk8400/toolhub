"use client";

import { useMemo, useState } from "react";

interface Issue {
  level: "error" | "warning";
  message: string;
}

export default function HeadingAnalyzer() {
  const [html, setHtml] = useState("");

  const { headings, issues, counts } = useMemo(() => {
    let extracted: { level: number; text: string }[] = [];

    // 1. Try HTML heading matching
    const htmlMatches = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)];
    if (htmlMatches.length > 0) {
      extracted = htmlMatches.map((m) => ({
        level: parseInt(m[1]),
        text: m[2].replace(/<[^>]+>/g, "").trim(),
      }));
    } else {
      // 2. Try Markdown heading matching (# H1, ## H2, etc.)
      const mdLines = html.split("\n");
      for (const line of mdLines) {
        const mdMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (mdMatch) {
          extracted.push({
            level: mdMatch[1].length,
            text: mdMatch[2].trim(),
          });
        }
      }
    }

    const headingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const h of extracted) {
      headingCounts[h.level] = (headingCounts[h.level] || 0) + 1;
    }

    const issues: Issue[] = [];
    const h1Count = headingCounts[1] || 0;
    if (h1Count === 0 && extracted.length > 0) {
      issues.push({ level: "error", message: "No H1 heading found — every page should have exactly one main H1." });
    }
    if (h1Count > 1) {
      issues.push({ level: "error", message: `Found ${h1Count} H1 tags — a page should ideally have only one H1 for clear topic signaling.` });
    }

    for (let i = 1; i < extracted.length; i++) {
      const prev = extracted[i - 1];
      const cur = extracted[i];
      if (cur.level > prev.level + 1) {
        issues.push({
          level: "warning",
          message: `Heading level skips from H${prev.level} directly to H${cur.level} ("${cur.text.slice(0, 40)}") — consider nesting sequentially (e.g. H2 followed by H3).`,
        });
      }
    }
    if (extracted.length === 0 && html.trim()) {
      issues.push({ level: "warning", message: "No HTML heading tags (<h1-6>) or Markdown headings (# Heading) found in the input." });
    }

    return { headings: extracted, issues, counts: headingCounts };
  }, [html]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="HTML to analyze headings"
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        rows={8}
        placeholder="Paste your page's HTML or Markdown content here..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />

      {headings.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <span
              key={lvl}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                counts[lvl] > 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-400"
              }`}
            >
              H{lvl}: {counts[lvl]}
            </span>
          ))}
        </div>
      )}

      {headings.length > 0 && (
        <div className="mt-4 space-y-1.5 rounded-lg bg-gray-50 p-4">
          {headings.map((h, i) => (
            <div key={i} style={{ paddingLeft: (h.level - 1) * 16 }} className="flex items-start text-sm text-gray-800">
              <span className="mr-2 shrink-0 rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-blue-800">
                H{h.level}
              </span>
              <span className="break-words">{h.text || <span className="italic text-gray-400">(empty heading)</span>}</span>
            </div>
          ))}
        </div>
      )}

      {issues.length > 0 && (
        <div className="mt-4 space-y-2">
          {issues.map((issue, i) => (
            <div key={i} className={`rounded-lg px-4 py-2 text-sm ${issue.level === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
              {issue.message}
            </div>
          ))}
        </div>
      )}

      {html.trim() && issues.length === 0 && headings.length > 0 && (
        <div className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">✓ Heading hierarchy is optimal — exactly one H1 and smooth level progression.</div>
      )}
    </div>
  );
}
