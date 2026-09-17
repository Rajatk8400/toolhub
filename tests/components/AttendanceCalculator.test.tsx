import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AttendanceCalculator from "@/components/tools/AttendanceCalculator";

describe("AttendanceCalculator", () => {
  it("computes current percentage correctly", () => {
    render(<AttendanceCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "60" } }); // held
    fireEvent.change(inputs[1], { target: { value: "48" } }); // attended
    expect(screen.getByText(/Current attendance: 80.00%/)).toBeInTheDocument();
  });

  it("tells the user how many classes they can miss when above requirement", () => {
    render(<AttendanceCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "60" } });
    fireEvent.change(inputs[1], { target: { value: "48" } });
    expect(screen.getByText(/You can miss/)).toBeInTheDocument();
  });

  it("tells the user how many classes they need when below requirement", () => {
    render(<AttendanceCalculator />);
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "60" } });
    fireEvent.change(inputs[1], { target: { value: "30" } }); // 50%, below default 75%
    expect(screen.getByText(/Attend the next/)).toBeInTheDocument();
  });
});
