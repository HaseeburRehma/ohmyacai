/**
 * Wholesale (Großhandel) enquiry emails — team notification + applicant
 * confirmation. Layout and building blocks live in ./email-layout.
 */
import {
  SITE,
  button,
  details,
  emailShell,
  esc,
  eyebrow,
  heading,
  paragraph,
  signoff,
  steps,
} from './email-layout';

export type WholesaleEnquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

/** Notification to the team inbox. */
export function wholesaleTeamEmail(d: WholesaleEnquiry) {
  const name = `${d.firstName} ${d.lastName}`.trim();
  const body = `
    ${eyebrow('Großhandel')}
    ${heading('Neue Großhandel&#8209;Anfrage')}
    ${paragraph(`<strong>${esc(name)}</strong> möchte reines Açaí-Püree von Oh My Açaí beziehen.`)}
    ${details('Kontakt', [
      ['Name', name],
      ['E-Mail', d.email, `mailto:${d.email}`],
      ['Telefon', d.phone, `tel:${d.phone.replace(/\s/g, '')}`],
    ])}
    ${button(`${d.firstName} antworten`, `mailto:${d.email}?subject=${encodeURIComponent('Dein Angebot für Açaí-Püree')}`)}
    ${paragraph('Antworten auf diese E-Mail gehen direkt an die anfragende Person.', { muted: true, size: 13 })}`;
  return emailShell({ title: 'Neue Großhandel-Anfrage', preheader: `${name} · ${d.email}`, body, audience: 'team' });
}

/** Confirmation to the applicant. */
export function wholesaleApplicantEmail(d: WholesaleEnquiry) {
  const body = `
    ${eyebrow('Anfrage erhalten')}
    ${heading(`Danke, ${esc(d.firstName)}!`)}
    ${paragraph('Deine Anfrage für reines Açaí-Püree ist bei uns angekommen. Es ist dasselbe Püree, mit dem wir in Düsseldorf und Köln jede Bowl mixen.')}
    ${steps('So geht es weiter', [
      'Wir melden uns in der Regel innerhalb eines Werktags bei dir.',
      'Du bekommst Preise, Liefermengen und das Datenblatt zum Püree.',
      'Gemeinsam klären wir Mengen, Lieferrhythmus und den Start.',
    ])}
    ${button('Mehr über Oh My Açaí', SITE, 'plum')}
    ${paragraph('Fragen? Antworte einfach auf diese E-Mail.', { muted: true, size: 14 })}
    ${signoff()}`;
  return emailShell({
    title: 'Danke für deine Großhandel-Anfrage',
    preheader: 'Deine Anfrage ist da. Preise und Datenblatt kommen innerhalb eines Werktags.',
    body,
  });
}

export function wholesaleTeamText(d: WholesaleEnquiry) {
  return `Neue Großhandel-Anfrage

Name: ${d.firstName} ${d.lastName}
E-Mail: ${d.email}
Telefon: ${d.phone}`;
}

export function wholesaleApplicantText(d: WholesaleEnquiry) {
  return `Danke, ${d.firstName}!

Deine Anfrage für reines Açaí-Püree ist bei uns angekommen.

So geht es weiter:
1. Wir melden uns in der Regel innerhalb eines Werktags bei dir.
2. Du bekommst Preise, Liefermengen und das Datenblatt zum Püree.
3. Gemeinsam klären wir Mengen, Lieferrhythmus und den Start.

Fragen? Antworte einfach auf diese E-Mail.

Bis bald,
dein Oh My Açaí Team
${SITE}`;
}
