"use client";

import { useState } from "react";

export default function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const a = parseFloat(amount);
  const r = parseFloat(rate);
  const valid = !isNaN(a) && !isNaN(r);

  let gstAmount: number | null = null;
  let total: number | null = null;
  let base: number | null = null;

  if (valid) {
    if (mode === "exclusive") {
      gstAmount = (a * r) / 100;
      total = a + gstAmount;
      base = a;
    } else {
      base = a / (1 + r / 100);
      gstAmount = a - base;
      total = a;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-2">
        {(["exclusive", "inclusive"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {m === "exclusive" ? "Add GST" : "Remove GST"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Amount</span>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="1000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">GST rate (%)</span>
          <select value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {["5", "12", "18", "28"].map((v) => <option key={v} value={v}>{v}%</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{base !== null ? base.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Base amount</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{gstAmount !== null ? gstAmount.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">GST amount</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{total !== null ? total.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
}
