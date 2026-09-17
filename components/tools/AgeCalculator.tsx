"use client";

import { useState } from "react";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(today);

  const from = dob ? new Date(dob) : null;
  const to = asOf ? new Date(asOf) : null;
  const valid = from && to && !isNaN(from.getTime()) && !isNaN(to.getTime()) && from <= to;

  const result = valid ? diffYMD(from!, to!) : null;
  const totalDays = valid ? Math.floor((to!.getTime() - from!.getTime()) / 86400000) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Date of birth</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Calculate age as of</span>
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {result
          ? `${result.years} years, ${result.months} months, ${result.days} days (${totalDays!.toLocaleString()} total days)`
          : "Enter a valid date of birth to see the result"}
      </div>
    </div>
  );
}
