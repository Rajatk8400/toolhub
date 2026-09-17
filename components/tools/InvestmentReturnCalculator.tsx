"use client";

import { useState } from "react";

export default function InvestmentReturnCalculator() {
  const [initial, setInitial] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");

  const i0 = parseFloat(initial);
  const iF = parseFloat(finalValue);
  const t = parseFloat(years);
  const valid = i0 > 0 && iF >= 0 && t > 0;

  const totalReturn = valid ? ((iF - i0) / i0) * 100 : null;
  const cagr = valid ? (Math.pow(iF / i0, 1 / t) - 1) * 100 : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Initial investment</span>
          <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="10000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Final value</span>
          <input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="18000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Holding period (years)</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="5" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{totalReturn !== null ? totalReturn.toFixed(2) + "%" : "—"}</div>
          <div className="text-xs text-gray-500">Total return</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{cagr !== null ? cagr.toFixed(2) + "%" : "—"}</div>
          <div className="text-xs text-gray-500">Annualized return (CAGR)</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">CAGR = (Final / Initial)^(1/years) − 1. This reflects historical performance only and isn't a prediction of future returns.</p>
    </div>
  );
}
