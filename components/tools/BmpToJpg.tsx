"use client";

import BaseImageConverter from "./BaseImageConverter";

export default function BmpToJpg() {
  return (
    <BaseImageConverter
      toolSlug="bmp-to-jpg"
      defaultTargetFormat="jpg"
      allowedTargetFormats={["jpg", "png", "webp"]}
      acceptedSourceMimeTypes={["image/bmp"]}
      acceptedSourceExtensions={[".bmp"]}
      title="Convert BMP to JPG"
      description="Convert large uncompressed BMP bitmap images into lightweight, compressed JPG files."
    />
  );
}
