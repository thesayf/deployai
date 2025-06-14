import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/constants";
import { font } from "@/fonts";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { TestimonialsPortfolio } from "@/components/testimonials-portfolio/TestimonialsPortfolio";
import { FiArrowRight } from "react-icons/fi";
import { LogoTicker } from "@/components/logo-ticker/LogoTicker";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiZap, FiCheckCircle, FiDollarSign, FiUsers } from "react-icons/fi";

export default function SaasMvpPage() {
  return (
    <main
      className={`${font.className}`}
      style={{ scrollSnapType: "y proximity" }}
    >
      <ExpandableNavBar links={NAV_LINKS}>
        <HeroOverride />
      </ExpandableNavBar>
      <ProblemAgitationOverride />
      <StickyScrollCardsOverride />
      <TestimonialsPortfolio />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

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
            🚀 Launch Your SaaS MVP in Weeks
          </span>
        </span>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        Turn Your SaaS Idea Into Reality—
        <span className="text-orange-600">Fast & Cost-Effective</span>
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        Stop waiting months to validate your SaaS idea. Our expert team delivers
        a market-ready MVP in weeks, not months. Get to market faster, gather
        real user feedback, and start generating revenue while your competitors
        are still coding.
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Book Free SaaS MVP Strategy Call
          </span>
        </a>
        <a
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-md cursor-pointer text-center text-sm text-zinc-600 underline underline-offset-4 transition-colors hover:text-orange-600"
          aria-label="Book your free SaaS MVP consult on Calendly"
        >
          ⏱️ Only 3 spots left this week • 💰 $0 cost • 🎯 30-min MVP consult
        </a>
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
            Still struggling to get your SaaS idea off the ground?
          </p>
          <p className="text-2xl font-bold text-zinc-900 md:text-3xl">
            Rapid MVP Development is the answer.
          </p>
        </div>
        <div className="mb-12 text-center">
          <p className="text-2xl leading-relaxed text-zinc-800 md:text-3xl">
            With{" "}
            <span className="rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 font-bold text-white shadow-[2px_2px_0px_#18181b]">
              deployAI
            </span>
            , you can launch your SaaS MVP in weeks, validate your market, and
            start generating revenue while your competitors are still planning.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
            <p className="mb-4 text-lg text-zinc-700">
              Ready to turn your SaaS idea into a market-ready product?
            </p>
            <a
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-[3px_3px_0px_#18181b] transition-all hover:shadow-[5px_5px_0px_#18181b]"
            >
              Book Your Free MVP Strategy Call
              <FiArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-sm text-zinc-500">
              30-min consult • Custom MVP roadmap • No cost to you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyScrollCardsOverride() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cards = [
    {
      id: 1,
      title: "Rapid Development",
      description:
        "Launch your MVP in weeks, not months. Our streamlined process ensures quick delivery without compromising quality or scalability.",
      icon: FiZap,
      background: "bg-slate-900",
      textColor: "text-white",
      buttonColor: "bg-white text-slate-900",
    },
    {
      id: 2,
      title: "Market Validation",
      description:
        "Get real user feedback early. Test your assumptions, gather insights, and iterate quickly based on actual market response.",
      icon: FiCheckCircle,
      background: "bg-blue-600",
      textColor: "text-white",
      buttonColor: "bg-white text-blue-600",
    },
    {
      id: 3,
      title: "Cost-Effective",
      description:
        "Save on development costs with our efficient MVP approach. Focus on core features that deliver value and attract early adopters.",
      icon: FiDollarSign,
      background: "bg-green-600",
      textColor: "text-white",
      buttonColor: "bg-white text-green-600",
    },
    {
      id: 4,
      title: "Expert Support",
      description:
        "Benefit from our team's expertise in SaaS development. We guide you through every step, from ideation to launch and beyond.",
      icon: FiUsers,
      background: "bg-orange-600",
      textColor: "text-white",
      buttonColor: "bg-white text-orange-600",
    },
  ];

  return (
    <div
      id="sticky-scroll-cards"
      ref={containerRef}
      className="relative -mt-24"
    >
      {cards.map((card, index) => (
        <StickyCard
          key={card.id}
          card={card}
          index={index}
          scrollYProgress={scrollYProgress}
          totalCards={cards.length}
        />
      ))}
    </div>
  );
}

interface StickyCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    background: string;
    textColor: string;
    buttonColor: string;
  };
  index: number;
  scrollYProgress: any;
  totalCards: number;
}

const StickyCard = ({
  card,
  index,
  scrollYProgress,
  totalCards,
}: StickyCardProps) => {
  const isLast = index === totalCards - 1;

  // Calculate when this card should start moving
  const startProgress = index / totalCards;
  const endProgress = (index + 1) / totalCards;

  // Transform for sliding up effect
  const y = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [0, isLast ? 0 : -100]
  );

  // Scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [1, isLast ? 1 : 0.95]
  );

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          y: isLast ? 0 : y,
          scale: isLast ? 1 : scale,
          zIndex: totalCards - index,
        }}
        className={`mx-auto h-[80vh] w-full max-w-4xl rounded-3xl ${card.background} ${card.textColor} flex flex-col justify-between p-8 shadow-2xl md:p-12`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-8">
              <card.icon className="mb-6 text-6xl opacity-80" />
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              {card.title}
            </h2>

            <p className="max-w-2xl text-lg leading-relaxed opacity-90 md:text-xl">
              {card.description}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="text-sm opacity-60">
            {String(card.id).padStart(2, "0")} /{" "}
            {String(totalCards).padStart(2, "0")}
          </div>

          <a
            href="https://calendly.com/hello-deployai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`${card.buttonColor} flex items-center gap-2 rounded-full px-8 py-4 font-bold uppercase transition-transform hover:scale-105`}
          >
            Book Free MVP Strategy Call
            <FiArrowRight />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
