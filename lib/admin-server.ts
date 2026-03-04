import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasEnv = Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey);

const authClient = hasEnv
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export const adminSupabase = hasEnv
  ? createClient(supabaseUrl as string, supabaseServiceRoleKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

function getBearerToken(request: Request) {
  const header = request.headers.get("authorization") || request.headers.get("Authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (!scheme || !token || scheme.toLowerCase() !== "bearer") return null;
  return token;
}

export async function requireAdminApi(request: Request) {
  if (!hasEnv || !authClient || !adminSupabase) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: "Falta configurar SUPABASE_SERVICE_ROLE_KEY en el servidor" },
        { status: 500 }
      ),
    };
  }

  const token = getBearerToken(request);
  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "No autorizado" }, { status: 401 }),
    };
  }

  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user?.id) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Sesion invalida" }, { status: 401 }),
    };
  }

  const { data: perfil, error: perfilError } = await adminSupabase
    .from("perfiles")
    .select("rol")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (perfilError || perfil?.rol !== "admin") {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Sin permisos de administrador" }, { status: 403 }),
    };
  }

  return { ok: true as const, userId: userData.user.id };
}
