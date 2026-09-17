"use client";

import { useState } from "react";

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");

  const c = parseFloat(cost);
  const rev = parseFloat(revenue);
  const valid = !isNaN(c) && !isNaN(rev) && rev !== 0;

  const profit = valid ? rev - c : null;
  const margin = valid ? (profit! / rev) * 100 : null;
  const markup = valid && c !== 0 ? (profit! / c) * 100 : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Cost price</span>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="60" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Selling price (revenue)</span>
          <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="100" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{profit !== null ? profit.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Profit</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{margin !== null ? margin.toFixed(2) + "%" : "—"}</div>
          <div className="text-xs text-gray-500">Profit margin</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{markup !== null ? markup.toFixed(2) + "%" : "—"}</div>
          <div className="text-xs text-gray-500">Markup</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">Margin = Profit / Revenue × 100. Markup = Profit / Cost × 100 — they answer different questions, so don't use them interchangeably.</p>
    </div>
  );
}
