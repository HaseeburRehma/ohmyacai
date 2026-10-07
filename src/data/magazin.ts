/* Açaí & Matcha Magazin (/magazin). Informational articles for the sheet's
 * "Blog/Guides" cluster. Plain facts about the fruit and the tea only: the
 * sheet asks for no health claims under EU food-claim rules, so there are
 * none here, and no nutrition figures we can't source. */

export type Article = {
  slug: string;
  title: string; // meta title
  description: string;
  h1: string;
  accent: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: { h2: string; paragraphs: string[] }[];
  published: string;
};

export const ARTICLES: Article[] = [
  {
    slug: 'was-ist-acai',
    title: 'Was ist Açaí? Herkunft, Aussprache & Açaí Bowl erklärt',
    description:
      'Was ist Açaí, woher kommt die Beere und wie spricht man sie aus? Dazu: was eine Açaí Bowl ist und wie sie sich von einer Smoothie Bowl unterscheidet.',
    h1: 'Was ist Açaí?',
    accent: 'Açaí',
    intro:
      'Die dunkelviolette Beere aus dem Amazonas ist die Basis jeder Açaí Bowl. Hier erklären wir, was Açaí ist, woher die Frucht kommt, wie man sie ausspricht und was eine richtig gute Açaí Bowl ausmacht.',
    image: '/img/brazil-farm.jpg',
    imageAlt: 'Açaí-Palmen im Amazonasgebiet, Brasilien',
    published: '2026-10-07',
    sections: [
      {
        h2: 'Die Açaí Beere: eine Frucht aus dem Amazonas',
        paragraphs: [
          'Açaí ist die Frucht der Açaí-Palme (Euterpe oleracea). Die Beeren sind etwa so groß wie Heidelbeeren, fast schwarz-violett und wachsen in großen Rispen hoch oben an schlanken Palmen.',
          'Der größte Teil der Beere ist ein harter Kern, nur die dünne äußere Schicht wird gegessen. Die Açaí Frucht verdirbt nach der Ernte sehr schnell, deshalb wird sie direkt vor Ort entkernt, zu Püree verarbeitet und tiefgefroren.',
        ],
      },
      {
        h2: 'Woher kommt Açaí?',
        paragraphs: [
          'Açaí kommt aus Brasilien, vor allem aus dem Bundesstaat Pará rund um die Amazonasmündung. Für die Menschen am Amazonas ist Açaí seit Generationen ein Grundnahrungsmittel, oft herzhaft gegessen, zum Beispiel zu Fisch.',
          'Die süße, gefrorene Variante als Bowl wurde in Südbrasilien populär und ist von dort um die Welt gegangen. Unser Püree beziehen wir von Partner-Kooperativen aus dem Amazonasgebiet.',
        ],
      },
      {
        h2: 'Wie spricht man Açaí aus?',
        paragraphs: [
          'Ungefähr „a-sa-ÍH“, mit Betonung auf der letzten Silbe. Das „ç“ mit dem kleinen Häkchen (Cedille) klingt wie ein scharfes „s“. Die Schreibweisen Açaí, Açai und Acai meinen alle dieselbe Frucht.',
        ],
      },
      {
        h2: 'Wie schmeckt Açaí?',
        paragraphs: [
          'Reines Açaí schmeckt erdig-fruchtig, erinnert an dunkle Beeren mit einem Hauch Kakao und ist von Natur aus kaum süß. Erst Obst und Toppings machen eine Açaí Bowl zum süßen Snack.',
        ],
      },
      {
        h2: 'Was ist eine Açaí Bowl und wie wird sie gemacht?',
        paragraphs: [
          'Eine Açaí Bowl ist gefrorenes Açaí-Püree, so dick gemixt, dass man es löffelt. Darauf kommen Toppings: bei uns Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln, darunter ein veganer Chia-Pudding und obendrauf ein Signature-Topping wie Erdnussbutter oder Pistaziencreme.',
          'Wichtig ist, dass das Püree sehr kalt und mit möglichst wenig Flüssigkeit gemixt wird. Nur so bleibt die Bowl cremig wie Sorbet und schmilzt nicht sofort.',
        ],
      },
      {
        h2: 'Açaí Bowl selber machen: das Grundrezept',
        paragraphs: [
          'Für eine Açaí Bowl zu Hause brauchst du tiefgefrorenes Açaí-Püree, eine gefrorene Banane und einen Schuss Flüssigkeit, etwa Pflanzendrink oder Saft. Alles kurz im Mixer pürieren, nur so viel Flüssigkeit wie nötig, damit die Masse dick bleibt.',
          'Sofort in eine kalte Schale geben und mit Toppings belegen, bevor sie anfängt zu schmelzen.',
        ],
      },
      {
        h2: 'Die besten Toppings für eine Açaí Bowl',
        paragraphs: [
          'Klassisch sind Granola für den Crunch, frische Banane, Erdbeeren und Heidelbeeren für Frische und Kokosraspeln. Cremige Toppings wie Erdnussbutter oder Pistaziencreme machen die Bowl sättigender, ein Chia-Pudding darunter gibt ihr eine zweite, weiche Schicht.',
          'Genau so bauen wir unsere Signature Bowls in Düsseldorf auf.',
        ],
      },
      {
        h2: 'Açaí Bowl vs. Smoothie Bowl',
        paragraphs: [
          'Jede Açaí Bowl ist eine Smoothie Bowl, aber nicht jede Smoothie Bowl ist eine Açaí Bowl. Eine Smoothie Bowl kann aus beliebigem gefrorenem Obst gemixt sein, etwa Mango oder Pitaya (Drachenfrucht). Bei der Açaí Bowl ist Açaí die Hauptzutat, das gibt ihr die tiefviolette Farbe und den typischen Geschmack.',
        ],
      },
      {
        h2: 'Açaí Püree, Pulver oder Sorbet?',
        paragraphs: [
          'Açaí gibt es in drei Formen. Püree ist das tiefgefrorene Fruchtfleisch und kommt dem Original am nächsten. Pulver ist gefriergetrocknetes Açaí, praktisch für Smoothies, aber ohne die cremige Konsistenz. Sorbet ist Püree, das schon mit Zucker oder Sirup gemischt wurde.',
          'Wir arbeiten mit Püree, weil nur damit die Bowl so dick und cremig wird, wie sie sein soll.',
        ],
      },
    ],
  },
  {
    slug: 'was-ist-matcha',
    title: 'Was ist Matcha? Unterschied zu grünem Tee & Iced Matcha',
    description:
      'Was ist Matcha, wie unterscheidet er sich von grünem Tee und wie schmeckt er? Plus: Matcha warm oder kalt, und was Iced Matcha mit Mango oder Erdbeere ausmacht.',
    h1: 'Was ist Matcha?',
    accent: 'Matcha',
    intro:
      'Matcha ist grüner Tee, aber anders als jeder Teebeutel. Hier erfährst du, was Matcha ist, wie er schmeckt, warum er warm und kalt funktioniert und wie Iced Matcha mit Frucht entsteht.',
    image: '/img/store.jpg',
    imageAlt: 'Oh My Açaí Store in Düsseldorf, wo es Iced Matcha gibt',
    published: '2026-10-07',
    sections: [
      {
        h2: 'Matcha: gemahlener grüner Tee aus Japan',
        paragraphs: [
          'Matcha ist fein gemahlenes Pulver aus grünen Teeblättern. Die Teepflanzen werden vor der Ernte einige Wochen beschattet, danach werden die Blätter gedämpft, getrocknet, von Stielen und Blattadern befreit und zu einem sehr feinen Pulver vermahlen.',
        ],
      },
      {
        h2: 'Matcha vs. grüner Tee',
        paragraphs: [
          'Bei normalem grünen Tee werden die Blätter aufgegossen und danach entfernt. Bei Matcha wird das Pulver mit Wasser aufgeschlagen, man trinkt also das ganze Blatt mit. Deshalb ist Matcha so intensiv grün und deutlich kräftiger im Geschmack.',
        ],
      },
      {
        h2: 'Wie schmeckt Matcha?',
        paragraphs: [
          'Guter Matcha schmeckt frisch-grasig, leicht süßlich und mit einer feinen herzhaften Note, die man in Japan „Umami“ nennt. Mit Milch oder Frucht wird er weicher und runder.',
        ],
      },
      {
        h2: 'Was ist ein Matcha Latte?',
        paragraphs: [
          'Ein Matcha Latte ist aufgeschlagener Matcha mit Milch oder Pflanzendrink, warm oder als Iced Matcha Latte auf Eis. Die Milch macht den Geschmack milder und cremiger als pur aufgegossener Matcha.',
        ],
      },
      {
        h2: 'Matcha warm oder kalt?',
        paragraphs: [
          'Beides. Traditionell wird Matcha mit warmem, nicht kochendem Wasser aufgeschlagen. Als Iced Matcha wird er kalt über Eis serviert und bleibt dabei schön frisch.',
        ],
      },
      {
        h2: 'Iced Matcha mit Mango oder Erdbeere',
        paragraphs: [
          'Beim Iced Matcha mit Frucht kommt unten ein Fruchtpüree ins Glas, darüber Eis und der aufgeschlagene Matcha. So entstehen die typischen Schichten, die sich beim Trinken mischen.',
          'In unserem Store in der Düsseldorfer Altstadt gibt es den Ohmy Matcha Mango, den Ohmy Matcha Strawberry und unseren Ohmy Matcha Spezial, frisch zubereitet und auch zum Mitnehmen.',
        ],
      },
    ],
  },
];
