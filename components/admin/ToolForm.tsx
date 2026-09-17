"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToolCategory } from "@/types/tool";
import { generateSeoDraft } from "@/lib/seo-draft";

const CATEGORIES: ToolCategory[] = [
  "tools", "calculators", "students", "pdf", "image", "developer", "seo", "text", "converters", "ai",
];

export interface ToolFormValues {
  slug: string;
  category: ToolCategory;
  toolName: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  component: string;
  indexable: boolean;
  status: "draft" | "published";
}

const empty: ToolFormValues = {
  slug: "",
  category: "calculators",
  toolName: "",
  primaryKeyword: "",
  metaTitle: "",
  metaDescription: "",
  h1: "",
  intro: "",
  component: "",
  indexable: true,
  status: "draft",
};

export default function ToolForm({
  initial,
  mode,
}: {
  initial?: Partial<ToolFormValues>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<ToolFormValues>({ ...empty, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ToolFormValues>(key: K, val: ToolFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const url = mode === "create" ? "/api/admin/tools" : `/api/admin/tools/${initial?.slug}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
      return;
    }
    router.push("/admin/tools");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Slug</span>
          <input
            required
            disabled={mode === "edit"}
            value={values.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-100"
            placeholder="e.g. bmi-calculator"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value as ToolCategory)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Tool name</span>
        <input required value={values.toolName} onChange={(e) => set("toolName", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      {mode === "create" && (
        <button
          type="button"
          onClick={() => {
            if (!values.toolName.trim()) return;
            const draft = generateSeoDraft(values.toolName, values.category);
            setValues((v) => ({
              ...v,
              slug: draft.slug,
              metaTitle: draft.metaTitle,
              metaDescription: draft.metaDescription,
              h1: draft.h1,
              primaryKeyword: draft.primaryKeyword,
              intro: draft.intro,
            }));
          }}
          disabled={!values.toolName.trim()}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          Generate SEO draft from name + category
        </button>
      )}
      {mode === "create" && (
        <p className="-mt-2 text-xs text-gray-500">
          Fills slug, meta title/description, H1, and a placeholder intro from a template — always review
          and rewrite the intro before publishing. New tools save as "draft" by default either way.
        </p>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Component name</span>
        <input
          required
          value={values.component}
          onChange={(e) => set("component", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="Must match a key in components/tools/registry.ts"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Primary keyword</span>
        <input required value={values.primaryKeyword} onChange={(e) => set("primaryKeyword", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">H1</span>
        <input required value={values.h1} onChange={(e) => set("h1", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Meta title</span>
        <input required value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Meta description</span>
        <textarea required rows={2} value={values.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Intro content</span>
        <textarea required rows={5} value={values.intro} onChange={(e) => set("intro", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={values.indexable} onChange={(e) => set("indexable", e.target.checked)} />
          Indexable (include in sitemap)
        </label>
        <label className="block text-sm">
          <span className="mr-2 font-medium text-gray-700">Status</span>
          <select value={values.status} onChange={(e) => set("status", e.target.value as "draft" | "published")} className="rounded-lg border border-gray-300 px-2 py-1">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {saving ? "Saving..." : "Save tool"}
      </button>
    </form>
  );
}
