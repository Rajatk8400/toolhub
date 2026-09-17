"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
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

  const rotate = async () => {
    if (!file) return;
    setWorking(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      for (const page of doc.getPages()) {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      }
      const outBytes = await doc.save();
      const blob = new Blob([new Uint8Array(outBytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not rotate this PDF — it may be corrupted or password-protected");
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
          <div className="mt-3 flex gap-2">
            {[90, 180, 270].map((a) => (
              <button
                key={a}
                onClick={() => setAngle(a)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${angle === a ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Rotate {a}°
              </button>
            ))}
          </div>
          <button
            onClick={rotate}
            disabled={working}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {working ? "Rotating..." : "Rotate & download"}
          </button>
        </>
      )}
      <p className="mt-4 text-xs text-gray-500">Rotation happens entirely in your browser — the file is never uploaded.</p>
    </div>
  );
}
