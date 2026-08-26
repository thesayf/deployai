import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JumpNav } from "@/components/site/JumpNav";
import { CredBar } from "@/components/site/CredBar";
import { CTABand } from "@/components/site/CTABand";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { ResidencyHero } from "@/components/site/data-residency/ResidencyHero";
import { ResidencyControl } from "@/components/site/data-residency/ResidencyControl";
import { Commitments } from "@/components/site/data-residency/Commitments";
import { AccessPosture } from "@/components/site/data-residency/AccessPosture";
import { SectorRules } from "@/components/site/data-residency/SectorRules";
import { RegulatedRollout } from "@/components/site/data-residency/RegulatedRollout";
import { ResidencyFaq } from "@/components/site/data-residency/ResidencyFaq";

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
  { label: "Where your data lives", anchor: "#where" },
  { label: "The commitments", anchor: "#commitments" },
  { label: "Who can reach it", anchor: "#access" },
  { label: "Sector rules", anchor: "#sector" },
  { label: "Regulated rollouts", anchor: "#regime" },
  { label: "FAQ", anchor: "#faq" },
];

export default function DataResidency() {
  return (
    <>
      <Seo
        title="Data Residency & Trust | Deploy AI Studio"
        description="We bring the model to your data, not your data to the model: deployed in your cloud, your region, your governance boundary, built for regulated sectors."
        path="/data-residency"
      />
      <div className="site">
        <Navbar />
        <main id="main">
          <ResidencyHero />
          <JumpNav
            sections={jumpSections}
            cta={{ label: "Book a call", href: "#final" }}
          />
          <CredBar
            label="Certified across the Claude stack"
            badges={credBadges}
          />
          <ResidencyControl />
          <Commitments />
          <AccessPosture />
          <SectorRules />
          <RegulatedRollout />
          <ResidencyFaq />
          <CTABand
            heading={
              <>
                Thirty minutes. No <em>pitch</em>.
              </>
            }
            paragraphs={[
              "Bring your compliance or security lead. We will walk through where your data would live, who could reach it, and what your regulator will want to see, and you will leave knowing whether this works inside your rules.",
            ]}
            ctas={[
              {
                label: "Book a 30-minute call",
                href: "#final",
                className: "pill p-ink",
              },
              {
                label: "Take the free AI Fit Check",
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
