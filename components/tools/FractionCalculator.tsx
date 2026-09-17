"use client";

import { useState } from "react";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, d];
  const g = gcd(n, d) || 1;
  const sign = d < 0 ? -1 : 1;
  return [(n / g) * sign, Math.abs(d / g)];
}

export default function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [op, setOp] = useState<"+" | "-" | "×" | "÷">("+");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");

  const a = parseInt(n1), b = parseInt(d1), c = parseInt(n2), d = parseInt(d2);
  const valid = [a, b, c, d].every((x) => !isNaN(x)) && b !== 0 && d !== 0;

  let resultN = 0, resultD = 1;
  if (valid) {
    if (op === "+") { resultN = a * d + c * b; resultD = b * d; }
    else if (op === "-") { resultN = a * d - c * b; resultD = b * d; }
    else if (op === "×") { resultN = a * c; resultD = b * d; }
    else if (op === "÷") { resultN = a * d; resultD = b * c; }
  }
  const [simN, simD] = valid && resultD !== 0 ? simplify(resultN, resultD) : [0, 1];
  const [origN1, origD1] = valid ? simplify(a, b) : [0, 1];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <input type="number" aria-label="First fraction numerator" value={n1} onChange={(e) => setN1(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" />
          <div className="h-px w-16 bg-gray-400" />
          <input type="number" aria-label="First fraction denominator" value={d1} onChange={(e) => setD1(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" />
        </div>
        <select value={op} onChange={(e) => setOp(e.target.value as typeof op)} aria-label="Operation" className="rounded-lg border border-gray-300 px-3 py-2 text-lg">
          {["+", "-", "×", "÷"].map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="flex flex-col items-center gap-1">
          <input type="number" aria-label="Second fraction numerator" value={n2} onChange={(e) => setN2(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" />
          <div className="h-px w-16 bg-gray-400" />
          <input type="number" aria-label="Second fraction denominator" value={d2} onChange={(e) => setD2(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" />
        </div>
        <span className="text-lg">=</span>
        <div className="rounded-lg bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-900">
          {valid && resultD !== 0 ? `${simN} / ${simD}` : "—"}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        {valid && (origN1 !== a || origD1 !== b) && `${n1}/${d1} simplifies to ${origN1}/${origD1}. `}
        Results are automatically simplified to lowest terms.
      </p>
    </div>
  );
}
