/** 2 · Pain cards — M21 bold-lead text cells (white ground). */
const cards = [
  {
    h: "“We know AI matters. We do not know where it applies to us.”",
    p: "You have read the case studies. None of them are your business. The ROI is not clear, the scope feels enormous, and the last thing you need is a six-month strategy engagement before a single line of code gets written.",
  },
  {
    h: "“We keep paying more for AI. Is it actually working?”",
    p: "The tools are in real use and the bills climb every month. What is missing is a straight answer on impact: whether it is paying off, and where the money is going.",
  },
  {
    h: "“Our pilot never made it to production.”",
    p: "Getting a model running is the easy part. Making it work inside your systems is the job. Prototypes that perform brilliantly in controlled demos collapse the moment they connect to real production systems, real data, and real edge cases.",
  },
];

export function PainCards() {
  return (
    <section>
      <div className="wrap">
        <h2>
          Three things we <em>hear</em> every week.
        </h2>
        <div className="cards3">
          {cards.map((c) => (
            <div className="pain-card" key={c.h}>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
