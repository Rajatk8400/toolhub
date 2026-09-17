"use client";

import { useState } from "react";

interface Subject {
  id: number;
  name: string;
  obtained: string;
  max: string;
}

export default function ExamScoreCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([{ id: 1, name: "Subject A", obtained: "", max: "100" }]);
  const [nextId, setNextId] = useState(2);

  const addSubject = () => {
    setSubjects((s) => [...s, { id: nextId, name: `Subject ${String.fromCharCode(65 + s.length)}`, obtained: "", max: "100" }]);
    setNextId((n) => n + 1);
  };
  const removeSubject = (id: number) => setSubjects((s) => s.filter((x) => x.id !== id));
  const update = (id: number, field: "name" | "obtained" | "max", value: string) =>
    setSubjects((s) => s.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  let totalObtained = 0;
  let totalMax = 0;
  for (const s of subjects) {
    const o = parseFloat(s.obtained);
    const m = parseFloat(s.max);
    if (!isNaN(o) && !isNaN(m) && m > 0) {
      totalObtained += o;
      totalMax += m;
    }
  }
  const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {subjects.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} aria-label="Subject name" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <input type="number" value={s.obtained} onChange={(e) => update(s.id, "obtained", e.target.value)} placeholder="Marks obtained" aria-label={`Marks obtained for ${s.name || "subject"}`} className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <span className="text-gray-400">/</span>
            <input type="number" value={s.max} onChange={(e) => update(s.id, "max", e.target.value)} placeholder="Max marks" aria-label={`Maximum marks for ${s.name || "subject"}`} className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            {subjects.length > 1 && <button onClick={() => removeSubject(s.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
          </div>
        ))}
      </div>
      <button onClick={addSubject} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add subject</button>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {percentage !== null ? `Overall: ${totalObtained}/${totalMax} = ${percentage.toFixed(2)}%` : "Enter marks and max marks for at least one subject"}
      </div>
    </div>
  );
}
