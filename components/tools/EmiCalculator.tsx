"use client";

import { useState } from "react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");

  const p = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const months = parseFloat(tenure);
  const valid = p > 0 && annualRate > 0 && months > 0;

  let emi: number | null = null;
  let totalPayment: number | null = null;
  let totalInterest: number | null = null;

  if (valid) {
    const r = annualRate / 12 / 100;
    emi = (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    totalPayment = emi * months;
    totalInterest = totalPayment - p;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Loan amount</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="500000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Interest rate (annual %)</span>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="8.5" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Tenure (months)</span>
          <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="60" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{emi ? emi.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Monthly EMI</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{totalInterest ? totalInterest.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total interest</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{totalPayment ? totalPayment.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Total payment</div>
        </div>
      </div>
    </div>
  );
}
