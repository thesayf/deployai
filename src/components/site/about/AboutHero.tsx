import { SiteLink } from "@/components/site/SiteLink";

/** 1 · M02 typographic interior hero (navy gradient, no media slot):
 *  identity + credential text line + dual CTA. */
export function AboutHero() {
  return (
    <section className="ihero about-hero" id="top">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <h1>
          From pilot to <em className="accent">production</em>.
        </h1>
        <p className="sub">
          Deploy AI Studio is a boutique AI engineering consultancy, with the
          architecture, guardrails, and hands-on expertise to turn real
          investment into measurable ROI.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="/fit-check">
            Take the free AI Fit Check
          </SiteLink>
          <SiteLink className="pill p-ghost" href="#final">
            Book a 30-minute call
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
