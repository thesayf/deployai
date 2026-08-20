/** 4 · M20 service grid (white). What we do — 8 capability cells. */
type Cell = { title: string; body: string };

const cells: Cell[] = [
  {
    title: "AI Strategy & Roadmap",
    body: "Build a practical AI roadmap aligned with your business priorities, investment goals, and expected ROI.",
  },
  {
    title: "AI Readiness Assessment",
    body: "Evaluate your people, processes, data, and technology to determine how prepared your organization is for successful AI.",
  },
  {
    title: "Solution Architecture & Data",
    body: "Build the data foundation for AI success, and choose the right AI technologies, whether Claude, another model, or a mix, based on your needs and security requirements.",
  },
  {
    title: "AI Agent Development",
    body: "Design and implement AI agents, copilots, and intelligent assistants that automate workflows and improve business productivity.",
  },
  {
    title: "Integration",
    body: "Securely integrate AI with your existing business applications and data.",
  },
  {
    title: "Adoption & Training",
    body: "Help employees confidently use AI through role-based training, onboarding, and ongoing enablement. Drive adoption with persona-driven training and change programs that build confidence and engagement.",
  },
  {
    title: "Security & Governance",
    body: "Build secure, compliant AI with governance controls, access management, and responsible AI policies.",
  },
  {
    title: "Optimization & Support",
    body: "Continuously monitor performance, optimize solutions, expand successful use cases, and maximize long-term value.",
  },
];

export function ServiceGrid() {
  return (
    <section className="svc">
      <div className="wrap">
        <h2>
          What we <em>do</em>.
        </h2>
        <div className="sub">From strategy to production-ready solutions.</div>
        <div className="rule" />
        <div className="grid20">
          {cells.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <div className="xr" />
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
