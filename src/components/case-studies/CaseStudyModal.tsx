import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiTrendingUp, FiUsers } from "react-icons/fi";
import { ChatbotMockup } from "./ChatbotMockup";
import { JBCRMDashboard } from "./JBCRMDashboard";
import { JBBookingSystem } from "./JBBookingSystem";
import { CaseStudyScreenShell } from "./CaseStudyScreenShell";
import { CentricDashboardMockup } from "./CentricDashboardMockup";
import { CentricProposalMockup } from "./CentricProposalMockup";
import { CentricCollabMockup } from "./CentricCollabMockup";
import { ShowcaseImageViewer, showcaseScreens } from "./ShowcaseImageViewer";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: {
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
  } | null;
}

export const CaseStudyModal = ({
  isOpen,
  onClose,
  caseStudy,
}: CaseStudyModalProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  if (!caseStudy) return null;

  const isJBCaseStudy = caseStudy.id === "jb-luxury-detailing";
  const isGlobalShipCaseStudy = caseStudy.id === "automated-logistics";
  const isTechStartCaseStudy = caseStudy.id === "ai-customer-service";
  const isCentricCaseStudy = caseStudy.id === "centric-research-platform";
  const isShowcaseCaseStudy = caseStudy.id === "showcase-cinema-scheduling";

  const jbScreens = [
    { name: "AI Chatbot", component: <ChatbotMockup /> },
    { name: "CRM Dashboard", component: <JBCRMDashboard /> },
    { name: "Booking System", component: <JBBookingSystem /> },
  ];

  const globalShipScreens = [
    {
      name: "Control Dashboard",
      component: (
        <CaseStudyScreenShell
          url="control.globalship.com"
          headerBgColor="bg-blue-600"
          logoSrc="/logos/globalship-logo.png"
          appName="GlobalShip Control Center"
          statusText="Live Tracking"
          statusColor="bg-green-600"
          footerText="Logistics Control Platform"
          useFlexLayout={true}
        >
          <div className="flex flex-1 items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="mb-4 text-4xl">🚢</div>
              <div className="text-lg font-semibold text-zinc-700">
                Control Dashboard
              </div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      ),
    },
    {
      name: "Route Optimizer",
      component: (
        <CaseStudyScreenShell
          url="routes.globalship.com"
          headerBgColor="bg-blue-600"
          logoSrc="/logos/globalship-logo.png"
          appName="Route Optimizer"
          statusText="Optimizing"
          statusColor="bg-green-600"
          footerText="Route Optimization Platform"
          useFlexLayout={true}
        >
          <div className="flex flex-1 items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="mb-4 text-4xl">🗺️</div>
              <div className="text-lg font-semibold text-zinc-700">
                Route Optimization Engine
              </div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      ),
    },
  ];

  const techStartScreens = [
    {
      name: "AI Assistant",
      component: (
        <CaseStudyScreenShell
          url="support.techstart.io"
          headerBgColor="bg-indigo-600"
          logoSrc="/logos/techstart-logo.png"
          appName="TechStart AI Support"
          statusText="Online"
          statusColor="bg-green-500"
          footerText="Intelligent Support Platform"
          useFlexLayout={true}
        >
          <div className="flex flex-1 items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="mb-4 text-4xl">🤖</div>
              <div className="text-lg font-semibold text-zinc-700">
                AI Assistant Interface
              </div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      ),
    },
    {
      name: "Admin Dashboard",
      component: (
        <CaseStudyScreenShell
          url="admin.techstart.io"
          headerBgColor="bg-indigo-600"
          logoSrc="/logos/techstart-logo.png"
          appName="TechStart Admin Dashboard"
          statusText="Active"
          statusColor="bg-green-500"
          footerText="Admin Dashboard Platform"
          useFlexLayout={true}
        >
          <div className="flex flex-1 items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="mb-4 text-4xl">📊</div>
              <div className="text-lg font-semibold text-zinc-700">
                Ticket Dashboard
              </div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      ),
    },
  ];

  const centricScreens = [
    { name: "Partnership Dashboard", component: <CentricDashboardMockup /> },
    { name: "Proposal Generator", component: <CentricProposalMockup /> },
    { name: "Collaborative Review", component: <CentricCollabMockup /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden border-2 border-zinc-900 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b-2 border-zinc-900 bg-white p-6">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">
                  {caseStudy.service}
                </h2>
                <p className="text-sm text-zinc-600">
                  {caseStudy.company} • {caseStudy.industry}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border-2 border-zinc-900 bg-white p-2 shadow-[2px_2px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[3px_3px_0px_#18181b]"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid max-h-[calc(90vh-100px)] grid-cols-1 overflow-y-auto lg:grid-cols-2">
              {/* Left Column - Image & Metrics */}
              <div className="p-6">
                {isJBCaseStudy ||
                isGlobalShipCaseStudy ||
                isTechStartCaseStudy ||
                isCentricCaseStudy ? (
                  <div className="mb-6">
                    {/* Screen Navigation */}
                    <div className="mb-4 flex justify-center gap-2">
                      {(isJBCaseStudy
                        ? jbScreens
                        : isGlobalShipCaseStudy
                          ? globalShipScreens
                          : isTechStartCaseStudy
                            ? techStartScreens
                            : centricScreens
                      ).map((screen, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScreen(index)}
                          className={`rounded-full border-2 px-3 py-1 text-sm transition-all ${
                            currentScreen === index
                              ? isJBCaseStudy
                                ? "border-yellow-600 bg-yellow-600 text-white"
                                : isGlobalShipCaseStudy
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : isTechStartCaseStudy
                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                    : "border-purple-600 bg-purple-600 text-white"
                              : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500"
                          }`}
                        >
                          {screen.name}
                        </button>
                      ))}
                    </div>
                    {/* Screen Display */}
                    <div
                      className={`h-[450px] w-full overflow-hidden rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] ${
                        isCentricCaseStudy
                          ? "bg-white"
                          : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"
                      }`}
                    >
                      {isJBCaseStudy && (
                        <>
                          {currentScreen === 0 && (
                            <div className="w-full overflow-hidden rounded-lg bg-white">
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
                                    <div className="text-lg font-semibold">
                                      JB Luxe Chat
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
                                    Online
                                  </span>
                                </div>
                              </div>

                              {/* Chat Messages */}
                              <div className="pointer-events-none h-[400px] space-y-3 overflow-hidden bg-zinc-50 p-4">
                                {/* Welcome Message */}
                                <div className="flex gap-3">
                                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
                                    <span className="text-xs font-bold text-yellow-600">
                                      JB
                                    </span>
                                  </div>
                                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                                    <p className="mb-2 text-sm text-zinc-800">
                                      Welcome to JB Luxe Detailing! 🚗✨ We
                                      bring top-tier mobile detailing to your
                                      location.
                                    </p>
                                    <p className="text-sm text-zinc-800">
                                      To get started, could you tell me what
                                      type of vehicle you'd like detailed?
                                    </p>
                                    <div className="mt-2 text-xs text-zinc-500">
                                      2:14 PM
                                    </div>
                                  </div>
                                </div>

                                {/* Customer Response */}
                                <div className="flex justify-end gap-3">
                                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white">
                                    <p className="text-sm">
                                      I have a 2023 Mercedes S-Class that needs
                                      detailing
                                    </p>
                                    <div className="mt-2 text-xs text-blue-100">
                                      2:15 PM
                                    </div>
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
                                        Excellent choice! For your Mercedes
                                        S-Class, I recommend our premium
                                        packages. Here are your options:
                                      </p>
                                      <div className="space-y-2">
                                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <div className="text-sm font-semibold">
                                                🌟 Gold Package
                                              </div>
                                              <div className="mt-1 text-xs text-zinc-600">
                                                Exterior wash, wax, tyre shine,
                                                interior vacuum
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
                                                Complete detail, paint
                                                enhancement, interior deep clean
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

                                        <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 p-3">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <div className="text-sm font-semibold">
                                                👑 Paint Correction
                                              </div>
                                              <div className="mt-1 text-xs text-zinc-600">
                                                Multi-stage polish, swirl
                                                removal, ceramic coating
                                              </div>
                                              <div className="mt-1 text-xs text-green-600">
                                                ⏱️ 6-8 hours • Show Car Finish
                                              </div>
                                            </div>
                                            <div>
                                              <div className="text-xs text-zinc-500">
                                                From
                                              </div>
                                              <div className="font-bold text-yellow-600">
                                                £250
                                              </div>
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

                                {/* Customer Selection */}
                                <div className="flex justify-end gap-3">
                                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white">
                                    <p className="text-sm">
                                      I'd like the Luxe Package please
                                    </p>
                                    <div className="mt-2 text-xs text-blue-100">
                                      2:16 PM
                                    </div>
                                  </div>
                                </div>

                                {/* Bot Confirmation & Scheduling */}
                                <div className="flex gap-3">
                                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
                                    <span className="text-xs font-bold text-yellow-600">
                                      JB
                                    </span>
                                  </div>
                                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                                    <p className="mb-3 text-sm text-zinc-800">
                                      Perfect choice! The Luxe Package (£150)
                                      includes complete detailing for your
                                      S-Class.
                                    </p>
                                    <p className="mb-3 text-sm text-zinc-800">
                                      Now let's schedule your appointment. I
                                      have availability:
                                    </p>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between rounded border border-green-200 bg-green-50 p-2">
                                        <span className="text-sm">
                                          Tomorrow (Wed) - 10:00 AM
                                        </span>
                                        <span className="text-xs font-semibold text-green-600">
                                          Available
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between rounded border border-green-200 bg-green-50 p-2">
                                        <span className="text-sm">
                                          Thursday - 2:00 PM
                                        </span>
                                        <span className="text-xs font-semibold text-green-600">
                                          Available
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between rounded border border-yellow-200 bg-yellow-50 p-2">
                                        <span className="text-sm">
                                          Friday - 9:00 AM
                                        </span>
                                        <span className="text-xs font-semibold text-orange-600">
                                          Last Slot
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-2 text-xs text-zinc-500">
                                      2:16 PM
                                    </div>
                                  </div>
                                </div>

                                {/* Customer Response */}
                                <div className="flex justify-end gap-3">
                                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white">
                                    <p className="text-sm">
                                      Thursday at 2 PM works perfect!
                                    </p>
                                    <div className="mt-2 text-xs text-blue-100">
                                      2:17 PM
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Chat Input */}
                              <div className="border-t border-zinc-200 bg-white p-3">
                                <div className="flex gap-2">
                                  <div className="flex-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-400">
                                    Type your message...
                                  </div>
                                  <div className="pointer-events-none rounded-full bg-yellow-600 p-2 text-black">
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="mt-2 text-center text-xs text-zinc-500">
                                  Powered by deployAI • Average booking time: 3
                                  minutes
                                </div>
                              </div>
                            </div>
                          )}
                          {currentScreen === 1 && (
                            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white">
                              {/* Desktop Monitor Frame */}
                              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-3">
                                <div className="flex gap-1">
                                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex flex-1 justify-center">
                                  <div className="rounded border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600">
                                    admin.jbluxedetailing.co.uk/dashboard
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
                                    <div className="text-lg font-semibold">
                                      JB Luxe Dashboard
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
                                    Online
                                  </span>
                                </div>
                              </div>

                              {/* Dashboard Content */}
                              <div className="pointer-events-none grid flex-1 grid-cols-12 gap-3 overflow-hidden bg-zinc-50 p-3">
                                {/* Left Sidebar */}
                                <div className="col-span-4 space-y-3">
                                  <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                    <h4 className="mb-2 text-sm font-semibold">
                                      Today's Overview
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          New Bookings
                                        </span>
                                        <span className="font-bold text-green-600">
                                          12
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Completed
                                        </span>
                                        <span className="font-bold text-blue-600">
                                          8
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Revenue
                                        </span>
                                        <span className="font-bold text-yellow-600">
                                          £2,350
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                    <h4 className="mb-2 text-sm font-semibold">
                                      Upcoming Bookings
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Today
                                        </span>
                                        <span className="font-bold text-orange-600">
                                          3
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Tomorrow
                                        </span>
                                        <span className="font-bold text-blue-600">
                                          5
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          This Week
                                        </span>
                                        <span className="font-bold text-green-600">
                                          18
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                    <h4 className="mb-2 text-sm font-semibold">
                                      Job Values
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Avg Job Value
                                        </span>
                                        <span className="font-bold text-yellow-600">
                                          £142
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          Highest Value
                                        </span>
                                        <span className="font-bold text-green-600">
                                          £350
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-zinc-600">
                                          This Month
                                        </span>
                                        <span className="font-bold text-blue-600">
                                          £4,280
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="col-span-8 space-y-3">
                                  {/* Recent Bookings */}
                                  <div className="rounded-lg border border-zinc-200 bg-white shadow-sm">
                                    <div className="flex items-center justify-between border-b border-zinc-200 p-2">
                                      <h4 className="text-sm font-semibold">
                                        Recent Bookings
                                      </h4>
                                      <span className="text-xs text-zinc-500">
                                        Last 24 hours
                                      </span>
                                    </div>
                                    <div className="p-2">
                                      <div className="space-y-2">
                                        {/* Booking Row 1 */}
                                        <div className="flex items-center justify-between rounded border border-green-200 bg-green-50 p-2">
                                          <div className="flex items-center gap-2">
                                            <div className="h-1 w-1 rounded-full bg-green-500"></div>
                                            <div>
                                              <p className="text-xs font-semibold">
                                                Marcus Johnson - 2023 BMW X7
                                              </p>
                                              <p className="text-xs text-zinc-600">
                                                Luxe Package • £150
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-xs font-semibold text-green-600">
                                              Completed
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                              2:30 PM
                                            </p>
                                          </div>
                                        </div>

                                        {/* Booking Row 2 */}
                                        <div className="flex items-center justify-between rounded border border-blue-200 bg-blue-50 p-2">
                                          <div className="flex items-center gap-2">
                                            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                                            <div>
                                              <p className="text-xs font-semibold">
                                                Sarah Martinez - 2024 Tesla
                                                Model S
                                              </p>
                                              <p className="text-xs text-zinc-600">
                                                Paint Correction • £280
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-xs font-semibold text-blue-600">
                                              In Progress
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                              4:00 PM
                                            </p>
                                          </div>
                                        </div>

                                        {/* Booking Row 3 */}
                                        <div className="flex items-center justify-between rounded border border-yellow-200 bg-yellow-50 p-2">
                                          <div className="flex items-center gap-2">
                                            <div className="h-1 w-1 rounded-full bg-yellow-500"></div>
                                            <div>
                                              <p className="text-xs font-semibold">
                                                David Chen - 2023 Mercedes
                                                S-Class
                                              </p>
                                              <p className="text-xs text-zinc-600">
                                                Gold Package • £85
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-xs font-semibold text-yellow-600">
                                              Scheduled
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                              Tomorrow 10:00 AM
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Analytics Charts */}
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
                                      <h4 className="mb-2 text-xs font-semibold">
                                        Weekly Revenue
                                      </h4>
                                      <div className="flex h-16 items-end gap-1">
                                        <div className="h-8 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-10 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-6 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-12 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-16 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-14 w-3 rounded-t bg-yellow-600"></div>
                                        <div className="h-16 w-3 animate-pulse rounded-t bg-green-500"></div>
                                      </div>
                                      <p className="mt-1 text-xs text-zinc-500">
                                        Mon - Sun
                                      </p>
                                    </div>

                                    <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
                                      <h4 className="mb-2 text-xs font-semibold">
                                        Customer Satisfaction
                                      </h4>
                                      <div className="flex h-16 items-center justify-center">
                                        <div className="relative h-12 w-12">
                                          <div className="absolute inset-0 rounded-full border-4 border-zinc-200"></div>
                                          <div className="absolute inset-0 rotate-45 transform rounded-full border-4 border-green-500 border-t-transparent"></div>
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold text-green-600">
                                              4.9
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <p className="text-center text-xs text-zinc-500">
                                        Average Rating
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Powered by footer */}
                              <div className="border-t border-zinc-200 bg-white p-4 text-center">
                                <p className="text-xs text-zinc-500">
                                  Powered by deployAI • Custom CRM Platform
                                </p>
                              </div>
                            </div>
                          )}
                          {currentScreen === 2 && (
                            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white">
                              {/* Browser URL Bar */}
                              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-3">
                                <div className="flex gap-1">
                                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex flex-1 justify-center">
                                  <div className="rounded border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600">
                                    book.jbluxedetailing.co.uk
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
                                    <div className="text-lg font-semibold">
                                      JB Luxe Booking
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
                                    Online
                                  </span>
                                </div>
                              </div>

                              {/* Booking Interface */}
                              <div className="pointer-events-none flex-1 space-y-3 overflow-hidden bg-zinc-50 p-3">
                                {/* Vehicle Selection */}
                                <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                  <h4 className="mb-2 flex items-center gap-1 text-sm font-bold">
                                    🚗 Vehicle Information
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="mb-1 block text-xs font-semibold text-zinc-700">
                                        Vehicle Type
                                      </label>
                                      <div className="w-full rounded border border-zinc-300 bg-white p-2 text-xs">
                                        2023 Mercedes S-Class
                                      </div>
                                    </div>
                                    <div>
                                      <label className="mb-1 block text-xs font-semibold text-zinc-700">
                                        Color
                                      </label>
                                      <div className="w-full rounded border border-zinc-300 bg-white p-2 text-xs">
                                        Obsidian Black
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Service Selection */}
                                <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                  <h4 className="mb-2 flex items-center gap-1 text-sm font-bold">
                                    ✨ Service Packages
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-2">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h5 className="text-sm font-bold">
                                            Luxe Package
                                          </h5>
                                          <p className="text-xs text-zinc-600">
                                            Complete detail, paint enhancement,
                                            interior deep clean
                                          </p>
                                          <div className="mt-1 flex items-center gap-1">
                                            <span className="rounded-full bg-green-100 px-1 py-0.5 text-xs text-green-800">
                                              Most Popular
                                            </span>
                                            <span className="text-xs text-zinc-500">
                                              ⏱️ 4-5 hours
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-lg font-bold text-yellow-600">
                                            £150
                                          </span>
                                          <div className="ml-auto mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-600">
                                            <span className="text-xs text-white">
                                              ✓
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="rounded-lg border border-zinc-300 bg-white p-2 opacity-60">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h5 className="text-sm font-bold">
                                            Gold Package
                                          </h5>
                                          <p className="text-xs text-zinc-600">
                                            Exterior wash, wax, tyre shine,
                                            interior vacuum
                                          </p>
                                        </div>
                                        <span className="text-lg font-bold text-zinc-600">
                                          £85
                                        </span>
                                      </div>
                                    </div>

                                    <div className="rounded-lg border border-zinc-300 bg-white p-2 opacity-60">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h5 className="text-sm font-bold">
                                            Paint Correction
                                          </h5>
                                          <p className="text-xs text-zinc-600">
                                            Multi-stage polish, swirl removal,
                                            ceramic coating
                                          </p>
                                        </div>
                                        <span className="text-lg font-bold text-zinc-600">
                                          £250+
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Date & Time Selection */}
                                <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                  <h4 className="mb-2 flex items-center gap-1 text-sm font-bold">
                                    📅 Schedule Service
                                  </h4>
                                  <div className="mb-2 grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="mb-1 block text-xs font-semibold text-zinc-700">
                                        Preferred Date
                                      </label>
                                      <div className="w-full rounded border border-zinc-300 bg-white p-2 text-xs">
                                        2024-06-20
                                      </div>
                                    </div>
                                    <div>
                                      <label className="mb-1 block text-xs font-semibold text-zinc-700">
                                        Time Slot
                                      </label>
                                      <div className="w-full rounded border border-zinc-300 bg-white p-2 text-xs">
                                        9:00 AM - 1:00 PM
                                      </div>
                                    </div>
                                  </div>

                                  {/* Location */}
                                  <div className="mb-2">
                                    <label className="mb-1 block text-xs font-semibold text-zinc-700">
                                      Service Location
                                    </label>
                                    <div className="flex gap-1">
                                      <div className="flex-1 rounded border border-zinc-300 bg-white p-2 text-xs">
                                        15 Maple Street, Birmingham, B12 9QR
                                      </div>
                                      <div className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                                        📍
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Customer Info */}
                                <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
                                  <h4 className="mb-2 flex items-center gap-1 text-sm font-bold">
                                    👤 Contact Information
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded border border-zinc-300 bg-white p-2 text-xs">
                                      Marcus Johnson
                                    </div>
                                    <div className="rounded border border-zinc-300 bg-white p-2 text-xs">
                                      +44 7563 027260
                                    </div>
                                  </div>
                                </div>

                                {/* Booking Summary & CTA */}
                                <div className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-700 p-3 text-white shadow-lg">
                                  <div className="mb-2 flex items-center justify-between">
                                    <h4 className="text-sm font-bold">
                                      Booking Summary
                                    </h4>
                                    <div className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                                      Available
                                    </div>
                                  </div>
                                  <div className="mb-3 space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span>Luxe Package</span>
                                      <span>£150.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Service Date</span>
                                      <span>June 20, 2024</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Time Slot</span>
                                      <span>9:00 AM - 1:00 PM</span>
                                    </div>
                                    <div className="flex justify-between border-t border-yellow-500 pt-1 text-sm font-bold">
                                      <span>Total</span>
                                      <span>£150.00</span>
                                    </div>
                                  </div>
                                  <div className="w-full rounded-lg bg-black py-2 text-center text-sm font-bold text-white">
                                    Confirm Booking & Pay
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Footer */}
                              <div className="border-t border-zinc-200 bg-white p-4 text-center">
                                <p className="text-xs text-zinc-500">
                                  Powered by deployAI • Booking Management
                                  Platform
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {isGlobalShipCaseStudy &&
                        globalShipScreens[currentScreen]?.component}
                      {isTechStartCaseStudy &&
                        techStartScreens[currentScreen]?.component}
                      {isCentricCaseStudy &&
                        centricScreens[currentScreen]?.component}
                    </div>
                  </div>
                ) : isShowcaseCaseStudy ? (
                  <div className="mb-6">
                    <ShowcaseImageViewer
                      currentScreen={currentScreen}
                      setCurrentScreen={setCurrentScreen}
                    />
                  </div>
                ) : (
                  <div
                    className="mb-6 h-64 w-full rounded-2xl border-2 border-zinc-900 bg-cover bg-center shadow-[4px_4px_0px_#18181b]"
                    style={{ backgroundImage: `url(${caseStudy.bgUrl})` }}
                  />
                )}

                {/* Key Metrics */}
                <div className="mb-6 rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">
                    Key Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="mb-1 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-black text-transparent">
                        {caseStudy.metric}
                      </div>
                      <div className="text-sm text-zinc-600">
                        {caseStudy.subMetric}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-black text-zinc-900">
                        {caseStudy.orderCount}
                      </div>
                      <div className="text-sm text-zinc-600">
                        Orders Automated
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 shadow-[4px_4px_0px_#18181b]">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-orange-500" />
                    <span className="font-bold text-zinc-900">Timeline:</span>
                    <span className="text-zinc-600">{caseStudy.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="border-l-2 border-zinc-900 p-6">
                {/* Challenge */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">
                    The Challenge
                  </h3>
                  <p className="text-zinc-700">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">
                    Our Solution
                  </h3>
                  <p className="text-zinc-700">{caseStudy.solution}</p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">
                    Results Achieved
                  </h3>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiTrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="text-zinc-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="rounded-2xl border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-[4px_4px_0px_#18181b]">
                  <FiUsers className="mb-3 h-6 w-6" />
                  <blockquote className="mb-3 text-sm italic">
                    "{caseStudy.testimonial}"
                  </blockquote>
                  <cite className="text-xs text-orange-100">
                    — {caseStudy.testimonialAuthor}
                  </cite>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
