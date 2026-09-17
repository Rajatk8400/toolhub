"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [r, setR] = useState("59");
  const [g, setG] = useState("130");
  const [b, setB] = useState("246");

  const onHexChange = (v: string) => {
    setHex(v);
    const rgb = hexToRgb(v);
    if (rgb) {
      setR(String(rgb.r));
      setG(String(rgb.g));
      setB(String(rgb.b));
    }
  };

  const onRgbChange = (nr: string, ng: string, nb: string) => {
    setR(nr);
    setG(ng);
    setB(nb);
    const [ri, gi, bi] = [nr, ng, nb].map((v) => parseInt(v));
    if ([ri, gi, bi].every((v) => !isNaN(v) && v >= 0 && v <= 255)) {
      setHex("#" + [ri, gi, bi].map((v) => v.toString(16).padStart(2, "0")).join(""));
    }
  };

  const rgbValid = hexToRgb(hex) !== null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 rounded-lg border border-gray-200" style={{ backgroundColor: rgbValid ? hex : "#fff" }} />
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">HEX</span>
            <input value={hex} onChange={(e) => onHexChange(e.target.value)} aria-label="HEX color value" className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono focus:border-blue-500 focus:outline-none" />
          </label>
          <div>
            <span className="mb-1 block text-sm font-medium text-gray-700">RGB</span>
            <div className="flex gap-2">
              {[["R", r, (v: string) => onRgbChange(v, g, b)], ["G", g, (v: string) => onRgbChange(r, v, b)], ["B", b, (v: string) => onRgbChange(r, g, v)]].map(
                ([label, value, setter]: any) => (
                  <input key={label} type="number" min={0} max={255} value={value} onChange={(e) => setter(e.target.value)} aria-label={`${label} value`} className="w-16 rounded-lg border border-gray-300 px-2 py-2 font-mono" />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
