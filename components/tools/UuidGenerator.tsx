"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics/track";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    const list = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(list);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    analytics.copyClicked("uuid-generator");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">How many</span>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </label>
        <button onClick={generate} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Generate
        </button>
        <button onClick={copyAll} disabled={!uuids.length} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50">
          Copy all
        </button>
      </div>
      {uuids.length > 0 && (
        <pre className="mt-4 max-h-72 overflow-auto rounded-lg bg-gray-50 p-4 font-mono text-sm">{uuids.join("\n")}</pre>
      )}
    </div>
  );
}
