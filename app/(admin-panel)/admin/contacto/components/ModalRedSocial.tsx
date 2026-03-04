"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
  activo: boolean;
  orden: number;
}

interface Props {
  red?: RedSocial;
  onClose: () => void;
  onGuardado: () => void;
}

export default function ModalRedSocial({ red, onClose, onGuardado }: Props) {
  const isEditing = !!red;
  const [nombre, setNombre] = useState(red?.nombre || "");
  const [url, setUrl] = useState(red?.url || "");
  const [icono, setIcono] = useState(red?.icono || "facebook");
  const [activo, setActivo] = useState(red?.activo ?? true);
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    try {
      setLoading(true);

      if (!nombre.trim() || !url.trim()) {
        alert("Nombre y URL son requeridos");
        return;
      }

      const response = await adminFetch("/api/admin/contacto/redes", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: red?.id, nombre, url, icono, activo }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al guardar");

      alert(isEditing ? "Red social actualizada" : "Red social creada");
      onGuardado();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!isEditing) return;
    if (!confirm("Eliminar esta red social?")) return;

    try {
      setLoading(true);
      const response = await adminFetch("/api/admin/contacto/redes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: red?.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al eliminar");

      alert("Red social eliminada");
      onGuardado();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  const iconos = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter / X" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Editar" : "Nueva"} Red Social</h2>

        <div className="space-y-4">
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="w-full border rounded-lg px-3 py-2" disabled={loading} />
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="w-full border rounded-lg px-3 py-2" disabled={loading} />

          <select value={icono} onChange={(e) => setIcono(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading}>
            {iconos.map((i) => (<option key={i.value} value={i.value}>{i.label}</option>))}
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} disabled={loading} />
            Activo
          </label>

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



