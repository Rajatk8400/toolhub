"use client";

import { useState } from "react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = () => {
    const lo = Math.ceil(parseFloat(min));
    const hi = Math.floor(parseFloat(max));
    if (isNaN(lo) || isNaN(hi) || lo > hi) {
      setError("Enter a valid range where min ≤ max");
      return;
    }
    const rangeSize = hi - lo + 1;
    if (unique && count > rangeSize) {
      setError(`Can't generate ${count} unique numbers from a range of only ${rangeSize}`);
      return;
    }
    setError(null);
    const randInRange = () => {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return lo + (buf[0] % rangeSize);
    };
    if (unique) {
      const set = new Set<number>();
      while (set.size < count) set.add(randInRange());
      setResults([...set]);
    } else {
      setResults(Array.from({ length: count }, randInRange));
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Min</span>
          <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Max</span>
          <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">How many</span>
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-gray-700">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} /> Unique
        </label>
      </div>
      <button onClick={generate} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Generate</button>
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {results.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {results.map((r, i) => (
            <span key={i} className="rounded-lg bg-blue-50 px-3 py-1.5 font-mono text-sm font-semibold text-blue-900">{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}
