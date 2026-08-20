import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "../SiteLink";

/** 4 · P05 tabbed offers (white ground, M07). */
type Offer = {
  id: string;
  name: string;
  line: string;
  desc: string;
  bullets: string[];
  dur: string;
  ctaLabel: string;
  rail: string[];
  img: string;
};

const offers: Offer[] = [
  {
    id: "t1",
    name: "Launch",
    line: "Get your people actually using it.",
    desc: "A licence doesn't change how anyone works. We train your teams on the jobs they do every week and wire AI into the tools they already open, with access and data rules set before anyone touches production. You leave with habits that hold, not a row of idle seats.",
    bullets: [
      "People reach for AI in the tools they already use",
      "The workflows they run every week get faster",
      "Nobody touches real data without the rules in place",
    ],
    dur: "Scoped in the diagnostic",
    ctaLabel: "Let's talk about Launch",
    rail: [
      "AI platform configured for your teams",
      "Shared workspaces, set up and governed",
      "Access and data rules in writing",
      "Hands-on training on your workflows",
    ],
    img: "/site/offer-launch.jpg",
  },
  {
    id: "t2",
    name: "Connect",
    line: "Make it answer from your business, not the internet.",
    desc: "Generic AI guesses. We connect it to your own documents and systems so answers come from your knowledge, with your existing access controls kept intact. Your people ask in plain language and get answers they can trust.",
    bullets: [
      "Answers come from your knowledge, not the public internet",
      "Your people find what they need in seconds",
      "Access controls stay exactly as they are",
    ],
    dur: "Scoped in the diagnostic",
    ctaLabel: "Let's talk about Connect",
    rail: [
      "Retrieval over your internal knowledge",
      "Answers drawn from your own documents and systems",
      "Your access controls preserved",
      "A system tested on your real questions",
    ],
    img: "/site/offer-connect.jpg",
  },
  {
    id: "t3",
    name: "Automate",
    line: "Put AI to work inside your systems.",
    desc: "Most pilots die between the demo and production. We design and build agents that run inside your real systems, with decision logic that follows your rules and a full audit trail from day one. Not a proof of concept. A live system your team can trust.",
    bullets: [
      "Work that used to need a person runs on its own",
      "Every decision follows your rules and leaves a trail",
      "It runs in production, not a sandbox",
    ],
    dur: "Scoped in the diagnostic",
    ctaLabel: "Let's talk about Automate",
    rail: [
      "Custom agents built into your real systems",
      "Decision logic that follows your business rules",
      "Full auditability and traceability from day one",
      "Integration with the tools you already use",
    ],
    img: "/site/offer-automate.jpg",
  },
  {
    id: "t4",
    name: "Retainer",
    line: "Keep it working after go-live.",
    desc: "Governance drifts and models move. We stay on to tune what's live, add the next use case when you're ready, and keep the whole thing accountable. You keep improving without hiring for it.",
    bullets: [
      "What's live keeps working as things change",
      "The next use case ships without a new hire",
      "Someone senior stays accountable",
    ],
    dur: "Monthly · rolling · 30-day notice",
    ctaLabel: "Let's talk about the Retainer",
    rail: [
      "New use cases as you need them",
      "Model and tooling updates",
      "Governance and performance kept in check",
      "A senior team on call",
    ],
    img: "/site/offer-retainer.jpg",
  },
];

export function OffersTabs() {
  const [active, setActive] = useState("t1");

  return (
    <section>
      <div className="wrap">
        <h2>
          What we <em>build</em>.
        </h2>
        <div className="tabbar" role="tablist">
          {offers.map((o) => (
            <button
              key={o.id}
              className={cn("tabbtn", active === o.id && "on")}
              role="tab"
              aria-selected={active === o.id}
              onClick={() => setActive(o.id)}
            >
              {o.name}
            </button>
          ))}
        </div>
        {offers.map((o) => (
          <div
            key={o.id}
            className={cn("tabpanel", active === o.id && "on")}
            id={o.id}
            role="tabpanel"
          >
            <div>
              <div className="tp-name">{o.name}</div>
              <div className="tp-line">{o.line}</div>
              <p className="tp-desc">{o.desc}</p>
              <div className="tp-help">What changes:</div>
              <ul className="tp-bullets">
                {o.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tp-dur">{o.dur}</div>
              <div className="tp-cta">
                <SiteLink className="pill p-blue" href="#final">
                  {o.ctaLabel}
                  {"  →"}
                </SiteLink>
              </div>
            </div>
            <div className="rail">
              <div className="eyebrow">What you get</div>
              <ul>
                {o.rail.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="artslot">
                <img
                  className="art-img"
                  src={o.img}
                  alt={`Deploy AI working session — ${o.name}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
