import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const JBBookingSystem = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-8">
      {/* Tablet Frame */}
      <div className="relative">
        {/* Tablet Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-transparent rounded-2xl blur-2xl transform translate-y-4"></div>
        
        {/* Tablet Screen */}
        <div className="relative bg-zinc-900 rounded-2xl p-1 shadow-2xl">
          {/* Screen */}
          <div className="bg-zinc-950 rounded-xl p-4">
            {/* Home Button Area */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-full"></div>
            
            {/* App Interface */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-[800px]">
              {/* App Header */}
              <div className="bg-gradient-to-r from-black to-zinc-800 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/jblogo.png"
                    alt="JB Logo"
                    width={40}
                    height={40}
                    className="bg-white rounded-lg p-1"
                  />
                  <div>
                    <h3 className="font-bold text-lg">JB Mobile Booking</h3>
                    <p className="text-sm text-zinc-300">Service Scheduler</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Live</span>
                  <button className="text-zinc-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Booking Interface */}
              <div className="p-6 space-y-6 overflow-y-auto h-full bg-gradient-to-b from-zinc-50 to-white">
                {/* Vehicle Selection */}
                <div className="bg-white rounded-2xl border-2 border-zinc-200 p-6 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    🚗 Vehicle Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Vehicle Type</label>
                      <select className="w-full p-3 border border-zinc-300 rounded-lg bg-white">
                        <option>2023 Mercedes S-Class</option>
                        <option>2024 BMW X7</option>
                        <option>2023 Tesla Model S</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Color</label>
                      <select className="w-full p-3 border border-zinc-300 rounded-lg bg-white">
                        <option>Obsidian Black</option>
                        <option>Pearl White</option>
                        <option>Midnight Blue</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Service Selection */}
                <div className="bg-white rounded-2xl border-2 border-zinc-200 p-6 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    ✨ Service Packages
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 border-2 border-yellow-400 bg-yellow-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-lg">Premium Detail Package</h5>
                          <p className="text-sm text-zinc-600">Exterior wash, clay bar, polish & ceramic coating</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Most Popular</span>
                            <span className="text-xs text-zinc-500">⏱️ 3-4 hours</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-yellow-600">$350</span>
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center ml-auto mt-2">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-zinc-300 bg-white rounded-xl opacity-60">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-bold">Luxury Interior Detail</h5>
                          <p className="text-sm text-zinc-600">Deep clean, leather treatment & protection</p>
                        </div>
                        <span className="text-xl font-bold text-zinc-600">$250</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-zinc-300 bg-white rounded-xl opacity-60">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-bold">Complete Package</h5>
                          <p className="text-sm text-zinc-600">Premium exterior + luxury interior</p>
                        </div>
                        <span className="text-xl font-bold text-zinc-600">$550</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Date & Time Selection */}
                <div className="bg-white rounded-2xl border-2 border-zinc-200 p-6 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    📅 Schedule Service
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Preferred Date</label>
                      <input type="date" className="w-full p-3 border border-zinc-300 rounded-lg" defaultValue="2024-06-20" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Time Slot</label>
                      <select className="w-full p-3 border border-zinc-300 rounded-lg bg-white">
                        <option>9:00 AM - 1:00 PM</option>
                        <option>1:00 PM - 5:00 PM</option>
                        <option>Flexible timing</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Service Location</label>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        className="flex-1 p-3 border border-zinc-300 rounded-lg" 
                        placeholder="Enter your address"
                        defaultValue="123 Luxury Lane, Beverly Hills, CA"
                      />
                      <button className="bg-blue-600 text-white px-4 py-3 rounded-lg">
                        📍
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Customer Info */}
                <div className="bg-white rounded-2xl border-2 border-zinc-200 p-6 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    👤 Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      className="p-3 border border-zinc-300 rounded-lg" 
                      placeholder="Full Name"
                      defaultValue="Marcus Johnson"
                    />
                    <input 
                      type="tel" 
                      className="p-3 border border-zinc-300 rounded-lg" 
                      placeholder="Phone Number"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                </div>
                
                {/* Booking Summary & CTA */}
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Booking Summary</h4>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      Available
                    </motion.div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>Premium Detail Package</span>
                      <span>$350.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Date</span>
                      <span>June 20, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Slot</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="border-t border-yellow-500 pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$350.00</span>
                    </div>
                  </div>
                  <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-colors">
                    Confirm Booking & Pay
                  </button>
                </div>
              </div>
              
              {/* Bottom Footer */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
                <p className="text-xs text-zinc-500">
                  Powered by deployAI Booking System
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Real-time availability
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-600/20 via-transparent to-black/20 blur-3xl"></div>
    </div>
  );
};