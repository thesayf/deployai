import { Accordion, type AccordionItem } from "../Accordion";

/** 9 · M16 FAQ accordion (field ground). Services question set, verbatim from mock. */
const items: AccordionItem[] = [
  {
    q: "What does this cost?",
    a: "Every engagement is a fixed fee scoped to headcount and site count, agreed before we start. No hourly billing and no open-ended discovery phase. We do not publish figures because the honest range is wide. The number comes out of the Deployment Diagnostic, inside a business case with a spend baseline and the payback to expect.",
  },
  {
    q: "What exactly is an AI Proof of Value?",
    a: "A short, fixed-scope build that proves one AI use case against a KPI you choose. You get a working Claude solution, measured results, the code, and a clear go, pivot, or stop decision. If the numbers do not justify production, we say so.",
  },
  {
    q: "We've already tried AI and it didn't go anywhere. Is this different?",
    a: "Stalled AI programmes usually fail for three reasons: the use case was chosen by enthusiasm rather than impact, nobody owned the outcome after the pilot, or the data wasn't ready and that only surfaced late. The sprint deliberately front-loads all three.",
  },
  {
    q: "What happens after you build something?",
    a: "Every build hands over into operation: evaluations, monitoring, cost control, guardrails, and incident response under an agreed service level, with monthly reviews. We do not ship and disappear.",
  },
  {
    q: "We don't know where to start with AI.",
    a: "Most organisations don't. We begin by identifying high-impact business opportunities, assessing your AI readiness, and creating a practical implementation roadmap.",
  },
  {
    q: "Will AI disrupt our existing workflows?",
    a: "No. Our approach is designed to fit into the systems your teams already use. We improve existing workflows instead of forcing employees to adopt completely new ways of working.",
  },
  {
    q: "Do we need our data organised before we start?",
    a: "No. Assessing your data landscape is part of the work, not a prerequisite for it.",
  },
  {
    q: "What if our team doesn't adopt it after training?",
    a: "Low adoption after training is the most common failure point across the industry, and it's why we track usage data and include follow-up clinics if adoption is below target.",
  },
  {
    q: "How do we measure success and ROI?",
    a: "Before implementation begins, we define clear business objectives and success metrics. After deployment, we track productivity improvements, adoption, operational efficiency, and other KPIs.",
  },
  {
    q: "Can you run AI systems we built ourselves?",
    a: "Yes. Managed AI Services starts with an onboarding audit of your existing models, agents, and pipelines, whoever built them. We document the gaps, stand up monitoring and service levels, and operate from there.",
  },
  {
    q: "Will a Shadow AI review get our staff in trouble?",
    a: "No. The survey runs on an amnesty basis: a no-punishment self-report designed to surface what network signals miss. The goal is a safe, sanctioned default people actually prefer.",
  },
  {
    q: "Do you also build what you recommend?",
    a: "Yes, and you are under no obligation to use us for it.",
  },
];

/** FAQPage JSON-LD mirroring the rendered Q&As exactly (accuracy-first). */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

export function ServicesFaq() {
  return (
    <section className="bg-field" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="wrap faq">
        <h2>
          Frequently asked <em>questions</em>
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
