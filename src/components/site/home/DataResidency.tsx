import { SiteLink } from "../SiteLink";

/** 6 · Data residency / governance — P07 blueprint (outcome fed by pillars, Trust frame).
 *  Box copy is stitched from competitor governance sources + Anthropic facts (agnostic). */
const pillars = [
  {
    n: "01 · Residency",
    t: "Where it lives",
    d: "Your data is stored and processed inside the region you choose, in your own cloud account or tenant. It lives where you decide, and it stays there.",
  },
  {
    n: "02 · Data handling",
    t: "What happens to it",
    d: "Nothing you send is used to train the model. We keep it only for as long as you agree, and it stays encrypted in transit and at rest.",
  },
  {
    n: "03 · Access & ownership",
    t: "Who reaches it, who owns it",
    d: "Access is scoped and time-limited. You own the finished system and the code, we document it and hand it over, and there is no lock-in.",
  },
];

function ArrowUp() {
  return (
    <svg width="24" height="30" viewBox="0 0 24 30" fill="none" aria-hidden="true">
      <g stroke="#0C62FB" strokeWidth="2" fill="none">
        <line x1="12" y1="28" x2="12" y2="6" />
        <path d="M6,13 L12,4 L18,13" />
      </g>
    </svg>
  );
}

export function DataResidency() {
  return (
    <section className="bg-field">
      <div className="wrap resid">
        <h2>
          Your data is governed your <em>way</em>.
        </h2>
        <p>The first question is almost always the same: where does our data go?</p>
        <p>
          Before we build anything, we put the answers in writing: where your data
          lives, what the system can reach, and how you would prove all of it in a
          security review. We agree the scope and the sign-offs first, and nothing
          reaches production without your approval.
        </p>

        <div className="gov-frame">
          <div className="gov-frame-label">
            Trust &amp; Audit{" "}
            <span>· aligned to SOC 2 · ISO 27001 / 42001 · NIST AI RMF</span>
          </div>

          <div className="gov-outcome">
            <div className="qn">The deliverable</div>
            <div className="qt">
              You get a deployment your risk and compliance team can sign off on,
              not a stack of policy documents. The controls are switched on and
              evidenced, not just described.
            </div>
          </div>

          <div className="gov-arrows">
            <ArrowUp />
            <ArrowUp />
            <ArrowUp />
          </div>

          <div className="gov-pillars">
            {pillars.map((p) => (
              <div className="qblock" key={p.n}>
                <div className="qn">{p.n}</div>
                <div className="qt">{p.t}</div>
                <div className="qd">{p.d}</div>
              </div>
            ))}
          </div>
        </div>

        <SiteLink className="arrow" href="/data-residency">
          Read the full answer: Data Residency and Trust
        </SiteLink>
      </div>
    </section>
  );
}
