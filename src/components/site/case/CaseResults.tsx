import type { ReactNode } from "react";

/** P09 outcome-metric band (statnavy) — three big numbers + captions. */
export function CaseResults({
  heading,
  stats,
}: {
  heading: ReactNode;
  stats: { n: string; label: string }[];
}) {
  return (
    <section className="bg-field case-results" id="results">
      <div className="wrap">
        <h2>{heading}</h2>
        <div className="cr-row">
          {stats.map((s) => (
            <div className="cr-stat" key={s.label}>
              <div className="cr-n">{s.n}</div>
              <div className="cr-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
