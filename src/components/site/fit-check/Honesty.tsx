import { SiteLink } from "../SiteLink";

/** 5 · A4 honesty block: m22 narrow prose on WHITE + P09 fine-print (secondary content). */
export function Honesty() {
  return (
    <section className="honest">
      <div className="wrap">
        <h3 className="h3t">
          A score is not a <em>plan</em>
        </h3>
        <p className="lead">
          Ten questions cannot know your business, but they can spot the pattern
          and tell you where to look. Fixing what they find is another matter,
          and that is where most readiness quizzes quietly stop.
        </p>
        <p className="fineprint">
          The verdict is an estimate, built from your answers and industry
          benchmarks, not a promise. It sharpens once it is calibrated to your
          real workflows rather than round-number averages.
        </p>
        <p className="lead">
          The real numbers come from the Deployment Diagnostic: two to three
          weeks inside your operation, ending in a costed plan your finance team
          can check.
        </p>
        <div className="ctas">
          <SiteLink className="tert ink" href="/deployment-diagnostic">
            How the Deployment Diagnostic works
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
