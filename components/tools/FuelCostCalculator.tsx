"use client";

import { useState } from "react";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const d = parseFloat(distance);
  const eff = parseFloat(efficiency);
  const price = parseFloat(pricePerUnit);
  const valid = d > 0 && eff > 0 && price >= 0;

  const fuelNeeded = valid ? d / eff : null;
  const cost = valid ? fuelNeeded! * price : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Distance</span>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="500 (km or miles)" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Fuel efficiency</span>
          <input type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="15 (distance per unit fuel)" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Price per unit fuel</span>
          <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="100" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{fuelNeeded !== null ? fuelNeeded.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Fuel needed</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{cost !== null ? cost.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total fuel cost</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">Works with any consistent units — e.g. km and km/liter, or miles and miles/gallon.</p>
    </div>
  );
}
