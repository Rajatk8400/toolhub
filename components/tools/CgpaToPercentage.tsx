"use client";

import { useState } from "react";

export default function CgpaToPercentage() {
  const [cgpa, setCgpa] = useState("");
  const value = parseFloat(cgpa);
  const valid = !isNaN(value) && value >= 0 && value <= 10;
  const percentage = valid ? (value * 9.5).toFixed(2) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">CGPA (out of 10)</span>
        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="e.g. 8.2"
        />
      </label>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {percentage ? `Equivalent percentage: ${percentage}%` : "Enter a CGPA between 0 and 10"}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Uses the standard CBSE formula (CGPA × 9.5). Some universities use a different multiplier — check your
        institution's official conversion table if needed.
      </p>
    </div>
  );
}
