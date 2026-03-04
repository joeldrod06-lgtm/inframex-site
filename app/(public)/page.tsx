import Link from "next/link";
import Image from "next/image";
import CotizacionForm from "@/app/(public)/components/CotizacionForm";

export default function Home() {
  return (
    <>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1]">
              Materiales para <span className="font-normal text-gray-700">construcción</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Distribuimos calidad y confianza para tus proyectos. Precios competitivos y entrega confiable en una sola llamada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/catalogo" className="inline-flex justify-center items-center px-6 py-3 rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Catálogo
              </Link>
              <a href="https://wa.me/524481519373" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative h-80 lg:h-[500px] w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image src="/materialp.png" alt="Materiales de construcción INFRAMEX" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Ventajas competitivas</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">Por qué INFRAMEX</h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
          <p className="text-gray-500 mt-6 text-lg">Construimos relaciones de confianza a través de la calidad y el servicio.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <h3 className="text-xl font-medium text-gray-900 mb-3">Precios competitivos</h3>
            <p className="text-gray-500 leading-relaxed">Materiales de calidad al mejor precio.</p>
          </div>
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <h3 className="text-xl font-medium text-gray-900 mb-3">Entrega rápida</h3>
            <p className="text-gray-500 leading-relaxed">Logística confiable para entregar en tiempo.</p>
          </div>
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <h3 className="text-xl font-medium text-gray-900 mb-3">Atención directa</h3>
            <p className="text-gray-500 leading-relaxed">Cotiza y recibe asesoría personalizada sin intermediarios.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <CotizacionForm />
      </section>
    </>
  );
}