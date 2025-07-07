import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Shield,
  Zap,
  Target,
  Globe,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Lock,
  Settings,
  Gauge,
  Users,
  Clock,
  Award,
  Database,
  Workflow,
} from "lucide-react";
import { ToggleButton } from "../feature-toggles/ToggleButton";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";
import { Button } from "../shared/Button";

interface ServiceFeaturesProps {
  variant: "customSoftware" | "inventory" | "webapp" | "ai";
}

interface FeatureCardProps {
  icon: React.ReactNode;
  headline: string;
  benefit: string;
  metric?: string;
  delay?: number;
}

const FeatureCard = ({
  icon,
  headline,
  benefit,
  metric,
  delay = 0,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex h-[280px] flex-col justify-between 
                 overflow-hidden rounded-2xl border border-zinc-200 
                 bg-gradient-to-br from-white to-orange-50/30 p-6
                 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl"
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated Icon Container */}
      <div
        className="relative mb-4 flex h-16 w-16 items-center justify-center 
                      rounded-xl bg-orange-100 transition-colors 
                      duration-300 group-hover:bg-orange-200"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-orange-600"
        >
          {icon}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-grow flex-col">
        <h4 className="mb-3 text-xl font-bold text-zinc-900 transition-colors group-hover:text-orange-700">
          {headline}
        </h4>

        <p className="mb-4 flex-grow text-sm leading-relaxed text-zinc-600">
          {benefit}
        </p>

        {/* ROI Metric */}
        {metric && (
          <motion.div
            className="flex items-center text-xs font-semibold text-orange-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-400" />
            {metric}
          </motion.div>
        )}
      </div>


    </motion.div>
  );
};

