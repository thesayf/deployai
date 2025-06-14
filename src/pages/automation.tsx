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
import { FiArrowRight } from "react-icons/fi";
import { LogoTicker } from "@/components/logo-ticker/LogoTicker";
import {
  FiMail,
  FiSettings,
  FiUsers,
  FiTruck,
  FiBarChart,
  FiDollarSign,
  FiZap,
  FiDatabase,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function AutomationPage() {
  return (
    <main
      className={`${font.className}`}
      style={{ scrollSnapType: "y proximity" }}
    >
      <ExpandableNavBar links={NAV_LINKS}>
        <HeroOverride />
      </ExpandableNavBar>
      <ProblemAgitationOverride />
      <StickyScrollCards />
      <WhatWeCanBuildAutomation />
      <TestimonialsPortfolio />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

// --- OVERRIDES FOR AUTOMATION FOCUS ---

function HeroOverride() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-12 pb-48 pt-12 md:pt-24"
    >
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <span className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm">
          <span className="rounded-full bg-[#FF6154] px-2 py-0.5 font-medium text-white">
            NEW
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            🚀 Automate Your Business with AI
          </span>
        </span>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        Automate Repetitive Tasks with AI—
        <span className="text-orange-600">Save Time, Money & Fuel Growth</span>
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        Free your team from manual, repetitive work and unlock new growth.
        Deploy custom AI automations that not only cut costs and eliminate
        errors, but also empower your business to do more, scale faster, and
        capture new revenue—without hiring more staff or adding complexity.
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Book Free Automation Strategy Call
          </span>
        </a>
        <p className="max-w-md text-center text-sm text-zinc-600">
          ⏱️ Only 3 spots left this week • 💰 $0 cost • 🎯 30-min automation
          consult
        </p>
      </div>
      <LogoTicker />
    </section>
  );
}

function ProblemAgitationOverride() {
  return (
    <section id="problem" className="-mt-12 bg-white pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xl text-zinc-600 md:text-2xl">
            Still wasting hours on manual data entry, emails, or reporting?
          </p>
          <p className="text-2xl font-bold text-zinc-900 md:text-3xl">
            AI Automation is the answer.
          </p>
        </div>
        <div className="mb-12 text-center">
          <p className="text-2xl leading-relaxed text-zinc-800 md:text-3xl">
            With{" "}
            <span className="rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 font-bold text-white shadow-[2px_2px_0px_#18181b]">
              deployAI
            </span>
            , you can automate repetitive tasks, eliminate human error, and
            scale your business without hiring more staff.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
            <p className="mb-4 text-lg text-zinc-700">
              Ready to see how much time and money you can save?
            </p>
            <a
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-[3px_3px_0px_#18181b] transition-all hover:shadow-[5px_5px_0px_#18181b]"
            >
              Book Your Free Automation Call
              <FiArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-sm text-zinc-500">
              30-min consult • Custom AI roadmap • No cost to you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeCanBuildAutomation() {
  const cards = [
    {
      icon: FiMail,
      headline: "Automated Email Workflows",
      description: "Send, sort, and reply to emails without lifting a finger.",
      dotColor: "bg-orange-500",
    },
    {
      icon: FiSettings,
      headline: "Factory Order Automation",
      description:
        "Trigger orders, update inventory, and notify teams automatically.",
      dotColor: "bg-blue-500",
    },
    {
      icon: FiUsers,
      headline: "HR & Onboarding Bots",
      description: "Automate onboarding, document collection, and training.",
      dotColor: "bg-green-500",
    },
    {
      icon: FiTruck,
      headline: "Logistics & Shipping",
      description: "Real-time tracking, notifications, and route optimization.",
      dotColor: "bg-purple-500",
    },
    {
      icon: FiBarChart,
      headline: "Automated Reporting",
      description: "Generate and send reports on schedule, no manual work.",
      dotColor: "bg-yellow-400",
    },
    {
      icon: FiDollarSign,
      headline: "Invoice & Billing Automation",
      description: "Create, send, and reconcile invoices automatically.",
      dotColor: "bg-pink-500",
    },
    {
      icon: FiZap,
      headline: "AI Scheduling Bots",
      description: "Book meetings, send reminders, and sync calendars.",
      dotColor: "bg-cyan-500",
    },
    {
      icon: FiDatabase,
      headline: "Data Entry Bots",
      description: "Extract, enter, and sync data across systems.",
      dotColor: "bg-red-500",
    },
  ];
  return (
    <section id="what-we-can-build" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-4 text-center text-5xl font-black">
          What Can We Build With Automation?
        </h2>
        <p className="mb-12 text-center text-lg text-zinc-600">
          Automate manual processes and unlock new efficiency. Here are just a
          few examples.
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

// You can create similar override components for StickyScrollCards, TestimonialsPortfolio, PricingSection, and FinalCTA,
// updating the copy to focus on automation. If you want, I can fill those out as well—just let me know!
