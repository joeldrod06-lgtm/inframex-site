"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CrearProductoModal from "./components/CrearProductoModal";
import EditarProductoModal from "./components/EditarProductoModal";
import EliminarProductoModal from "./components/EliminarProductoModal";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string | null;
  imagen?: string | null;
}

export default function AdminCatalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [productoEliminar, setProductoEliminar] = useState<Producto | null>(null);
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          router.replace("/admin/login");
          return;
        }
        
        fetchProductos();
      } catch (err) {
        console.error("Error verificando sesión:", err);
        router.replace("/admin/login");
      }
    };
    
    checkSession();
  }, [router]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error al traer productos:", error);
        setError("Error al cargar los productos: " + error.message);
        return;
      }

      setProductos(data || []);
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleCrearClick = () => {
    setShowCrearModal(true);
  };

  const handleEditarClick = (producto: Producto) => {
    setProductoEditar(producto);
    setShowEditarModal(true);
  };

  const handleEliminarClick = (producto: Producto) => {
    setProductoEliminar(producto);
    setShowEliminarModal(true);
  };

  const handleCloseModals = () => {
    setShowCrearModal(false);
    setShowEditarModal(false);
    setShowEliminarModal(false);
    setProductoEditar(null);
    setProductoEliminar(null);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchProductos}
            className="mt-2 text-sm text-red-600 underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Catálogo de Productos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: {productos.length} productos
          </p>
        </div>
        
        <button
          onClick={handleCrearClick}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo producto
        </button>
      </div>

      {productos.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
          <p className="text-gray-500 mb-4">Comienza agregando tu primer producto al catálogo</p>
          <button
            onClick={handleCrearClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Crear primer producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 bg-gray-100">
                {producto.imagen ? (
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                  {producto.nombre}
                </h3>
                
                {producto.descripcion && (
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {producto.descripcion}
                  </p>
                )}
                
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  ${Number(producto.precio).toFixed(2)} MXN
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditarClick(producto)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarClick(producto)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCrearModal && (
        <CrearProductoModal
          onClose={handleCloseModals}
          onProductoCreado={fetchProductos}
        />
      )}

      {showEditarModal && productoEditar && (
        <EditarProductoModal
          producto={productoEditar}
          onClose={handleCloseModals}
          onProductoEditado={fetchProductos}
        />
      )}

      {showEliminarModal && productoEliminar && (
        <EliminarProductoModal
          producto={productoEliminar}
          onClose={handleCloseModals}
          onProductoEliminado={fetchProductos}
        />
      )}
    </div>
  );
}