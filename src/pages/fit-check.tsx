import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CredBar } from "@/components/site/CredBar";
import { CTABand } from "@/components/site/CTABand";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { FitCheckHero } from "@/components/site/fit-check/FitCheckHero";
import { FiveThings } from "@/components/site/fit-check/FiveThings";
import { FitCheckTool } from "@/components/site/fit-check/FitCheckTool";
import { VerdictBands } from "@/components/site/fit-check/VerdictBands";
import { Breather } from "@/components/site/fit-check/Breather";
import { Honesty } from "@/components/site/fit-check/Honesty";
import { MidCta } from "@/components/site/fit-check/MidCta";
import { FitCheckFaq } from "@/components/site/fit-check/FitCheckFaq";

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

export default function FitCheck() {
  return (
    <>
      <Seo
        title="Free AI Fit Check | Deploy AI Studio"
        description="Ten minutes to a scored verdict on where AI fits your business, and the one workflow to start with. Your write-up lands in your inbox."
        path="/fit-check"
      />
      <div className="site">
        <Navbar />
        <FitCheckHero />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <FiveThings />
        <FitCheckTool />
        <VerdictBands />
        <Breather />
        <Honesty />
        <MidCta />
        <FitCheckFaq />
        <CTABand
          heading={
            <>
              Talk it through, or take the <em>check</em>
            </>
          }
          paragraphs={[
            "Thirty minutes with an engineer. We will tell you which dimension we would expect to be weakest, and whether you need a full diagnostic or just a few weeks of cleanup. The call is with the founder who does the building.",
            "Not ready to talk? That is what the check is for. Ten minutes, your verdict on screen.",
          ]}
          ctas={[
            {
              label: "Back to the Fit Check",
              href: "#fit-check-tool",
              className: "pill p-ink",
            },
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
