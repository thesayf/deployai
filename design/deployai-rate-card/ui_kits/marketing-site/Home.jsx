const DS = window.DeployAIStudioDesignSystem_1a5dd6;
const { Navbar, CredBar, ProofBand, CaseCard, Accordion, CTABand, Footer, Pill, TextLink } = DS;

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
const pains = [
  { h: "\u201CWe know AI matters. We do not know where it applies to us.\u201D", p: "You have read the case studies. None of them are your business. The ROI is not clear, the scope feels enormous, and the last thing you need is a six-month strategy engagement before a single line of code gets written." },
  { h: "\u201CWe keep paying more for AI. Is it actually working?\u201D", p: "The tools are in real use and the bills climb every month. What is missing is a straight answer on impact: whether it is paying off, and where the money is going." },
  { h: "\u201COur pilot never made it to production.\u201D", p: "Getting a model running is the easy part. Making it work inside your systems is the job. Prototypes that perform brilliantly in controlled demos collapse the moment they connect to real production systems, real data, and real edge cases." },
];
const faqs = [
  { q: "How fast can we start?", a: "Most engagements start within two weeks of the first call. The Fit Check is instant and free." },
  { q: "Do you only work with Claude?", a: "We are Anthropic partners and Claude certified, and we recommend the right tool for the job. Most production deployments we ship run on Claude." },
  { q: "What if AI is not a fit for us?", a: "We tell you. The Fit Check exists to route you away from work you do not need. No obligation either way." },
];

function Home({ nav = () => {} }) {
  return (
    <div className="site">
      <Navbar logoBase="../../assets" />
      <section className="hero">
        <div className="hero-photo"></div>
        <div className="hero-scrim"></div>
        <div className="wrap inner">
          <h1>We put AI to work inside<br />your business.</h1>
          <p className="sub">You know AI matters. We show you where it fits and make it work.</p>
          <div className="ctas">
            <Pill variant="white" href="#fit-check">Take the free AI Fit Check</Pill>
            <Pill variant="ghost" href="#services" onClick={(e) => { e.preventDefault(); nav("services"); }} asLink>See solutions</Pill>
          </div>
        </div>
      </section>
      <CredBar label="Anthropic Partner Network \u00B7 Claude Certified" badges={[
        { alt: "Anthropic Partner", src: "../../assets/badges/partner-logo.png" },
        { alt: "Claude Certified Architect", src: "../../assets/badges/architect-pro-logo.png" },
        { alt: "Architect Foundations", src: "../../assets/badges/architect-foundations-logo.png" },
        { alt: "Claude Developer", src: "../../assets/badges/developer-logo.png" },
        { alt: "Claude Associate", src: "../../assets/badges/associate-logo.png" },
      ]} />
      <section>
        <div className="wrap">
          <h2>Three things we <em>hear</em> every week.</h2>
          <div className="cards3">
            {pains.map(c => <div className="pain-card" key={c.h}><h3>{c.h}</h3><p>{c.p}</p></div>)}
          </div>
        </div>
      </section>
      <section className="svc bg-field">
        <div className="wrap">
          <h2>Start <em>anywhere</em>.</h2>
          <div className="sub">From proving the first use case to running AI in production.</div>
          <div className="rule"></div>
          <div className="grid20">
            {services.map(s => <div key={s.name}><h4>{s.name}</h4><div className="xr"></div><p>{s.line}</p></div>)}
          </div>
          <div className="more"><a className="arrow" href="#services" onClick={(e) => { e.preventDefault(); nav("services"); }}>See all services</a></div>
        </div>
      </section>
      <ProofBand ground="lavender"
        heading={<>Everyone&apos;s using AI. Almost nobody&apos;s <em>winning</em> with it.</>}
        prose={[
          "The problem was never the model. It's that AI rarely reaches the actual work.",
          <>We&apos;re practitioners. We&apos;ve spent years building AI and automation that runs inside real businesses, not slide decks about it, and we get it past the pilot. <TextLink href="#fit-check">Start with the free Fit Check</TextLink></>,
        ]}
        statsIntro="The gap, in numbers"
        stats={[
          { n: "88%", d: "of companies now use AI. Only about 6% get real value from it. (McKinsey, 2025)" },
          { n: "95%", d: "of AI pilots deliver no measurable return. (MIT Project NANDA, 2025)" },
          { n: "42%", d: "now scrap most of their AI projects, up from 17% a year ago. (S&P Global, 2025)" },
        ]} />
      <section className="bg-navy facet about-cases">
        <div className="wrap">
          <h2>Deployed. In production. <em>Working.</em></h2>
          <p className="case-intro">Real systems running inside real businesses.</p>
          <div className="sc-cards"><div className="sc-row">
            <CaseCard img="../../assets/case-jb.jpg" pos="50% 30%" title="A booking assistant that never sleeps" client="JB Luxe Detailing"
              desc={<>Bookings tripled. An assistant, CRM and diary now run the whole client journey.</>} sector="Automotive services" metric="Replies in 30 seconds" />
            <CaseCard img="../../assets/case-showcase.jpg" pos="50% 40%" title="AI scheduling across the chain" client="Showcase Cinemas"
              desc={<>Weekly scheduling fell from forty hours to under two, and revenue per screen rose <b>18%</b>.</>} sector="Cinema operations" metric="Live in 4 weeks" />
            <CaseCard img="../../assets/case-centric.jpg" pos="30% 35%" title="Tenders out in days" client="Centric Community Research"
              desc={<>A research and proposal platform. Proposals that once took weeks now take <b>fifteen minutes</b>.</>} sector="Community research" metric="Knowledge on demand" />
          </div></div>
        </div>
      </section>
      <section className="bg-field faq">
        <div className="wrap">
          <h2>Fair <em>questions</em>.</h2>
          <Accordion items={faqs} />
        </div>
      </section>
      <CTABand heading={<>Ready when <em>you</em> are.</>}
        paragraphs={["Book a 30-minute call. We'll tell you where AI fits your business, and where it doesn't."]}
        fineNote="No obligation. A senior consultant, not a sales rep."
        ctas={[{ label: "Book a call", href: "#book", className: "pill p-ink" }, { label: "Take the Fit Check first", href: "#fit-check", className: "tert ink" }]} />
      <Footer />
    </div>
  );
}
window.MarketingHome = Home;
