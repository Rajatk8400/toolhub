import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JsonFormatter from "@/components/tools/JsonFormatter";

describe("JsonFormatter", () => {
  it("beautifies valid JSON with 2-space indentation", () => {
    render(<JsonFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste JSON here/);
    fireEvent.change(textarea, { target: { value: '{"a":1,"b":2}' } });
    fireEvent.click(screen.getByText("Beautify"));
    expect(screen.getByText(/"a": 1/)).toBeInTheDocument();
  });

  it("minifies JSON to a single line", () => {
    render(<JsonFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste JSON here/);
    fireEvent.change(textarea, { target: { value: '{\n  "a": 1\n}' } });
    fireEvent.click(screen.getByText("Minify"));
    expect(screen.getByText('{"a":1}')).toBeInTheDocument();
  });

  it("shows an error for invalid JSON", () => {
    render(<JsonFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste JSON here/);
    fireEvent.change(textarea, { target: { value: "{not valid json" } });
    fireEvent.click(screen.getByText("Beautify"));
    expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
  });
});
