"use client";

import { useState } from "react";

export default function PercentageToCgpa() {
  const [percentage, setPercentage] = useState("");
  const value = parseFloat(percentage);
  const valid = !isNaN(value) && value >= 0 && value <= 100;
  const cgpa = valid ? (value / 9.5).toFixed(2) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Percentage</span>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="e.g. 78"
        />
      </label>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {cgpa ? `Equivalent CGPA: ${cgpa}` : "Enter a percentage between 0 and 100"}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Uses the standard CBSE formula in reverse (Percentage ÷ 9.5). Some universities use a different
        multiplier — check your institution's official conversion table if needed.
      </p>
    </div>
  );
}
