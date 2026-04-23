const HTMLRecoveryEmail = (code) =>{
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Desbloqueo de Corazón</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #FFF0F3; font-family: 'DM Sans', Arial, sans-serif; padding: 40px 16px; }
    .email-card {
      background: #ffffff;
      border: 1px solid #FFCCD5;
      border-radius: 16px;
      max-width: 540px;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(255, 143, 163, 0.15);
    }
    .email-header {
      background: #C9184A;
      padding: 40px 32px 32px;
      text-align: center;
    }
    .email-header::after {
      content: '';
      display: block;
      height: 2px;
      background: linear-gradient(90deg, transparent, #FF8FA3 30%, #FFB3C1 50%, #FF8FA3 70%, transparent);
      margin-top: 24px;
    }
    .lock-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #FFF0F3;
      border: 2px solid #FF8FA3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .header-title {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 26px;
      font-weight: 400;
      color: #FFF0F3;
      letter-spacing: 0.02em;
    }
    .header-sub {
      font-size: 12px;
      color: #FFB3C1;
      margin-top: 6px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .email-body { padding: 32px 40px; }
    .greeting {
      font-size: 16px;
      color: #590D22;
      line-height: 1.7;
      margin-bottom: 24px;
      text-align: center;
    }
    .code-section {
      background: #FFF0F3;
      border-radius: 12px;
      border: 2px dashed #FFB3C1;
      padding: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .code-label {
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #A4133C;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .code-value {
      font-family: 'Courier New', Courier, monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #C9184A;
    }
    .timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FFCCD5;
      color: #800F2F;
      font-size: 13px;
      font-weight: 500;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 24px;
    }
    .warning-box {
      border-left: 3px solid #FF4D6D;
      background: #FFF0F3;
      border-radius: 0 8px 8px 0;
      padding: 16px;
      margin-bottom: 24px;
    }
    .warning-box p {
      font-size: 14px;
      color: #800F2F;
      line-height: 1.6;
    }
    .divider {
      height: 1px;
      background: #FFCCD5;
      margin-bottom: 20px;
    }
    .footer-text {
      font-size: 13px;
      color: #A4133C;
      text-align: center;
      line-height: 1.7;
    }
    .footer-text a {
      color: #C9184A;
      text-decoration: none;
      font-weight: 600;
    }
    .email-footer {
      background: #590D22;
      padding: 16px 32px;
      text-align: center;
    }
    .footer-note {
      font-size: 12px;
      color: #FFB3C1;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="email-card">
    <div class="email-header">
      <div class="lock-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#FF4D6D" stroke="#FF4D6D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h1 class="header-title">Desbloqueo de Corazón</h1>
      <p class="header-sub">Seguridad Nivel Amor</p>
    </div>

    <div class="email-body">
      <p class="greeting">
        <strong>¡Hola, preciosa!</strong><br><br>
        Hemos detectado un intento de inicio de sesión en mi corazón. 
        Por favor, usa este código de acceso exclusivo para reclamar tus abrazos y continuar.
      </p>

      <div class="code-section">
        <p class="code-label">Tu código de verificación</p>
        <p class="code-value">${code}</p>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <span class="timer-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          &nbsp;Válido por toda la eternidad
        </span>
      </div>

      <div class="warning-box">
        <p><strong>Nota:</strong> Si no solicitaste este correo... bueno, de todas formas te amo. Pero definitivamente deberías usar el código para ver qué pasa. 😉</p>
      </div>

      <div class="divider"></div>

      <p class="footer-text">
        ¿Necesitas más besos? Contacta a tu soporte técnico personal en<br>
        <a href="#">WhatsApp</a>
      </p>
    </div>

    <div class="email-footer">
      <p class="footer-note">© 2026 El Mejor Novio del Mundo &nbsp;·&nbsp; Todos los derechos reservados</p>
    </div>
  </div>
</body>
</html>`;
};

export default HTMLRecoveryEmail;