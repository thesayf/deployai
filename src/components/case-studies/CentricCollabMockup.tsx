import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CentricCollabMockup = () => {
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
            
            {/* App Interface - Desktop Screenshot View */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-[400px]">
              {/* App Header */}
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logos/CentricLogo.png"
                    alt="Centric Logo"
                    width={20}
                    height={20}
                    className="bg-white rounded p-0.5"
                  />
                  <div>
                    <h3 className="font-bold text-sm">Collaborative Review Workspace</h3>
                    <p className="text-xs text-purple-100">Real-time Community Partnership</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Live Session</span>
                </div>
              </div>
              
              {/* Collaboration Status Bar */}
              <div className="bg-purple-50 border-b border-purple-200 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-purple-800">Active Collaborators</span>
                    <div className="flex -space-x-1">
                      {/* Community Member Avatar */}
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center relative">
                        <span className="text-white text-xs font-bold">AM</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full border border-white">
                          <span className="text-xs text-white">👥</span>
                        </div>
                      </div>
                      {/* Institutional Partner Avatar */}
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center relative">
                        <span className="text-white text-xs font-bold">SH</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-purple-600 rounded-full border border-white">
                          <span className="text-xs text-white">🏛️</span>
                        </div>
                      </div>
                      {/* Another Community Member */}
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center relative">
                        <span className="text-white text-xs font-bold">MJ</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full border border-white">
                          <span className="text-xs text-white">👥</span>
                        </div>
                      </div>
                      {/* Research Lead */}
                      <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center relative">
                        <span className="text-white text-xs font-bold">DR</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-600 rounded-full border border-white">
                          <span className="text-xs text-white">🔬</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">4 active</span>
                    <motion.div
                      className="w-1 h-1 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Main Workspace */}
              <div className="flex h-full">
                {/* Document Editor - Left Side */}
                <div className="flex-1 bg-white">
                  <div className="p-2 border-b border-zinc-200">
                    <h4 className="font-medium text-purple-800 mb-1 text-sm">Community Youth Digital Skills Initiative - Draft v2.3</h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <span>Last saved: 2 min ago</span>
                      <span>•</span>
                      <span>v2.3</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        <span>Auto-sync</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Document Content */}
                  <div className="p-1 overflow-y-auto text-xs">
                    <div className="space-y-2">
                      {/* Executive Summary Section */}
                      <div className="border-l-2 border-purple-500 pl-2">
                        <h5 className="font-medium text-sm mb-1 text-purple-800">Executive Summary</h5>
                        <div className="space-y-1">
                          <p className="leading-relaxed">
                            Digital skills initiative for 500+ young people in Birmingham communities.
                          </p>
                          
                          {/* Inline Comment Indicator */}
                          <div className="relative">
                            <p className="leading-relaxed bg-yellow-50 border border-yellow-200 rounded p-1">
                              <span className="bg-yellow-200 px-0.5 rounded">Our research methodology emphasizes participatory action research</span>, ensuring young people are active co-researchers throughout the project.
                              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                                <span className="text-white text-xs">💬</span>
                              </span>
                            </p>
                          </div>
                          
                          <p className="leading-relaxed">
                            The programme builds on proven strategies from Centric's knowledge base of 50+ similar initiatives, emphasizing projects with 85%+ retention rates.
                          </p>
                        </div>
                      </div>
                      
                      {/* Community Impact Section */}
                      <div className="border-l-2 border-green-500 pl-2">
                        <h5 className="font-medium text-sm mb-1 text-green-800">Community Impact Framework</h5>
                        <div className="space-y-1">
                          <p className="leading-relaxed">This initiative prioritizes community ownership ensuring:</p>
                          <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs">
                            <li>Young people co-design activities</li>
                            <li>Community knowledge valued equally</li>
                            <li>Local organizations receive support</li>
                            <li className="bg-green-50 border border-green-200 rounded p-1">
                              <span className="bg-green-200 px-0.5 rounded">Evaluation includes peer-led data collection and storytelling</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Budget Section */}
                      <div className="border-l-2 border-blue-500 pl-2">
                        <h5 className="font-medium text-sm mb-1 text-blue-800">Budget Allocation (£150,000)</h5>
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="font-medium">Staff & Coordinators</div>
                              <div className="text-blue-600">£60,000 (40%)</div>
                            </div>
                            <div>
                              <div className="font-medium">Equipment & Tech</div>
                              <div className="text-blue-600">£45,000 (30%)</div>
                            </div>
                            <div>
                              <div className="font-medium">Engagement Activities</div>
                              <div className="text-blue-600">£30,000 (20%)</div>
                            </div>
                            <div>
                              <div className="font-medium">Evaluation</div>
                              <div className="text-blue-600">£15,000 (10%)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comments & Review Panel - Right Side */}
                <div className="w-32 bg-zinc-50 border-l border-zinc-200">
                  <div className="p-1 border-b border-zinc-200 bg-white">
                    <h4 className="font-medium text-purple-800 mb-1 text-xs">Comments</h4>
                    <div className="flex items-center gap-1 text-xs text-zinc-600">
                      <span>8 threads</span>
                    </div>
                  </div>
                  
                  {/* Comments List */}
                  <div className="p-1 space-y-1 overflow-y-auto text-xs">
                    {/* Community Member Comment */}
                    <div className="bg-white rounded border border-blue-200 p-1">
                      <div className="flex items-start gap-1 mb-0.5">
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">A</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-xs">Aisha</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-700 mb-0.5">
                        Love storytelling workshops approach!
                      </p>
                      <div className="flex items-center gap-1">
                        <button className="text-xs text-blue-600">Reply</button>
                      </div>
                    </div>
                    
                    {/* Institutional Partner Comment */}
                    <div className="bg-white rounded border border-purple-200 p-1">
                      <div className="flex items-start gap-1 mb-0.5">
                        <div className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">S</span>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-xs">Sarah</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-700 mb-0.5">
                        Increase community budget allocation
                      </p>
                      <button className="text-xs text-purple-600">Reply</button>
                    </div>
                    
                    {/* Research Lead Comment */}
                    <div className="bg-white rounded border border-yellow-200 p-1">
                      <div className="flex items-start gap-1 mb-0.5">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">R</span>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-xs">Rachel</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-700 mb-0.5">
                        Ready for final review
                      </p>
                      <button className="text-xs text-zinc-500">✅ Approve</button>
                    </div>
                    
                    {/* Typing Indicator */}
                    <div className="bg-white rounded border border-zinc-200 p-1">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">M</span>
                        </div>
                        <span className="text-xs text-zinc-600">typing...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ethical Standards Checklist */}
                  <div className="p-1 border-t border-zinc-200 bg-white">
                    <h5 className="font-medium text-purple-800 mb-1 text-xs">Ethics</h5>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Consent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Data</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 bg-yellow-500 rounded flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <span className="text-white text-xs">!</span>
                        </motion.div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Footer */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
                <p className="text-xs text-zinc-500">
                  Powered by deployAI Collaboration Platform
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Real-time sync active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 via-transparent to-zinc-900/20 blur-3xl"></div>
    </div>
  );
};