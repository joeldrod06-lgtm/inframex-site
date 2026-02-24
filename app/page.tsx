import Link from "next/link";
import Image from "next/image";
import CotizacionForm from "@/components/CotizacionForm";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Materiales para construcción
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              Distribuimos calidad y confianza para tus proyectos. Precios competitivos y entrega confiable en una sola llamada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition"
              >
                Ver Catálogo
              </Link>
              <a
                href="https://wa.me/5210000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="relative h-80 lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <Image
              src="/materialp.png"
              alt="Materiales de construcción INFRAMEX"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-light text-center text-gray-900 mb-4">
          ¿Por qué INFRAMEX?
        </h2>
        <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
          Construimos relaciones de confianza a través de la calidad y el servicio.
        </p>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Precios competitivos */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Precios competitivos</h3>
            <p className="text-gray-500">Materiales de calidad al mejor precio, gracias a alianzas estratégicas.</p>
          </div>
          {/* Entrega rápida */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.759 15.759 0 00-2.045-1.86 15.933 15.933 0 00-2.045-1.86c-.395-.417-.615-.962-.615-1.53v-.958m0 11.177v.958m0 0v.958c0 .568.22 1.113.615 1.53.621.68 1.357 1.297 2.045 1.86m-2.66-3.39c-.395.417-.615.962-.615 1.53v.958m6.75-4.5v.958c0 .568-.22 1.113-.615 1.53-.621.68-1.357 1.297-2.045 1.86" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Entrega rápida</h3>
            <p className="text-gray-500">Logística propia que garantiza envíos locales en tiempo récord.</p>
          </div>
          {/* Atención directa */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Atención directa</h3>
            <p className="text-gray-500">Cotiza y recibe asesoría personalizada por WhatsApp o teléfono.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <CotizacionForm />
      </section>
    </>
  );
}