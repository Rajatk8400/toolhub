"use client";

import AiToolBase from "./AiToolBase";

export default function AiEmailGenerator() {
  return (
    <AiToolBase
      toolSlug="ai-email-generator"
      toolKey="email-generator"
      label="What do you want the email to say?"
      placeholder="e.g. Ask my manager for two days off next week for a family event, keep it brief and professional"
      submitLabel="Generate email"
    />
  );
}
