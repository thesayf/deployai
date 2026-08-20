import { Accordion, type AccordionItem } from "../Accordion";

/** 9 · M16 FAQ accordion (field ground). Services question set, verbatim from mock. */
const items: AccordionItem[] = [
  {
    q: "What does this cost?",
    a: "Every engagement is a fixed fee scoped to headcount and site count, agreed before we start. No hourly billing and no open-ended discovery phase. We do not publish figures because the honest range is wide. You get a real number on the first call, not after three meetings.",
  },
  {
    q: "We've already tried AI and it didn't go anywhere. Is this different?",
    a: "Stalled AI programmes usually fail for three reasons: the use case was chosen by enthusiasm rather than impact, nobody owned the outcome after the pilot, or the data wasn't ready and that only surfaced late. The sprint deliberately front-loads all three.",
  },
  {
    q: "We don't know where to start with AI.",
    a: "Most organizations don't. We begin by identifying high-impact business opportunities, assessing your AI readiness, and creating a practical implementation roadmap.",
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
    q: "Do you also build what you recommend?",
    a: "Yes, and you are under no obligation to use us for it.",
  },
];

export function ServicesFaq() {
  return (
    <section className="bg-field">
      <div className="wrap faq">
        <h2>
          Frequently asked <em>questions</em>
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
