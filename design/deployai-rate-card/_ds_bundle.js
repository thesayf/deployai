/* @ds-bundle: {"format":4,"namespace":"DeployAIStudioDesignSystem_1a5dd6","components":[{"name":"Pill","sourcePath":"components/atoms/Pill.jsx"},{"name":"TextLink","sourcePath":"components/atoms/TextLink.jsx"},{"name":"CTABand","sourcePath":"components/bands/CTABand.jsx"},{"name":"ProofBand","sourcePath":"components/bands/ProofBand.jsx"},{"name":"CredBar","sourcePath":"components/chrome/CredBar.jsx"},{"name":"Footer","sourcePath":"components/chrome/Footer.jsx"},{"name":"JumpNav","sourcePath":"components/chrome/JumpNav.jsx"},{"name":"Navbar","sourcePath":"components/chrome/Navbar.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"CaseCard","sourcePath":"components/content/CaseCard.jsx"}],"sourceHashes":{"components/atoms/Pill.jsx":"a336e487cac4","components/atoms/TextLink.jsx":"908d63f83b65","components/bands/CTABand.jsx":"0dc6b78a2147","components/bands/ProofBand.jsx":"4002e133aff4","components/chrome/CredBar.jsx":"08ead7786781","components/chrome/Footer.jsx":"28d2789000b9","components/chrome/JumpNav.jsx":"9e6a9d6feed3","components/chrome/Navbar.jsx":"7256ef523800","components/content/Accordion.jsx":"2948e9c92e94","components/content/CaseCard.jsx":"193c1bb0930c","rate-card/doc-page.js":"f52ae9c02fca","ui_kits/marketing-site/Home.jsx":"3cd5fc1d1184","ui_kits/marketing-site/Services.jsx":"346ded7425d2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DeployAIStudioDesignSystem_1a5dd6 = window.DeployAIStudioDesignSystem_1a5dd6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/atoms/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Deploy AI pill button/link. Variants map to the source's .p-* classes. */
function Pill({
  variant = "blue",
  href,
  onClick,
  children,
  small = false,
  className = "",
  asLink = false,
  ...rest
}) {
  const cls = `pill p-${variant}${small ? " nav-cta" : ""}${className ? " " + className : ""}`;
  if (onClick && !href && !asLink) return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    onClick: onClick
  }, rest), children);
  return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href ?? "#",
    onClick: onClick
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/atoms/Pill.jsx", error: String((e && e.message) || e) }); }

