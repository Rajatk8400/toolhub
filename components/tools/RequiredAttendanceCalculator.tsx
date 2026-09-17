"use client";

import { useState } from "react";

export default function RequiredAttendanceCalculator() {
  const [held, setHeld] = useState("");
  const [attended, setAttended] = useState("");
  const [remaining, setRemaining] = useState("");
  const [target, setTarget] = useState("75");

  const h = parseFloat(held);
  const a = parseFloat(attended);
  const rem = parseFloat(remaining);
  const t = parseFloat(target);
  const valid = h >= 0 && a >= 0 && a <= h && rem >= 0 && t > 0 && t <= 100;

  let result: string | null = null;
  if (valid) {
    const totalFuture = h + rem;
    const needed = Math.ceil((t / 100) * totalFuture - a);
    if (needed <= 0) {
      result = "You've already met the target — you can miss all remaining classes and stay at or above it.";
    } else if (needed > rem) {
      result = `Not achievable — even attending all ${rem} remaining classes won't reach ${t}%.`;
    } else {
      result = `Attend at least ${needed} of the remaining ${rem} classes to reach ${t}%.`;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Classes held so far</span>
          <input type="number" value={held} onChange={(e) => setHeld(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="40" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Classes attended</span>
          <input type="number" value={attended} onChange={(e) => setAttended(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="28" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Classes remaining</span>
          <input type="number" value={remaining} onChange={(e) => setRemaining(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="20" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Target %</span>
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="75" />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
        {result || "Fill in all four fields"}
      </div>
    </div>
  );
}
