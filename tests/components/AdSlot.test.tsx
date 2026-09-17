import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import AdSlot from "@/components/ads/AdSlot";

describe("AdSlot", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    delete process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TOOL;
    delete process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS;
  });

  it("renders nothing by default (not configured, placeholders off)", () => {
    const { container } = render(<AdSlot position="below-tool-result" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a labeled placeholder when placeholders are explicitly enabled", () => {
    process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS = "true";
    const { getByText } = render(<AdSlot position="below-tool-result" />);
    expect(getByText(/Ad slot: below-tool-result/)).toBeInTheDocument();
  });

  it("renders a real ad unit when both client and slot are configured", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-12345";
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TOOL = "9876543210";
    const { container } = render(<AdSlot position="below-tool-result" />);
    const ins = container.querySelector("ins.adsbygoogle");
    expect(ins).not.toBeNull();
    expect(ins?.getAttribute("data-ad-client")).toBe("ca-pub-12345");
    expect(ins?.getAttribute("data-ad-slot")).toBe("9876543210");
  });
});
