import { useScroll, motion, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCopy,
  FiDatabase,
} from "react-icons/fi";

export const StickyCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkPosition = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentAtTop = rect.top <= 0;
      setIsAtTop(currentAtTop);
    };

    const handleScroll = () => {
      requestAnimationFrame(checkPosition);
    };

    checkPosition();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '200vh', // Reduced height for tighter animations
      }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen"
        style={{
          overflowY: isAtTop ? "auto" : "hidden",
        }}
      >
        {CARDS.map((c, idx) => (
          <Card
            key={c.id}
            card={c}
            scrollYProgress={scrollYProgress}
            position={idx + 1}
          />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  position: number;
  card: (typeof CARDS)[0];
  scrollYProgress: any;
}

const Card = ({ position, card, scrollYProgress }: CardProps) => {
  let y;
  
  if (position === CARDS.length) {
    // Last card: stops when it reaches center (no further movement)
    const overlap = 0.1;
    const animStart = Math.max(0, ((position - 1) / CARDS.length) - overlap);
    const animEnd = ((position - 1) / CARDS.length) + 0.1; // Stop animation early
    
    y = useTransform(scrollYProgress, [animStart, animEnd, 1], ['0vh', '0vh', '0vh']);
  } else {
    // Other cards: normal overlapping animation
    const overlap = 0.1;
    const animStart = Math.max(0, ((position - 1) / CARDS.length) - overlap);
    const animEnd = Math.min(1, (position / CARDS.length) + overlap);
    
    const slideDistance = -(100 / CARDS.length);
    y = useTransform(scrollYProgress, [animStart, animEnd], ['0vh', `${slideDistance}vh`]);
  }

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: '100vh',
        y: y,
        background: isOddCard ? "black" : "white",
        color: isOddCard ? "white" : "black",
      }}
      className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4"
    >
      <card.Icon className="mb-4 text-4xl" />
      <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">
        {card.title}
      </h3>
      <p className="mb-8 max-w-lg text-center text-sm md:text-base">
        {card.description}
      </p>
      <a
        href={card.routeTo}
        className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg ${
          card.ctaClasses
        } ${
          isOddCard
            ? "shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]"
            : "shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
        }`}
      >
        <span>Learn more</span>
        <FiArrowRight />
      </a>
    </motion.div>
  );
};


const CARDS = [
  {
    id: 1,
    Icon: FiCalendar,
    title: "A new type of Calendar",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto calendar 1!",
    ctaClasses: "bg-violet-300",
    routeTo: "#",
  },
  {
    id: 2,
    Icon: FiDatabase,
    title: "#1 in data privacy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto privacy 2!",
    ctaClasses: "bg-pink-300",
    routeTo: "#",
  },
  {
    id: 3,
    Icon: FiCopy,
    title: "Use your existing tools",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto tools 3!",
    ctaClasses: "bg-red-300",
    routeTo: "#",
  },
  {
    id: 4,
    Icon: FiAward,
    title: "Customers love us",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto love us 4!",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
  },
];
