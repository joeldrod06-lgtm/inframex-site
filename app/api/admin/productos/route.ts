import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `producto-${Date.now()}`;

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { nombre, precio, descripcion, imagen } = await request.json();

    if (!nombre || typeof precio !== "number") {
      return NextResponse.json({ error: "nombre y precio son requeridos" }, { status: 400 });
    }

    const slug = `${slugify(nombre)}-${Date.now()}`;

    const { data, error } = await adminSupabase!
      .from("productos")
      .insert([
        {
          nombre,
          slug,
          precio,
          descripcion_corta: descripcion || null,
          imagen_principal: imagen || null,
          activo: true,
        },
      ])
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  try {
    const { id, nombre, precio, descripcion, imagen } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "id requerido" }, { status: 400 });
    }

    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (typeof nombre === "string" && nombre.trim()) {
      payload.nombre = nombre.trim();
      payload.slug = `${slugify(nombre)}-${id}`;
    }
    if (typeof precio === "number") payload.precio = precio;
    if (descripcion !== undefined) payload.descripcion_corta = descripcion || null;
    if (imagen !== undefined) payload.imagen_principal = imagen || null;

    const { error } = await adminSupabase!.from("productos").update(payload).eq("id", id);
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

    if (!id) {
      return NextResponse.json({ error: "id requerido" }, { status: 400 });
    }

    const { error } = await adminSupabase!.from("productos").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
