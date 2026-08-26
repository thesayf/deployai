import { SiteLink } from "@/components/site/SiteLink";

/** 8 · M15 mid-page CTA band (navy, full-bleed image right — reproduces the
 *  aitx flair: bold edge-to-edge photo + large heading + pill). Placed between
 *  How-we-work and FAQ so the navy band is sandwiched by field. Copy gated. */
export function AboutMidCta() {
  return (
    <section className="mid bg-navy" id="mid-cta">
      <div className="wrap">
        <div className="mid-copy">
          <h2>
            What could we build for <em className="accent">you</em>?
          </h2>
          <p className="lead">
            See where AI fits your business, and what it would take to get
            there.
          </p>
          <div className="ctas">
            <SiteLink className="pill p-blue" href="/book">
              Book a call
            </SiteLink>
          </div>
        </div>
      </div>
      <div className="mid-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/site/about-midcta.jpg"
          alt="A team mapping out an AI roadmap in a working session"
        />
      </div>
    </section>
  );
}
