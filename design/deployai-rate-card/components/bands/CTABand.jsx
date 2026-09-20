import React from "react";

/** M17 final CTA — the one warm (coral) band. Copy left, calendar card right. */
export function CTABand({ id = "final", heading, paragraphs = [], ctas = [], fineNote, calendarSlot }) {
  return (
    <section className="bg-coral" id={id}>
      <div className="wrap final">
        <div>
          <h2>{heading}</h2>
          {paragraphs.map((p, i) => <p key={i} style={i === 0 ? { marginTop: 18 } : undefined}>{p}</p>)}
          {fineNote && <p className="fine">{fineNote}</p>}
          <div className="ctas">
            {ctas.map(c => <a key={c.label} href={c.href} className={c.className}>{c.label}</a>)}
          </div>
        </div>
        <div className="cal-ph">
          {calendarSlot ?? <span className="slot-label">INLINE CALENDAR EMBED</span>}
        </div>
      </div>
    </section>
  );
}
