"use client";

import { useState } from "react";

interface Subject {
  id: number;
  name: string;
  weight: string;
}

export default function StudyTimeCalculator() {
  const [totalHours, setTotalHours] = useState("10");
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Subject A", weight: "3" },
    { id: 2, name: "Subject B", weight: "2" },
  ]);
  const [nextId, setNextId] = useState(3);

  const addSubject = () => {
    setSubjects((s) => [...s, { id: nextId, name: `Subject ${String.fromCharCode(65 + s.length)}`, weight: "1" }]);
    setNextId((n) => n + 1);
  };
  const removeSubject = (id: number) => setSubjects((s) => s.filter((x) => x.id !== id));
  const update = (id: number, field: "name" | "weight", value: string) =>
    setSubjects((s) => s.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const total = parseFloat(totalHours) || 0;
  const totalWeight = subjects.reduce((sum, s) => sum + (parseFloat(s.weight) || 0), 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="block max-w-xs">
        <span className="mb-1 block text-sm font-medium text-gray-700">Total study hours available</span>
        <input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
      </label>

      <div className="mt-4 space-y-2">
        {subjects.map((s) => {
          const w = parseFloat(s.weight) || 0;
          const hours = totalWeight > 0 ? (w / totalWeight) * total : 0;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} aria-label="Subject name" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <input type="number" value={s.weight} onChange={(e) => update(s.id, "weight", e.target.value)} placeholder="Priority weight" aria-label={`Priority weight for ${s.name || "subject"}`} className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <span className="w-24 shrink-0 text-right text-sm font-semibold text-blue-900">{hours.toFixed(1)}h</span>
              {subjects.length > 1 && <button onClick={() => removeSubject(s.id)} className="text-xs text-red-600 hover:underline">Remove</button>}
            </div>
          );
        })}
      </div>
      <button onClick={addSubject} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">+ Add subject</button>
      <p className="mt-3 text-xs text-gray-500">Give each subject a priority weight (e.g. how difficult or important it is) — time is split proportionally to weight.</p>
    </div>
  );
}
