"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { analytics } from "@/lib/analytics/track";

export type ImageFormat = "jpg" | "jpeg" | "png" | "webp";

interface ConvertedFileItem {
  id: string;
  file: File;
  originalName: string;
  originalSize: number;
  previewUrl: string;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  convertedSize: number | null;
  dimensions: { width: number; height: number } | null;
  status: "idle" | "converting" | "done" | "error";
  errorMessage?: string;
}

interface BaseImageConverterProps {
  toolSlug: string;
  defaultTargetFormat: ImageFormat;
  allowedTargetFormats?: ImageFormat[];
  acceptedSourceMimeTypes?: string[];
  acceptedSourceExtensions?: string[];
  title?: string;
  description?: string;
  isSvgSource?: boolean;
}

const MIME_MAP: Record<ImageFormat, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export default function BaseImageConverter({
  toolSlug,
  defaultTargetFormat,
  allowedTargetFormats = ["jpg", "png", "webp", "jpeg"],
  acceptedSourceMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/bmp", "image/gif"],
  acceptedSourceExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".bmp", ".gif"],
  title,
  description,
  isSvgSource = false,
}: BaseImageConverterProps) {
  const [targetFormat, setTargetFormat] = useState<ImageFormat>(defaultTargetFormat);
  const [quality, setQuality] = useState<number>(0.9);
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");
  const [svgScale, setSvgScale] = useState<number>(2);
  const [items, setItems] = useState<ConvertedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getTargetFilename = (originalName: string, format: ImageFormat): string => {
    const baseName = originalName.substring(0, originalName.lastIndexOf(".")) || originalName;
    return `${baseName}.${format}`;
  };

  const convertImage = useCallback(
    (item: ConvertedFileItem, format: ImageFormat, q: number, bg: string, scale: number): Promise<{ blob: Blob; url: string; size: number; width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          try {
            const width = isSvgSource ? Math.round(img.width * scale) : img.width;
            const height = isSvgSource ? Math.round(img.height * scale) : img.height;

            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);

            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Unable to create canvas context"));
              return;
            }

            // If target is JPG/JPEG or user chooses a background for transparent formats
            if (format === "jpg" || format === "jpeg" || bg !== "transparent") {
              ctx.fillStyle = bg;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const mime = MIME_MAP[format] || "image/jpeg";
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Image conversion failed"));
                  return;
                }
                const url = URL.createObjectURL(blob);
                resolve({
                  blob,
                  url,
                  size: blob.size,
                  width: canvas.width,
                  height: canvas.height,
                });
              },
              mime,
              q
            );
          } catch (err) {
            reject(err instanceof Error ? err : new Error("Image processing error"));
          }
        };

        img.onerror = () => {
          reject(new Error("Failed to load image file"));
        };

        img.src = item.previewUrl;
      });
    },
    [isSvgSource]
  );

  const processItems = useCallback(
    async (itemsToProcess: ConvertedFileItem[], format: ImageFormat, q: number, bg: string, scale: number) => {
      for (const item of itemsToProcess) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "converting", errorMessage: undefined } : i))
        );

        try {
          const res = await convertImage(item, format, q, bg, scale);
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    convertedBlob: res.blob,
                    convertedUrl: res.url,
                    convertedSize: res.size,
                    dimensions: { width: res.width, height: res.height },
                    status: "done",
                  }
                : i
            )
          );
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Conversion failed";
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    status: "error",
                    errorMessage: message,
                  }
                : i
            )
          );
        }
      }
    },
    [convertImage]
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArr = Array.from(files);
      if (fileArr.length === 0) return;

      const newItems: ConvertedFileItem[] = [];

      for (const file of fileArr) {
        // Validate MIME or extension
        const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const isValidMime = acceptedSourceMimeTypes.some((m) => file.type === m);
        const isValidExt = acceptedSourceExtensions.some((e) => ext === e);

        if (!isValidMime && !isValidExt && file.type !== "") {
          continue;
        }

        const id = Math.random().toString(36).substring(2, 9);
        const previewUrl = URL.createObjectURL(file);

        newItems.push({
          id,
          file,
          originalName: file.name,
          originalSize: file.size,
          previewUrl,
          convertedBlob: null,
          convertedUrl: null,
          convertedSize: null,
          dimensions: null,
          status: "idle",
        });
      }

      if (newItems.length === 0) {
        alert(`Please select valid image files (${acceptedSourceExtensions.join(", ")}).`);
        return;
      }

      analytics.toolUsed(toolSlug);

      setItems((prev) => {
        const combined = [...prev, ...newItems];
        return combined;
      });

      // Auto start conversion
      processItems(newItems, targetFormat, quality, backgroundColor, svgScale);
    },
    [acceptedSourceExtensions, acceptedSourceMimeTypes, backgroundColor, processItems, quality, svgScale, targetFormat, toolSlug]
  );

  // Re-run conversion when format/quality/bg/scale changes
  const rerunConversion = useCallback(
    (newFormat: ImageFormat, newQuality: number, newBg: string, newScale: number) => {
      if (items.length === 0) return;
      processItems(items, newFormat, newQuality, newBg, newScale);
    },
    [items, processItems]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const copyToClipboard = async (item: ConvertedFileItem) => {
    if (!item.convertedBlob) return;
    try {
      if (typeof ClipboardItem !== "undefined" && (targetFormat === "png" || targetFormat === "webp" || targetFormat === "jpg" || targetFormat === "jpeg")) {
        // Most browsers require image/png for clipboard image writing
        if (targetFormat !== "png") {
          // Temporarily convert to PNG blob for clipboard
          const canvas = document.createElement("canvas");
          const img = new Image();
          img.src = item.convertedUrl!;
          await new Promise((res) => {
            img.onload = res;
          });
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
              setCopiedId(item.id);
              analytics.copyClicked(toolSlug);
              setTimeout(() => setCopiedId(null), 2500);
            }
          }, "image/png");
          return;
        }

        await navigator.clipboard.write([new ClipboardItem({ [item.convertedBlob.type]: item.convertedBlob })]);
        setCopiedId(item.id);
        analytics.copyClicked(toolSlug);
        setTimeout(() => setCopiedId(null), 2500);
      }
    } catch {
      alert("Clipboard copy is not supported in this browser for images.");
    }
  };

  const downloadAll = () => {
    const doneItems = items.filter((i) => i.status === "done" && i.convertedUrl);
    doneItems.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = item.convertedUrl!;
        link.download = getTargetFilename(item.originalName, targetFormat);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 250);
    });
    analytics.downloadClicked(toolSlug, targetFormat);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      if (target?.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      return filtered;
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setItems([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      });
    };
  }, [items]);

  const doneCount = items.filter((i) => i.status === "done").length;
  const showQualitySlider = targetFormat === "jpg" || targetFormat === "jpeg" || targetFormat === "webp";
  const showBackgroundSelector = targetFormat === "jpg" || targetFormat === "jpeg";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-xs">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
      )}

      {/* Upload Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50/60 scale-[1.005]"
            : "border-gray-300 hover:border-blue-500 hover:bg-slate-50/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedSourceExtensions.join(",")}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs group-hover:scale-105 transition-transform">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <p className="mt-3 text-base font-semibold text-gray-900">
          Drop your image here, or <span className="text-blue-600 hover:underline">browse files</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports {acceptedSourceExtensions.map((e) => e.replace(".", "").toUpperCase()).join(", ")} • Batch upload supported
        </p>
      </div>

      {/* Conversion Options Toolbar */}
      <div className="mt-6 rounded-xl border border-gray-150 bg-gray-50/70 p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Target Format selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Target Format
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allowedTargetFormats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    setTargetFormat(fmt);
                    rerunConversion(fmt, quality, backgroundColor, svgScale);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                    targetFormat === fmt
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider for lossy formats */}
          {showQualitySlider && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Quality
                </label>
                <span className="text-xs font-bold text-blue-600">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setQuality(val);
                  rerunConversion(targetFormat, val, backgroundColor, svgScale);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Smaller size</span>
                <span>Balanced</span>
                <span>Best fidelity</span>
              </div>
            </div>
          )}

          {/* Background color for JPG/JPEG transparent replacement */}
          {showBackgroundSelector && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Background (Transparency)
              </label>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {[
                    { label: "White", color: "#FFFFFF" },
                    { label: "Black", color: "#000000" },
                    { label: "Gray", color: "#F3F4F6" },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => {
                        setBackgroundColor(c.color);
                        rerunConversion(targetFormat, quality, c.color, svgScale);
                      }}
                      className={`h-7 px-2.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        backgroundColor.toUpperCase() === c.color.toUpperCase()
                          ? "border-blue-500 bg-white shadow-2xs font-bold text-blue-700 ring-1 ring-blue-400"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: c.color }} />
                      {c.label}
                    </button>
                  ))}
                </div>
                <input
                  type="color"
                  value={backgroundColor.startsWith("#") ? backgroundColor : "#FFFFFF"}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    rerunConversion(targetFormat, quality, e.target.value, svgScale);
                  }}
                  title="Choose custom background color"
                  className="h-7 w-7 rounded cursor-pointer border border-gray-300 p-0"
                />
              </div>
            </div>
          )}

          {/* SVG Scaling */}
          {isSvgSource && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Resolution Multiplier
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSvgScale(s);
                      rerunConversion(targetFormat, quality, backgroundColor, s);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      svgScale === s
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Files List & Conversion Results */}
      {items.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="text-sm font-semibold text-gray-800">
              {items.length} {items.length === 1 ? "Image" : "Images"} ({doneCount} converted)
            </div>
            <div className="flex items-center gap-2">
              {doneCount > 1 && (
                <button
                  type="button"
                  onClick={downloadAll}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download All ({doneCount})
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => {
              const reductionPercent =
                item.convertedSize && item.originalSize
                  ? Math.round(((item.originalSize - item.convertedSize) / item.originalSize) * 100)
                  : null;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-3.5 sm:p-4 hover:border-gray-300 transition-colors"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-150 bg-gray-50 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.convertedUrl || item.previewUrl}
                        alt={item.originalName}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900" title={item.originalName}>
                        {item.originalName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>Original: {formatFileSize(item.originalSize)}</span>
                        {item.convertedSize !== null && (
                          <>
                            <span>→</span>
                            <span className="font-semibold text-gray-800">
                              {formatFileSize(item.convertedSize)}
                            </span>
                            {reductionPercent !== null && (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                  reductionPercent > 0
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {reductionPercent > 0 ? `-${reductionPercent}%` : `+${Math.abs(reductionPercent)}%`}
                              </span>
                            )}
                          </>
                        )}
                        {item.dimensions && (
                          <span className="text-gray-400">
                            ({item.dimensions.width}×{item.dimensions.height}px)
                          </span>
                        )}
                      </div>
                      {item.status === "error" && (
                        <p className="mt-1 text-xs text-red-600">{item.errorMessage || "Conversion failed"}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {item.status === "converting" && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <svg className="animate-spin h-3.5 w-3.5 text-blue-600" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Converting...
                      </span>
                    )}

                    {item.status === "done" && item.convertedUrl && (
                      <>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item)}
                          title="Copy image to clipboard"
                          className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>

                        <a
                          href={item.convertedUrl}
                          download={getTargetFilename(item.originalName, targetFormat)}
                          onClick={() => analytics.downloadClicked(toolSlug, targetFormat)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download {targetFormat.toUpperCase()}
                        </a>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 transition-colors"
                      title="Remove image"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Privacy guarantee badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>
          <strong>100% Client-Side Privacy:</strong> Images are processed directly inside your browser. No files are ever sent to a server.
        </span>
      </div>
    </div>
  );
}
