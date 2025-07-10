import React, { useState } from "react";
import { FiCheck, FiX, FiZap, FiStar } from "react-icons/fi";
import { Button } from "../shared/Button";

interface PricingPlan {
  name: string;
  subtitle: string;
  monthlyPrice: string;
  annualPrice: string;
  originalPrice?: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  popular?: boolean;
  description: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "MVP Sprint",
    subtitle: "",
    monthlyPrice: "$10,000",
    annualPrice: "$8,000",
    description: "Launch your first AI-powered product in 4 weeks",
    features: [
      { text: "Complete MVP in 4 weeks", included: true },
      { text: "4 Strategic Planning Sessions", included: true },
      { text: "2-3 Core Features Implementation", included: true },
      { text: "AI Integration Setup", included: true },
      { text: "Stripe Payment Integration", included: true },
      { text: "Email Integration", included: true },
      { text: "Source Code Ownership", included: true },
      { text: "Advanced Analytics", included: false },
    ],
    buttonText: "Join Today",
  },
  {
    name: "Enterprise",
    subtitle: "",
    monthlyPrice: "$20,000",
    annualPrice: "$16,000",
    description: "Complete AI automation for your core business processes",
    features: [
      { text: "Custom Internal Tool Development", included: true },
      { text: "Process Automation Systems", included: true },
      { text: "Data Pipeline Integration", included: true },
      { text: "Admin Dashboard Creation", included: true },
      { text: "Role-Based Access Control", included: true },
      { text: "API Integration Framework", included: true },
      { text: "Source Code Ownership", included: true },
      { text: "3 Months Free Updates", included: true },
    ],
    buttonText: "Join Today",
    popular: true,
  },
  {
    name: "Expert Training",
    subtitle: "",
    monthlyPrice: "$200",
    annualPrice: "$200",
    description: "one time",
    features: [
      {
        text: "Initial project setup with your tech stack (15 mins)",
        included: true,
      },
      {
        text: "Core feature implementation - auth & basic CRUD (25 mins)",
        included: true,
      },
      {
        text: "UI implementation with ready-made components (15 mins)",
        included: true,
      },
      { text: "Deployment walkthrough (5 mins)", included: true },
      { text: "You'll own 100% of the code", included: true },
    ],
    buttonText: "Join Today",
  },
];

interface PricingSectionProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

