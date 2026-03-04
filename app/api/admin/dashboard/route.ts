import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  const { count: totalCotizaciones } = await adminSupabase!.from("mensajes_contacto").select("*", { count: "exact", head: true }).eq("tipo", "cotizacion");
  const { count: totalProductos } = await adminSupabase!.from("productos").select("*", { count: "exact", head: true });
  const { count: totalMensajes } = await adminSupabase!.from("mensajes_contacto").select("*", { count: "exact", head: true }).neq("tipo", "cotizacion");
  const { count: mensajesNoLeidos } = await adminSupabase!.from("mensajes_contacto").select("*", { count: "exact", head: true }).neq("tipo", "cotizacion").eq("leido", false);
  const { count: totalRedesSociales } = await adminSupabase!.from("redes_sociales").select("*", { count: "exact", head: true });
  const { data: ultimosMensajes } = await adminSupabase!.from("mensajes_contacto").select("id,nombre,email,asunto,mensaje,leido,respondido,created_at").neq("tipo", "cotizacion").order("created_at", { ascending: false }).limit(5);

  return NextResponse.json({
    totalCotizaciones: totalCotizaciones || 0,
    totalProductos: totalProductos || 0,
    totalMensajes: totalMensajes || 0,
    mensajesNoLeidos: mensajesNoLeidos || 0,
    totalRedesSociales: totalRedesSociales || 0,
    ultimosMensajes: ultimosMensajes || [],
  });
}
