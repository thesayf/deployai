import { SiteLink } from "../SiteLink";
import { fitCheckAssessmentUrl } from "../nav-config";

/** breather (lime strip). Fit Check pairing: start-the-check pill + book-a-call route. */
export function Breather() {
  return (
    <div className="breather">
      <div className="wrap in">
        <SiteLink className="pill p-ink" href={fitCheckAssessmentUrl}>
          Start the check
        </SiteLink>
        <SiteLink className="tert ink" href="#final">
          Book a 30-minute call
        </SiteLink>
      </div>
    </div>
  );
}
