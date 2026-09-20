import React from "react";

/** P09 proof / stat band — prose column + big light-weight stat numerals (lime on statnavy, navy on lavender). */
export function ProofBand({ credStrip, heading, prose = [], statsIntro, stats = [], fine, ground = "statnavy" }) {
  return (
    <>
      {credStrip && credStrip.length > 0 && (
        <div className="credband"><div className="wrap"><div className="cred">{credStrip.map((c, i) => <span key={i}>{c}</span>)}</div></div></div>
      )}
      <section className={ground === "lavender" ? "bg-lavender" : "bg-statnavy"}>
        <div className="wrap p9">
          <div className="prose">
            <h2 className="h3t">{heading}</h2>
            {prose.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="statscol">
            {statsIntro && <div className="intro">{statsIntro}</div>}
            <div className="rows">
              {stats.map((s, i) => (
                <div className="srow" key={i}><div className="n">{s.n}</div><div className="d">{s.d}</div></div>
              ))}
            </div>
            {fine && <div className="fine">{fine}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
