import React from "react";
import { MockupScreen } from "./MockupScreen";
import { Copy } from "./Copy";

interface HeroProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

export const Hero = ({ variant = "default" }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-12 pb-24 pt-6 md:pt-8"
    >
      <Copy variant={variant} />
      {/* <MockupScreen /> */}
    </section>
  );
};
