"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function JpegToPng() {
  return (
    <BaseImageConverter
      toolSlug="jpeg-to-png"
      defaultTargetFormat="png"
      allowedTargetFormats={["png", "webp"]}
      acceptedSourceMimeTypes={["image/jpeg"]}
      acceptedSourceExtensions={[".jpeg", ".jpg"]}
      title="Convert JPEG to PNG"
      description="Convert standard JPEG photos and graphics to clean, uncompressed PNG format client-side."
    />
  );
}
