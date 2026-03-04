import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { nombre, cargo, descripcion, imagen_url } = await request.json();

    const { data: maxOrdenData } = await adminSupabase!
      .from("equipo")
      .select("orden")
      .order("orden", { ascending: false })
      .limit(1);

    const nuevoOrden = maxOrdenData?.[0]?.orden ? maxOrdenData[0].orden + 1 : 1;

    const { error } = await adminSupabase!.from("equipo").insert([
      {
        nombre,
        cargo,
        descripcion: descripcion || null,
        imagen_url: imagen_url || null,
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
    const { id, nombre, cargo, descripcion, imagen_url } = await request.json();

    const { error } = await adminSupabase!
      .from("equipo")
      .update({ nombre, cargo, descripcion: descripcion || null, imagen_url: imagen_url || null, updated_at: new Date().toISOString() })
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
    const { error } = await adminSupabase!.from("equipo").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
