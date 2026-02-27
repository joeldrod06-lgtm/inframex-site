"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardData {
  totalCotizaciones: number;
  totalProductos: number;
  totalMensajes: number;
  mensajesNoLeidos: number;
  totalRedesSociales: number;
  ultimosMensajes: any[];
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
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

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

      // Contar mensajes de contacto
      const { count: mensajesCount } = await supabase
        .from("contacto_mensajes")
        .select("*", { count: "exact", head: true });

      // Contar mensajes no leídos
      const { count: noLeidosCount } = await supabase
        .from("contacto_mensajes")
        .select("*", { count: "exact", head: true })
        .eq("leido", false);

      // Contar redes sociales
      const { count: redesCount } = await supabase
        .from("contacto_redes")
        .select("*", { count: "exact", head: true });

      // Obtener últimos 5 mensajes
      const { data: ultimosMensajes } = await supabase
        .from("contacto_mensajes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setDashboardData({
        totalCotizaciones: cotizacionesCount || 0,
        totalProductos: productosCount || 0,
        totalMensajes: mensajesCount || 0,
        mensajesNoLeidos: noLeidosCount || 0,
        totalRedesSociales: redesCount || 0,
        ultimosMensajes: ultimosMensajes || [],
      });
    } catch (err) {
      console.error("Error cargando datos del dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeido = async (id: number) => {
    try {
      await supabase
        .from("contacto_mensajes")
        .update({ leido: true })
        .eq("id", id);
      
      // Recargar datos
      loadDashboardData();
    } catch (error) {
      console.error("Error marcando mensaje como leído:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Cargando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Productos */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Productos</p>
              <p className="text-3xl font-bold">{dashboardData.totalProductos}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <Link href="/admin/productos" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Ver productos →
          </Link>
        </div>

        {/* Cotizaciones */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Cotizaciones</p>
              <p className="text-3xl font-bold">{dashboardData.totalCotizaciones}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <Link href="/admin/cotizaciones" className="text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            Ver cotizaciones →
          </Link>
        </div>

        {/* Mensajes */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mensajes Recibidos</p>
              <p className="text-3xl font-bold">{dashboardData.totalMensajes}</p>
              {dashboardData.mensajesNoLeidos > 0 && (
                <p className="text-sm text-red-600 mt-1">
                  {dashboardData.mensajesNoLeidos} no leídos
                </p>
              )}
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <Link href="/admin/contacto" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">
            Ver todos los mensajes →
          </Link>
        </div>

        {/* Redes Sociales */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Redes Sociales</p>
              <p className="text-3xl font-bold">{dashboardData.totalRedesSociales}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          <Link href="/admin/contacto" className="text-sm text-orange-600 hover:text-orange-800 mt-2 inline-block">
            Administrar redes →
          </Link>
        </div>
      </div>

      {/* Últimos mensajes recibidos */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">📨 Últimos mensajes recibidos</h2>
          <Link href="/admin/contacto" className="text-sm text-gray-600 hover:text-gray-800">
            Ver todos →
          </Link>
        </div>

        {dashboardData.ultimosMensajes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay mensajes para mostrar</p>
        ) : (
          <div className="space-y-3">
            {dashboardData.ultimosMensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`border rounded-lg p-4 ${
                  !mensaje.leido ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{mensaje.nombre}</h3>
                      {!mensaje.leido && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Nuevo
                        </span>
                      )}
                      {mensaje.respondido && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                          Respondido
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{mensaje.email}</p>
                    <p className="font-medium text-sm mt-2">{mensaje.asunto}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{mensaje.mensaje}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(mensaje.created_at).toLocaleString('es-MX', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  
                  {!mensaje.leido && (
                    <button
                      onClick={() => marcarComoLeido(mensaje.id)}
                      className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 px-2 py-1 rounded"
                    >
                      Marcar como leído
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">⚡ Acciones rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/productos/nuevo"
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">➕</div>
            <span className="text-sm font-medium">Nuevo producto</span>
          </Link>
          
          <Link
            href="/admin/cotizaciones"
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">📋</div>
            <span className="text-sm font-medium">Ver cotizaciones</span>
          </Link>
          
          <Link
            href="/admin/contacto"
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">✉️</div>
            <span className="text-sm font-medium">Revisar mensajes</span>
          </Link>
          
          <button
            onClick={loadDashboardData}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🔄</div>
            <span className="text-sm font-medium">Actualizar datos</span>
          </button>
        </div>
      </div>
    </div>
  );
}