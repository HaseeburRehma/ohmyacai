import { NextResponse } from 'next/server';
import { mailTransport, sendMail } from '@/lib/mailer';
import { contactTeamEmail, contactTeamText } from '@/lib/contact-emails';

export const runtime = 'nodejs';


/**
 * General contact form (/kontakt). Emails the team inbox only; no copy goes
 * back to the sender, so the form can't be used to relay mail to strangers.
 * Mail goes out via src/lib/mailer.ts (Resend or SMTP).
 *
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

  const to = process.env.CONTACT_MAIL_TO || process.env.MAIL_TO || 'info@tylotech.de';

  if (!mailTransport()) {
    console.error('[contact] mail not configured; message not emailed');
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  try {
    await sendMail({
      to,
      replyTo: `${name} <${email}>`,
      subject: `Kontaktanfrage${store ? ` (${store})` : ''} — ${name}`,
      text: contactTeamText({ name, email, store, message }),
      html: contactTeamEmail({ name, email, store, message }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
