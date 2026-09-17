"use client";

import { useState } from "react";

export default function TimeCalculator() {
  const [h1, setH1] = useState("2");
  const [m1, setM1] = useState("30");
  const [op, setOp] = useState<"+" | "-">("+");
  const [h2, setH2] = useState("1");
  const [m2, setM2] = useState("45");

  const totalMin1 = (parseInt(h1) || 0) * 60 + (parseInt(m1) || 0);
  const totalMin2 = (parseInt(h2) || 0) * 60 + (parseInt(m2) || 0);
  let resultMin = op === "+" ? totalMin1 + totalMin2 : totalMin1 - totalMin2;
  const negative = resultMin < 0;
  resultMin = Math.abs(resultMin);
  const rh = Math.floor(resultMin / 60);
  const rm = resultMin % 60;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <input type="number" aria-label="First duration, hours" value={h1} onChange={(e) => setH1(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" /><span className="text-sm text-gray-500">h</span>
          <input type="number" aria-label="First duration, minutes" value={m1} onChange={(e) => setM1(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" /><span className="text-sm text-gray-500">m</span>
        </div>
        <select value={op} onChange={(e) => setOp(e.target.value as typeof op)} aria-label="Operation" className="rounded-lg border border-gray-300 px-3 py-2">
          <option value="+">+</option>
          <option value="-">−</option>
        </select>
        <div className="flex items-center gap-1">
          <input type="number" aria-label="Second duration, hours" value={h2} onChange={(e) => setH2(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" /><span className="text-sm text-gray-500">h</span>
          <input type="number" aria-label="Second duration, minutes" value={m2} onChange={(e) => setM2(e.target.value)} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center" /><span className="text-sm text-gray-500">m</span>
        </div>
        <span className="text-lg">=</span>
        <div className="rounded-lg bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-900">
          {negative ? "-" : ""}{rh}h {rm}m
        </div>
      </div>
    </div>
  );
}
