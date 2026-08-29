import type { ReactNode } from "react";

/** 7 · Team (navy) — Slalom "meet some of our leaders" pattern.
 *  Reframed from the single-founder card: shows senior bench depth.
 *  Roles are slots pending confirmation; Valeria's photo is not yet supplied. */
type Member = {
  name: string;
  src: string | null;
  role: ReactNode;
};

// Titles confirmed 2026-08 (founders + Mudather); Nadya/Valeria still to confirm.
const members: Member[] = [
  {
    name: "Nadya Nyagolova",
    src: "/site/team/nadya-nyagolova.png",
    role: "Engagement Lead",
  },
  {
    name: "Rudi Hinds",
    src: "/site/team/rudi-hinds.jpg",
    role: "Co-Founder & Head of AI Engineering",
  },
  {
    name: "Rori Hinds",
    src: "/site/team/rori-hinds.jpg",
    role: "Co-Founder & AI Engineer",
  },
  {
    name: "Ammar Srour",
    src: "/site/team/ammar-srour.png",
    role: "Lead AI Engineer",
  },
  {
    name: "Mudather Alhooti",
    src: "/site/team/mudather-alhooti.png",
    role: "Head of Business Development",
  },
  {
    name: "Valeria Piumatti",
    src: "/site/team/valeria-piumatti.png",
    role: "Delivery Lead",
  },
];

export function Team() {
  return (
    <section className="bg-navy">
      <div className="wrap team">
        <h2>
          The people who scope it <em>build</em> it.
        </h2>
        <p className="team-intro">
          We&apos;re a small team of senior practitioners, and everyone here has
          shipped AI into production before. The people who scope your
          engagement are the ones who lead it and do the building, and they stay
          accountable through go-live and the weeks after, when the questions
          that matter actually surface. You work with the same faces from the
          first call to a running system.
        </p>

        <div className="team-grid">
          {members.map((m) => (
            <div className="tm" key={m.name}>
              <div className="tm-photo">
                {m.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tm-img"
                    src={m.src}
                    alt={m.name}
                  />
                ) : (
                  <span className="slot-label">PHOTO SLOT — {m.name}</span>
                )}
              </div>
              <div className="tm-name">{m.name}</div>
              <div className="tm-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
