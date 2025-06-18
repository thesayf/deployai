import React from "react";
import { motion } from "framer-motion";

export const ChatbotMockup = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-8">
      {/* MacBook Frame */}
      <div className="relative">
        {/* Screen Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-transparent rounded-t-2xl blur-2xl transform translate-y-4"></div>
        
        {/* MacBook Screen */}
        <div className="relative bg-zinc-900 rounded-t-2xl p-1 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-zinc-950 rounded-t-xl p-4">
            {/* MacBook Camera Notch */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-zinc-800 rounded-full"></div>
            
            {/* Browser Window */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Browser Top Bar */}
              <div className="bg-zinc-100 px-4 py-3 flex items-center gap-2 border-b border-zinc-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-md px-4 py-1 text-sm text-zinc-600 border border-zinc-300 min-w-[300px] text-center">
                    jbluxurydetailing.com
                  </div>
                </div>
              </div>
              
              {/* Chatbot Interface */}
              <div className="bg-gradient-to-b from-zinc-50 to-white h-[600px] relative">
                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-black">
                      JB
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">JB Luxury Detailing Assistant</h3>
                      <p className="text-sm text-zinc-300 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online - Ready to help
                      </p>
                    </div>
                  </div>
                  <button className="text-zinc-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Chat Messages */}
                <div className="p-6 space-y-4 overflow-y-auto h-[400px]">
                  {/* Bot Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold text-xs">JB</span>
                    </div>
                    <div className="bg-zinc-100 rounded-2xl rounded-tl-none p-4 max-w-[70%]">
                      <p className="text-zinc-800">
                        Welcome to JB Luxury Mobile Detailing! 🚗✨ I'm here to help you schedule your premium detailing service. 
                        What type of vehicle do you have?
                      </p>
                    </div>
                  </div>
                  
                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[70%]">
                      <p>I have a 2023 Mercedes S-Class</p>
                    </div>
                  </div>
                  
                  {/* Bot Message with Options */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold text-xs">JB</span>
                    </div>
                    <div className="space-y-3 max-w-[70%]">
                      <div className="bg-zinc-100 rounded-2xl rounded-tl-none p-4">
                        <p className="text-zinc-800 mb-3">
                          Excellent choice! For your Mercedes S-Class, I recommend our Premium Package. Here are our services:
                        </p>
                        <div className="space-y-2">
                          <button className="w-full text-left bg-white border border-zinc-300 rounded-lg p-3 hover:bg-zinc-50 transition-colors">
                            <span className="font-semibold">🌟 Premium Detail - $350</span>
                            <p className="text-sm text-zinc-600">Full exterior wash, clay bar, polish & ceramic coating</p>
                          </button>
                          <button className="w-full text-left bg-white border border-zinc-300 rounded-lg p-3 hover:bg-zinc-50 transition-colors">
                            <span className="font-semibold">💎 Luxury Interior - $250</span>
                            <p className="text-sm text-zinc-600">Deep clean, leather treatment & protection</p>
                          </button>
                          <button className="w-full text-left bg-white border border-zinc-300 rounded-lg p-3 hover:bg-zinc-50 transition-colors">
                            <span className="font-semibold">👑 Complete Package - $550</span>
                            <p className="text-sm text-zinc-600">Premium exterior + luxury interior service</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold text-xs">JB</span>
                    </div>
                    <div className="bg-zinc-100 rounded-2xl rounded-tl-none p-4">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-zinc-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-zinc-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-zinc-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-zinc-100 rounded-full px-4 py-3 text-zinc-800 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue=""
                    />
                    <button className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 text-center mt-2">
                    Powered by deployAI Custom CRM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* MacBook Bottom */}
        <div className="bg-zinc-800 h-6 rounded-b-xl relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-zinc-700 rounded-t-lg"></div>
        </div>
      </div>
      
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-600/20 via-transparent to-zinc-900/20 blur-3xl"></div>
    </div>
  );
};