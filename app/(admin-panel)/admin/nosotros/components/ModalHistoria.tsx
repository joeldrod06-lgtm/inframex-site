"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
  const [imagen, setImagen] = useState(historia.imagen_url || "");
  const [file, setFile] = useState<File | null>(null);
  const [eliminarImagen, setEliminarImagen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `historia-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("nosotros")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("nosotros")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleGuardar = async () => {
    try {
      setLoading(true);

      let imageUrl = historia.imagen_url;
      
      if (eliminarImagen) {
        imageUrl = null;
      }
      
      if (file) {
        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return;
        }
      }

      const { error } = await supabase
        .from("nosotros_historia")
        .update({
          titulo,
          descripcion,
          imagen_url: imageUrl,
        })
        .eq("id", 1);

      if (error) throw error;

      alert("Historia actualizada correctamente");
      onGuardado();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Editar Nuestra Historia</h2>

        <div className="space-y-4">
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            {imagen && !eliminarImagen ? (
              <Image
                src={imagen}
                alt="Historia"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  setFile(selected);
                  setImagen(URL.createObjectURL(selected));
                  setEliminarImagen(false);
                }
              }}
              className="w-full text-sm"
              disabled={uploading}
            />
            
            {historia.imagen_url && !eliminarImagen && (
              <button
                type="button"
                onClick={() => {
                  setEliminarImagen(true);
                  setFile(null);
                  setImagen("");
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Eliminar imagen actual
              </button>
            )}
          </div>

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
            rows={6}
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={loading || uploading}
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={loading || uploading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Guardando..." : uploading ? "Subiendo..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}