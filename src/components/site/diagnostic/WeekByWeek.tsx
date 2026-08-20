/** 7 · A2 week by week (statnavy) — the one accent band. #week-by-week.
 *  P09 row geometry: 136px lime label + 32 gap, 20/32 white desc. */
const weeks = [
  {
    n: "Week 1",
    d: "Interviews with the people who do the work, department leads, practitioners, and leadership, walking through their actual workflows: what triggers each process, where handoffs happen, where things break down, and how long each step takes.",
  },
  {
    n: "Week 2",
    d: "Working sessions with department leads surface process pain points, existing workarounds, and the tasks teams would most readily hand over. Priority workflows are scoped in detail.",
  },
  {
    n: "Week 3",
    d: "Use cases are scored on effort and impact, and a business case is built on your spend baseline with a payback period. The engagement closes with an executive readout.",
  },
];

export function WeekByWeek() {
  return (
    <section className="bg-statnavy a2" id="week-by-week">
      <div className="wrap">
        <h2 className="h3t">
          Two to three weeks to a clear <em>deployment plan.</em>
        </h2>
        <div className="rows">
          {weeks.map((w) => (
            <div className="srow" key={w.n}>
              <div className="n">{w.n}</div>
              <div className="d">{w.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
