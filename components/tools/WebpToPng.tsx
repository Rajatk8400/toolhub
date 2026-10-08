"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function WebpToPng() {
  return (
    <BaseImageConverter
      toolSlug="webp-to-png"
      defaultTargetFormat="png"
      allowedTargetFormats={["png", "jpg", "jpeg"]}
      acceptedSourceMimeTypes={["image/webp"]}
      acceptedSourceExtensions={[".webp"]}
      title="Convert WebP to PNG"
      description="Convert WebP images to widely supported PNG format while maintaining transparent pixels and crisp lines."
    />
  );
}
