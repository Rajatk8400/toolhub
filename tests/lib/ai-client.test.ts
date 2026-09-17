// @vitest-environment node
import { describe, it, expect, afterEach } from "vitest";
import { getAiCompletion, AiNotConfiguredError } from "@/lib/ai/client";

describe("getAiCompletion", () => {
  afterEach(() => {
    delete process.env.AI_API_KEY;
    delete process.env.AI_PROVIDER;
  });

  it("throws AiNotConfiguredError when AI_API_KEY is not set", async () => {
    delete process.env.AI_API_KEY;
    await expect(getAiCompletion({ system: "s", prompt: "p" })).rejects.toBeInstanceOf(AiNotConfiguredError);
  });

  it("throws a clean, non-technical message", async () => {
    delete process.env.AI_API_KEY;
    await expect(getAiCompletion({ system: "s", prompt: "p" })).rejects.toThrow(/aren't configured/i);
  });
});
