import { SiteLink } from "../SiteLink";

/** Slim onward-links row (white) after the case CTA: the next story and a
 *  services pointer, so case pages stop being dead ends. Arrow-link atoms. */
export function CaseNext({ next, nextHref }: { next: string; nextHref: string }) {
  return (
    <section className="case-next">
      <div className="wrap">
        <SiteLink className="arrow" href={nextHref}>
          Next story: {next}
        </SiteLink>
        <SiteLink className="arrow" href="/services">
          See the services
        </SiteLink>
      </div>
    </section>
  );
}
