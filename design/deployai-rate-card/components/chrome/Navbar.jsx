import React, { useState, useEffect } from "react";

const defaultNav = [
  { label: "Services", href: "#services" },
  { label: "Deployment Diagnostic", href: "#diagnostic" },
  { label: "Data Residency", href: "#residency" },
  { label: "About", href: "#about" },
];
const defaultCta = { label: "Free AI Fit Check", href: "#fit-check" };

/** Site header — transparent overlay for navy heroes (dark, default) or solid light variant. */
export function Navbar({ links = defaultNav, cta = defaultCta, variant = "dark", ctaVariant = "p-ghost", logoBase = "../../assets" }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className={(variant === "light" ? "nav-light " : "") + (open ? "open" : "")}>
      <div className="wrap nav-row">
        <div className="logo">
          <a href="#" aria-label="Deploy AI Studio home">
            <img className="logo-img" src={`${logoBase}/${variant === "light" ? "deployai_logo_dark.png" : "deployai_logo_light.png"}`} alt="deployAI.studio" />
          </a>
        </div>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(v => !v)}><span /><span /><span /></button>
        <nav>
          {links.map(l => <a key={l.href + l.label} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href={cta.href} className={`pill ${ctaVariant} nav-cta`} onClick={() => setOpen(false)}>{cta.label}</a>
        </nav>
      </div>
    </header>
  );
}
