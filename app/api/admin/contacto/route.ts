import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  const { data: info, error: infoError } = await adminSupabase!
    .from("configuracion_contacto")
    .select("id, telefono:telefono_principal, telefono_secundario, email_ventas, email_cotizaciones, direccion, colonia, ciudad, cp:codigo_postal, whatsapp, horario_semana, horario_sabado, horario_domingo, mapa_iframe")
    .eq("id", 1)
    .single();

  if (infoError) return NextResponse.json({ error: infoError.message }, { status: 500 });

  const { data: redes, error: redesError } = await adminSupabase!.from("redes_sociales").select("*").order("orden");
  if (redesError) return NextResponse.json({ error: redesError.message }, { status: 500 });

  const { data: mensajes, error: mensajesError } = await adminSupabase!
    .from("mensajes_contacto")
    .select("*")
    .neq("tipo", "cotizacion")
    .order("created_at", { ascending: false });

  if (mensajesError) return NextResponse.json({ error: mensajesError.message }, { status: 500 });

  return NextResponse.json({ info, redes: redes || [], mensajes: mensajes || [] });
}
