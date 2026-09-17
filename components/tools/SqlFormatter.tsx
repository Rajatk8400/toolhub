"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const MAJOR_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
  "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "LEFT JOIN", "RIGHT JOIN",
  "INNER JOIN", "OUTER JOIN", "JOIN", "UNION ALL", "UNION",
];

function formatSql(sql: string): string {
  let s = sql.replace(/\s+/g, " ").trim();
  // Sort longest-first so e.g. "LEFT JOIN" matches before "JOIN".
  const sorted = [...MAJOR_KEYWORDS].sort((a, b) => b.length - a.length);
  for (const kw of sorted) {
    const re = new RegExp(`\\b${kw.replace(" ", "\\s+")}\\b`, "gi");
    s = s.replace(re, `\n${kw}`);
  }
  s = s.replace(/,\s*/g, ",\n  ");
  s = s.replace(/\bAND\b/gi, "\n  AND");
  s = s.replace(/\bOR\b/gi, "\n  OR");
  return s
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="SQL to format"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder="SELECT id, name FROM users WHERE active = 1 AND role = 'admin' ORDER BY name"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <button onClick={() => setOutput(formatSql(input))} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Format SQL
      </button>
      {output && (
        <>
          <div className="mt-3 flex justify-end">
            <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("sql-formatter"); }} className="text-xs text-blue-700 hover:underline">Copy</button>
          </div>
          <pre className="mt-1 max-h-72 overflow-auto rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500">A lightweight keyword-based formatter for common SELECT/INSERT/UPDATE/DELETE statements — not a full SQL parser, so very complex nested queries may not format perfectly.</p>
    </div>
  );
}
