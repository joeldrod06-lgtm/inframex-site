"use client";

import { useEffect, useState } from "react";

export default function CotizacionForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (website) return;

    if (mensaje.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (!res.ok) throw new Error("Error al enviar la solicitud");

      setNombre("");
      setEmail("");
      setMensaje("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al enviar la solicitud";
      setError(message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className="bg-gray-50 rounded-3xl p-8 md:p-12 -mt-6" />;
  }

  return (
    <div className="bg-gray-50 rounded-3xl p-8 md:p-12 -mt-6 border border-gray-100">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Solicita una cotización
        </h2>
        <p className="text-gray-500 mb-8">
          Cuéntanos tu proyecto y recibe una propuesta personalizada en breve.
        </p>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div aria-hidden="true" className="hidden">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

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
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <textarea
            rows={4}
            placeholder="Mensaje o detalles de tu proyecto"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            Solicitud enviada correctamente.
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}