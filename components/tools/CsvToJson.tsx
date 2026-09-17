"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  const lines = input.split(/\r?\n/).filter((l) => l.length > 0);
  for (const line of lines) {
    const cells: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        cells.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    cells.push(cur);
    rows.push(cells);
  }
  return rows;
}

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    try {
      const rows = parseCsv(input);
      if (rows.length < 1) throw new Error("No data found");
      const [header, ...dataRows] = rows;
      const json = dataRows.map((row) => {
        const obj: Record<string, string> = {};
        header.forEach((h, i) => { obj[h.trim()] = row[i] ?? ""; });
        return obj;
      });
      setOutput(JSON.stringify(json, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not parse CSV");
      setOutput("");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="CSV data to convert"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder={"name,age\nAlex,30\nSam,25"}
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <button onClick={convert} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Convert to JSON
      </button>
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {output && (
        <>
          <div className="mt-3 flex justify-end">
            <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("csv-to-json"); }} className="text-xs text-blue-700 hover:underline">Copy</button>
          </div>
          <pre className="mt-1 max-h-72 overflow-auto rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500">First row is treated as the header. Quoted fields with commas are supported.</p>
    </div>
  );
}
