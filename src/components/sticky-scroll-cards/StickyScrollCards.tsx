import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiMessageCircle,
  FiCode,
  FiSettings,
  FiSend,
  FiArrowDown,
} from "react-icons/fi";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  background: string;
  textColor: string;
  buttonColor: string;
}

interface StickyScrollCardsProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

const getCardsData = (variant: string): Card[] => {
  switch (variant) {
    case "customSoftware":
      return [
        {
          id: 1,
          title: "Our Process",
          description:
            "Your custom software journey from concept to code ownership. We deliver enterprise-grade solutions in weeks, not months, with 100% transparency.",
          icon: FiArrowDown,
          background: "bg-slate-900",
          textColor: "text-white",
          buttonColor: "bg-white text-slate-900",
        },
        {
          id: 2,
          title: "Step 1 - Requirements Discovery",
          description:
            "Deep dive into your business processes, technical requirements, and integration needs. We map your current workflow and design the perfect solution. (Week 1)",
          icon: FiMessageCircle,
          background: "bg-blue-600",
          textColor: "text-white",
          buttonColor: "bg-white text-blue-600",
        },
        {
          id: 3,
          title: "Step 2 - Architecture & MVP",
          description:
            "We build your software architecture and deliver a working prototype. See your custom solution in action before full development begins. (Week 2-3)",
          icon: FiCode,
          background: "bg-green-600",
          textColor: "text-white",
          buttonColor: "bg-white text-green-600",
        },
        {
          id: 4,
          title: "Step 3 - Development & Testing",
          description:
            "Full-scale development with rigorous testing. We integrate with your existing systems and ensure UAE compliance standards are met. (Week 4-6)",
          icon: FiSettings,
          background: "bg-orange-600",
          textColor: "text-white",
          buttonColor: "bg-white text-orange-600",
        },
        {
          id: 5,
          title: "Step 4 - Deployment & Handover",
          description:
            "Go live with full documentation, training, and source code transfer. You own everything - no subscriptions, no vendor lock-in. (Week 7)",
          icon: FiSend,
          background: "bg-purple-600",
          textColor: "text-white",
          buttonColor: "bg-white text-purple-600",
        },
      ];

    default: // AI variant (original)
      return [
        {
          id: 1,
          title: "How It Works",
          description:
            "Our proven 4-step process transforms your business with custom AI solutions in just 30 days. From strategy to deployment, we handle everything while you maintain 100% ownership.",
          icon: FiArrowDown,
          background: "bg-slate-900",
          textColor: "text-white",
          buttonColor: "bg-white text-slate-900",
        },
        {
          id: 2,
          title: "Step 1 - Find Your Specific Problems",
          description:
            "We don't use generic AI solutions. Every business wastes money in different ways. Our detailed analysis finds your exact problems, hidden costs, and opportunities that other consultants miss.",
          icon: FiMessageCircle,
          background: "bg-blue-600",
          textColor: "text-white",
          buttonColor: "bg-white text-blue-600",
        },
        {
          id: 3,
          title: "Step 2 - Map Your Best Opportunities",
          description:
            "Using our custom analysis method, we figure out exactly where AI will help YOUR business most. No generic advice—every recommendation fits your industry, company size, and how you actually work.",
          icon: FiCode,
          background: "bg-green-600",
          textColor: "text-white",
          buttonColor: "bg-white text-green-600",
        },
        {
          id: 4,
          title: "Step 3 - Build Solutions That Fit",
          description:
            "Based on what we found, we create AI solutions for your real problems, not imaginary ones. This focused approach means every dollar you spend gives you measurable results for your specific business.",
          icon: FiSettings,
          background: "bg-orange-600",
          textColor: "text-white",
          buttonColor: "bg-white text-orange-600",
        },
        {
          id: 5,
          title: "Step 4 - Get Maximum Results",
          description:
            "Because we identified your exact problem areas, we fix the biggest issues first. This means you see returns faster, your team adopts the changes easier, and you get real results that generic AI solutions can't deliver.",
          icon: FiSend,
          background: "bg-purple-600",
          textColor: "text-white",
          buttonColor: "bg-white text-purple-600",
        },
      ];
  }
};

export const StickyScrollCards = ({
  variant = "default",
}: StickyScrollCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cards = getCardsData(variant);

  return (
    <div id="how-it-works" ref={containerRef} className="relative mb-16">
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
};

interface StickyCardProps {
  card: Card;
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
    <div className="sticky top-20 flex h-min justify-center">
      <motion.div
        style={{
          y: isLast ? 0 : y,
          scale: isLast ? 1 : scale,
          zIndex: totalCards - index,
        }}
        className={`mx-auto h-[70vh] w-full max-w-4xl rounded-3xl ${card.background} ${card.textColor} flex flex-col justify-between p-8 shadow-2xl md:p-12`}
      >
        <div className="flex h-full flex-col">
          {/* Large circled number for steps */}
          {index > 0 && (
            <div className="mb-8 flex items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/10">
                <span className="text-5xl font-bold">{index}</span>
              </div>
            </div>
          )}

          <div className="flex-1">
            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              {card.title}
            </h2>

            <p className="max-w-3xl text-lg leading-relaxed opacity-90 md:text-xl">
              {card.description}
            </p>
          </div>

          {/* Down arrow for all cards except the last */}
          {index < totalCards - 1 && (
            <div className="mt-8 flex justify-center">
              <FiArrowDown className="animate-bounce text-4xl opacity-60" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