// components/atoms/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tertiary text link (.tert) and arrow link (.arrow). kind="tert"|"arrow"; tone="blue"|"dark"|"ink". */
function TextLink({
  kind = "tert",
  tone = "blue",
  href = "#",
  children,
  ...rest
}) {
  const cls = kind === "arrow" ? "arrow" : `tert${tone !== "blue" ? " " + tone : ""}`;
  return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/atoms/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/bands/CTABand.jsx
try { (() => {
/** M17 final CTA — the one warm (coral) band. Copy left, calendar card right. */
function CTABand({
  id = "final",
  heading,
  paragraphs = [],
  ctas = [],
  fineNote,
  calendarSlot
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-coral",
    id: id
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap final"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, heading), paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: i === 0 ? {
      marginTop: 18
    } : undefined
  }, p)), fineNote && /*#__PURE__*/React.createElement("p", {
    className: "fine"
  }, fineNote), /*#__PURE__*/React.createElement("div", {
    className: "ctas"
  }, ctas.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.label,
    href: c.href,
    className: c.className
  }, c.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cal-ph"
  }, calendarSlot ?? /*#__PURE__*/React.createElement("span", {
    className: "slot-label"
  }, "INLINE CALENDAR EMBED"))));
}
Object.assign(__ds_scope, { CTABand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/bands/CTABand.jsx", error: String((e && e.message) || e) }); }

// components/bands/ProofBand.jsx
try { (() => {
/** P09 proof / stat band — prose column + big light-weight stat numerals (lime on statnavy, navy on lavender). */
function ProofBand({
  credStrip,
  heading,
  prose = [],
  statsIntro,
  stats = [],
  fine,
  ground = "statnavy"
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, credStrip && credStrip.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "credband"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cred"
  }, credStrip.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, c))))), /*#__PURE__*/React.createElement("section", {
    className: ground === "lavender" ? "bg-lavender" : "bg-statnavy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap p9"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h3t"
  }, heading), prose.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "statscol"
  }, statsIntro && /*#__PURE__*/React.createElement("div", {
    className: "intro"
  }, statsIntro), /*#__PURE__*/React.createElement("div", {
    className: "rows"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "srow",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, s.d)))), fine && /*#__PURE__*/React.createElement("div", {
    className: "fine"
  }, fine)))));
}
Object.assign(__ds_scope, { ProofBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/bands/ProofBand.jsx", error: String((e && e.message) || e) }); }

// components/chrome/CredBar.jsx
try { (() => {
/** Claude certification badge wall. Badges render as images when `src` given, else text badges. Grayscale → colour on hover. */
function CredBar({
  label = "Anthropic partner · Claude certified",
  badges = []
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "cred-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "creds-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "creds-row"
  }, badges.map(b => b.src ? /*#__PURE__*/React.createElement("img", {
    loading: "lazy",
    key: b.alt,
    className: "cred-badge",
    src: b.src,
    alt: b.alt
  }) : /*#__PURE__*/React.createElement("span", {
    key: b.alt,
    className: "cred-badge-text"
  }, b.alt)))));
}
Object.assign(__ds_scope, { CredBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/CredBar.jsx", error: String((e && e.message) || e) }); }

// components/chrome/Footer.jsx
try { (() => {
const defaultColumns = [{
  title: "Start",
  links: [{
    label: "AI Fit Check",
    href: "#"
  }, {
    label: "Deployment Diagnostic",
    href: "#"
  }, {
    label: "Book a call",
    href: "#"
  }]
}, {
  title: "Firm",
  links: [{
    label: "Services",
    href: "#"
  }, {
    label: "About",
    href: "#"
  }]
}, {
  title: "Trust",
  links: [{
    label: "Data Residency",
    href: "#"
  }, {
    label: "Contact",
    href: "#"
  }, {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rudi-hinds-3b25b6137/"
  }]
}];

/** Site footer — royal columns band + indigo legal strip. */
function Footer({
  columns = defaultColumns,
  tagline,
  legalName = "Hinds Tech and Artificial Intelligence LLC"
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "foot-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap foot-cols"
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-title"
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    className: "foot-link",
    href: l.href
  }, l.label)), col.title === "Trust" && tagline && /*#__PURE__*/React.createElement("div", {
    className: "foot-tag"
  }, tagline))))), /*#__PURE__*/React.createElement("div", {
    className: "foot-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, "\xA9 2026 ", legalName, " \xB7 ", /*#__PURE__*/React.createElement("a", {
    className: "foot-link",
    href: "#"
  }, "Privacy"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/Footer.jsx", error: String((e && e.message) || e) }); }

// components/chrome/JumpNav.jsx
try { (() => {
const {
  useEffect,
  useRef,
  useState
} = React;
/** M03 in-page jump-nav (periwinkle cleanser band). Sticks on scroll; optional CTA fades in when stuck. */
function JumpNav({
  sections = [],
  cta
}) {
  const sentinelRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 0
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: sentinelRef,
    "aria-hidden": "true",
    className: "jn-sentinel"
  }), /*#__PURE__*/React.createElement("div", {
    className: "jn" + (stuck ? " jn-stuck" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jn-links"
  }, sections.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.anchor,
    href: s.anchor
  }, s.label))), cta && /*#__PURE__*/React.createElement("a", {
    className: "jn-cta",
    href: cta.href
  }, cta.label))));
}
Object.assign(__ds_scope, { JumpNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/JumpNav.jsx", error: String((e && e.message) || e) }); }

// components/chrome/Navbar.jsx
try { (() => {
const {
  useState,
  useEffect
} = React;
const defaultNav = [{
  label: "Services",
  href: "#services"
}, {
  label: "Deployment Diagnostic",
  href: "#diagnostic"
}, {
  label: "Data Residency",
  href: "#residency"
}, {
  label: "About",
  href: "#about"
}];
const defaultCta = {
  label: "Free AI Fit Check",
  href: "#fit-check"
};

/** Site header — transparent overlay for navy heroes (dark, default) or solid light variant. */
function Navbar({
  links = defaultNav,
  cta = defaultCta,
  variant = "dark",
  ctaVariant = "p-ghost",
  logoBase = "../../assets"
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: (variant === "light" ? "nav-light " : "") + (open ? "open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap nav-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Deploy AI Studio home"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    src: `${logoBase}/${variant === "light" ? "deployai_logo_dark.png" : "deployai_logo_light.png"}`,
    alt: "deployAI.studio"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    "aria-label": "Open menu",
    "aria-expanded": open,
    onClick: () => setOpen(v => !v)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", null, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    href: l.href,
    className: "nav-link",
    onClick: () => setOpen(false)
  }, l.label)), /*#__PURE__*/React.createElement("a", {
    href: cta.href,
    className: `pill ${ctaVariant} nav-cta`,
    onClick: () => setOpen(false)
  }, cta.label))));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
const {
  useState
} = React;
/** M16 FAQ accordion. Items toggle independently; grid-rows collapse animation. */
function Accordion({
  items = []
}) {
  const [open, setOpen] = useState(() => new Set());
  function toggle(i) {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "acc"
  }, items.map((item, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: item.q,
      className: "acc-item" + (isOpen ? " open" : "")
    }, /*#__PURE__*/React.createElement("button", {
      className: "acc-btn",
      "aria-expanded": isOpen,
      onClick: () => toggle(i)
    }, /*#__PURE__*/React.createElement("span", {
      className: "acc-icon",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "14",
      viewBox: "0 0 22 14",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 2 L11 11.5 L20 2",
      stroke: "currentColor",
      strokeWidth: "2.5",
      fill: "none"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "acc-title"
    }, item.q)), /*#__PURE__*/React.createElement("div", {
      className: "acc-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "acc-clip"
    }, /*#__PURE__*/React.createElement("p", null, item.a))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/CaseCard.jsx
try { (() => {
/** M25 case-study flip card (.sc-cards family). Front: portrait shot + title + serif client. Hover: accent ground + outcome. Wrap cards in <div className="sc-cards"><div className="sc-row">…</div></div>. */
function CaseCard({
  img,
  pos,
  href = "#",
  title,
  client,
  desc,
  sector,
  metric
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "scard scard-link"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sc-front"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sc-img"
  }, /*#__PURE__*/React.createElement("img", {
    loading: "lazy",
    className: "sc-shot",
    src: img,
    alt: `${client} — ${title}`,
    style: pos ? {
      objectPosition: pos
    } : undefined
  })), /*#__PURE__*/React.createElement("p", {
    className: "sc-tag"
  }, "Case study"), /*#__PURE__*/React.createElement("h3", {
    className: "sc-title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "sc-client"
  }, client)), /*#__PURE__*/React.createElement("div", {
    className: "sc-back"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "sc-tag"
  }, "Case study"), /*#__PURE__*/React.createElement("p", {
    className: "sc-desc"
  }, desc), /*#__PURE__*/React.createElement("p", {
    className: "sc-meta"
  }, /*#__PURE__*/React.createElement("b", null, "Sector"), sector)), /*#__PURE__*/React.createElement("div", {
    className: "sc-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-read"
  }, "Read the story \u2192"), /*#__PURE__*/React.createElement("span", {
    className: "sc-metric"
  }, metric))));
}
Object.assign(__ds_scope, { CaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CaseCard.jsx", error: String((e && e.message) || e) }); }

// rate-card/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "rate-card/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Home.jsx
try { (() => {
const DS = window.DeployAIStudioDesignSystem_1a5dd6;
const {
  Navbar,
  CredBar,
  ProofBand,
  CaseCard,
  Accordion,
  CTABand,
  Footer,
  Pill,
  TextLink
} = DS;
const services = [{
  name: "AI Proof of Value",
  line: "Prove one AI use case pays, before you commit to more."
}, {
  name: "Claude Code Enablement",
  line: "Turn Claude Code licences into measured engineering delivery."
}, {
  name: "Legacy Modernisation",
  line: "Get off the legacy system without losing what it knows."
}, {
  name: "AI Readiness Assessment",
  line: "Know exactly where you stand, and what to do first."
}, {
  name: "AI Workshops",
  line: "Get your teams genuinely good at AI, on their own work."
}, {
  name: "AI Adoption & Change Management",
  line: "Turn deployed AI tools into daily habits."
}, {
  name: "Shadow AI Assessment",
  line: "Know what AI your staff already use, and make it safe."
}, {
  name: "Managed AI Services",
  line: "Keep your production AI working, safe, and improving."
}];
const pains = [{
  h: "\u201CWe know AI matters. We do not know where it applies to us.\u201D",
  p: "You have read the case studies. None of them are your business. The ROI is not clear, the scope feels enormous, and the last thing you need is a six-month strategy engagement before a single line of code gets written."
}, {
  h: "\u201CWe keep paying more for AI. Is it actually working?\u201D",
  p: "The tools are in real use and the bills climb every month. What is missing is a straight answer on impact: whether it is paying off, and where the money is going."
}, {
  h: "\u201COur pilot never made it to production.\u201D",
  p: "Getting a model running is the easy part. Making it work inside your systems is the job. Prototypes that perform brilliantly in controlled demos collapse the moment they connect to real production systems, real data, and real edge cases."
}];
const faqs = [{
  q: "How fast can we start?",
  a: "Most engagements start within two weeks of the first call. The Fit Check is instant and free."
}, {
  q: "Do you only work with Claude?",
  a: "We are Anthropic partners and Claude certified, and we recommend the right tool for the job. Most production deployments we ship run on Claude."
}, {
  q: "What if AI is not a fit for us?",
  a: "We tell you. The Fit Check exists to route you away from work you do not need. No obligation either way."
}];
function Home({
  nav = () => {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(Navbar, {
    logoBase: "../../assets"
  }), /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap inner"
  }, /*#__PURE__*/React.createElement("h1", null, "We put AI to work inside", /*#__PURE__*/React.createElement("br", null), "your business."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "You know AI matters. We show you where it fits and make it work."), /*#__PURE__*/React.createElement("div", {
    className: "ctas"
  }, /*#__PURE__*/React.createElement(Pill, {
    variant: "white",
    href: "#fit-check"
  }, "Take the free AI Fit Check"), /*#__PURE__*/React.createElement(Pill, {
    variant: "ghost",
    href: "#services",
    onClick: e => {
      e.preventDefault();
      nav("services");
    },
    asLink: true
  }, "See solutions")))), /*#__PURE__*/React.createElement(CredBar, {
    label: "Anthropic Partner Network \\u00B7 Claude Certified",
    badges: [{
      alt: "Anthropic Partner",
      src: "../../assets/badges/partner-logo.png"
    }, {
      alt: "Claude Certified Architect",
      src: "../../assets/badges/architect-pro-logo.png"
    }, {
      alt: "Architect Foundations",
      src: "../../assets/badges/architect-foundations-logo.png"
    }, {
      alt: "Claude Developer",
      src: "../../assets/badges/developer-logo.png"
    }, {
      alt: "Claude Associate",
      src: "../../assets/badges/associate-logo.png"
    }]
  }), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Three things we ", /*#__PURE__*/React.createElement("em", null, "hear"), " every week."), /*#__PURE__*/React.createElement("div", {
    className: "cards3"
  }, pains.map(c => /*#__PURE__*/React.createElement("div", {
    className: "pain-card",
    key: c.h
  }, /*#__PURE__*/React.createElement("h3", null, c.h), /*#__PURE__*/React.createElement("p", null, c.p)))))), /*#__PURE__*/React.createElement("section", {
    className: "svc bg-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Start ", /*#__PURE__*/React.createElement("em", null, "anywhere"), "."), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "From proving the first use case to running AI in production."), /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid20"
  }, services.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name
  }, /*#__PURE__*/React.createElement("h4", null, s.name), /*#__PURE__*/React.createElement("div", {
    className: "xr"
  }), /*#__PURE__*/React.createElement("p", null, s.line)))), /*#__PURE__*/React.createElement("div", {
    className: "more"
  }, /*#__PURE__*/React.createElement("a", {
    className: "arrow",
    href: "#services",
    onClick: e => {
      e.preventDefault();
      nav("services");
    }
  }, "See all services")))), /*#__PURE__*/React.createElement(ProofBand, {
    ground: "lavender",
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, "Everyone's using AI. Almost nobody's ", /*#__PURE__*/React.createElement("em", null, "winning"), " with it."),
    prose: ["The problem was never the model. It's that AI rarely reaches the actual work.", /*#__PURE__*/React.createElement(React.Fragment, null, "We're practitioners. We've spent years building AI and automation that runs inside real businesses, not slide decks about it, and we get it past the pilot. ", /*#__PURE__*/React.createElement(TextLink, {
      href: "#fit-check"
    }, "Start with the free Fit Check"))],
    statsIntro: "The gap, in numbers",
    stats: [{
      n: "88%",
      d: "of companies now use AI. Only about 6% get real value from it. (McKinsey, 2025)"
    }, {
      n: "95%",
      d: "of AI pilots deliver no measurable return. (MIT Project NANDA, 2025)"
    }, {
      n: "42%",
      d: "now scrap most of their AI projects, up from 17% a year ago. (S&P Global, 2025)"
    }]
  }), /*#__PURE__*/React.createElement("section", {
    className: "bg-navy facet about-cases"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Deployed. In production. ", /*#__PURE__*/React.createElement("em", null, "Working.")), /*#__PURE__*/React.createElement("p", {
    className: "case-intro"
  }, "Real systems running inside real businesses."), /*#__PURE__*/React.createElement("div", {
    className: "sc-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sc-row"
  }, /*#__PURE__*/React.createElement(CaseCard, {
    img: "../../assets/case-jb.jpg",
    pos: "50% 30%",
    title: "A booking assistant that never sleeps",
    client: "JB Luxe Detailing",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "Bookings tripled. An assistant, CRM and diary now run the whole client journey."),
    sector: "Automotive services",
    metric: "Replies in 30 seconds"
  }), /*#__PURE__*/React.createElement(CaseCard, {
    img: "../../assets/case-showcase.jpg",
    pos: "50% 40%",
    title: "AI scheduling across the chain",
    client: "Showcase Cinemas",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "Weekly scheduling fell from forty hours to under two, and revenue per screen rose ", /*#__PURE__*/React.createElement("b", null, "18%"), "."),
    sector: "Cinema operations",
    metric: "Live in 4 weeks"
  }), /*#__PURE__*/React.createElement(CaseCard, {
    img: "../../assets/case-centric.jpg",
    pos: "30% 35%",
    title: "Tenders out in days",
    client: "Centric Community Research",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "A research and proposal platform. Proposals that once took weeks now take ", /*#__PURE__*/React.createElement("b", null, "fifteen minutes"), "."),
    sector: "Community research",
    metric: "Knowledge on demand"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-field faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Fair ", /*#__PURE__*/React.createElement("em", null, "questions"), "."), /*#__PURE__*/React.createElement(Accordion, {
    items: faqs
  }))), /*#__PURE__*/React.createElement(CTABand, {
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, "Ready when ", /*#__PURE__*/React.createElement("em", null, "you"), " are."),
    paragraphs: ["Book a 30-minute call. We'll tell you where AI fits your business, and where it doesn't."],
    fineNote: "No obligation. A senior consultant, not a sales rep.",
    ctas: [{
      label: "Book a call",
      href: "#book",
      className: "pill p-ink"
    }, {
      label: "Take the Fit Check first",
      href: "#fit-check",
      className: "tert ink"
    }]
  }), /*#__PURE__*/React.createElement(Footer, null));
}
window.MarketingHome = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Services.jsx
try { (() => {
const DS2 = window.DeployAIStudioDesignSystem_1a5dd6;
const {
  Navbar: SNavbar,
  JumpNav: SJumpNav,
  ProofBand: SProofBand,
  Accordion: SAccordion,
  CTABand: SCTABand,
  Footer: SFooter,
  Pill: SPill
} = DS2;
const ladder = [{
  num: "01",
  name: "AI Fit Check",
  meta: "Free \u00B7 Instant",
  p: "A short assessment that tells you whether AI fits your business, and where to start. No call required."
}, {
  num: "02",
  name: "Deployment Diagnostic",
  meta: "2 weeks \u00B7 Fixed fee",
  p: "A two-week engagement that maps your highest-value AI use case and hands you a build-ready plan.",
  feature: true
}, {
  num: "03",
  name: "Build & Deploy",
  meta: "4\u201312 weeks",
  p: "We build the system, connect it to your stack, and get it into production with your team."
}, {
  num: "04",
  name: "Managed AI Services",
  meta: "Ongoing",
  p: "Keep your production AI working, safe, and improving month over month."
}];
const svcFaqs = [{
  q: "What does an engagement cost?",
  a: "The Fit Check is free. The Deployment Diagnostic is a fixed fee agreed up front. Builds are scoped from the diagnostic, so there are no open-ended estimates."
}, {
  q: "Who does the work?",
  a: "Senior practitioners. The people you meet on the first call are the people who build and ship the system."
}];
function Services({
  nav = () => {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(SNavbar, {
    logoBase: "../../assets"
  }), /*#__PURE__*/React.createElement("section", {
    className: "ihero svc-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ihero-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ihero-scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Services"), /*#__PURE__*/React.createElement("h1", null, "From first use case to ", /*#__PURE__*/React.createElement("em", null, "production"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Eight services, one path: prove the value, build the system, keep it working."), /*#__PURE__*/React.createElement("div", {
    className: "ctas",
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(SPill, {
    variant: "white",
    href: "#ladder"
  }, "See the path"), /*#__PURE__*/React.createElement(SPill, {
    variant: "ghost",
    href: "#home",
    onClick: e => {
      e.preventDefault();
      nav("home");
    },
    asLink: true
  }, "Back to home")))), /*#__PURE__*/React.createElement(SJumpNav, {
    sections: [{
      label: "The path",
      anchor: "#ladder"
    }, {
      label: "Evidence",
      anchor: "#evidence"
    }, {
      label: "FAQ",
      anchor: "#svc-faq"
    }],
    cta: {
      label: "Let's talk",
      href: "#final"
    }
  }), /*#__PURE__*/React.createElement("section", {
    className: "ladder-head",
    id: "ladder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Start ", /*#__PURE__*/React.createElement("em", null, "anywhere"), ". Most start here."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Each step stands alone. Together they take you from \u201Cdoes AI fit?\u201D to AI running in production."), /*#__PURE__*/React.createElement("div", {
    className: "ladder"
  }, ladder.map(s => /*#__PURE__*/React.createElement("div", {
    className: "lstep" + (s.feature ? " feature" : ""),
    key: s.num
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, s.num), /*#__PURE__*/React.createElement("h6", null, s.name), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, s.meta), /*#__PURE__*/React.createElement("p", null, s.p), /*#__PURE__*/React.createElement("a", {
    className: "pill " + (s.feature ? "p-ghost" : "p-ink"),
    href: "#final"
  }, "Learn more")))))), /*#__PURE__*/React.createElement("div", {
    id: "evidence"
  }, /*#__PURE__*/React.createElement(SProofBand, {
    ground: "lavender",
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, "The ", /*#__PURE__*/React.createElement("em", null, "evidence"), " ledger."),
    prose: ["Numbers from systems we have shipped and still run."],
    statsIntro: "Across live client deployments",
    stats: [{
      n: "3\u00D7",
      d: "bookings after a client-journey assistant went live. (JB Luxe Detailing)"
    }, {
      n: "40\u21922h",
      d: "weekly scheduling hours across a cinema chain. (Showcase Cinemas)"
    }, {
      n: "15 min",
      d: "to produce proposals that took weeks. (Centric Community Research)"
    }]
  })), /*#__PURE__*/React.createElement("section", {
    className: "bg-field faq",
    id: "svc-faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Fair ", /*#__PURE__*/React.createElement("em", null, "questions"), "."), /*#__PURE__*/React.createElement(SAccordion, {
    items: svcFaqs
  }))), /*#__PURE__*/React.createElement(SCTABand, {
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, "Not sure where to ", /*#__PURE__*/React.createElement("em", null, "start"), "?"),
    paragraphs: ["Take the free Fit Check, or book a call and we'll route you to the right step."],
    fineNote: "No obligation. A senior consultant, not a sales rep.",
    ctas: [{
      label: "Book a call",
      href: "#book",
      className: "pill p-ink"
    }, {
      label: "Take the Fit Check",
      href: "#fit-check",
      className: "tert ink"
    }]
  }), /*#__PURE__*/React.createElement(SFooter, null));
}
window.MarketingServices = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.CTABand = __ds_scope.CTABand;

__ds_ns.ProofBand = __ds_scope.ProofBand;

__ds_ns.CredBar = __ds_scope.CredBar;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.JumpNav = __ds_scope.JumpNav;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.CaseCard = __ds_scope.CaseCard;

})();
