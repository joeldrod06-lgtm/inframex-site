"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Importar modales
import ModalHistoria from "./components/ModalHistoria";
import ModalValor from "./components/ModalValor";
import ModalEquipo from "./components/ModalEquipo";
import ModalMeta from "./components/ModalMeta";

// Tipos
interface Historia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
}

interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
}

interface MiembroEquipo {
  id: number;
  nombre: string;
  cargo: string;
  descripcion: string | null;
  imagen_url: string | null;
  orden: number;
}

interface Meta {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
}

export default function AdminNosotrosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [valores, setValores] = useState<Valor[]>([]);
  const [equipo, setEquipo] = useState<MiembroEquipo[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);
  
  // Estados para modales
  const [modalHistoria, setModalHistoria] = useState(false);
  const [modalValor, setModalValor] = useState<Valor | null>(null);
  const [modalNuevoValor, setModalNuevoValor] = useState(false);
  const [modalEquipo, setModalEquipo] = useState<MiembroEquipo | null>(null);
  const [modalNuevoEquipo, setModalNuevoEquipo] = useState(false);
  const [modalMeta, setModalMeta] = useState<Meta | null>(null);
  const [modalNuevaMeta, setModalNuevaMeta] = useState(false);

  // Verificar sesión y cargar datos
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          router.replace("/admin/login");
          return;
        }
        
        cargarDatos();
      } catch (err) {
        console.error("Error verificando sesión:", err);
        router.replace("/admin/login");
      }
    };
    
    checkSession();
  }, [router]);

  const cargarDatos = async () => {
    try {
      setLoading(true);

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

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Administrar Página Nosotros</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edita el contenido que se muestra en la página "Nosotros"
        </p>
      </div>

      {/* Sección: Nuestra Historia */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">📖 Nuestra Historia</h2>
          <button
            onClick={() => setModalHistoria(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
          >
            Editar
          </button>
        </div>
        
        {historia && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Título:</p>
              <p className="font-medium mb-4">{historia.titulo}</p>
              
              <p className="text-sm text-gray-500 mb-1">Descripción:</p>
              <p className="text-gray-700 line-clamp-4">{historia.descripcion}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Imagen:</p>
              <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                {historia.imagen_url ? (
                  <Image
                    src={historia.imagen_url}
                    alt="Historia"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sección: Valores */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">💫 Lo que nos mueve (Valores)</h2>
          <button
            onClick={() => setModalNuevoValor(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            + Nuevo Valor
          </button>
        </div>
        
        <div className="grid gap-4">
          {valores.map((valor) => (
            <div key={valor.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {valor.icono === "cercania" && "👥"}
                    {valor.icono === "compromiso" && "✓"}
                    {valor.icono === "actitud" && "⚡"}
                  </span>
                  <h3 className="font-medium">{valor.titulo}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{valor.descripcion}</p>
              </div>
              <button
                onClick={() => setModalValor(valor)}
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm ml-4"
              >
                Editar
              </button>
            </div>
          ))}
          
          {valores.length === 0 && (
            <p className="text-gray-500 text-center py-4">No hay valores creados</p>
          )}
        </div>
      </section>

      {/* Sección: Equipo */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">👥 El Equipo</h2>
          <button
            onClick={() => setModalNuevoEquipo(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            + Nuevo Miembro
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {equipo.map((miembro) => (
            <div key={miembro.id} className="flex gap-4 border rounded-lg p-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                {miembro.imagen_url ? (
                  <Image
                    src={miembro.imagen_url}
                    alt={miembro.nombre}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Sin foto
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{miembro.nombre}</h3>
                <p className="text-sm text-gray-500">{miembro.cargo}</p>
                {miembro.descripcion && (
                  <p className="text-sm text-gray-600 mt-2">{miembro.descripcion}</p>
                )}
              </div>
              
              <button
                onClick={() => setModalEquipo(miembro)}
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm self-start"
              >
                Editar
              </button>
            </div>
          ))}
          
          {equipo.length === 0 && (
            <p className="text-gray-500 text-center py-4 col-span-2">No hay miembros del equipo</p>
          )}
        </div>
      </section>

      {/* Sección: Metas */}
      <section className="mb-10 bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">🎯 Metas que nos inspiran</h2>
          <button
            onClick={() => setModalNuevaMeta(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            + Nueva Meta
          </button>
        </div>
        
        <div className="grid gap-4">
          {metas.map((meta) => (
            <div key={meta.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {meta.icono === "catalogo" && "📦"}
                    {meta.icono === "confianza" && "🤝"}
                    {meta.icono === "logistica" && "🚚"}
                  </span>
                  <h3 className="font-medium">{meta.titulo}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{meta.descripcion}</p>
              </div>
              <button
                onClick={() => setModalMeta(meta)}
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm ml-4"
              >
                Editar
              </button>
            </div>
          ))}
          
          {metas.length === 0 && (
            <p className="text-gray-500 text-center py-4">No hay metas creadas</p>
          )}
        </div>
      </section>

      {/* Modales */}
      {modalHistoria && historia && (
        <ModalHistoria
          historia={historia}
          onClose={() => setModalHistoria(false)}
          onGuardado={cargarDatos}
        />
      )}

      {modalValor && (
        <ModalValor
          valor={modalValor}
          onClose={() => setModalValor(null)}
          onGuardado={cargarDatos}
        />
      )}

      {modalNuevoValor && (
        <ModalValor
          onClose={() => setModalNuevoValor(false)}
          onGuardado={cargarDatos}
        />
      )}

      {modalEquipo && (
        <ModalEquipo
          miembro={modalEquipo}
          onClose={() => setModalEquipo(null)}
          onGuardado={cargarDatos}
        />
      )}

      {modalNuevoEquipo && (
        <ModalEquipo
          onClose={() => setModalNuevoEquipo(false)}
          onGuardado={cargarDatos}
        />
      )}

      {modalMeta && (
        <ModalMeta
          meta={modalMeta}
          onClose={() => setModalMeta(null)}
          onGuardado={cargarDatos}
        />
      )}

      {modalNuevaMeta && (
        <ModalMeta
          onClose={() => setModalNuevaMeta(false)}
          onGuardado={cargarDatos}
        />
      )}
    </div>
  );
}