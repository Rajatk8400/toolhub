"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = async () => {
    const data = new TextEncoder().encode(input);
    const results: Record<string, string> = {};
    for (const algo of ALGOS) {
      const buffer = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text to hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <button onClick={generate} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Generate hashes
      </button>
      {Object.keys(hashes).length > 0 && (
        <div className="mt-4 space-y-2">
          {ALGOS.map((algo) => (
            <div key={algo} className="rounded-lg bg-gray-50 px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{algo}</span>
                <button onClick={() => { navigator.clipboard.writeText(hashes[algo]); analytics.copyClicked("hash-generator"); }} className="text-xs text-blue-700 hover:underline">
                  Copy
                </button>
              </div>
              <code className="mt-1 block break-all font-mono text-xs text-gray-900">{hashes[algo]}</code>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-gray-500">
        Note: MD5 isn't available via the browser's built-in crypto API (it's considered cryptographically broken) —
        this tool provides SHA-1/256/384/512 instead, which are the modern standard.
      </p>
    </div>
  );
}
