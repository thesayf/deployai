# Claude Code Guidelines — Deploy AI Studio marketing site

This app hosts **deployai.studio**, the marketing site for Deploy AI Studio (a boutique applied-AI consultancy). The site was designed and locked as static HTML mocks and is being ported to React page-by-page.

> **The design is NOT neubrutalist.** Any older neubrutalist convention (3px black borders, hard shadows, no radius, uppercase-everything, `SectionWrapper`) is retired. Do not reintroduce it. The old neubrutalist components/pages are sunset (kept in the tree, unimported, or moved to `src/_legacy/`) for content reference only — never import them into the new site.

## Source of truth

The locked static mocks live outside this repo at:
`~/Desktop/claudecodework/consultancyresearch/design-board/mock-*.html`

- **`mock-home.html`** and **`mock-services.html`** are the two reference pages — match them exactly (CSS values, copy verbatim, band order).
- Measured mechanism specs: `design-board/patterns/mrs/*.json`; measured clones: `design-board/patterns/clones/M##-ours.html`.
- Copy is **verbatim-stitched** from those mocks. Do not rewrite, paraphrase, or invent marketing copy — lift it exactly from the locked mock. If a mock and an older JSON disagree, the **mock wins**.

Mechanisms are referenced by number: `M##` (measured Slalom mechanisms), `P##` (home page-level patterns), `A#` (declared adaptations). When porting a section, port the mock's CSS values — do not re-derive them.

## Design tokens

Defined once in `tailwind.config.ts` (`theme.extend`) and mirrored as CSS variables in `src/styles/globals.css` (`:root`). Never hard-code these hexes in components — use the token (`bg-navy`, `text-lime`, the `--navy` var, or the ported semantic class).

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| navy | `#000A25` | | statnavy | `#020A23` |
| indigo | `#0F1C41` | | royal | `#002FAF` |
| blue | `#0C62FB` | | brightblue | `#2472FB` |
| ltblue | `#6DA1FD` | | peri | `#B6D0FE` |
| lime | `#DEFF4D` | | coral | `#FF7987` |
| cyan | `#1BE1F2` | | lavender | `#C7B9FF` |
| ink | `#292929` | | field | `#F5F5F5` |
| grey | `#696969` | | white | `#fff` |

## Typography

- **Sans**: Hanken Grotesk (weights 300 / 400 / 700) — headings are **weight 300**, not bold.
- **Serif accent**: Lora *italic* — used only for the emphasized `<em>` word inside a heading (`h2 em` → serif italic 500). Every section heading carries exactly one serif-accent word.
- Loaded via `next/font/google` in `src/fonts.ts`, wired globally in `src/pages/_app.tsx`. **No CDN font links.**
- Type ramp (responsive) lives in `globals.css`. h1: 46 → 58 → 86.4px / 300. h2: 34 → 48 → 64px / 300.

## Component conventions

New site components live in **`src/components/site/`**. Build shared chrome as **prop-driven, reusable** components — one source of truth reused across all 7 pages, never hard-coded per page:

- **`Navbar`** — `variant` (`dark` overlay on navy heroes / `light`), `links`, `cta`. Includes the mobile burger.
- **`JumpNav`** (M03) — `sections: {label, anchor}[]`; the in-page sub-nav. Section names are fully replaceable per page. (Home does not use it; diagnostic/services do.)
- **`CredBar`** — the Claude certification badge wall; `label`, `badges: {src, alt}[]`.
- **`Accordion`** (M16) — `items: {q, a}[]`; the FAQ.
- **`Footer`** (M26) — shared footer link graph + legal row.
- **`CTABand`** (M17) — coral final CTA; heading / body / CTAs / optional calendar slot.
- **`CaseProduct`** (P05/M07, LOCKED 2026-08-24) — the case-page product-proof tab panel (`site/case/CaseProduct.tsx`). Compose it for every case study; never re-derive the section. Per-surface contract: `{ label, desc, bullets[4], railName, railDesc, device: "phone"|"laptop", node }` where `node` is a self-contained screen mock **in the client's brand**. The measured anatomy (1344 panel, 420 rail, 380 media slot, 16:10 desktop shots via a 900×562 viewport, stacked equal-height panels) is documented in the component header — do not tune it per page.

Page-specific sections live in `src/components/site/<page>/` (e.g. `site/home/Hero.tsx`). Shared atoms (`.pill`/`.p-blue`/`.p-white`/`.p-ghost`/`.p-ink`, `.tert`, `.arrow`, `.pretitle`, `.wrap`, `.narrow`, band grounds `.bg-navy`/`.bg-field`/etc.) are global semantic classes in `globals.css` — reuse them, don't reinvent.

Use the installed helpers: `cn` (`src/lib/utils.ts`), `class-variance-authority`, `framer-motion`. Interactions that were vanilla JS in the mock (accordion toggle, tab switching, mobile-nav) become React state.

## Routes (pages router)

`/` (home) · `/services` · `/deployment-diagnostic` · `/data-residency` · `/about` · `/fit-check` · `/book`. Mock hrefs map `mock-<x>.html → /<x>` (home = `/`). On-page CTA anchor is `#final`. Links to pages not yet ported will 404 during the incremental build — expected.

## Asset slots

Real assets (hero photo, founder photo, badge images, product screenshots, inline calendar) are placeholders until provided. Keep the mock's dashed/labelled slot markers so open items stay visible; do not invent imagery or remove stock-image watermarks.

## SaaS — do not touch

A legacy SaaS (quiz/report/admin/mvp-planner pages + `api/*` + `lib/ai-*` + Redux store + Calendly styles in `globals.css`) is dormant in this repo. Leave it untouched and unlinked from the new site.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — linter
- `npm run type-check` — TypeScript check

## Git

Work on `feature/website-rebuild` (branched off `main`, not `master`). Feature branches, descriptive commits, PRs for review. Do not push or deploy without explicit sign-off.
