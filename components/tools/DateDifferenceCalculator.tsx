"use client";

import { useState } from "react";

export default function DateDifferenceCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const from = start ? new Date(start) : null;
  const to = end ? new Date(end) : null;
  const valid = from && to && !isNaN(from.getTime()) && !isNaN(to.getTime());

  let years = 0, months = 0, days = 0, totalDays = 0;
  if (valid) {
    const [earlier, later] = from!.getTime() <= to!.getTime() ? [from!, to!] : [to!, from!];
    totalDays = Math.round((later.getTime() - earlier.getTime()) / 86400000);
    years = later.getFullYear() - earlier.getFullYear();
    months = later.getMonth() - earlier.getMonth();
    days = later.getDate() - earlier.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Start date</span>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">End date</span>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {valid ? `${years} years, ${months} months, ${days} days (${totalDays.toLocaleString()} total days)` : "Enter both dates"}
      </div>
    </div>
  );
}
