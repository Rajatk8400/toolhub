"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function formatHtml(html: string): string {
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];
  let indent = 0;
  const lines: string[] = [];
  for (const raw of tokens) {
    const token = raw.trim();
    if (!token) continue;
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      lines.push("  ".repeat(indent) + token);
    } else if (token.startsWith("<!--")) {
      lines.push("  ".repeat(indent) + token);
    } else if (token.startsWith("<")) {
      const tagName = token.match(/^<([a-zA-Z0-9-]+)/)?.[1]?.toLowerCase() || "";
      const selfClosing = token.endsWith("/>") || VOID_TAGS.has(tagName);
      lines.push("  ".repeat(indent) + token);
      if (!selfClosing) indent++;
    } else {
      lines.push("  ".repeat(indent) + token);
    }
  }
  return lines.join("\n");
}

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <textarea
        aria-label="HTML to format"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="<div><p>Paste your HTML here</p></div>"
        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
      />
      <button onClick={() => setOutput(formatHtml(input))} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Format HTML
      </button>
      {output && (
        <>
          <div className="mt-3 flex justify-end">
            <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("html-formatter"); }} className="text-xs text-blue-700 hover:underline">Copy</button>
          </div>
          <pre className="mt-1 max-h-72 overflow-auto rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500">A lightweight indent-based formatter — not a full HTML parser, so deeply malformed markup may not format perfectly.</p>
    </div>
  );
}
