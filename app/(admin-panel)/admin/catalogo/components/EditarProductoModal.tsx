"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion_corta?: string | null;
  imagen_principal?: string | null;
}

interface EditarProductoModalProps {
  producto: Producto;
  onClose: () => void;
  onProductoEditado: () => void;
}

export default function EditarProductoModal({ producto, onClose, onProductoEditado }: EditarProductoModalProps) {
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [descripcion, setDescripcion] = useState(producto.descripcion_corta ?? "");
  const [imagen, setImagen] = useState(producto.imagen_principal ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (): Promise<string | null> => {
    if (!file) return imagen;
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `producto-${producto.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("productos").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("productos").getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch {
      alert("Error al subir la imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleGuardar = async () => {
    try {
      setLoading(true);
      if (!nombre.trim() || precio <= 0) {
        alert("Nombre y precio son requeridos");
        return;
      }

      const imageUrl = await handleUpload();
      if (file && !imageUrl) return;

      const response = await adminFetch("/api/admin/productos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: producto.id, nombre: nombre.trim(), precio: Number(precio), descripcion: descripcion.trim() || null, imagen: imageUrl || null }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al guardar");

      onProductoEditado();
      onClose();
    } catch {
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-xl font-semibold">Editar producto</h2>

        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
          {imagen ? <Image src={imagen} alt={nombre || "Vista previa"} fill className="object-cover" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>}
        </div>

        <input type="file" accept="image/*" onChange={(e) => { const selected = e.target.files?.[0]; if (selected) { setFile(selected); setImagen(URL.createObjectURL(selected)); } }} className="text-sm w-full" disabled={uploading} />
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="w-full border rounded-lg px-3 py-2" disabled={loading} required />
        <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} placeholder="Precio" step="0.01" min="0" className="w-full border rounded-lg px-3 py-2" disabled={loading} required />
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion" rows={3} className="w-full border rounded-lg px-3 py-2" disabled={loading} />

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading || uploading}>Cancelar</button>
          <button onClick={handleGuardar} disabled={loading || uploading} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">{loading ? "Guardando..." : uploading ? "Subiendo..." : "Guardar cambios"}</button>
        </div>
      </div>
    </div>
  );
}



