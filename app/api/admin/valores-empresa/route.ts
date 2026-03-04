import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { titulo, descripcion, icono, tipo } = await request.json();

    const { data: maxOrdenData } = await adminSupabase!
      .from("valores_empresa")
      .select("orden")
      .eq("tipo", tipo)
      .order("orden", { ascending: false })
      .limit(1);

    const nuevoOrden = maxOrdenData?.[0]?.orden ? maxOrdenData[0].orden + 1 : 1;

    const { error } = await adminSupabase!.from("valores_empresa").insert([
      {
        titulo,
        descripcion,
        icono,
        tipo,
        orden: nuevoOrden,
        activo: true,
      },
    ]);

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
    const { id, titulo, descripcion, icono } = await request.json();

    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (titulo !== undefined) payload.titulo = titulo;
    if (descripcion !== undefined) payload.descripcion = descripcion;
    if (icono !== undefined) payload.icono = icono;

    const { error } = await adminSupabase!.from("valores_empresa").update(payload).eq("id", id);

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
    const { error } = await adminSupabase!.from("valores_empresa").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
