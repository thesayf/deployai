import { Accordion, type AccordionItem } from "../Accordion";

/** 9 · FAQ (field ground). Home question set; renders the shared M16 accordion. */
const items: AccordionItem[] = [
  {
    q: "What does this cost?",
    a: "You get a fixed price, agreed before any build starts, once the diagnostic has shown us what you're actually deploying. We don't quote blind on a first call, and we don't bill by the hour. By the time we put a number in front of you, the scope behind it is fixed too.",
  },
  {
    q: "How much of our time does this take?",
    a: "Less than you'd expect. The Fit Check is ten minutes. The diagnostic runs on a handful of interviews with the people who know the work, and we do the analysis between the sessions rather than in them. We keep the demand on your team light, and we tell you the shape of it before we start.",
  },
  {
    q: "What do we actually walk away with?",
    a: "From the diagnostic: a ranked list of where AI fits, a business case built on your real numbers, and a costed plan with the ROI to expect. From a build: a live system your team owns, documented and running in production. Not a slide deck.",
  },
  {
    q: "We tried AI already. It stalled. Why would this be different?",
    a: "The model was never the hard part. Deployment is. Most pilots die between the demo and production, because nobody owned the outcome and the work never reached a real workflow. We start with the workflows where AI pays for itself first, and we build for production from day one.",
  },
  {
    q: "Do you build it, or just advise?",
    a: "Both, and you're never locked in. The same team that scopes the work builds it, so the plan is costed against real delivery, not guesswork. But you own the plan. Take it and build in-house if you'd rather.",
  },
  {
    q: "Will this replace our own people?",
    a: "No. We build AI into the work your team already does and train them to run it, then hand it over. Your people know your business, and its politics, better than we ever will. We make them faster, we don't replace them.",
  },
  {
    q: "Our data cannot leave our environment. Is AI still an option?",
    a: "Usually, yes. Your data stays in the region and the cloud account you choose, nothing you send trains the model, and access is scoped and time-limited. The Data Residency section above has the full version, written so you can forward it to compliance.",
  },
  {
    q: "What happens after go-live?",
    a: "Governance drifts and models move. Managed AI Services keeps what's live working and improving: monitoring, model and tooling updates, and governance upkeep under an agreed service level. You keep getting better at this without hiring for it.",
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
