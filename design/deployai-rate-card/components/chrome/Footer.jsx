import React from "react";

const defaultColumns = [
  { title: "Start", links: [{ label: "AI Fit Check", href: "#" }, { label: "Deployment Diagnostic", href: "#" }, { label: "Book a call", href: "#" }] },
  { title: "Firm", links: [{ label: "Services", href: "#" }, { label: "About", href: "#" }] },
  { title: "Trust", links: [{ label: "Data Residency", href: "#" }, { label: "Contact", href: "#" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/rudi-hinds-3b25b6137/" }] },
];

/** Site footer — royal columns band + indigo legal strip. */
export function Footer({ columns = defaultColumns, tagline, legalName = "Hinds Tech and Artificial Intelligence LLC" }) {
  return (
    <footer>
      <div className="foot-top">
        <div className="wrap foot-cols">
          {columns.map(col => (
            <div key={col.title}>
              <div className="foot-title">{col.title}</div>
              {col.links.map(l => <a key={l.href + l.label} className="foot-link" href={l.href}>{l.label}</a>)}
              {col.title === "Trust" && tagline && <div className="foot-tag">{tagline}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="foot-bottom">
        <div className="wrap">© 2026 {legalName} · <a className="foot-link" href="#">Privacy</a></div>
      </div>
    </footer>
  );
}
