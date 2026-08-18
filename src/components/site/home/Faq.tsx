import { Accordion, type AccordionItem } from "../Accordion";

/** 9 · FAQ (field ground). Home question set; renders the shared M16 accordion. */
const items: AccordionItem[] = [
  {
    q: "What does this cost?",
    a: "We do not publish figures because the honest range is wide. You get a real number on the first call. We would rather you find out in thirty minutes than in a month.",
  },
  {
    q: "Our data cannot leave our environment. Is AI still an option?",
    a: "Usually, yes. The Data Residency page gives the full answer, written so you can forward it to your compliance team.",
  },
  {
    q: "We tried AI already. It stalled. Why would this be different?",
    a: "The model is not the hard part. Deployment is. Organizations burn sprint capacity, engineering hours, and management attention on AI pilots that never connect to actual business workflows. Learning without outcomes. That is why we start with the workflows where AI pays for itself first, and nothing else.",
  },
  {
    q: "How do we know it is worth the money?",
    a: "Use cases scored on effort and impact. Business case built on your actual spend baseline, with a payback period rather than a vendor benchmark. And a decision gate at every stage. We would rather you stop after the diagnostic than build something you do not need.",
  },
  {
    q: "You are small and new. Why work with you?",
    a: "The credentials are the same ones the large firms hold, and the person holding them does the work. We bring management consulting level experience to the mid-size market. We are also honest about scale limits. Running 50 or more seats, or working under sector rules, we tell you on the first call whether we are the right size for it.",
  },
  {
    q: "What happens after go-live?",
    a: "Governance decays the week you stop. Unmaintained systems fail. The Advisory Retainer keeps your AI improving every month: new use cases, model and tooling updates, governance upkeep.",
  },
];

export function Faq() {
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
