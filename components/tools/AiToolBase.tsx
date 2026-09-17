"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics/track";

export default function AiToolBase({
  toolSlug,
  toolKey,
  label,
  placeholder,
  submitLabel,
}: {
  toolSlug: string;
  toolKey: string;
  label: string;
  placeholder: string;
  submitLabel: string;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setOutput("");
    setNotConfigured(false);
    setCopied(false);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolKey, input }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.notConfigured) setNotConfigured(true);
        setError(data.error || "Something went wrong");
        return;
      }
      setOutput(data.output);
      analytics.toolCompleted(toolSlug);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked(toolSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={placeholder}
          maxLength={8000}
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </label>
      <div className="mt-1 text-right text-xs text-gray-500">{input.length}/8000</div>

      <button
        onClick={submit}
        disabled={loading || !input.trim()}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {loading ? "Generating..." : submitLabel}
      </button>

      {notConfigured && (
        <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          AI tools aren&apos;t configured on this deployment yet — this needs an <code>AI_API_KEY</code> set in the environment.
        </div>
      )}
      {error && !notConfigured && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Result</span>
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-blue-700 hover:underline"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="mt-1 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-800">{output}</div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        AI-generated output can be inaccurate — review before using it anywhere that matters.
      </p>
    </div>
  );
}
