"use client";

import { useState } from "react";

export default function PaceCalculator() {
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");

  const d = parseFloat(distance);
  const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
  const valid = d > 0 && totalSeconds > 0;

  const paceSecondsPerUnit = valid ? totalSeconds / d : null;
  const paceMin = paceSecondsPerUnit !== null ? Math.floor(paceSecondsPerUnit / 60) : 0;
  const paceSec = paceSecondsPerUnit !== null ? Math.round(paceSecondsPerUnit % 60) : 0;
  const speed = valid ? d / (totalSeconds / 3600) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Distance (km or miles)</span>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} aria-label="Distance" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <div>
          <span className="mb-1 block text-sm font-medium text-gray-700">Time</span>
          <div className="flex items-center gap-1">
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} aria-label="Hours" className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center" /><span className="text-xs text-gray-500">h</span>
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} aria-label="Minutes" className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center" /><span className="text-xs text-gray-500">m</span>
            <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} aria-label="Seconds" className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center" /><span className="text-xs text-gray-500">s</span>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{paceSecondsPerUnit !== null ? `${paceMin}:${paceSec.toString().padStart(2, "0")}` : "—"}</div>
          <div className="text-xs text-gray-500">Pace per unit distance</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{speed !== null ? speed.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Speed (per hour)</div>
        </div>
      </div>
    </div>
  );
}
