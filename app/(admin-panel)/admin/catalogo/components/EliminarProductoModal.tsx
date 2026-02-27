"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Producto {
  id: number;
  nombre: string;
  imagen?: string | null;
}

interface EliminarProductoModalProps {
  producto: Producto;
  onClose: () => void;
  onProductoEliminado: () => void;
}

export default function EliminarProductoModal({ producto, onClose, onProductoEliminado }: EliminarProductoModalProps) {
  const [loading, setLoading] = useState(false);

  const handleEliminar = async () => {
    try {
      setLoading(true);

      // Eliminar imagen de Storage si existe
      if (producto.imagen) {
        const fileName = producto.imagen.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from("productos")
            .remove([fileName]);
        }
      }

      // Eliminar producto de la base de datos
      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id", producto.id);

      if (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el producto: " + error.message);
        return;
      }

      alert("Producto eliminado correctamente");
      onProductoEliminado();
      onClose();
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Error inesperado al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Confirmar eliminación</h3>
        <p className="text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar el producto <span className="font-medium">"{producto.nombre}"</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleEliminar}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}