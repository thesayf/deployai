# Deploy AI Studio — Design System

The visual system for the deployai.studio marketing site. It is a measured clone of Slalom's design language (grounds, type ramp, mechanisms), carrying Deploy AI Studio's own palette and copy. **It is not neubrutalist** — the previous neubrutalist system (bold black borders, hard shadows, zero radius, uppercase) is retired and must not be reintroduced.

The authoritative implementation is the locked static mock **`mock-home.html`** (and `mock-services.html`) in
`~/Desktop/claudecodework/consultancyresearch/design-board/`, plus the measured specs in `design-board/patterns/mrs/*.json` and clones in `design-board/patterns/clones/`. When this document and a mock disagree, the **mock wins** — port its exact CSS values.

## Color

CSS variables (`:root` in `globals.css`) and Tailwind tokens (`theme.extend.colors`) are the single source. Never hard-code a hex in a component.

```
--blue:#0C62FB   --royal:#002FAF   --navy:#000A25   --indigo:#0F1C41
--ltblue:#6DA1FD --brightblue:#2472FB --peri:#B6D0FE --lime:#DEFF4D --coral:#FF7987
--cyan:#1BE1F2   --red:#FF4D5F     --lavender:#C7B9FF
--ink:#292929    --white:#fff      --field:#F5F5F5   --grey:#696969
statnavy:#020A23 (proof band ground)
```

**Grounds** carry the page rhythm: white → `field` (#F5F5F5) → `navy` → `royal`/`statnavy` accent → `coral` (final CTA). Dark bands spread with lighter bands between (offering rhythm), never two dense dark bands adjacent. Lime is a recurring accent thread (hero motion, nav underline, week/stat numbers), not a ground.

## Typography

- **Sans**: Hanken Grotesk — 300 (headings + hero/section leads), 400 (body, tabs, footer links), 700 (bold leads, labels, pills, nav).
- **Serif accent**: Lora *italic* — the single emphasized word in each heading only (`h2 em`: serif italic, weight 500, letter-spacing −.01em).
- Loaded through `next/font/google` (`src/fonts.ts`), wired in `_app.tsx`. No external font links.

Type ramp (mobile → sm 640 → lg 1024), all in `globals.css`:

| Element | Mobile | ≥640 | ≥1024 | Weight |
|---|---|---|---|---|
| h1 | 46 / 1.26 | 58 | 86.4 / 90.72 | 300 |
| h2 | 34 / 1.24 | 48 | 64 / 76.8 | 300 |
| `.h3t` | — | — | 48 / 60 | 300 |
| body | 16 / 1.75 | | | 400 |
| lead / prose | 20 / 32 | | | 400 |
| `.pretitle` | 16, +2 tracking, uppercase | | | 700 |

## Layout

- `.wrap` — max-width 1720px, gutters 24 → 32 → 48px.
- `.narrow` — max-width 1456px, same gutters (single-column prose sections).
- `section` — vertical rhythm 48px → 96px (≥1024).

## Atoms (global semantic classes)

- **Pills** (`.pill` + variant): `.p-blue` (blue→royal hover), `.p-white` (white→peri), `.p-ghost` (outline on dark), `.p-ink` (outline on light). 48px, radius 50px, 2px border, weight 700. Focus ring: 2px white + 2px ltblue.
- **Text links**: `.tert` (blue, `.dark` and `.ink` context variants) and `.arrow` (adds `→`).
- `.pretitle` — uppercase tracked label.

## Mechanisms used on Home

`P01` motion hero (navy, animated flow lines + photo scrim) · credential badge wall (`CredBar`) · pain cards (M21 bold-lead text cells, not serif pull-quotes) · `P04` journey path (navy, inline SVG with decision gates) · `P05` tabbed offers (white, M07) · `P09` proof stat band (statnavy, lime numbers) · `P07` data-residency dashed question blocks (field) · `P11` founder card (navy) · how-we-work prose (white) · `M16` FAQ accordion (field) · `M17` final CTA (coral).

`M03` jump-nav (periwinkle 56px band, uppercase tracked anchors) is a diagnostic/services mechanism, built as the reusable `JumpNav` component but not used on Home.

## Discipline

1. Port mock CSS values exactly — do not re-derive or "improve".
2. Copy is verbatim from the locked mock — never paraphrase or invent.
3. One serif-accent word per heading.
4. Reusable chrome is prop-driven and shared across pages; page sections are page-scoped.
5. Keep asset slot markers until real assets arrive; never remove stock-image watermarks.
