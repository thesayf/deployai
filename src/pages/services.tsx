import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CTABand } from "@/components/site/CTABand";
import { CredBar } from "@/components/site/CredBar";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { JumpNav } from "@/components/site/JumpNav";
import { ServicesHero } from "@/components/site/services/ServicesHero";
import { WhyStall } from "@/components/site/services/WhyStall";
import { ServiceCatalog } from "@/components/site/services/ServiceCatalog";
import { EvidenceLedger } from "@/components/site/services/EvidenceLedger";
import { MethodStatement } from "@/components/site/services/MethodStatement";
import { Segment } from "@/components/site/services/Segment";
import { ServicesFaq } from "@/components/site/services/ServicesFaq";

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
  { label: "Services", anchor: "#services" },
  { label: "Evidence", anchor: "#evidence" },
  { label: "FAQ", anchor: "#faq" },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services | Deploy AI Studio"
        description="Seven AI services, one path: prove value, build and modernise, enable your teams, and run AI in production. Fixed fee, scoped before we start."
        path="/services"
      />
      <div className="site">
        <Navbar />
        <ServicesHero />
        <JumpNav sections={jumpSections} cta={{ label: "Let's talk", href: "#final" }} />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <WhyStall />
        <ServiceCatalog />
        <EvidenceLedger />
        <MethodStatement />
        <Segment />
        <ServicesFaq />
        <CTABand
          heading={
            <>
              Start where it costs you <em>nothing</em>.
            </>
          }
          paragraphs={[
            "Thirty minutes. No pitch. We'll walk through your current AI setup, name the three things we'd fix first, and tell you honestly whether you need us at all. Or take the free Fit Check: ten minutes, a scored verdict and one top opportunity, sent to your inbox.",
          ]}
          fineNote="No obligation. A senior consultant, not a sales rep."
          ctas={[
            {
              label: "Take the free AI Fit Check",
              href: "/fit-check",
              className: "pill p-ink",
            },
            { label: "Book a 30-minute call", href: "#final", className: "tert ink" },
          ]}
          calendarSlot={
            <CalendlyInline url="https://calendly.com/hello-deployai/introduction-to-consult-kit-clone?hide_event_type_details=1" />
          }
        />
        <Footer />
      </div>
    </>
  );
}
