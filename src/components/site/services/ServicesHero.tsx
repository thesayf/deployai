import { SiteLink } from "../SiteLink";

/** 1 · M02 inline hero (navy gradient). Ported from mock-services.html. */
export function ServicesHero() {
  return (
    <section className="ihero svc-hero">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <h1>
          We scope, build, and deliver AI systems, with a timeline that doesn&rsquo;t{" "}
          <em>move</em>.
        </h1>
        <p className="sub">
          Don&rsquo;t start with AI tools. Start with business outcomes. We help you
          adopt, implement, and get value from AI, from readiness to ROI.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="/fit-check">
            Take the free AI Fit Check
          </SiteLink>
          <SiteLink className="tert dark" href="#final">
            Book a 30-minute call
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
