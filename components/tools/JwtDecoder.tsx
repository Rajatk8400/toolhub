"use client";

import { useState } from "react";

function base64UrlDecode(str: string) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  const decode = (t: string) => {
    setToken(t);
    const parts = t.trim().split(".");
    if (parts.length !== 3) {
      setError(t.trim() ? "A JWT should have 3 parts separated by dots" : null);
      setHeader("");
      setPayload("");
      return;
    }
    try {
      setHeader(JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2));
      setError(null);
    } catch {
      setError("Could not decode this token — check it's a valid JWT");
      setHeader("");
      setPayload("");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="JWT to decode"
        value={token}
        onChange={(e) => decode(e.target.value)}
        rows={4}
        placeholder="Paste a JWT here (eyJhbGci...)"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      {error && <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {(header || payload) && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-1 block text-xs font-medium text-gray-500">Header</span>
            <pre className="max-h-60 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">{header}</pre>
          </div>
          <div>
            <span className="mb-1 block text-xs font-medium text-gray-500">Payload</span>
            <pre className="max-h-60 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">{payload}</pre>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-gray-500">
        This decodes the token's contents only — it does not verify the signature, so don't treat a successfully
        decoded token as proof it's valid or untampered.
      </p>
    </div>
  );
}
