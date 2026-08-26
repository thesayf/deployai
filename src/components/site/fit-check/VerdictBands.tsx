import { SiteLink } from "../SiteLink";

/** 4 · M13 offer cards: four verdict bands (white primary content). */
export function VerdictBands() {
  return (
    <section className="m13">
      <div className="wrap">
        <h3 className="h3t">
          What your verdict <em>means</em>
        </h3>
        <p className="lead">
          Your score puts you in one of four bands. None of them is a grade. Each
          one is a next move.
        </p>
        <p className="lead">
          It is easy to misjudge how ready you are, over or under, and that is
          what stalls the work. Ten minutes settles it.
        </p>
        <div className="offergrid">
          <div className="oc">
            <h6>Not ready yet</h6>
            <p>
              your foundations block deployment. Fix the gap your verdict names;
              your own team can do it. You do not need a consultant yet, ours
              included.
            </p>
          </div>
          <div className="oc">
            <h6>Foundations first</h6>
            <p>
              most of your picture works, and one or two dimensions hold you back.
              Close the named gap, then retake the check. No fee.
            </p>
          </div>
          <div className="oc">
            <h6>Ready for a diagnostic</h6>
            <p>
              your foundations hold, and the open question is which workflow AI
              takes on first. The Deployment Diagnostic answers it in two to three
              weeks, fixed fee.
            </p>
            <div className="ctas">
              <SiteLink className="arrow" href="/deployment-diagnostic">
                See the Deployment Diagnostic
              </SiteLink>
            </div>
          </div>
          <div className="oc">
            <h6>Ready to deploy</h6>
            <p>
              your workflows are clear and your data is in order. Book a
              thirty-minute call and we tell you which rollout fits and what it
              costs.
            </p>
            <div className="ctas">
              <SiteLink className="arrow" href="#final">
                Book a 30-minute call
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
