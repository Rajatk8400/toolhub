import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import LogoutButton from "@/components/admin/LogoutButton";
import Logo from "@/components/Logo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // The login page renders its own minimal shell.
  if (!user) return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white p-4">
        <div className="mb-6 flex items-center gap-2">
          <Logo size="sm" />
          <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase">
            Admin
          </span>
        </div>
        <nav className="space-y-1 text-sm">
          <Link href="/admin/tools" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
            Tools
          </Link>
          <Link href="/admin/tools/new" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
            Add tool
          </Link>
          <Link href="/admin/student-info" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
            Student Info Hub
          </Link>
          <Link href="/admin/keywords" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
            Keyword Clusters
          </Link>
        </nav>
        <div className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-500">
          Signed in as {user.name} ({user.role})
        </div>
        <LogoutButton />
      </aside>
      <div className="flex-1 bg-gray-50 p-6">{children}</div>
    </div>
  );
}