export const ServiceFeatures = ({ variant }: ServiceFeaturesProps) => {
  const [selected, setSelected] = useState(1);
  const data = getServiceFeaturesData(variant);
  const { heading, subheading } = getServiceFeaturesContent(variant);

  return (
    <section className="relative mx-auto max-w-7xl px-4 ">
      <div className="mb-12 text-center">
        <SectionHeading>{heading}</SectionHeading>
        <SectionSubheading>{subheading}</SectionSubheading>
      </div>

      {/* Tab Navigation */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.map((d) => (
          <ToggleButton
            key={d.id}
            id={d.id}
            selected={selected}
            setSelected={setSelected}
          >
            {d.title}
          </ToggleButton>
        ))}
      </div>

      {/* Feature Cards Display */}
      <div className="relative min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {data
              .find((d) => d.id === selected)
              ?.features.map((feature, index) => (
                <FeatureCard
                  key={`${selected}-${index}`}
                  icon={feature.icon}
                  headline={feature.headline}
                  benefit={feature.benefit}
                  metric={feature.metric}
                  delay={index * 0.1}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <motion.div
        className="relative z-10  text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button intent="cta" size="large" className=" inline-flex items-center">
          Start Your Project
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className=" mt-4 mb-16 text-sm text-zinc-500">
          Free consultation • No commitment required
        </p>
      </motion.div>
    </section>
  );
};

function getServiceFeaturesContent(variant: ServiceFeaturesProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return {
        heading: "Enterprise Software That Drives Real Results",
        subheading:
          "Transform your operations with custom solutions designed for Dubai's competitive business landscape.",
      };
    case "inventory":
      return {
        heading: "Smart Inventory Management for Modern Business",
        subheading:
          "Eliminate stockouts and reduce carrying costs with AI-powered inventory optimization.",
      };
    case "webapp":
      return {
        heading: "Web Applications That Scale With Your Vision",
        subheading:
          "Build digital experiences that captivate users and drive business growth.",
      };
    case "ai":
      return {
        heading: "AI Solutions That Actually Deliver ROI",
        subheading:
          "Practical artificial intelligence that automates complex processes and measurably improves efficiency.",
      };
    default:
      return {
        heading: "Transform Your Business With Technology",
        subheading:
          "Proven solutions that eliminate operational bottlenecks and accelerate growth.",
      };
  }
}

function getServiceFeaturesData(variant: ServiceFeaturesProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return [
        {
          id: 1,
          title: "Enterprise Solutions",
          features: [
            {
              icon: <Rocket className="h-8 w-8" />,
              headline: "40% Faster Operations",
              benefit:
                "Automate manual processes and eliminate bottlenecks with intelligent workflows designed for Dubai's business pace.",
              metric: "Average 40% efficiency gain in first quarter",
            },
            {
              icon: <Database className="h-8 w-8" />,
              headline: "Legacy System Transformation",
              benefit:
                "Modernize outdated systems without disrupting operations, integrating seamlessly with your existing infrastructure.",
              metric: "Zero downtime migration guaranteed",
            },
            {
              icon: <Settings className="h-8 w-8" />,
              headline: "Custom Process Automation",
              benefit:
                "Build workflows that match your exact business requirements, not generic off-the-shelf limitations.",
              metric: "Tailored to your unique processes",
            },
          ],
        },
        {
          id: 2,
          title: "UAE Compliance & Security",
          features: [
            {
              icon: <Shield className="h-8 w-8" />,
              headline: "UAE-Compliant Security",
              benefit:
                "Built-in compliance with UAE data protection laws and enterprise-grade security that scales with your business.",
              metric: "100% regulatory compliance guaranteed",
            },
            {
              icon: <Globe className="h-8 w-8" />,
              headline: "Arabic & Multi-Language",
              benefit:
                "Native RTL support and seamless multi-language functionality for serving diverse UAE markets.",
              metric: "Supports 10+ languages including Arabic",
            },
            {
              icon: <Lock className="h-8 w-8" />,
              headline: "Enterprise-Grade Security",
              benefit:
                "Advanced encryption, multi-factor authentication, and audit trails that exceed banking security standards.",
              metric: "Bank-level security protocols",
            },
          ],
        },
        {
          id: 3,
          title: "Rapid Deployment",
          features: [
            {
              icon: <Clock className="h-8 w-8" />,
              headline: "30-Day Launch Guarantee",
              benefit:
                "Launch enterprise software in 30 days, not 6 months, with our proven rapid deployment methodology.",
              metric: "Average 30-day delivery time",
            },
            {
              icon: <Users className="h-8 w-8" />,
              headline: "Comprehensive Team Training",
              benefit:
                "Your team becomes experts from day one with hands-on training and detailed documentation.",
              metric: "100% team proficiency achieved",
            },
            {
              icon: <Award className="h-8 w-8" />,
              headline: "3-Month Support Guarantee",
              benefit:
                "Complete peace of mind with three months of free updates, bug fixes, and optimization support.",
              metric: "3 months free support included",
            },
          ],
        },
      ];

    default:
      // Fallback to custom software
      return [
        {
          id: 1,
          title: "Core Features",
          features: [
            {
              icon: <Target className="h-8 w-8" />,
              headline: "Tailored Solutions",
              benefit:
                "Custom software built specifically for your business requirements and industry needs.",
              metric: "100% customization",
            },
            {
              icon: <Zap className="h-8 w-8" />,
              headline: "High Performance",
              benefit:
                "Optimized architecture that handles enterprise-scale operations with lightning-fast response times.",
              metric: "Sub-second response times",
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              headline: "Scalable Growth",
              benefit:
                "Infrastructure that grows with your business, from startup to enterprise without rebuilding.",
              metric: "Scales to millions of users",
            },
          ],
        },
        {
          id: 2,
          title: "Integration",
          features: [
            {
              icon: <Workflow className="h-8 w-8" />,
              headline: "Seamless Integration",
              benefit:
                "Connect with your existing systems without disruption or data loss.",
              metric: "99.9% uptime during integration",
            },
            {
              icon: <Gauge className="h-8 w-8" />,
              headline: "Real-time Analytics",
              benefit:
                "Make data-driven decisions with comprehensive dashboards and reporting.",
              metric: "Real-time insights",
            },
            {
              icon: <CheckCircle2 className="h-8 w-8" />,
              headline: "Quality Assurance",
              benefit:
                "Rigorous testing ensures your software works perfectly from launch day.",
              metric: "99.9% bug-free guarantee",
            },
          ],
        },
        {
          id: 3,
          title: "Support",
          features: [
            {
              icon: <Clock className="h-8 w-8" />,
              headline: "24/7 Support",
              benefit:
                "Round-the-clock technical support to keep your operations running smoothly.",
              metric: "24/7 availability",
            },
            {
              icon: <Users className="h-8 w-8" />,
              headline: "Expert Team",
              benefit:
                "Work directly with senior developers and solution architects.",
              metric: "10+ years average experience",
            },
            {
              icon: <Award className="h-8 w-8" />,
              headline: "Success Guarantee",
              benefit:
                "We guarantee your satisfaction with comprehensive support and updates.",
              metric: "100% satisfaction guaranteed",
            },
          ],
        },
      ];
  }
}
