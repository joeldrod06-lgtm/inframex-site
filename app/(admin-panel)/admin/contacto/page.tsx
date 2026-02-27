"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Importar modales
import ModalInfoContacto from "./components/ModalInfoContacto";
import ModalRedSocial from "./components/ModalRedSocial";
import ModalVerMensaje from "./components/ModalVerMensaje";

// Tipos
interface ContactoInfo {
  id: number;
  telefono: string;
  telefono_secundario: string | null;
  email_ventas: string;
  email_cotizaciones: string;
  direccion: string;
  colonia: string;
  ciudad: string;
  cp: string;
  whatsapp: string;
  horario_semana: string;
  horario_sabado: string;
  horario_domingo: string;
  mapa_iframe: string | null;
}

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
  activo: boolean;
  orden: number;
}

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

export default function AdminContactoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<ContactoInfo | null>(null);
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
  
  // Estados para modales
  const [modalInfo, setModalInfo] = useState(false);
  const [modalRed, setModalRed] = useState<RedSocial | null>(null);
  const [modalNuevaRed, setModalNuevaRed] = useState(false);
  const [modalMensaje, setModalMensaje] = useState<Mensaje | null>(null);
  
  // Filtro para mensajes
  const [filtroLeidos, setFiltroLeidos] = useState<string>("todos");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          router.replace("/admin/login");
          return;
        }
        
        cargarDatos();
      } catch (err) {
        console.error("Error verificando sesión:", err);
        router.replace("/admin/login");
      }
    };
    
    checkSession();
  }, [router]);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      // Cargar info de contacto
      const { data: infoData } = await supabase
        .from("contacto_info")
        .select("*")
        .eq("id", 1)
        .single();
      
      if (infoData) setInfo(infoData);

      // Cargar redes sociales
      const { data: redesData } = await supabase
        .from("contacto_redes")
        .select("*")
        .order("orden");
      
      if (redesData) setRedes(redesData);

      // Cargar mensajes
      const { data: mensajesData } = await supabase
        .from("contacto_mensajes")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (mensajesData) {
        setMensajes(mensajesData);
        setMensajesNoLeidos(mensajesData.filter(m => !m.leido).length);
      }

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const mensajesFiltrados = mensajes.filter(m => {
    if (filtroLeidos === "leidos") return m.leido;
    if (filtroLeidos === "noLeidos") return !m.leido;
    return true;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Administrar Página de Contacto</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edita la información de contacto y revisa los mensajes recibidos
        </p>
      </div>

      {/* Info de Contacto */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">📞 Información de Contacto</h2>
          <button
            onClick={() => setModalInfo(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
          >
            Editar información
          </button>
        </div>
        
        {info && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Teléfonos</p>
                <p className="font-medium">{info.telefono}</p>
                {info.telefono_secundario && (
                  <p className="text-sm text-gray-600">{info.telefono_secundario}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Emails</p>
                <p className="font-medium">{info.email_ventas}</p>
                <p className="text-sm text-gray-600">{info.email_cotizaciones}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium">+{info.whatsapp}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium">{info.direccion}</p>
                <p className="text-sm text-gray-600">{info.colonia}, {info.ciudad} CP {info.cp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Horarios</p>
                <p className="text-sm">{info.horario_semana}</p>
                <p className="text-sm">{info.horario_sabado}</p>
                <p className="text-sm text-gray-500">{info.horario_domingo}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Redes Sociales */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">🌐 Redes Sociales</h2>
          <button
            onClick={() => setModalNuevaRed(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            + Agregar red social
          </button>
        </div>
        
        <div className="grid gap-4">
          {redes.map((red) => (
            <div key={red.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {red.icono === "facebook" && "📘"}
                  {red.icono === "instagram" && "📷"}
                  {red.icono === "twitter" && "🐦"}
                  {red.icono === "tiktok" && "🎵"}
                  {red.icono === "youtube" && "▶️"}
                  {red.icono === "linkedin" && "💼"}
                  {red.icono === "whatsapp" && "📱"}
                </span>
                <div>
                  <h3 className="font-medium">{red.nombre}</h3>
                  <p className="text-sm text-gray-500">{red.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${red.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {red.activo ? 'Activo' : 'Inactivo'}
                </span>
                <button
                  onClick={() => setModalRed(red)}
                  className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
          
          {redes.length === 0 && (
            <p className="text-gray-500 text-center py-4">No hay redes sociales configuradas</p>
          )}
        </div>
      </section>

      {/* Mensajes Recibidos */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-medium">📨 Mensajes Recibidos</h2>
            {mensajesNoLeidos > 0 && (
              <p className="text-sm text-red-600 mt-1">
                {mensajesNoLeidos} mensaje{mensajesNoLeidos !== 1 ? 's' : ''} no leído{mensajesNoLeidos !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <select
            value={filtroLeidos}
            onChange={(e) => setFiltroLeidos(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="todos">Todos los mensajes</option>
            <option value="noLeidos">No leídos</option>
            <option value="leidos">Leídos</option>
          </select>
        </div>
        
        <div className="space-y-3">
          {mensajesFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay mensajes que mostrar</p>
          ) : (
            mensajesFiltrados.map((mensaje) => (
              <div
                key={mensaje.id}
                onClick={() => setModalMensaje(mensaje)}
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${
                  !mensaje.leido ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{mensaje.nombre}</h3>
                    <p className="text-sm text-gray-600">{mensaje.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {!mensaje.leido && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Nuevo
                      </span>
                    )}
                    {mensaje.respondido && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Respondido
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-medium text-sm mb-1">{mensaje.asunto}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{mensaje.mensaje}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(mensaje.created_at).toLocaleString('es-MX')}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modales */}
      {modalInfo && info && (
        <ModalInfoContacto
          info={info}
          onClose={() => setModalInfo(false)}
          onGuardado={cargarDatos}
        />
      )}

      {modalRed && (
        <ModalRedSocial
          red={modalRed}
          onClose={() => setModalRed(null)}
          onGuardado={cargarDatos}
        />
      )}

      {modalNuevaRed && (
        <ModalRedSocial
          onClose={() => setModalNuevaRed(false)}
          onGuardado={cargarDatos}
        />
      )}

      {modalMensaje && (
        <ModalVerMensaje
          mensaje={modalMensaje}
          onClose={() => setModalMensaje(null)}
          onActualizado={cargarDatos}
        />
      )}
    </div>
  );
}