import Link from "next/link";

export default function ContactoPage() {
  return (
    <>
      {/* Hero con fondo de puntos */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-3">
              Contacto
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos.
            </p>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* Contacto - dos columnas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
              Preferimos el trato directo
            </h2>
            <div className="w-20 h-0.5 bg-gray-300 mb-6"></div>
            <p className="text-gray-500 leading-relaxed mb-8">
              Por eso, puedes contactarnos por cualquiera de estos medios y te responderemos a la mayor brevedad.
            </p>

            <div className="space-y-6">
              {/* Teléfono */}
              <div className="group flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Teléfono</h3>
                  <p className="text-gray-900">+52 448 151 9373</p>
                  <p className="text-sm text-gray-500">Lun a Vie de 9:00 a 18:00</p>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Email</h3>
                  <p className="text-gray-900">ventas@inframex.com</p>
                  <p className="text-gray-900">cotizaciones@inframex.com</p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="group flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Ubicación</h3>
                  <p className="text-gray-900">Av. Construcción 123, Col. Centro</p>
                  <p className="text-gray-900">Ciudad de México, CP 12345</p>
                </div>
              </div>
            </div>

            {/* Botón WhatsApp directo */}
            <div className="mt-10">
              <a
                href="https://wa.me/524481519373"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.087.276.072.378-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
                </svg>
                Envíanos un WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Escríbenos
              </span>
              <h2 className="text-3xl font-light text-gray-900 mt-2 mb-4">
                Envíanos un mensaje
              </h2>
              <div className="w-20 h-0.5 bg-gray-300 mb-6"></div>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                />
                <textarea
                  rows={5}
                  placeholder="Mensaje"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
                ></textarea>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (placeholder con efecto de imagen) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="relative h-80 w-full group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02] bg-gray-200 flex items-center justify-center text-gray-500">
            <span>Mapa de ubicación (Google Maps)</span>
          </div>
        </div>
      </section>

      {/* Horario de atención */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Visítanos
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
              Horario de atención
            </h2>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-500 mb-2">Lunes a viernes: 9:00 am - 6:00 pm</p>
            <p className="text-gray-500">Sábados: 9:00 am - 2:00 pm</p>
            <p className="text-gray-400 text-sm mt-4">Domingos cerrado</p>
          </div>
        </div>
      </section>
    </>
  );
}