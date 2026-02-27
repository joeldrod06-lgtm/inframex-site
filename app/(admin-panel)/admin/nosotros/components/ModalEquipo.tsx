"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface MiembroEquipo {
  id: number;
  nombre: string;
  cargo: string;
  descripcion: string | null;
  imagen_url: string | null;
  orden: number;
}

interface Props {
  miembro?: MiembroEquipo;
  onClose: () => void;
  onGuardado: () => void;
}

export default function ModalEquipo({ miembro, onClose, onGuardado }: Props) {
  const isEditing = !!miembro;
  const [nombre, setNombre] = useState(miembro?.nombre || "");
  const [cargo, setCargo] = useState(miembro?.cargo || "");
  const [descripcion, setDescripcion] = useState(miembro?.descripcion || "");
  const [imagen, setImagen] = useState(miembro?.imagen_url || "");
  const [file, setFile] = useState<File | null>(null);
  const [eliminarImagen, setEliminarImagen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `equipo-${Date.now()}.${fileExt}`;

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

      if (!nombre.trim() || !cargo.trim()) {
        alert("Nombre y cargo son requeridos");
        return;
      }

      let imageUrl = miembro?.imagen_url;
      
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

      if (isEditing) {
        const { error } = await supabase
          .from("nosotros_equipo")
          .update({ nombre, cargo, descripcion, imagen_url: imageUrl })
          .eq("id", miembro.id);

        if (error) throw error;
        alert("Miembro actualizado correctamente");
      } else {
        const { data: maxOrdenData } = await supabase
          .from("nosotros_equipo")
          .select("orden")
          .order("orden", { ascending: false })
          .limit(1);

        const nuevoOrden = maxOrdenData && maxOrdenData.length > 0 ? maxOrdenData[0].orden + 1 : 1;

        const { error } = await supabase
          .from("nosotros_equipo")
          .insert([{ nombre, cargo, descripcion, imagen_url: imageUrl, orden: nuevoOrden }]);

        if (error) throw error;
        alert("Miembro creado correctamente");
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
    
    if (!confirm("¿Estás seguro de eliminar este miembro del equipo?")) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("nosotros_equipo")
        .delete()
        .eq("id", miembro.id);

      if (error) throw error;
      
      alert("Miembro eliminado correctamente");
      onGuardado();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar" : "Crear"} Miembro del Equipo
        </h2>

        <div className="space-y-4">
          <div className="relative h-40 w-40 mx-auto bg-gray-100 rounded-full overflow-hidden">
            {imagen && !eliminarImagen ? (
              <Image
                src={imagen}
                alt={nombre}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin foto
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
            
            {miembro?.imagen_url && !eliminarImagen && (
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Cargo"
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          />

          <div className="flex justify-end gap-3 pt-4">
            {isEditing && (
              <button
                onClick={handleEliminar}
                disabled={loading || uploading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Eliminar
              </button>
            )}
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
              {loading ? "Guardando..." : uploading ? "Subiendo..." : isEditing ? "Guardar" : "Crear"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}