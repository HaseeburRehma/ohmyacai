import nodemailer from 'nodemailer';

/**
 * Outgoing mail for every form route. Resend when RESEND_API_KEY is set,
 * otherwise the site's own SMTP server.
 *
 *   RESEND_API_KEY  Resend API key (the domain in EMAIL_FROM must be
 *                   verified in Resend → Domains)
 *   EMAIL_FROM      sender, e.g. "Oh My Acai <info@tylotech.de>"
 *                   (MAIL_FROM is accepted too)
 *
 *   SMTP_HOST, SMTP_PORT (587 default, or 465), SMTP_USER, SMTP_PASS
 *                   used only when there is no Resend key
 */

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export function mailTransport(): 'resend' | 'smtp' | null {
  if (process.env.RESEND_API_KEY) return 'resend';
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) return 'smtp';
  return null;
}

/** Strips quotes people paste around env values in the Vercel UI. */
const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, '') || undefined;

function sender() {
  return (
    clean(process.env.EMAIL_FROM) ||
    clean(process.env.MAIL_FROM) ||
    (process.env.SMTP_USER ? `Oh My Acai <${process.env.SMTP_USER}>` : undefined) ||
    // Resend's shared test sender — only delivers to the Resend account owner.
    'Oh My Acai <onboarding@resend.dev>'
  );
}

/** Sends one email; throws with a short, non-secret reason on failure. */
export async function sendMail(mail: Mail): Promise<void> {
  const via = mailTransport();
  if (via === 'resend') return sendWithResend(mail);
  if (via === 'smtp') return sendWithSmtp(mail);
  throw new Error('mail not configured');
}

async function sendWithResend(mail: Mail) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${clean(process.env.RESEND_API_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender(),
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { name?: string; message?: string } | null;
    throw new Error(`resend ${res.status} ${body?.name ?? ''}: ${body?.message ?? 'no body'}`);
  }
}

async function sendWithSmtp(mail: Mail) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const port = Number(SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transport.sendMail({ from: sender(), ...mail });
}
