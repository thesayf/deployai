import { SiteLink } from "@/components/site/SiteLink";
import type { ReactNode } from "react";

/** Final CTA — could-we-do-this-for-you close. Navy + facet, bookending the
 *  hero and separating cleanly from the royal footer below. */
export function CaseCTA({ heading }: { heading: ReactNode }) {
  return (
    <section className="facet case-cta bg-navy" id="final">
      <div className="wrap">
        <h2>{heading}</h2>
        <div className="ctas">
          <SiteLink className="pill p-white" href="/book">
            Book a call
          </SiteLink>
          <SiteLink className="pill p-ghost" href="/fit-check">
            Take the free AI Fit Check
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
