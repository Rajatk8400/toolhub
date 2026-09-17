"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

interface Meta {
  title: string;
  author: string;
  subject: string;
  creator: string;
  producer: string;
  pageCount: number;
  fileSizeKb: string;
}

export default function PdfMetadataViewer() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    setError(null);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setMeta({
        title: doc.getTitle() || "—",
        author: doc.getAuthor() || "—",
        subject: doc.getSubject() || "—",
        creator: doc.getCreator() || "—",
        producer: doc.getProducer() || "—",
        pageCount: doc.getPageCount(),
        fileSizeKb: (f.size / 1024).toFixed(1),
      });
    } catch {
      setError("Could not read this PDF — it may be corrupted or password-protected");
      setMeta(null);
    }
  };

  const rows: [string, string][] = meta
    ? [
        ["Title", meta.title],
        ["Author", meta.author],
        ["Subject", meta.subject],
        ["Creator", meta.creator],
        ["Producer", meta.producer],
        ["Page count", String(meta.pageCount)],
        ["File size", `${meta.fileSizeKb} KB`],
      ]
    : [];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400">
        <span className="text-sm text-gray-600">Click to upload a PDF file</span>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {meta && (
        <table className="mt-4 w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {rows.map(([label, value]) => (
              <tr key={label}>
                <td className="py-2 pr-4 font-medium text-gray-600">{label}</td>
                <td className="py-2 text-gray-900">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="mt-4 text-xs text-gray-500">Reading happens entirely in your browser — the file is never uploaded.</p>
    </div>
  );
}
