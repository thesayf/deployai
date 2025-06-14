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
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useRef } from "react";

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
      <WhatWeCanBuild />
      <TestimonialsPortfolio />
      <PricingSection />
      <FinalCTA />

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

  const tickerExamples = [
    "Automate Slack alerts",
    "AI-powered onboarding",
    "Custom dashboards",
    "Factory order bots",
    "Automated reporting",
    "AI email replies",
    "Real-time notifications",
    "No-code integrations",
    "Automated invoicing",
    "Data entry bots",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

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
        <div className="relative mb-24 border-l-4 border-orange-500 pl-8">
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
        <h3 className="mb-6 text-center text-3xl font-bold text-orange-500">
          Automate manual processes like sending emails, factory orders…
        </h3>
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-2 pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex min-w-[320px] max-w-xs flex-shrink-0 snap-center flex-col items-center rounded-3xl border-4 border-zinc-900 bg-white p-8 shadow-[8px_8px_0px_#18181b] transition-transform hover:scale-105"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${card.dotColor} shadow-lg`}
              >
                <card.icon className="text-3xl text-white" />
              </div>
              <h4 className="mb-2 text-center text-xl font-bold text-zinc-900">
                {card.headline}
              </h4>
              <p className="text-center text-zinc-700">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
