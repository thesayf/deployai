/** 5 · what it is: definition prose + M20 six-question diagram (white). #what-it-is */
export function WhatItIs() {
  return (
    <section className="whatis" id="what-it-is">
      <div className="wrap">
        <h2>
          We start with the <em>foundations.</em>
        </h2>
        <p className="lead">
          The Diagnostic answers the key questions before anyone writes code: what to
          apply AI to, in what order, what it will cost and return, and who owns it.
        </p>
        <p className="lead">
          Those answers depend on the ground AI will stand on. So we examine the
          foundations and score each one against evidence from your real systems,
          your data, and how your teams actually work.
        </p>
        <div
          className="eyebrow"
          style={{ color: "var(--grey)", marginBottom: 16 }}
        >
          The foundations
        </div>
        <div className="wlrule" />
        <div className="bp">
          <svg
            viewBox="0 0 960 510"
            width={960}
            style={{ maxWidth: "100%", display: "block", marginTop: 12 }}
          >
            <rect x="360" y="0" width="240" height="44" rx="22" fill="#0F1C41" />
            <text
              x="480"
              y="28"
              textAnchor="middle"
              fontFamily="Hanken Grotesk"
              fontSize="15"
              fontWeight="700"
              letterSpacing="2"
              fill="#DEFF4D"
            >
              THE FOUNDATIONS
            </text>
            <line x1="480" y1="44" x2="480" y2="430" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <line x1="450" y1="140" x2="480" y2="140" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <line x1="480" y1="140" x2="510" y2="140" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <rect x="20" y="80" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="44" cy="110" r="5" fill="#0C62FB" />
            <text x="62" y="116" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Strategy and vision
            </text>
            <text x="62" y="144" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="62" dy="0">How do AI goals align with business priorities and</tspan>
              <tspan x="62" dy="20">leadership objectives?</tspan>
            </text>
            <rect x="510" y="80" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="534" cy="110" r="5" fill="#0C62FB" />
            <text x="552" y="116" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Data foundation
            </text>
            <text x="552" y="144" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="552" dy="0">Is data in a quality state, accessible with security</tspan>
              <tspan x="552" dy="20">and governance in place?</tspan>
            </text>
            <line x1="450" y1="285" x2="480" y2="285" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <line x1="480" y1="285" x2="510" y2="285" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <rect x="20" y="225" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="44" cy="255" r="5" fill="#0C62FB" />
            <text x="62" y="261" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Organisation and culture
            </text>
            <text x="62" y="289" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="62" dy="0">What is the level of your AI literacy, workforce</tspan>
              <tspan x="62" dy="20">skills and appetite for change management?</tspan>
            </text>
            <rect x="510" y="225" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="534" cy="255" r="5" fill="#0C62FB" />
            <text x="552" y="261" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Technical infrastructure
            </text>
            <text x="552" y="289" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="552" dy="0">Do you have the necessary hardware, cloud computing</tspan>
              <tspan x="552" dy="20">strategy and integration capabilities?</tspan>
            </text>
            <line x1="450" y1="430" x2="480" y2="430" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <line x1="480" y1="430" x2="510" y2="430" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <rect x="20" y="370" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="44" cy="400" r="5" fill="#0C62FB" />
            <text x="62" y="406" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Governance and compliance
            </text>
            <text x="62" y="434" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="62" dy="0">Have you incorporated risk frameworks, AI usage</tspan>
              <tspan x="62" dy="20">policies and regulatory controls?</tspan>
            </text>
            <rect x="510" y="370" width="430" height="120" rx="10" fill="#fff" stroke="#0F1C41" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="534" cy="400" r="5" fill="#0C62FB" />
            <text x="552" y="406" fontFamily="Hanken Grotesk" fontSize="19" fontWeight="700" fill="#0F1C41">
              Model management
            </text>
            <text x="552" y="434" fontFamily="Hanken Grotesk" fontSize="15" fill="#696969">
              <tspan x="552" dy="0">How are you currently developing, monitoring and</tspan>
              <tspan x="552" dy="20">maintaining AI models?</tspan>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
