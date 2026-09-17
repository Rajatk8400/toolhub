"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const pdfs = Array.from(list).filter((f) => f.type === "application/pdf");
    if (pdfs.length !== list.length) setError("Only PDF files are supported — some files were skipped");
    else setError(null);
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const removeAt = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setWorking(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const outBytes = await merged.save();
      const blob = new Blob([new Uint8Array(outBytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not merge these PDFs — one may be corrupted or password-protected");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload PDF files (2 or more, in the order to merge)</span>
        <input type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2 text-sm">
              <span className="truncate text-gray-800">{i + 1}. {f.name}</span>
              <span className="flex shrink-0 gap-2">
                <button onClick={() => move(i, -1)} aria-label={`Move ${f.name} up`} className="text-gray-500 hover:text-gray-800">↑</button>
                <button onClick={() => move(i, 1)} aria-label={`Move ${f.name} down`} className="text-gray-500 hover:text-gray-800">↓</button>
                <button onClick={() => removeAt(i)} className="text-red-600 hover:underline">Remove</button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={merge}
        disabled={files.length < 2 || working}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {working ? "Merging..." : `Merge ${files.length} PDFs`}
      </button>
      <p className="mt-4 text-xs text-gray-500">Merging happens entirely in your browser — files are never uploaded.</p>
    </div>
  );
}
