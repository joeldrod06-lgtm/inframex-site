"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProductoModal from "./components/ProductoModal";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string | null;
  imagen: string | null;
}

export default function CatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoActivo, setProductoActivo] = useState<Producto | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      const res = await fetch("/api/public/catalogo");
      const result = await res.json();
      if (res.ok) setProductos(result.productos || []);
    }
    fetchProductos();
  }, []);

  return (
    <>
      <section className="bg-white relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative text-center max-w-3xl">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-3">
            Nuestros productos
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900 mb-4">
            Catálogo de materiales
          </h1>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-500">
            Explora nuestra variedad de materiales para construcción.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {productos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No hay productos disponibles por el momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {producto.imagen ? (
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {producto.nombre}
                  </h3>
                  {producto.descripcion && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {producto.descripcion}
                    </p>
                  )}
                  <span className="text-xl font-light text-gray-900">
                    ${Number(producto.precio).toFixed(2)} MXN
                  </span>
                  <button
                    onClick={() => setProductoActivo(producto)}
                    className="w-full mt-4 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ProductoModal
        producto={productoActivo}
        onClose={() => setProductoActivo(null)}
      />
    </>
  );
}