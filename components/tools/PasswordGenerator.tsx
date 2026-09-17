"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lower: true, upper: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");

  const toggle = (key: keyof typeof options) => setOptions((o) => ({ ...o, [key]: !o[key] }));

  const generate = () => {
    const pool = Object.entries(options)
      .filter(([, enabled]) => enabled)
      .map(([key]) => SETS[key as keyof typeof SETS])
      .join("");
    if (!pool) return;
    const bytes = crypto.getRandomValues(new Uint32Array(length));
    const result = Array.from(bytes, (b) => pool[b % pool.length]).join("");
    setPassword(result);
  };

  const strength = (() => {
    const enabledSets = Object.values(options).filter(Boolean).length;
    if (length >= 16 && enabledSets >= 3) return "Strong";
    if (length >= 10 && enabledSets >= 2) return "Medium";
    return "Weak";
  })();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Length: {length}</span>
        <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
      </label>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
        {(["lower", "upper", "numbers", "symbols"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2">
            <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} />
            {key === "lower" ? "a-z" : key === "upper" ? "A-Z" : key === "numbers" ? "0-9" : "symbols"}
          </label>
        ))}
      </div>
      <button onClick={generate} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Generate password
      </button>
      {password && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <code className="break-all font-mono text-sm text-gray-900">{password}</code>
          <button onClick={() => { navigator.clipboard.writeText(password); analytics.copyClicked("password-generator"); }} className="ml-3 shrink-0 text-xs font-medium text-blue-700 hover:underline">
            Copy
          </button>
        </div>
      )}
      {password && <p className="mt-2 text-xs text-gray-500">Estimated strength: {strength}</p>}
    </div>
  );
}
