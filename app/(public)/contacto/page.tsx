"use client";

import { useEffect, useState } from "react";

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

export default function ContactoPage() {
  const [info, setInfo] = useState<ContactoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("/api/public/contacto");
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || "Error");
        setInfo(result.info || null);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeError("");
    setMensajeExito(false);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMensajeError(result?.error || "Error al enviar el mensaje.");
      } else {
        setMensajeExito(true);
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
      }
    } catch {
      setMensajeError("Error de conexión. Verifica tu internet.");
    } finally {
      setEnviando(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Cargando...
      </div>
    );

  return (
    <main>
      <section className="bg-white relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-500">
            Estamos para ayudarte. Escríbenos o llámanos.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Información de contacto
          </h2>
          {info && (
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Teléfono:</span>{" "}
                {info.telefono}
              </p>
              <p>
                <span className="font-medium text-gray-900">Correo:</span>{" "}
                {info.email_ventas}
              </p>
              <p>
                <span className="font-medium text-gray-900">Dirección:</span>{" "}
                {info.direccion}, {info.colonia}, {info.ciudad}, C.P. {info.cp}
              </p>
              <p>
                <span className="font-medium text-gray-900">Horario:</span>{" "}
                {info.horario_semana}
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Envíanos un mensaje
          </h2>

          {mensajeExito && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Mensaje enviado con éxito.
            </div>
          )}

          {mensajeError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {mensajeError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              placeholder="Nombre"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Correo electrónico"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md"
            />

            <input
              type="text"
              value={formData.asunto}
              onChange={(e) =>
                setFormData({ ...formData, asunto: e.target.value })
              }
              placeholder="Asunto"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md"
            />

            <textarea
              rows={5}
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              placeholder="Mensaje"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md"
            />

            <button
              type="submit"
              disabled={enviando}
              className="w-full px-6 py-3 rounded-md text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}