/** 6 · M13-variant deliverable cards (white) — M12 numerals, no CTA/meta/feature.
 *  #what-you-get. Nine numbered deliverables, verbatim from the mock. */
const items = [
  "Your foundations, scored on evidence.",
  "Gap analysis identifying where strategy, data, talent, and governance need strengthening.",
  "A stakeholder map.",
  "Process maps built from structured data, step by step, handoff by handoff.",
  "A ranked use case backlog with effort and impact scoring, separating quick wins from the prerequisites to fix first.",
  "Priority workflows scoped in detail.",
  "A business case with a spend baseline and payback period, tied to a metric your finance team already tracks.",
  "A sequenced roadmap with named owners and success metrics.",
  "An explicit list of what we recommend you don’t pursue this year.",
];

export function Deliverables() {
  return (
    <section className="m12nd" id="what-you-get">
      <div className="wrap">
        <h2 className="h3t">
          You leave <em>with:</em>
        </h2>
        <div className="grid3">
          {items.map((text, i) => (
            <div key={i}>
              <div className="num">{String(i + 1).padStart(2, "0")}.</div>
              <h6>{text}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
