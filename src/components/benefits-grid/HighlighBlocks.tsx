import React from "react";
import { Block } from "./Block";
import {
  FiArrowUpRight,
  FiDollarSign,
  FiZap,
  FiTrendingUp,
  FiShield,
  FiClock,
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
        title: "Stop Missing Hot Prospects",
        subtitle: "AI captures leads around the clock and even while you sleep",
      },
      {
        Icon: FiZap,
        iconClassName: "text-orange-500",
        title: "Reclaim 20+ Hours Weekly",
        subtitle:
          "Automate data entry, reporting, and admin tasks your team does manually",
      },
      {
        Icon: FiShield,
        iconClassName: "text-red-500",
        title: "Clone Your Expertise",
        subtitle:
          "Give every team member instant access to your best performer's knowledge",
      },
      {
        Icon: FiTrendingUp,
        iconClassName: "text-teal-500",
        title: "Scale Without Hiring",
        subtitle: "Handle 3x the workload with your current team size",
      },
      {
        Icon: FiArrowUpRight,
        iconClassName: "text-purple-500",
        title: "Drive More Sales",
        subtitle:
          "AI becomes your sales rep, content creator, and lead qualifier working around the clock",
      },
      {
        Icon: FiClock,
        iconClassName: "text-blue-500",
        title: "Predictable Budgets",
        subtitle: "One payment replaces $15K+ annual SaaS spending",
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
