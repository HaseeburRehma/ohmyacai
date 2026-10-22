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
  name: string;
  email: string;
  phone: string;
  city: string;
  capital: string;
  timing: string;
  experience: string;
};

/** "Maria Schmidt" → "Maria", for the greeting. */
const firstName = (name: string) => name.split(/\s+/)[0] || name;

/** Notification to the Oh My Acai team. */
export function teamEmail(d: FranchiseEnquiry) {
  const body = `
    ${eyebrow('Franchise-Anfrage')}
    ${heading('Neue Franchise&#8209;Anfrage')}
    ${paragraph(`<strong>${esc(d.name)}</strong> möchte einen Oh My Acai Laden in <strong>${esc(d.city) || 'einer neuen Stadt'}</strong> eröffnen.`)}
    ${details('Kontakt & Eckdaten', [
      ['Name', d.name],
      ['E-Mail', d.email, `mailto:${d.email}`],
      ['Telefon', d.phone, `tel:${d.phone.replace(/\s/g, '')}`],
      ['Stadt / Region', d.city],
      ['Kapital', d.capital],
      ['Start', d.timing],
      ['Gastro-Erfahrung', d.experience],
    ])}
    ${button(`${firstName(d.name)} antworten`, `mailto:${d.email}?subject=${encodeURIComponent('Dein Oh My Acai Laden')}`)}
    ${paragraph('Antworten auf diese E-Mail gehen direkt an die Bewerberin oder den Bewerber. Zugesagt: Rückmeldung innerhalb von 24 Stunden.', { muted: true, size: 13 })}`;
  return emailShell({
    title: 'Neue Franchise-Anfrage',
    preheader: `${d.name} · ${d.city} · ${d.capital} · ${d.timing}`,
    body,
    audience: 'team',
  });
}

/** Confirmation to the applicant. */
export function applicantEmail(d: FranchiseEnquiry) {
  const body = `
    ${eyebrow('Anfrage erhalten')}
    ${heading(`Danke, ${esc(firstName(d.name))}!`)}
    ${paragraph('Wir melden uns innerhalb von 24 Stunden mit allen Infos zu deinem eigenen Oh My Acai Laden.')}
    ${steps('So geht es weiter', [
      'Wir schauen uns deine Angaben an.',
      'Innerhalb von 24 Stunden bekommst du alle Infos zu deinem eigenen Laden.',
      'Wir vereinbaren ein persönliches Gespräch zu deinem Standort.',
    ])}
    ${details('Deine Angaben', [
      ['Stadt / Region', d.city],
      ['Kapital', d.capital],
      ['Start', d.timing],
      ['Gastro-Erfahrung', d.experience],
      ['Telefon', d.phone],
    ])}
    ${button('Franchise-Seite ansehen', `${SITE}/franchise`, 'plum')}
    ${paragraph('Fragen? Antworte einfach auf diese E-Mail.', { muted: true, size: 14 })}
    ${signoff()}`;
  return emailShell({
    title: 'Danke für deine Franchise-Anfrage',
    preheader: 'Wir melden uns innerhalb von 24 Stunden mit allen Infos zu deinem Laden.',
    body,
  });
}

export function teamText(d: FranchiseEnquiry) {
  return `Neue Franchise-Anfrage

Name: ${d.name}
E-Mail: ${d.email}
Telefon: ${d.phone}
Stadt / Region: ${d.city}
Kapital: ${d.capital}
Start: ${d.timing}
Gastro-Erfahrung: ${d.experience}`;
}

export function applicantText(d: FranchiseEnquiry) {
  return `Danke, ${firstName(d.name)}!

Wir melden uns innerhalb von 24 Stunden mit allen Infos zu deinem eigenen Oh My Acai Laden.

So geht es weiter:
1. Wir schauen uns deine Angaben an.
2. Innerhalb von 24 Stunden bekommst du alle Infos zu deinem eigenen Laden.
3. Wir vereinbaren ein persönliches Gespräch zu deinem Standort.

Deine Angaben
Stadt / Region: ${d.city}
Kapital: ${d.capital}
Start: ${d.timing}
Gastro-Erfahrung: ${d.experience}
Telefon: ${d.phone}

Fragen? Antworte einfach auf diese E-Mail.

Bis bald,
dein Oh My Acai Team
${SITE}/franchise`;
}
