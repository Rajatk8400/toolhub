"use client";

import { useState } from "react";

const UNITS = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
} as const;

type Unit = keyof typeof UNITS;

export default function LengthConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<Unit>("meter");
  const [to, setTo] = useState<Unit>("foot");

  const n = parseFloat(value);
  const result = !isNaN(n) ? (n * UNITS[from]) / UNITS[to] : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Value</span>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value as Unit)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value as Unit)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {result !== null ? `${value} ${from} = ${result.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${to}` : "Enter a value"}
      </div>
    </div>
  );
}
