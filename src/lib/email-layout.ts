/**
 * Shared, mail-client-safe layout for every Oh My Açaí email.
 *
 * Built the way email has to be built: nested tables, inline styles on every
 * element, a 600px fluid container, and a small <style> block that only
 * *enhances* (mobile stacking, dark mode) — clients that strip <style>
 * (some Gmail variants, Outlook.com) still get a clean single-column layout
 * from the inline styles alone. Outlook desktop gets a fixed-width ghost
 * table via MSO conditionals so it doesn't stretch to the window.
 */

export const SITE = 'https://www.ohmyacai.de';

const C = {
  plum: '#4d294e',
  plumDeep: '#3b1f3c',
  mauve: '#9d5988',
  gold: '#d4973c',
  cream: '#f0edff',
  ink: '#1d1320',
  muted: '#6b6270',
  line: '#ece6ee',
  bg: '#f4f0f5',
  card: '#faf7fb',
};

const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
const DISPLAY = `'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif`;

export const esc = (v: string) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** Small gold pill above the headline. */
export const eyebrow = (text: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;"><tr>
    <td style="background:${C.gold};border-radius:999px;padding:5px 12px;font-family:${FONT};font-size:11px;line-height:1;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#ffffff;">${esc(text)}</td>
  </tr></table>`;

export const heading = (text: string) =>
  `<h1 class="em-h1" style="margin:0 0 12px;font-family:${DISPLAY};font-size:28px;line-height:1.15;font-weight:900;letter-spacing:-.5px;text-transform:uppercase;color:${C.plum};">${text}</h1>`;

export const paragraph = (html: string, opts: { muted?: boolean; size?: number } = {}) =>
  `<p class="em-p" style="margin:0 0 16px;font-family:${FONT};font-size:${opts.size ?? 16}px;line-height:1.6;color:${opts.muted ? C.muted : C.ink};">${html}</p>`;

/**
 * Label/value list in a soft card. Two columns on desktop; on phones the
 * `em-stack` class drops the label above the value so long e-mail
 * addresses and city names never squeeze into a 120px column.
 */
export const details = (title: string, rows: [string, string, string?][]) => {
  const body = rows
    .map(
      ([label, value, href], i) => `<tr>
        <td class="em-stack em-label" width="160" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${C.line};` : ''}font-family:${FONT};font-size:12px;line-height:1.4;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:${C.muted};">${esc(label)}</td>
        <td class="em-stack em-value" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${C.line};` : ''}font-family:${FONT};font-size:16px;line-height:1.45;font-weight:600;color:${C.ink};word-break:break-word;">${
          value
            ? href
              ? `<a href="${esc(href)}" style="color:${C.plum};text-decoration:none;">${esc(value)}</a>`
              : esc(value)
            : '—'
        }</td>
      </tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;background:${C.card};border:1px solid ${C.line};border-radius:16px;">
    <tr><td class="em-card" style="padding:18px 22px 8px;">
      <p style="margin:0 0 4px;font-family:${DISPLAY};font-size:13px;line-height:1.3;font-weight:900;letter-spacing:.6px;text-transform:uppercase;color:${C.plum};">${esc(title)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>
    </td></tr>
  </table>`;
};

/** Free-text block (e.g. the contact message) with a plum rule on the left. */
export const quote = (title: string, text: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
    <tr><td style="border-left:4px solid ${C.mauve};background:${C.card};border-radius:0 12px 12px 0;padding:16px 20px;">
      <p style="margin:0 0 6px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:${C.muted};">${esc(title)}</p>
      <p style="margin:0;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};white-space:pre-line;word-break:break-word;">${esc(text)}</p>
    </td></tr>
  </table>`;

/** Bulletproof button: table cell carries the colour so it survives image
 *  blocking and Outlook; full width on phones via `em-btn`. */
export const button = (label: string, href: string, variant: 'gold' | 'plum' = 'gold') => {
  const bg = variant === 'gold' ? C.gold : C.plum;
  const fg = variant === 'gold' ? C.ink : '#ffffff';
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="em-btn" style="margin:4px 0 8px;">
    <tr><td align="center" bgcolor="${bg}" style="border-radius:999px;background:${bg};">
      <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:15px 28px;font-family:${DISPLAY};font-size:14px;line-height:1;font-weight:900;letter-spacing:.6px;text-transform:uppercase;color:${fg};text-decoration:none;border-radius:999px;">${esc(label)}</a>
    </td></tr>
  </table>`;
};

/** Numbered "what happens next" steps. */
export const steps = (title: string, items: string[]) =>
  `<p style="margin:8px 0 12px;font-family:${DISPLAY};font-size:13px;line-height:1.3;font-weight:900;letter-spacing:.6px;text-transform:uppercase;color:${C.plum};">${esc(title)}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
    ${items
      .map(
        (t, i) => `<tr>
      <td width="40" valign="top" style="padding:0 0 14px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td align="center" valign="middle" width="28" height="28" style="width:28px;height:28px;border-radius:999px;background:${C.plum};font-family:${FONT};font-size:13px;font-weight:700;line-height:28px;color:#ffffff;">${i + 1}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:3px 0 14px;font-family:${FONT};font-size:15px;line-height:1.55;color:${C.ink};">${t}</td>
    </tr>`
      )
      .join('')}
  </table>`;

export const signoff = () =>
  paragraph(`Bis bald,<br/><strong style="color:${C.plum};">dein Oh My Açaí Team</strong>`);

/* ------------------------------------------------------------------ */
/* Page shell                                                          */
/* ------------------------------------------------------------------ */

export function emailShell({
  title,
  preheader,
  body,
  audience = 'customer',
}: {
  title: string;
  /** inbox preview line (hidden in the body) */
  preheader: string;
  body: string;
  /** internal notifications get a slimmer footer */
  audience?: 'customer' | 'team';
}) {
  const footer =
    audience === 'customer'
      ? `<tr><td class="em-pad" style="padding:28px 40px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td class="em-stack" width="50%" valign="top" style="padding:0 12px 16px 0;font-family:${FONT};font-size:13px;line-height:1.55;color:${C.cream};">
              <strong style="color:${C.gold};text-transform:uppercase;letter-spacing:.6px;font-size:12px;">Düsseldorf</strong><br/>Flinger Str. 18<br/>40213 Düsseldorf
            </td>
            <td class="em-stack" width="50%" valign="top" style="padding:0 0 16px;font-family:${FONT};font-size:13px;line-height:1.55;color:${C.cream};">
              <strong style="color:${C.gold};text-transform:uppercase;letter-spacing:.6px;font-size:12px;">Köln</strong><br/>Hohe Str. 105-107<br/>50667 Köln
            </td>
          </tr></table>
        </td></tr>
        <tr><td class="em-pad" style="padding:0 40px 8px;font-family:${FONT};font-size:13px;line-height:1.6;color:${C.cream};">
          <a href="https://www.instagram.com/ohmyacai_dues/" style="color:#ffffff;text-decoration:underline;">Instagram</a>
          &nbsp;·&nbsp;
          <a href="https://www.tiktok.com/@ohmyacai.de" style="color:#ffffff;text-decoration:underline;">TikTok</a>
          &nbsp;·&nbsp;
          <a href="${SITE}" style="color:#ffffff;text-decoration:underline;">ohmyacai.de</a>
        </td></tr>`
      : '';

  return `<!doctype html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="x-apple-disable-message-reformatting"/>
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no"/>
<meta name="color-scheme" content="light dark"/>
<meta name="supported-color-schemes" content="light dark"/>
<title>${esc(title)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}
  @media only screen and (max-width:620px){
    .em-wrap{padding:0!important;}
    .em-container{width:100%!important;border-radius:0!important;}
    .em-pad{padding-left:22px!important;padding-right:22px!important;}
    .em-hero{padding:30px 22px 26px!important;}
    .em-h1{font-size:23px!important;}
    .em-p{font-size:15px!important;}
    .em-card{padding:14px 16px 6px!important;}
    .em-stack{display:block!important;width:100%!important;box-sizing:border-box;}
    .em-label{padding:12px 0 2px!important;}
    .em-value{padding:0 0 12px!important;border-top:0!important;}
    .em-btn{width:100%!important;}
    .em-btn a{display:block!important;}
  }
  @media (prefers-color-scheme:dark){
    .em-body,.em-wrap{background:#151016!important;}
    .em-container{background:#1f1822!important;}
    .em-h1{color:#f0d8ec!important;}
    .em-p,.em-value,.em-text{color:#f2eef3!important;}
  }
</style>
</head>
<body class="em-body" style="margin:0;padding:0;width:100%;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${C.bg};">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-wrap" style="background:${C.bg};padding:28px 12px;">
    <tr><td align="center">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-container" style="width:100%;max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background:${C.plum};padding:22px 40px;" class="em-pad">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="middle" width="56">
              <a href="${SITE}" target="_blank"><img src="${SITE}/img/logo-badge.png" width="52" height="52" alt="Oh My Açaí" style="display:block;width:52px;height:52px;border-radius:999px;background:#ffffff;font-family:${FONT};font-size:12px;color:#ffffff;"/></a>
            </td>
            <td valign="middle" style="padding-left:14px;font-family:${DISPLAY};font-size:18px;line-height:1.1;font-weight:900;letter-spacing:.4px;text-transform:uppercase;color:#ffffff;">
              Oh My <span style="color:${C.gold};">Açaí</span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td height="6" style="height:6px;line-height:6px;font-size:6px;background:${C.gold};">&nbsp;</td></tr>
        <!-- Body -->
        <tr><td class="em-hero em-text" style="padding:40px 40px 28px;">${body}</td></tr>
        <!-- Footer -->
        <tr><td style="background:${C.plumDeep};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${footer}
            <tr><td class="em-pad" style="padding:${audience === 'customer' ? '8px' : '22px'} 40px 26px;font-family:${FONT};font-size:12px;line-height:1.6;color:#b9a9bb;">
              Ohmyacai UG (haftungsbeschränkt) · Flinger Str. 18, 40213 Düsseldorf<br/>
              <a href="mailto:info@ohmyacai.de" style="color:#b9a9bb;">info@ohmyacai.de</a>
              &nbsp;·&nbsp;<a href="${SITE}/impressum" style="color:#b9a9bb;">Impressum</a>
              &nbsp;·&nbsp;<a href="${SITE}/datenschutz" style="color:#b9a9bb;">Datenschutz</a>
            </td></tr>
          </table>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}
