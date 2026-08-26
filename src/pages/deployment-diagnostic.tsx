import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JumpNav } from "@/components/site/JumpNav";
import { CredBar } from "@/components/site/CredBar";
import { CTABand } from "@/components/site/CTABand";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { DiagnosticHero } from "@/components/site/diagnostic/DiagnosticHero";
import { OnRamp } from "@/components/site/diagnostic/OnRamp";
import { WhatItIs } from "@/components/site/diagnostic/WhatItIs";
import { Breather } from "@/components/site/diagnostic/Breather";
import { Deliverables } from "@/components/site/diagnostic/Deliverables";
import { WeekByWeek } from "@/components/site/diagnostic/WeekByWeek";
import { Commitment } from "@/components/site/diagnostic/Commitment";
import { HonestPart } from "@/components/site/diagnostic/HonestPart";
import { DiagnosticFaq } from "@/components/site/diagnostic/DiagnosticFaq";

const credBadges = [
  {
    alt: "Claude Certified Architect — Foundations",
    src: "/site/badges/architect-foundations-logo.png",
  },
  { alt: "Claude Certified Developer", src: "/site/badges/developer-logo.png" },
  {
    alt: "Claude Certified Architect — Professional",
    src: "/site/badges/architect-pro-logo.png",
  },
  { alt: "Claude Certified Associate", src: "/site/badges/associate-logo.png" },
  { alt: "Claude Code Partner", src: "/site/badges/partner-logo.png" },
];

const jumpSections = [
  { label: "What it is", anchor: "#what-it-is" },
  { label: "What you get", anchor: "#what-you-get" },
  { label: "Week by week", anchor: "#week-by-week" },
  { label: "The commitment", anchor: "#commitment" },
  { label: "FAQ", anchor: "#faq" },
];

export default function DeploymentDiagnostic() {
  return (
    <>
      <Seo
        title="Deployment Diagnostic | Deploy AI Studio"
        description="A fixed-fee diagnostic that finds the workflows where AI pays for itself first and ends in a costed deployment plan, not a strategy deck."
        path="/deployment-diagnostic"
      />
      <div className="site">
        <Navbar />
        <main id="main">
          <DiagnosticHero />
          <JumpNav
            sections={jumpSections}
            cta={{ label: "Book a call", href: "#final" }}
          />
          <CredBar
            label="Certified across the Claude stack"
            badges={credBadges}
          />
          <OnRamp />
          <WhatItIs />
          <Breather />
          <Deliverables />
          <WeekByWeek />
          <Commitment />
          <HonestPart />
          <DiagnosticFaq />
          <CTABand
            heading={
              <>
                Start where you are. Build what it takes to keep AI moving{" "}
                <em>across the business.</em>
              </>
            }
            paragraphs={[
              "Thirty minutes. No pitch.",
              "We'll walk through your current AI setup, name the three things we'd fix first, and tell you honestly whether you need us at all.",
            ]}
            ctas={[
              {
                label: "Book the call",
                href: "#final",
                className: "pill p-ink",
              },
              {
                label: "Or take the free Fit Check",
                href: "/fit-check",
                className: "tert ink",
              },
            ]}
            calendarSlot={
              <CalendlyInline url="https://calendly.com/hello-deployai/your-assessment-results?hide_event_type_details=1" />
            }
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
