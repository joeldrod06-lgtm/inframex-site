"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const adminCheck = await requireAdminSession();

    if (!adminCheck.ok) {
      await supabase.auth.signOut();
      setLoading(false);

      if (adminCheck.reason === "profile_missing") {
        alert("Tu usuario no tiene perfil en la tabla perfiles. Crea el registro y asigna rol='admin'.");
      } else {
        alert("Tu usuario no tiene permisos de administrador (rol='admin').");
      }
      return;
    }

    if (data.session) {
      localStorage.setItem("refresh_token", data.session.refresh_token);
      localStorage.setItem("access_token", data.session.access_token);
    }

    setLoading(false);
    router.push("/admin/cotizaciones");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-light text-center">Admin INFRAMEX</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Contrasena"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}