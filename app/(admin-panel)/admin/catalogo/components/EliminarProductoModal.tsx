"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Producto {
  id: number;
  nombre: string;
  imagen_principal?: string | null;
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

      if (producto.imagen_principal) {
        const fileName = producto.imagen_principal.split('/').pop();
        if (fileName) {
          await supabase.storage.from("productos").remove([fileName]);
        }
      }

      const response = await adminFetch("/api/admin/productos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: producto.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al eliminar");

      onProductoEliminado();
      onClose();
    } catch {
      alert("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Confirmar eliminacion</h3>
        <p className="text-gray-600 mb-6">Seguro que deseas eliminar <span className="font-medium">{producto.nombre}</span>?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading}>Cancelar</button>
          <button onClick={handleEliminar} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">{loading ? "Eliminando..." : "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
}



