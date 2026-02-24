import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4">
          <div className="md:max-w-xs">
            <h3 className="text-white text-lg font-light tracking-wider mb-1">
              INFRAMEX
            </h3>
            <p className="text-gray-500 text-xs">
              Materiales para construcción
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium mb-2">Enlaces</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-y-1">
              <li>
                <Link href="/catalogo" className="hover:text-white transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto compacto */}
          <div>
            <h4 className="text-white text-sm font-medium mb-2">Contacto</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="text-gray-500 text-base">📍</span>
                <span className="text-xs">Av. Construcción 123</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-gray-500 text-base">📞</span>
                <span className="text-xs">+52 1 000 000 0000</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-gray-500 text-base">✉️</span>
                <span className="text-xs">ventas@inframex.com</span>
              </li>
            </ul>
          </div>

          {/* Redes sociales muy simples */}
          <div className="flex items-start md:items-center gap-3">
            <a href="#" className="text-gray-500 hover:text-white transition">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427-.254.66-.598 1.216-1.153 1.772-.5.509-1.105.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465-.66-.254-1.216-.598-1.772-1.153-.509-.5-.902-1.105-1.153-1.772-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.636-.247 1.363-.416 2.427-.465C9.556 2.013 9.87 2 12.315 2zm0 1.802c-2.41 0-2.695.01-3.652.053-.889.04-1.37.19-1.692.315-.421.163-.722.36-1.037.675-.315.315-.512.616-.675 1.037-.124.322-.274.803-.315 1.692-.043.957-.053 1.242-.053 3.652s.01 2.695.053 3.652c.04.889.19 1.37.315 1.692.163.421.36.722.675 1.037.315.315.616.512 1.037.675.322.124.803.274 1.692.315.957.043 1.242.053 3.652.053s2.695-.01 3.652-.053c.889-.04 1.37-.19 1.692-.315.421-.163.722-.36 1.037-.675.315-.315.512-.616.675-1.037.124-.322.274-.803.315-1.692.043-.957.053-1.242.053-3.652s-.01-2.695-.053-3.652c-.04-.889-.19-1.37-.315-1.692-.163-.421-.36-.722-.675-1.037-.315-.315-.616-.512-1.037-.675-.322-.124-.803-.274-1.692-.315-.957-.043-1.242-.053-3.652-.053z" />
                <path d="M12.315 7c2.93 0 5.305 2.375 5.305 5.305 0 2.93-2.375 5.305-5.305 5.305S7 15.235 7 12.305 9.385 7 12.315 7zm0 1.802a3.503 3.503 0 1 0 0 7.006 3.503 3.503 0 0 0 0-7.006zM19.325 6.9a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Línea inferior con copyright */}
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-xs">
          <p>© {currentYear} INFRAMEX. Materiales para construcción de calidad</p>
        </div>
      </div>
    </footer>
  );
}