"use client";

import * as React from "react";
import { Check, Calendar, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/shared/Button";

export const MVPPricing = () => {
  const handleBookCall = () => {
    // This would open Calendly or navigate to booking
    window.open("https://calendly.com/your-booking-link", "_blank");
  };

  const features = [
    "Full MVP development",
    "AI integration (OpenAI/Claude)",
    "Payment processing (Stripe)",
    "User authentication",
    "Admin dashboard",
    "Deployment & hosting setup",
    "30 days post-launch support",
    "Complete source code ownership",
  ];

  const paymentSchedule = [
    {
      phase: "To Start",
      amount: "$1,000",
      percentage: "10%",
      description: "Project kickoff & planning",
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
    },
    {
      phase: "Week 2 Milestone",
      amount: "$4,000",
      percentage: "40%",
      description: "Core development complete",
      icon: <CreditCard className="h-5 w-5 text-orange-500" />,
    },
    {
      phase: "On Delivery",
      amount: "$5,000",
      percentage: "50%",
      description: "Live MVP with full handover",
      icon: <Shield className="h-5 w-5 text-orange-500" />,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            One price. One deliverable. No hidden costs or scope creep.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-8 md:grid-cols-2">
            {/* Main Pricing Card */}
            <div className="relative">
              <div className="absolute -right-4 -top-4 rotate-12 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                Most Popular
              </div>

              <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-8 shadow-xl">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    AI App MVP
                  </h3>
                  <p className="mb-6 text-gray-600">
                    From idea to live product in 4 weeks
                  </p>

                  <div className="mb-2 flex items-center justify-center gap-2">
                    <span className="text-5xl font-bold text-orange-600">
                      $10,000
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Total project cost</p>
                </div>

                <div className="mb-8 space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleBookCall}
                  className="w-full transform rounded-xl bg-gradient-to-r from-orange-600 to-red-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-orange-700 hover:to-red-700"
                >
                  Book Your Free Strategy Call
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Limited to 3 new MVPs per month
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="space-y-6 ">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 text-center ">
                Simple and Clear <br /> Payment Terms
              </h3>

              {paymentSchedule.map((payment, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-orange-50 p-3">
                      {payment.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">
                          {payment.phase}
                        </h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-orange-600">
                            {payment.amount}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.percentage}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {payment.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-8 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="mt-1 h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="mb-2 font-semibold text-green-900">
                      Risk-Free Guarantee
                    </h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Only 10% deposit required to start</li>
                      <li>• Weekly progress demos</li>
                      <li>• Full refund if we miss deadline</li>
                      <li>• 100% code ownership</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
