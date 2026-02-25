import Image from "next/image";
import Link from "next/link";
import { productos } from "@/data/productos";

export default function CatalogoPage() {
  return (
    <>
      {/* Hero con fondo de puntos */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-3">
              Catálogo de <span className="font-normal text-gray-700">materiales</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Encuentra todo lo que necesitas para tu construcción, con la mejor calidad y precios competitivos.
            </p>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {producto.imagen ? (
                  <>
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-gray-600 rounded-md shadow-sm">
                  #{producto.id}
                </span>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {producto.nombre}
                </h2>
                
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-2xl font-light text-gray-900">
                    ${producto.precio.toFixed(2)}
                  </p>
                  <span className="text-sm text-gray-500">MXN</span>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/catalogo/${producto.id}`}
                    className="flex-1 text-center text-sm px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 font-medium"
                  >
                    Detalles
                  </Link>
                  <a
                    href={`https://wa.me/524481519373?text=Hola,%20me%20interesa%20cotizar:%20${producto.nombre}%20(Código:%20${producto.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm px-3 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {productos.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500 text-lg">No hay productos disponibles por el momento.</p>
          </div>
        )}
      </section>
    </>
  );
}