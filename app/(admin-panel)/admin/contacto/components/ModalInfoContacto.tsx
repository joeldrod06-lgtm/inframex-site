"use client";

import { adminFetch } from "@/lib/admin-api-client";

import { useState } from "react";

interface ContactoInfo {
  id: number;
  telefono: string;
  telefono_secundario: string | null;
  email_ventas: string;
  email_cotizaciones: string;
  direccion: string;
  colonia: string;
  ciudad: string;
  cp: string;
  whatsapp: string;
  horario_semana: string;
  horario_sabado: string;
  horario_domingo: string;
  mapa_iframe: string | null;
}

interface Props {
  info: ContactoInfo;
  onClose: () => void;
  onGuardado: () => void;
}

export default function ModalInfoContacto({ info, onClose, onGuardado }: Props) {
  const [telefono, setTelefono] = useState(info.telefono);
  const [telefonoSecundario, setTelefonoSecundario] = useState(info.telefono_secundario || "");
  const [emailVentas, setEmailVentas] = useState(info.email_ventas);
  const [emailCotizaciones, setEmailCotizaciones] = useState(info.email_cotizaciones);
  const [direccion, setDireccion] = useState(info.direccion);
  const [colonia, setColonia] = useState(info.colonia);
  const [ciudad, setCiudad] = useState(info.ciudad);
  const [cp, setCp] = useState(info.cp);
  const [whatsapp, setWhatsapp] = useState(info.whatsapp);
  const [horarioSemana, setHorarioSemana] = useState(info.horario_semana);
  const [horarioSabado, setHorarioSabado] = useState(info.horario_sabado);
  const [horarioDomingo, setHorarioDomingo] = useState(info.horario_domingo);
  const [mapaIframe, setMapaIframe] = useState(info.mapa_iframe || "");
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    try {
      setLoading(true);

      const response = await adminFetch("/api/admin/contacto/configuracion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono,
          telefono_secundario: telefonoSecundario || null,
          email_ventas: emailVentas,
          email_cotizaciones: emailCotizaciones,
          direccion,
          colonia,
          ciudad,
          cp,
          whatsapp,
          horario_semana: horarioSemana,
          horario_sabado: horarioSabado,
          horario_domingo: horarioDomingo,
          mapa_iframe: mapaIframe || null,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Error al guardar");

      alert("Informacion actualizada correctamente");
      onGuardado();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl my-8">
        <h2 className="text-xl font-semibold mb-4">Editar Informacion de Contacto</h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Telefono principal" />
            <input type="text" value={telefonoSecundario} onChange={(e) => setTelefonoSecundario(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Telefono secundario" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input type="email" value={emailVentas} onChange={(e) => setEmailVentas(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Email ventas" />
            <input type="email" value={emailCotizaciones} onChange={(e) => setEmailCotizaciones(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Email cotizaciones" />
          </div>

          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="WhatsApp" />
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Direccion" />

          <div className="grid md:grid-cols-3 gap-4">
            <input type="text" value={colonia} onChange={(e) => setColonia(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Colonia" />
            <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Ciudad" />
            <input type="text" value={cp} onChange={(e) => setCp(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Codigo postal" />
          </div>

          <input type="text" value={horarioSemana} onChange={(e) => setHorarioSemana(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Horario semana" />
          <input type="text" value={horarioSabado} onChange={(e) => setHorarioSabado(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Horario sabado" />
          <input type="text" value={horarioDomingo} onChange={(e) => setHorarioDomingo(e.target.value)} className="w-full border rounded-lg px-3 py-2" disabled={loading} placeholder="Horario domingo" />

          <textarea value={mapaIframe} onChange={(e) => setMapaIframe(e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 font-mono text-sm" disabled={loading} placeholder="Iframe de Google Maps" />
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50" disabled={loading}>Cancelar</button>
          <button onClick={handleGuardar} disabled={loading} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">{loading ? "Guardando..." : "Guardar cambios"}</button>
        </div>
      </div>
    </div>
  );
}



