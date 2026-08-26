/** 2 · M12 numbered agenda — what the call covers. Reuses the house .m12nd grid. */
const items = [
  { n: "01.", t: "What your business does, and who your customers are" },
  {
    n: "02.",
    t: "Where your operation is leaking time or money right now",
  },
  { n: "03.", t: "Where AI could create the most value for you" },
  { n: "04.", t: "Whether we are the right fit for your situation" },
  {
    n: "05.",
    t: "Realistic timelines, and what getting started involves",
  },
];

export function BookAgenda() {
  return (
    <section className="m12nd book-agenda" id="agenda">
      <div className="wrap">
        <h2>
          What we will <em className="accent">cover</em>.
        </h2>
        <div className="grid3">
          {items.map((i) => (
            <div key={i.n}>
              <div className="num">{i.n}</div>
              <h6>{i.t}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
