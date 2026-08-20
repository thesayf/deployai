import { SiteLink } from "../SiteLink";

/**
 * 7 · M22 positioning statement (white breather, left, practitioner register)
 * with an arrow-coda enterprise-track pointer. Ported from
 * mock-data-residency.html §7.
 */
export function RegulatedRollout() {
  return (
    <section className="regime" id="regime">
      <div className="wrap">
        <h2>
          How this works in a <em>regulated</em> environment.
        </h2>
        <p className="lead">
          Security is part of the design, not a review bolted on at the end. We
          start by mapping where your sensitive data lives and what is allowed to
          touch it, deploy the model so that boundary is never crossed, and hand you
          the architecture in writing: what connects to what, who can access it,
          and where the logs go.
        </p>
        <p className="lead">
          Larger and sector-regulated rollouts run on our enterprise track.
        </p>
        <div className="ctas">
          <SiteLink className="arrow" href="/deployment-diagnostic">
            See how the Diagnostic works
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
