import { SiteLink } from "../SiteLink";

/** 3 · A1 credential bar + route-back (periwinkle strip). Diagnostic trust framing:
 *  read-only access line plus a Fit Check route-back. Ported verbatim from the mock. */
export function CredStrip() {
  return (
    <div className="credstrip">
      <div className="wrap in">
        <div className="badges">
          <span>Anthropic Partner Network</span>
          <span>Claude Certified Architect</span>
        </div>
        <div className="line">Read-only access, scoped and time-bound.</div>
        <SiteLink className="tert ink" href="/fit-check">
          Not ready for a call? The free Fit Check takes ten minutes.
        </SiteLink>
      </div>
    </div>
  );
}
