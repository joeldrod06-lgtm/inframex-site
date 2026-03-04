import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const { error } = await supabase.from("mensajes_contacto").insert([
      {
        nombre,
        email,
        mensaje,
        asunto: "Solicitud de cotizacion",
        tipo: "cotizacion",
        leido: false,
        respondido: false,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "INFRAMEX <onboarding@resend.dev>",
        to: ["joeldrod06@gmail.com"],
        subject: "Nueva solicitud de cotizacion",
        html: `<h2>Nueva cotizacion</h2><p><strong>Nombre:</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p>${mensaje}</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
