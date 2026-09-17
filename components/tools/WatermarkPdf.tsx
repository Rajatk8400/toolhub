"use client";

import { useState } from "react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export default function WatermarkPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    setError(null);
    setFile(f);
  };

  const apply = async () => {
    if (!file || !text.trim()) return;
    setWorking(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const fontSize = Math.min(width, height) / 10;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(45),
        });
      }
      const outBytes = await doc.save();
      const blob = new Blob([new Uint8Array(outBytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "watermarked.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not watermark this PDF — it may be corrupted or password-protected");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload a PDF file</span>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {file && (
        <>
          <p className="mt-3 text-sm text-gray-600">{file.name}</p>
          <label className="mt-3 block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Watermark text</span>
            <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
          <label className="mt-3 block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Opacity: {Math.round(opacity * 100)}%</span>
            <input type="range" min={0.1} max={0.8} step={0.05} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full" />
          </label>
          <button
            onClick={apply}
            disabled={working || !text.trim()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {working ? "Applying..." : "Add watermark & download"}
          </button>
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Processing happens entirely in your browser — the file is never uploaded.</p>
    </div>
  );
}
