import React from "react";
import { motion } from "framer-motion";
import {
  SiGoogle,
  SiAmazon,
  SiMeta,
  SiTesla,
  SiNetflix,
  SiSpotify,
  SiAirbnb,
  SiUber,
  SiStripe,
  SiApple,
  SiNvidia,
  SiAdobe,
} from "react-icons/si";
import { IconType } from "react-icons";

const LOGOS = [
  {
    name: "Google",
    Icon: SiGoogle,
  },
  {
    name: "Amazon",
    Icon: SiAmazon,
  },
  {
    name: "Meta",
    Icon: SiMeta,
  },
  {
    name: "Tesla",
    Icon: SiTesla,
  },
  {
    name: "Netflix",
    Icon: SiNetflix,
  },
  {
    name: "Spotify",
    Icon: SiSpotify,
  },
  {
    name: "Airbnb",
    Icon: SiAirbnb,
  },
  {
    name: "Uber",
    Icon: SiUber,
  },
  {
    name: "Stripe",
    Icon: SiStripe,
  },
  {
    name: "Apple",
    Icon: SiApple,
  },
  {
    name: "Nvidia",
    Icon: SiNvidia,
  },
  {
    name: "Adobe",
    Icon: SiAdobe,
  },
];

export const LogoTicker = () => {
  // Create many duplicates for truly seamless scrolling
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  // Calculate the total width needed for one set of logos
  const logoWidth = 192; // 96px for icon + 96px padding
  const totalWidth = LOGOS.length * logoWidth;

  return (
    <div className="mt-12 w-full py-8">
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
                duration: 30, // Normal ticker speed - 30 seconds
                ease: "linear",
              },
            }}
            style={{ width: `${duplicatedLogos.length * logoWidth}px` }}
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
    Icon: IconType;
  };
}

const LogoCard = ({ logo }: LogoCardProps) => {
  const { Icon, name } = logo;

  // Get brand-specific colors
  const getLogoColor = (logoName: string) => {
    const colors: Record<string, string> = {
      Google: "text-blue-500 hover:text-blue-600",
      Amazon: "text-orange-500 hover:text-orange-600",
      Meta: "text-blue-600 hover:text-blue-700",
      Tesla: "text-red-600 hover:text-red-700",
      Netflix: "text-red-600 hover:text-red-700",
      Spotify: "text-green-500 hover:text-green-600",
      Airbnb: "text-red-500 hover:text-red-600",
      Uber: "text-black hover:text-zinc-800",
      Stripe: "text-indigo-600 hover:text-indigo-700",
      Apple: "text-zinc-800 hover:text-black",
      Nvidia: "text-green-600 hover:text-green-700",
      Adobe: "text-red-600 hover:text-red-700",
    };
    return colors[logoName] || "text-zinc-600 hover:text-zinc-800";
  };

  return (
    <div className="group flex flex-shrink-0 items-center justify-center px-12">
      <Icon
        className={`text-6xl transition-all duration-500 hover:scale-105 ${getLogoColor(name)}`}
        title={name}
      />
    </div>
  );
};
