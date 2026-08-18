import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "./SiteLink";
import { primaryNav, primaryCta, type NavItem } from "./nav-config";

type NavbarProps = {
  links?: NavItem[];
  cta?: NavItem;
  /** "dark" = transparent overlay for navy heroes (default); "light" = solid on light grounds. */
  variant?: "dark" | "light";
  /** Pill variant for the CTA. Defaults to ghost (outline-on-dark) to match the hero overlay. */
  ctaVariant?: "p-ghost" | "p-blue" | "p-white";
};

export function Navbar({
  links = primaryNav,
  cta = primaryCta,
  variant = "dark",
  ctaVariant = "p-ghost",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={cn(variant === "light" && "nav-light", open && "open")}>
      <div className="wrap nav-row">
        <div className="logo">
          <SiteLink href="/" aria-label="Deploy AI Studio home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-img"
              src={
                variant === "light"
                  ? "/site/deployai_logo_dark.png"
                  : "/site/deployai_logo_light.png"
              }
              alt="deployAI.studio"
            />
          </SiteLink>
        </div>
        <button
          className="nav-burger"
          aria-label="Open menu"
          aria-controls="site-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav">
          {links.map((l) => (
            <SiteLink
              key={l.href + l.label}
              href={l.href}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </SiteLink>
          ))}
          <SiteLink
            href={cta.href}
            className={cn("pill", ctaVariant, "nav-cta")}
            onClick={() => setOpen(false)}
          >
            {cta.label}
          </SiteLink>
        </nav>
      </div>
    </header>
  );
}
