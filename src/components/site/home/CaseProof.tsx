import { CaseCard, caseCards } from "../CaseCard";

/** 5b · Case proof (white ground) — shared M25 case cards (CaseCard). */
export function CaseProof() {
  return (
    <section className="sc-cards home-cases">
      <div className="wrap">
        <h2>
          Where it&rsquo;s already <em>working</em>.
        </h2>
        <div className="sc-row">
          {caseCards.map((c) => (
            <CaseCard key={c.client} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
