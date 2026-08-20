import { SiteLink } from "../SiteLink";

/** 5 · breather (lime strip) — single centered CTA between dense bands. */
export function Breather() {
  return (
    <div className="breather">
      <div className="wrap in">
        <SiteLink className="pill p-blue" href="/fit-check">
          Take the free AI Fit Check
        </SiteLink>
      </div>
    </div>
  );
}
