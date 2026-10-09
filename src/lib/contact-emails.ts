/** Contact form email to the team inbox. Layout lives in ./email-layout. */
import { button, details, emailShell, esc, eyebrow, heading, paragraph, quote } from './email-layout';

export type ContactMessage = { name: string; email: string; store: string; message: string };

export function contactTeamEmail(d: ContactMessage) {
  const body = `
    ${eyebrow(d.store ? `Kontakt · ${d.store}` : 'Kontakt')}
    ${heading('Neue Nachricht')}
    ${paragraph(`<strong>${esc(d.name)}</strong> hat über das Kontaktformular geschrieben.`)}
    ${details('Absender', [
      ['Name', d.name],
      ['E-Mail', d.email, `mailto:${d.email}`],
      ['Store', d.store || 'allgemein'],
    ])}
    ${quote('Nachricht', d.message)}
    ${button(`${d.name.split(' ')[0]} antworten`, `mailto:${d.email}`)}`;
  return emailShell({
    title: 'Neue Kontaktanfrage',
    preheader: `${d.name}: ${d.message.slice(0, 90)}`,
    body,
    audience: 'team',
  });
}

export function contactTeamText(d: ContactMessage) {
  return `Neue Nachricht über das Kontaktformular

Name: ${d.name}
E-Mail: ${d.email}
Store: ${d.store || 'allgemein'}

${d.message}`;
}
