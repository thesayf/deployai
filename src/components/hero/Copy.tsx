import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "../shared/Button";
import { LogoTicker } from "../logo-ticker/LogoTicker";

interface CopyProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

export const Copy = ({ variant = "default" }: CopyProps) => {
  const content = getHeroContent(variant);

  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <Link
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 font-medium text-white">
            {content.badge}
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            {content.announcement}
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </Link>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        {content.headline}
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        {content.subheading}
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            {content.ctaText}
            <FiArrowUpRight className="text-xl" />
          </span>
        </a>
        <p className="max-w-md text-center text-sm text-zinc-600">
          {content.ctaSubtext}
        </p>
      </div>
      <LogoTicker />
    </>
  );
};

function getHeroContent(variant: CopyProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return {
        badge: "DUBAI",
        announcement: "🚀 3 CUSTOM SOFTWARE PROJECTS AVAILABLE",
        headline: "Custom Software Development Dubai",
        subheading:
          "Stop paying monthly for software that doesn't fit your business. Get custom solutions that eliminate recurring fees and grow your operations.",
        ctaText: "🚀 Get Free Custom Software Consultation",
        ctaSubtext:
          "⏱️ 30-minute consultation • 💰 $0 cost • 🎯 Discuss your project",
      };
    case "inventory":
      return {
        badge: "DUBAI",
        announcement: "🏭 INVENTORY MANAGEMENT SOLUTIONS AVAILABLE",
        headline: "Inventory Management System Dubai | Real-Time Stock Control",
        subheading:
          "Eliminate stockouts and reduce inventory costs by 30%. Automated inventory tracking for retail, manufacturing, and distribution.",
        ctaText: "🚀 Book Free Inventory Assessment",
        ctaSubtext:
          "⏱️ 30-minute assessment • 💰 $0 cost • 🎯 Calculate your savings",
      };
    case "webapp":
      return {
        badge: "DUBAI",
        announcement: "💻 WEB APPLICATION PROJECTS AVAILABLE",
        headline:
          "Web Application Development Dubai | Scalable Business Solutions",
        subheading:
          "Build powerful web applications that drive growth. From customer portals to enterprise platforms.",
        ctaText: "🚀 Book Free Web App Consultation",
        ctaSubtext:
          "⏱️ 30-minute consultation • 💰 $0 cost • 🎯 Discuss your vision",
      };
    case "ai":
      return {
        badge: "DUBAI",
        announcement: "🤖 AI SOLUTIONS AVAILABLE",
        headline:
          "AI Development Services Dubai | Transform Business with Intelligence",
        subheading:
          "From chatbots to predictive analytics - we make AI practical and profitable for UAE businesses.",
        ctaText: "🚀 Book Free AI Strategy Call",
        ctaSubtext:
          "⏱️ 30-minute strategy call • 💰 $0 cost • 🎯 Explore AI opportunities",
      };
    default:
      return {
        badge: "HEY!",
        announcement: "🔥 3 SPOTS LEFT THIS WEEK",
        headline: "Deploy AI Into Your Business in 30 Days",
        subheading:
          "Stop paying $5K-$20K monthly for tools you don't own. Deploy custom AI solutions that eliminate recurring fees and automate your biggest challenges.",
        ctaText: "🚀 Book Free AI Strategy Call - Limited Spots",
        ctaSubtext:
          "⏱️ Only 3 spots left this week • 💰 $0 cost • 🎯 30-min discovery call",
      };
  }
}
