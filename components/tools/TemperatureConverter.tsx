"use client";

import { useState } from "react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const onCelsiusChange = (v: string) => {
    setCelsius(v);
    const n = parseFloat(v);
    setFahrenheit(isNaN(n) ? "" : ((n * 9) / 5 + 32).toFixed(2));
  };

  const onFahrenheitChange = (v: string) => {
    setFahrenheit(v);
    const n = parseFloat(v);
    setCelsius(isNaN(n) ? "" : (((n - 32) * 5) / 9).toFixed(2));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Celsius (°C)</span>
          <input
            type="number"
            value={celsius}
            onChange={(e) => onCelsiusChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="0"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Fahrenheit (°F)</span>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => onFahrenheitChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="32"
          />
        </label>
      </div>
      <p className="mt-3 text-xs text-gray-500">Type into either field — the other updates automatically.</p>
    </div>
  );
}
