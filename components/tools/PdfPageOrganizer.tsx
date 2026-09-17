"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PdfPageOrganizer() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
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
      const count = doc.getPageCount();
      setPageCount(count);
      setOrder(Array.from({ length: count }, (_, i) => i));
    } catch {
      setError("Could not read this PDF — it may be corrupted or password-protected");
    }
  };

  const move = (index: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const j = index + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };
  const remove = (index: number) => setOrder((prev) => prev.filter((_, i) => i !== index));

  const save = async () => {
    if (!file || order.length === 0) return;
    setWorking(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, order);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      const blob = new Blob([new Uint8Array(outBytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reorganized.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not save this PDF");
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

      {order.length > 0 && (
        <>
          <p className="mt-3 text-sm text-gray-600">{file?.name} — {pageCount} original pages, {order.length} in this output</p>
          <ul className="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200">
            {order.map((pageIndex, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-2 text-sm">
                <span className="text-gray-800">Position {i + 1}: original page {pageIndex + 1}</span>
                <span className="flex gap-2">
                  <button onClick={() => move(i, -1)} aria-label={`Move position ${i + 1} up`} className="text-gray-500 hover:text-gray-800">↑</button>
                  <button onClick={() => move(i, 1)} aria-label={`Move position ${i + 1} down`} className="text-gray-500 hover:text-gray-800">↓</button>
                  <button onClick={() => remove(i)} className="text-red-600 hover:underline">Delete</button>
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={save}
            disabled={working || order.length === 0}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {working ? "Saving..." : "Save reorganized PDF"}
          </button>
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Reordering and deleting happens entirely in your browser — the file is never uploaded.</p>
    </div>
  );
}
