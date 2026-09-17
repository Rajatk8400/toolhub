"use client";

import { useState } from "react";

export default function RandomStringGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    let pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) pool += "0123456789";
    if (includeSymbols) pool += "!@#$%^&*-_=+";
    const bytes = crypto.getRandomValues(new Uint32Array(length * count));
    const strings: string[] = [];
    for (let s = 0; s < count; s++) {
      let str = "";
      for (let i = 0; i < length; i++) str += pool[bytes[s * length + i] % pool.length];
      strings.push(str);
    }
    setResults(strings);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Length</span>
          <input type="number" min={4} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value) || 4)} className="w-20 rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">How many</span>
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.min(50, parseInt(e.target.value) || 1))} className="w-20 rounded-lg border border-gray-300 px-3 py-2" />
        </label>
      </div>
      <div className="mt-3 flex gap-4 text-sm text-gray-700">
        <label className="flex items-center gap-2"><input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> Include numbers</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} /> Include symbols</label>
      </div>
      <button onClick={generate} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Generate</button>
      {results.length > 0 && (
        <pre className="mt-4 max-h-60 overflow-auto rounded-lg bg-gray-50 p-4 font-mono text-sm">{results.join("\n")}</pre>
      )}
    </div>
  );
}
