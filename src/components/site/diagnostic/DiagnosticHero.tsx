import { SiteLink } from "../SiteLink";

/** 1 · M02 inline hero (navy gradient + photo/scrim). Ported from mock-deployment-diagnostic.html. */
export function DiagnosticHero() {
  return (
    <section className="ihero diag">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <h1>
          We find the two to three places where AI creates the fastest ROI, and
          turn ambition into <em>measurable outcomes</em>.
        </h1>
        <p className="sub">
          A fixed-fee, two to three week diagnostic that ends in a costed
          deployment plan, not a strategy deck. A score is not a deliverable.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="#final">
            Book a call
          </SiteLink>
          <SiteLink className="tert dark" href="/fit-check">
            Take the free Fit Check first
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
