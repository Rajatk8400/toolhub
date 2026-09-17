import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PercentageCalculator from "@/components/tools/PercentageCalculator";

describe("PercentageCalculator", () => {
  it("calculates % of a number correctly", () => {
    render(<PercentageCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "20" } });
    fireEvent.change(inputs[1], { target: { value: "150" } });
    expect(screen.getByText(/20% of 150 is 30/)).toBeInTheDocument();
  });

  it("calculates 'X is what % of Y' correctly", () => {
    render(<PercentageCalculator />);
    fireEvent.click(screen.getByText("X is what % of Y"));
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "45" } });
    fireEvent.change(inputs[1], { target: { value: "60" } });
    expect(screen.getByText(/45 is 75% of 60/)).toBeInTheDocument();
  });

  it("calculates percentage change correctly", () => {
    render(<PercentageCalculator />);
    fireEvent.click(screen.getByText("% Increase / Decrease"));
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "100" } });
    fireEvent.change(inputs[1], { target: { value: "120" } });
    expect(screen.getByText(/Change from 100 to 120 is 20%/)).toBeInTheDocument();
  });

  it("shows a placeholder before any input", () => {
    render(<PercentageCalculator />);
    expect(screen.getByText(/Enter both values/)).toBeInTheDocument();
  });
});
