import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const JBCRMDashboard = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-8">
      {/* Desktop Monitor Frame */}
      <div className="relative">
        {/* Monitor Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-transparent rounded-t-3xl blur-3xl transform translate-y-6"></div>
        
        {/* Monitor Screen */}
        <div className="relative bg-zinc-900 rounded-t-3xl p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-zinc-950 rounded-t-2xl p-6">
            {/* Browser Window */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Browser Top Bar */}
              <div className="bg-zinc-100 px-6 py-4 flex items-center gap-3 border-b border-zinc-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-zinc-600 border border-zinc-300 min-w-[400px] text-center">
                    admin.jbluxurydetailing.com/dashboard
                  </div>
                </div>
              </div>
              
              {/* CRM Dashboard Interface */}
              <div className="bg-gradient-to-br from-zinc-50 to-white h-[700px] relative">
                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/logos/jblogo.png"
                      alt="JB Logo"
                      width={48}
                      height={48}
                      className="bg-white rounded-lg p-2"
                    />
                    <div>
                      <h3 className="font-bold text-xl">JB Luxury CRM Dashboard</h3>
                      <p className="text-sm text-zinc-300">Customer & Booking Management</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm bg-green-600 px-3 py-1 rounded-full">Online</span>
                    <button className="bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold">
                      + New Booking
                    </button>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-12 gap-6 h-full">
                  {/* Left Sidebar */}
                  <div className="col-span-3 space-y-4">
                    <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
                      <h4 className="font-semibold mb-3">Today's Overview</h4>
                      <div className="space-y-3">
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
                          <span className="font-bold text-yellow-600">$2,850</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
                      <h4 className="font-semibold mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left bg-zinc-100 hover:bg-zinc-200 p-3 rounded-lg text-sm">
                          📅 View Schedule
                        </button>
                        <button className="w-full text-left bg-zinc-100 hover:bg-zinc-200 p-3 rounded-lg text-sm">
                          👥 Customer List
                        </button>
                        <button className="w-full text-left bg-zinc-100 hover:bg-zinc-200 p-3 rounded-lg text-sm">
                          💰 Financial Reports
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main Content Area */}
                  <div className="col-span-9 space-y-6">
                    {/* Recent Bookings */}
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
                        <h4 className="font-semibold">Recent Bookings</h4>
                        <span className="text-sm text-zinc-500">Last 24 hours</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* Booking Row 1 */}
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="font-semibold">Marcus Johnson - 2023 BMW X7</p>
                                <p className="text-sm text-zinc-600">Premium Package • $350</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-green-600">Completed</p>
                              <p className="text-xs text-zinc-500">2:30 PM</p>
                            </div>
                          </div>
                          
                          {/* Booking Row 2 */}
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              <div>
                                <p className="font-semibold">Sarah Martinez - 2024 Tesla Model S</p>
                                <p className="text-sm text-zinc-600">Complete Package • $550</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-blue-600">In Progress</p>
                              <p className="text-xs text-zinc-500">4:00 PM</p>
                            </div>
                          </div>
                          
                          {/* Booking Row 3 */}
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <div>
                                <p className="font-semibold">David Chen - 2023 Mercedes S-Class</p>
                                <p className="text-sm text-zinc-600">Premium Package • $350</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-yellow-600">Scheduled</p>
                              <p className="text-xs text-zinc-500">Tomorrow 10:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Analytics Charts */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
                        <h4 className="font-semibold mb-4">Weekly Revenue</h4>
                        <div className="flex items-end gap-2 h-32">
                          <div className="bg-yellow-600 w-8 h-16 rounded-t"></div>
                          <div className="bg-yellow-600 w-8 h-20 rounded-t"></div>
                          <div className="bg-yellow-600 w-8 h-12 rounded-t"></div>
                          <div className="bg-yellow-600 w-8 h-24 rounded-t"></div>
                          <div className="bg-yellow-600 w-8 h-32 rounded-t"></div>
                          <div className="bg-yellow-600 w-8 h-28 rounded-t"></div>
                          <div className="bg-green-500 w-8 h-32 rounded-t animate-pulse"></div>
                        </div>
                        <p className="text-sm text-zinc-500 mt-2">Mon - Sun</p>
                      </div>
                      
                      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
                        <h4 className="font-semibold mb-4">Customer Satisfaction</h4>
                        <div className="flex items-center justify-center h-32">
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-8 border-zinc-200"></div>
                            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent transform rotate-45"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-green-600">4.9</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-500 text-center">Average Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Powered by footer */}
                <div className="absolute bottom-4 right-6">
                  <p className="text-xs text-zinc-500">
                    Powered by deployAI Custom CRM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div className="bg-zinc-700 h-8 w-32 mx-auto rounded-b-lg"></div>
        <div className="bg-zinc-600 h-4 w-48 mx-auto rounded-full"></div>
      </div>
      
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-600/20 via-transparent to-zinc-900/20 blur-3xl"></div>
    </div>
  );
};