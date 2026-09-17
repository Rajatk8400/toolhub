"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { analytics } from "@/lib/analytics/track";

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.6);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    setError(null);
    setFile(f);
    setOriginalSize(f.size);
    setResultUrl(null);
    setCompressedSize(null);
  };

  const compress = async () => {
    if (!file) return;
    setWorking(true);
    setError(null);
    setResultUrl(null);
    try {
      // Dynamic import: pdfjs-dist is only needed client-side and is fairly large, so it
      // shouldn't be in the initial bundle for every tool page.
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const doc = new jsPDF({ unit: "pt" });

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        // Render at a moderate scale — high enough to stay legible after JPEG compression,
        // not so high that it works against the compression itself.
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported in this browser");
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
        const widthPt = viewport.width * 0.75; // px -> pt at 96dpi baseline
        const heightPt = viewport.height * 0.75;

        if (i === 1) {
          doc.deletePage(1);
          doc.addPage([widthPt, heightPt]);
        } else {
          doc.addPage([widthPt, heightPt]);
        }
        doc.addImage(jpegDataUrl, "JPEG", 0, 0, widthPt, heightPt);
      }

      setProgress(null);
      const outBlob = doc.output("blob");
      setCompressedSize(outBlob.size);
      setResultUrl(URL.createObjectURL(outBlob));
    } catch (e) {
      setError(e instanceof Error ? `Could not compress this PDF: ${e.message}` : "Could not compress this PDF");
      setProgress(null);
    } finally {
      setWorking(false);
    }
  };

  const fmt = (bytes: number) => (bytes / 1024).toFixed(1) + " KB";
  const savings = originalSize && compressedSize ? Math.round((1 - compressedSize / originalSize) * 100) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload a PDF file</span>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {file && (
        <>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Quality: {Math.round(quality * 100)}%</span>
            <input type="range" min={0.2} max={0.9} step={0.05} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
          </label>

          <button
            onClick={compress}
            disabled={working}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {working ? (progress || "Compressing...") : "Compress PDF"}
          </button>

          {originalSize !== null && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <div className="text-lg font-bold text-gray-900">{fmt(originalSize)}</div>
                <div className="text-xs text-gray-500">Original</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-lg font-bold text-blue-900">{compressedSize ? fmt(compressedSize) : "—"}</div>
                <div className="text-xs text-gray-500">Compressed</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="text-lg font-bold text-green-900">{savings !== null ? `${savings}%` : "—"}</div>
                <div className="text-xs text-gray-500">Saved</div>
              </div>
            </div>
          )}

          {resultUrl && (
            <a
              href={resultUrl}
              download="compressed.pdf"
              onClick={() => analytics.downloadClicked("compress-pdf", "pdf")}
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download compressed PDF
            </a>
          )}
        </>
      )}

      <p className="mt-4 text-xs text-gray-500">
        <strong>How this works:</strong> each page is rendered to an image and recompressed as JPEG, which is
        why this works especially well on scanned or image-heavy PDFs. The tradeoff: text in the output is
        part of the image rather than selectable text, unlike the original file — for a text-heavy document
        where you need to keep searchable/selectable text, this isn't the right tool. Processing happens
        entirely in your browser; the file is never uploaded.
      </p>
    </div>
  );
}
