"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";

interface Historia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
}

interface Props {
  historia: Historia;
  onClose: () => void;
  onGuardado: () => void;
}

export default function ModalHistoria({ historia, onClose, onGuardado }: Props) {
  const [titulo, setTitulo] = useState(historia.titulo);
  const [descripcion, setDescripcion] = useState(historia.descripcion);
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/valores-empresa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: historia.id, titulo, descripcion, icono: "historia" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al guardar");
      onGuardado();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al guardar historia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Editar Historia</h2>
        <div className="space-y-4">
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} />
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={6} className="w-full border rounded-lg px-3 py-2" disabled={loading} />
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading}>Cancelar</button>
            <button onClick={handleGuardar} disabled={loading} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">{loading ? "Guardando..." : "Guardar"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}



