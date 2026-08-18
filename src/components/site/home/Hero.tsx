import { SiteLink } from "../SiteLink";

/** 1 · P01 motion hero (navy). Photo + left-heavy scrim; white text. */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap inner">
        <h1>
          We put AI to work inside
          <br />
          your business.
        </h1>
        <p className="sub">
          You know AI matters. We show you where it fits and make it work.
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
