"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface KeywordFormValues {
  keyword: string;
  cluster: string;
  primaryCategory: string;
  searchIntent: string;
  priority: string;
  country: string;
  language: string;
  status: string;
  targetPage: string;
  notes: string;
  searchVolume: string;
  competition: string;
  cpc: string;
}

const empty: KeywordFormValues = {
  keyword: "",
  cluster: "",
  primaryCategory: "calculators",
  searchIntent: "informational",
  priority: "medium",
  country: "global",
  language: "en",
  status: "research",
  targetPage: "",
  notes: "",
  searchVolume: "",
  competition: "",
  cpc: "",
};

export default function KeywordForm({
  initial,
  mode,
  id,
}: {
  initial?: Partial<KeywordFormValues>;
  mode: "create" | "edit";
  id?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<KeywordFormValues>({ ...empty, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof KeywordFormValues>(key: K, val: KeywordFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = { ...values };
    if (values.searchVolume) payload.searchVolume = Number(values.searchVolume);
    else delete payload.searchVolume;
    if (values.cpc) payload.cpc = Number(values.cpc);
    else delete payload.cpc;
    if (!values.competition) delete payload.competition;

    const url = mode === "create" ? "/api/admin/keywords" : `/api/admin/keywords/${id}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
      return;
    }
    router.push("/admin/keywords");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Keyword</span>
          <input required value={values.keyword} onChange={(e) => set("keyword", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Cluster</span>
          <input required value={values.cluster} onChange={(e) => set("cluster", e.target.value)} placeholder="e.g. Image Compression" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Primary category</span>
          <select value={values.primaryCategory} onChange={(e) => set("primaryCategory", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {["tools", "calculators", "students", "pdf", "image", "developer", "seo", "text", "converters", "ai"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Search intent</span>
          <select value={values.searchIntent} onChange={(e) => set("searchIntent", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {["informational", "navigational", "transactional", "commercial"].map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Priority</span>
          <select value={values.priority} onChange={(e) => set("priority", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {["low", "medium", "high"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Country</span>
          <input value={values.country} onChange={(e) => set("country", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Language</span>
          <input value={values.language} onChange={(e) => set("language", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
        <select value={values.status} onChange={(e) => set("status", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
          {["research", "planned", "published", "needs-update", "no-longer-relevant"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Target page (tool/guide slug or path)</span>
        <input value={values.targetPage} onChange={(e) => set("targetPage", e.target.value)} placeholder="e.g. calculators/percentage-calculator" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Notes</span>
        <textarea rows={2} value={values.notes} onChange={(e) => set("notes", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <div className="grid grid-cols-3 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Search volume (optional)</span>
          <input type="number" value={values.searchVolume} onChange={(e) => set("searchVolume", e.target.value)} placeholder="From external research" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Competition (optional)</span>
          <select value={values.competition} onChange={(e) => set("competition", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="">—</option>
            {["low", "medium", "high"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">CPC (optional)</span>
          <input type="number" step="0.01" value={values.cpc} onChange={(e) => set("cpc", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {saving ? "Saving..." : "Save keyword"}
      </button>
    </form>
  );
}
