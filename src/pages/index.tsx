import { Seo } from "@/components/site/Seo";
import { SiteJsonLd } from "@/components/site/SiteJsonLd";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CredBar } from "@/components/site/CredBar";
import { CTABand } from "@/components/site/CTABand";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { Hero } from "@/components/site/home/Hero";
import { PainCards } from "@/components/site/home/PainCards";
import { JourneyPath } from "@/components/site/home/JourneyPath";
import { ServicesPointer } from "@/components/site/home/ServicesPointer";
import { CaseProof } from "@/components/site/home/CaseProof";
import { ProofStats } from "@/components/site/home/ProofStats";
import { DataResidency } from "@/components/site/home/DataResidency";
import { Team } from "@/components/site/home/Team";
import { HowWeWork } from "@/components/site/home/HowWeWork";
import { Faq } from "@/components/site/home/Faq";
import { fitCheckAssessmentUrl } from "@/components/site/nav-config";

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

export default function Home() {
  return (
    <>
      <Seo
        title="Deploy AI Studio — We put AI to work inside your business"
        description="Deploy AI Studio is a boutique applied-AI consultancy. We show you where AI fits inside your business and make it work — fixed price, fixed scope, live in weeks."
        path="/"
      />
      <SiteJsonLd />
      <div className="site">
        <Navbar />
        <main id="main">
          <Hero />
          <CredBar
            label="Certified across the Claude stack"
            badges={credBadges}
          />
          <PainCards />
          <JourneyPath />
          <ServicesPointer />
          <CaseProof />
          <ProofStats />
          <DataResidency />
          <Team />
          <HowWeWork />
          <Faq />
          <CTABand
            heading={
              <>
                Start where it costs you <em>nothing</em>.
              </>
            }
            paragraphs={[
              "The free AI Fit Check takes ten minutes. You get a scored verdict and the one opportunity we would pursue first, sent straight to your inbox. No call required.",
              "Rather talk it through? Thirty minutes. No pitch. We walk through your current AI setup, name the three things we would fix first, and tell you honestly whether you need us at all.",
            ]}
            ctas={[
              {
                label: "Take the free AI Fit Check",
                href: fitCheckAssessmentUrl,
                className: "pill p-ink",
              },
              {
                label: "Book a 30-minute call",
                href: "#final",
                className: "tert ink",
              },
            ]}
            calendarSlot={
              <CalendlyInline url="https://calendly.com/hello-deployai/introduction-to-consult-kit-clone?hide_event_type_details=1" />
            }
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
