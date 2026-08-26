import { SiteLink } from "../SiteLink";
import { fitCheckAssessmentUrl } from "../nav-config";

/** 3 · A5 Fit Check tool (Stage-2 quiz UI): the one accent band (lavender), page signature set-piece. */
export function FitCheckTool() {
  return (
    <section className="tool bg-lavender" id="fit-check-tool">
      <div className="wrap">
        <div className="eyebrow">Free</div>
        <h2>
          Ten questions. A straight <em>read.</em>
        </h2>
        <p className="lead">
          Ten questions, answered honestly. You get back a score, the gaps
          holding you up, and the first workflow worth putting AI on. It lands
          in your inbox.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-ink" href={fitCheckAssessmentUrl}>
            Start the check
          </SiteLink>
        </div>
        <div className="quizslot">
          <img
            loading="lazy"
            decoding="async"
            className="quiz-shot"
            src="/site/fitcheck-quiz.jpg"
            alt="A Fit Check question: how comfortable is your team with new technology, with five answer options and a progress bar."
          />
        </div>
        <div className="resultbox">
          <p>
            Wherever you land, the next move is concrete, not another report to
            file away.
          </p>
          <p>
            The Deployment Diagnostic turns your verdict into a costed plan:
            what to build, what it costs, and in what order. Or book a call and
            we will talk it through first.
          </p>
          <div className="ctas">
            <SiteLink className="pill p-ink" href="#final">
              Book a 30-minute call
            </SiteLink>
            <SiteLink className="arrow" href="/deployment-diagnostic">
              See the Deployment Diagnostic
            </SiteLink>
          </div>
          <div className="emailslot">
            <p>
              You add your email at the end, and we send your scored verdict and
              the full write-up straight to it. That is the only thing we use it
              for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
