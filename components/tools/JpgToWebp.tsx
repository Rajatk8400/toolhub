"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function JpgToWebp() {
  return (
    <BaseImageConverter
      toolSlug="jpg-to-webp"
      defaultTargetFormat="webp"
      allowedTargetFormats={["webp", "png"]}
      acceptedSourceMimeTypes={["image/jpeg"]}
      acceptedSourceExtensions={[".jpg", ".jpeg"]}
      title="Convert JPG to WebP"
      description="Convert JPG images to next-gen WebP format for up to 30-80% smaller file sizes with superior web performance."
    />
  );
}
