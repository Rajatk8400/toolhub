"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function JpgToPng() {
  return (
    <BaseImageConverter
      toolSlug="jpg-to-png"
      defaultTargetFormat="png"
      allowedTargetFormats={["png", "webp"]}
      acceptedSourceMimeTypes={["image/jpeg"]}
      acceptedSourceExtensions={[".jpg", ".jpeg"]}
      title="Convert JPG to PNG"
      description="Convert lossy JPG images into lossless PNG format directly in your browser with zero server uploads."
    />
  );
}
