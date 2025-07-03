import React from "react";
import { Block } from "./Block";
import {
  FiArrowUpRight,
  FiClipboard,
  FiCoffee,
  FiDollarSign,
  FiFeather,
  FiInbox,
  FiMove,
  FiRepeat,
  FiSmile,
  FiZap,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiTarget,
  FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";

interface HighlighBlocksProps {
  variant?: "customSoftware" | "inventory" | "webapp" | "ai";
}

export const HighlighBlocks = ({
  variant = "customSoftware",
}: HighlighBlocksProps) => {
  const benefits = {
    customSoftware: [
      {
        Icon: FiDollarSign,
        iconClassName: "text-green-500",
        title: "40-60% Cost Reduction",
        subtitle:
          "Eliminate expensive SaaS subscriptions and reduce operational overhead",
      },
      {
        Icon: FiClock,
        iconClassName: "text-blue-500",
        title: "Simple 30 day cycles",
        subtitle:
          "After launching your MVP, you can choose to continue with our simple monthly subscription, or take the code in-house",
      },
      {
        Icon: FiZap,
        iconClassName: "text-orange-500",
        title: "80% Speed Increase",
        subtitle:
          "Most of our AI automations deliver process improvements of 80% over the older, manual methods",
      },
      {
        Icon: FiArrowUpRight,
        iconClassName: "text-purple-500",
        title: "Boost Productivity",
        subtitle:
          "By automating manual tasks like data entry, emails, and compliance reports",
      },
      {
        Icon: FiShield,
        iconClassName: "text-red-500",
        title: "Enterprise Security",
        subtitle: "Bank-level security with UAE compliance standards",
      },
      {
        Icon: FiTrendingUp,
        iconClassName: "text-teal-500",
        title: "Grow Revenues",
        subtitle:
          "We automate the repetitive tasks that are stopping you from scaling",
      },
      {
        Icon: FiTarget,
        iconClassName: "text-pink-500",
        title: "Perfect Fit Solution",
        subtitle: "Built specifically for your business processes and goals",
      },
      {
        Icon: FiSettings,
        iconClassName: "text-indigo-500",
        title: "Full Control",
        subtitle: "Own your technology stack without vendor dependencies",
      },
      {
        Icon: FiSmile,
        iconClassName: "text-yellow-500",
        title: "24/7 Support",
        subtitle: "Dedicated support team for your success",
      },
    ],
    inventory: [
      {
        Icon: FiDollarSign,
        iconClassName: "text-green-500",
        title: "30% Cost Savings",
        subtitle: "Reduce inventory carrying costs and eliminate stockouts",
      },
      {
        Icon: FiZap,
        iconClassName: "text-orange-500",
        title: "Real-Time Tracking",
        subtitle: "Instant visibility across all locations and channels",
      },
      {
        Icon: FiTrendingUp,
        iconClassName: "text-blue-500",
        title: "95% Accuracy Rate",
        subtitle: "Eliminate human errors with automated tracking",
      },
      {
        Icon: FiClock,
        iconClassName: "text-purple-500",
        title: "Instant Alerts",
        subtitle: "Automated notifications for low stock and reorder points",
      },
      {
        Icon: FiTarget,
        iconClassName: "text-pink-500",
        title: "Smart Forecasting",
        subtitle: "AI-powered demand prediction and optimal stock levels",
      },
      {
        Icon: FiArrowUpRight,
        iconClassName: "text-teal-500",
        title: "Multi-Location Sync",
        subtitle: "Unified view across warehouses, stores, and online channels",
      },
    ],
    webapp: [
      {
        Icon: FiDollarSign,
        iconClassName: "text-green-500",
        title: "50% Lower TCO",
        subtitle: "Reduce total cost of ownership vs off-the-shelf solutions",
      },
      {
        Icon: FiZap,
        iconClassName: "text-orange-500",
        title: "Lightning Fast",
        subtitle: "Optimized performance for your specific use cases",
      },
      {
        Icon: FiShield,
        iconClassName: "text-red-500",
        title: "Enterprise Security",
        subtitle: "Custom security measures for your data protection needs",
      },
      {
        Icon: FiArrowUpRight,
        iconClassName: "text-blue-500",
        title: "Unlimited Scale",
        subtitle: "Built to grow with your business without limitations",
      },
      {
        Icon: FiTarget,
        iconClassName: "text-purple-500",
        title: "Perfect UX",
        subtitle: "User experience designed specifically for your workflows",
      },
      {
        Icon: FiSettings,
        iconClassName: "text-teal-500",
        title: "Full Integration",
        subtitle: "Seamlessly connects with all your existing systems",
      },
    ],
    ai: [
      {
        Icon: FiZap,
        iconClassName: "text-orange-500",
        title: "70% Efficiency Gain",
        subtitle: "AI automation eliminates manual processes and errors",
      },
      {
        Icon: FiDollarSign,
        iconClassName: "text-green-500",
        title: "300% ROI",
        subtitle: "Measurable returns through intelligent automation",
      },
      {
        Icon: FiTrendingUp,
        iconClassName: "text-blue-500",
        title: "Predictive Insights",
        subtitle: "AI-powered analytics for smarter business decisions",
      },
      {
        Icon: FiClock,
        iconClassName: "text-purple-500",
        title: "24/7 Automation",
        subtitle: "AI works around the clock without breaks or errors",
      },
      {
        Icon: FiTarget,
        iconClassName: "text-pink-500",
        title: "Smart Learning",
        subtitle: "AI improves over time, becoming more efficient daily",
      },
      {
        Icon: FiShield,
        iconClassName: "text-red-500",
        title: "Secure AI",
        subtitle: "Enterprise-grade AI with privacy and security built-in",
      },
    ],
  };

  return (
    <>
      {benefits[variant].map((benefit, index) => (
        <HighlightBlock
          key={index}
          Icon={benefit.Icon}
          iconClassName={benefit.iconClassName}
          title={benefit.title}
          subtitle={benefit.subtitle}
        />
      ))}
    </>
  );
};

type Props = {
  Icon: IconType;
  iconClassName: string;
  title: string;
  subtitle: string;
};

const HighlightBlock = ({ iconClassName, Icon, title, subtitle }: Props) => (
  <Block className="col-span-3 space-y-1.5 md:col-span-1">
    <Icon className={twMerge("text-3xl text-indigo-600", iconClassName)} />
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
  </Block>
);
