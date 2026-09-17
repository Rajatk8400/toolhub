import StudentInfoForm from "@/components/admin/StudentInfoForm";

export default function NewStudentInfoPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Add student info item</h1>
      <StudentInfoForm mode="create" />
    </div>
  );
}
