import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CgpaToPercentage from "@/components/tools/CgpaToPercentage";

describe("CgpaToPercentage", () => {
  it("converts CGPA to percentage using the ×9.5 formula", () => {
    render(<CgpaToPercentage />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "8" } });
    expect(screen.getByText(/Equivalent percentage: 76.00%/)).toBeInTheDocument();
  });

  it("rejects a CGPA above 10", () => {
    render(<CgpaToPercentage />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "12" } });
    expect(screen.getByText(/Enter a CGPA between 0 and 10/)).toBeInTheDocument();
  });
});
