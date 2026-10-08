"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function PngToJpg() {
  return (
    <BaseImageConverter
      toolSlug="png-to-jpg"
      defaultTargetFormat="jpg"
      allowedTargetFormats={["jpg", "jpeg", "webp"]}
      acceptedSourceMimeTypes={["image/png"]}
      acceptedSourceExtensions={[".png"]}
      title="Convert PNG to JPG"
      description="Convert PNG transparent images to standard JPG format with custom background color and adjustable quality."
    />
  );
}
