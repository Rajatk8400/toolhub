"use client";

import { useState } from "react";

type Mode = "percent-of" | "what-percent" | "change";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const valid = !isNaN(numA) && !isNaN(numB);

  let result: string | null = null;
  if (valid) {
    if (mode === "percent-of") {
      result = `${a}% of ${b} is ${((numA / 100) * numB).toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    } else if (mode === "what-percent") {
      result =
        numB !== 0
          ? `${a} is ${((numA / numB) * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% of ${b}`
          : "Cannot divide by zero";
    } else if (mode === "change") {
      result =
        numA !== 0
          ? `Change from ${a} to ${b} is ${(((numB - numA) / numA) * 100).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}%`
          : "Cannot divide by zero";
    }
  }

  const modes: { id: Mode; label: string; hintA: string; hintB: string }[] = [
    { id: "percent-of", label: "% of a number", hintA: "Percentage", hintB: "Number" },
    { id: "what-percent", label: "X is what % of Y", hintA: "X", hintB: "Y" },
    { id: "change", label: "% Increase / Decrease", hintA: "Original value", hintB: "New value" },
  ];
  const current = modes.find((m) => m.id === mode)!;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              mode === m.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">{current.hintA}</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="0"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">{current.hintB}</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="0"
          />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {result ?? "Enter both values to see the result"}
      </div>
    </div>
  );
}
