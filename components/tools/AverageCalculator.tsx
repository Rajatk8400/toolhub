"use client";

import { useMemo, useState } from "react";

export default function AverageCalculator() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    const numbers = input
      .split(/[,\s\n]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
    if (numbers.length === 0) return null;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    return { count: numbers.length, sum, avg, median, min: sorted[0], max: sorted[sorted.length - 1] };
  }, [input]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Numbers to average"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Enter numbers separated by commas, spaces, or new lines, e.g. 10, 20, 30"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      {stats ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            ["Count", stats.count],
            ["Sum", stats.sum.toLocaleString()],
            ["Average", stats.avg.toFixed(2)],
            ["Median", stats.median.toFixed(2)],
            ["Min / Max", `${stats.min} / ${stats.max}`],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-sm font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">Enter at least one number to see the stats.</p>
      )}
    </div>
  );
}
