/**
 * 6 · M25 differentiators grid (field ground). Sector-rules intro above a
 * three-cell grid (Financial services / Healthcare / Government & public
 * sector) with Lucide-style line icons (shield / cross / landmark), 2px blue
 * stroke. Ported from mock-data-residency.html §6.
 */
export function SectorRules() {
  return (
    <section className="sector bg-field" id="sector">
      <div className="wrap">
        <h2>
          Sector rules are the real <em>constraint</em>, not residency in the
          abstract.
        </h2>
        <p className="intro">
          In the most regulated industries, financial services, healthcare,
          government, the rules set where data can go and under what conditions.
          The law generally governs how data moves, not whether AI is allowed to
          touch it. We design the deployment around those rules from the start,
          so the question your regulator will ask already has an answer by the
          time they ask it.
        </p>
        <div className="sec-grid">
          <div className="sec-cell">
            <span className="sec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
            </span>
            <span className="sec-name">Financial services</span>
            <p className="sec-anchor">
              In your own region and cloud, under SOC 2 Type II. Market and
              client data never leaves your regulatory boundary.
            </p>
          </div>
          <div className="sec-cell">
            <span className="sec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2z" />
              </svg>
            </span>
            <span className="sec-name">Healthcare</span>
            <p className="sec-anchor">
              HIPAA-ready deployment with a BAA available. Protected health data
              stays inside your environment.
            </p>
          </div>
          <div className="sec-cell">
            <span className="sec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <line x1="3" x2="21" y1="22" y2="22" />
                <line x1="6" x2="6" y1="18" y2="11" />
                <line x1="10" x2="10" y1="18" y2="11" />
                <line x1="14" x2="14" y1="18" y2="11" />
                <line x1="18" x2="18" y1="18" y2="11" />
                <polygon points="12 2 20 7 4 7" />
              </svg>
            </span>
            <span className="sec-name">Government &amp; public sector</span>
            <p className="sec-anchor">
              Deployed in-country, in your own government cloud. Data residency
              and sovereignty by design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
