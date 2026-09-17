"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    setError(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch {
      setError("Could not read this PDF — it may be corrupted or password-protected");
    }
  };

  const parseRange = (input: string, max: number): number[] => {
    if (!input.trim()) return Array.from({ length: max }, (_, i) => i);
    const indices = new Set<number>();
    for (const part of input.split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.includes("-")) {
        const [a, b] = trimmed.split("-").map((n) => parseInt(n.trim()));
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
            if (i >= 1 && i <= max) indices.add(i - 1);
          }
        }
      } else {
        const n = parseInt(trimmed);
        if (!isNaN(n) && n >= 1 && n <= max) indices.add(n - 1);
      }
    }
    return [...indices].sort((a, b) => a - b);
  };

  const extract = async () => {
    if (!file || !pageCount) return;
    setWorking(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const indices = parseRange(range, pageCount);
      if (indices.length === 0) {
        setError("No valid pages in that range");
        setWorking(false);
        return;
      }
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      const blob = new Blob([new Uint8Array(outBytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not extract pages from this PDF");
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

      {pageCount !== null && (
        <>
          <p className="mt-3 text-sm text-gray-600">{file?.name} — {pageCount} page{pageCount === 1 ? "" : "s"}</p>
          <label className="mt-3 block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Pages to extract (e.g. 1-3,5) — leave blank for all</span>
            <input
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder={`1-${pageCount}`}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <button
            onClick={extract}
            disabled={working}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {working ? "Extracting..." : "Extract pages"}
          </button>
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Splitting happens entirely in your browser — files are never uploaded.</p>
    </div>
  );
}
