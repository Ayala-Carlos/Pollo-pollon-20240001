const HTMLRecoveryEmail = (code) =>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Recovery</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #f0ece4; font-family: 'DM Sans', Arial, sans-serif; padding: 40px 16px; }
    .email-card {
      background: #ffffff;
      border: 1px solid #e0dbd2;
      border-radius: 12px;
      max-width: 540px;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
    .email-header {
      background: #0F1E2E;
      padding: 40px 32px 32px;
      text-align: center;
    }
    .email-header::after {
      content: '';
      display: block;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, #C8A96E 30%, #E8C98A 50%, #C8A96E 70%, transparent);
      margin-top: 24px;
    }
    .lock-icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 1.5px solid #C8A96E;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .header-title {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 22px;
      font-weight: 400;
      color: #F0E8D6;
      letter-spacing: 0.02em;
    }
    .header-sub {
      font-size: 11px;
      color: #8A9BAA;
      margin-top: 6px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .email-body { padding: 32px 40px; }
    .greeting {
      font-size: 15px;
      color: #555;
      line-height: 1.7;
      margin-bottom: 24px;
    }
    .code-section {
      background: #f8f6f2;
      border-radius: 8px;
      border: 1px solid #e5e0d8;
      padding: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .code-label {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 12px;
    }
    .code-value {
      font-family: 'Courier New', Courier, monospace;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.3em;
      color: #C8A96E;
    }
    .timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #EBF3FB;
      color: #185FA5;
      font-size: 12px;
      padding: 5px 14px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .warning-box {
      border-left: 2px solid #EF9F27;
      background: #FAEEDA;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      margin-bottom: 24px;
    }
    .warning-box p {
      font-size: 13px;
      color: #633806;
      line-height: 1.6;
    }
    .divider {
      height: 1px;
      background: #e5e0d8;
      margin-bottom: 20px;
    }
    .footer-text {
      font-size: 12px;
      color: #888;
      text-align: center;
      line-height: 1.7;
    }
    .footer-text a {
      color: #185FA5;
      text-decoration: none;
    }
    .email-footer {
      background: #0F1E2E;
      padding: 14px 32px;
      text-align: center;
    }
    .footer-note {
      font-size: 11px;
      color: #4A5F6E;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="email-card">
    <div class="email-header">
      <div class="lock-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h1 class="header-title">Password Recovery</h1>
      <p class="header-sub">Account Security</p>
    </div>

    <div class="email-body">
      <p class="greeting">
        Hello,<br><br>
        We received a request to reset the password associated with your account.
        Use the verification code below to continue with the process.
      </p>

      <div class="code-section">
        <p class="code-label">Your verification code</p>
        <p class="code-value">${code}</p>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <span class="timer-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Valid for the next 15 minutes
        </span>
      </div>

      <div class="warning-box">
        <p>If you did not request this email, you can safely ignore it. Your password will not change unless you use the code above.</p>
      </div>

      <div class="divider"></div>

      <p class="footer-text">
        Need help? Contact our support team at<br>
        <a href="mailto:support@example.com">support@example.com</a>
      </p>
    </div>

    <div class="email-footer">
      <p class="footer-note">© 2026 Your Company &nbsp;·&nbsp; All rights reserved</p>
    </div>
  </div>
</body>
</html>`;
};

export default HTMLRecoveryEmail;