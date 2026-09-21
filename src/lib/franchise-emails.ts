/**
 * Branded HTML emails for the franchise enquiry form — one notification to the
 * Oh My Açaí team, one confirmation to the applicant. Plain inline-styled
 * tables so they render in every mail client (Gmail, Outlook, Apple Mail).
 */

export type FranchiseEnquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
};

const PLUM = '#4d294e';
const GOLD = '#d4973c';
const INK = '#111111';
const MUTED = '#6b6270';

const esc = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function shell(title: string, inner: string) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f1f5;font-family:Helvetica,Arial,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1f5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:92%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.08);">
        <tr><td style="background:${PLUM};padding:28px 32px;">
          <span style="display:inline-block;font-size:22px;font-weight:800;letter-spacing:-.5px;color:#ffffff;">OH MY! <span style="color:${GOLD};">Açaí</span></span>
        </td></tr>
        ${inner}
        <tr><td style="padding:20px 32px 28px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:12px;line-height:1.5;color:${MUTED};">Oh My Açaí · Flinger Straße 18, 40213 Düsseldorf · <a href="mailto:info@tylotech.de" style="color:${MUTED};">info@tylotech.de</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;width:170px;font-size:13px;color:${MUTED};vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;font-size:15px;color:${INK};font-weight:600;">${esc(value) || '—'}</td>
  </tr>`;
}

/** Notification to the Oh My Açaí team. */
export function teamEmail(d: FranchiseEnquiry) {
  const name = `${d.firstName} ${d.lastName}`.trim();
  const inner = `<tr><td style="padding:32px 32px 8px;">
      <h1 style="margin:0 0 6px;font-size:24px;line-height:1.2;color:${PLUM};text-transform:uppercase;letter-spacing:-.5px;">Neue Franchise-Anfrage</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:${MUTED};">${esc(name)} möchte eine Oh My Açaí Filiale eröffnen.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;">
        ${row('Name', name)}
        ${row('E-Mail', d.email)}
        ${row('Telefon', d.phone)}
        ${row('Wunschstadt', d.city)}
        ${row('Investitionsbudget', d.budget)}
      </table>
      <div style="margin-top:22px;">
        <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${GOLD};color:#111;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:999px;">Antworten an ${esc(d.firstName)}</a>
      </div>
    </td></tr>`;
  return shell('Neue Franchise-Anfrage', inner);
}

/** Confirmation to the applicant. */
export function applicantEmail(d: FranchiseEnquiry) {
  const inner = `<tr><td style="padding:32px 32px 8px;">
      <h1 style="margin:0 0 6px;font-size:24px;line-height:1.2;color:${PLUM};text-transform:uppercase;letter-spacing:-.5px;">Danke, ${esc(d.firstName)}!</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">Deine Anfrage für das Oh My Açaí Franchise ist bei uns angekommen. Unser Team meldet sich innerhalb eines Werktags mit dem Franchise-Paket — Kosten, Gebietskarte und dem Sechs-Wochen-Eröffnungsplan.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;">
        ${row('Wunschstadt', d.city)}
        ${row('Investitionsbudget', d.budget)}
      </table>
      <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:${MUTED};">Fragen? Antworte einfach auf diese E-Mail.</p>
      <p style="margin:20px 0 0;font-size:15px;color:${INK};">Bis bald,<br/><strong>dein Oh My Açaí Team</strong></p>
    </td></tr>`;
  return shell('Danke für deine Franchise-Anfrage', inner);
}

export function teamText(d: FranchiseEnquiry) {
  return `Neue Franchise-Anfrage

Name: ${d.firstName} ${d.lastName}
E-Mail: ${d.email}
Telefon: ${d.phone}
Wunschstadt: ${d.city}
Investitionsbudget: ${d.budget}`;
}
