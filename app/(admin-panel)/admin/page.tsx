// (admin-panel)/admin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
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