import { SiteLink } from "../SiteLink";

/**
 * 1 · M02 interior hero (navy) with a server-room photo + left scrim (founder
 * direction 2026-08-19). The baked-in credential line from the mock is dropped
 * in favour of the shared CredBar rendered below (house pattern).
 */
export function ResidencyHero() {
  return (
    <section className="ihero resid-hero" id="top">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <h1>
          Your data does not have to leave your <em>control</em> for you to use
          AI.
        </h1>
        <p className="sub">
          We bring the model to your data, not your data to the model. It is
          deployed inside your own environment: your cloud, your region, your
          governance boundary. For most enterprises this is the first question
          they ask, and it has a good answer.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="#final">
            Book a 30-minute call
          </SiteLink>
          <SiteLink className="tert dark" href="/fit-check">
            Take the free AI Fit Check
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
