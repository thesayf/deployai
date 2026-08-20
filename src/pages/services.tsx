import Head from "next/head";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CTABand } from "@/components/site/CTABand";
import { CredBar } from "@/components/site/CredBar";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { ServicesHero } from "@/components/site/services/ServicesHero";
import { WhyStall } from "@/components/site/services/WhyStall";
import { ServiceGrid } from "@/components/site/services/ServiceGrid";
import { Breather } from "@/components/site/services/Breather";
import { Ladder } from "@/components/site/services/Ladder";
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

export default function Services() {
  return (
    <>
      <Head>
        <title>Services — The AI Deployment Path | Deploy AI Studio</title>
        <meta
          name="description"
          content="We scope, build, and deliver AI systems, with a timeline that doesn't move. From AI strategy and readiness to agents, integration, and rollout. Fixed price, fixed scope."
        />
      </Head>
      <div className="site">
        <Navbar />
        <ServicesHero />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <WhyStall />
        <ServiceGrid />
        <Breather />
        <Ladder />
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
