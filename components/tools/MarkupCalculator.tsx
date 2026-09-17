"use client";

import { useState } from "react";

export default function MarkupCalculator() {
  const [cost, setCost] = useState("");
  const [markupPct, setMarkupPct] = useState("");

  const c = parseFloat(cost);
  const m = parseFloat(markupPct);
  const valid = c >= 0 && m >= 0;

  const markupAmount = valid ? (c * m) / 100 : null;
  const sellingPrice = valid ? c + markupAmount! : null;
  const marginPct = valid && sellingPrice ? (markupAmount! / sellingPrice) * 100 : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Cost price</span>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="50" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Desired markup (%)</span>
          <input type="number" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="40" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{markupAmount !== null ? markupAmount.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Markup amount</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{sellingPrice !== null ? sellingPrice.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Selling price</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{marginPct !== null ? marginPct.toFixed(2) + "%" : "—"}</div>
          <div className="text-xs text-gray-500">Equivalent margin</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">Enter cost and your target markup percentage to find the price to charge — and see the equivalent profit margin.</p>
    </div>
  );
}
