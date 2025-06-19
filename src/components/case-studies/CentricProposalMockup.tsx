import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CentricProposalMockup = () => {
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
                    generator.centric.org.uk/new-proposal
                  </div>
                </div>
              </div>
              
              {/* Proposal Generator Interface - Desktop Screenshot View */}
              <div className="bg-gradient-to-br from-zinc-50 to-white h-[400px] relative">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logos/CentricLogo.png"
                      alt="Centric Logo"
                      width={24}
                      height={24}
                      className="bg-white rounded p-1"
                    />
                    <div>
                      <h3 className="font-bold text-sm">Smart Proposal Generator</h3>
                      <p className="text-xs text-purple-100">£150K Research Proposal Creation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <motion.div
                        className="w-1 h-1 bg-white rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      Generating...
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="bg-white border-b border-zinc-200 p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-zinc-700">Generation Progress</span>
                    <span className="text-xs text-purple-600 font-medium">12 min remaining</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-1 rounded-full w-4/5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 mt-1">
                    <span>80% Complete</span>
                    <span>Avg: 15 min</span>
                  </div>
                </div>
                
                {/* Main Generator Content */}
                <div className="p-2 grid grid-cols-12 gap-2 h-full">
                  {/* Left Panel - Generation Steps */}
                  <div className="col-span-3 space-y-1">
                    <div className="bg-white rounded border border-zinc-200 p-1 shadow-sm">
                      <h4 className="font-medium mb-1 text-purple-800 text-xs">Generation Steps</h4>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-xs text-zinc-700">Scope</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-xs text-zinc-700">Impact</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-xs text-zinc-700">Ethics</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <motion.div
                            className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <span className="text-white text-xs">4</span>
                          </motion.div>
                          <span className="text-xs text-purple-700 font-medium">Budget</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-zinc-300 rounded-full flex items-center justify-center">
                            <span className="text-zinc-500 text-xs">5</span>
                          </div>
                          <span className="text-xs text-zinc-500">Risk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-zinc-300 rounded-full flex items-center justify-center">
                            <span className="text-zinc-500 text-xs">6</span>
                          </div>
                          <span className="text-xs text-zinc-500">Review</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Template Selection */}
                    <div className="bg-white rounded border border-zinc-200 p-1 shadow-sm">
                      <h4 className="font-medium mb-1 text-purple-800 text-xs">Template</h4>
                      <div className="bg-purple-50 border border-purple-200 p-1 rounded">
                        <div className="flex justify-between items-start mb-0.5">
                          <span className="font-medium text-xs text-purple-800">Youth Research</span>
                          <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs">94%</span>
                        </div>
                        <p className="text-xs text-purple-600">
                          8 successful projects
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Panel - Live Proposal Preview */}
                  <div className="col-span-9 space-y-1">
                    <div className="bg-white rounded border border-zinc-200 shadow-sm">
                      <div className="p-1 border-b border-zinc-200 flex justify-between items-center">
                        <h4 className="font-medium text-purple-800 text-xs">Live Proposal Preview</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">Draft</span>
                        </div>
                      </div>
                      <div className="p-1 space-y-1 max-h-64 overflow-y-auto text-xs">
                        {/* Proposal Header */}
                        <div className="border border-zinc-200 rounded p-1 bg-zinc-50">
                          <h5 className="font-medium text-xs mb-1">Community Youth Digital Skills Initiative</h5>
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div>
                              <span className="text-zinc-600">£150K</span>
                            </div>
                            <div>
                              <span className="text-zinc-600">18mo</span>
                            </div>
                            <div>
                              <span className="text-zinc-600">16-25</span>
                            </div>
                            <div>
                              <span className="text-zinc-600">500+</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Budget Breakdown */}
                        <div className="border border-zinc-200 rounded p-1">
                          <h6 className="font-medium mb-1 text-purple-800 text-xs">Budget</h6>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Staff</span>
                              <span className="font-medium text-xs">£60K</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Tech</span>
                              <span className="font-medium text-xs">£45K</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Engage</span>
                              <span className="font-medium text-xs">£30K</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Eval</span>
                              <span className="font-medium text-xs">£15K</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Impact Metrics */}
                        <div className="border border-zinc-200 rounded p-1">
                          <h6 className="font-medium mb-1 text-purple-800 text-xs">Impact</h6>
                          <div className="grid grid-cols-4 gap-0.5">
                            <div className="bg-green-50 p-1 rounded border border-green-200">
                              <div className="font-medium text-green-700 text-xs">500+</div>
                            </div>
                            <div className="bg-blue-50 p-1 rounded border border-blue-200">
                              <div className="font-medium text-blue-700 text-xs">85%</div>
                            </div>
                            <div className="bg-purple-50 p-1 rounded border border-purple-200">
                              <div className="font-medium text-purple-700 text-xs">12</div>
                            </div>
                            <div className="bg-yellow-50 p-1 rounded border border-yellow-200">
                              <div className="font-medium text-yellow-700 text-xs">75%</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Ethical Framework */}
                        <div className="border border-zinc-200 rounded p-1">
                          <h6 className="font-medium mb-1 text-purple-800 text-xs">Ethics</h6>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              <span className="text-xs">Community-led</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              <span className="text-xs">Data sovereignty</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-1">
                      <button className="flex-1 bg-purple-600 text-white py-1 rounded text-xs font-medium">
                        Continue
                      </button>
                      <button className="px-2 bg-zinc-100 text-zinc-700 py-1 rounded text-xs font-medium">
                        Save
                      </button>
                      <button className="px-2 bg-yellow-500 text-white py-1 rounded text-xs font-medium">
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Powered by footer */}
                <div className="absolute bottom-4 right-6">
                  <p className="text-xs text-zinc-500">
                    Powered by deployAI Proposal Engine
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 via-transparent to-zinc-900/20 blur-3xl"></div>
    </div>
  );
};