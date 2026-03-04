"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Historia {
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
}

interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
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
}

export default function NosotrosPage() {
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [valores, setValores] = useState<Valor[]>([]);
  const [equipo, setEquipo] = useState<MiembroEquipo[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("/api/public/nosotros");
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || "Error");
        setHistoria(result.historia || null);
        setValores(result.valores || []);
        setEquipo(result.equipo || []);
        setMetas(result.metas || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Cargando...
      </div>
    );

  return (
    <main>
      <section className="bg-white relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative text-center max-w-3xl">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Nuestra empresa
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900 mt-2 mb-4">
            Nosotros
          </h1>
          <p className="text-lg text-gray-500">
            Conoce nuestra historia, valores y equipo.
          </p>
        </div>
      </section>

      {historia && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {historia.titulo}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {historia.descripcion}
            </p>
          </div>
          {historia.imagen_url ? (
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={historia.imagen_url}
                alt="Historia de INFRAMEX"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="h-80 md:h-96 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
              Imagen próximamente
            </div>
          )}
        </section>
      )}

      {valores.length > 0 && (
        <section className="bg-gray-50 py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-8">
              Nuestros valores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {valores.map((valor) => (
                <div
                  key={valor.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {valor.titulo}
                  </h3>
                  <p className="text-gray-600">{valor.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {equipo.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-8">
            Nuestro equipo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipo.map((miembro) => (
              <article
                key={miembro.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
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
                  <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
                    Sin imagen
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900">
                    {miembro.nombre}
                  </h3>
                  <p className="text-gray-600 mt-1 mb-2">
                    {miembro.cargo}
                  </p>
                  {miembro.descripcion && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {miembro.descripcion}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {metas.length > 0 && (
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-8">
              Nuestras metas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metas.map((meta) => (
                <div
                  key={meta.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {meta.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {meta.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}