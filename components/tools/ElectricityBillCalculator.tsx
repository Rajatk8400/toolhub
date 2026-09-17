"use client";

import { useState } from "react";

export default function ElectricityBillCalculator() {
  const [units, setUnits] = useState("");
  const [ratePerUnit, setRatePerUnit] = useState("");
  const [fixedCharge, setFixedCharge] = useState("0");

  const u = parseFloat(units);
  const rate = parseFloat(ratePerUnit);
  const fixed = parseFloat(fixedCharge) || 0;
  const valid = u >= 0 && rate >= 0;

  const energyCharge = valid ? u * rate : null;
  const total = valid ? energyCharge! + fixed : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Units consumed (kWh)</span>
          <input type="number" value={units} onChange={(e) => setUnits(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="250" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Rate per unit</span>
          <input type="number" value={ratePerUnit} onChange={(e) => setRatePerUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="8" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Fixed monthly charge</span>
          <input type="number" value={fixedCharge} onChange={(e) => setFixedCharge(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="0" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{energyCharge !== null ? energyCharge.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Energy charge</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{total !== null ? total.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Estimated total bill</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        This is a simplified flat-rate estimate. Many utilities use tiered or time-of-use rates, so your
        actual bill may differ — check your provider's rate schedule for an exact figure.
      </p>
    </div>
  );
}
