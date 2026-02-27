"use client";

import { useState } from "react";

export default function CotizacionForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [website, setWebsite] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🚫 Honeypot: si el campo oculto tiene contenido, es un bot
    if (website) {
      console.log("Bot detectado");
      return;
    }

    // Validación extra: mensaje con al menos 10 caracteres
    if (mensaje.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres");
      // Limpiar error después de 5 segundos
      setTimeout(() => setError(null), 5000);
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          mensaje,
        }),
      });

      setLoading(false);

      if (!res.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      // Éxito
      setNombre("");
      setEmail("");
      setMensaje("");
      setSuccess(true);

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Error al enviar la solicitud");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-8 md:p-12 -mt-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Solicite una cotización
        </h2>

        <p className="text-gray-500 mb-8">
          Cuéntenos su proyecto y reciba una propuesta personalizada en breve.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Campo honeypot - invisible para humanos */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <textarea
            rows={4}
            placeholder="Mensaje o detalles de su proyecto"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>

        {/* Mensaje de éxito */}
        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">
              Solicitud enviada correctamente.
            </p>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          o contáctanos directamente por{" "}
          <a
            href="https://wa.me/5210000000000"
            className="text-gray-600 underline"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}