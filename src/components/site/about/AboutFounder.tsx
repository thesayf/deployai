/** 3 · M14 founder card (white ground so the field-toned photo slot reads).
 *  Banlist fix applied: original mock read "doesn't just understand the
 *  technology; they understand your business" ("not just X; Y"). */
export function AboutFounder() {
  return (
    <section id="founder">
      <div className="wrap founder">
        <div className="exp-card">
          <div className="photo-slot filled">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="founder-img"
              src="/site/team/rudi-hinds.jpg"
              alt="Rudi Hinds, founder of Deploy AI Studio"
            />
          </div>
          <div className="exp-name">Rudi Hinds</div>
          <div className="exp-role">Claude Certified Architect</div>
          <a
            className="exp-link"
            href="https://www.linkedin.com/in/rudi-hinds-3b25b6137/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="li-logo"
              src="/site/linkedin-logo.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
        <div className="fcopy">
          <h2>
            The humans driving the <em className="accent">tech</em>.
          </h2>
          <p>
            The person building your system understands both the technology and
            your business. There is no translation layer between business intent
            and technical execution. Compliance, governance, and risk
            considerations are built into system design from the start.
          </p>
          <p>That person is a Claude Certified Architect.</p>
        </div>
      </div>
    </section>
  );
}
