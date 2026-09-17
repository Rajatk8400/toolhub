"use client";

import { useState } from "react";

export default function SalaryCalculator() {
  const [gross, setGross] = useState("");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [deductionPct, setDeductionPct] = useState("");
  const [fixedDeductions, setFixedDeductions] = useState("");

  const g = parseFloat(gross);
  const pct = parseFloat(deductionPct) || 0;
  const fixed = parseFloat(fixedDeductions) || 0;
  const valid = g > 0;

  const pctDeduction = valid ? (g * pct) / 100 : null;
  const netAnnual = valid ? g - pctDeduction! - fixed : null;
  const divisor = period === "monthly" ? 1 : 12;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Gross salary</span>
          <input type="number" value={gross} onChange={(e) => setGross(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="600000" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Period</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value as "annual" | "monthly")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Total deductions (%)</span>
          <input type="number" value={deductionPct} onChange={(e) => setDeductionPct(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="e.g. 20" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Other fixed deductions</span>
          <input type="number" value={fixedDeductions} onChange={(e) => setFixedDeductions(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="0" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{pctDeduction !== null ? (pctDeduction / divisor).toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Deductions ({period})</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{netAnnual !== null ? (netAnnual / divisor).toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Take-home ({period})</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        This tool applies whatever deduction rate and fixed amounts you enter — it doesn't include built-in tax
        brackets for any country, since those vary by jurisdiction and change over time. Enter your own known
        deduction rate (tax, insurance, retirement contributions, etc.) for an accurate estimate.
      </p>
    </div>
  );
}
