"use client";

import { analytics } from "@/lib/analytics/track";
import { useRef, useState } from "react";

const FORMATS: { label: string; mime: string; ext: string }[] = [
  { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  { label: "PNG", mime: "image/png", ext: "png" },
  { label: "WebP", mime: "image/webp", ext: "webp" },
];

export default function ImageFormatConverter() {
  const [target, setTarget] = useState(FORMATS[0]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image");
      return;
    }
    setError(null);
    setResultUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setReady(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const convert = (format: typeof FORMATS[number]) => {
    setTarget(format);
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return setError("Canvas not supported in this browser");
    if (format.mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return setError("Conversion failed");
      setResultUrl(URL.createObjectURL(blob));
    }, format.mime, 0.92);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload an image (JPG, PNG, WebP)</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {ready && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.mime}
                onClick={() => convert(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${target.mime === f.mime && resultUrl ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Convert to {f.label}
              </button>
            ))}
          </div>
          {resultUrl && (
            <a href={resultUrl} download={`converted.${target.ext}`} className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => analytics.downloadClicked("image-format-converter")}>
              Download {target.label}
            </a>
          )}
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Conversion happens entirely in your browser — your image is never uploaded.</p>
    </div>
  );
}
