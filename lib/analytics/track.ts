// Thin wrapper around gtag for the event set the spec calls for:
// tool_used, tool_completed, download_clicked, copy_clicked, search_performed,
// category_clicked, guide_clicked. No-ops safely if GA isn't loaded (no GA ID set,
// ad blocker, or still hydrating) so callers never need to guard for it.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export const analytics = {
  toolUsed: (toolSlug: string) => track("tool_used", { tool_slug: toolSlug }),
  toolCompleted: (toolSlug: string) => track("tool_completed", { tool_slug: toolSlug }),
  downloadClicked: (toolSlug: string, fileType?: string) =>
    track("download_clicked", { tool_slug: toolSlug, ...(fileType ? { file_type: fileType } : {}) }),
  copyClicked: (toolSlug: string) => track("copy_clicked", { tool_slug: toolSlug }),
  searchPerformed: (query: string, resultCount: number) =>
    track("search_performed", { query, result_count: resultCount }),
  categoryClicked: (category: string) => track("category_clicked", { category }),
  guideClicked: (guideSlug: string) => track("guide_clicked", { guide_slug: guideSlug }),
};
