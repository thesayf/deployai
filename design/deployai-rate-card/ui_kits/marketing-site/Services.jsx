const DS2 = window.DeployAIStudioDesignSystem_1a5dd6;
const { Navbar: SNavbar, JumpNav: SJumpNav, ProofBand: SProofBand, Accordion: SAccordion, CTABand: SCTABand, Footer: SFooter, Pill: SPill } = DS2;

const ladder = [
  { num: "01", name: "AI Fit Check", meta: "Free \u00B7 Instant", p: "A short assessment that tells you whether AI fits your business, and where to start. No call required." },
  { num: "02", name: "Deployment Diagnostic", meta: "2 weeks \u00B7 Fixed fee", p: "A two-week engagement that maps your highest-value AI use case and hands you a build-ready plan.", feature: true },
  { num: "03", name: "Build & Deploy", meta: "4\u201312 weeks", p: "We build the system, connect it to your stack, and get it into production with your team." },
  { num: "04", name: "Managed AI Services", meta: "Ongoing", p: "Keep your production AI working, safe, and improving month over month." },
];
const svcFaqs = [
  { q: "What does an engagement cost?", a: "The Fit Check is free. The Deployment Diagnostic is a fixed fee agreed up front. Builds are scoped from the diagnostic, so there are no open-ended estimates." },
  { q: "Who does the work?", a: "Senior practitioners. The people you meet on the first call are the people who build and ship the system." },
];

function Services({ nav = () => {} }) {
  return (
    <div className="site">
      <SNavbar logoBase="../../assets" />
      <section className="ihero svc-hero">
        <div className="ihero-photo"></div>
        <div className="ihero-scrim"></div>
        <div className="wrap">
          <div className="eyebrow">Services</div>
          <h1>From first use case to <em>production</em>.</h1>
          <p className="sub">Eight services, one path: prove the value, build the system, keep it working.</p>
          <div className="ctas" style={{ marginTop: 36 }}>
            <SPill variant="white" href="#ladder">See the path</SPill>
            <SPill variant="ghost" href="#home" onClick={(e) => { e.preventDefault(); nav("home"); }} asLink>Back to home</SPill>
          </div>
        </div>
      </section>
      <SJumpNav sections={[{ label: "The path", anchor: "#ladder" }, { label: "Evidence", anchor: "#evidence" }, { label: "FAQ", anchor: "#svc-faq" }]} cta={{ label: "Let's talk", href: "#final" }} />
      <section className="ladder-head" id="ladder">
        <div className="wrap">
          <h2>Start <em>anywhere</em>. Most start here.</h2>
          <p className="lead">Each step stands alone. Together they take you from “does AI fit?” to AI running in production.</p>
          <div className="ladder">
            {ladder.map(s => (
              <div className={"lstep" + (s.feature ? " feature" : "")} key={s.num}>
                <div className="num">{s.num}</div>
                <h6>{s.name}</h6>
                <div className="meta">{s.meta}</div>
                <p>{s.p}</p>
                <a className={"pill " + (s.feature ? "p-ghost" : "p-ink")} href="#final">Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="evidence">
        <SProofBand ground="lavender"
          heading={<>The <em>evidence</em> ledger.</>}
          prose={["Numbers from systems we have shipped and still run."]}
          statsIntro="Across live client deployments"
          stats={[
            { n: "3\u00D7", d: "bookings after a client-journey assistant went live. (JB Luxe Detailing)" },
            { n: "40\u21922h", d: "weekly scheduling hours across a cinema chain. (Showcase Cinemas)" },
            { n: "15 min", d: "to produce proposals that took weeks. (Centric Community Research)" },
          ]} />
      </div>
      <section className="bg-field faq" id="svc-faq">
        <div className="wrap">
          <h2>Fair <em>questions</em>.</h2>
          <SAccordion items={svcFaqs} />
        </div>
      </section>
      <SCTABand heading={<>Not sure where to <em>start</em>?</>}
        paragraphs={["Take the free Fit Check, or book a call and we'll route you to the right step."]}
        fineNote="No obligation. A senior consultant, not a sales rep."
        ctas={[{ label: "Book a call", href: "#book", className: "pill p-ink" }, { label: "Take the Fit Check", href: "#fit-check", className: "tert ink" }]} />
      <SFooter />
    </div>
  );
}
window.MarketingServices = Services;
