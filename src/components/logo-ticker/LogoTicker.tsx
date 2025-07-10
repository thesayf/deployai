import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = [
  {
    name: "Centric",
    src: "/logos/CentricLogo.png",
    alt: "Centric Logo",
  },
  {
    name: "Mindscape",
    src: "/logos/Mindscape_logo.svg",
    alt: "Mindscape Logo",
  },
  {
    name: "Mirza",
    src: "/logos/Mirza_Logo.png",
    alt: "Mirza Logo",
  },
  {
    name: "Bookworm TP",
    src: "/logos/bookworm-tp.svg",
    alt: "Bookworm TP Logo",
  },
  {
    name: "Go Elevate AI",
    src: "/logos/goelevateailogo.svg",
    alt: "Go Elevate AI Logo",
  },
  {
    name: "Hubi",
    src: "/logos/hubilogo.webp",
    alt: "Hubi Logo",
  },
  {
    name: "OC",
    src: "/logos/oclogo.svg",
    alt: "OC Logo",
  },
  {
    name: "Pink Lizard",
    src: "/logos/pinklizardlogo.png",
    alt: "Pink Lizard Logo",
  },
  {
    name: "Task",
    src: "/logos/task transparent.svg",
    alt: "Task Logo",
  },
  {
    name: "JB",
    src: "/logos/jblogo.png",
    alt: "JB Logo",
  },
  {
    name: "Showcase Cinemas",
    src: "/logos/Showcase Cinemas_idUwGomoN4_0.png",
    alt: "Showcase Cinemas logo",
  },
];

export const LogoTicker = () => {
  // Create enough duplicates for truly seamless scrolling
  const duplicatedLogos = [...LOGOS, ...LOGOS];

  // Calculate the total width - account for both logo width and gap
  const logoWidth = 192; // Base logo container width
  const gapWidth = 32; // gap-8 = 32px
  const totalItemWidth = logoWidth + gapWidth;
  const totalWidth = LOGOS.length * totalItemWidth;

  return (
    <div className="mt-6 w-full py-4">
      <div className="mx-auto max-w-4xl px-4">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
          • Trusted by industry leaders •
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>

          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -totalWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: `${duplicatedLogos.length * totalItemWidth}px` }}
          >
            {duplicatedLogos.map((logo, index) => (
              <LogoCard key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface LogoCardProps {
  logo: {
    name: string;
    src: string;
    alt: string;
  };
}

const LogoCard = ({ logo }: LogoCardProps) => {
  const { src, name, alt } = logo;

  // Check if this is the JB logo that needs a dark background
  const needsDarkBackground = name === "JB";

  return (
    <div className="group flex flex-shrink-0 items-center justify-center px-12">
      <div
        className={`relative transition-all duration-500 hover:scale-105 ${
          needsDarkBackground
            ? "h-12 w-28 border-2 border-zinc-900 bg-zinc-900 shadow-[2px_2px_0px_#18181b]"
            : "h-16 w-24"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain transition-all duration-500"
          title={name}
        />
      </div>
    </div>
  );
};
