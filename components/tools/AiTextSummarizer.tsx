"use client";

import AiToolBase from "./AiToolBase";

export default function AiTextSummarizer() {
  return (
    <AiToolBase
      toolSlug="ai-text-summarizer"
      toolKey="summarizer"
      label="Text to summarize"
      placeholder="Paste an article, document, or any long text here..."
      submitLabel="Summarize"
    />
  );
}
