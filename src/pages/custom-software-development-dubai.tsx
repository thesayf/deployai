import { Hero } from "@/components/hero/Hero";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { font } from "@/fonts";
import { Footer } from "@/components/footer/Footer";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { ServiceFeatures } from "@/components/service-features/ServiceFeatures";
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";
import { FAQ } from "@/components/faq/FAQ";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { RiskReversal } from "@/components/risk-reversal/RiskReversal";
import { useEffect } from "react";

// Preload Calendly function
const preloadCalendly = () => {
  if (
    typeof window !== "undefined" &&
    window.Calendly &&
    !(window as any).calendlyPreloaded
  ) {
    // Create a hidden container to preload the widget
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.style.top = "-9999px";
    hiddenContainer.style.width = "1px";
    hiddenContainer.style.height = "1px";
    hiddenContainer.style.overflow = "hidden";
    document.body.appendChild(hiddenContainer);

    try {
      (window as any).Calendly.initInlineWidget({
        url:
          "https://calendly.com/hello-deployai/30min?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=" +
          window.location.hostname +
          "&embed_type=Inline",
        parentElement: hiddenContainer,
        resize: false,
      });
      (window as any).calendlyPreloaded = true;
    } catch (error) {
      console.log("Calendly preload failed:", error);
    }
  }
};

export default function CustomSoftwareDevelopmentDubai() {
  // Preload Calendly on page load
  useEffect(() => {
    const handleCalendlyLoad = () => {
      setTimeout(preloadCalendly, 1500); // Wait 1.5 seconds after script loads
    };

    if ((window as any).Calendly) {
      handleCalendlyLoad();
    } else {
      const script = document.querySelector('script[src*="calendly.com"]');
      if (script) {
        script.addEventListener("load", handleCalendlyLoad);
        return () => script.removeEventListener("load", handleCalendlyLoad);
      }
    }
  }, []);

  return (
    <main
      className={`${font.className}`}
      style={{ scrollSnapType: "y proximity" }}
    >
      <AnimatedNavBar />
      <Hero variant="customSoftware" />
      <div className="py-24">
        <ProblemAgitation variant="customSoftware" />
      </div>
      <div className="py-16">
        <BenefitsGrid variant="customSoftware" />
      </div>
      <div className="py-16">
        <ServiceFeatures variant="customSoftware" />
      </div>
      <StickyScrollCards variant="customSoftware" />
      <div className="py-16">
        <CaseStudies filter="all" />
      </div>
      <StaggerTestimonials />
      <div className="py-16">
        <PricingSection variant="customSoftware" />
      </div>
      <RiskReversal />
      <CalendlyInline />
      <div className="py-16">
        <FAQ variant="customSoftware" />
      </div>
      <Footer />
    </main>
  );
}
