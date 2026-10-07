import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * General contact form (/kontakt). Emails the team inbox only; no copy goes
 * back to the sender, so the form can't be used to relay mail to strangers.
 * Same SMTP env vars as the franchise + wholesale routes:
 *
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 *   CONTACT_MAIL_TO (optional) → MAIL_TO → info@tylotech.de
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (String(data.company ?? '').trim()) return NextResponse.json({ ok: true });

  const name = String(data.name ?? '').trim().slice(0, 120);
  const email = String(data.email ?? '').trim().slice(0, 200);
  const store = String(data.store ?? '').trim().slice(0, 60);
  const message = String(data.message ?? '').trim().slice(0, 4000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const from = process.env.MAIL_FROM || SMTP_USER;
  const to = process.env.CONTACT_MAIL_TO || process.env.MAIL_TO || 'info@tylotech.de';

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !from) {
    console.error('[contact] SMTP not configured; message not emailed');
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from,
      to,
      replyTo: `${name} <${email}>`,
      subject: `Kontaktanfrage${store ? ` (${store})` : ''} — ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nStore: ${store || '—'}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${esc(name)}<br/><strong>E-Mail:</strong> ${esc(email)}<br/><strong>Store:</strong> ${esc(store || '—')}</p><p style="white-space:pre-line">${esc(message)}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
