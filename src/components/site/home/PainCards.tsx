/** 2 · Pain cards — M21 bold-lead text cells (white ground). */
const cards = [
  {
    h: "“We know AI matters. We do not know where it applies to us.”",
    p: "You have read the case studies. None of them are your business. The ROI is not clear, the scope feels enormous, and the last thing you need is a six-month strategy engagement before a single line of code gets written.",
  },
  {
    h: "“We bought the seats. Almost nobody uses them.”",
    p: "The licence was never the product. Working workflows are. AI licences get assigned in a burst of enthusiasm and then sit idle.",
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
