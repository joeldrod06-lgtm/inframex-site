"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";

interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
}

interface Props {
  valor?: Valor;
  onClose: () => void;
  onGuardado: () => void;
}

export default function ModalValor({ valor, onClose, onGuardado }: Props) {
  const isEditing = !!valor;
  const [titulo, setTitulo] = useState(valor?.titulo || "");
  const [descripcion, setDescripcion] = useState(valor?.descripcion || "");
  const [icono, setIcono] = useState(valor?.icono || "cercania");
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/valores-empresa", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { id: valor?.id, titulo, descripcion, icono } : { titulo, descripcion, icono, tipo: "valor" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al guardar");
      onGuardado();
      onClose();
    } catch {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!isEditing) return;
    if (!confirm("Eliminar este valor?")) return;
    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/valores-empresa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: valor?.id }),
      });
      if (!response.ok) throw new Error();
      onGuardado();
      onClose();
    } catch {
      alert("Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Editar" : "Crear"} Valor</h2>
        <div className="space-y-4">
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo" className="w-full border rounded-lg px-3 py-2" disabled={loading} />
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion" rows={3} className="w-full border rounded-lg px-3 py-2" disabled={loading} />
          <select value={icono} onChange={(e) => setIcono(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading}>
            <option value="cercania">Cercania</option>
            <option value="compromiso">Compromiso</option>
            <option value="actitud">Actitud</option>
          </select>
          <div className="flex justify-end gap-3 pt-4">
            {isEditing && <button onClick={handleEliminar} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">Eliminar</button>}
            <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading}>Cancelar</button>
            <button onClick={handleGuardar} disabled={loading} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">{loading ? "Guardando..." : isEditing ? "Guardar" : "Crear"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}



