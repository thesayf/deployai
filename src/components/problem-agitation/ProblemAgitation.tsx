import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlay, FiPause } from "react-icons/fi";

export const ProblemAgitation = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(0);

  const painWords = ["exhausting", "expensive", "endless", "skyrocketing"];
  const solutionWords = ["custom", "automate", "30 days", "transparent"];

  return (
    <section id="problem" className="-mt-12 bg-white pb-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* Prominent intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xl text-zinc-600 md:text-2xl">
            Enterprise Operations Teams craving transformation,
          </p>
          <p className="text-2xl font-bold text-zinc-900 md:text-3xl">
            we hear you.
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
            <p
              className="mx-auto mb-8 max-w-4xl text-center text-2xl leading-relaxed text-zinc-800 md:text-3xl"
              style={{ wordBreak: "break-word" }}
            >
              <InteractiveWord
                words={["Endless", "Countless", "Repetitive"]}
                isAnimating={isAnimating}
              />{" "}
              manual tasks,{" "}
              <InteractiveWord
                words={["skyrocketing", "rising", "mounting"]}
                isAnimating={isAnimating}
              />{" "}
              operational costs, and software projects that drag on forever—
              it's{" "}
              <InteractiveWord
                words={["exhausting", "draining", "overwhelming"]}
                isAnimating={isAnimating}
              />{" "}
              and{" "}
              <InteractiveWord
                words={["expensive", "costly", "wasteful"]}
                isAnimating={isAnimating}
              />
              .
              <motion.span
                className="mx-2 inline-flex items-center"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  😤
                </span>
              </motion.span>
              But what if building transformative software didn't have to be?
            </p>

            {/* Interactive control */}
            <motion.button
              onClick={() => setIsAnimating(!isAnimating)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-0 rounded-lg border border-zinc-300 bg-zinc-100 p-2 transition-colors hover:bg-zinc-200"
            >
              {isAnimating ? (
                <FiPause className="h-4 w-4" />
              ) : (
                <FiPlay className="h-4 w-4" />
              )}
            </motion.button>
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
          <p className="text-2xl leading-relaxed text-zinc-800 md:text-3xl">
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
          <div className="inline-block rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
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
        <motion.div
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
        </motion.div>
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
