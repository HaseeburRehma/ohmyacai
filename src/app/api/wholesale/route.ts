import { NextResponse } from 'next/server';
import { mailTransport, sendMail } from '@/lib/mailer';
import {
  wholesaleApplicantEmail,
  wholesaleApplicantText,
  wholesaleTeamEmail,
  wholesaleTeamText,
  type WholesaleEnquiry,
} from '@/lib/wholesale-emails';

export const runtime = 'nodejs';

/**
 * Wholesale (Großhandel) enquiry endpoint. Emails the studio inbox
 * (WHOLESALE_MAIL_TO, default info@tylotech.de) and sends the applicant
 * a confirmation, via src/lib/mailer.ts (Resend or SMTP).
 *
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

  const to = process.env.WHOLESALE_MAIL_TO || 'info@tylotech.de';

  if (!mailTransport()) {
    console.error('[wholesale] mail not configured; enquiry not emailed:', {
      firstName,
      lastName,
      email,
      phone,
    });
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const enquiry: WholesaleEnquiry = { firstName, lastName, email, phone };

  try {
    await sendMail({
      to,
      replyTo: `${firstName} ${lastName} <${email}>`,
      subject: `Neue Großhandel-Anfrage — ${firstName} ${lastName}`,
      text: wholesaleTeamText(enquiry),
      html: wholesaleTeamEmail(enquiry),
    });
  } catch (err) {
    console.error('[wholesale] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  try {
    await sendMail({
      to: `${firstName} ${lastName} <${email}>`,
      replyTo: to,
      subject: 'Deine Oh My Acai Großhandel-Anfrage ist da',
      text: wholesaleApplicantText(enquiry),
      html: wholesaleApplicantEmail(enquiry),
    });
  } catch (err) {
    // The team already has the enquiry; a bounced confirmation shouldn't fail it.
    console.error('[wholesale] applicant confirmation failed:', err);
  }
  return NextResponse.json({ ok: true });
}
