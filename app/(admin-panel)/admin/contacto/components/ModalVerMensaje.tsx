"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useEffect, useRef, useState } from "react";

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

interface Props {
  mensaje: Mensaje;
  onClose: () => void;
  onActualizado: () => void;
}

export default function ModalVerMensaje({ mensaje, onClose, onActualizado }: Props) {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marcarLeido = async () => {
      if (mensaje.leido) return;
      await adminFetch("/api/admin/mensajes-contacto", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: mensaje.id, leido: true }),
      });
      onActualizado();
    };
    marcarLeido();
  }, [mensaje.id, mensaje.leido, onActualizado]);

  const marcarComoRespondido = async () => {
    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/mensajes-contacto", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: mensaje.id, respondido: !mensaje.respondido }),
      });
      if (!response.ok) throw new Error();
      onActualizado();
    } catch {
      alert("No se pudo actualizar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  const eliminarMensaje = async () => {
    if (!confirm("Eliminar este mensaje?")) return;
    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/mensajes-contacto", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: mensaje.id }),
      });
      if (!response.ok) throw new Error();
      onActualizado();
      onClose();
    } catch {
      alert("No se pudo eliminar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Mensaje de {mensaje.nombre}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>

        <div className="space-y-4">
          <p><strong>Email:</strong> {mensaje.email}</p>
          <p><strong>Asunto:</strong> {mensaje.asunto}</p>
          <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{mensaje.mensaje}</p>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={eliminarMensaje} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">Eliminar</button>
            <button onClick={marcarComoRespondido} disabled={loading} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">{mensaje.respondido ? "Marcar como no respondido" : "Marcar como respondido"}</button>
            <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}



