import React from "react";

/** Claude certification badge wall. Badges render as images when `src` given, else text badges. Grayscale → colour on hover. */
export function CredBar({ label = "Anthropic partner · Claude certified", badges = [] }) {
  return (
    <section className="cred-band">
      <div className="wrap">
        <span className="creds-label">{label}</span>
        <div className="creds-row">
          {badges.map(b => b.src
            ? <img loading="lazy" key={b.alt} className="cred-badge" src={b.src} alt={b.alt} />
            : <span key={b.alt} className="cred-badge-text">{b.alt}</span>)}
        </div>
      </div>
    </section>
  );
}
