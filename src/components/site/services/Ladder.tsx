import { SiteLink } from "../SiteLink";
import { cn } from "@/lib/utils";

/** 6 · M13+M12 offer ladder (white). Four fixed-scope steps; step 03 is the featured navy card. */
type Step = {
  num: string;
  name: string;
  meta: string;
  body: string;
  ctaLabel: string;
  href: string;
  ctaClass: string;
  feature?: boolean;
};

const steps: Step[] = [
  {
    num: "01.",
    name: "AI Fit Check",
    meta: "Free · Ten minutes",
    body: "Know exactly what you already own. A scored verdict and one workflow to start with, sent to your inbox.",
    ctaLabel: "Take the Fit Check",
    href: "/fit-check",
    ctaClass: "pill p-blue",
  },
  {
    num: "02.",
    name: "Deployment Diagnostic",
    meta: "Fixed fee · 2 to 3 weeks",
    body: "We find the workflows where AI pays for itself first. A focused assessment that identifies high-impact opportunities and delivers a clear, actionable roadmap. No hourly billing and no open-ended discovery phase.",
    ctaLabel: "See the Diagnostic",
    href: "/deployment-diagnostic",
    ctaClass: "pill p-blue",
  },
  {
    num: "03.",
    name: "Rollout",
    meta: "Fixed fee · 2 to 10 weeks",
    body: "Priority workflow built and integrated. Governance and guardrails from day one. Role-based enablement and rollout. Adoption tracked from a zero baseline. Capability transferred to your team.",
    ctaLabel: "Talk to us about the Rollout",
    href: "/book",
    ctaClass: "pill p-white",
    feature: true,
  },
  {
    num: "04.",
    name: "Advisory Retainer",
    meta: "Monthly · rolling",
    body: "New workflows built each quarter. Ongoing adoption and usage reporting. A named consultant, no ticket queue. We keep it improving, or operate it for you if you'd rather not run it in-house.",
    ctaLabel: "Talk to us about the Retainer",
    href: "/book",
    ctaClass: "pill p-blue",
  },
];

export function Ladder() {
  return (
    <section className="ladder-head">
      <div className="wrap">
        <h2>
          How to <em>start</em>.
        </h2>
        <p className="lead">
          Short, focused engagements. Each one proves its value before the next
          begins. Fixed price. Fixed scope.
        </p>
        <div className="ladder">
          {steps.map((s) => (
            <div key={s.name} className={cn("lstep", s.feature && "feature")}>
              <div className="num">{s.num}</div>
              <h6>{s.name}</h6>
              <div className="meta">{s.meta}</div>
              <p>{s.body}</p>
              <SiteLink className={s.ctaClass} href={s.href}>
                {s.ctaLabel}
              </SiteLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
