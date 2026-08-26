import { SiteLink } from "@/components/site/SiteLink";

/** 1 · book hero (navy gradient, full-height). No inline credential text — the
 *  badge wall (CredBar) sits under the hero, matching the other pages. */
export function BookHero() {
  return (
    <section className="ihero book-hero" id="top">
      <div className="ihero-photo" aria-hidden="true" />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <h1>
          Thirty minutes. No pitch.
          <br />A straight <em className="accent">answer</em>.
        </h1>
        <p className="sub">
          You&rsquo;ll be talking to people who do this every day. That changes
          everything downstream.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-white" href="#book-calendar">
            Pick a time
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
