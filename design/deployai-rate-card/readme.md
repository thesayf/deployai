# Deploy AI Studio — Design System

The visual system for **deployai.studio**, an AI consultancy (Hinds Tech and Artificial Intelligence LLC) that deploys AI inside real businesses — Fit Checks, Deployment Diagnostics, Claude enablement, legacy modernisation, managed AI services. Anthropic partner; Claude Certified Architect credentials.

**Source**: attached local codebase `deployai/` (Next.js marketing site). Authoritative files: `src/styles/globals.css` (all measured CSS, ported verbatim here), `src/components/site/**` (current components), `src/fonts.ts`, `public/site/**` (assets), `design_system.md` (design guide).

**IMPORTANT — one system only.** The current design language is a measured, Slalom-derived editorial system (light-weight type, ground rhythm, pills). The earlier **neubrutalist system is retired** (`color_palette.md`, `src/_legacy`, shadow-brutal, orange/red palette, thick black borders, uppercase everywhere): never reintroduce it.

## Content fundamentals

- **Voice**: plain, direct, confident practitioner. Short declaratives. "We put AI to work inside your business." / "You know AI matters. We show you where it fits and make it work."
- **I/you**: first-person plural "we" for the firm, "you/your" for the client. Never "users" or third person.
- **Honesty as a device**: sections literally named "The honest part"; fine print like "No obligation. A senior consultant, not a sales rep."
- **Pain copy quotes the client**: pain-card headings are client quotes in curly quotes — "Our pilot never made it to production."
- **Stats are attributed**: "95% of AI pilots deliver no measurable return. (MIT Project NANDA, 2025)".
- **Casing**: sentence case everywhere except uppercase tracked labels (pretitles, jump-nav, footer column titles). No title case in headings.
- **Serif accent**: exactly ONE italicized word per major heading, wrapped in `<em>` — "Three things we *hear* every week." Never more than one.
- **No emoji, ever.** No exclamation marks. British spelling appears (modernisation, licences).
- **CTAs are verbs with an article of value**: "Take the free AI Fit Check", "See solutions", "Start with the free Fit Check".

## Visual foundations

- **Color**: CSS vars only (`tokens/colors.css`) — never hard-code a hex. Core: `--blue #0C62FB` (links, primary pills), `--royal #002FAF` (hover, footer band), `--navy #000A25` (dark grounds), `--indigo #0F1C41`, `--peri #B6D0FE` (cleanser bands, muted text on dark), `--lime #DEFF4D` (the accent THREAD: nav underline, stat numerals, photo underlines — never a ground except thin breather strips), `--coral #FF7987` (the ONE warm moment: final CTA band), `--lavender #C7B9FF` (alt stat ground), `--cyan #1BE1F2`, `--ink #292929`, `--field #F5F5F5`, `--grey #696969`, statnavy `#020A23` (proof band).
- **Ground rhythm carries the page**: white → field → navy → royal/statnavy accent → coral final CTA. Never two dense dark bands adjacent; lighter bands cleanse between.
- **Type**: Hanken Grotesk — headings weight **300** (light, huge: h1 86.4/90.72 desktop, h2 64/76.8), body 400 16/28, leads 20/32, labels/pills/nav 700. Lora italic 500 only for the single `<em>` accent word. Pretitles: 16/700, +2px tracking, uppercase.
- **Layout**: `.wrap` max 1720px, `.narrow` 1456px; gutters 24→32→48px; section rhythm 48→96px vertical.
- **Backgrounds**: full-bleed photo heroes under a navy scrim gradient (left-dark, text-protecting); solid color bands elsewhere. Optional `.facet` texture (faceted-chevron SVG art) on dark bands. Photos are cool-toned, business-real; team photos grayscale → color on hover.
- **Radii**: pills 50px; large cards/panels 30px; rails/schematics 16–20px; case cards 0 0 30px 30px (square top); dashed blueprint blocks 2px. No global small-radius habit.
- **Borders**: 2px solid on pills; 1px hairlines (#ccc / rgba(0,10,37,.5)) for rules and accordions; 1.5px dashed blue for blueprint/question blocks.
- **Shadows**: rare and soft — `0 14px 40px rgba(0,10,37,.10)` on hovered ladder cards, `0 2px 8px rgba(0,10,37,.15)` on the calendar card. Never hard offset shadows.
- **Hover states**: pills darken (blue→royal) or tint (white→peri); text links darken; ladder cards lift `translateY(-4px)` + shadow; case cards cross-fade to a flat accent ground (positional 5-token cycle peri/cyan/coral/lavender/lime); grayscale imagery colorizes.
- **Motion**: 0.2–0.3s eases; accordion uses grid-rows collapse with `cubic-bezier(.65,0,.35,1)`; hero has slow animated flow lines (dash offset). `prefers-reduced-motion` always respected. No bounces.
- **Focus**: `0 0 0 2px #fff, 0 0 0 4px var(--ltblue)` ring.

## Iconography

- **No icon font, no icon library.** Icons are minimal inline SVG strokes: 2–2.5px stroke, round caps, `currentColor`/token strokes (accordion chevron, section line-icons in 80px bordered tiles, tick marks `stroke:var(--blue)`).
- The `→` arrow is a unicode character (`.arrow::after`), not an SVG.
- Real art assets are copied into `assets/`: brand logos (`deployai_logo_light.png` for dark grounds, `deployai_logo_dark.png` for light), 5 Anthropic/Claude credential badges (`assets/badges/`), LinkedIn glyph, `facet-art.svg` band texture, hero photos, case-study shots.
- No emoji as icons.

## Fonts

Hanken Grotesk (300/400/700) + Lora (italic 400/500/700), loaded from Google Fonts CDN (`tokens/fonts.css`). The production site uses the same Google families via next/font; no local binaries exist in the codebase.

## Index

- `styles.css` — global entry (imports everything below)
- `tokens/` — `colors.css`, `typography.css`, `fonts.css`, `site.css` (all measured atoms + mechanisms, ported verbatim)
- `assets/` — logos, credential badges, facet texture, hero + case photos
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/atoms/` — Pill, TextLink
- `components/chrome/` — Navbar, Footer, CredBar, JumpNav
- `components/bands/` — ProofBand, CTABand
- `components/content/` — Accordion, CaseCard
- `ui_kits/marketing-site/` — home + services page recreations
- `SKILL.md` — agent skill entry point

**Intentional additions**: `Pill` and `TextLink` wrap the source's global CSS atoms (`.pill`, `.tert`/`.arrow`) — the codebase applies these classes directly to links rather than via components.

**Component inventory** = the source's shared site components (`src/components/site/`): Navbar, Footer, CredBar, JumpNav, Accordion, CTABand, ProofBand, CaseCard. Page sections (heroes, pain cards, service grids…) are page-scoped in the source and live here as UI-kit screens, not primitives.
