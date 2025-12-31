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
    const fromName = process.env.SENDGRID_FROM_NAME || 'Gorka Carmona - Portfolio';
    const toEmail = process.env.YOUR_PERSONAL_EMAIL;
    
    const currentDate = new Date().toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Generar referencia única
    const reference = `GC-${Date.now().toString(36).toUpperCase()}`;

    // ==============================
    // EMAIL PARA TI (ADMIN) - ESTILO PORTFOLIO
    // ==============================
    const adminEmail = {
      to: toEmail,
      from: { email: fromEmail, name: fromName },
      replyTo: email,
      subject: `✨ Nueva Propuesta: ${subject || 'Colaboración'} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Propuesta - Portfolio</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #0f172a 0%, #000000 100%);
              color: #ffffff;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #111827 0%, #1e293b 100%);
              border-radius: 20px;
              overflow: hidden;
              border: 1px solid #334155;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
              padding: 40px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
              opacity: 0.1;
            }
            
            .header-icon {
              font-size: 64px;
              margin-bottom: 20px;
              display: inline-block;
              animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 700;
              background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
            }
            
            .header-subtitle {
              margin-top: 10px;
              font-size: 16px;
              opacity: 0.9;
              color: #e0e7ff;
            }
            
            .content {
              padding: 40px 30px;
            }
            
            .info-card {
              background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
              border-radius: 16px;
              padding: 30px;
              margin-bottom: 30px;
              border: 1px solid #374151;
              position: relative;
              overflow: hidden;
            }
            
            .info-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(to bottom, #6366f1, #8b5cf6, #ec4899);
            }
            
            .card-title {
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 25px;
              color: #e2e8f0;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .card-title i {
              font-size: 24px;
            }
            
            .info-grid {
              display: grid;
              gap: 20px;
            }
            
            .info-item {
              display: grid;
              gap: 6px;
            }
            
            .info-label {
              font-size: 13px;
              color: #94a3b8;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .info-value {
              font-size: 16px;
              color: #f1f5f9;
              font-weight: 500;
            }
            
            .info-value a {
              color: #60a5fa;
              text-decoration: none;
              transition: color 0.2s;
            }
            
            .info-value a:hover {
              color: #3b82f6;
            }
            
            .message-card {
              background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
              border-radius: 16px;
              padding: 30px;
              border: 1px solid #374151;
              position: relative;
              overflow: hidden;
            }
            
            .message-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(to bottom, #8b5cf6, #ec4899);
            }
            
            .message-content {
              color: #e2e8f0;
              line-height: 1.8;
              font-size: 15px;
              white-space: pre-line;
              background: rgba(0, 0, 0, 0.2);
              padding: 20px;
              border-radius: 12px;
              border: 1px solid #1e293b;
              font-family: 'Poppins', monospace;
            }
            
            .action-section {
              margin-top: 40px;
              text-align: center;
            }
            
            .reply-btn {
              display: inline-block;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 16px 40px;
              text-decoration: none;
              border-radius: 12px;
              font-weight: 600;
              font-size: 16px;
              transition: all 0.3s ease;
              border: none;
              cursor: pointer;
              box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
              position: relative;
              overflow: hidden;
            }
            
            .reply-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 25px rgba(99, 102, 241, 0.4);
            }
            
            .reply-btn::after {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: 0.5s;
            }
            
            .reply-btn:hover::after {
              left: 100%;
            }
            
            .time-info {
              margin-top: 20px;
              font-size: 14px;
              color: #94a3b8;
            }
            
            .footer {
              background: rgba(15, 23, 42, 0.9);
              padding: 30px;
              text-align: center;
              border-top: 1px solid #1e293b;
            }
            
            .footer-logo {
              font-size: 24px;
              font-weight: 700;
              background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            
            .footer-text {
              font-size: 13px;
              color: #64748b;
              line-height: 1.6;
            }
            
            .reference-badge {
              display: inline-block;
              background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 1px;
              margin-top: 10px;
            }
            
            @media (max-width: 600px) {
              .header { padding: 30px 20px; }
              .content { padding: 30px 20px; }
              .info-card, .message-card { padding: 25px 20px; }
              .header h1 { font-size: 26px; }
              .header-icon { font-size: 56px; }
              .reply-btn { padding: 14px 32px; font-size: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header -->
            <div class="header">
              <div class="header-icon">✨</div>
              <h1>Nueva Propuesta Recibida</h1>
              <div class="header-subtitle">Portfolio Gorka Carmona</div>
            </div>
            
            <!-- Content -->
            <div class="content">
              <!-- Contact Info -->
              <div class="info-card">
                <div class="card-title">
                  <i>👤</i> Información del Contacto
                </div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Nombre Completo</div>
                    <div class="info-value">${name}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Correo Electrónico</div>
                    <div class="info-value">
                      <a href="mailto:${email}">${email}</a>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Tipo de Proyecto</div>
                    <div class="info-value">${subject || 'Propuesta de colaboración'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Fecha de Recepción</div>
                    <div class="info-value">${currentDate}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Referencia</div>
                    <div class="reference-badge">${reference}</div>
                  </div>
                </div>
              </div>
              
              <!-- Message -->
              <div class="message-card">
                <div class="card-title">
                  <i>💭</i> Detalles del Proyecto
                </div>
                <div class="message-content">${message}</div>
              </div>
              
              <!-- Action -->
              <div class="action-section">
                <a href="mailto:${email}" class="reply-btn">
                  📧 Responder a ${name.split(' ')[0]}
                </a>
                <div class="time-info">
                  ⏱️ Tiempo de respuesta recomendado: 24 horas
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-logo">GORKA CARMONA</div>
              <div class="footer-text">
                Desarrollador Full Stack & Consultor Tecnológico<br>
                <span style="color: #94a3b8; font-size: 12px;">
                  Sistema automatizado de contacto • ${new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `✨ NUEVA PROPUESTA - PORTFOLIO GORKA CARMONA ✨

Nombre: ${name}
Email: ${email}
Asunto: ${subject || 'Propuesta de colaboración'}
Referencia: ${reference}
Fecha: ${currentDate}

MENSAJE:
${message}

──────────────────────────────
¡Responde dentro de 24 horas!
──────────────────────────────`
    };

    // ==============================
    // EMAIL DE CONFIRMACIÓN AL USUARIO - ESTILO PORTFOLIO
    // ==============================
    const userEmail = {
      to: email,
      from: { email: fromEmail, name: fromName },
      subject: '✅ Confirmación - Tu propuesta ha sido recibida',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación - Portfolio Gorka Carmona</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
              color: #1e293b;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              border: 1px solid #e2e8f0;
              box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
            }
            
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
              padding: 50px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
              opacity: 0.1;
            }
            
            .header-icon {
              font-size: 72px;
              margin-bottom: 25px;
              display: inline-block;
              animation: success 2s ease-in-out;
            }
            
            @keyframes success {
              0% { transform: scale(0); opacity: 0; }
              70% { transform: scale(1.2); }
              100% { transform: scale(1); opacity: 1; }
            }
            
            .header h1 {
              margin: 0;
              font-size: 36px;
              font-weight: 800;
              color: white;
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .header-subtitle {
              margin-top: 15px;
              font-size: 18px;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 400;
            }
            
            .content {
              padding: 50px 40px;
            }
            
            .greeting {
              font-size: 20px;
              color: #4b5563;
              line-height: 1.6;
              margin-bottom: 30px;
              text-align: center;
            }
            
            .greeting strong {
              color: #6366f1;
              font-weight: 600;
            }
            
            .summary-card {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 20px;
              padding: 40px;
              margin: 40px 0;
              border: 1px solid #e2e8f0;
              position: relative;
              overflow: hidden;
            }
            
            .summary-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(to bottom, #10b981, #059669);
            }
            
            .summary-title {
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 30px;
              color: #1e293b;
              display: flex;
              align-items: center;
              gap: 15px;
            }
            
            .summary-title i {
              font-size: 28px;
            }
            
            .summary-grid {
              display: grid;
              gap: 25px;
            }
            
            .summary-item {
              display: grid;
              gap: 8px;
            }
            
            .summary-label {
              font-size: 14px;
              color: #64748b;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .summary-value {
              font-size: 18px;
              color: #1e293b;
              font-weight: 600;
            }
            
            .reference-code {
              font-family: 'Courier New', monospace;
              background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
              color: white;
              padding: 12px 24px;
              border-radius: 12px;
              display: inline-block;
              font-size: 20px;
              letter-spacing: 2px;
              box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);
            }
            
            .process-timeline {
              margin: 40px 0;
              padding: 30px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 16px;
              border-left: 4px solid #8b5cf6;
            }
            
            .process-title {
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 20px;
              color: #1e293b;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .process-steps {
              display: grid;
              gap: 15px;
            }
            
            .process-step {
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 12px 0;
            }
            
            .step-number {
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 14px;
              flex-shrink: 0;
            }
            
            .step-text {
              color: #4b5563;
              font-size: 15px;
            }
            
            .action-section {
              text-align: center;
              margin-top: 50px;
            }
            
            .contact-btn {
              display: inline-block;
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 18px 45px;
              text-decoration: none;
              border-radius: 14px;
              font-weight: 700;
              font-size: 17px;
              transition: all 0.3s ease;
              border: none;
              cursor: pointer;
              box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
              position: relative;
              overflow: hidden;
            }
            
            .contact-btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
            }
            
            .contact-info {
              margin-top: 20px;
              font-size: 14px;
              color: #64748b;
            }
            
            .footer {
              background: #f8fafc;
              padding: 40px 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            
            .footer-logo {
              font-size: 28px;
              font-weight: 800;
              background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 15px;
              letter-spacing: 1px;
            }
            
            .footer-tagline {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 10px;
              font-weight: 500;
            }
            
            .footer-note {
              font-size: 13px;
              color: #94a3b8;
              line-height: 1.6;
              margin-top: 20px;
            }
            
            .social-icons {
              margin-top: 25px;
              display: flex;
              justify-content: center;
              gap: 20px;
            }
            
            .social-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              text-decoration: none;
              font-size: 18px;
              transition: all 0.3s ease;
            }
            
            .social-icon:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
            }
            
            @media (max-width: 600px) {
              .header { padding: 40px 20px; }
              .content { padding: 40px 20px; }
              .summary-card { padding: 30px 20px; }
              .header h1 { font-size: 28px; }
              .header-icon { font-size: 60px; }
              .contact-btn { padding: 16px 35px; font-size: 16px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header -->
            <div class="header">
              <div class="header-icon">✅</div>
              <h1>¡Propuesta Recibida!</h1>
              <div class="header-subtitle">Gracias por tu interés, ${name}</div>
            </div>
            
            <!-- Content -->
            <div class="content">
              <!-- Greeting -->
              <div class="greeting">
                Hemos recibido <strong>exitosamente</strong> tu propuesta de colaboración. 
                Nuestro equipo la revisará en detalle y te contactará en breve.
              </div>
              
              <!-- Summary -->
              <div class="summary-card">
                <div class="summary-title">
                  <i>📋</i> Resumen de tu Solicitud
                </div>
                <div class="summary-grid">
                  <div class="summary-item">
                    <div class="summary-label">Número de Referencia</div>
                    <div class="reference-code">${reference}</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-label">Tipo de Proyecto</div>
                    <div class="summary-value">${subject || 'Propuesta de colaboración'}</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-label">Fecha de Envío</div>
                    <div class="summary-value">${currentDate}</div>
                  </div>
                </div>
              </div>
              
              <!-- Process Timeline -->
              <div class="process-timeline">
                <div class="process-title">
                  <i>⏱️</i> Proceso de Revisión
                </div>
                <div class="process-steps">
                  <div class="process-step">
                    <div class="step-number">1</div>
                    <div class="step-text">Análisis inicial de viabilidad (24 horas)</div>
                  </div>
                  <div class="process-step">
                    <div class="step-number">2</div>
                    <div class="step-text">Evaluación técnica del proyecto (48 horas)</div>
                  </div>
                  <div class="process-step">
                    <div class="step-number">3</div>
                    <div class="step-text">Propuesta formal de colaboración</div>
                  </div>
                  <div class="process-step">
                    <div class="step-number">4</div>
                    <div class="step-text">Coordinación de reunión inicial</div>
                  </div>
                </div>
              </div>
              
              <!-- Action -->
              <div class="action-section">
                <a href="mailto:${fromEmail}" class="contact-btn">
                  ✨ Contacto Directo
                </a>
                <div class="contact-info">
                  Puedes responder a este correo para agregar información adicional
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-logo">GORKA CARMONA</div>
              <div class="footer-tagline">Desarrollador Full Stack & Consultor Tecnológico</div>
              
              <div class="social-icons">
                <a href="https://www.linkedin.com/in/gorka-carmona-pino-803902294/" class="social-icon" target="_blank">
                  💼
                </a>
                <a href="https://github.com/tuusuario" class="social-icon" target="_blank">
                  ⚡
                </a>
              </div>
              
              <div class="footer-note">
                Este es un mensaje automático de confirmación.<br>
                Por favor, no respondas directamente a este correo.<br>
                Si tienes preguntas urgentes, utiliza el enlace de contacto directo proporcionado arriba.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `✅ CONFIRMACIÓN DE RECEPCIÓN - PORTFOLIO GORKA CARMONA ✅

Hola ${name},

¡Excelente! Hemos recibido exitosamente tu propuesta de colaboración.

📋 RESUMEN:
• Referencia: ${reference}
• Proyecto: ${subject || 'Propuesta de colaboración'}
• Fecha: ${currentDate}

⏱️ PROCESO DE REVISIÓN:
1. Análisis inicial de viabilidad (24 horas)
2. Evaluación técnica del proyecto (48 horas)
3. Propuesta formal de colaboración
4. Coordinación de reunión inicial

Para agregar información adicional, puedes responder a este correo.

──────────────────────────────
SALUDOS PROFESIONALES,

GORKA CARMONA
Desarrollador Full Stack & Consultor Tecnológico
──────────────────────────────
📧 ${fromEmail}
💼 https://linkedin.com/in/gorka-carmona-pino-803902294
──────────────────────────────`
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
      reference: reference
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