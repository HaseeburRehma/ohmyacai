# Drop Phonk here

The Figma file sets every display heading, button, badge and footer link in
**Phonk Regular** (Slava Antipov). It isn't committed — the free build is a
*demo* licence, so it can't be redistributed in this repo.

## To go pixel-exact

1. Download Phonk — free demo: <https://antipslava.gumroad.com/l/PhonkFont> ·
   full licence: <https://www.myfonts.com/fonts/slava-antipov/phonk/>
2. Put the **Regular** weight in this folder, named `Phonk-Regular` with any of
   these extensions:

   ```
   public/fonts/Phonk-Regular.woff2   ← best (smallest)
   public/fonts/Phonk-Regular.woff
   public/fonts/Phonk-Regular.otf     ← works as-is, no conversion needed
   public/fonts/Phonk-Regular.ttf
   ```

3. Reload. That's it — no code change.

`globals.css` already declares the `@font-face`, and `--font-phonk` lists Phonk
ahead of the Archivo fallback, so every `.font-display` element switches over at
once. Until a file is present the browser skips the rule and Archivo is used.

To convert `.otf` → `.woff2` (optional, ~70% smaller):

```bash
npx --yes ttf2woff2 < Phonk-Regular.otf > Phonk-Regular.woff2
```

## Checking it took effect

```bash
pnpm dev --port 3400
node scripts/screenshot.mjs ./after.png http://localhost:3400 1440
```

The headline "FRESHLY BLENDED MOMENTS" should gain Phonk's wider, soft-cornered
letterforms, and the gold "START HERE" badge should grow to ~470px wide to match
the artboard.
