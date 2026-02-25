export default function CotizacionForm() {
  return (
    <div className="bg-gray-50 rounded-3xl p-8 md:p-12 -mt-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Solicite una cotización
        </h2>

        <p className="text-gray-500 mb-8">
          Cuéntenos su proyecto y reciba una propuesta personalizada en breve.
        </p>

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

          <textarea
            rows={4}
            placeholder="Mensaje o detalles de su proyecto"
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            type="submit"
            className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            Enviar solicitud
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6">
          o contáctanos directamente por{" "}
          <a
            href="https://wa.me/5210000000000"
            className="text-gray-600 underline"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}