"use client";

import { useRef, useState } from "react";
import { analytics } from "@/lib/analytics/track";

export default function ImageCompressor() {
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const fileRef = useRef<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const process = (file: File, q: number) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return setError("Canvas not supported in this browser");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) return setError("Compression failed");
            setCompressedSize(blob.size);
            setResultUrl(URL.createObjectURL(blob));
          },
          file.type === "image/png" ? "image/png" : "image/jpeg",
          q
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image");
      return;
    }
    setError(null);
    fileRef.current = file;
    setOriginalSize(file.size);
    process(file, quality);
  };

  const onQualityChange = (v: number) => {
    setQuality(v);
    if (fileRef.current) process(fileRef.current, v);
  };

  const fmt = (bytes: number) => (bytes / 1024).toFixed(1) + " KB";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload or drag an image (JPG, PNG, WebP)</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {originalSize !== null && (
        <div className="mt-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Quality: {Math.round(quality * 100)}%</span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => onQualityChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-lg font-bold text-gray-900">{fmt(originalSize)}</div>
              <div className="text-xs text-gray-500">Original</div>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <div className="text-lg font-bold text-blue-900">{compressedSize ? fmt(compressedSize) : "—"}</div>
              <div className="text-xs text-gray-500">Compressed</div>
            </div>
          </div>

          {resultUrl && (
            <a
              href={resultUrl}
              download="compressed-image.jpg"
              onClick={() => analytics.downloadClicked("image-compressor", "jpg")}
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download compressed image
            </a>
          )}
        </div>
      )}
      <p className="mt-4 text-xs text-gray-500">
        Processing happens entirely in your browser using the Canvas API — your image is never uploaded.
      </p>
    </div>
  );
}
