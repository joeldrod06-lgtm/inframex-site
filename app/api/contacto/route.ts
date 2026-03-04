import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { nombre, email, asunto, mensaje } = await request.json();

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const { error: dbError } = await supabase.from("mensajes_contacto").insert([
      {
        nombre,
        email,
        asunto,
        mensaje,
        tipo: "contacto",
        leido: false,
        respondido: false,
      },
    ]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ message: "Guardado sin notificacion por correo" }, { status: 200 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "INFRAMEX <onboarding@resend.dev>",
      to: ["joeldrod06@gmail.com"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p><strong>Asunto:</strong> ${asunto}</p><p>${mensaje.replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      return NextResponse.json({ message: "Guardado, pero fallo el email", emailError: error.message }, { status: 200 });
    }

    return NextResponse.json({ message: "Mensaje enviado correctamente" }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error interno del servidor" }, { status: 500 });
  }
}
