import { SiteLink } from "../SiteLink";

/** 6 · M15 mid-page CTA band: navy pivot (dark zone 2). */
export function MidCta() {
  return (
    <section className="bg-navy midcta">
      <div className="wrap">
        <h2>
          Now turn it into a <em>plan.</em>
        </h2>
        <p className="lead">
          The Fit Check is step one, and you have already taken it. The next step
          is the Deployment Diagnostic: two to three weeks, fixed fee, ending in a
          costed plan you can act on.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="/deployment-diagnostic">
            See the Deployment Diagnostic
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
