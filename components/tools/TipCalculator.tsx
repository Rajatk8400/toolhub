"use client";

import { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState("1");

  const b = parseFloat(bill);
  const p = Math.max(1, parseInt(people) || 1);
  const valid = b >= 0;

  const tipAmount = valid ? (b * tipPct) / 100 : null;
  const total = valid ? b + tipAmount! : null;
  const perPerson = total !== null ? total / p : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Bill amount</span>
          <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="50" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Split between</span>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="1" />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Tip: {tipPct}%</span>
        <input type="range" min={0} max={30} value={tipPct} onChange={(e) => setTipPct(parseInt(e.target.value))} className="w-full" />
      </label>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{tipAmount !== null ? tipAmount.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Tip amount</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{total !== null ? total.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{perPerson !== null ? perPerson.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Per person</div>
        </div>
      </div>
    </div>
  );
}
