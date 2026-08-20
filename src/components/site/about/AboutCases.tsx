import { useState } from "react";
import { cn } from "@/lib/utils";

/** 6 · M25 case-study result-card grid (navy, dark zone 2): three real builds.
 *  Front = screenshot slot + tag + client name; back (hover/focus/click) =
 *  outcome + read link. Click toggles .flip for touch; hover/focus handled in CSS. */
type Case = {
  img: string;
  title: string;
  desc: React.ReactNode;
};

const cases: Case[] = [
  {
    img: "/site/case-jb.jpg",
    title: "JB Luxe Detailing.",
    desc: (
      <>
        A booking assistant that answers enquiries and takes appointments.
        Bookings up <b>300%</b>.
      </>
    ),
  },
  {
    img: "/site/case-showcase.jpg",
    title: "Showcase Cinemas.",
    desc: (
      <>
        A scheduling platform for cinema operations. Scheduling time cut by{" "}
        <b>95%</b>.
      </>
    ),
  },
  {
    img: "/site/case-centric.jpg",
    title: "Centric.",
    desc: (
      <>
        A research and proposal platform. Proposals that once took weeks now take{" "}
        <b>fifteen minutes</b>.
      </>
    ),
  },
];

export function AboutCases() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <section className="bg-navy about-cases" id="proof">
      <div className="wrap">
        <h2>
          What we&apos;ve <em className="accent">built</em>.
        </h2>
        <p className="case-intro">
          A few of the things we have shipped, with the numbers the clients saw.
        </p>
        <div className="sc-row">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={cn("scard", flipped.has(i) && "flip")}
              tabIndex={0}
              onClick={() => toggle(i)}
            >
              <div className="sc-front">
                <div className="sc-img">
                  <img className="sc-shot" src={c.img} alt={c.title} />
                </div>
                <p className="sc-tag">Case study</p>
                <h3 className="sc-title">{c.title}</h3>
              </div>
              <div className="sc-back">
                <div>
                  <p
                    className="sc-tag"
                    style={{ color: "#292929", padding: 0, margin: "0 0 12px" }}
                  >
                    Case study
                  </p>
                  <p className="sc-desc">{c.desc}</p>
                </div>
                <p className="sc-read">Read the case study</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ctas">See more of our work</div>
      </div>
    </section>
  );
}
