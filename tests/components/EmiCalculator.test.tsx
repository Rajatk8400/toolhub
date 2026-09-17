import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmiCalculator from "@/components/tools/EmiCalculator";

describe("EmiCalculator", () => {
  it("calculates EMI correctly for a known loan scenario", () => {
    render(<EmiCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "100000" } }); // principal
    fireEvent.change(inputs[1], { target: { value: "10" } }); // annual rate %
    fireEvent.change(inputs[2], { target: { value: "12" } }); // months
    // Standard EMI formula: r = 10/12/100 = 0.008333, EMI ≈ 8791.59
    expect(screen.getByText("8791.59")).toBeInTheDocument();
  });

  it("shows placeholders when fields are empty", () => {
    render(<EmiCalculator />);
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });
});
