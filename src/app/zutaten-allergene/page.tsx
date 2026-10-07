import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import TextSplit from '@/components/sections/TextSplit';
import Faq from '@/components/sections/Faq';
import RelatedLinks from '@/components/sections/RelatedLinks';
import PillButton from '@/components/ui/PillButton';
import { PAGE_LINKS, faqByQ } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/zutaten-allergene';

export const metadata = pageMetadata({
  title: 'Açaí Bowl Zutaten & Allergene | vegan | Oh My Acai Düsseldorf',
  description:
    'Alle Zutaten und Allergene unserer Açaí Bowls und Matcha Drinks: Nüsse, Gluten, Laktose und vegane Kennzeichnung. Frag gern unser Team direkt vor Ort.',
  path: PATH,
  image: '/img/bowls/erdnussbutter.jpg',
});

const BASE = ['Açaí-Püree', 'veganer Chia-Pudding', 'Granola', 'Banane', 'Erdbeeren', 'Heidelbeeren', 'Kokosraspeln'];

/* Ingredients per bowl from the shop's Wolt / Lieferando listings.
   "contains" only where the topping itself is the allergen; everything else
   is "kann enthalten" until the shop's official LMIV list is published. */
const BOWLS = [
  { name: 'Açai Erdnussbutter', topping: 'Erdnussbutter', contains: 'Erdnüsse', may: 'Gluten (Granola)' },
  { name: 'Açai Pistazie', topping: 'Pistaziencreme', contains: 'Schalenfrüchte (Pistazie)', may: 'Gluten (Granola), Milch' },
  { name: 'Açai Bueno', topping: 'Bueno', contains: '', may: 'Milch, Gluten, Schalenfrüchte (Haselnuss), Soja' },
  { name: 'Açai Cheesecake', topping: 'Cheesecake-Creme', contains: '', may: 'Milch, Gluten, Ei' },
  { name: 'Açai Tropical', topping: 'Früchte der Basis, ohne Creme-Topping', contains: '', may: 'Gluten (Granola)' },
];

const FAQ = faqByQ(
  'Was ist in einer Açaí Bowl?',
  'Ist Açaí vegan?',
  'Ist eine Açaí Bowl vegan?',
  'Ist Granola glutenfrei?',
  'Enthalten eure Bowls Nüsse?',
  'Enthält Açaí Zucker?',
  'Wie viele Kalorien hat eine Açaí Bowl?',
);

export default function ZutatenPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Zutaten & Allergene', path: PATH }]), faqLd(FAQ)]}>
      <PageHero
        crumbs={[{ name: 'Speisekarte', path: '/speisekarte' }, { name: 'Zutaten & Allergene', path: PATH }]}
        eyebrow="Açaí Bowl Zutaten"
        title="Zutaten & Allergene"
        accent="Allergene"
        intro="Was ist in einer Açaí Bowl? Hier findest du alle Zutaten und Inhaltsstoffe unserer Bowls, welche Teile vegan sind und wo Nüsse, Gluten oder Milch stecken können."
      />

      <section className="w-full bg-white px-6 pb-16 pt-4 sm:px-10 lg:px-[60px] lg:pb-24">
        <div className="mx-auto flex w-full max-w-[1020px] flex-col gap-10">
          <div>
            <h2 className="font-display border-b-2 border-plum pb-4 text-[clamp(1.5rem,4.4vw,2.5rem)] uppercase leading-[1.08] tracking-[-0.5px] text-ink">
              Die Basis jeder Bowl
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {BASE.map((b) => (
                <li key={b} className="rounded-full bg-[#f7f3f7] px-4 py-2 text-[15px] font-semibold text-plum">{b}</li>
              ))}
            </ul>
            <p className="mt-4 max-w-[720px] text-base leading-[1.6] text-ink/80">
              Açaí-Püree und Chia-Pudding sind vegan, ebenso Obst und Kokos. Eine vegane Açaí Bowl hängt also nur vom
              Signature-Topping ab. Die Bowls gibt es je nach Sorte in 0,35 l und 0,5 l.
            </p>
          </div>

          <div>
            <h2 className="font-display border-b-2 border-plum pb-4 text-[clamp(1.5rem,4.4vw,2.5rem)] uppercase leading-[1.08] tracking-[-0.5px] text-ink">
              Allergene je Bowl
            </h2>
            <ul className="divide-y divide-ink/10">
              {BOWLS.map((b) => (
                <li key={b.name} className="grid gap-2 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-6">
                  <div>
                    <h3 className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] uppercase leading-tight tracking-[-0.3px] text-plum">{b.name}</h3>
                    <p className="mt-1 text-[14px] text-ink/65">Topping: {b.topping}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 text-[15px] leading-[1.5]">
                    {b.contains && (
                      <p><span className="font-bold text-ink">Enthält:</span> <span className="text-ink/80">{b.contains}</span></p>
                    )}
                    <p><span className="font-bold text-ink">Kann enthalten:</span> <span className="text-ink/80">{b.may}</span></p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-3xl bg-[#f7f3f7] p-6 text-[15px] leading-[1.6] text-ink/80 sm:p-8">
              <strong className="text-plum">Wichtig bei Allergien:</strong> Diese Übersicht ersetzt nicht die verbindliche
              Allergenkennzeichnung. Wir arbeiten in einer Küche mit Nüssen, Gluten und Milch, Spuren sind deshalb
              in jeder Bowl möglich. Sprich uns vor der Bestellung an, wir zeigen dir die vollständige Allergenliste
              im Store. Geprüfte Nährwerte (Kalorien, Zucker, Protein) bekommst du ebenfalls auf Nachfrage.
            </p>
          </div>
        </div>
      </section>

      <TextSplit
        tone="cream"
        title="Ist Açaí vegan?"
        accent="vegan"
        paragraphs={[
          'Ja. Açaí ist die Frucht einer Palme aus dem Amazonasgebiet, das reine Püree ist rein pflanzlich. Auch unser Chia-Pudding ist vegan.',
          'Ob eine Açaí Bowl laktosefrei oder ohne Nüsse möglich ist, hängt vom Topping ab. Die Tropical Bowl kommt ohne Nusscreme aus, bei Bueno und Cheesecake-Creme kann Milch enthalten sein.',
        ]}
        image={{ src: '/img/bowls/tropical.jpg', alt: 'Açai Tropical Bowl mit Banane, Erdbeeren und Kokos' }}
      >
        <PillButton href="/speisekarte" variant="plum">Zur Speisekarte</PillButton>
      </TextSplit>

      <Faq items={FAQ} title="Fragen zu Zutaten" />
      <RelatedLinks links={[PAGE_LINKS.bowls, PAGE_LINKS.faq, PAGE_LINKS.magazin, PAGE_LINKS.speisekarte]} />
    </PageShell>
  );
}
