"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: string;
}

export default function UnitPriceCalculator() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: "", quantity: "" },
    { id: 2, name: "Product B", price: "", quantity: "" },
  ]);
  const [nextId, setNextId] = useState(3);

  const addProduct = () => {
    setProducts((p) => [...p, { id: nextId, name: `Product ${String.fromCharCode(65 + p.length)}`, price: "", quantity: "" }]);
    setNextId((n) => n + 1);
  };
  const removeProduct = (id: number) => setProducts((p) => p.filter((x) => x.id !== id));
  const update = (id: number, field: "name" | "price" | "quantity", value: string) =>
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const results = products.map((p) => {
    const price = parseFloat(p.price);
    const qty = parseFloat(p.quantity);
    const unitPrice = !isNaN(price) && qty > 0 ? price / qty : null;
    return { ...p, unitPrice };
  });
  const cheapest = results.reduce<number | null>((best, r) => {
    if (r.unitPrice === null) return best;
    if (best === null || r.unitPrice < best) return r.unitPrice;
    return best;
  }, null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        {products.map((p) => {
          const result = results.find((r) => r.id === p.id);
          const isCheapest = result?.unitPrice !== null && result?.unitPrice === cheapest;
          return (
            <div key={p.id} className={`flex flex-wrap items-center gap-2 rounded-lg border p-2 ${isCheapest ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
              <input value={p.name} onChange={(e) => update(p.id, "name", e.target.value)} aria-label={`Product name`} className="w-28 rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
              <input type="number" value={p.price} onChange={(e) => update(p.id, "price", e.target.value)} placeholder="Price" aria-label={`Price for ${p.name || "product"}`} className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
              <input type="number" value={p.quantity} onChange={(e) => update(p.id, "quantity", e.target.value)} placeholder="Quantity" aria-label={`Quantity for ${p.name || "product"}`} className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
              <span className="text-sm font-medium text-gray-700">
                {result?.unitPrice !== null ? `= ${result?.unitPrice.toFixed(4)}/unit` : ""}
                {isCheapest && " 🏆 Best value"}
              </span>
              {products.length > 2 && <button onClick={() => removeProduct(p.id)} className="ml-auto text-xs text-red-600 hover:underline">Remove</button>}
            </div>
          );
        })}
      </div>
      <button onClick={addProduct} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add product</button>
    </div>
  );
}
