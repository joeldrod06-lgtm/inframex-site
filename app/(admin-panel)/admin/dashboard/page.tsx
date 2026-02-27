"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface DashboardData {
  totalCotizaciones: number;
  totalProductos: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalCotizaciones: 0,
    totalProductos: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      // Obtener la sesión actual
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        // Si no hay sesión → redirige al login
        router.replace("/admin/login");
        return;
      }

      // Si hay sesión → cargar datos del dashboard
      loadDashboardData();
    };

    checkSession();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Contar cotizaciones
      const { count: cotizacionesCount } = await supabase
        .from("cotizaciones")
        .select("*", { count: "exact", head: true });

      // Contar productos
      const { count: productosCount } = await supabase
        .from("productos")
        .select("*", { count: "exact", head: true });

      setDashboardData({
        totalCotizaciones: cotizacionesCount || 0,
        totalProductos: productosCount || 0,
      });
    } catch (err) {
      console.error("Error cargando datos del dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-10 text-gray-500">Cargando Dashboard...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Total Cotizaciones</p>
          <p className="text-3xl font-bold">{dashboardData.totalCotizaciones}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Total Productos</p>
          <p className="text-3xl font-bold">{dashboardData.totalProductos}</p>
        </div>
      </div>
    </div>
  );
}