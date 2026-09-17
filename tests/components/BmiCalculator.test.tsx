import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BmiCalculator from "@/components/tools/BmiCalculator";

describe("BmiCalculator", () => {
  it("classifies normal weight correctly", () => {
    render(<BmiCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "170" } }); // cm
    fireEvent.change(inputs[1], { target: { value: "65" } }); // kg
    // BMI = 65 / 1.7^2 = 22.49
    expect(screen.getByText(/BMI: 22\.5 — Normal weight/)).toBeInTheDocument();
  });

  it("classifies underweight correctly", () => {
    render(<BmiCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "180" } });
    fireEvent.change(inputs[1], { target: { value: "50" } });
    expect(screen.getByText(/Underweight/)).toBeInTheDocument();
  });

  it("classifies obese correctly", () => {
    render(<BmiCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "170" } });
    fireEvent.change(inputs[1], { target: { value: "100" } });
    expect(screen.getByText(/Obese/)).toBeInTheDocument();
  });

  it("shows a prompt when inputs are empty", () => {
    render(<BmiCalculator />);
    expect(screen.getByText(/Enter height and weight/)).toBeInTheDocument();
  });
});
