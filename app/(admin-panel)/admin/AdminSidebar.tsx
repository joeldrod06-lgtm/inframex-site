"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-light">INFRAMEX</h1>
        <p className="text-xs text-gray-400">Panel Admin</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/cotizaciones"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Cotizaciones
        </Link>

        <Link
          href="/admin/catalogo"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Catálogo
        </Link>

        <Link
          href="/admin/nosotros"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Nosotros
        </Link>

        <Link
          href="/admin/contacto"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Contacto
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}