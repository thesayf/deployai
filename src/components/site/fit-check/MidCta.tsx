import { SiteLink } from "../SiteLink";

/** 6 · M15 mid-page CTA band: navy pivot (dark zone 2). */
export function MidCta() {
  return (
    <section className="midcta bg-navy">
      <div className="wrap">
        <h2>
          Now turn it into a <em>plan.</em>
        </h2>
        <p className="lead">
          The Fit Check is step one. The next is the Deployment Diagnostic: a
          short, fixed-fee engagement ending in a costed plan you can act on.
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
