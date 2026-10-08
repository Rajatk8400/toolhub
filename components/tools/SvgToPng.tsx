"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function SvgToPng() {
  return (
    <BaseImageConverter
      toolSlug="svg-to-png"
      defaultTargetFormat="png"
      allowedTargetFormats={["png", "webp", "jpg"]}
      acceptedSourceMimeTypes={["image/svg+xml"]}
      acceptedSourceExtensions={[".svg"]}
      title="Convert SVG to PNG"
      description="Rasterize scalable vector SVG graphics into high-resolution transparent PNG images with customizable resolution scale (1x, 2x, 3x, 4x)."
      isSvgSource={true}
    />
  );
}
