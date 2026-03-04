import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  const { data, error } = await adminSupabase!
    .from("mensajes_contacto")
    .select("id,nombre,email,mensaje,created_at")
    .eq("tipo", "cotizacion")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cotizaciones: data || [] });
}
