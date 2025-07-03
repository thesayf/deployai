import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { CaseStudyModal } from "./CaseStudyModal";

interface CaseStudiesProps {
  filter?: "all" | "software" | "automation" | "ai" | "webapp";
}

export const CaseStudies = ({ filter = "all" }: CaseStudiesProps) => {
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<CaseStudyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCaseStudies = getFilteredCaseStudies(filter);

  const handleCaseStudyClick = (caseStudy: CaseStudyData) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <section id="case-studies" className="bg-white py-32">
      <div className="mx-4 sm:mx-6 md:mx-36">
        <div className="rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-8 py-12 shadow-[0px_8px_0px_#18181b] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.3),inset_0px_2px_8px_rgba(0,0,0,0.4)] md:px-12 md:py-16 lg:px-16 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-4 text-7xl font-black text-zinc-900">
              Real Results. Real Impact
            </h2>
            <p className="mx-auto max-w-4xl text-2xl text-zinc-600">
              See how we've transformed operations for companies just like
              yours.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                {...caseStudy}
                onClick={() => handleCaseStudyClick(caseStudy)}
              />
            ))}
          </div>
        </div>
      </div>

      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
};

interface CaseStudyData {
  id: string;
  service: string;
  metric: string;
  subMetric: string;
  orderCount: string;
  description: string;
  bgUrl: string;
  company: string;
  industry: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  testimonial: string;
  testimonialAuthor: string;
  category: "software" | "automation" | "ai" | "webapp";
}

interface CaseStudyCardProps extends CaseStudyData {
  onClick: () => void;
}

