import { CaseCard, caseCards } from "@/components/site/CaseCard";

/** 6 · M25 case-study result-card grid (navy, dark zone 2): three real builds.
 *  Cards are the shared CaseCard (`.sc-cards` family). */
export function AboutCases() {
  return (
    <section className="bg-navy about-cases sc-cards" id="proof">
      <div className="wrap">
        <h2>
          What we&apos;ve <em className="accent">built</em>.
        </h2>
        <p className="case-intro">
          A few of the things we have shipped, with the numbers the clients saw.
        </p>
        <div className="sc-row">
          {caseCards.map((c) => (
            <CaseCard key={c.client} c={c} />
          ))}
        </div>
        <div className="ctas">See more of our work</div>
      </div>
    </section>
  );
}
