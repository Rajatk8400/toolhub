"use client";

import { useMemo, useState } from "react";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMarkdown(md: string): string {
  const lines = escapeHtml(md).split("\n");
  const html: string[] = [];
  let inList = false;
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      html.push(inCodeBlock ? "<pre><code>" : "</code></pre>");
      continue;
    }
    if (inCodeBlock) {
      html.push(line + "\n");
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      if (inList) { html.push("</ul>"); inList = false; }
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) { html.push("<ul>"); inList = true; }
      html.push(`<li>${inlineFormat(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (inList) { html.push("</ul>"); inList = false; }

    if (line.trim() === "") {
      html.push("");
    } else {
      html.push(`<p>${inlineFormat(line)}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState("# Heading\n\nSome **bold** and *italic* text with a [link](https://example.com).\n\n- Item one\n- Item two");

  const html = useMemo(() => renderMarkdown(markdown), [markdown]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <textarea
        aria-label="Markdown source"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows={12}
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
        />
        <div className="prose prose-sm max-w-none rounded-lg border border-gray-200 bg-gray-50 p-4" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <p className="mt-3 text-xs text-gray-500">Supports headings, bold, italic, inline code, links, lists, and fenced code blocks — a lightweight subset of Markdown, not the full spec.</p>
    </div>
  );
}
