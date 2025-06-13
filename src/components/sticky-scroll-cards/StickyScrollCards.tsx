import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiMessageCircle,
  FiCode,
  FiSettings,
  FiSend,
  FiPlay,
  FiArrowRight,
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

const cards: Card[] = [
  {
    id: 1,
    title: "How It Works",
    description:
      "Our proven 4-step process transforms your business with custom AI solutions in just 30 days. From strategy to deployment, we handle everything while you maintain 100% ownership.",
    icon: FiPlay,
    background: "bg-slate-900",
    textColor: "text-white",
    buttonColor: "bg-white text-slate-900",
  },
  {
    id: 2,
    title: "Step 1 - AI Strategy Session",
    description:
      "We analyze your current processes and identify where AI can eliminate costs and automate workflows. No technical jargon - just clear ROI projections. (30 minutes)",
    icon: FiMessageCircle,
    background: "bg-blue-600",
    textColor: "text-white",
    buttonColor: "bg-white text-blue-600",
  },
  {
    id: 3,
    title: "Step 2 - Rapid MVP Development",
    description:
      "We build a working prototype of your AI system so you can see exactly how it will transform your operations before full deployment. (Week 1-2)",
    icon: FiCode,
    background: "bg-green-600",
    textColor: "text-white",
    buttonColor: "bg-white text-green-600",
  },
  {
    id: 4,
    title: "Step 3 - Refine & Perfect",
    description:
      "Based on your feedback, we optimize the system for your specific business needs and integrate it with your existing tools. (Week 3)",
    icon: FiSettings,
    background: "bg-orange-600",
    textColor: "text-white",
    buttonColor: "bg-white text-orange-600",
  },
  {
    id: 5,
    title: "Step 4 - Launch & Ownership",
    description:
      "Go live with your AI system. You own 100% of the code, data, and system. No ongoing subscriptions, no vendor lock-in. (Week 4)",
    icon: FiSend,
    background: "bg-purple-600",
    textColor: "text-white",
    buttonColor: "bg-white text-purple-600",
  },
];

export const StickyScrollCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div id="how-it-works" ref={containerRef} className="relative -mt-24">
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
            Book Free Strategy Call
            <FiArrowRight />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
