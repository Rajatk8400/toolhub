"use client";

import { useState } from "react";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

export default function RatioCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const na = parseFloat(a);
  const nb = parseFloat(b);
  const nc = parseFloat(c);

  const simplified = !isNaN(na) && !isNaN(nb) && nb !== 0 && Number.isInteger(na) && Number.isInteger(nb)
    ? (() => {
        const g = gcd(na, nb) || 1;
        return `${na / g} : ${nb / g}`;
      })()
    : null;

  // Solve for d in a:b = c:d
  const scaled = !isNaN(na) && !isNaN(nc) && na !== 0 ? (nc * nb) / na : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">A</span>
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="4" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">B</span>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="6" />
        </label>
      </div>
      <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {simplified ? `Simplified: ${simplified}` : "Enter two whole numbers to simplify the ratio"}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Solve for D in A : B = C : D</p>
        <label className="block max-w-xs">
          <span className="mb-1 block text-sm font-medium text-gray-700">C</span>
          <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="10" />
        </label>
        <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
          {scaled !== null ? `D = ${scaled.toLocaleString(undefined, { maximumFractionDigits: 4 })}` : "Fill in A, B, and C"}
        </div>
      </div>
    </div>
  );
}
