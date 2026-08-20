import { Accordion, type AccordionItem } from "@/components/site/Accordion";

/** 8 · M16 FAQ accordion (field) — two about-native questions. */
const items: AccordionItem[] = [
  {
    q: "Do you work with businesses outside your own country?",
    a: "We work remotely with businesses in any region, on fixed-scope engagements.",
  },
  {
    q: "How reachable will you be once we start?",
    a: "You work with someone who knows your business, responds quickly, and is invested in your success.",
  },
];

export function AboutFaq() {
  return (
    <section className="bg-field">
      <div className="wrap faq">
        <h2>
          Questions you might be <em className="accent">asking</em>.
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
