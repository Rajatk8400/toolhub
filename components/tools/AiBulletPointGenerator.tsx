"use client";

import AiToolBase from "./AiToolBase";

export default function AiBulletPointGenerator() {
  return (
    <AiToolBase
      toolSlug="ai-bullet-point-generator"
      toolKey="bullet-point-generator"
      label="Text or topic to convert into bullet points"
      placeholder="Paste a paragraph, or describe a topic, to turn into a organized bulleted list..."
      submitLabel="Generate bullet points"
    />
  );
}
