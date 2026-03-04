import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function PUT(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const {
      telefono,
      telefono_secundario,
      email_ventas,
      email_cotizaciones,
      direccion,
      colonia,
      ciudad,
      cp,
      whatsapp,
      horario_semana,
      horario_sabado,
      horario_domingo,
      mapa_iframe,
    } = await request.json();

    const { error } = await adminSupabase!
      .from("configuracion_contacto")
      .update({
        telefono_principal: telefono,
        telefono_secundario: telefono_secundario || null,
        email_ventas,
        email_cotizaciones,
        direccion,
        colonia,
        ciudad,
        codigo_postal: cp,
        whatsapp,
        horario_semana,
        horario_sabado,
        horario_domingo,
        mapa_iframe: mapa_iframe || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
