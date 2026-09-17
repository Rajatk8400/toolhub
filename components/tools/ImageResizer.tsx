"use client";

import { analytics } from "@/lib/analytics/track";
import { useRef, useState } from "react";

export default function ImageResizer() {
  const [origDims, setOrigDims] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileTypeRef = useRef<string>("image/png");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const ratioRef = useRef(1);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image");
      return;
    }
    setError(null);
    fileTypeRef.current = file.type;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        ratioRef.current = img.width / img.height;
        setOrigDims({ w: img.width, h: img.height });
        setWidth(String(img.width));
        setHeight(String(img.height));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onWidthChange = (v: string) => {
    setWidth(v);
    if (lockRatio) {
      const n = parseInt(v);
      if (!isNaN(n)) setHeight(String(Math.round(n / ratioRef.current)));
    }
  };
  const onHeightChange = (v: string) => {
    setHeight(v);
    if (lockRatio) {
      const n = parseInt(v);
      if (!isNaN(n)) setWidth(String(Math.round(n * ratioRef.current)));
    }
  };

  const resize = () => {
    const img = imgRef.current;
    const w = parseInt(width);
    const h = parseInt(height);
    if (!img || isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return setError("Canvas not supported in this browser");
    ctx.drawImage(img, 0, 0, w, h);
    canvas.toBlob((blob) => {
      if (!blob) return setError("Resize failed");
      setResultUrl(URL.createObjectURL(blob));
    }, fileTypeRef.current);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload an image (JPG, PNG, WebP)</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {origDims && (
        <>
          <p className="mt-3 text-sm text-gray-600">Original: {origDims.w} × {origDims.h}px</p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Width (px)</span>
              <input type="number" value={width} onChange={(e) => onWidthChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Height (px)</span>
              <input type="number" value={height} onChange={(e) => onHeightChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
            </label>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} />
            Lock aspect ratio
          </label>
          <button onClick={resize} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Resize image
          </button>
          {resultUrl && (
            <a href={resultUrl} download="resized-image" className="ml-3 inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200" onClick={() => analytics.downloadClicked("image-resizer")}>
              Download result
            </a>
          )}
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Resizing happens entirely in your browser — your image is never uploaded.</p>
    </div>
  );
}
