"use client";

import { useState } from "react";

export default function AttendanceCalculator() {
  const [held, setHeld] = useState("");
  const [attended, setAttended] = useState("");
  const [required, setRequired] = useState("75");

  const h = parseFloat(held);
  const a = parseFloat(attended);
  const req = parseFloat(required);
  const valid = h > 0 && a >= 0 && a <= h;

  const currentPct = valid ? (a / h) * 100 : null;

  // Classes that can still be skipped while staying at/above the requirement, or
  // classes that must be attended in a row to reach it.
  let message: string | null = null;
  if (valid && !isNaN(req)) {
    if (currentPct! >= req) {
      // how many more can be missed: (a) / (h + x) >= req/100  => x <= a*100/req - h
      const canMiss = Math.floor((a * 100) / req - h);
      message = canMiss > 0
        ? `You can miss ${canMiss} more class${canMiss === 1 ? "" : "es"} and stay at or above ${req}%.`
        : `Missing any more classes will drop you below ${req}%.`;
    } else {
      // classes needed: (a + x) / (h + x) >= req/100 => x >= (req*h - 100*a) / (100 - req)
      const needed = Math.ceil((req * h - 100 * a) / (100 - req));
      message = `Attend the next ${needed} class${needed === 1 ? "" : "es"} in a row to reach ${req}%.`;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Classes held</span>
          <input type="number" value={held} onChange={(e) => setHeld(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="60" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Classes attended</span>
          <input type="number" value={attended} onChange={(e) => setAttended(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="48" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Required %</span>
          <input type="number" value={required} onChange={(e) => setRequired(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="75" />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {currentPct !== null ? `Current attendance: ${currentPct.toFixed(2)}%` : "Enter classes held and attended"}
      </div>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
