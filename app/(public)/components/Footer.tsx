"use client";

import Link from "next/link";
import type { FC } from "react";

const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4">
          <div className="md:max-w-xs">
            <h3 className="text-white text-lg font-light tracking-wider mb-1">
              INFRAMEX
            </h3>
            <p className="text-gray-500 text-sm">
              Materiales para construcción
            </p>
          </div>

          <div>
            <h4 className="text-white text-base font-light mb-2">Enlaces</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-y-1">
              <li>
                <Link
                  href="/catalogo"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-light mb-2">Contacto</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  Av. Construcción 123, CDMX
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  +52 448 151 9373
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  ventas@inframex.com
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-start md:items-center gap-3">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-xs">
          <p>
            © {currentYear} INFRAMEX. Materiales para construcción de calidad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;