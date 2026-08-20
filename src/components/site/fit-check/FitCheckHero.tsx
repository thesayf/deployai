import { SiteLink } from "../SiteLink";

/** 1 · M02 inline hero (navy gradient + photo/scrim). Ported from mock-fit-check.html. */
export function FitCheckHero() {
  return (
    <section className="ihero fc-hero">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="eyebrow">Free check</div>
        <h1>
          Ten minutes to a scored verdict on where AI <em>fits.</em>
        </h1>
        <p className="sub">
          Ten questions score your business across five things and name the one
          place AI would pay off first. About two minutes, and your write-up lands
          in your inbox.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="#fit-check-tool">
            Start the free Fit Check
          </SiteLink>
          <SiteLink className="tert dark" href="#final">
            Book a 30-minute call
          </SiteLink>
        </div>
        <p className="sub">
          Your verdict scores five things: data readiness, workflow clarity, team
          capacity, governance, and existing tooling. Then it names the one
          workflow to start with.
        </p>
      </div>
    </section>
  );
}
