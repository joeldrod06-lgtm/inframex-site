import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
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

    const { nombre, email, asunto, mensaje } = await request.json();

    // Validar datos
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    console.log("📧 Enviando email con Resend a:", "joeldrod06@gmail.com");

    const { data, error } = await resend.emails.send({
      from: "INFRAMEX <onboarding@resend.dev>",
      to: ["joeldrod06@gmail.com"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; border: 1px solid #e9ecef;">
            <h2 style="border-bottom: 2px solid #dee2e6; padding-bottom: 15px;">
              📬 Nuevo mensaje de contacto
            </h2>

            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>

            <div style="margin-top:20px; background:white; padding:15px; border-radius:5px; border:1px solid #dee2e6;">
              ${mensaje.replace(/\n/g, "<br>")}
            </div>

            <hr style="margin:25px 0;">
            <p style="font-size: 14px; color: #6c757d;">
              Puedes responder directamente a este correo.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Error sending email:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Email enviado:", data);

    return NextResponse.json(
      { message: "Email enviado correctamente" },
      { status: 200 }
    );

  } catch (err: any) {
    console.error("❌ Error en API contacto:", err);
    return NextResponse.json(
      { error: err.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}