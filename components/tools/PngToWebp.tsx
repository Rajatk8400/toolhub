"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function PngToWebp() {
  return (
    <BaseImageConverter
      toolSlug="png-to-webp"
      defaultTargetFormat="webp"
      allowedTargetFormats={["webp", "jpg", "jpeg"]}
      acceptedSourceMimeTypes={["image/png"]}
      acceptedSourceExtensions={[".png"]}
      title="Convert PNG to WebP"
      description="Convert PNG images to modern WebP format for dramatically smaller file sizes while preserving full transparency."
    />
  );
}
