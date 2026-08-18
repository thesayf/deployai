import { SiteLink } from "../SiteLink";
import { ProofBand } from "../ProofBand";

/** 5 · Where we stand — FOMO agitation backed by attributed stats, resolved by the
 *  practitioner positioning (we build, we ship, few teams actually deploy). Lavender ground. */
export function ProofStats() {
  return (
    <ProofBand
      ground="lavender"
      heading={
        <>
          Everyone&apos;s using AI. Almost nobody&apos;s <em>winning</em> with it.
        </>
      }
      prose={[
        "The problem was never the model. It's that AI rarely reaches the actual work.",
        <>
          {
            "We're practitioners. We've spent years building AI and automation that runs inside real businesses, not slide decks about it, and we get it past the pilot. We're in the Anthropic Partner Network and hold the Claude Certified Architect credential. "
          }
          <SiteLink className="tert" href="/fit-check">
            Start with the free Fit Check
          </SiteLink>
        </>,
      ]}
      statsIntro="The gap, in numbers"
      stats={[
        {
          n: "88%",
          d: "of companies now use AI. Only about 6% get real value from it. (McKinsey, 2025)",
        },
        {
          n: "95%",
          d: "of AI pilots deliver no measurable return. (MIT Project NANDA, 2025)",
        },
        {
          n: "42%",
          d: "now scrap most of their AI projects, up from 17% a year ago. (S&P Global, 2025)",
        },
      ]}
    />
  );
}
