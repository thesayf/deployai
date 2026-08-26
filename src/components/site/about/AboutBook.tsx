import { SiteLink } from "@/components/site/SiteLink";
import { fitCheckAssessmentUrl } from "@/components/site/nav-config";

/** 9 · M17 final CTA (royal, saturated brand band): dual CTA, no calendar embed
 *  (mock copy is a plain dual-CTA, not a booking form — deviates from the shared
 *  coral CTABand deliberately to stay faithful to the locked mock). */
export function AboutBook() {
  return (
    <section className="about-book bg-royal" id="final">
      <div className="wrap">
        <h2>
          Ready to explore how Deploy AI Studio can{" "}
          <em className="accent">support</em> your business?
        </h2>
        <p className="lead">
          The free AI Fit Check takes ten minutes, and your scored verdict comes
          straight to your inbox.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href={fitCheckAssessmentUrl}>
            Take the free AI Fit Check
          </SiteLink>
          <SiteLink className="pill p-ghost" href="/book">
            Book a 30-minute call
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
