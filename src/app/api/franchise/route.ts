import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  applicantEmail,
  applicantText,
  teamEmail,
  teamText,
  type FranchiseEnquiry,
} from '@/lib/franchise-emails';
import { FRANCHISE_FORM } from '@/data/site';

export const runtime = 'nodejs';

/**
 * Franchise enquiry endpoint. Emails the team (MAIL_TO, default
 * info@tylotech.de) and sends the applicant a confirmation, both via SMTP.
 *
 * Configure in the environment (Vercel → Project → Settings → Environment
 * Variables):
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS
 *   MAIL_FROM  e.g. "Oh My Acai <info@tylotech.de>"
 *   MAIL_TO    (optional) defaults to info@tylotech.de
 * Without these the route returns 503 and the form shows a fallback message.
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

  const field = (k: string, max = 200) => String(data[k] ?? '').trim().slice(0, max);
  const enquiry: FranchiseEnquiry = {
    name: field('name', 120),
    email: field('email'),
    phone: field('phone', 40),
    city: field('city', 120),
    capital: field('capital', 60),
    timing: field('timing', 60),
    experience: field('experience', 60),
  };

  // Answers must be one of the options on the form.
  const options = (key: string) =>
    FRANCHISE_FORM.steps.find((s) => s.key === key) as
      | { options?: readonly string[] }
      | undefined;
  const isOption = (key: string, v: string) =>
    !!options(key)?.options?.includes(v);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email);
  if (
    !enquiry.name ||
    !emailOk ||
    !enquiry.phone ||
    !enquiry.city ||
    !isOption('capital', enquiry.capital) ||
    !isOption('timing', enquiry.timing) ||
    !isOption('experience', enquiry.experience) ||
    data.consent !== true
  ) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const from = process.env.MAIL_FROM || SMTP_USER;
  const to = process.env.MAIL_TO || 'info@tylotech.de';

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !from) {
    // Not configured yet — don't lose the lead, log it for the server operator.
    console.error('[franchise] SMTP not configured; enquiry not emailed:', enquiry);
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
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject: `Neue Franchise-Anfrage — ${enquiry.name} (${enquiry.city})`,
      text: teamText(enquiry),
      html: teamEmail(enquiry),
    });

    await transport.sendMail({
      from,
      to: `${enquiry.name} <${enquiry.email}>`,
      replyTo: to,
      subject: 'Deine Oh My Acai Franchise-Anfrage ist da',
      text: applicantText(enquiry),
      html: applicantEmail(enquiry),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[franchise] send failed:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
