import { Hero } from "@/components/hero/Hero";
import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/constants";
import { font } from "@/fonts";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { TestimonialsPortfolio } from "@/components/testimonials-portfolio/TestimonialsPortfolio";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";

export default function Home() {
  return (
    <main
      className={`${font.className}`}
      style={{ scrollSnapType: "y proximity" }}
    >
      <ExpandableNavBar links={NAV_LINKS}>
        <Hero />
      </ExpandableNavBar>
      <ProblemAgitation />
      <StickyScrollCards />
      <TestimonialsPortfolio />
      <PricingSection />
      <FinalCTA />

      <Footer />
    </main>
  );
}
