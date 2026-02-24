// app/contacto/page.tsx
import Link from "next/link";

export default function ContactoPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero - exactamente como el catálogo */}
      <div className="text-center pt-12 mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">Contacto</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos.
        </p>
      </div>

      {/* Contacto - dos columnas */}
      <section className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">Hablemos</h2>
            <p className="text-gray-500 mb-8">
              Preferimos el trato directo y cercano. Por eso, puedes contactarnos por cualquiera de estos medios y te responderemos a la mayor brevedad.
            </p>

            <div className="space-y-6">
              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Teléfono</h3>
                  <p className="text-gray-900">+52 1 000 000 0000</p>
                  <p className="text-sm text-gray-500">Lun a Vie de 9:00 a 18:00</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
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
                href="https://wa.me/5210000000000?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition"
              >
                Envíanos un WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Envíanos un mensaje</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <textarea
                  rows={5}
                  placeholder="Mensaje"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-medium"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (placeholder) */}
      <section className="pb-16 md:pb-20">
        <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
          <span>Mapa de ubicación (Google Maps)</span>
        </div>
      </section>

      {/* Horario de atención - integrado como sección opcional */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Horario de atención</h2>
          <p className="text-gray-500 mb-2">Lunes a viernes: 9:00 am - 6:00 pm</p>
          <p className="text-gray-500">Sábados: 9:00 am - 2:00 pm</p>
          <p className="text-gray-400 text-sm mt-4">Domingos cerrado</p>
        </div>
      </section>
    </section>
  );
}