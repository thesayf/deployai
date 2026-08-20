import { SiteLink } from "../SiteLink";

/** breather (lime strip). Diagnostic pairing: Fit Check pill + book-a-call route. */
export function Breather() {
  return (
    <div className="breather">
      <div className="wrap in">
        <SiteLink className="pill p-ink" href="/fit-check">
          Take the free Fit Check first
        </SiteLink>
        <SiteLink className="tert ink" href="#final">
          Book a call
        </SiteLink>
      </div>
    </div>
  );
}
