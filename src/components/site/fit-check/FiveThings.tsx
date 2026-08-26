import { SiteLink } from "../SiteLink";

/** 2 · M20 capabilities columns: five dimensions, hairline cells (white framing). */
export function FiveThings() {
  return (
    <section className="whatis">
      <div className="wrap">
        <h2>
          Five things the check <em>measures</em>
        </h2>
        <p className="lead">
          The Fit Check gauges how ready your company is to adopt and scale AI.
          It scores five things, and each is a question you can answer without
          calling IT.
        </p>
        <div className="dims">
          <div>
            <h4>Data readiness</h4>
            <div className="xr" />
            <p>
              Teams that lack the data infrastructure needed to move AI into
              production keep their pilots stuck in the sandbox.
            </p>
          </div>
          <div>
            <h4>Workflow clarity</h4>
            <div className="xr" />
            <p>
              How much of your everyday work is repeatable enough to automate.
            </p>
          </div>
          <div>
            <h4>Team capacity</h4>
            <div className="xr" />
            <p>
              the pillar most readiness checks skip. A company can be perfectly
              secure and still waste every seat.
            </p>
          </div>
          <div>
            <h4>Governance</h4>
            <div className="xr" />
            <p>
              Have you incorporated risk frameworks, AI usage policies and
              regulatory controls? The full answer on where your data goes is on
              the <SiteLink href="/data-residency">Data Residency</SiteLink>{" "}
              page.
            </p>
          </div>
          <div>
            <h4>Existing tooling</h4>
            <div className="xr" />
            <p>Whether AI can plug into the tools you already run.</p>
          </div>
        </div>
        <p className="lead" style={{ marginTop: 48, marginBottom: 0 }}>
          Ten questions cover all five. Score yourself below.
        </p>
      </div>
    </section>
  );
}
