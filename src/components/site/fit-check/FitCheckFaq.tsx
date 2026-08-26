import { Accordion, type AccordionItem } from "../Accordion";

/** 7 · M16 FAQ accordion (field ground). Fit Check question set, verbatim from the mock. */
const items: AccordionItem[] = [
  {
    q: "Is the result really free, and what happens to my answers?",
    a: "Yes, the Fit Check is free. You add an email at the end so we can send your scored verdict and the full write-up. That report is the only thing we use it for, no sales list and no spam.",
  },
  {
    q: "Can ten questions really tell you anything?",
    a: "They will not build your roadmap, but they place you accurately. The five things we score are the ones that decide whether AI sticks or stalls, so a fast read across all five tells you where you actually stand and what to look at first. What to build is the Deployment Diagnostic's job.",
  },
  {
    q: "We tried AI already and it stalled.",
    a: "Most pilots stall for a reason that has nothing to do with the model: the data was not ready, nobody owned the outcome, or it never reached real work. The check points at which one is yours, so the next attempt does not repeat it.",
  },
  {
    q: "What if our data cannot leave our environment?",
    a: "Usually you can still deploy, under the right controls. The full answer is on the Data Residency page, written so you can forward it to your compliance team.",
  },
  {
    q: "What does deployment cost?",
    a: "A fixed fee, agreed in writing before we start. The figure comes out of the Deployment Diagnostic, with the business case behind it.",
  },
];

export function FitCheckFaq() {
  return (
    <section className="bg-field">
      <div className="wrap faq">
        <h2>
          Questions before you <em>start</em>
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
