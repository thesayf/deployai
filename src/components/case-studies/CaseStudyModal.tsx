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

export const CaseStudyModal = ({ isOpen, onClose, caseStudy }: CaseStudyModalProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  if (!caseStudy) return null;
  
  const isJBCaseStudy = caseStudy.id === "jb-luxury-detailing";
  const isGlobalShipCaseStudy = caseStudy.id === "automated-logistics";
  const isTechStartCaseStudy = caseStudy.id === "ai-customer-service";
  const isCentricCaseStudy = caseStudy.id === "centric-research-platform";
  
  const jbScreens = [
    { name: "AI Chatbot", component: <ChatbotMockup /> },
    { name: "CRM Dashboard", component: <JBCRMDashboard /> },
    { name: "Booking System", component: <JBBookingSystem /> }
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
          <div className="flex-1 flex items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="text-4xl mb-4">🚢</div>
              <div className="text-lg font-semibold text-zinc-700">Control Dashboard</div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      )
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
          <div className="flex-1 flex items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <div className="text-lg font-semibold text-zinc-700">Route Optimization Engine</div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      )
    }
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
          <div className="flex-1 flex items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <div className="text-lg font-semibold text-zinc-700">AI Assistant Interface</div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      )
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
          <div className="flex-1 flex items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-lg font-semibold text-zinc-700">Ticket Dashboard</div>
              <div className="text-sm text-zinc-500">Coming Soon</div>
            </div>
          </div>
        </CaseStudyScreenShell>
      )
    }
  ];

  const centricScreens = [
    { name: "Partnership Dashboard", component: <CentricDashboardMockup /> },
    { name: "Proposal Generator", component: <CentricProposalMockup /> },
    { name: "Collaborative Review", component: <CentricCollabMockup /> }
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
              stiffness: 300
            }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden border-2 border-zinc-900 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b-2 border-zinc-900 bg-white p-6">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">{caseStudy.service}</h2>
                <p className="text-sm text-zinc-600">{caseStudy.company} • {caseStudy.industry}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border-2 border-zinc-900 bg-white p-2 shadow-[2px_2px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[3px_3px_0px_#18181b]"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[calc(90vh-100px)] overflow-y-auto">
              {/* Left Column - Image & Metrics */}
              <div className="p-6">
                {(isJBCaseStudy || isGlobalShipCaseStudy || isTechStartCaseStudy || isCentricCaseStudy) ? (
                  <div className="mb-6">
                    {/* Screen Navigation */}
                    <div className="mb-4 flex gap-2 justify-center">
                      {(isJBCaseStudy ? jbScreens : isGlobalShipCaseStudy ? globalShipScreens : isTechStartCaseStudy ? techStartScreens : centricScreens).map((screen, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScreen(index)}
                          className={`px-3 py-1 text-sm rounded-full border-2 transition-all ${
                            currentScreen === index
                              ? (isJBCaseStudy ? "border-yellow-600 bg-yellow-600 text-white" : 
                                 isGlobalShipCaseStudy ? "border-blue-600 bg-blue-600 text-white" :
                                 isTechStartCaseStudy ? "border-indigo-600 bg-indigo-600 text-white" :
                                 "border-purple-600 bg-purple-600 text-white")
                              : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500"
                          }`}
                        >
                          {screen.name}
                        </button>
                      ))}
                    </div>
                    {/* Screen Display */}
                    <div className={`h-[450px] w-full rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] overflow-hidden ${
                      isCentricCaseStudy ? "bg-white" : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"
                    }`}>
                      {isJBCaseStudy && (
                        <>
                          {currentScreen === 0 && (
                            <div className="w-full bg-white rounded-lg overflow-hidden">
                              {/* Browser URL Bar */}
                              <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                  <div className="bg-white rounded px-3 py-1 text-xs text-zinc-600 border border-zinc-300">
                                    chat.jbluxedetailing.co.uk
                                  </div>
                                </div>
                              </div>
                              
                              {/* App Header */}
                              <div className="bg-black text-white p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <img src="/logos/jblogo.png" alt="JB Logo" className="h-8 w-auto" />
                                  <div>
                                    <div className="font-semibold text-lg">JB Luxe Chat</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Online</span>
                                </div>
                              </div>
                              
                              {/* Chat Messages */}
                              <div className="h-[400px] overflow-hidden p-4 space-y-3 bg-zinc-50 pointer-events-none">
                                {/* Welcome Message */}
                                <div className="flex gap-3">
                                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-yellow-600 text-xs font-bold">JB</span>
                                  </div>
                                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
                                    <p className="text-sm text-zinc-800 mb-2">
                                      Welcome to JB Luxe Detailing! 🚗✨ We bring top-tier mobile detailing to your location.
                                    </p>
                                    <p className="text-sm text-zinc-800">
                                      To get started, could you tell me what type of vehicle you'd like detailed?
                                    </p>
                                    <div className="text-xs text-zinc-500 mt-2">2:14 PM</div>
                                  </div>
                                </div>

                                {/* Customer Response */}
                                <div className="flex gap-3 justify-end">
                                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                                    <p className="text-sm">I have a 2023 Mercedes S-Class that needs detailing</p>
                                    <div className="text-xs text-blue-100 mt-2">2:15 PM</div>
                                  </div>
                                </div>

                                {/* Bot Response with Services */}
                                <div className="flex gap-3">
                                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-yellow-600 text-xs font-bold">JB</span>
                                  </div>
                                  <div className="space-y-2 max-w-[80%]">
                                    <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm">
                                      <p className="text-sm text-zinc-800 mb-3">
                                        Excellent choice! For your Mercedes S-Class, I recommend our premium packages. 
                                        Here are your options:
                                      </p>
                                      <div className="space-y-2">
                                        <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <div className="font-semibold text-sm">🌟 Gold Package</div>
                                              <div className="text-xs text-zinc-600 mt-1">
                                                Exterior wash, wax, tyre shine, interior vacuum
                                              </div>
                                              <div className="text-xs text-green-600 mt-1">⏱️ 2-3 hours • Most Popular</div>
                                            </div>
                                            <div className="font-bold text-yellow-600">£85</div>
                                          </div>
                                        </div>
                                        
                                        <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <div className="font-semibold text-sm">💎 Luxe Package</div>
                                              <div className="text-xs text-zinc-600 mt-1">
                                                Complete detail, paint enhancement, interior deep clean
                                              </div>
                                              <div className="text-xs text-blue-600 mt-1">⏱️ 4-5 hours • Premium Service</div>
                                            </div>
                                            <div className="font-bold text-yellow-600">£150</div>
                                          </div>
                                        </div>
                                        
                                        <div className="border-2 border-yellow-500 rounded-lg p-3 bg-yellow-50">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <div className="font-semibold text-sm">👑 Paint Correction</div>
                                              <div className="text-xs text-zinc-600 mt-1">
                                                Multi-stage polish, swirl removal, ceramic coating
                                              </div>
                                              <div className="text-xs text-green-600 mt-1">⏱️ 6-8 hours • Show Car Finish</div>
                                            </div>
                                            <div>
                                              <div className="text-xs text-zinc-500">From</div>
                                              <div className="font-bold text-yellow-600">£250</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-xs text-zinc-500 mt-2">2:15 PM</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Customer Selection */}
                                <div className="flex gap-3 justify-end">
                                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                                    <p className="text-sm">I'd like the Luxe Package please</p>
                                    <div className="text-xs text-blue-100 mt-2">2:16 PM</div>
                                  </div>
                                </div>

                                {/* Bot Confirmation & Scheduling */}
                                <div className="flex gap-3">
                                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-yellow-600 text-xs font-bold">JB</span>
                                  </div>
                                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
                                    <p className="text-sm text-zinc-800 mb-3">
                                      Perfect choice! The Luxe Package (£150) includes complete detailing for your S-Class.
                                    </p>
                                    <p className="text-sm text-zinc-800 mb-3">
                                      Now let's schedule your appointment. I have availability:
                                    </p>
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded p-2">
                                        <span className="text-sm">Tomorrow (Wed) - 10:00 AM</span>
                                        <span className="text-xs text-green-600 font-semibold">Available</span>
                                      </div>
                                      <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded p-2">
                                        <span className="text-sm">Thursday - 2:00 PM</span>
                                        <span className="text-xs text-green-600 font-semibold">Available</span>
                                      </div>
                                      <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 rounded p-2">
                                        <span className="text-sm">Friday - 9:00 AM</span>
                                        <span className="text-xs text-orange-600 font-semibold">Last Slot</span>
                                      </div>
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-2">2:16 PM</div>
                                  </div>
                                </div>

                                {/* Customer Response */}
                                <div className="flex gap-3 justify-end">
                                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                                    <p className="text-sm">Thursday at 2 PM works perfect!</p>
                                    <div className="text-xs text-blue-100 mt-2">2:17 PM</div>
                                  </div>
                                </div>
                              </div>

                              {/* Chat Input */}
                              <div className="border-t border-zinc-200 p-3 bg-white">
                                <div className="flex gap-2">
                                  <div className="flex-1 bg-zinc-100 rounded-full px-4 py-2 text-sm text-zinc-400">
                                    Type your message...
                                  </div>
                                  <div className="bg-yellow-600 text-black rounded-full p-2 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="text-xs text-zinc-500 text-center mt-2">
                                  Powered by deployAI • Average booking time: 3 minutes
                                </div>
                              </div>
                            </div>
                          )}
                          {currentScreen === 1 && (
                            <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
                              {/* Desktop Monitor Frame */}
                              <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                  <div className="bg-white rounded px-3 py-1 text-xs text-zinc-600 border border-zinc-300">
                                    admin.jbluxedetailing.co.uk/dashboard
                                  </div>
                                </div>
                              </div>
                              
                              {/* App Header */}
                              <div className="bg-black text-white p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <img src="/logos/jblogo.png" alt="JB Logo" className="h-8 w-auto" />
                                  <div>
                                    <div className="font-semibold text-lg">JB Luxe Dashboard</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Online</span>
                                </div>
                              </div>
                              
                              {/* Dashboard Content */}
                              <div className="flex-1 p-3 grid grid-cols-12 gap-3 overflow-hidden pointer-events-none bg-zinc-50">
                                  {/* Left Sidebar */}
                                  <div className="col-span-4 space-y-3">
                                    <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                      <h4 className="font-semibold mb-2 text-sm">Today's Overview</h4>
                                      <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">New Bookings</span>
                                          <span className="font-bold text-green-600">12</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Completed</span>
                                          <span className="font-bold text-blue-600">8</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Revenue</span>
                                          <span className="font-bold text-yellow-600">£2,350</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                      <h4 className="font-semibold mb-2 text-sm">Upcoming Bookings</h4>
                                      <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Today</span>
                                          <span className="font-bold text-orange-600">3</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Tomorrow</span>
                                          <span className="font-bold text-blue-600">5</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">This Week</span>
                                          <span className="font-bold text-green-600">18</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                      <h4 className="font-semibold mb-2 text-sm">Job Values</h4>
                                      <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Avg Job Value</span>
                                          <span className="font-bold text-yellow-600">£142</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">Highest Value</span>
                                          <span className="font-bold text-green-600">£350</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-zinc-600">This Month</span>
                                          <span className="font-bold text-blue-600">£4,280</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Main Content Area */}
                                  <div className="col-span-8 space-y-3">
                                    {/* Recent Bookings */}
                                    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
                                      <div className="p-2 border-b border-zinc-200 flex justify-between items-center">
                                        <h4 className="font-semibold text-sm">Recent Bookings</h4>
                                        <span className="text-xs text-zinc-500">Last 24 hours</span>
                                      </div>
                                      <div className="p-2">
                                        <div className="space-y-2">
                                          {/* Booking Row 1 */}
                                          <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                                            <div className="flex items-center gap-2">
                                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                              <div>
                                                <p className="font-semibold text-xs">Marcus Johnson - 2023 BMW X7</p>
                                                <p className="text-xs text-zinc-600">Luxe Package • £150</p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <p className="text-xs font-semibold text-green-600">Completed</p>
                                              <p className="text-xs text-zinc-500">2:30 PM</p>
                                            </div>
                                          </div>
                                          
                                          {/* Booking Row 2 */}
                                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                                            <div className="flex items-center gap-2">
                                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                              <div>
                                                <p className="font-semibold text-xs">Sarah Martinez - 2024 Tesla Model S</p>
                                                <p className="text-xs text-zinc-600">Paint Correction • £280</p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <p className="text-xs font-semibold text-blue-600">In Progress</p>
                                              <p className="text-xs text-zinc-500">4:00 PM</p>
                                            </div>
                                          </div>
                                          
                                          {/* Booking Row 3 */}
                                          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                                            <div className="flex items-center gap-2">
                                              <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                                              <div>
                                                <p className="font-semibold text-xs">David Chen - 2023 Mercedes S-Class</p>
                                                <p className="text-xs text-zinc-600">Gold Package • £85</p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <p className="text-xs font-semibold text-yellow-600">Scheduled</p>
                                              <p className="text-xs text-zinc-500">Tomorrow 10:00 AM</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Analytics Charts */}
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-2">
                                        <h4 className="font-semibold mb-2 text-xs">Weekly Revenue</h4>
                                        <div className="flex items-end gap-1 h-16">
                                          <div className="bg-yellow-600 w-3 h-8 rounded-t"></div>
                                          <div className="bg-yellow-600 w-3 h-10 rounded-t"></div>
                                          <div className="bg-yellow-600 w-3 h-6 rounded-t"></div>
                                          <div className="bg-yellow-600 w-3 h-12 rounded-t"></div>
                                          <div className="bg-yellow-600 w-3 h-16 rounded-t"></div>
                                          <div className="bg-yellow-600 w-3 h-14 rounded-t"></div>
                                          <div className="bg-green-500 w-3 h-16 rounded-t animate-pulse"></div>
                                        </div>
                                        <p className="text-xs text-zinc-500 mt-1">Mon - Sun</p>
                                      </div>
                                      
                                      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-2">
                                        <h4 className="font-semibold mb-2 text-xs">Customer Satisfaction</h4>
                                        <div className="flex items-center justify-center h-16">
                                          <div className="relative w-12 h-12">
                                            <div className="absolute inset-0 rounded-full border-4 border-zinc-200"></div>
                                            <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent transform rotate-45"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                              <span className="text-sm font-bold text-green-600">4.9</span>
                                            </div>
                                          </div>
                                        </div>
                                        <p className="text-xs text-zinc-500 text-center">Average Rating</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                              {/* Powered by footer */}
                              <div className="border-t border-zinc-200 p-4 bg-white text-center">
                                <p className="text-xs text-zinc-500">
                                  Powered by deployAI • Custom CRM Platform
                                </p>
                              </div>
                            </div>
                          )}
                          {currentScreen === 2 && (
                            <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
                              {/* Browser URL Bar */}
                              <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                  <div className="bg-white rounded px-3 py-1 text-xs text-zinc-600 border border-zinc-300">
                                    book.jbluxedetailing.co.uk
                                  </div>
                                </div>
                              </div>
                              
                              {/* App Header */}
                              <div className="bg-black text-white p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <img src="/logos/jblogo.png" alt="JB Logo" className="h-8 w-auto" />
                                  <div>
                                    <div className="font-semibold text-lg">JB Luxe Booking</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Online</span>
                                </div>
                              </div>
                              
                              {/* Booking Interface */}
                              <div className="flex-1 p-3 space-y-3 bg-zinc-50 overflow-hidden pointer-events-none">
                                      {/* Vehicle Selection */}
                                      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                                          🚗 Vehicle Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Vehicle Type</label>
                                            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
                                              2023 Mercedes S-Class
                                            </div>
                                          </div>
                                          <div>
                                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Color</label>
                                            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
                                              Obsidian Black
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Service Selection */}
                                      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                                          ✨ Service Packages
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="p-2 border-2 border-yellow-400 bg-yellow-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h5 className="font-bold text-sm">Luxe Package</h5>
                                                <p className="text-xs text-zinc-600">Complete detail, paint enhancement, interior deep clean</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                  <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-full">Most Popular</span>
                                                  <span className="text-xs text-zinc-500">⏱️ 4-5 hours</span>
                                                </div>
                                              </div>
                                              <div className="text-right">
                                                <span className="text-lg font-bold text-yellow-600">£150</span>
                                                <div className="w-4 h-4 bg-yellow-600 rounded-full flex items-center justify-center ml-auto mt-1">
                                                  <span className="text-white text-xs">✓</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="p-2 border border-zinc-300 bg-white rounded-lg opacity-60">
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h5 className="font-bold text-sm">Gold Package</h5>
                                                <p className="text-xs text-zinc-600">Exterior wash, wax, tyre shine, interior vacuum</p>
                                              </div>
                                              <span className="text-lg font-bold text-zinc-600">£85</span>
                                            </div>
                                          </div>
                                          
                                          <div className="p-2 border border-zinc-300 bg-white rounded-lg opacity-60">
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h5 className="font-bold text-sm">Paint Correction</h5>
                                                <p className="text-xs text-zinc-600">Multi-stage polish, swirl removal, ceramic coating</p>
                                              </div>
                                              <span className="text-lg font-bold text-zinc-600">£250+</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Date & Time Selection */}
                                      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                                          📅 Schedule Service
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                          <div>
                                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Preferred Date</label>
                                            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
                                              2024-06-20
                                            </div>
                                          </div>
                                          <div>
                                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Time Slot</label>
                                            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
                                              9:00 AM - 1:00 PM
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Location */}
                                        <div className="mb-2">
                                          <label className="block text-xs font-semibold text-zinc-700 mb-1">Service Location</label>
                                          <div className="flex gap-1">
                                            <div className="flex-1 p-2 border border-zinc-300 rounded text-xs bg-white">
                                              15 Maple Street, Birmingham, B12 9QR
                                            </div>
                                            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                                              📍
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Customer Info */}
                                      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                                          👤 Contact Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="p-2 border border-zinc-300 rounded text-xs bg-white">
                                            Marcus Johnson
                                          </div>
                                          <div className="p-2 border border-zinc-300 rounded text-xs bg-white">
                                            +44 7563 027260
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Booking Summary & CTA */}
                                      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg p-3 shadow-lg">
                                        <div className="flex justify-between items-center mb-2">
                                          <h4 className="font-bold text-sm">Booking Summary</h4>
                                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                                            Available
                                          </div>
                                        </div>
                                        <div className="space-y-1 mb-3 text-xs">
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
                                          <div className="border-t border-yellow-500 pt-1 flex justify-between font-bold text-sm">
                                            <span>Total</span>
                                            <span>£150.00</span>
                                          </div>
                                        </div>
                                        <div className="w-full bg-black text-white py-2 rounded-lg font-bold text-sm text-center">
                                          Confirm Booking & Pay
                                        </div>
                                      </div>
                              </div>
                              
                              {/* Bottom Footer */}
                              <div className="border-t border-zinc-200 p-4 bg-white text-center">
                                <p className="text-xs text-zinc-500">
                                  Powered by deployAI • Booking Management Platform
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {isGlobalShipCaseStudy && globalShipScreens[currentScreen]?.component}
                      {isTechStartCaseStudy && techStartScreens[currentScreen]?.component}
                      {isCentricCaseStudy && centricScreens[currentScreen]?.component}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="mb-6 h-64 w-full rounded-2xl border-2 border-zinc-900 bg-cover bg-center shadow-[4px_4px_0px_#18181b]"
                    style={{ backgroundImage: `url(${caseStudy.bgUrl})` }}
                  />
                )}

                {/* Key Metrics */}
                <div className="mb-6 rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">Key Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-black text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                        {caseStudy.metric}
                      </div>
                      <div className="text-sm text-zinc-600">{caseStudy.subMetric}</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-black text-zinc-900">
                        {caseStudy.orderCount}
                      </div>
                      <div className="text-sm text-zinc-600">Orders Automated</div>
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
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">The Challenge</h3>
                  <p className="text-zinc-700">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Our Solution</h3>
                  <p className="text-zinc-700">{caseStudy.solution}</p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Results Achieved</h3>
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
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Technology Stack</h3>
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
                  <cite className="text-xs text-orange-100">— {caseStudy.testimonialAuthor}</cite>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
