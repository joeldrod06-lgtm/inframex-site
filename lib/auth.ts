import { supabase } from "@/lib/supabase";

export type AdminSessionCheck =
  | { ok: true; userId: string }
  | { ok: false; reason: "no_session" | "profile_missing" | "not_admin" };

export async function requireAdminSession(): Promise<AdminSessionCheck> {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session?.user?.id) {
    return { ok: false, reason: "no_session" };
  }

  const userId = data.session.user.id;
  const appRole = data.session.user.app_metadata?.role;

  const { data: profile, error: profileError } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", userId)
    .maybeSingle();

  if (!profileError && profile?.rol === "admin") {
    return { ok: true, userId };
  }

  if (appRole === "admin") {
    return { ok: true, userId };
  }

  if (!profileError && !profile) {
    return { ok: false, reason: "profile_missing" };
  }

  return { ok: false, reason: "not_admin" };
}