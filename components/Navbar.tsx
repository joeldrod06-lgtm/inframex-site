"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white text-lg font-light tracking-wider">
            INFRAMEX
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-200 hover:text-white transition">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm text-gray-200 hover:text-white transition">
              Catálogo
            </Link>
            <Link href="/nosotros" className="text-sm text-gray-200 hover:text-white transition">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-sm text-gray-200 hover:text-white transition">
              Contacto
            </Link>
            <a
              href="https://wa.me/524481519373"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5"
            >
              Cotizar
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-sm text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <Link href="/catalogo" className="block py-2 text-sm text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Catálogo
          </Link>
          <Link href="/nosotros" className="block py-2 text-sm text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Nosotros
          </Link>
          <Link href="/contacto" className="block py-2 text-sm text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
          <a
            href="https://wa.me/524481519373"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-sm text-gray-200 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Cotizar
          </a>
        </div>
      )}
    </nav>
  );
}