"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics/track";
import { recordRecentTool } from "@/lib/storage/recent-tools";

interface ToolUsedTrackerProps {
  slug: string;
  toolName?: string;
  category?: string;
  metaDescription?: string;
}

export default function ToolUsedTracker({
  slug,
  toolName,
  category,
  metaDescription,
}: ToolUsedTrackerProps) {
  useEffect(() => {
    analytics.toolUsed(slug);

    if (slug && toolName && category) {
      recordRecentTool({
        slug,
        toolName,
        category,
        metaDescription,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
