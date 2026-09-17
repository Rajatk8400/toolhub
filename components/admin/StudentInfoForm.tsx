"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StudentInfoType } from "@/types/student-info";

const TYPES: StudentInfoType[] = ["exam", "scholarship", "admission", "job"];

export interface StudentInfoFormValues {
  slug: string;
  type: StudentInfoType;
  title: string;
  summary: string;
  eligibility: string;
  applicationDeadline: string;
  applyUrl: string;
  officialSourceUrl: string;
  status: "upcoming" | "open" | "closed" | "archived";
  lastVerified: string;
  state: string;
  educationLevel: string;
  publishStatus: "draft" | "published";
}

const empty: StudentInfoFormValues = {
  slug: "",
  type: "exam",
  title: "",
  summary: "",
  eligibility: "",
  applicationDeadline: "",
  applyUrl: "",
  officialSourceUrl: "",
  status: "upcoming",
  lastVerified: new Date().toISOString().slice(0, 10),
  state: "",
  educationLevel: "",
  publishStatus: "draft",
};

export default function StudentInfoForm({
  initial,
  mode,
}: {
  initial?: Partial<StudentInfoFormValues>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<StudentInfoFormValues>({ ...empty, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof StudentInfoFormValues>(key: K, val: StudentInfoFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const url = mode === "create" ? "/api/admin/student-info" : `/api/admin/student-info/${initial?.slug}`;
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
    router.push("/admin/student-info");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Slug</span>
          <input required disabled={mode === "edit"} value={values.slug} onChange={(e) => set("slug", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-100" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Type</span>
          <select value={values.type} onChange={(e) => set("type", e.target.value as StudentInfoType)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
        <input required value={values.title} onChange={(e) => set("title", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Summary</span>
        <textarea required rows={2} value={values.summary} onChange={(e) => set("summary", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Eligibility</span>
        <textarea rows={2} value={values.eligibility} onChange={(e) => set("eligibility", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Application deadline</span>
          <input type="date" value={values.applicationDeadline} onChange={(e) => set("applicationDeadline", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
          <select value={values.status} onChange={(e) => set("status", e.target.value as StudentInfoFormValues["status"])} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="upcoming">Upcoming</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Official source URL <span className="text-red-600">*required</span></span>
        <input required type="url" value={values.officialSourceUrl} onChange={(e) => set("officialSourceUrl", e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Apply URL (optional)</span>
        <input type="url" value={values.applyUrl} onChange={(e) => set("applyUrl", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Last verified against source <span className="text-red-600">*required</span></span>
          <input required type="date" value={values.lastVerified} onChange={(e) => set("lastVerified", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Publish status</span>
          <select value={values.publishStatus} onChange={(e) => set("publishStatus", e.target.value as "draft" | "published")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">State (optional)</span>
          <input value={values.state} onChange={(e) => set("state", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Education level (optional)</span>
          <input value={values.educationLevel} onChange={(e) => set("educationLevel", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
