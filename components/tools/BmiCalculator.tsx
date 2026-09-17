"use client";

import { useState } from "react";

function classify(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const h = parseFloat(heightCm) / 100;
  const w = parseFloat(weightKg);
  const valid = h > 0 && !isNaN(w);
  const bmi = valid ? w / (h * h) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Height (cm)</span>
          <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="170" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Weight (kg)</span>
          <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="65" />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {bmi ? `BMI: ${bmi.toFixed(1)} — ${classify(bmi)}` : "Enter height and weight to see your BMI"}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        BMI is a general screening measure and doesn't account for muscle mass, age, or body composition. It isn't a
        diagnosis — talk to a healthcare provider for personalized guidance.
      </p>
    </div>
  );
}
