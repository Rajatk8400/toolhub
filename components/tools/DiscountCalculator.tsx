"use client";

import { useState } from "react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const p = parseFloat(price);
  const d = parseFloat(discount);
  const valid = !isNaN(p) && !isNaN(d);
  const saved = valid ? (p * d) / 100 : null;
  const final = valid ? p - saved! : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Original price</span>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="0" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Discount %</span>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="0" />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{saved !== null ? saved.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">You save</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">{final !== null ? final.toFixed(2) : "—"}</div>
          <div className="text-xs text-gray-500">Final price</div>
        </div>
      </div>
    </div>
  );
}
