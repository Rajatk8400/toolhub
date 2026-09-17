"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const SIZES = [16, 32, 48, 180, 192, 512];

export default function FaviconGenerator() {
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Please upload a PNG or JPG image (ideally square)");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const results = SIZES.map((size) => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.drawImage(img, 0, 0, size, size);
          return { size, url: canvas.toDataURL("image/png") };
        });
        setPreviews(results);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload a square logo image (PNG or JPG)</span>
        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {previews.map((p) => (
            <div key={p.size} className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={`${p.size}x${p.size}`} decoding="async" className="mx-auto rounded border border-gray-200" style={{ width: Math.min(p.size, 64), height: Math.min(p.size, 64) }} />
              <div className="mt-1 text-xs text-gray-500">{p.size}×{p.size}</div>
              <a href={p.url} download={`favicon-${p.size}.png`} className="text-xs text-blue-700 hover:underline" onClick={() => analytics.downloadClicked("favicon-generator")}>
                Download
              </a>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-gray-500">
        Generates the common favicon/app-icon sizes (16, 32, 48, 180, 192, 512px) from your image, entirely in your
        browser. For best results, start with a square source image.
      </p>
    </div>
  );
}
