import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/section-wrapper";

const LOGOS = [
  { name: "Centric", src: "/logos/CentricLogo.png", alt: "Centric Logo" },
  { name: "Mindscape", src: "/logos/Mindscape_logo.svg", alt: "Mindscape Logo" },
  { name: "Mirza", src: "/logos/Mirza_Logo.png", alt: "Mirza Logo" },
  { name: "Bookworm TP", src: "/logos/bookworm-tp.svg", alt: "Bookworm TP Logo" },
  { name: "Go Elevate AI", src: "/logos/goelevateailogo.svg", alt: "Go Elevate AI Logo" },
  { name: "Hubi", src: "/logos/hubilogo.webp", alt: "Hubi Logo" },
  { name: "OC", src: "/logos/oclogo.svg", alt: "OC Logo" },
  { name: "Pink Lizard", src: "/logos/pinklizardlogo.png", alt: "Pink Lizard Logo" },
];

export const LogoTrustBanner = () => {
  return (
    <SectionWrapper variant="concrete" spacing="medium">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {LOGOS.map((logo) => {
            const needsDarkBackground = logo.name === "JB";
            
            return (
              <div 
                key={logo.name} 
                className="flex items-center justify-center"
              >
                <div
                  className={`relative transition-all duration-300 hover:scale-105 ${
                    needsDarkBackground
                      ? "h-12 w-28 border-2 border-zinc-900 bg-zinc-900 shadow-[2px_2px_0px_#18181b]"
                      : "h-12 w-24"
                  }`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    title={logo.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};