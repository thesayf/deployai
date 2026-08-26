import { SiteLink } from "@/components/site/SiteLink";
import { fitCheckAssessmentUrl } from "@/components/site/nav-config";

/** 5 · off-ramp — "not ready" is a fine answer; route to the free Fit Check. */
export function BookOffRamp() {
  return (
    <section className="honesty bg-field" id="off-ramp">
      <div className="wrap">
        <h2>
          Not ready, or not sure it is a <em className="accent">fit</em>?
        </h2>
        <p className="lead">
          This call is free and carries no obligation. If we are not the right
          fit, we will tell you and do our best to point you in the right
          direction. We only work with businesses where we are confident we can
          create real value.
        </p>
        <p className="lead">
          Start with a free AI Fit Check. It takes ten minutes, and your scored
          result comes straight to your inbox.
        </p>
        <p className="fineprint">
          What each service covers is on the{" "}
          <SiteLink href="/services">Services</SiteLink> page, and how
          engagements are scoped and priced is explained on the{" "}
          <SiteLink href="/deployment-diagnostic">
            Deployment Diagnostic
          </SiteLink>{" "}
          page.
        </p>
        <div className="ctas">
          <SiteLink className="pill p-blue" href={fitCheckAssessmentUrl}>
            Take the free AI Fit Check
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
