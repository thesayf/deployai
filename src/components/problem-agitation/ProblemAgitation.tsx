import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface ProblemAgitationProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

export const ProblemAgitation = ({
  variant = "default",
}: ProblemAgitationProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(0);

  const painWords = ["exhausting", "expensive", "endless", "skyrocketing"];
  const solutionWords = ["custom", "automate", "30 days", "transparent"];
  const content = getProblemContent(variant);

  return (
    <section id="problem" className="-mt-12 bg-white pb-4 md:pb-6">
      <div className="mx-auto max-w-4xl px-4">
        {/* Prominent intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-center text-xl text-zinc-600 md:text-2xl">
            {content.intro}
          </p>
          <p className="text-center text-2xl font-bold text-zinc-900 md:text-3xl">
            {content.question}
          </p>
        </motion.div>

        {/* Interactive problem statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative">
            <div
              className="mx-auto mb-8 max-w-4xl text-justify text-2xl leading-relaxed text-zinc-800 md:text-3xl"
              style={{ wordBreak: "break-word" }}
            >
              <p className="mb-4">
                {content.problem}
                <InteractiveWord
                  words={content.painWords}
                  isAnimating={isAnimating}
                />{" "}
                {content.continuation}.
              </p>
              <p className="text-center">{content.question2}</p>
            </div>

          </div>
        </motion.div>

        {/* Solution statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-justify text-2xl leading-relaxed text-zinc-800 md:text-3xl">
            With
            <span className="mx-2 inline-flex items-center">
              <span className="rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 font-bold text-white shadow-[2px_2px_0px_#18181b]">
                deployAI
              </span>
            </span>
            you get custom AI-powered solutions that automate tasks and slash
            costs delivered in just 30 days
            <span className="mx-2 inline-flex items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                ✓
              </span>
            </span>
            . No endless meetings, no hidden costs. Just fast, transparent
            results, with every milestone tracked along the way.
          </p>
        </motion.div>

        {/* Subtle CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="mt-12 inline-block rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
            <p className="mb-4 text-lg text-zinc-700">
              The only thing left? Booking your demo before someone else takes
              your spot this month.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-[3px_3px_0px_#18181b] transition-all hover:shadow-[5px_5px_0px_#18181b]"
              >
                Book Your Free Strategy Call
                <FiArrowRight className="h-4 w-4" />
              </a>
            </motion.button>

            <p className="mt-3 text-sm text-zinc-500">
              30-min discovery call • Custom AI roadmap • No cost to you
            </p>
          </div>
        </motion.div>

        {/* Interactive stats */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <motion.div
            className="group cursor-pointer border-l-2 border-orange-500 pl-4"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl font-black text-zinc-900 transition-colors group-hover:text-orange-500">
              30 days
            </div>
            <div className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900">
              Average delivery
            </div>
          </motion.div>
          <motion.div
            className="group cursor-pointer border-l-2 border-red-500 pl-4"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl font-black text-zinc-900 transition-colors group-hover:text-red-500">
              $0
            </div>
            <div className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900">
              Upfront costs
            </div>
          </motion.div>
          <motion.div
            className="group cursor-pointer border-l-2 border-green-500 pl-4"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl font-black text-zinc-900 transition-colors group-hover:text-green-500">
              100%
            </div>
            <div className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900">
              Ownership
            </div>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
};

// Interactive word cycling component
const InteractiveWord = ({
  words,
  isAnimating,
}: {
  words: string[];
  isAnimating: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [words.length, isAnimating]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative inline-block"
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text font-bold text-transparent">
          {words[currentIndex]}
        </span>
      </motion.span>
    </AnimatePresence>
  );
};

function getProblemContent(variant: ProblemAgitationProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return {
        intro: "While your competitors build custom solutions,",
        question: "are you still buying generic software that doesn't fit?",
        problem:
          "Every month you delay custom software development, you fall further behind. Your business is unique, but you're stuck with generic tools that force you to adapt YOUR processes instead of the software adapting to you. You're paying ",
        painWords: ["premium", "outrageous", "recurring"],
        continuation:
          "prices for software that only solves 60% of your problems",
        question2:
          "What if you could build exactly what you need in just 30 days?",
      };
    case "inventory":
      return {
        intro: "While your competitors track inventory in real-time,",
        question: "are you still using spreadsheets and guessing stock levels?",
        problem:
          "Every stockout costs you sales. Every overstock ties up your cash. Manual inventory tracking means you're always behind, always stressed, always losing money. You're experiencing ",
        painWords: ["endless", "costly", "frustrating"],
        continuation:
          "inventory mistakes that automation could eliminate completely",
        question2: "What if you never had to worry about stock levels again?",
      };
    case "webapp":
      return {
        intro: "While your competitors launch modern web platforms,",
        question:
          "are you still stuck with outdated systems that hold you back?",
        problem:
          "Every day your web application falls behind modern standards, you lose customers to competitors with better user experiences. Legacy systems are expensive to maintain and impossible to scale. You're facing ",
        painWords: ["mounting", "expensive", "endless"],
        continuation: "technical debt that gets worse every month",
        question2: "What if you could launch a modern web platform in 30 days?",
      };
    case "ai":
      return {
        intro: "While your competitors deploy AI automation,",
        question: "are you still doing everything manually?",
        problem:
          "Every task AI could automate is money left on the table. While competitors scale with artificial intelligence, you're burning time and money on repetitive work. You're trapped in ",
        painWords: ["endless", "expensive", "manual"],
        continuation: "processes that AI could handle automatically",
        question2: "What if AI could handle your most time-consuming tasks?",
      };
    default:
      return {
        intro: "While your competitors deploy AI,",
        question: "are you still paying for yesterday's tools?",
        problem:
          "Every month you delay AI deployment, your competitors gain ground. They're automating processes, eliminating SaaS subscriptions, and scaling without adding headcount. Meanwhile, you're still paying ",
        painWords: ["premium"],
        continuation: "prices for tools that AI could replace entirely",
        question2: "But what if catching up didn't have to take years?",
      };
  }
}
