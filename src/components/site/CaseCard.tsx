import { SiteLink } from "./SiteLink";

/** Shared M25 case-study card (`.sc-cards` family) — upgrade spec in
 *  design-board/CARD-UPGRADE-PLAN.md. Front: portrait shot + tag + story title
 *  + serif client line. Hover/focus face: accent ground (positional nth-child
 *  cycle), outcome summary, sector meta, read link + metric. Touch devices get
 *  the image front only with an accent bottom rule; the whole card links. */
export type CaseCardData = {
  img: string;
  /** object-position for the 4:5 portrait crop. */
  pos?: string;
  href: string;
  title: string;
  client: string;
  desc: React.ReactNode;
  sector: string;
  metric: string;
};

export const caseCards: CaseCardData[] = [
  {
    img: "/site/case-jb.jpg",
    pos: "50% 30%",
    href: "/work/jb-luxe-detailing",
    title: "A booking assistant that never sleeps",
    client: "JB Luxe Detailing",
    desc: (
      <>
        Bookings tripled. An assistant, CRM and diary now run the whole client
        journey.
      </>
    ),
    sector: "Automotive services",
    metric: "Replies in 30 seconds",
  },
  {
    img: "/site/case-showcase.jpg",
    pos: "50% 40%",
    href: "/work/showcase-cinemas",
    title: "AI scheduling across the chain",
    client: "Showcase Cinemas",
    desc: (
      <>
        Weekly scheduling fell from forty hours to under two, and revenue per
        screen rose <b>18%</b>.
      </>
    ),
    sector: "Cinema operations",
    metric: "Live in 4 weeks",
  },
  {
    img: "/site/case-centric.jpg",
    pos: "30% 35%",
    href: "/work/centric-community-research",
    title: "Tenders out in days",
    client: "Centric Community Research",
    desc: (
      <>
        A research and proposal platform. Proposals that once took weeks now
        take <b>fifteen minutes</b>.
      </>
    ),
    sector: "Community research",
    metric: "Knowledge on demand",
  },
];

export function CaseCard({ c }: { c: CaseCardData }) {
  return (
    <SiteLink href={c.href} className="scard scard-link">
      <div className="sc-front">
        <div className="sc-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            className="sc-shot"
            src={c.img}
            alt={`${c.client} — ${c.title}`}
            style={c.pos ? { objectPosition: c.pos } : undefined}
          />
        </div>
        <p className="sc-tag">Case study</p>
        <h3 className="sc-title">{c.title}</h3>
        <p className="sc-client">{c.client}</p>
      </div>
      <div className="sc-back">
        <div>
          <p className="sc-tag">Case study</p>
          <p className="sc-desc">{c.desc}</p>
          <p className="sc-meta">
            <b>Sector</b>
            {c.sector}
          </p>
        </div>
        <div className="sc-foot">
          <span className="sc-read">Read the story →</span>
          <span className="sc-metric">{c.metric}</span>
        </div>
      </div>
    </SiteLink>
  );
}
