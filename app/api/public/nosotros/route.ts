import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: historia, error: historiaError } = await supabase
    .from("valores_empresa")
    .select("id,titulo,descripcion")
    .eq("tipo", "historia")
    .order("orden")
    .limit(1)
    .maybeSingle();

  if (historiaError) return NextResponse.json({ error: historiaError.message }, { status: 500 });

  const { data: valores, error: valoresError } = await supabase
    .from("valores_empresa")
    .select("id,titulo,descripcion,icono")
    .eq("tipo", "valor")
    .order("orden");

  if (valoresError) return NextResponse.json({ error: valoresError.message }, { status: 500 });

  const { data: equipo, error: equipoError } = await supabase
    .from("equipo")
    .select("id,nombre,cargo,descripcion,imagen_url")
    .order("orden");

  if (equipoError) return NextResponse.json({ error: equipoError.message }, { status: 500 });

  const { data: metas, error: metasError } = await supabase
    .from("valores_empresa")
    .select("id,titulo,descripcion,icono")
    .eq("tipo", "meta")
    .order("orden");

  if (metasError) return NextResponse.json({ error: metasError.message }, { status: 500 });

  return NextResponse.json({ historia: historia ? { ...historia, imagen_url: null } : null, valores: valores || [], equipo: equipo || [], metas: metas || [] });
}
