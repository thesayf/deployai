import React from "react";
import { motion } from "framer-motion";
import { IntegrationsBlock } from "./IntegrationsBlock";
import { CollaborateBlock } from "./CollaborateBlock";
import { HighlighBlocks } from "./HighlighBlocks";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";
import { Button } from "../shared/Button";

interface BenefitsGridProps {
  variant?: "customSoftware" | "inventory" | "webapp" | "ai";
}

export const BenefitsGrid = ({
  variant = "customSoftware",
}: BenefitsGridProps) => {
  const content = {
    customSoftware: {
      title: "Maximise Profits While Reducing Costs",
      subtitle:
        "Transform your operations with AI-driven solutions that drive revenue growth",
    },
    inventory: {
      title: "Why Smart Inventory Management Changes Everything",
      subtitle:
        "Stop losing revenue to stockouts and overstocking. See how intelligent inventory systems transform Dubai businesses.",
    },
    webapp: {
      title: "Why Custom Web Applications Drive Growth",
      subtitle:
        "Generic platforms limit your potential. Custom web applications give you the competitive edge Dubai businesses need.",
    },
    ai: {
      title: "Why AI-Powered Solutions Transform Operations",
      subtitle:
        "Manual processes are expensive. AI automation delivers immediate ROI and positions your business for the future.",
    },
  };

  return (
    <motion.section
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      whileInView="whileInView"
      className="relative mx-auto grid max-w-6xl grid-cols-3 gap-4 px-2 md:px-4"
    >
      <div className="col-span-3">
        <SectionHeading>{content[variant].title}</SectionHeading>
        <SectionSubheading>{content[variant].subtitle}</SectionSubheading>
      </div>
      <IntegrationsBlock variant={variant} />
      <CollaborateBlock variant={variant} />
      <HighlighBlocks variant={variant} />
      <div className="col-span-3 mt-6 flex justify-center">
        <Button intent="cta">
          <span className="font-bold">Start Your Project - </span> Free
          consultation
        </Button>
      </div>
    </motion.section>
  );
};
