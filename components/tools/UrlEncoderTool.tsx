"use client";

import { useState } from "react";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    setOutput(encodeURIComponent(input));
    setError(null);
  };
  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch {
      setError("Invalid percent-encoded string");
      setOutput("");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text or URL-encoded string"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        placeholder="Enter text or a URL-encoded string..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={encode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Encode</button>
        <button onClick={decode} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Decode</button>
      </div>
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {output && !error && <pre className="mt-3 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>}
    </div>
  );
}
