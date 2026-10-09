/**
 * Franchise enquiry emails — one notification to the team, one confirmation
 * to the applicant. Layout and building blocks live in ./email-layout.
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

export type FranchiseEnquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
};

/** Notification to the Oh My Açaí team. */
export function teamEmail(d: FranchiseEnquiry) {
  const name = `${d.firstName} ${d.lastName}`.trim();
  const body = `
    ${eyebrow('Franchise-Anfrage')}
    ${heading('Neue Franchise&#8209;Anfrage')}
    ${paragraph(`<strong>${esc(name)}</strong> möchte eine Oh My Açaí Filiale in <strong>${esc(d.city) || 'einer neuen Stadt'}</strong> eröffnen.`)}
    ${details('Kontakt & Eckdaten', [
      ['Name', name],
      ['E-Mail', d.email, `mailto:${d.email}`],
      ['Telefon', d.phone, `tel:${d.phone.replace(/\s/g, '')}`],
      ['Wunschstadt', d.city],
      ['Budget', d.budget],
    ])}
    ${button(`${d.firstName} antworten`, `mailto:${d.email}?subject=${encodeURIComponent('Dein Oh My Açaí Franchise-Paket')}`)}
    ${paragraph('Antworten auf diese E-Mail gehen direkt an die Bewerberin oder den Bewerber.', { muted: true, size: 13 })}`;
  return emailShell({
    title: 'Neue Franchise-Anfrage',
    preheader: `${name} · ${d.city} · ${d.budget}`,
    body,
    audience: 'team',
  });
}

/** Confirmation to the applicant. */
export function applicantEmail(d: FranchiseEnquiry) {
  const body = `
    ${eyebrow('Anfrage erhalten')}
    ${heading(`Danke, ${esc(d.firstName)}!`)}
    ${paragraph('Deine Anfrage für ein Oh My Açaí Franchise ist bei uns angekommen. Schön, dass du unser Konzept in deine Stadt bringen möchtest.')}
    ${steps('So geht es weiter', [
      'Unser Team prüft deine Angaben, in der Regel innerhalb eines Werktags.',
      'Du bekommst das Franchise-Paket: Kosten, Gebietskarte und den Eröffnungsplan.',
      'Wir vereinbaren ein persönliches Gespräch zu deinem Standort.',
    ])}
    ${details('Deine Angaben', [
      ['Wunschstadt', d.city],
      ['Budget', d.budget],
      ['Telefon', d.phone],
    ])}
    ${button('Franchise-Seite ansehen', `${SITE}/franchise`, 'plum')}
    ${paragraph('Fragen? Antworte einfach auf diese E-Mail.', { muted: true, size: 14 })}
    ${signoff()}`;
  return emailShell({
    title: 'Danke für deine Franchise-Anfrage',
    preheader: 'Deine Anfrage ist da. Das Franchise-Paket kommt innerhalb eines Werktags.',
    body,
  });
}

export function teamText(d: FranchiseEnquiry) {
  return `Neue Franchise-Anfrage

Name: ${d.firstName} ${d.lastName}
E-Mail: ${d.email}
Telefon: ${d.phone}
Wunschstadt: ${d.city}
Budget: ${d.budget}`;
}

export function applicantText(d: FranchiseEnquiry) {
  return `Danke, ${d.firstName}!

Deine Anfrage für ein Oh My Açaí Franchise ist bei uns angekommen.

So geht es weiter:
1. Unser Team prüft deine Angaben, in der Regel innerhalb eines Werktags.
2. Du bekommst das Franchise-Paket: Kosten, Gebietskarte und den Eröffnungsplan.
3. Wir vereinbaren ein persönliches Gespräch zu deinem Standort.

Deine Angaben
Wunschstadt: ${d.city}
Budget: ${d.budget}
Telefon: ${d.phone}

Fragen? Antworte einfach auf diese E-Mail.

Bis bald,
dein Oh My Açaí Team
${SITE}/franchise`;
}
