import { SiteLink } from "./SiteLink";
import { footerColumns, type NavItem } from "./nav-config";

type FooterProps = {
  columns?: { title: string; links: NavItem[] }[];
  /** Optional credential line under the Trust column; off by default. */
  tagline?: string;
  legalName?: string;
};

export function Footer({
  columns = footerColumns,
  tagline,
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
                <SiteLink
                  key={l.href + l.label}
                  className="foot-link"
                  href={l.href}
                >
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
          © 2026 {legalName ?? "Hinds Tech and Artificial Intelligence LLC"} ·{" "}
          <SiteLink className="foot-link inline" href="/privacy">
            Privacy
          </SiteLink>
        </div>
      </div>
    </footer>
  );
}
