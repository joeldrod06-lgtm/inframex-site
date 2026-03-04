"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useEffect, useState } from "react";
import { requireAdminSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  leido: boolean;
  respondido: boolean;
  created_at: string;
}

interface DashboardData {
  totalCotizaciones: number;
  totalProductos: number;
  totalMensajes: number;
  mensajesNoLeidos: number;
  totalRedesSociales: number;
  ultimosMensajes: Mensaje[];
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalCotizaciones: 0,
    totalProductos: 0,
    totalMensajes: 0,
    mensajesNoLeidos: 0,
    totalRedesSociales: 0,
    ultimosMensajes: [],
  });

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const adminCheck = await requireAdminSession();
      if (!adminCheck.ok) {
        router.replace("/admin/login");
        return;
      }
      loadDashboardData();
    };

    checkSession();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/dashboard");
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Error");
      setDashboardData(result);
    } catch (err) {
      console.error("Error cargando datos del dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeido = async (id: number) => {
    try {
      await adminFetch("/api/admin/mensajes-contacto", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, leido: true }),
      });
      loadDashboardData();
    } catch (error) {
      console.error("Error marcando mensaje como leido:", error);
    }
  };

  if (loading) {
    return <div className="p-10 text-gray-500">Cargando Dashboard...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6"><p>Total Productos</p><p className="text-3xl font-bold">{dashboardData.totalProductos}</p></div>
        <div className="bg-white shadow rounded-lg p-6"><p>Total Cotizaciones</p><p className="text-3xl font-bold">{dashboardData.totalCotizaciones}</p></div>
        <div className="bg-white shadow rounded-lg p-6"><p>Mensajes Recibidos</p><p className="text-3xl font-bold">{dashboardData.totalMensajes}</p></div>
        <div className="bg-white shadow rounded-lg p-6"><p>Redes Sociales</p><p className="text-3xl font-bold">{dashboardData.totalRedesSociales}</p></div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Ultimos mensajes</h2>
          <Link href="/admin/contacto" className="text-sm text-gray-600">Ver todos</Link>
        </div>

        {dashboardData.ultimosMensajes.length === 0 ? (
          <p className="text-gray-500">No hay mensajes para mostrar</p>
        ) : (
          <div className="space-y-3">
            {dashboardData.ultimosMensajes.map((mensaje) => (
              <div key={mensaje.id} className={`border rounded-lg p-4 ${!mensaje.leido ? "bg-blue-50 border-blue-200" : ""}`}>
                <p className="font-medium">{mensaje.nombre}</p>
                <p className="text-sm text-gray-600">{mensaje.email}</p>
                <p className="text-sm mt-1">{mensaje.asunto}</p>
                {!mensaje.leido && (
                  <button onClick={() => marcarComoLeido(mensaje.id)} className="text-xs text-blue-600 mt-2">Marcar como leido</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



