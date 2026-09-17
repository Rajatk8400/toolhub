"use client";

import { useState } from "react";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const m = parseFloat(monthly);
  const annualRate = parseFloat(rate);
  const t = parseFloat(years);
  const valid = m > 0 && annualRate >= 0 && t > 0;

  let futureValue: number | null = null;
  let invested: number | null = null;
  if (valid) {
    const i = annualRate / 100 / 12;
    const n = t * 12;
    invested = m * n;
    futureValue = i === 0 ? invested : m * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }
  const gains = futureValue !== null && invested !== null ? futureValue - invested : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Monthly investment</span>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="5000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Expected annual return (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="12" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Duration (years)</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="10" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{invested !== null ? invested.toFixed(0) : "—"}</div>
          <div className="text-xs text-gray-500">Total invested</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{gains !== null ? gains.toFixed(0) : "—"}</div>
          <div className="text-xs text-gray-500">Estimated gains</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{futureValue !== null ? futureValue.toFixed(0) : "—"}</div>
          <div className="text-xs text-gray-500">Future value</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        This is an estimate assuming a constant monthly return rate. Actual investment returns vary and aren't
        guaranteed — this isn't financial advice.
      </p>
    </div>
  );
}
