"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, Database, Zap, Shield, Globe, Smartphone } from "lucide-react";
import { HeadingH2 } from "@/components/heading-h2";

interface Tech {
  name: string;
  category: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const techStack: Tech[] = [
  {
    name: "React/Next.js",
    category: "Frontend",
    description: "Modern, fast user interfaces",
    color: "#61DAFB",
    icon: <Code className="h-4 w-4" />,
  },
  {
    name: "Node.js/Python",
    category: "Backend",
    description: "Scalable server architecture",
    color: "#68A063",
    icon: <Database className="h-4 w-4" />,
  },
  {
    name: "OpenAI/Claude",
    category: "AI",
    description: "Intelligent AI capabilities",
    color: "#FF6B6B",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Reliable data storage",
    color: "#336791",
    icon: <Database className="h-4 w-4" />,
  },
  {
    name: "Stripe",
    category: "Payments",
    description: "Secure payment processing",
    color: "#635BFF",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    name: "Vercel/AWS",
    category: "Hosting",
    description: "Global deployment",
    color: "#FF9500",
    icon: <Globe className="h-4 w-4" />,
  },
];

interface TechCard {
  tech: Tech;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const TechCard: React.FC<TechCard> = ({ tech, isHovered, onHover }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightSize = 100;

  const lightX = useTransform(x, (value) => value - lightSize / 2);
  const lightY = useTransform(y, (value) => value - lightSize / 2);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-black/40 p-6 backdrop-blur-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50"></div>

      {/* Hover light effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: lightSize,
            height: lightSize,
            background: `radial-gradient(circle, ${tech.color}20, transparent)`,
            filter: "blur(20px)",
            x: lightX,
            y: lightY,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110"
          style={{ borderColor: tech.color }}
        >
          <div style={{ color: tech.color }}>{tech.icon}</div>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-bold text-white">{tech.name}</h3>
          <p className="mb-2 text-sm text-gray-400">{tech.category}</p>
          <p className="text-xs text-gray-500">{tech.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const TechStackShowcase: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <HeadingH2
            variant="slash"
            accent="orange"
            align="center"
            animate={true}
            className="mb-6"
          >
            Modern Tech Stack Included
          </HeadingH2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            We use cutting-edge technologies to build fast, scalable, and secure
            MVPs that can grow with your business.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech, index) => (
            <TechCard
              key={index}
              tech={tech}
              isHovered={hoveredIndex === index}
              onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
            />
          ))}
        </div>

        {/* Why This Stack Section */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="mb-12 text-center text-2xl font-bold text-white">
            Why This Stack?
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">
                Fast Development
              </h4>
              <p className="text-sm text-gray-400">
                Proven technologies that let us build quickly without
                sacrificing quality.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">
                Production Ready
              </h4>
              <p className="text-sm text-gray-400">
                Enterprise-grade technologies used by millions of applications
                worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                <Smartphone className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">
                Scalable
              </h4>
              <p className="text-sm text-gray-400">
                Your MVP can grow into a full product without major rewrites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
