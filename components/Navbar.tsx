"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold tracking-wider">
            INFRAMEX
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-300 transition">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-gray-300 transition">
              Catálogo
            </Link>
            <Link href="/nosotros" className="hover:text-gray-300 transition">
              Nosotros
            </Link>
            <Link href="/contacto" className="hover:text-gray-300 transition">
              Contacto
            </Link>
            <a
              href="https://wa.me/5210000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-white rounded-md text-sm hover:bg-white hover:text-gray-900 transition"
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
          <Link href="/" className="block py-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <Link href="/catalogo" className="block py-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Catálogo
          </Link>
          <Link href="/nosotros" className="block py-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Nosotros
          </Link>
          <Link href="/contacto" className="block py-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
          <a
            href="https://wa.me/5210000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Cotizar
          </a>
        </div>
      )}
    </nav>
  );
}