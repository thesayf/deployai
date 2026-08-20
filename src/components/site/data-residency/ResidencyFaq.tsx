import { Accordion } from "../Accordion";

/**
 * 8 · M16 FAQ accordion (field). Ported from mock-data-residency.html §8.
 */
const items = [
  {
    q: '"Our data cannot leave our environment. Is that a problem?"',
    a: "Usually the opposite. It is how we prefer to work. The model is deployed inside your own cloud account, so your data stays where it already is and the model reaches it under your existing controls.",
  },
  {
    q: '"Is our data used to train the model?"',
    a: "Not by default. Anthropic does not train on your API inputs or outputs unless you explicitly opt in. The full commitment is on Anthropic's privacy pages, written so you can forward it to your compliance team.",
  },
  {
    q: '"How long is our data kept?"',
    a: "Anthropic deletes API inputs and outputs within thirty days by default, and zero-retention arrangements are available where that matters. When the deployment sits in your own cloud, retention follows your policies.",
  },
  {
    q: '"Which cloud do you support?"',
    a: "All the major ones: AWS, Google Cloud, and Azure, as well as first-party regional deployment. We fit your environment rather than asking you to fit ours.",
  },
  {
    q: '"What does this cost, and how fast can it go live?"',
    a: "Both depend on scope. You get a real number on the first call, and the Deployment Path shows the timeline from a two-to-three-week start onward.",
  },
];

export function ResidencyFaq() {
  return (
    <section className="bg-field" id="faq">
      <div className="wrap faq">
        <h2>
          Questions your team will <em>ask</em>.
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
