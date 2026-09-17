"use client";

import { useState } from "react";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

function threeDigits(n: number): string {
  let str = "";
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + " hundred";
    n %= 100;
    if (n > 0) str += " ";
  }
  if (n >= 20) {
    str += TENS[Math.floor(n / 10)];
    if (n % 10 > 0) str += "-" + ONES[n % 10];
  } else if (n > 0) {
    str += ONES[n];
  }
  return str;
}

function numberToWords(num: number): string {
  if (num === 0) return "zero";
  const negative = num < 0;
  num = Math.abs(Math.floor(num));
  const groups: number[] = [];
  while (num > 0) {
    groups.push(num % 1000);
    num = Math.floor(num / 1000);
  }
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    parts.push(threeDigits(groups[i]) + (SCALES[i] ? " " + SCALES[i] : ""));
  }
  return (negative ? "negative " : "") + parts.join(" ");
}

export default function NumberToWords() {
  const [value, setValue] = useState("");
  const n = parseFloat(value);
  const valid = !isNaN(n) && Math.abs(n) < 1e15;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Number</span>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="12345" />
      </label>
      <div className="mt-4 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold capitalize text-blue-900">
        {valid ? numberToWords(n) : "Enter a whole or decimal number"}
      </div>
    </div>
  );
}
