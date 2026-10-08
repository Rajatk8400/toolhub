"use client";

import { useEffect, useRef } from "react";

export type AdPosition =
  | "in-content"
  | "below-tool-result"
  | "sidebar"
  | "in-guide"
  | "homepage-bottom"
  | "category-bottom";

const SLOT_ENV_KEYS: Record<AdPosition, string> = {
  "in-content": "NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT",
  "below-tool-result": "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TOOL",
  sidebar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  "in-guide": "NEXT_PUBLIC_ADSENSE_SLOT_IN_GUIDE",
  "homepage-bottom": "NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE",
  "category-bottom": "NEXT_PUBLIC_ADSENSE_SLOT_CATEGORY",
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * AdSlot component prepared for Google AdSense integration:
 * - Positioned safely away from critical tool action buttons
 * - Renders nothing in production when no AdSense client is configured
 * - Never shows broken layout or intrusive fake placeholders to users
 * - Debug mode available via NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true
 */
export default function AdSlot({
  position,
  className = "",
}: {
  position: AdPosition;
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const envKey = SLOT_ENV_KEYS[position];
  const slot =
    process.env[envKey as keyof NodeJS.ProcessEnv] ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT;
  const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense blocked or not loaded yet — fail silently, never break the page
    }
  }, [client, slot]);

  if (!client || !slot) {
    if (!showPlaceholders) return null;
    return (
      <div
        aria-hidden="true"
        className={`my-6 flex h-24 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500 ${className}`}
      >
        Ad slot: {position} (set NEXT_PUBLIC_ADSENSE_CLIENT + matching slot ID to activate)
      </div>
    );
  }

  return (
    <div className={`my-6 overflow-hidden rounded-xl bg-gray-50/50 p-2 text-center ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
