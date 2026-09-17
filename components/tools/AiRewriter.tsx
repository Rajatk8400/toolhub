"use client";

import AiToolBase from "./AiToolBase";

export default function AiRewriter() {
  return (
    <AiToolBase
      toolSlug="ai-rewriter"
      toolKey="rewriter"
      label="Text to rewrite"
      placeholder="Paste the text you want to improve for clarity and flow..."
      submitLabel="Rewrite"
    />
  );
}
