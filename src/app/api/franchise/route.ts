import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  applicantEmail,
  teamEmail,
  teamText,
  type FranchiseEnquiry,
} from '@/lib/franchise-emails';

export const runtime = 'nodejs';

/**
 * Franchise enquiry endpoint. Emails the team (MAIL_TO, default
 * info@tylotech.de) and sends the applicant a confirmation, both via SMTP.
 *
 * Configure in the environment (Vercel → Project → Settings → Environment
 * Variables):
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS
 *   MAIL_FROM  e.g. "Oh My Açaí <info@tylotech.de>"
 *   MAIL_TO    (optional) defaults to info@tylotech.de
 * Without these the route returns 503 and the form shows a fallback message.
 */
export async function POST(req: Request) {
  let data: Partial<FranchiseEnquiry> & { consent?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const firstName = String(data.firstName ?? '').trim();
  const lastName = String(data.lastName ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const city = String(data.city ?? '').trim();
  const budget = String(data.budget ?? '').trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !lastName || !emailOk || !phone || !city || !budget) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const from = process.env.MAIL_FROM || SMTP_USER;
  const to = process.env.MAIL_TO || 'info@tylotech.de';

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !from) {
    // Not configured yet — don't lose the lead, log it for the server operator.
    console.error('[franchise] SMTP not configured; enquiry not emailed:', {
      firstName,
      lastName,
      email,
      phone,
      city,
      budget,
    });
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const enquiry: FranchiseEnquiry = {
    firstName,
    lastName,
    email,
    phone,
    city,
    budget,
  };

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
      subject: `Neue Franchise-Anfrage — ${firstName} ${lastName} (${city})`,
      text: teamText(enquiry),
      html: teamEmail(enquiry),
    });

    await transport.sendMail({
      from,
      to: `${firstName} ${lastName} <${email}>`,
      replyTo: to,
      subject: 'Deine Oh My Açaí Franchise-Anfrage ist da',
      html: applicantEmail(enquiry),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[franchise] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
