import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "@/components/site/SiteLink";

/** 6 · M25 case-study result-card grid (navy, dark zone 2): three real builds.
 *  Front = screenshot slot + tag + client name; back (hover/focus/click) =
 *  outcome + read link. Click toggles .flip for touch; hover/focus handled in CSS. */
type Case = {
  img: string;
  title: string;
  /** object-position for the 16:9 crop (images differ in orientation). */
  pos?: string;
  /** case-study page; when set the card is a link, otherwise it flips only. */
  href?: string;
  desc: React.ReactNode;
};

const cases: Case[] = [
  {
    img: "/site/case-jb.jpg",
    pos: "50% 14%",
    href: "/work/jb-luxe-detailing",
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
    href: "/work/showcase-cinemas",
    desc: (
      <>
        A scheduling platform for cinema operations. Scheduling time cut by{" "}
        <b>95%</b>.
      </>
    ),
  },
  {
    img: "/site/case-centric.jpg",
    pos: "50% 50%",
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
          {cases.map((c, i) => {
            const inner = (
              <>
                <div className="sc-front">
                  <div className="sc-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="sc-shot"
                      src={c.img}
                      alt={c.title}
                      style={c.pos ? { objectPosition: c.pos } : undefined}
                    />
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
                  <p className="sc-read">
                    {c.href ? "Read the case study →" : "Case study coming soon"}
                  </p>
                </div>
              </>
            );
            return c.href ? (
              <SiteLink key={c.title} href={c.href} className="scard scard-link">
                {inner}
              </SiteLink>
            ) : (
              <div
                key={c.title}
                className={cn("scard", flipped.has(i) && "flip")}
                tabIndex={0}
                onClick={() => toggle(i)}
              >
                {inner}
              </div>
            );
          })}
        </div>
        <div className="ctas">See more of our work</div>
      </div>
    </section>
  );
}
