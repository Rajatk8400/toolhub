"use client";

import { useEffect, useState } from "react";

export default function ExamCountdown() {
  const [examDate, setExamDate] = useState("");
  const [examName, setExamName] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const target = examDate ? new Date(examDate + "T00:00:00") : null;
  const valid = target && now && !isNaN(target.getTime());
  const diffMs = valid ? target!.getTime() - now!.getTime() : null;
  const days = diffMs !== null ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Exam name (optional)</span>
          <input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Final exams" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Exam date</span>
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
        </label>
      </div>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {days === null ? "Pick an exam date" : days > 0 ? `${days} day${days === 1 ? "" : "s"} until ${examName || "your exam"}` : days === 0 ? `${examName || "Your exam"} is today!` : `${examName || "That exam"} has passed`}
      </div>
    </div>
  );
}
