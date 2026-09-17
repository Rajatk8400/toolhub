"use client";

import { useState } from "react";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");

  const fc = parseFloat(fixedCosts);
  const price = parseFloat(pricePerUnit);
  const vc = parseFloat(variableCostPerUnit);
  const contributionMargin = price - vc;
  const valid = fc >= 0 && !isNaN(price) && !isNaN(vc) && contributionMargin > 0;

  const breakEvenUnits = valid ? fc / contributionMargin : null;
  const breakEvenRevenue = valid ? breakEvenUnits! * price : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Fixed costs</span>
          <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="10000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Price per unit</span>
          <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="50" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Variable cost/unit</span>
          <input type="number" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="30" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{breakEvenUnits !== null ? Math.ceil(breakEvenUnits).toLocaleString() : "—"}</div>
          <div className="text-xs text-gray-500">Break-even units</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{breakEvenRevenue !== null ? breakEvenRevenue.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Break-even revenue</div>
        </div>
      </div>
      {!valid && price <= vc && !isNaN(price) && !isNaN(vc) && (
        <p className="mt-3 text-sm text-red-600">Price per unit must be higher than variable cost per unit to ever break even.</p>
      )}
      <p className="mt-3 text-xs text-gray-500">Break-even point = Fixed costs / (Price per unit − Variable cost per unit)</p>
    </div>
  );
}
