"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  leido: boolean;
  respondido: boolean;
  created_at: string;
}

interface Props {
  mensaje: Mensaje;
  onClose: () => void;
  onActualizado: () => void;
}

export default function ModalVerMensaje({ mensaje, onClose, onActualizado }: Props) {
  const [loading, setLoading] = useState(false);
  const [marcandoLeido, setMarcandoLeido] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Marcar como leído solo UNA VEZ cuando se abre el modal
  useEffect(() => {
    let isMounted = true;

    const marcarLeido = async () => {
      // Evitar si ya está leído o si ya se está marcando
      if (mensaje.leido || marcandoLeido) return;

      try {
        setMarcandoLeido(true);
        
        const { error } = await supabase
          .from("contacto_mensajes")
          .update({ leido: true })
          .eq("id", mensaje.id);

        if (error) throw error;
        
        // Solo actualizar si el componente sigue montado
        if (isMounted) {
          onActualizado();
        }
      } catch (error) {
        console.error("Error marcando como leído:", error);
      } finally {
        if (isMounted) {
          setMarcandoLeido(false);
        }
      }
    };

    marcarLeido();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [mensaje.id]); // Solo depende del ID, no de mensaje.leido

  const marcarComoRespondido = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("contacto_mensajes")
        .update({ respondido: !mensaje.respondido })
        .eq("id", mensaje.id);

      if (error) throw error;
      onActualizado();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarMensaje = async () => {
    if (!confirm("¿Estás seguro de eliminar este mensaje? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("contacto_mensajes")
        .delete()
        .eq("id", mensaje.id);

      if (error) throw error;
      
      alert("Mensaje eliminado correctamente");
      onActualizado();
      onClose();
    } catch (error) {
      console.error("Error eliminando mensaje:", error);
      alert("Error al eliminar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Cerrar al hacer click fuera del modal
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClickOutside}
    >
      <div 
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Mensaje de {mensaje.nombre}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium">{mensaje.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{mensaje.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Asunto</p>
            <p className="font-medium">{mensaje.asunto}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mensaje</p>
            <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
              {mensaje.mensaje}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Recibido</p>
              <p>{new Date(mensaje.created_at).toLocaleString('es-MX')}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                mensaje.leido ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {mensaje.leido ? 'Leído' : 'No leído'}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                mensaje.respondido ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {mensaje.respondido ? 'Respondido' : 'No respondido'}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={eliminarMensaje}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
            </button>

            <button
              onClick={marcarComoRespondido}
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {mensaje.respondido ? 'Marcar como no respondido' : 'Marcar como respondido'}
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}