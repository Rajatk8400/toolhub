"use client";

import { useState } from "react";

interface Info {
  name: string;
  width: number;
  height: number;
  sizeKb: string;
  type: string;
  aspectRatio: string;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function ImageInfoChecker() {
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const divisor = gcd(img.width, img.height);
        setInfo({
          name: file.name,
          width: img.width,
          height: img.height,
          sizeKb: (file.size / 1024).toFixed(1),
          type: file.type,
          aspectRatio: `${img.width / divisor}:${img.height / divisor}`,
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload an image</span>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {info && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ["File name", info.name],
            ["Dimensions", `${info.width} × ${info.height}px`],
            ["Aspect ratio", info.aspectRatio],
            ["File size", `${info.sizeKb} KB`],
            ["Format", info.type.replace("image/", "").toUpperCase()],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-gray-50 p-3">
              <div className="truncate text-sm font-semibold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-gray-500">Everything happens locally — your image is never uploaded.</p>
    </div>
  );
}
