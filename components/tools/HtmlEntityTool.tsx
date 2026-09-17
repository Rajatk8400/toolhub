"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const NAMED: [RegExp, string][] = [
  [/&/g, "&amp;"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"],
  [/"/g, "&quot;"],
  [/'/g, "&#39;"],
];

function encode(input: string) {
  let out = input;
  // & must be replaced first to avoid double-encoding
  for (const [re, rep] of NAMED) out = out.replace(re, rep);
  return out;
}

function decode(input: string) {
  const el = document.createElement("textarea");
  el.innerHTML = input;
  return el.value;
}

export default function HtmlEntityTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="Text or HTML entities to convert"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder='Enter text or HTML entities, e.g. <div class="a">'
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => setOutput(encode(input))} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Encode entities</button>
        <button onClick={() => setOutput(decode(input))} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Decode entities</button>
      </div>
      {output && (
        <>
          <div className="mt-3 flex justify-end">
            <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("html-entity-encoder"); }} className="text-xs text-blue-700 hover:underline">Copy</button>
          </div>
          <pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
        </>
      )}
    </div>
  );
}
