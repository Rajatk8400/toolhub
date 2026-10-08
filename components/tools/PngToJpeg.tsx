"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function PngToJpeg() {
  return (
    <BaseImageConverter
      toolSlug="png-to-jpeg"
      defaultTargetFormat="jpeg"
      allowedTargetFormats={["jpeg", "jpg", "webp"]}
      acceptedSourceMimeTypes={["image/png"]}
      acceptedSourceExtensions={[".png"]}
      title="Convert PNG to JPEG"
      description="Convert PNG files to JPEG format instantly with high-fidelity compression and custom background support."
    />
  );
}