const CaseStudyCard = ({
  service,
  metric,
  subMetric,
  orderCount,
  description,
  bgUrl,
  onClick,
}: CaseStudyCardProps) => {
  const isCustomMockup =
    bgUrl === "chatbot-mockup" || bgUrl === "centric-mockup";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-4 border-zinc-900 bg-zinc-100 shadow-[0px_6px_0px_#18181b] shadow-[inset_0px_3px_6px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0px_8px_0px_#18181b]"
    >
      {/* Custom Mockup or Background Image */}
      {isCustomMockup ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-black transition-all duration-500 group-hover:scale-110 group-hover:blur-sm">
          {/* Content zoomed in - no phone frame */}
          <div className="w-full">
            {bgUrl === "chatbot-mockup" ? (
              /* Screen Content - Use exact same component structure as modal */
              <div className="mx-auto h-[800px] w-full max-w-[500px] overflow-hidden bg-white shadow-2xl">
                {/* Browser URL Bar */}
                <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <div className="rounded border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600">
                      chat.jbluxedetailing.co.uk
                    </div>
                  </div>
                </div>

                {/* App Header */}
                <div className="flex items-center justify-between bg-black p-4 text-white">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logos/jblogo.png"
                      alt="JB Logo"
                      className="h-8 w-auto"
                    />
                    <div>
                      <div className="text-lg font-semibold">JB Luxe Chat</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
                      Online
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="pointer-events-none h-[440px] space-y-3 overflow-hidden bg-zinc-50 p-4">
                  {/* Welcome Message */}
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
                      <span className="text-xs font-bold text-yellow-600">
                        JB
                      </span>
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                      <p className="mb-2 text-sm text-zinc-800">
                        Welcome to JB Luxe Detailing! 🚗✨ We bring top-tier
                        mobile detailing to your location.
                      </p>
                      <p className="text-sm text-zinc-800">
                        To get started, could you tell me what type of vehicle
                        you'd like detailed?
                      </p>
                      <div className="mt-2 text-xs text-zinc-500">2:14 PM</div>
                    </div>
                  </div>

                  {/* Customer Response */}
                  <div className="flex justify-end gap-3">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white">
                      <p className="text-sm">
                        I have a 2023 Mercedes S-Class that needs detailing
                      </p>
                      <div className="mt-2 text-xs text-blue-100">2:15 PM</div>
                    </div>
                  </div>

                  {/* Bot Response with Services */}
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
                      <span className="text-xs font-bold text-yellow-600">
                        JB
                      </span>
                    </div>
                    <div className="max-w-[80%] space-y-2">
                      <div className="rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                        <p className="mb-3 text-sm text-zinc-800">
                          Excellent choice! For your Mercedes S-Class, I
                          recommend our premium packages. Here are your options:
                        </p>
                        <div className="space-y-2">
                          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-sm font-semibold">
                                  🌟 Gold Package
                                </div>
                                <div className="mt-1 text-xs text-zinc-600">
                                  Exterior wash, wax, tyre shine, interior
                                  vacuum
                                </div>
                                <div className="mt-1 text-xs text-green-600">
                                  ⏱️ 2-3 hours • Most Popular
                                </div>
                              </div>
                              <div className="font-bold text-yellow-600">
                                £85
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-sm font-semibold">
                                  💎 Luxe Package
                                </div>
                                <div className="mt-1 text-xs text-zinc-600">
                                  Complete detail, paint enhancement, interior
                                  deep clean
                                </div>
                                <div className="mt-1 text-xs text-blue-600">
                                  ⏱️ 4-5 hours • Premium Service
                                </div>
                              </div>
                              <div className="font-bold text-yellow-600">
                                £150
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-zinc-500">
                          2:15 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Footer */}
                <div className="border-t border-zinc-200 bg-white p-4">
                  <div className="text-center text-xs text-zinc-500">
                    Powered by deployAI
                  </div>
                </div>
              </div>
            ) : (
              /* Centric Research Platform Preview */
              <img
                src="/images/centric2.png"
                alt="Centric Proposal Generator"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}

      {/* Overlay that becomes visible on hover */}
      <div className="absolute inset-0 bg-white/95 opacity-0 transition-all duration-300 group-hover:opacity-100" />

      {/* Content - hidden by default, shown on hover */}
      <div className="relative flex h-full flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Top content */}
        <div>
          <div className="mb-3 inline-block rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            {service}
          </div>

          <h3 className="mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-3xl font-black leading-tight text-transparent">
            {metric} {subMetric}
          </h3>

          <p className="mb-4 text-sm text-zinc-600">{description}</p>
        </div>

        {/* Bottom content */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500">
            30-day delivery
          </span>

          {/* CTA Button with brand styling */}
          <button className="inline-flex items-center gap-1 rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[3px_3px_0px_#18181b]">
            See Case Study
            <FiArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CASE_STUDIES_DATA: CaseStudyData[] = [
  {
    id: "jb-luxury-detailing",
    service: "Custom CRM + AI Chatbot",
    metric: "300%",
    subMetric: "booking increase",
    orderCount: "24/7",
    description: "AI chatbot handles inquiries and books appointments 24/7",
    bgUrl: "chatbot-mockup", // Special identifier for our custom component
    company: "JB Luxury Mobile Detailing",
    industry: "Automotive Services",
    timeline: "3 weeks implementation",
    challenge:
      "Manual phone booking system was missing 60% of potential customers who called outside business hours. No customer relationship management led to missed follow-ups and repeat business opportunities.",
    solution:
      "Built intelligent chatbot integrated with custom CRM to handle bookings 24/7, qualify leads, provide instant quotes, and automatically schedule services based on availability and location.",
    results: [
      "300% increase in successful bookings",
      "24/7 availability captures after-hours customers",
      "85% of customer inquiries handled automatically",
      "Average response time reduced from 4 hours to 30 seconds",
      "40% increase in repeat customer bookings through automated follow-ups",
    ],
    techStack: [
      "React",
      "Node.js",
      "OpenAI GPT-4",
      "Stripe API",
      "Google Calendar API",
      "Twilio",
    ],
    testimonial:
      "This chatbot works better than having a full-time receptionist. It books appointments while I sleep and my customers love the instant responses. Revenue has tripled since deployment.",
    testimonialAuthor: "James Butler, Owner of JB Luxury Detailing",
    category: "software", // Add category for filtering
  },
  {
    id: "showcase-cinema-scheduling",
    service: "AI Cinema Scheduling",
    metric: "95%",
    subMetric: "time reduction",
    orderCount: "40+",
    description: "AI-powered scheduling platform automates cinema operations",
    bgUrl: "/schomee.png",
    company: "Showcase Cinemas",
    industry: "Entertainment & Media",
    timeline: "4 weeks implementation",
    challenge:
      "Manual scheduling process consumed 40+ hours weekly, frequently invalidated by real-time performance data. Critical Monday morning reschedules across multiple locations were impossible to execute effectively at scale.",
    solution:
      "Built intelligent scheduling platform powered by Anthropic AI that processes historical data, release projections, and real-time performance metrics to generate optimized schedules for all cinema locations in seconds.",
    results: [
      "95% reduction in scheduling time - from 40+ hours to under 2 hours",
      "18% increase in average revenue per screen through optimization",
      "Real-time adaptability - instant schedule regeneration",
      "100% data-driven decisions eliminate guesswork",
      "Multi-site scalability across all cinema locations",
      "Enhanced customer satisfaction through better film placement",
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Anthropic Claude API",
      "PostgreSQL",
      "AWS",
    ],
    testimonial:
      "The platform transformed our entire operation. What used to take our team a full week now happens automatically in minutes. The revenue optimization features alone paid for the system within the first month.",
    testimonialAuthor: "Sarah Johnson, Operations Director at Showcase Cinemas",
    category: "ai", // Add category for filtering
  },
  {
    id: "centric-research-platform",
    service: "AI Research Platform",
    metric: "15 min",
    subMetric: "proposal generation",
    orderCount: "£150K+",
    description:
      "Community research platform accelerates proposal creation and knowledge sharing",
    bgUrl: "centric-mockup", // Special identifier for our custom component
    company: "Centric",
    industry: "Community Research & Development",
    timeline: "5 weeks implementation",
    challenge:
      "Manual proposal creation process taking 3-4 weeks per submission, difficulty accessing and aggregating insights from 50+ past community engagement projects, and challenges ensuring authentic community voice integration in research proposals.",
    solution:
      "Built AI-powered research platform with intelligent knowledge base, automated proposal generation using proven templates, and collaborative review workspace ensuring community member participation in all research activities.",
    results: [
      "Proposal generation time reduced from 4 weeks to 15 minutes",
      "Instant access to 50+ past community project insights",
      "100% community voice integration through collaborative review",
      "£150K+ proposals generated with automated budget allocation",
      "Real-time collaboration between community and institutional partners",
    ],
    techStack: [
      "React",
      "Node.js",
      "OpenAI GPT-4",
      "PostgreSQL",
      "WebSockets",
      "Stripe API",
    ],
    testimonial:
      "The platform has transformed how we approach community research. What used to take weeks of manual work now happens in minutes, while ensuring authentic community participation throughout the entire process.",
    testimonialAuthor: "Dr. Sarah Williams, Research Director at Centric",
    category: "software", // Add category for filtering
  },
];

function getFilteredCaseStudies(
  filter: CaseStudiesProps["filter"]
): CaseStudyData[] {
  if (filter === "all") {
    return CASE_STUDIES_DATA;
  }

  return CASE_STUDIES_DATA.filter((caseStudy) => caseStudy.category === filter);
}
