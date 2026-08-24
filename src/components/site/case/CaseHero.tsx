import type { ReactNode } from "react";

/** M02 case hero — full-bleed client photo + logo lockup, sector eyebrow,
 *  outcome headline, one headline metric. */
export function CaseHero({
  title,
  photo,
  logo,
  metric,
}: {
  title: ReactNode;
  photo: string;
  logo: string;
  metric: { value: string; label: string };
}) {
  return (
    <section className="ihero case-hero" id="top">
      <div
        className="ihero-photo"
        aria-hidden="true"
        style={{ backgroundImage: `url('${photo}')` }}
      />
      <div className="ihero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="ch-lockup">
          <span className="ch-by">Deploy AI Studio for</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ch-logo" src={logo} alt="" />
        </div>
        <h1>{title}</h1>
        <div className="ch-metric">
          <span className="ch-num">{metric.value}</span>
          <span className="ch-lab">{metric.label}</span>
        </div>
      </div>
    </section>
  );
}
