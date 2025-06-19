import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScreenDemo } from "./ScreenDemo";

export const CentricCollabMockup = () => {
  return (
    <ScreenDemo>
      {/* Browser Window - Clean and Centered */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full h-full flex flex-col">
        {/* Browser Top Bar */}
        <div className="bg-zinc-100 px-4 py-3 flex items-center gap-2 border-b border-zinc-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white rounded-md px-4 py-2 text-sm text-zinc-600 border border-zinc-300 min-w-[300px] text-center">
              review.centric.org.uk/workspace
            </div>
          </div>
        </div>
        
        {/* Collaborative Review Interface - Fill Available Space */}
        <div className="bg-white flex-1 relative overflow-hidden">
              {/* App Header - Much smaller for desktop screenshot */}
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-1 py-0.5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src="/logos/CentricLogo.png"
                    alt="Centric Logo"
                    width={10}
                    height={10}
                    className="bg-white rounded p-0.5"
                  />
                  <span className="font-medium text-[10px]">Collaborative Review Workspace</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] bg-green-500 text-white px-0.5 py-0.5 rounded">Live Session</span>
                  <span className="text-[8px]">4 active</span>
                </div>
              </div>
              
              {/* Collaboration Status Bar */}
              <div className="bg-purple-50 border-b border-purple-200 p-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-medium text-purple-800">Active Collaborators</span>
                    <div className="flex -space-x-0.5">
                      {/* Community Member Avatar */}
                      <div className="w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center relative">
                        <span className="text-white text-[6px] font-bold">AM</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full border border-white">
                        </div>
                      </div>
                      {/* Institutional Partner Avatar */}
                      <div className="w-4 h-4 bg-purple-500 rounded-full border border-white flex items-center justify-center relative">
                        <span className="text-white text-[6px] font-bold">SH</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-purple-600 rounded-full border border-white">
                        </div>
                      </div>
                      {/* Another Community Member */}
                      <div className="w-4 h-4 bg-green-500 rounded-full border border-white flex items-center justify-center relative">
                        <span className="text-white text-[6px] font-bold">MJ</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full border border-white">
                        </div>
                      </div>
                      {/* Research Lead */}
                      <div className="w-4 h-4 bg-yellow-500 rounded-full border border-white flex items-center justify-center relative">
                        <span className="text-white text-[6px] font-bold">DR</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-600 rounded-full border border-white">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[8px] bg-green-100 text-green-800 px-1 py-0.5 rounded-full">4 active</span>
                    <motion.div
                      className="w-1 h-1 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Main Workspace */}
              <div className="flex flex-1">
                {/* Document Editor - Left Side */}
                <div className="flex-1 bg-white">
                  <div className="p-1 border-b border-zinc-200">
                    <h4 className="font-medium text-purple-800 text-[10px]">Community Youth Digital Skills Initiative - Draft v2.3</h4>
                    <div className="flex items-center gap-1 text-[8px] text-zinc-600">
                      <span>Last saved: 2 min ago</span>
                      <span>•</span>
                      <span>v2.3</span>
                      <span>•</span>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        <span>Auto-sync</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Document Content */}
                  <div className="p-1 overflow-y-auto">
                    <div className="space-y-1">
                      {/* Executive Summary Section */}
                      <div className="border-l-2 border-purple-500 pl-1">
                        <h5 className="font-medium text-[9px] mb-0.5 text-purple-800">Executive Summary</h5>
                        <div className="space-y-0.5">
                          <p className="text-[8px] leading-relaxed">
                            Digital skills initiative for 500+ young people in Birmingham communities.
                          </p>
                          
                          {/* Inline Comment Indicator */}
                          <div className="relative">
                            <p className="text-[8px] leading-relaxed bg-yellow-50 border border-yellow-200 rounded p-0.5">
                              <span className="bg-yellow-200 px-0.5 rounded">Our research methodology emphasizes participatory action research</span>, ensuring young people are active co-researchers throughout the project.
                              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                              </span>
                            </p>
                          </div>
                          
                          <p className="text-[8px] leading-relaxed">
                            The programme builds on proven strategies from Centric's knowledge base of 50+ similar initiatives, emphasizing projects with 85%+ retention rates.
                          </p>
                        </div>
                      </div>
                      
                      {/* Community Impact Section */}
                      <div className="border-l-2 border-green-500 pl-1">
                        <h5 className="font-medium text-[9px] mb-0.5 text-green-800">Community Impact Framework</h5>
                        <div className="space-y-0.5">
                          <p className="text-[8px] leading-relaxed">This initiative prioritizes community ownership ensuring:</p>
                          <ul className="list-disc list-inside space-y-0.5 ml-1 text-[8px]">
                            <li>Young people co-design activities</li>
                            <li>Community knowledge valued equally</li>
                            <li>Local organizations receive support</li>
                            <li className="bg-green-50 border border-green-200 rounded p-0.5">
                              <span className="bg-green-200 px-0.5 rounded">Evaluation includes peer-led data collection and storytelling</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Budget Section */}
                      <div className="border-l-2 border-blue-500 pl-1">
                        <h5 className="font-medium text-[9px] mb-0.5 text-blue-800">Budget Allocation (£150,000)</h5>
                        <div className="bg-blue-50 border border-blue-200 rounded p-1">
                          <div className="grid grid-cols-2 gap-1 text-[7px]">
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
                <div className="w-24 bg-zinc-50 border-l border-zinc-200">
                  <div className="p-1 border-b border-zinc-200 bg-white">
                    <h4 className="font-medium text-purple-800 text-[9px]">Comments</h4>
                    <div className="flex items-center gap-1 text-[8px] text-zinc-600">
                      <span>8 threads</span>
                    </div>
                  </div>
                  
                  {/* Comments List */}
                  <div className="p-1 space-y-0.5 overflow-y-auto">
                    {/* Community Member Comment */}
                    <div className="bg-white rounded border border-blue-200 p-0.5">
                      <div className="flex items-start gap-0.5 mb-0.5">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">A</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-0.5">
                            <span className="font-medium text-[7px]">Aisha</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[7px] text-zinc-700 mb-0.5">
                        Love storytelling workshops!
                      </p>
                      <div className="flex items-center gap-0.5">
                        <button className="text-[7px] text-blue-600">Reply</button>
                      </div>
                    </div>
                    
                    {/* Institutional Partner Comment */}
                    <div className="bg-white rounded border border-purple-200 p-0.5">
                      <div className="flex items-start gap-0.5 mb-0.5">
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">S</span>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-[7px]">Sarah</span>
                        </div>
                      </div>
                      <p className="text-[7px] text-zinc-700 mb-0.5">
                        Increase community budget
                      </p>
                      <button className="text-[7px] text-purple-600">Reply</button>
                    </div>
                    
                    {/* Research Lead Comment */}
                    <div className="bg-white rounded border border-yellow-200 p-0.5">
                      <div className="flex items-start gap-0.5 mb-0.5">
                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">R</span>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-[7px]">Rachel</span>
                        </div>
                      </div>
                      <p className="text-[7px] text-zinc-700 mb-0.5">
                        Ready for final review
                      </p>
                      <button className="text-[7px] text-zinc-500">✅ Approve</button>
                    </div>
                    
                    {/* Typing Indicator */}
                    <div className="bg-white rounded border border-zinc-200 p-0.5">
                      <div className="flex items-center gap-0.5">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">M</span>
                        </div>
                        <span className="text-[7px] text-zinc-600">typing...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ethical Standards Checklist */}
                  <div className="p-1 border-t border-zinc-200 bg-white">
                    <h5 className="font-medium text-purple-800 mb-0.5 text-[9px]">Ethics</h5>
                    <div className="space-y-0.5 text-[8px]">
                      <div className="flex items-center gap-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-[6px]">✓</span>
                        </div>
                        <span>Consent</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-[6px]">✓</span>
                        </div>
                        <span>Data</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <motion.div
                          className="w-2 h-2 bg-yellow-500 rounded flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <span className="text-white text-[6px]">!</span>
                        </motion.div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
          {/* Powered by footer - Fixed positioning */}
          <div className="border-t border-zinc-200 bg-white px-2 py-1 flex justify-end">
            <p className="text-[8px] text-zinc-500">
              Powered by deployAI Collaboration Platform
            </p>
          </div>
        </div>
      </div>
    </ScreenDemo>
  );
};