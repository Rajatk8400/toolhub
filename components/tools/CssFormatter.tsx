"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

function beautifyCss(css: string): string {
  const compact = css.replace(/\s+/g, " ").trim();
  let result = "";
  let indent = 0;
  for (let i = 0; i < compact.length; i++) {
    const c = compact[i];
    if (c === "{") {
      result += " {\n";
      indent++;
      result += "  ".repeat(indent);
    } else if (c === "}") {
      indent = Math.max(0, indent - 1);
      result = result.replace(/\s+$/, "");
      result += "\n" + "  ".repeat(indent) + "}\n" + "  ".repeat(indent);
    } else if (c === ";") {
      result += ";\n" + "  ".repeat(indent);
    } else {
      result += c;
    }
  }
  return result.replace(/\n\s*\n/g, "\n").trim();
}

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="CSS to format"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder=".class { color: red; margin: 0; }"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-3 flex gap-2">
        <button onClick={() => setOutput(beautifyCss(input))} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Beautify</button>
        <button onClick={() => setOutput(minifyCss(input))} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Minify</button>
      </div>
      {output && (
        <>
          <div className="mt-3 flex justify-end">
            <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("css-formatter"); }} className="text-xs text-blue-700 hover:underline">Copy</button>
          </div>
          <pre className="mt-1 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
        </>
      )}
    </div>
  );
}
