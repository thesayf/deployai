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
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let velocity = 0;
    let wasAtTop = false;

    const checkPosition = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const currentAtTop = rect.top <= 0;
      
      // If we just reached the top (snap completed), transfer momentum
      if (currentAtTop && !wasAtTop && velocity !== 0) {
        transferMomentum(velocity);
      }
      
      setIsAtTop(currentAtTop);
      wasAtTop = currentAtTop;
    };

    const transferMomentum = (scrollVelocity: number) => {
      if (!containerRef.current) return;
      
      console.log('Transferring momentum:', scrollVelocity); // Debug log
      
      // Convert velocity to scroll amount (larger multiplier for noticeable effect)
      const scrollAmount = Math.abs(scrollVelocity) * 100; // Increased multiplier
      
      if (scrollAmount < 10) return; // Don't animate very small movements
      
      // Animate the container scroll
      const startScrollTop = containerRef.current.scrollTop;
      const targetScrollTop = Math.min(
        startScrollTop + scrollAmount,
        containerRef.current.scrollHeight - containerRef.current.clientHeight
      );
      
      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    };

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      
      // Calculate scroll velocity
      const timeDelta = currentTime - lastTime;
      if (timeDelta > 0) {
        velocity = (currentScrollY - lastScrollY) / timeDelta;
      }
      
      lastScrollY = currentScrollY;
      lastTime = currentTime;
      
      requestAnimationFrame(checkPosition);
    };

    checkPosition();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        height: `${CARD_HEIGHT * CARDS.length}px`,
        scrollSnapAlign: 'start'
      }}
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen"
        style={{
          overflowY: isAtTop ? 'auto' : 'hidden'
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
    </section>
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
