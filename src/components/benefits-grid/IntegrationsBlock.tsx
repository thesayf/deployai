import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
import { FiEdit } from "react-icons/fi";
import { Block } from "./Block";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";

interface IntegrationsBlockProps {
  variant?: "customSoftware" | "inventory" | "webapp" | "ai";
}

export const IntegrationsBlock = ({
  variant = "customSoftware",
}: IntegrationsBlockProps) => {
  const content = {
    customSoftware: {
      title: "Modern Technology Stack",
      subtitle:
        "Built with cutting-edge technologies for performance, scalability, and future-proofing your Dubai business operations.",
    },
    inventory: {
      title: "Enterprise Integrations",
      subtitle:
        "Connect with all your sales channels, suppliers, and warehouses using modern APIs and real-time data sync.",
    },
    webapp: {
      title: "Full-Stack Excellence",
      subtitle:
        "Modern web technologies that deliver lightning-fast performance and seamless user experiences.",
    },
    ai: {
      title: "AI-Ready Infrastructure",
      subtitle:
        "Built on modern platforms that seamlessly integrate AI capabilities and machine learning workflows.",
    },
  };

  return (
    <Block className="col-span-3 overflow-hidden md:col-span-2">
      <CardTitle>{content[variant].title}</CardTitle>
      <CardSubtitle>{content[variant].subtitle}</CardSubtitle>

      <div className="relative -mx-6 -mb-6 mt-6 grid grid-cols-3 place-content-center rounded-t-none border-t-2 border-zinc-900">
        <div className="grid w-full place-content-center border-r-2 border-zinc-900 bg-blue-600 py-8 text-white">
          <SiReact className="text-4xl" />
        </div>
        <div className="grid w-full place-content-center border-r-2 border-zinc-900 bg-zinc-900 py-8 text-white">
          <SiNextdotjs className="text-4xl" />
        </div>
        <div className="grid w-full place-content-center bg-green-600 py-8 text-white">
          <SiNodedotjs className="text-4xl" />
        </div>

        <div className="grid w-full place-content-center border-r-2 border-t-2 border-zinc-900 bg-gradient-to-br from-pink-500 to-purple-600 py-8 text-white">
          <svg
            className="text-5xl"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 28C16 28 6 23 6 15.5C6 12.46 8.46 10 11.5 10C13.74 10 15.54 11.3 16 13.05C16.46 11.3 18.26 10 20.5 10C23.54 10 26 12.46 26 15.5C26 23 16 28 16 28Z" />
          </svg>
        </div>
        <div className="grid w-full place-content-center border-r-2 border-t-2 border-zinc-900 bg-emerald-500 py-8 text-white">
          <SiSupabase className="text-4xl" />
        </div>
        <div className="grid w-full place-content-center border-t-2 border-zinc-900 bg-blue-800 py-8 text-white">
          <SiPostgresql className="text-4xl" />
        </div>
      </div>
    </Block>
  );
};
