"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  producto: any;
  onClose: () => void;
}

export default function ProductoModal({ producto, onClose }: Props) {
  const [imgError, setImgError] = useState(false);

  if (!producto) return null;

  const hasImage = producto.imagen && !imgError;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-800">
            Detalle del producto
          </h3>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {/* Imagen (siempre ocupa espacio) */}
          <div className="relative h-52 bg-gray-100 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
            
            {hasImage ? (
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="text-gray-400 text-sm">
                Imagen no disponible
              </div>
            )}

          </div>

          {/* Info */}
          <h2 className="text-xl font-medium text-gray-900 mb-1">
            {producto.nombre}
          </h2>

          <p className="text-gray-700 mb-4">
            ${Number(producto.precio).toFixed(2)} MXN
          </p>

          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              {producto.descripcion ||
                "Este producto no cuenta con descripción adicional."}
            </p>
          </div>

          <a
            href={`https://wa.me/524481519373?text=Hola,%20me%20interesa%20${producto.nombre}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border border-gray-300 text-gray-800 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}