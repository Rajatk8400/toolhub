"use client";

import { useState } from "react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));

  const onTimestampChange = (v: string) => {
    setTimestamp(v);
    const n = parseInt(v);
    if (!isNaN(n)) setDateStr(new Date(n * 1000).toISOString().slice(0, 19));
  };

  const onDateChange = (v: string) => {
    setDateStr(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) setTimestamp(String(Math.floor(d.getTime() / 1000)));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Unix timestamp (seconds)</span>
          <input value={timestamp} onChange={(e) => onTimestampChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">UTC date/time</span>
          <input type="datetime-local" step={1} value={dateStr} onChange={(e) => onDateChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
      </div>
      <button
        onClick={() => onTimestampChange(String(Math.floor(Date.now() / 1000)))}
        className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Use current time
      </button>
    </div>
  );
}
