// (admin-panel)/admin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const adminCheck = await requireAdminSession();

      if (!adminCheck.ok) {
        router.replace("/admin/login");
        return;
      }

      // Redirige al dashboard
      router.replace("/admin/dashboard");
    };

    checkSessionAndRedirect();
  }, [router]);

  return <p className="p-10 text-gray-500">Redirigiendo al Dashboard...</p>;
}
