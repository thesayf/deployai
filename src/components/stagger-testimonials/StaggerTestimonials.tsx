import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP
);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener("resize", handleSetCardSize);

    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-100"
      style={{
        height: SECTION_HEIGHT,
      }}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-zinc-900 hover:text-white rounded-lg border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b]"
        >
          <GoArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-zinc-900 hover:text-white rounded-lg border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b]"
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  position: number;
  testimonial: any;
  handleMove: (position: number) => void;
  cardSize: number;
}

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }: TestimonialCardProps) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer border-zinc-900 p-8 text-zinc-900 ${
        isActive ? "z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white" : "z-0 bg-white"
      }
      `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? "0px 8px 0px 4px #18181b" : "0px 0px 0px 0px #18181b",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 300,
        damping: 60,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-zinc-900 object-cover"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`Testimonial image for ${testimonial.by}`}
        className="mb-4 h-14 w-12 bg-zinc-600 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px white",
        }}
      />
      <h3
        className={`text-base sm:text-xl ${
          isActive ? "text-white" : "text-zinc-900"
        }`}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
          isActive ? "text-orange-100" : "text-zinc-700"
        }`}
      >
        - {testimonial.by}
      </p>
    </motion.div>
  );
};

const TESTIMONIAL_DATA = [
  {
    tempId: 0,
    testimonial:
      "deployAI transformed our logistics completely. We're processing 10x more orders with the same team size.",
    by: "Sarah, Operations Director at LogiCorp",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Sarah",
  },
  {
    tempId: 1,
    testimonial:
      "Our customer support is now 87% faster. The AI handles everything perfectly and escalates when needed.",
    by: "Michael, CEO at TechStart",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Michael",
  },
  {
    tempId: 2,
    testimonial:
      "ROI was achieved in just 4 months. This system literally pays for itself every quarter.",
    by: "Jennifer, Plant Manager at ManufacturingCo",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Jennifer",
  },
  {
    tempId: 3,
    testimonial:
      "$2.4M in annual savings through process optimization. deployAI found efficiencies we never knew existed.",
    by: "David, COO at IndustrialTech",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=David",
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12. Game-changing technology.",
    by: "Amanda, CEO at StartupHub",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Amanda",
  },
  {
    tempId: 5,
    testimonial:
      "SO HAPPY WE FOUND YOU! The automation has saved me personally 100+ hours per month.",
    by: "Robert, Founder at ScaleUp",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Robert",
  },
  {
    tempId: 6,
    testimonial:
      "Took some convincing, but now that we're on deployAI, we're never going back. Pure magic.",
    by: "Lisa, VP Operations at RetailChain",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Lisa",
  },
  {
    tempId: 7,
    testimonial:
      "The analytics and insights are incredible. We now make data-driven decisions in real-time.",
    by: "James, CTO at DataDriven",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=James",
  },
  {
    tempId: 8,
    testimonial: "It's just the best AI automation platform. Period.",
    by: "Maria, CEO at AutomateNow",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Maria",
  },
  {
    tempId: 9,
    testimonial: "Switched 2 years ago and never looked back. Best business decision ever.",
    by: "Kevin, Founder at TechInnovate",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Kevin",
  },
  {
    tempId: 10,
    testimonial:
      "I've been searching for AI automation like this for YEARS. So glad I finally found deployAI!",
    by: "Rachel, Director at ProcessPro",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Rachel",
  },
  {
    tempId: 11,
    testimonial:
      "So intuitive and powerful, we got our whole team automated in just one week.",
    by: "Carlos, Manager at EfficiencyFirst",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Carlos",
  },
];