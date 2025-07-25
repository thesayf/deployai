import { Hero } from "@/components/hero/Hero";
import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { ModernNavBar } from "@/components/navigation/ModernNavBar";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { NAV_LINKS } from "@/components/navigation/constants";
import { font } from "@/fonts";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { TestimonialsPortfolio } from "@/components/testimonials-portfolio/TestimonialsPortfolio";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import ShiftingContactForm from "@/raw-components/contact";
import {
  FiMail,
  FiSettings,
  FiUsers,
  FiTruck,
  FiBarChart,
  FiDollarSign,
  FiZap,
  FiShield,
} from "react-icons/fi";
import { motion } from "framer-motion";
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
// console.log("preloadCalendly", preloadCalendly);

export default function Home() {
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
      <Hero />
      <ProblemAgitation />
      <CaseStudies />
      <FeatureToggles />
      <div className="pt-16">
        <StickyScrollCards />
      </div>
      <StaggerTestimonials />
      {/*
      - add team component here
      */}
      {/* <WhatWeCanBuild /> */}
      {/* <TestimonialsPortfolio /> */}
      <PricingSection />
      <CalendlyInline />
      <ShiftingContactForm />
      <Footer />
    </main>
  );
}

function WhatWeCanBuild() {
  const cards = [
    {
      icon: FiMail,
      headline: "AI Email Replies",
      description: "Instantly respond to customer emails.",
      dotColor: "bg-orange-500",
    },
    {
      icon: FiSettings,
      headline: "Factory Order Bots",
      description: "Automate order processing & inventory.",
      dotColor: "bg-blue-500",
    },
    {
      icon: FiUsers,
      headline: "Automated Onboarding",
      description: "AI-driven onboarding for hires/clients.",
      dotColor: "bg-green-500",
    },
    {
      icon: FiTruck,
      headline: "Logistics Automation",
      description: "Real-time shipment tracking & alerts.",
      dotColor: "bg-purple-500",
    },
    {
      icon: FiBarChart,
      headline: "Custom Dashboards",
      description: "Live business metrics, tailored to you.",
      dotColor: "bg-yellow-400",
    },
    {
      icon: FiDollarSign,
      headline: "Automated Invoicing",
      description: "Generate/send invoices, no manual work.",
      dotColor: "bg-pink-500",
    },
    {
      icon: FiZap,
      headline: "AI Scheduling Bots",
      description: "Book meetings, send reminders, sync cals.",
      dotColor: "bg-cyan-500",
    },
    {
      icon: FiShield,
      headline: "Compliance Monitoring",
      description: "AI watches for risks & compliance issues.",
      dotColor: "bg-red-500",
    },
  ];

  return (
    <section id="what-we-can-build" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-4 text-center text-5xl font-black">
          What Can We Build For You?
        </h2>
        <p className="mb-12 text-center text-lg text-zinc-600">
          Real automations, real results. Here's what we can deliver for your
          business.
        </p>
        <div className="relative border-l-4 border-orange-500 pl-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="mb-12 flex items-start gap-6"
            >
              <div
                className={`mt-2 h-6 w-6 rounded-full ${card.dotColor} border-4 border-white shadow-lg`}
              ></div>
              <div className="rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0px_#18181b]">
                <card.icon className="mb-2 text-3xl text-orange-500" />
                <h3 className="mb-1 text-xl font-bold">{card.headline}</h3>
                <p className="text-zinc-700">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
