"use client";

import React from "react";
import {
  Shield,
  CheckCircle,
  Users,
  Clock,
  RefreshCw,
  Award,
} from "lucide-react";

interface GuaranteeCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const guarantees: GuaranteeCard[] = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Only 10% Deposit",
    description:
      "Start with just $1,000 - minimal risk to get started with your MVP project.",
    color: "bg-blue-500",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Weekly Progress Demos",
    description:
      "See your MVP come to life with regular demos and full transparency throughout.",
    color: "bg-green-500",
  },
  {
    icon: <RefreshCw className="h-8 w-8" />,
    title: "On-Time Delivery Guarantee",
    description:
      "Full refund if we miss the 4-week deadline - we stand behind our promise.",
    color: "bg-purple-500",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "100% Code Ownership",
    description:
      "You own all the code, documentation, and intellectual property. No vendor lock-in.",
    color: "bg-orange-500",
  },
];

const trustBadges = [
  {
    icon: <Users className="h-5 w-5" />,
    text: "12 MVPs Launched",
    subtext: "Proven track record",
  },
  {
    icon: <Award className="h-5 w-5" />,
    text: "100% Success Rate",
    subtext: "Never missed a deadline",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    text: "Full Code Ownership",
    subtext: "No vendor lock-in",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    text: "4-Week Delivery",
    subtext: "Or full refund",
  },
];

const GuaranteeCard: React.FC<{ guarantee: GuaranteeCard }> = ({
  guarantee,
}) => (
  <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
    <div className="flex items-start gap-4">
      <div
        className={`rounded-lg p-3 ${guarantee.color} text-white transition-transform group-hover:scale-110`}
      >
        {guarantee.icon}
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {guarantee.title}
        </h3>
        <p className="leading-relaxed text-gray-600">{guarantee.description}</p>
      </div>
    </div>
  </div>
);

const TrustBadge: React.FC<{ badge: (typeof trustBadges)[0] }> = ({
  badge,
}) => (
  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100">
    <div className="text-orange-600">{badge.icon}</div>
    <div>
      <div className="text-sm font-semibold text-gray-900">{badge.text}</div>
      <div className="text-xs text-gray-500">{badge.subtext}</div>
    </div>
  </div>
);

export const RiskReversalMVP: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Zero Risk, Maximum Results
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            We remove all the risk from your MVP development with our ironclad
            guarantees and transparent process.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {trustBadges.map((badge, index) => (
            <TrustBadge key={index} badge={badge} />
          ))}
        </div>

        {/* Guarantee Cards */}
        <div className="mx-auto mb-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {guarantees.map((guarantee, index) => (
            <GuaranteeCard key={index} guarantee={guarantee} />
          ))}
        </div>

        {/* Security Assurance */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-8">
          <div className="flex items-start gap-6">
            <div className="rounded-full bg-green-100 p-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-4 text-2xl font-bold text-green-900">
                Your Investment is Protected
              </h3>
              <div className="grid gap-6 text-sm md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      Milestone-based payments
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      Weekly progress reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      Full source code access
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      No long-term contracts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">Deadline guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      30-day support included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Assurance */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm">
            <div className="flex -space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <span className="text-xs font-bold text-white">R</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-bold text-white">H</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <span className="text-xs font-bold text-white">D</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">
                Trusted by founders at
              </div>
              <div className="text-xs text-gray-500">
                Y Combinator, Techstars & more
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
