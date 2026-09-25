import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  wholesaleApplicantEmail,
  wholesaleTeamEmail,
  wholesaleTeamText,
  type WholesaleEnquiry,
} from '@/lib/wholesale-emails';

export const runtime = 'nodejs';

/**
 * Wholesale (Großhandel) enquiry endpoint. Emails the studio inbox
 * (WHOLESALE_MAIL_TO, default info@tylotech.de) and sends the applicant
 * a confirmation via SMTP. Same env vars as the franchise route:
 *
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS
 *   MAIL_FROM  e.g. "Oh My Açaí <info@ohmyacai.de>"
 *   WHOLESALE_MAIL_TO  (optional) defaults to info@tylotech.de
 */
export async function POST(req: Request) {
  let data: Partial<WholesaleEnquiry>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const firstName = String(data.firstName ?? '').trim();
  const lastName = String(data.lastName ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !lastName || !emailOk || !phone) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const from = process.env.MAIL_FROM || SMTP_USER;
  const to = process.env.WHOLESALE_MAIL_TO || 'info@tylotech.de';

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !from) {
    console.error('[wholesale] SMTP not configured; enquiry not emailed:', {
      firstName,
      lastName,
      email,
      phone,
    });
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const enquiry: WholesaleEnquiry = { firstName, lastName, email, phone };

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
      replyTo: `${firstName} ${lastName} <${email}>`,
      subject: `Neue Großhandel-Anfrage — ${firstName} ${lastName}`,
      text: wholesaleTeamText(enquiry),
      html: wholesaleTeamEmail(enquiry),
    });

    await transport.sendMail({
      from,
      to: `${firstName} ${lastName} <${email}>`,
      replyTo: to,
      subject: 'Deine Oh My Açaí Großhandel-Anfrage ist da',
      html: wholesaleApplicantEmail(enquiry),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[wholesale] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
