/** 7 · P11 founder card (navy — human dark pivot). */
export function Founder() {
  return (
    <section className="bg-navy founder-navy">
      <div className="wrap founder">
        <div className="exp-card">
          <div className="photo-slot">
            <span className="slot-label">FOUNDER PHOTO SLOT — open decision 11.4</span>
          </div>
          <div className="exp-name">
            <span className="slot-label">[Founder name]</span>
          </div>
          <div className="exp-role">
            Founder, Deploy AI Studio · Claude Certified Architect
          </div>
          <a className="exp-link" href="#">
            Connect on LinkedIn <span className="in">in</span>
          </a>
        </div>
        <div className="fcopy">
          <h2>
            You work with the person who <em>builds</em> it.
          </h2>
          <p style={{ marginTop: 18 }}>
            We are a boutique applied AI consulting firm. Small by choice, senior
            by design, and accountable for what happens after launch, not just the
            plan.
          </p>
          <p>
            No pyramid. No handover to juniors. The person on the first call is the
            person who scopes the work and ships it.
          </p>
        </div>
      </div>
    </section>
  );
}
