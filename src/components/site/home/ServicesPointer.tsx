import { SiteLink } from "../SiteLink";

/** 5 · M20 service grid (white) — seven-service pointer into /services.
 *  Replaces the retired four-tab offers band; names + benefit lines are the
 *  ratified catalogue strings (single source of truth lives on /services). */
const services = [
  { name: "AI Proof of Value", line: "Prove one AI use case pays, before you commit to more." },
  { name: "Claude Code Enablement", line: "Turn Claude Code licences into measured engineering delivery." },
  { name: "Legacy Modernisation", line: "Get off the legacy system without losing what it knows." },
  { name: "AI Readiness Assessment", line: "Know exactly where you stand, and what to do first." },
  { name: "AI Workshops", line: "Get your teams genuinely good at AI, on their own work." },
  { name: "AI Adoption & Change Management", line: "Turn deployed AI tools into daily habits." },
  { name: "Shadow AI Assessment", line: "Know what AI your staff already use, and make it safe." },
  { name: "Managed AI Services", line: "Keep your production AI working, safe, and improving." },
];

export function ServicesPointer() {
  return (
    <section className="svc">
      <div className="wrap">
        <h2>
          Start <em>anywhere</em>.
        </h2>
        <div className="sub">From proving the first use case to running AI in production.</div>
        <div className="rule" />
        <div className="grid20">
          {services.map((s) => (
            <div key={s.name}>
              <h4>{s.name}</h4>
              <div className="xr" />
              <p>{s.line}</p>
            </div>
          ))}
        </div>
        <div className="more">
          <SiteLink className="arrow" href="/services">
            See all services
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
