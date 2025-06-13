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
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { TestimonialsPortfolio } from "@/components/testimonials-portfolio/TestimonialsPortfolio";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { ClientPortfolioCarousel } from "@/components/client-portfolio/ClientPortfolioCarousel";

export default function Home() {
  return (
    <main
      className={`${font.className}`}
      style={{ scrollSnapType: "y proximity" }}
    >
      <ExpandableNavBar links={NAV_LINKS}>
        <Hero />
        {/* <HeroTwo /> */}
      </ExpandableNavBar>
      <ProblemAgitation />
      <StickyScrollCards />
      <TestimonialsPortfolio />
      <PricingSection />
      <FinalCTA />
      {/* <EmailCapture /> */}
      <Footer />
    </main>
  );
}
