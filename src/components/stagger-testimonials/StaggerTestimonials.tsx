import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HeadingH2 } from "@/components/heading-h2";

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
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-orange-50 to-red-50 py-12 md:py-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ea580c 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #dc2626 2px, transparent 2px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <HeadingH2
            variant="bracket"
            accentColor="orange"
            size="xl"
            align="center"
            animate={true}
            className="mb-6"
          >
            Real Stories from Happy Clients
          </HeadingH2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-700 md:text-2xl">
            Don't just take our word for it. Here's what our clients say about
            their custom software experience.
          </p>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
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
            className="grid h-14 w-14 place-content-center rounded-lg border-2 border-zinc-900 text-3xl shadow-[3px_3px_0px_#18181b] transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <GoArrowLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="grid h-14 w-14 place-content-center rounded-lg border-2 border-zinc-900 text-3xl shadow-[3px_3px_0px_#18181b] transition-colors hover:bg-zinc-900 hover:text-white"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  position: number;
  testimonial: any;
  handleMove: (position: number) => void;
  cardSize: number;
}

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialCardProps) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer border-zinc-900 p-8 text-zinc-900 ${
        isActive
          ? "z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white"
          : "z-0 bg-white"
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
        boxShadow: isActive
          ? "0px 8px 0px 4px #18181b"
          : "0px 0px 0px 0px #18181b",
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
      <div className="flex h-full flex-col justify-center">
        <h3
          className={`text-center text-sm italic sm:text-base ${
            isActive ? "text-white" : "text-zinc-900"
          }`}
        >
          "{testimonial.testimonial}"
        </h3>
      </div>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-center text-xs italic ${
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
      "I used to spend my entire day answering the same questions over and over. Now students just chat with the bot and I actually get to focus on the important stuff. Honestly can't believe how much time I wasted before digging through messy spreadsheets.",
    by: "Karine, Director at Concreted Education",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Karine",
  },
  {
    tempId: 1,
    testimonial:
      "My phone used to ring nonstop with booking calls. Now this thing handles everything automatically and I'm booked out solid. Customers still feel like they get great service, just faster.",
    by: "Judah, Owner at JB Detailing",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Judah",
  },
  {
    tempId: 2,
    testimonial:
      "Tender deadlines used to give me panic attacks. We'd scramble for weeks pulling together proposals. Now we knock them out in days, and our field teams can actually find the research they need without calling me every five minutes.",
    by: "Dr Danquah, CEO at Centric Community Research",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Danquah",
  },
  {
    tempId: 3,
    testimonial:
      "They really listened to what I wanted to build and didn't try to oversell me features I didn't need. Had my working app in about a month. Honestly wasn't sure this would actually work, but here we are.",
    by: "Umar, Founder at ScheduleGenius.ai",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Umar",
  },
  {
    tempId: 4,
    testimonial:
      "Went with Deploy AI because their other clients seemed legit. Month later, my book club idea was actually live. The AI discussion stuff genuinely surprises people - they can't figure out how it works so well.",
    by: "Abdul, Founder at Bookwormclub",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Abdul",
  },
  {
    tempId: 5,
    testimonial:
      "The ROI was immediate. Within two months, the system paid for itself through efficiency gains alone. Now we're handling 3x the volume with the same team.",
    by: "Sarah, Operations Manager at LogiFlow",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Sarah",
  },
  {
    tempId: 6,
    testimonial:
      "I was skeptical about AI at first, but deployAI made it so simple. The implementation was smooth and the results speak for themselves.",
    by: "Marcus, CEO at TechVentures",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Marcus",
  },
  {
    tempId: 7,
    testimonial:
      "Customer satisfaction scores went through the roof. The AI handles routine queries perfectly, letting our team focus on complex issues.",
    by: "Lisa, Support Director at ServicePro",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Lisa",
  },
  {
    tempId: 8,
    testimonial:
      "We've automated 80% of our repetitive tasks. What used to take days now happens in hours. Game-changing technology.",
    by: "David, COO at ProcessFlow",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=David",
  },
  {
    tempId: 9,
    testimonial:
      "The best investment we've made in years. The platform paid for itself in the first quarter through cost savings alone.",
    by: "Rachel, CFO at FinanceHub",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Rachel",
  },
  {
    tempId: 10,
    testimonial:
      "Implementation was seamless. The team understood our needs perfectly and delivered beyond expectations. Highly recommended.",
    by: "James, Director at InnovateTech",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=James",
  },
  {
    tempId: 11,
    testimonial:
      "Our productivity has skyrocketed. Tasks that took hours now take minutes. The AI integration is incredibly intuitive.",
    by: "Emma, Operations Lead at StreamlineOps",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Emma",
  },
  {
    tempId: 12,
    testimonial:
      "Finally, a solution that actually works. No more juggling multiple tools - everything is automated and efficient.",
    by: "Carlos, Founder at EfficiencyPro",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Carlos",
  },
  {
    tempId: 13,
    testimonial:
      "The time savings are incredible. What used to be a full-time job is now handled automatically. Worth every penny.",
    by: "Nina, Manager at AutomateCo",
    imgSrc: "https://api.dicebear.com/8.x/notionists/svg?seed=Nina",
  },
];
