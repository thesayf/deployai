import { EmailCapture } from "@/components/email-capture/EmailCapture";
import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { Supports } from "@/components/supports/Supports";
import { Hero } from "@/components/hero/Hero";
import { Logos } from "@/components/logos/Logos";
import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/constants";
import { Stats } from "@/components/stats/Stats";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { font } from "@/fonts";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Pricing } from "@/components/pricing/Pricing";
import { Footer } from "@/components/footer/Footer";
import { StickyCards } from "@/components/sticky-cards/sticky-cards";
import SwapColumnFeatures from "@/components/swap-column/swap-column";
import { StaggerTestimonials } from "@/components/stagger-cards/stagger-cards";
import HeroTwo from "@/components/hero-two/hero-two";
import CardCarousel from "@/components/carousel-one/carousel-one";
import CarouselTwo from "@/components/carousel-two/carousel-two";
import CollapseCardFeatures from "@/components/collapse-card/collapse-card";

export default function Home() {
  return (
    <main className={`${font.className}`} style={{ scrollSnapType: 'y proximity' }}>
      <ExpandableNavBar links={NAV_LINKS}>
        <Hero />
        {/* <HeroTwo /> */}
      </ExpandableNavBar>
      <Logos />
      <CollapseCardFeatures />
      <StickyCards />
      <SwapColumnFeatures />
      <StaggerTestimonials />
      <CardCarousel />
      <CarouselTwo />
      <div className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32">
        <FeatureToggles />
        <Stats />
        <Supports />
        <BenefitsGrid />
        <Pricing />
        <BlogCarousel />
      </div>
      <EmailCapture />
      <FinalCTA />
      <Footer />
    </main>
  );
}
