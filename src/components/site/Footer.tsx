import { SiteLink } from "./SiteLink";
import {
  footerColumns,
  footerTagline,
  type NavItem,
} from "./nav-config";

type FooterProps = {
  columns?: { title: string; links: NavItem[] }[];
  tagline?: string;
  /** The slot for the registered legal name (open decision 11.5). */
  legalName?: string;
};

export function Footer({
  columns = footerColumns,
  tagline = footerTagline,
  legalName,
}: FooterProps) {
  return (
    <footer>
      <div className="foot-top">
        <div className="wrap foot-cols">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="foot-title">{col.title}</div>
              {col.links.map((l) => (
                <SiteLink key={l.href + l.label} className="foot-link" href={l.href}>
                  {l.label}
                </SiteLink>
              ))}
              {col.title === "Trust" && tagline && (
                <div className="foot-tag">{tagline}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="foot-bottom">
        <div className="wrap">
          © 2026{" "}
          {legalName ? (
            legalName
          ) : (
            <span className="slot-label">[LEGAL NAME — open decision 11.5]</span>
          )}{" "}
          · Privacy
        </div>
      </div>
    </footer>
  );
}
