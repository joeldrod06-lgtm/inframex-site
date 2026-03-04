import { NextResponse } from "next/server";
import { adminSupabase, requireAdminApi } from "@/lib/admin-server";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (!auth.ok) return auth.response;

  const { data: historia, error: historiaError } = await adminSupabase!
    .from("valores_empresa")
    .select("id,titulo,descripcion")
    .eq("tipo", "historia")
    .order("orden")
    .limit(1)
    .maybeSingle();

  if (historiaError) return NextResponse.json({ error: historiaError.message }, { status: 500 });

  const { data: valores, error: valoresError } = await adminSupabase!.from("valores_empresa").select("*").eq("tipo", "valor").order("orden");
  if (valoresError) return NextResponse.json({ error: valoresError.message }, { status: 500 });

  const { data: equipo, error: equipoError } = await adminSupabase!.from("equipo").select("*").order("orden");
  if (equipoError) return NextResponse.json({ error: equipoError.message }, { status: 500 });

  const { data: metas, error: metasError } = await adminSupabase!.from("valores_empresa").select("*").eq("tipo", "meta").order("orden");
  if (metasError) return NextResponse.json({ error: metasError.message }, { status: 500 });

  return NextResponse.json({
    historia: historia ? { ...historia, imagen_url: null } : null,
    valores: valores || [],
    equipo: equipo || [],
    metas: metas || [],
  });
}
