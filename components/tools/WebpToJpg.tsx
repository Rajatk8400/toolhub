"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function WebpToJpg() {
  return (
    <BaseImageConverter
      toolSlug="webp-to-jpg"
      defaultTargetFormat="jpg"
      allowedTargetFormats={["jpg", "jpeg", "png"]}
      acceptedSourceMimeTypes={["image/webp"]}
      acceptedSourceExtensions={[".webp"]}
      title="Convert WebP to JPG"
      description="Convert WebP files to universally compatible JPG images with adjustable compression quality."
    />
  );
}
