import Head from "next/head";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CredBar } from "@/components/site/CredBar";
import { CTABand } from "@/components/site/CTABand";
import { Hero } from "@/components/site/home/Hero";
import { PainCards } from "@/components/site/home/PainCards";
import { JourneyPath } from "@/components/site/home/JourneyPath";
import { OffersTabs } from "@/components/site/home/OffersTabs";
import { ProofStats } from "@/components/site/home/ProofStats";
import { DataResidency } from "@/components/site/home/DataResidency";
import { Team } from "@/components/site/home/Team";
import { HowWeWork } from "@/components/site/home/HowWeWork";
import { Faq } from "@/components/site/home/Faq";

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
      <Head>
        <title>
          Deploy AI Studio — We put AI to work inside your business
        </title>
        <meta
          name="description"
          content="Deploy AI Studio is a boutique applied-AI consultancy. We show you where AI fits inside your business and make it work — fixed price, fixed scope, live in weeks."
        />
      </Head>
      <div className="site">
        <Navbar />
        <Hero />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <PainCards />
        <JourneyPath />
        <OffersTabs />
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
            "The free AI Fit Check takes ten minutes. You get a scored verdict and the one opportunity we would pursue first. No email to see the result, and no call required.",
            "Rather talk it through? Thirty minutes. No pitch. We walk through your current AI setup, name the three things we would fix first, and tell you honestly whether you need us at all.",
          ]}
          ctas={[
            {
              label: "Take the free AI Fit Check",
              href: "/fit-check",
              className: "pill p-ink",
            },
            { label: "Book a 30-minute call", href: "#final", className: "tert ink" },
          ]}
        />
        <Footer />
      </div>
    </>
  );
}
