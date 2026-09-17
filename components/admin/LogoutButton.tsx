"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <button onClick={logout} className="mt-3 text-xs font-medium text-blue-700 hover:underline">
      Sign out
    </button>
  );
}
