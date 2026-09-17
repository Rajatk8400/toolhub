"use client";

import { useState } from "react";

interface Course {
  id: number;
  grade: string;
  credits: string;
}

const GRADE_POINTS: Record<string, number> = { A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, "C+": 2.3, C: 2, D: 1, F: 0 };

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([{ id: 1, grade: "A", credits: "3" }]);
  const [nextId, setNextId] = useState(2);

  const addCourse = () => {
    setCourses((c) => [...c, { id: nextId, grade: "A", credits: "3" }]);
    setNextId((n) => n + 1);
  };
  const removeCourse = (id: number) => setCourses((c) => c.filter((x) => x.id !== id));
  const update = (id: number, field: "grade" | "credits", value: string) =>
    setCourses((c) => c.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  let totalPoints = 0;
  let totalCredits = 0;
  for (const course of courses) {
    const credits = parseFloat(course.credits);
    if (!isNaN(credits) && GRADE_POINTS[course.grade] !== undefined) {
      totalPoints += GRADE_POINTS[course.grade] * credits;
      totalCredits += credits;
    }
  }
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center gap-2">
            <select
              value={course.grade}
              onChange={(e) => update(course.id, "grade", e.target.value)}
              aria-label="Grade"
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              {Object.keys(GRADE_POINTS).map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input
              type="number"
              value={course.credits}
              onChange={(e) => update(course.id, "credits", e.target.value)}
              placeholder="Credits"
              aria-label="Credits"
              className="w-24 rounded-lg border border-gray-300 px-3 py-2"
            />
            {courses.length > 1 && (
              <button onClick={() => removeCourse(course.id)} className="text-sm text-red-600 hover:underline">Remove</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={addCourse} className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
        + Add course
      </button>
      <div className="mt-5 min-h-[2.5rem] rounded-lg bg-blue-50 px-4 py-3 text-lg font-semibold text-blue-900">
        {gpa !== null ? `GPA: ${gpa.toFixed(2)}` : "Add at least one course with credits"}
      </div>
    </div>
  );
}