export const PricingSection = ({
  variant = "default",
}: PricingSectionProps) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const content = getPricingContent(variant);

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <section id="pricing" className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-5xl font-black md:text-6xl">
              {content.heading}
              <br />
              <span className="text-orange-600">{content.subheading}</span>
            </h2>
            {/* <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-600 md:text-2xl">
            One-time investment. Lifetime ownership. No subscriptions, no vendor
            lock-in. Calculate your savings below.
          </p> */}

            {/* Key Benefits from copy.md */}
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
                <div className="flex items-center text-2xl">⚡</div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="text-sm font-bold leading-tight">
                    30-day deployment
                  </div>
                  <div className="text-xs leading-tight text-zinc-600">
                    AI working fast
                  </div>
                </div>
              </div>
              <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
                <div className="flex items-center text-2xl">💰</div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="text-sm font-bold leading-tight">
                    Fixed pricing
                  </div>
                  <div className="text-xs leading-tight text-zinc-600">
                    No surprise costs
                  </div>
                </div>
              </div>
              <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
                <div className="flex items-center text-2xl">🏆</div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="text-sm font-bold leading-tight">
                    100% ownership
                  </div>
                  <div className="text-xs leading-tight text-zinc-600">
                    Your advantage
                  </div>
                </div>
              </div>
              <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
                <div className="flex items-center text-2xl">📈</div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="text-sm font-bold leading-tight">
                    Immediate impact
                  </div>
                  <div className="text-xs leading-tight text-zinc-600">
                    ROI through efficiency
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <span
              className={`text-lg font-medium ${!isAnnual ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-14 items-center rounded-full ring-2 ring-orange-400 transition-colors"
              style={{ backgroundColor: isAnnual ? "#ea580c" : "#ea580c" }}
            >
              <span
                className={`${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
              />
            </button>
            <span
              className={`text-lg font-medium ${isAnnual ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Annual
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                isAnnual={isAnnual}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-3xl border-4 border-zinc-900 bg-white p-8 text-center shadow-[8px_8px_0px_0px_rgb(39,39,42)]">
            <h3 className="mb-4 text-3xl font-bold">
              🤔 Not sure which plan fits your business?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-zinc-600">
              Book a free 30-minute strategy call and we'll analyze your current
              SaaS costs and show you exactly how much you could save with
              custom AI.
            </p>
            <a
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                📞 Book Free Strategy Call
                <FiZap />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isAnnual: boolean;
}

const PricingCard = ({ plan, index, isAnnual }: PricingCardProps) => {
  const isPopular = plan.popular;
  const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border-4 border-zinc-900 bg-white p-8 transition-all hover:scale-[1.02] ${
        isPopular
          ? "shadow-[12px_12px_0px_0px_rgb(234,88,12)] ring-4 ring-orange-200"
          : "shadow-[8px_8px_0px_0px_rgb(39,39,42)] hover:shadow-[12px_12px_0px_0px_rgb(39,39,42)]"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform md:-top-4">
          <div className="flex items-center gap-1 rounded-full border-2 border-green-600 bg-[#10B981] px-3 py-1 text-xs font-bold text-white md:gap-2 md:px-6 md:py-2 md:text-sm">
            <FiStar className="text-white h-3 w-3 md:h-4 md:w-4" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold mt-6 md:mt-0">{plan.name}</h3>
        {plan.subtitle && <p className="mb-4 text-zinc-600">{plan.subtitle}</p>}

        <div className="relative mb-4">
          {plan.originalPrice && (
            <span className="mr-2 text-lg text-zinc-400 line-through">
              {plan.originalPrice}
            </span>
          )}
          <div className="flex justify-center">
            <div className="relative inline-flex items-end">
              <span className="text-4xl font-black text-zinc-900">
                {displayPrice}
              </span>
              {displayPrice !== "Custom" && plan.name !== "Expert Training" && (
                <span className="pb-1 text-lg text-zinc-600">/mo</span>
              )}
              {isAnnual &&
                displayPrice !== "Custom" &&
                plan.name !== "Expert Training" && (
                  <span className="absolute -right-16 -top-1 inline-flex items-center whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Save 20%
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-8 flex-grow space-y-3">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div
              className={`mt-0.5 rounded-full p-1 ${
                feature.included
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {feature.included ? (
                <FiCheck className="h-3 w-3" />
              ) : (
                <FiX className="h-3 w-3" />
              )}
            </div>
            <span
              className={`text-sm ${
                feature.included ? "text-zinc-700" : "text-zinc-400"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="https://calendly.com/hello-deployai/30min"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block" }}
      >
        {isPopular ? (
          <button
            className="group relative w-full overflow-hidden rounded-lg border-2 border-zinc-900 px-6 py-3 text-base font-bold text-white shadow-[4px_4px_0px_0px_rgb(39,39,42)] transition-transform hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, #FF6B35 0%, #FF8E53 25%, #F7931E 50%, #FF5722 75%, #FF6B35 100%)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 12s ease-in-out infinite",
            }}
          >
            <span className="relative z-10">{plan.buttonText}</span>
          </button>
        ) : (
          <button className="w-full rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-base font-bold text-white shadow-[4px_4px_0px_0px_rgb(39,39,42)] transition-transform hover:scale-[1.02]">
            {plan.buttonText}
          </button>
        )}
      </a>
    </div>
  );
};

function getPricingContent(variant: PricingSectionProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return {
        heading: "Fixed-Price Custom Software Development.",
        subheading: "Own Your Code.",
      };
    case "inventory":
      return {
        heading: "Smart Inventory Management Systems.",
        subheading: "Real-Time Control.",
      };
    case "webapp":
      return {
        heading: "Modern Web Application Development.",
        subheading: "Scale Your Business.",
      };
    case "ai":
      return {
        heading: "AI Automation Solutions.",
        subheading: "Work Smarter.",
      };
    default:
      return {
        heading: "Stop Paying Monthly Subscriptions.",
        subheading: "Own Your AI.",
      };
  }
}
