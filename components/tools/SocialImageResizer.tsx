"use client";

import { analytics } from "@/lib/analytics/track";
import { useRef, useState } from "react";

const PRESETS = [
  { label: "Instagram Post (1:1)", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Facebook Post", w: 1200, h: 630 },
  { label: "Twitter/X Post", w: 1600, h: 900 },
  { label: "LinkedIn Post", w: 1200, h: 627 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
];

export default function SocialImageResizer() {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [preset, setPreset] = useState(PRESETS[0]);
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

  const resize = (p: typeof PRESETS[number]) => {
    setPreset(p);
    const img = imgRef.current;
    if (!img) return;
    // Cover-fit: scale to fill target, cropping overflow, centered.
    const canvas = document.createElement("canvas");
    canvas.width = p.w;
    canvas.height = p.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return setError("Canvas not supported in this browser");
    const scale = Math.max(p.w / img.width, p.h / img.height);
    const sw = p.w / scale;
    const sh = p.h / scale;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, p.w, p.h);
    canvas.toBlob((blob) => {
      if (!blob) return setError("Resize failed");
      setResultUrl(URL.createObjectURL(blob));
    }, "image/jpeg", 0.92);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload an image</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {ready && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => resize(p)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${preset.label === p.label && resultUrl ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {p.label} ({p.w}×{p.h})
              </button>
            ))}
          </div>
          {resultUrl && (
            <a href={resultUrl} download={`social-${preset.w}x${preset.h}.jpg`} className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => analytics.downloadClicked("social-media-image-resizer")}>
              Download {preset.label}
            </a>
          )}
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Crops to fill the target size (center crop), entirely in your browser.</p>
    </div>
  );
}
