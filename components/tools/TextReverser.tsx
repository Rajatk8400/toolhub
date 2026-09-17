"use client";

import { useState } from "react";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");

  const reversed = (() => {
    if (mode === "chars") return [...text].reverse().join("");
    if (mode === "words") return text.split(/(\s+)/).reverse().join("");
    return text.split("\n").reverse().join("\n");
  })();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text to reverse"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Type or paste text here..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex gap-2">
        {(["chars", "words", "lines"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Reverse {m}
          </button>
        ))}
      </div>
      <pre className="mt-3 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{reversed || <span className="text-gray-500">Result will appear here</span>}</pre>
    </div>
  );
}
