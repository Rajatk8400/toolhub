"use client";

import { useState } from "react";

export default function SpeedCalculator() {
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("2");
  const [solveFor, setSolveFor] = useState<"speed" | "distance" | "time">("speed");
  const [speed, setSpeed] = useState("50");

  const d = parseFloat(distance);
  const t = parseFloat(time);
  const s = parseFloat(speed);

  let result: number | null = null;
  if (solveFor === "speed" && d > 0 && t > 0) result = d / t;
  else if (solveFor === "distance" && s > 0 && t > 0) result = s * t;
  else if (solveFor === "time" && d > 0 && s > 0) result = d / s;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-2">
        {(["speed", "distance", "time"] as const).map((f) => (
          <button key={f} onClick={() => setSolveFor(f)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${solveFor === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Solve for {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {solveFor !== "distance" && (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Distance</span>
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
        )}
        {solveFor !== "speed" && (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Speed</span>
            <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
        )}
        {solveFor !== "time" && (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Time</span>
            <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
        )}
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {result !== null ? `${solveFor} = ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}` : "Fill in the other two values"}
      </div>
      <p className="mt-3 text-xs text-gray-500">Speed = Distance / Time. Use consistent units throughout (e.g. km and hours, or miles and hours).</p>
    </div>
  );
}
