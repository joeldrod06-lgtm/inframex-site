"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


// Tipos
interface ContactoInfo {
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
}

export default function ContactoPage() {
  const [info, setInfo] = useState<ContactoInfo | null>(null);
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar información de contacto
      const { data: infoData } = await supabase
        .from("contacto_info")
        .select("*")
        .eq("id", 1)
        .single();
      
      if (infoData) setInfo(infoData);

      // Cargar redes sociales activas
      const { data: redesData } = await supabase
        .from("contacto_redes")
        .select("*")
        .eq("activo", true)
        .order("orden");
      
      if (redesData) setRedes(redesData);

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log("🔵 ===== INICIO ENVÍO =====");
  console.log("📝 Datos del formulario:", formData);

  console.log("🔍 Verificando cliente Supabase:", supabase ? "OK" : "NO INICIALIZADO");
  
  setEnviando(true);
  setMensajeError("");
  setMensajeExito(false);

  // Validar campos
  if (!formData.nombre.trim() || !formData.email.trim() || !formData.asunto.trim() || !formData.mensaje.trim()) {
    console.log("❌ Validación falló: campos vacíos");
    setMensajeError("Todos los campos son obligatorios");
    setEnviando(false);
    return;
  }

  if (!formData.email.includes('@') || !formData.email.includes('.')) {
    console.log("❌ Validación falló: email inválido");
    setMensajeError("Por favor ingresa un email válido");
    setEnviando(false);
    return;
  }

  try {
    // 1. Guardar en Supabase
    console.log("🟢 Intentando guardar en Supabase...");
    console.log("📤 Datos a insertar:", {
      nombre: formData.nombre,
      email: formData.email,
      asunto: formData.asunto,
      mensaje: formData.mensaje.substring(0, 50) + "..."
    });

    const { data: supabaseData, error: supabaseError } = await supabase
      .from("contacto_mensajes")
      .insert([{
        nombre: formData.nombre,
        email: formData.email,
        asunto: formData.asunto,
        mensaje: formData.mensaje,
        leido: false,
        respondido: false
      }])
      .select();

    if (supabaseError) {
      console.error("❌ Error de Supabase DETALLADO:", {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code
      });
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    console.log("✅ Supabase OK. Datos guardados:", supabaseData);

    // 2. Enviar email con Resend
    console.log("🟢 Enviando a API de contacto...");
    
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log("📊 Status de respuesta:", response.status);
    console.log("📊 Headers:", Object.fromEntries(response.headers.entries()));

    const result = await response.json();
    console.log("📦 Respuesta de API:", result);

    if (!response.ok) {
      console.warn("⚠️ Error en API:", result);
      setMensajeError("El mensaje se guardó pero hubo un problema al enviar la notificación por email. Nos comunicaremos contigo pronto.");
    } else {
      console.log("✅ ¡TODO OK! Mensaje enviado correctamente");
      setMensajeExito(true);
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
      });
      
      setTimeout(() => setMensajeExito(false), 5000);
    }
  } catch (error: any) {
    console.error("❌ Error en catch:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      error: error
    });
    
    // Mensaje más específico según el error
    if (error?.message?.includes('Supabase')) {
      setMensajeError("Error al guardar en la base de datos. Intenta de nuevo.");
    } else if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
      setMensajeError("Error de conexión. Verifica tu internet.");
    } else {
      setMensajeError("Error al enviar el mensaje. Intenta de nuevo.");
    }
  } finally {
    setEnviando(false);
    console.log("🏁 ===== FIN ENVÍO =====\n");
  }
};

  // Función para renderizar icono de red social
  const renderIconoSocial = (icono: string) => {
    switch(icono) {
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.05-4.55 4.55 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2.02 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.45-.37.1-.77.16-1.2.16-.3 0-.6-.03-.88-.08.6 1.9 2.34 3.28 4.4 3.32-1.6 1.26-3.62 2-5.8 2-.38 0-.74-.02-1.1-.07 2.05 1.32 4.5 2.1 7.12 2.1 8.53 0 13.2-7.08 13.2-13.2 0-.2 0-.4-.02-.6.9-.66 1.68-1.47 2.3-2.4z"/>
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case "whatsapp":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.087.276.072.378-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero con fondo de puntos */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-3">
              Contacto
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos.
            </p>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* Contacto - dos columnas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
              Preferimos el trato directo
            </h2>
            <div className="w-20 h-0.5 bg-gray-300 mb-6"></div>
            <p className="text-gray-500 leading-relaxed mb-8">
              Por eso, puedes contactarnos por cualquiera de estos medios y te responderemos a la mayor brevedad.
            </p>

            {info && (
              <div className="space-y-6">
                {/* Teléfono */}
                <div className="group flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Teléfono</h3>
                    <p className="text-gray-900">{info.telefono}</p>
                    {info.telefono_secundario && (
                      <p className="text-gray-600 text-sm">{info.telefono_secundario}</p>
                    )}
                    <p className="text-sm text-gray-500">{info.horario_semana.split(':')[1] || info.horario_semana}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Email</h3>
                    <p className="text-gray-900">{info.email_ventas}</p>
                    <p className="text-gray-900">{info.email_cotizaciones}</p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="group flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Ubicación</h3>
                    <p className="text-gray-900">{info.direccion}</p>
                    <p className="text-gray-900">{info.colonia}, {info.ciudad} CP {info.cp}</p>
                  </div>
                </div>

                {/* Redes Sociales */}
                {redes.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Síguenos</h3>
                    <div className="flex gap-3">
                      {redes.map((red) => (
                        <a
                          key={red.id}
                          href={red.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                          aria-label={red.nombre}
                        >
                          {renderIconoSocial(red.icono)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botón WhatsApp directo */}
            {info && (
              <div className="mt-10">
                <a
                  href={`https://wa.me/${info.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.087.276.072.378-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
                  </svg>
                  Envíanos un WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Formulario de contacto */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Escríbenos
              </span>
              <h2 className="text-3xl font-light text-gray-900 mt-2 mb-4">
                Envíanos un mensaje
              </h2>
              <div className="w-20 h-0.5 bg-gray-300 mb-6"></div>
              
              {mensajeExito && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  ¡Mensaje enviado con éxito! Te responderemos pronto.
                </div>
              )}
              
              {mensajeError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {mensajeError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                    disabled={enviando}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                    disabled={enviando}
                  />
                </div>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Asunto"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                  disabled={enviando}
                />
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Mensaje"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                  disabled={enviando}
                ></textarea>
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="relative h-80 w-full group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
            {info?.mapa_iframe ? (
              <div 
                dangerouslySetInnerHTML={{ __html: info.mapa_iframe }} 
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                Mapa de ubicación (Google Maps)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Horario de atención */}
      {info && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Visítanos
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
                Horario de atención
              </h2>
              <div className="w-20 h-0.5 bg-gray-300 mx-auto mb-6"></div>
              <p className="text-gray-500 mb-2">{info.horario_semana}</p>
              <p className="text-gray-500">{info.horario_sabado}</p>
              <p className="text-gray-400 text-sm mt-4">{info.horario_domingo}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}