/** 3 · M23 serif quote + photo + attribution (navy). Was an M14 bio-card;
 *  moved to M23 so the founder has a voice, the navy cluster pairs a photo-left
 *  quote (here) with the centred M25 grid below (two distinct mechanisms), and
 *  the headshot appears once. Copy gated (verify_stitch + audit_invention PASS). */
export function AboutFounder() {
  return (
    <section className="bg-navy qt" id="founder">
      <div className="wrap">
        <h2 className="qt-h">
          The humans driving the <em className="accent">tech</em>.
        </h2>
        <div className="qrow">
          <div className="qphoto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/site/team/rudi-hinds.jpg"
              alt="Rudi Hinds, founder of Deploy AI Studio"
            />
          </div>
          <div className="qtext">
            <blockquote>
              When the person who understands your business is the same person
              who builds the system, there is no translation layer, and nothing
              is lost between intent and execution.
            </blockquote>
            <div className="lab">
              <div className="lab-name">Rudi Hinds</div>
              <div className="lab-role">Founder · Claude Certified Architect</div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
