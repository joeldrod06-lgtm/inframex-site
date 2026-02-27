import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, email, asunto, mensaje } = await request.json();

    // Validar datos
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    console.log("📧 Enviando email con Resend a:", "joeldrod06@gmail.com");

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: "INFRAMEX <onboarding@resend.dev>",
      to: ["joeldrod06@gmail.com"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; border: 1px solid #e9ecef;">
            <h2 style="color: #1a1a1a; margin-top: 0; border-bottom: 2px solid #dee2e6; padding-bottom: 15px;">
              📬 Nuevo mensaje de contacto
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; width: 100px; color: #6c757d; font-weight: bold;">Nombre:</td>
                <td style="padding: 10px 0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6c757d; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6c757d; font-weight: bold;">Asunto:</td>
                <td style="padding: 10px 0;">${asunto}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px;">
              <h3 style="color: #1a1a1a; margin-bottom: 10px;">Mensaje:</h3>
              <div style="background-color: white; border-radius: 5px; padding: 20px; border: 1px solid #dee2e6;">
                <p style="margin: 0; white-space: pre-wrap;">${mensaje.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0 20px;">
            
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              Este mensaje fue enviado desde el formulario de contacto de la página web.
              <br>
              Puedes responder directamente a este email para contactar al remitente.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Error sending email with Resend:", error);
      return NextResponse.json(
        { error: "Error al enviar el email: " + error.message },
        { status: 500 }
      );
    }

    console.log("✅ Email enviado correctamente:", data);
    return NextResponse.json(
      { message: "Email enviado correctamente", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error in API route:", error);
    return NextResponse.json(
      { error: "Error interno del servidor: " + (error.message || "Error desconocido") },
      { status: 500 }
    );
  }
}