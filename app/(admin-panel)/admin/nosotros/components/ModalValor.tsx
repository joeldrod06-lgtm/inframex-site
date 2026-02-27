"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

      if (!titulo.trim() || !descripcion.trim()) {
        alert("Todos los campos son requeridos");
        return;
      }

      if (isEditing) {
        const { error } = await supabase
          .from("nosotros_valores")
          .update({ titulo, descripcion, icono })
          .eq("id", valor.id);

        if (error) throw error;
        alert("Valor actualizado correctamente");
      } else {
        const { data: maxOrdenData } = await supabase
          .from("nosotros_valores")
          .select("orden")
          .order("orden", { ascending: false })
          .limit(1);

        const nuevoOrden = maxOrdenData && maxOrdenData.length > 0 ? maxOrdenData[0].orden + 1 : 1;

        const { error } = await supabase
          .from("nosotros_valores")
          .insert([{ titulo, descripcion, icono, orden: nuevoOrden }]);

        if (error) throw error;
        alert("Valor creado correctamente");
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
    
    if (!confirm("¿Estás seguro de eliminar este valor?")) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("nosotros_valores")
        .delete()
        .eq("id", valor.id);

      if (error) throw error;
      
      alert("Valor eliminado correctamente");
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
    { value: "cercania", label: "Cercanía", svg: "👥" },
    { value: "compromiso", label: "Compromiso", svg: "✓" },
    { value: "actitud", label: "Actitud", svg: "⚡" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar" : "Crear"} Valor
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <select
            value={icono}
            onChange={(e) => setIcono(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          >
            {iconos.map((i) => (
              <option key={i.value} value={i.value}>
                {i.svg} {i.label}
              </option>
            ))}
          </select>

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