"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

interface Redirect {
  id: number;
  from: string;
  to: string;
  type: "301" | "302";
}

export default function HtaccessRedirectGenerator() {
  const [redirects, setRedirects] = useState<Redirect[]>([{ id: 1, from: "/old-page", to: "/new-page", type: "301" }]);
  const [nextId, setNextId] = useState(2);
  const [copied, setCopied] = useState(false);

  const add = () => {
    setRedirects((r) => [...r, { id: nextId, from: "", to: "", type: "301" }]);
    setNextId((n) => n + 1);
  };
  const remove = (id: number) => setRedirects((r) => r.filter((x) => x.id !== id));
  const update = (id: number, field: keyof Redirect, value: string) =>
    setRedirects((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const valid = redirects.filter((r) => r.from.trim() && r.to.trim());
  const output = valid.map((r) => `Redirect ${r.type} ${r.from} ${r.to}`).join("\n");

  const handleCopy = () => {
    if (!valid.length) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("htaccess-redirect-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {redirects.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <input value={r.from} onChange={(e) => update(r.id, "from", e.target.value)} placeholder="/old-path" aria-label="Redirect from path" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <input value={r.to} onChange={(e) => update(r.id, "to", e.target.value)} placeholder="/new-path or full URL" aria-label="Redirect to path or URL" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
            <select value={r.type} onChange={(e) => update(r.id, "type", e.target.value as "301" | "302")} aria-label="Redirect type" className="rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none">
              <option value="301">301 (permanent)</option>
              <option value="302">302 (temporary)</option>
            </select>
            {redirects.length > 1 && <button onClick={() => remove(r.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add redirect</button>
      {output && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated .htaccess rules</span>
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500">Only works on Apache servers with mod_alias enabled. Nginx and other servers use different redirect syntax.</p>
    </div>
  );
}
