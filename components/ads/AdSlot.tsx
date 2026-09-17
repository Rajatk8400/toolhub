"use client";

import { useEffect, useRef } from "react";

type AdPosition = "in-content" | "below-tool-result" | "sidebar" | "in-guide";

const SLOT_ENV_KEYS: Record<AdPosition, string> = {
  "in-content": "NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT",
  "below-tool-result": "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TOOL",
  sidebar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  "in-guide": "NEXT_PUBLIC_ADSENSE_SLOT_IN_GUIDE",
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single ad placement, positioned per the spec's own rules (§24):
 * - never over tool controls or in a way that mimics a download/action button
 * - never where accidental clicks are likely
 * - kept out of the default layout entirely unless AdSense is actually configured
 *
 * With no NEXT_PUBLIC_ADSENSE_CLIENT set, this renders nothing in production. Set
 * NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true locally to see a labeled placeholder box at every
 * slot while building/reviewing layout, without shipping that box to real users.
 */
export default function AdSlot({ position }: { position: AdPosition }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env[SLOT_ENV_KEYS[position] as keyof NodeJS.ProcessEnv];
  const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense script not loaded yet or blocked — fail silently, never break the page.
    }
  }, [client, slot]);

  if (!client || !slot) {
    if (!showPlaceholders) return null;
    return (
      <div
        aria-hidden="true"
        className="my-6 flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500"
      >
        Ad slot: {position} (set NEXT_PUBLIC_ADSENSE_CLIENT + matching slot ID to activate)
      </div>
    );
  }

  return (
    <div className="my-6">
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
