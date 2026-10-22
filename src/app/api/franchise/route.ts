import { NextResponse } from 'next/server';
import {
  applicantEmail,
  applicantText,
  teamEmail,
  teamText,
  type FranchiseEnquiry,
} from '@/lib/franchise-emails';
import { FRANCHISE_FORM } from '@/data/site';
import { appendLead, sheetConfigured } from '@/lib/lead-sheet';
import { mailTransport, sendMail } from '@/lib/mailer';

export const runtime = 'nodejs';

/**
 * Franchise enquiry endpoint. Every lead goes to two places:
 *
 * 1. Email — team notification to MAIL_TO (default info@tylotech.de) and a
 *    confirmation to the applicant, via Resend or SMTP (src/lib/mailer.ts).
 * 2. Google Sheet — one row per lead in the "Franchise" tab, see
 *    src/lib/lead-sheet.ts (LEADS_SHEET_URL, LEADS_SHEET_SECRET).
 *
 * Set them in Vercel → Project → Settings → Environment Variables. The lead
 * counts as received if either channel works; with neither configured the
 * route returns 503 and the form shows its fallback message.
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

  const mailConfigured = mailTransport() !== null;

  if (!mailConfigured && !sheetConfigured()) {
    // Nothing configured — don't lose the lead, log it for the server operator.
    console.error('[franchise] no mail and no sheet configured; enquiry:', enquiry);
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  // The sheet row and the team email go out in parallel; the lead counts as
  // received if either of them lands.
  const [sheet, mailed] = await Promise.all([
    appendLead('Franchise', {
      Name: enquiry.name,
      'E-Mail': enquiry.email,
      Telefon: enquiry.phone,
      'Stadt / Region': enquiry.city,
      Kapital: enquiry.capital,
      Start: enquiry.timing,
      'Gastro-Erfahrung': enquiry.experience,
    }),
    mailConfigured ? sendMails(enquiry) : Promise.resolve(false),
  ]);

  if (sheet !== 'saved' && !mailed) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sheet, mailed });
}

/** Team notification to MAIL_TO (default info@tylotech.de) plus the
 *  applicant's confirmation. Returns whether the team email went out. */
async function sendMails(enquiry: FranchiseEnquiry): Promise<boolean> {
  const to = process.env.MAIL_TO || 'info@tylotech.de';
  try {
    await sendMail({
      to,
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject: `Neue Franchise-Anfrage — ${enquiry.name} (${enquiry.city})`,
      text: teamText(enquiry),
      html: teamEmail(enquiry),
    });
  } catch (err) {
    console.error('[franchise] team email failed:', err);
    return false;
  }

  try {
    await sendMail({
      to: `${enquiry.name} <${enquiry.email}>`,
      replyTo: to,
      subject: 'Deine Oh My Acai Franchise-Anfrage ist da',
      text: applicantText(enquiry),
      html: applicantEmail(enquiry),
    });
  } catch (err) {
    // The team already has the lead; a bounced confirmation shouldn't fail it.
    console.error('[franchise] applicant confirmation failed:', err);
  }
  return true;
}
