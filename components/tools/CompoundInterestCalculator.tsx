"use client";

import { useState } from "react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [freq, setFreq] = useState("1");

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const t = parseFloat(years);
  const n = parseFloat(freq);
  const valid = p > 0 && r >= 0 && t >= 0 && n > 0;

  const total = valid ? p * Math.pow(1 + r / 100 / n, n * t) : null;
  const interest = valid ? total! - p : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Principal</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="10000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Annual rate (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="6" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Time (years)</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="5" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Compounds/year</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{interest !== null ? interest.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Interest earned</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{total !== null ? total.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total amount</div>
        </div>
      </div>
    </div>
  );
}
