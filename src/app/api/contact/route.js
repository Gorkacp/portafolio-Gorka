import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configuración de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request) {
  try {
    // Validar configuración del servidor
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({
        success: false,
        message: 'Servicio no configurado'
      }, { status: 503 });
    }

    // Parsear datos de la solicitud
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validaciones exhaustivas
    const validations = [];
    
    if (!name?.trim()) validations.push('Nombre requerido');
    if (!email?.trim()) validations.push('Email requerido');
    if (!message?.trim()) validations.push('Mensaje requerido');
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validations.push('Email no válido');
    }
    
    if (message?.trim().length < 10) {
      validations.push('Mínimo 10 caracteres');
    }

    if (validations.length > 0) {
      return NextResponse.json({
        success: false,
        message: validations.join('. '),
        validations
      }, { status: 400 });
    }

    // Configuración de correos
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    const fromName = process.env.SENDGRID_FROM_NAME || 'Portfolio';
    const toEmail = process.env.YOUR_PERSONAL_EMAIL;
    
    const currentDate = new Date().toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email para el administrador
    const adminEmail = {
      to: toEmail,
      from: { email: fromEmail, name: fromName },
      replyTo: email,
      subject: `📋 Nueva solicitud: ${subject || 'Consulta'} - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 24px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">📬</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: white;">Nueva Solicitud Recibida</h1>
          </div>
          
          <div style="padding: 32px 24px;">
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #6366f1;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #cbd5e1;">
                📋 Información del Contacto
              </h2>
              <div style="display: grid; gap: 16px;">
                <div>
                  <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Nombre</div>
                  <div style="font-size: 16px; font-weight: 500; color: #e2e8f0;">${name}</div>
                </div>
                <div>
                  <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Email</div>
                  <div style="font-size: 16px; color: #60a5fa;">
                    <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
                  </div>
                </div>
                <div>
                  <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Asunto</div>
                  <div style="font-size: 16px; color: #e2e8f0;">${subject || 'No especificado'}</div>
                </div>
              </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; border-left: 4px solid #8b5cf6;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #cbd5e1;">
                💬 Mensaje
              </h2>
              <div style="color: #e2e8f0; line-height: 1.7; font-size: 15px; white-space: pre-line; background: rgba(0, 0, 0, 0.2); padding: 16px; border-radius: 8px;">
                ${message}
              </div>
            </div>
            
            <div style="margin-top: 32px; padding: 24px; background: rgba(96, 165, 250, 0.1); border-radius: 12px; text-align: center; border: 1px solid rgba(96, 165, 250, 0.2);">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px;">
                📧 Responder a ${name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      `,
      text: `NUEVA SOLICITUD\n\nNombre: ${name}\nEmail: ${email}\nAsunto: ${subject || 'Sin asunto'}\n\nMensaje:\n${message}`
    };

    // Email de confirmación al usuario
    const userEmail = {
      to: email,
      from: { email: fromEmail, name: fromName },
      subject: '✅ Confirmación de recepción',
      html: `
        <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: white; color: #1f2937; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 24px; text-align: center;">
            <div style="font-size: 56px; margin-bottom: 20px;">✨</div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: white;">¡Mensaje Recibido!</h1>
            <p style="margin: 12px 0 0; color: rgba(255,255,255,0.95); font-size: 16px;">
              Gracias, ${name}
            </p>
          </div>
          
          <div style="padding: 40px 32px;">
            <p style="color: #4b5563; line-height: 1.7; font-size: 16px; margin-bottom: 28px;">
              Hemos recibido tu mensaje correctamente. Te responderemos en 24-48 horas.
            </p>
            
            <div style="background: #f9fafb; border-radius: 14px; padding: 28px; margin: 32px 0; border: 1px solid #e5e7eb;">
              <h2 style="color: #059669; font-size: 18px; font-weight: 700; margin: 0 0 20px 0;">
                📋 Resumen
              </h2>
              <div style="display: grid; gap: 16px;">
                <div>
                  <div style="font-size: 14px; color: #6b7280; margin-bottom: 6px;">Referencia</div>
                  <div style="font-size: 18px; font-weight: 600; color: #059669; font-family: monospace;">
                    #${Date.now().toString(36).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div style="font-size: 14px; color: #6b7280; margin-bottom: 6px;">Asunto</div>
                  <div style="font-size: 16px; font-weight: 500; color: #374151;">${subject || 'Consulta'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 28px; text-align: center; border-top: 1px solid #e5e7eb;">
            <div style="color: #059669; font-weight: 700; font-size: 16px; margin-bottom: 8px;">
              ${fromName}
            </div>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              Mensaje automático - No responder
            </p>
          </div>
        </div>
      `,
      text: `CONFIRMACIÓN\n\nHola ${name},\n\nHemos recibido tu mensaje. Te responderemos pronto.\n\nReferencia: #${Date.now().toString(36).toUpperCase()}\nAsunto: ${subject || 'Consulta'}\n\nSaludos,\n${fromName}`
    };

    // Enviar correos
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(userEmail)
    ]);

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      reference: `#${Date.now().toString(36).toUpperCase()}`
    }, { status: 200 });

  } catch (error) {
    const errorMessage = error.response?.body?.errors?.[0]?.message || error.message;
    
    return NextResponse.json({
      success: false,
      message: 'Error al procesar'
    }, { status: 500 });
  }
}

// Manejo de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}