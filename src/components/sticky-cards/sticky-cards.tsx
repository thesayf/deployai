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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkPosition = () => {
      if (!wrapperRef.current) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      setCanScroll(rect.top <= 0);
    };

    // Use native wheel listener with non-passive flag
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || !wrapperRef.current) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      const isOverContainer = containerRef.current.contains(e.target as Node);
      const containerScrollTop = containerRef.current.scrollTop;
      
      // If mouse is over container but wrapper isn't at top, redirect to page scroll
      if (isOverContainer && rect.top > 0) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollBy(0, e.deltaY);
      }
      // If scrolling up and container is at top, redirect to page scroll
      else if (isOverContainer && e.deltaY < 0 && containerScrollTop === 0 && rect.top <= 0) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollBy(0, e.deltaY);
      }
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', checkPosition);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="sticky top-0"
      style={{ height: `${CARD_HEIGHT * CARDS.length}px` }}
    >
      <div 
        ref={containerRef}
        className="h-screen"
        style={{
          overflowY: canScroll ? 'auto' : 'hidden'
        }}
      >
        {/* Inner wrapper with extended height for scroll space */}
        <div style={{ height: `${CARD_HEIGHT * CARDS.length}px` }}>
          {CARDS.map((c, idx) => (
            <Card
              key={c.id}
              card={c}
              scrollYProgress={scrollYProgress}
              position={idx + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  position: number;
  card: typeof CARDS[0];
  scrollYProgress: any;
}

const Card = ({ position, card, scrollYProgress }: CardProps) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
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

const CARD_HEIGHT = 500;

const CARDS = [
  {
    id: 1,
    Icon: FiCalendar,
    title: "A new type of Calendar",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-violet-300",
    routeTo: "#",
  },
  {
    id: 2,
    Icon: FiDatabase,
    title: "#1 in data privacy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-pink-300",
    routeTo: "#",
  },
  {
    id: 3,
    Icon: FiCopy,
    title: "Use your existing tools",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-red-300",
    routeTo: "#",
  },
  {
    id: 4,
    Icon: FiAward,
    title: "Customers love us",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
  },
];
