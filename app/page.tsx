import Link from "next/link";
import Image from "next/image";
import CotizacionForm from "@/components/CotizacionForm";

export default function Home() {
  return (
    <>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1]">
                Materiales para <span className="font-normal text-gray-700">construcción</span>
              </h1>
            </div>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Distribuimos calidad y confianza para tus proyectos. Precios competitivos y entrega confiable en una sola llamada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/catalogo"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Ver Catálogo
              </Link>
              <a
                href="https://wa.me/524481519373"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.087.276.072.378-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          
          <div className="relative h-80 lg:h-[500px] w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
              <Image
                src="/materialp.png"
                alt="Materiales de construcción INFRAMEX"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Ventajas competitivas</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
            ¿Por qué <span className="font-normal">INFRAMEX</span>?
          </h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
          <p className="text-gray-500 mt-6 text-lg">
            Construimos relaciones de confianza a través de la calidad y el servicio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Precios competitivos</h3>
            <p className="text-gray-500 leading-relaxed">Materiales de calidad al mejor precio, gracias a alianzas estratégicas con los mejores proveedores.</p>
          </div>

          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.759 15.759 0 00-2.045-1.86 15.933 15.933 0 00-2.045-1.86c-.395-.417-.615-.962-.615-1.53v-.958m0 11.177v.958m0 0v.958c0 .568.22 1.113.615 1.53.621.68 1.357 1.297 2.045 1.86m-2.66-3.39c-.395.417-.615.962-.615 1.53v.958m6.75-4.5v.958c0 .568-.22 1.113-.615 1.53-.621.68-1.357 1.297-2.045 1.86" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Entrega rápida</h3>
            <p className="text-gray-500 leading-relaxed">Logística propia que garantiza envíos locales en tiempo récord, con seguimiento en tiempo real.</p>
          </div>

          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Atención directa</h3>
            <p className="text-gray-500 leading-relaxed">Cotiza y recibe asesoría personalizada por WhatsApp o teléfono, sin intermediarios ni demoras.</p>
          </div>
        </div>
      </section>

     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <CotizacionForm />
      </section>
    </>
  );
}