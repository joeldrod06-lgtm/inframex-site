import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Validar API key en runtime
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY no está configurada" },
        { status: 500 }
      );
    }

    // ✅ Crear instancia aquí (NO arriba)
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // 1️⃣ Guardar en Supabase
    const { error } = await supabase.from("cotizaciones").insert([
      {
        nombre,
        email,
        mensaje,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // 2️⃣ Enviar email
    const { error: emailError } = await resend.emails.send({
      from: "INFRAMEX <onboarding@resend.dev>",
      to: ["joeldrod06@gmail.com"],
      subject: "Nueva solicitud de cotización",
      html: `
        <h2>Nueva cotización</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    if (emailError) {
      return NextResponse.json(
        { error: emailError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Error en API cotizaciones:", err);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}