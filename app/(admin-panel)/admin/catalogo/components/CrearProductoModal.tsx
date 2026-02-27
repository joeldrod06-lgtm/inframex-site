"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface CrearProductoModalProps {
  onClose: () => void;
  onProductoCreado: () => void;
}

export default function CrearProductoModal({ onClose, onProductoCreado }: CrearProductoModalProps) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      setUploading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        alert("Sesión expirada. Por favor inicia sesión nuevamente.");
        return null;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `nuevo-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        console.error("Error subiendo imagen:", uploadError);
        alert("Error al subir la imagen: " + uploadError.message);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("productos")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (err) {
      console.error("Error inesperado upload:", err);
      alert("Error inesperado al subir la imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCrear = async () => {
    try {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        alert("Sesión expirada. Por favor inicia sesión nuevamente.");
        return;
      }

      if (!nombre.trim()) {
        alert("El nombre es requerido");
        return;
      }

      if (precio <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
      }

      let imageUrl = null;
      
      if (file) {
        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return;
        }
      }

      const productoData = {
        nombre: nombre.trim(),
        precio: Number(precio),
        descripcion: descripcion?.trim() || null,
        imagen: imageUrl,
      };

      const { data, error } = await supabase
        .from("productos")
        .insert([productoData])
        .select();

      if (error) {
        console.error("Error al crear:", error);
        alert("Error al crear: " + error.message);
        return;
      }

      if (!data || data.length === 0) {
        alert("No se pudo crear el producto. Verifica los permisos.");
        return;
      }

      alert("Producto creado correctamente");
      onProductoCreado();
      onClose();
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Error inesperado al crear");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-xl font-semibold">Crear nuevo producto</h2>

        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
          {imagen ? (
            <Image
              src={imagen}
              alt={nombre || "Vista previa"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm">Sin imagen</p>
              </div>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              setFile(selected);
              setImagen(URL.createObjectURL(selected));
            }
          }}
          className="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          disabled={uploading}
        />

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          disabled={loading}
          required
        />

        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          placeholder="Precio"
          step="0.01"
          min="0"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          disabled={loading}
          required
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del producto"
          rows={3}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          disabled={loading}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
            disabled={loading || uploading}
          >
            Cancelar
          </button>

          <button
            onClick={handleCrear}
            disabled={loading || uploading}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creando..." : uploading ? "Subiendo imagen..." : "Crear producto"}
          </button>
        </div>
      </div>
    </div>
  );
}