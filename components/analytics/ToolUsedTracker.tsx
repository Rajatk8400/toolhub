"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics/track";

export default function ToolUsedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    analytics.toolUsed(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return null;
}
