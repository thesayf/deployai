/** 6 · Stat ledger (lavender ground) — aitx-02 precedent. Serif-accent heading and
 *  attribution narrative left; numeral rows right. Honest sourcing: published
 *  results from the tooling we deploy, never presented as our client work. */
const rows = [
  {
    num: "79%",
    lab: "faster feature delivery at Rakuten: from 24 working days to 5, with Claude Code",
  },
  {
    num: "99.1%",
    lab: "of 2,913 legacy APIs converted by LG CNS in seven months, at roughly half the cost of a conventional rebuild",
  },
  {
    num: "86%",
    lab: "of support conversations resolved by Intercom's Fin agent after tuning, from 51% out of the box",
  },
];

export function EvidenceLedger() {
  return (
    <section className="bg-lavender" id="evidence">
      <div className="wrap ledger">
        <div className="led-left">
          <h2>
            Methods that <em>deliver</em>.
          </h2>
        </div>
        <div className="led-rows">
          <div className="led-head">Measured by the companies that ran them</div>
          {rows.map((r) => (
            <div className="led-row" key={r.num}>
              <div className="led-num">{r.num}</div>
              <div className="led-lab">{r.lab}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
