import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { nombre, url, icono, activo } = await request.json();

    const { data: maxOrdenData } = await adminSupabase!
      .from("redes_sociales")
      .select("orden")
      .order("orden", { ascending: false })
      .limit(1);

    const nuevoOrden = maxOrdenData?.[0]?.orden ? maxOrdenData[0].orden + 1 : 1;

    const { error } = await adminSupabase!
      .from("redes_sociales")
      .insert([{ nombre, url, icono, activo, orden: nuevoOrden }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { id, nombre, url, icono, activo } = await request.json();

    const { error } = await adminSupabase!
      .from("redes_sociales")
      .update({ nombre, url, icono, activo, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await request.json();

    const { error } = await adminSupabase!.from("redes_sociales").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
