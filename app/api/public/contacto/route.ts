import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: info, error: infoError } = await supabase
    .from("configuracion_contacto")
    .select("telefono:telefono_principal, telefono_secundario, email_ventas, email_cotizaciones, direccion, colonia, ciudad, cp:codigo_postal, whatsapp, horario_semana, horario_sabado, horario_domingo, mapa_iframe")
    .eq("id", 1)
    .single();

  if (infoError) return NextResponse.json({ error: infoError.message }, { status: 500 });

  const { data: redes, error: redesError } = await supabase
    .from("redes_sociales")
    .select("id,nombre,url,icono,activo")
    .eq("activo", true)
    .order("orden");

  if (redesError) return NextResponse.json({ error: redesError.message }, { status: 500 });

  return NextResponse.json({ info, redes: redes || [] });
}
