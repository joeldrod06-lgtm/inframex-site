"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

// Tipos
interface Historia {
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
}

interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

interface MiembroEquipo {
  id: number;
  nombre: string;
  cargo: string;
  descripcion: string | null;
  imagen_url: string | null;
}

interface Meta {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export default function NosotrosPage() {
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [valores, setValores] = useState<Valor[]>([]);
  const [equipo, setEquipo] = useState<MiembroEquipo[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar historia
      const { data: historiaData } = await supabase
        .from("nosotros_historia")
        .select("*")
        .eq("id", 1)
        .single();
      
      if (historiaData) setHistoria(historiaData);

      // Cargar valores
      const { data: valoresData } = await supabase
        .from("nosotros_valores")
        .select("*")
        .order("orden");
      
      if (valoresData) setValores(valoresData);

      // Cargar equipo
      const { data: equipoData } = await supabase
        .from("nosotros_equipo")
        .select("*")
        .order("orden");
      
      if (equipoData) setEquipo(equipoData);

      // Cargar metas
      const { data: metasData } = await supabase
        .from("nosotros_metas")
        .select("*")
        .order("orden");
      
      if (metasData) setMetas(metasData);

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para renderizar icono según el nombre
  const renderIcono = (icono: string, className: string = "w-7 h-7 text-gray-700") => {
    switch(icono) {
      case "cercania":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "compromiso":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        );
      case "actitud":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        );
      case "catalogo":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 4.5c0 2.278-3.694 4.125-8.25 4.125S3.75 13.153 3.75 10.875m16.5 4.5c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        );
      case "confianza":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "logistica":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.759 15.759 0 00-2.045-1.86 15.933 15.933 0 00-2.045-1.86c-.395-.417-.615-.962-.615-1.53v-.958m0 11.177v.958m0 0v.958c0 .568.22 1.113.615 1.53.621.68 1.357 1.297 2.045 1.86m-2.66-3.39c-.395.417-.615.962-.615 1.53v.958m6.75-4.5v.958c0 .568-.22 1.113-.615 1.53-.621.68-1.357 1.297-2.045 1.86" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Prevenir hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Título principal */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Conoce nuestra historia, valores y el equipo que hace posible cada entrega
          </p>
        </div>
      </section>

      {/* Historia Section */}
      {historia && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {historia.titulo}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {historia.descripcion}
                </p>
              </div>
              {historia.imagen_url && (
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={historia.imagen_url}
                    alt="Nuestra historia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Valores Section */}
      {valores.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {valores.map((valor) => (
                <div
                  key={valor.id}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    {renderIcono(valor.icono, "w-8 h-8 text-blue-600")}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {valor.titulo}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {valor.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Equipo Section */}
      {equipo.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Profesionales comprometidos con tu satisfacción
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipo.map((miembro) => (
                <div
                  key={miembro.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {miembro.imagen_url ? (
                    <div className="relative h-64 w-full">
                      <Image
                        src={miembro.imagen_url}
                        alt={miembro.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {miembro.nombre}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {miembro.cargo}
                    </p>
                    {miembro.descripcion && (
                      <p className="text-gray-600">{miembro.descripcion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Metas Section */}
      {metas.length > 0 && (
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Nuestras Metas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metas.map((meta) => (
                <div
                  key={meta.id}
                  className="text-center text-white"
                >
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 mx-auto backdrop-blur-sm">
                    {renderIcono(meta.icono, "w-10 h-10 text-white")}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{meta.titulo}</h3>
                  <p className="text-white/90">{meta.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}