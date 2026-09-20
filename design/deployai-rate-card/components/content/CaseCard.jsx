import React from "react";

/** M25 case-study flip card (.sc-cards family). Front: portrait shot + title + serif client. Hover: accent ground + outcome. Wrap cards in <div className="sc-cards"><div className="sc-row">…</div></div>. */
export function CaseCard({ img, pos, href = "#", title, client, desc, sector, metric }) {
  return (
    <a href={href} className="scard scard-link">
      <div className="sc-front">
        <div className="sc-img"><img loading="lazy" className="sc-shot" src={img} alt={`${client} — ${title}`} style={pos ? { objectPosition: pos } : undefined} /></div>
        <p className="sc-tag">Case study</p>
        <h3 className="sc-title">{title}</h3>
        <p className="sc-client">{client}</p>
      </div>
      <div className="sc-back">
        <div>
          <p className="sc-tag">Case study</p>
          <p className="sc-desc">{desc}</p>
          <p className="sc-meta"><b>Sector</b>{sector}</p>
        </div>
        <div className="sc-foot">
          <span className="sc-read">Read the story →</span>
          <span className="sc-metric">{metric}</span>
        </div>
      </div>
    </a>
  );
}
