import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, interestedIn, phone, message } = await req.json();

    // Transport SMTP (usa tus credenciales reales)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true para 465
      auth: {
        user: process.env.SMTP_USER!, // remitente autenticado
        pass: process.env.SMTP_PASS!,
      },
    });

    const subject = `Contacto Web: ${name} — ${interestedIn || "Sin categoría"}`;

    const text = `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "No proporcionado"}
Interesado en: ${interestedIn || "No especificado"}

Mensaje:
${message}
`.trim();

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Ubuntu,Cantarell,Noto Sans,'Helvetica Neue',Arial,'Apple Color Emoji','Segoe UI Emoji';line-height:1.6;color:#111;">
        <h2>Nuevo mensaje desde el sitio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Interesado en:</strong> ${interestedIn || "No especificado"}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f7f8;padding:12px;border-radius:8px;border:1px solid #e5e7eb">${message}</pre>
      </div>
    `;

    const to = process.env.CONTACT_TO || "pocsaproyectos@gmail.com";

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        replyTo: email,
        subject,
        text,
        html,
    });


    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("CONTACT API ERROR", err);
    return new Response(JSON.stringify({ ok: false, error: "SEND_FAILED" }), { status: 500 });
  }
}
