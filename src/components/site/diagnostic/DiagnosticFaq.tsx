import { Accordion, type AccordionItem } from "../Accordion";

/** 10 · M16 FAQ accordion (field ground). Diagnostic question set, verbatim from the mock. */
const items: AccordionItem[] = [
  {
    q: "We have already tried AI and it did not go anywhere. Is this different?",
    a: "Stalled AI programmes usually fail for three reasons: the use case was chosen by enthusiasm rather than impact, nobody owned the outcome after the pilot, or the data wasn't ready and that only surfaced late. The Diagnostic deliberately front-loads all three.",
  },
  {
    q: "Do we need our data organised before we start?",
    a: "No. Assessing your data landscape is part of the work, not a prerequisite for it. What we do need is access to see it.",
  },
  {
    q: "What access do you need, and is it safe?",
    a: "Read-only access granted to the admin centres, scope confirmed in writing. No production changes. Nothing without approval.",
  },
  {
    q: "Do you also build what you recommend?",
    a: "Yes, and you are under no obligation to use us for it. The advantage of the same team planning and building is that the plan is costed against real delivery estimates rather than assumptions.",
  },
  {
    q: "Why work with a boutique rather than a large firm?",
    a: "The large firms typically run eight to sixteen weeks of discovery before a recommendation. Ours runs two to three weeks, and is delivered by the same team that would build it.",
  },
  {
    q: "What does the Diagnostic cost?",
    a: "A fixed fee, agreed before it starts. No hourly billing and no open-ended discovery phase.",
  },
];

export function DiagnosticFaq() {
  return (
    <section className="bg-field" id="faq">
      <div className="wrap faq">
        <h2>
          Frequently asked <em>questions</em>
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
