import Head from "next/head";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CredBar } from "@/components/site/CredBar";
import { AboutHero } from "@/components/site/about/AboutHero";
import { WhoWeServe } from "@/components/site/about/WhoWeServe";
import { AboutFounder } from "@/components/site/about/AboutFounder";
import { HowWeOperate } from "@/components/site/about/HowWeOperate";
import { AnthropicRelationship } from "@/components/site/about/AnthropicRelationship";
import { AboutCases } from "@/components/site/about/AboutCases";
import { AboutHowWeWork } from "@/components/site/about/AboutHowWeWork";
import { AboutMidCta } from "@/components/site/about/AboutMidCta";
import { AboutFaq } from "@/components/site/about/AboutFaq";
import { AboutBook } from "@/components/site/about/AboutBook";

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

export default function About() {
  return (
    <>
      <Head>
        <title>About Deploy AI Studio: the humans driving the tech</title>
        <meta
          name="description"
          content="Deploy AI Studio is a boutique AI engineering consultancy, with the architecture, guardrails, and hands-on expertise to turn real investment into measurable ROI."
        />
      </Head>
      <div className="site">
        <Navbar />
        <AboutHero />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <WhoWeServe />
        <AboutFounder />
        <HowWeOperate />
        <AnthropicRelationship />
        <AboutCases />
        <AboutHowWeWork />
        <AboutMidCta />
        <AboutFaq />
        <AboutBook />
        <Footer />
      </div>
    </>
  );
}
