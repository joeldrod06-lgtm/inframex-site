import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    // 1. Guardar en Supabase
    const { error } = await supabase.from("cotizaciones").insert([
      {
        nombre,
        email,
        mensaje,
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // 2. Enviar email
    await resend.emails.send({
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

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Error del servidor" }, { status: 500 });
  }
}