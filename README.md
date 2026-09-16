# Oh My Açaí

Animated, smooth-scrolling marketing site built 1:1 from the Figma file
[Oh My Acai](https://www.figma.com/design/sYByHs3u7UHB6Nm6FDocZp/Oh-My-Acai),
both artboards on the `Screens` page:

| Route        | Figma frame                       |
| ------------ | --------------------------------- |
| `/`          | `Home` (`4112:1396`, 1440 × 10661) |
| `/franchise` | `Franchise` (`4128:112`, 1440 × 8254) |

```bash
pnpm install
pnpm dev --port 3400
```

## Stack

| Concern           | Choice                                                |
| ----------------- | ----------------------------------------------------- |
| Framework         | Next.js 16 (App Router) · React 19 · TypeScript        |
| Styling           | Tailwind CSS v4 (tokens in `src/app/globals.css`)      |
| Animation         | `framer-motion` (reveals, hovers, parallax)            |
| Scroll choreography | `gsap` + `ScrollTrigger` (pinned horizontal rail)    |
| Smooth scrolling  | `lenis`, driven off the GSAP ticker (one clock)        |
| Primitives        | [motion-primitives](https://motion-primitives.com) — `InView`, `InfiniteSlider`, `Tilt`, `ScrollProgress` (vendored into `src/components/motion-primitives`, imports rewritten to `framer-motion`) |
| Design guidance   | [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill, installed at `.claude/skills` |

## Design tokens

Straight from the artboard — see `@theme` in `src/app/globals.css`.

| Token            | Value     | Used for                                  |
| ---------------- | --------- | ----------------------------------------- |
| `--color-plum`   | `#4d294e` | hero, FAQ panel, footer, card 01          |
| `--color-mauve`  | `#9d5988` | primary buttons, card 02                  |
| `--color-gold`   | `#d4973c` | marquee, "Start Here" badge, blob, card 03 |
| `--color-amber`  | `#e6a002` | first product slide                       |
| `--color-ink`    | `#111111` | body copy on light                        |
| `--color-cream`  | `#f0edff` | button labels                             |
| `--color-star`   | `#faa700` | review stars                              |

### Type

| Role           | Figma                | Implementation                    |
| -------------- | -------------------- | --------------------------------- |
| Display        | **Phonk Regular DEMO** | Archivo `wdth 118 / wght 900` (substitute — see below) |
| Body           | Lato Regular / Bold  | Lato (Google Fonts)               |
| Menu & prices  | Bayon Regular        | Bayon (Google Fonts)              |
| Nav links      | Manrope Bold         | Manrope (Google Fonts)            |
| Footer wordmark | Boldonse Regular    | Boldonse (Google Fonts)           |

#### Making the display font pixel-exact

Phonk is a commercial font by [Slava Antipov](https://antipslava.gumroad.com/l/PhonkFont);
its free build is a *demo* licence, so the file is not committed here. To switch
to the real thing:

1. Get `Phonk Regular` (free demo or licensed).
2. Drop it in `public/fonts/` as `Phonk-Regular.woff2`, `.woff`, `.otf` or
   `.ttf` — the `@font-face` accepts all four, so the raw download works
   without converting. Details in `public/fonts/README.md`.

That is all — the `@font-face` rule already exists in `globals.css` and the
`--font-phonk` stack lists Phonk ahead of Archivo, so the whole site switches
over on reload with no code change.

## Section map

Each component names the Figma node it came from in its header comment.

| Component            | Figma node                         |
| -------------------- | ---------------------------------- |
| `Navbar`             | Nav - Desktop 1 (`4112:1419`)      |
| `Hero`               | Hero Section → Content (`4112:1398`) |
| `Marquee`            | Section (`4112:1397`)              |
| `ProductCarousel`    | Products (`4112:1439`)             |
| `SignatureBowls`     | Union + Title + Frame 44           |
| `VideoFeature`       | `4112:1979`                        |
| `ValueCards`         | Cards Section (`4112:1846`)        |
| `CrossTapes`         | Frame 40 (`4112:1805`)             |
| `StoreSection`       | Image Section → Content (`4112:1799`) |
| `Reviews`            | Frame 39 (`4112:1547`)             |
| `Faq`                | FAQ Section → Content (`4112:1808`) |
| `CtaSection`         | CTA Section (`4112:1546`)          |
| `Footer`             | Footer - Desktop (`4112:1505`)     |

### `/franchise`

Nav, Marquee, FAQ, CTA and Footer are the same components — the artboard reuses
those instances too, so the FAQ takes its questions as a prop.

| Component          | Figma node                        |
| ------------------ | --------------------------------- |
| `FranchiseHero`    | Hero — Franchise (`4128:133`) — copy + enquiry form |
| `FranchiseBanner`  | Banner — Açaí Franchise (`4128:155`) |
| `FranchiseSteps`   | Intro — 6 Weeks (`4128:156`) + Steps 01-03 (`4128:157-159`) |
| `FranchiseBowls`   | Meet Our Bowls (`4128:160`)       |
| `FranchiseWhy`     | Why Franchise (`4128:161`)        |
| `PartnerStories`   | Partner Stories (`4128:162`)      |

## Responsive strategy

The artboard is 1440 × 898. Two different rules apply, depending on what the
section *is*:

- **Full-bleed compositions** (hero, product panels) are **aspect-locked and
  full-width**. Every child keeps its Figma coordinate as a percentage of the
  1440 × 898 frame, so the whole composition scales as one unit — identical at
  1280, 1440 and 1920, with no dead bands at either end. Their type scales with
  the frame through container-query units (`cqw`), clamped so it stays readable
  once the layout stacks on phones.
- **Content sections** (bowls grid, cards, FAQ, footer) keep Figma's 1320
  content width, centred, and reflow by breakpoint — which is what the artboard
  implies for them.

Product panels take their height from the viewport and derive width from the
720:898 ratio, so two panels sit in frame at 1440 × 898 exactly as in Figma and
the proportion holds everywhere else, instead of hard-coding 720px and cropping
at 1920.

Two sections need a different layout on phones rather than a scaled-down one,
because the artboard pins their content at fixed percentages inside a
fixed-aspect box:

- **Video panel** — the 1320:1040 box is only ~270px tall at phone width, which
  crushed the four callout cards into unreadable 90px columns and pushed two of
  them outside the panel. Below `lg` it is a stack: heading, bowl, cards in a
  grid. (`lg:contents` on the grid wrapper lets the cards go back to absolute
  positioning against the panel at `lg`.)
- **Value cards** — the copy sits at 28% / 60% inside a 413:359 box; on a ~300px
  tall phone card that leaves it floating with dead space beneath. Below `md`
  the card sizes to its content with ordinary padding.

Verified at 1920 / 1440 / 1280 / 1024 / 768 / 540 / 430 / 390 / 360 / 320, both
routes, with no horizontal overflow at any width.

### Nav below `sm`

The artboard centres the logo between the links and the CTA, which needs each
side to fit in half the bar. At 320 the CTA is wider than that and rode over
the logo, so below `sm` the three items space out with `justify-between`
instead, the logo steps down to 48px and the CTA label to 13px. `PillButton`'s
roll animation is em-based precisely so the label can shrink without the
animation drifting.

### Tap targets

Everything interactive is ≥44px on its short edge, with two documented
exceptions: the announcement-strip dismiss control is 44 × 32 (the strip itself
is only 32px in the artboard and clips), and the Franchise consent checkbox is
a 20px mark inside a `min-h-11` clickable `<label>`, so the row is the target.

## Motion

- **Hero** — a real 3D scene: pointer position drives rotateX/rotateY on the
  stage under a 1600px perspective, and every layer (fruit, back cup, front
  cup, copy) sits at its own `translateZ`, so they separate with true
  perspective rather than a flat 2D offset. Plus line-masked headline reveal,
  spring-in fruit, per-fruit scroll parallax and a slow idle float.
- **Marquee** — `InfiniteSlider`, slows on hover.
- **Products** — the section pins and the 5-panel rail scrubs sideways. Each
  panel is a 3D card that turns on Y as it crosses the frame while its bowl
  rides forward on Z. **Centre frame is rotateY 0 / scale 1 / z 0 — pixel
  identical to the Figma panel**; depth only happens on the way in and out. The
  artwork never moves on X, so it cannot slide out of its panel.
- **Bowl cards & value cards** — `Tilt3D`: perspective on the wrapper,
  `preserve-3d` on the tilting plane, so the bowl, the title and the number
  badge genuinely lift off the card at their own depths.
- **Video panel** — pointer-tilted scene with the callout cards and the cup at
  separate Z.
- **Crossed tapes** — the two tapes counter-rotate as the section passes.
- **Buttons** — the Figma component stacks two copies of its label in a 29px
  clip box; that is a roll-up reveal, reproduced exactly (`PillButton`).
- **Reduced motion** — Lenis is skipped and the GSAP pin is disabled under
  `prefers-reduced-motion: reduce`.

### Implementation notes worth knowing

- Reveal triggers use `viewport.amount`, **not** `viewport.margin` —
  `margin` does not fire reliably in framer-motion 13.
- All `--font-*` aliases resolve on `<html>`; putting the `next/font` classes on
  `<body>` makes every alias compute to an invalid value at `:root`.
- Rotated artwork is sized to its **pre-rotation** box, not the bounding box
  Figma reports, otherwise everything renders ~15% too large.
- The scalloped "cloud" edge is one 1440 × 200 path (`ui/Scallop`), flipped as
  needed, so the bumps stay circular at any width. The Figma export of the full
  shape was 1.3 MB; this is 639 bytes.
- The berry texture is a 481-byte repeating tile
  (`public/svg/pattern-tile.svg`) on a 33px half-drop grid. **Its strength is
  per-placement, not global**: sampled off the Figma render, the product panels
  carry it at ~0.28 white (clearly readable) while the cards, FAQ, footer and
  franchise bands sit near 0.06. A single global value made the panels look
  blank. Override with `[--pattern-opacity:0.28]` on the element.
- `motion-primitives`' `Tilt` bakes `perspective()` into the element's own
  transform, which flattens its children. `ui/Tilt3D` splits perspective
  (wrapper) from `preserve-3d` (tilting plane) so descendants can use
  `translateZ`.
- A `translateZ` on a **motion** element must be passed as a motion style prop,
  not a raw `transform` string — framer overwrites `transform`.
- Position classes that only apply in the desktop composition must be
  `lg:`-scoped in the data (`VIDEO_CARDS.pos`) — a bare `left/top` still offsets
  the element once it is `relative` inside the mobile grid.
- **Never give Lenis `autoRaf: false` unless something is guaranteed to drive
  it.** The documented GSAP-ticker integration does exactly that, and if the
  instance isn't available when the ticker callback is wired up, Lenis keeps
  swallowing wheel events while never advancing — the page cannot scroll at
  all. `SmoothScroll` lets Lenis run its own RAF and only syncs ScrollTrigger.
- Don't add a blanket `* { border-color: transparent }` to reset Tailwind v4's
  `currentColor` border default: it sits after the utilities and silently wins,
  so every `border-<colour>` renders invisible.
- Depth on the product rail lives on the **artwork**, not the panels. Rotating
  or scaling the panels themselves opens visible gaps between them.
- Sections that are full-width but a fixed height (the CTA band) must size
  bleeding artwork by height + `aspect-[…]`, never by a width percentage — a
  width `%` against a fixed height stretches the art wider as the viewport
  grows. The same applies to the bleed offset: a `%` offset slices more off the
  art the wider the screen, so both CTA cups use a fixed `-10` (40px) instead.
- **GSAP owns the whole `transform`.** Animating a node that also carries
  Tailwind centring (`-translate-x-1/2`) wipes it and drops the element into a
  corner. Put positioning on a wrapper and animate a child — see the cup and
  its shadow in `VideoFeature`.
- Product panels are `w-1/2`, so exactly two are in frame at any width (the
  artboard's 2-up reading). Because a half-viewport panel is wider than the
  720:898 artboard one, the cup inside is sized by height + aspect, or it would
  stretch as the screen widens.
- `next.config.ts` trims `deviceSizes`/`imageSizes`. The stock lists generate
  ~16 variants per image, and with ~30 images `next dev` intermittently stalls
  its on-demand optimizer, leaving cups blank. Fewer variants fixed it.

## Visual regression

`scripts/screenshot.mjs` walks the page (so every observer and ScrollTrigger
fires), settles all animations, then captures a full-page PNG:

```bash
node scripts/screenshot.mjs ./out.png http://localhost:3400 1440
```

It deliberately does **not** resize the viewport to the full page height before
capturing — that would make `svh`/`vh`/`cqw` units resolve against the whole
document and distort every viewport-sized section.

## Known deviations from the artboard

- The rating on the first Home bowl card is `#f0edff` in Figma — near-white on a
  white card, which fails contrast. It is rendered in plum here like the other
  five.
- Display headings keep the diacritics in "Açaí". The artboard drops them
  ("ACAI") because Phonk has no Ç/Í, not as a deliberate choice.
- The Franchise enquiry form validates and gives feedback but has no backend —
  wire `onSubmit` in `FranchiseHero` to whatever endpoint you use.
- Partner Stories has no video file in the artboard, so it ships as the poster
  frame with a working play control.
