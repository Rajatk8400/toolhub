"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

interface ImgFile {
  file: File;
  dataUrl: string;
}

export default function JpgToPdf() {
  const [images, setImages] = useState<ImgFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList);
    for (const f of files) {
      if (!["image/jpeg", "image/png"].includes(f.type)) {
        setError("Only JPG and PNG images are supported");
        continue;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, { file: f, dataUrl: e.target?.result as string }]);
      };
      reader.readAsDataURL(f);
    }
  };

  const removeAt = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const generate = () => {
    if (images.length === 0) return;
    const doc = new jsPDF({ unit: "px" });
    images.forEach((img, i) => {
      const el = new Image();
      el.src = img.dataUrl;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / el.width || 1, pageHeight / el.height || 1);
      const w = (el.width || pageWidth) * (ratio || 1);
      const h = (el.height || pageHeight) * (ratio || 1);
      if (i > 0) doc.addPage();
      doc.addImage(img.dataUrl, img.file.type === "image/png" ? "PNG" : "JPEG", 0, 0, w || pageWidth, h || pageHeight);
    });
    doc.save("converted.pdf");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload JPG or PNG images (multiple allowed)</span>
        <input type="file" accept="image/jpeg,image/png" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {images.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((img, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.dataUrl} alt={img.file.name} decoding="async" className="h-24 w-full rounded-lg object-cover" />
                <button
                  onClick={() => removeAt(i)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button onClick={generate} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Convert to PDF ({images.length} page{images.length === 1 ? "" : "s"})
          </button>
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Conversion happens entirely in your browser — no upload required.</p>
    </div>
  );
}
