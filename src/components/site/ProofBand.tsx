import type { ReactNode } from "react";

export type Stat = { n: ReactNode; d: ReactNode };

type ProofBandProps = {
  /** Optional cyan credential strip above the band. */
  credStrip?: ReactNode[];
  heading: ReactNode;
  /** Left-column prose paragraphs (may contain inline links). */
  prose: ReactNode[];
  /** Bold lead heading above the stat rows, inside the stats column (Slalom H6). */
  statsIntro?: ReactNode;
  stats: Stat[];
  fine?: ReactNode;
  /** Ground: "statnavy" (dark, lime numerals) or "lavender" (Slalom ai-transformation, dark text). */
  ground?: "statnavy" | "lavender";
};

/**
 * P09 proof / stat band (statnavy ground, lime numerals). Reusable across pages.
 * The stat rows distribute vertically to balance the stats column against the
 * prose column's height (Slalom ai-transformation treatment), so it adapts to
 * any prose length or stat count.
 */
export function ProofBand({
  credStrip,
  heading,
  prose,
  statsIntro,
  stats,
  fine,
  ground = "statnavy",
}: ProofBandProps) {
  return (
    <>
      {credStrip && credStrip.length > 0 && (
        <div className="credband">
          <div className="wrap">
            <div className="cred">
              {credStrip.map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      <section
        className={ground === "lavender" ? "bg-lavender" : "bg-statnavy"}
      >
        <div className="wrap p9">
          <div className="prose">
            <h2 className="h3t">{heading}</h2>
            {prose.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="statscol">
            {statsIntro && <div className="intro">{statsIntro}</div>}
            <div className="rows">
              {stats.map((s, i) => (
                <div className="srow" key={i}>
                  <div className="n">{s.n}</div>
                  <div className="d">{s.d}</div>
                </div>
              ))}
            </div>
            {fine && <div className="fine">{fine}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
