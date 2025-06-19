import React from "react";
import { FiCheck, FiX, FiZap, FiStar } from "react-icons/fi";
import { Button } from "../shared/Button";

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
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
    price: "$10,000",
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
    buttonText: "Start Your AI Journey",
  },
  {
    name: "Enterprise",
    subtitle: "",
    price: "$20,000",
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
    buttonText: "Transform Your Business",
    popular: true,
  },
  {
    name: "Custom",
    subtitle: "",
    price: "Custom",
    description: "Full AI ecosystem with unlimited systems and integrations",
    features: [
      { text: "Unlimited AI Systems", included: true },
      { text: "60-Day Development", included: true },
      { text: "Enterprise Integrations", included: true },
      { text: "Dedicated Support Team", included: true },
      { text: "Source Code Ownership", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Ongoing Team Training", included: true },
      { text: "12 Months Free Updates", included: true },
    ],
    buttonText: "Schedule Enterprise Call",
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-black md:text-6xl">
            Stop Paying Monthly.
            <br />
            <span className="text-orange-600">Own Your AI.</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-600 md:text-2xl">
            One-time investment. Lifetime ownership. No subscriptions, no vendor
            lock-in. Calculate your savings below.
          </p>
          
          {/* Key Benefits from copy.md */}
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
              <div className="flex items-center text-2xl">⚡</div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="text-sm font-bold leading-tight">30-day deployment</div>
                <div className="text-xs text-zinc-600 leading-tight">AI working fast</div>
              </div>
            </div>
            <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
              <div className="flex items-center text-2xl">💰</div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="text-sm font-bold leading-tight">Fixed pricing</div>
                <div className="text-xs text-zinc-600 leading-tight">No surprise costs</div>
              </div>
            </div>
            <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
              <div className="flex items-center text-2xl">🏆</div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="text-sm font-bold leading-tight">100% ownership</div>
                <div className="text-xs text-zinc-600 leading-tight">Your advantage</div>
              </div>
            </div>
            <div className="flex h-20 items-center justify-center gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[2px_2px_0px_#18181b]">
              <div className="flex items-center text-2xl">📈</div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="text-sm font-bold leading-tight">Immediate impact</div>
                <div className="text-xs text-zinc-600 leading-tight">ROI through efficiency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl border-4 border-zinc-900 bg-white p-8 text-center shadow-[8px_8px_0px_0px_rgb(39,39,42)]">
          <h3 className="mb-4 text-3xl font-bold">
            🤔 Not sure which plan fits your business?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-zinc-600">
            Book a free 30-minute strategy call and we'll analyze your current
            SaaS costs and show you exactly how much you could save with custom
            AI.
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
  );
};

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

const PricingCard = ({ plan, index }: PricingCardProps) => {
  const isPopular = plan.popular;

  return (
    <div
      className={`relative rounded-3xl border-4 border-zinc-900 bg-white p-8 transition-all hover:scale-105 ${
        isPopular
          ? "shadow-[12px_12px_0px_0px_rgb(234,88,12)] ring-4 ring-orange-200"
          : "shadow-[8px_8px_0px_0px_rgb(39,39,42)] hover:shadow-[12px_12px_0px_0px_rgb(39,39,42)]"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <div className="flex items-center gap-2 rounded-full border-2 border-orange-400 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold text-white">
            <FiStar className="text-yellow-300" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
        {plan.subtitle && <p className="mb-4 text-zinc-600">{plan.subtitle}</p>}

        <div className="mb-4">
          {plan.originalPrice && (
            <span className="mr-2 text-lg text-zinc-400 line-through">
              {plan.originalPrice}
            </span>
          )}
          <span className="text-4xl font-black text-zinc-900">
            {plan.price}
          </span>
          {plan.price !== "Custom" && (
            <span className="ml-1 text-zinc-600">/mo</span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-zinc-600">
          {plan.description}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8 space-y-3">
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
        <Button
          intent={isPopular ? "cta" : "primary"}
          size="medium"
          className="w-full"
        >
          {plan.buttonText}
        </Button>
      </a>
    </div>
  );
};
