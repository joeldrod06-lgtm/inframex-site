"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

      if (isEditing) {
        const { error } = await supabase
          .from("contacto_redes")
          .update({ nombre, url, icono, activo })
          .eq("id", red.id);

        if (error) throw error;
        alert("Red social actualizada");
      } else {
        const { data: maxOrdenData } = await supabase
          .from("contacto_redes")
          .select("orden")
          .order("orden", { ascending: false })
          .limit(1);

        const nuevoOrden = maxOrdenData && maxOrdenData.length > 0 ? maxOrdenData[0].orden + 1 : 1;

        const { error } = await supabase
          .from("contacto_redes")
          .insert([{ nombre, url, icono, activo, orden: nuevoOrden }]);

        if (error) throw error;
        alert("Red social creada");
      }

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
    if (!confirm("¿Eliminar esta red social?")) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("contacto_redes")
        .delete()
        .eq("id", red.id);

      if (error) throw error;
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
    { value: "facebook", label: "Facebook", emoji: "📘" },
    { value: "instagram", label: "Instagram", emoji: "📷" },
    { value: "twitter", label: "Twitter / X", emoji: "🐦" },
    { value: "tiktok", label: "TikTok", emoji: "🎵" },
    { value: "youtube", label: "YouTube", emoji: "▶️" },
    { value: "linkedin", label: "LinkedIn", emoji: "💼" },
    { value: "whatsapp", label: "WhatsApp", emoji: "📱" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar" : "Nueva"} Red Social
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Facebook"
              className="w-full border rounded-lg px-3 py-2"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://facebook.com/inframex"
              className="w-full border rounded-lg px-3 py-2"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
            <select
              value={icono}
              onChange={(e) => setIcono(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              disabled={loading}
            >
              {iconos.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.emoji} {i.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
              className="mr-2"
              disabled={loading}
            />
            <label htmlFor="activo" className="text-sm text-gray-700">Activo (mostrar en la página)</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {isEditing && (
              <button
                onClick={handleEliminar}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Eliminar
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Guardando..." : isEditing ? "Guardar" : "Crear"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}