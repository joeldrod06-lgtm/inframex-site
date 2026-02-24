// app/catalogo/page.tsx
import Image from "next/image";
import Link from "next/link";
import { productos } from "@/data/productos";

export default function CatalogoPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">Catálogo de materiales</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Encuentra todo lo que necesitas para tu construcción, con la mejor calidad y precios competitivos.
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Contenedor de imagen con aspecto cuadrado */}
            <div className="relative aspect-square bg-gray-100">
              {producto.imagen ? (
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-sm">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-1">{producto.nombre}</h2>
              <p className="text-2xl font-light text-gray-900 mb-3">
                ${producto.precio.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">MXN</span>
              </p>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <Link
                  href={`/catalogo/${producto.id}`}
                  className="flex-1 text-center text-sm px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Detalles
                </Link>
                <a
                  href={`https://wa.me/5210000000000?text=Hola, me interesa cotizar: ${producto.nombre} (Código: ${producto.id})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                >
                  Cotizar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {productos.length === 0 && (
        <p className="text-center text-gray-500 py-12">No hay productos disponibles por el momento.</p>
      )}
    </section>
  );
}