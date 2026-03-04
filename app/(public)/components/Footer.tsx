"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-white/10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-light tracking-wider mb-2">
              INFRAMEX
            </h3>
            <p className="text-sm text-gray-400">
              Materiales para construcción con calidad y servicio confiable.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium uppercase tracking-wider mb-3">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium uppercase tracking-wider mb-3">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+52 448 151 9373</li>
              <li>ventas@inframex.com</li>
              <li>México</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium uppercase tracking-wider mb-3">
              Atención
            </h4>
            <p className="text-sm text-gray-400">
              Cotizaciones y pedidos por WhatsApp en horario comercial.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-xs text-gray-500 text-center">
          © {currentYear} INFRAMEX. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
