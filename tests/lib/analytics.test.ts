import { describe, it, expect } from "vitest";
import { analytics } from "@/lib/analytics/track";

describe("analytics", () => {
  it("no-ops safely when window.gtag is not defined", () => {
    expect(() => analytics.toolUsed("percentage-calculator")).not.toThrow();
    expect(() => analytics.toolCompleted("percentage-calculator")).not.toThrow();
    expect(() => analytics.downloadClicked("image-compressor", "jpg")).not.toThrow();
    expect(() => analytics.copyClicked("json-formatter")).not.toThrow();
    expect(() => analytics.searchPerformed("percentage", 3)).not.toThrow();
    expect(() => analytics.categoryClicked("calculators")).not.toThrow();
    expect(() => analytics.guideClicked("how-to-calculate-percentage")).not.toThrow();
  });

  it("calls window.gtag with the right event name and params when present", () => {
    const calls: unknown[][] = [];
    (window as any).gtag = (...args: unknown[]) => calls.push(args);
    analytics.toolUsed("bmi-calculator");
    expect(calls).toEqual([["event", "tool_used", { tool_slug: "bmi-calculator" }]]);
    delete (window as any).gtag;
  });
});
