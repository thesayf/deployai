/** 2 · A1 credential cleanser strip (periwinkle). Text badges + one line of copy.
 *  Distinct from the badge-wall CredBar — this is the services mock's mechanism. */
export function CredStrip() {
  return (
    <div className="credstrip">
      <div className="wrap in">
        <div className="badges">
          <span>Anthropic Partner Network</span>
          <span>Claude Certified Architect</span>
        </div>
        <div className="line">
          Our Claude Certified team delivers secure deployment, rapid adoption, and
          measurable business outcomes. One accountable team, start to finish, with
          defined milestones and a timeline that doesn&rsquo;t move.
        </div>
      </div>
    </div>
  );
}
