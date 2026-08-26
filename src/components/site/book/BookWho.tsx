/** 4 · Who's on the call — a small senior team (differentiated variant of the
 *  Home team grid: three circular avatars, not the full tile grid). Shows a
 *  bench, not a lone founder, so the booking page reads boutique-with-depth. */
const team = [
  {
    name: "Rudi Hinds",
    role: "Claude Certified Architect",
    src: "/site/team/rudi-hinds.jpg",
  },
  {
    name: "Ammar Srour",
    role: "Lead AI Engineer",
    src: "/site/team/ammar-srour.png",
  },
  {
    name: "Nadya Nyagolova",
    role: "Engagement Lead",
    src: "/site/team/nadya-nyagolova.png",
  },
];

export function BookWho() {
  return (
    <section className="who" id="who">
      <div className="wrap">
        <div className="grid">
          <div className="fcopy">
            <h2>
              A personal <em className="accent">consultation</em>.
            </h2>
            <p>
              You&rsquo;ll talk with people who put AI into production every
              day, and know the terrain where most projects stall.
            </p>
          </div>
          <div className="who-team">
            {team.map((m) => (
              <div className="wt" key={m.name}>
                <div className="wt-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.name} />
                </div>
                <div className="wt-name">{m.name}</div>
                <div className="wt-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
