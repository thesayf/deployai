import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScreenDemo } from "./ScreenDemo";

export const CentricDashboardMockup = () => {
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
              insights.centric.org.uk/dashboard
            </div>
          </div>
        </div>
        
        {/* Dashboard Interface - Fill Available Space */}
        <div className="bg-white h-full relative overflow-hidden">
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
              <span className="font-medium text-[10px]">Partnership Dashboard</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] bg-yellow-500 text-black px-0.5 py-0.5 rounded">Live</span>
              <span className="text-[8px]">52 Projects</span>
            </div>
          </div>
          
          {/* Toolbar - Search & Filters */}
          <div className="px-1 py-0.5 border-b border-zinc-200 bg-zinc-50 flex items-center gap-1">
            <div className="flex-1 bg-white rounded px-1 py-0.5 text-[8px] border flex items-center gap-0.5">
              <svg className="w-2 h-2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-zinc-500">Youth engagement Birmingham</span>
            </div>
            <button className="bg-purple-600 text-white px-1.5 py-0.5 rounded text-[8px]">Search</button>
            <button className="text-zinc-500 hover:text-purple-600 px-1 py-0.5 text-[8px] rounded">Filter</button>
          </div>
          
          {/* Main Layout - Desktop Wide */}
          <div className="flex flex-1">
            {/* Sidebar - Clean & Minimal */}
            <div className="w-20 bg-zinc-50 border-r border-zinc-200 p-0.5 space-y-0.5">
              <div className="bg-white rounded border p-0.5">
                <h4 className="font-medium text-purple-800 text-[8px]">Stats</h4>
                <div className="space-y-0.5 text-[7px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Projects</span>
                    <span className="font-bold text-purple-600">52</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Success</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded border p-0.5">
                <h4 className="font-medium text-purple-800 text-[8px]">Relationship</h4>
                <div className="space-y-0.5 text-[7px]">
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" checked />
                    <span>Strong</span>
                  </label>
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" checked />
                    <span>Warm</span>
                  </label>
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" />
                    <span>Cold</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded border p-0.5">
                <h4 className="font-medium text-purple-800 text-[8px]">Ethics</h4>
                <div className="space-y-0.5 text-[7px]">
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" checked />
                    <span>Community-Led</span>
                  </label>
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" />
                    <span>Needs Review</span>
                  </label>
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" />
                    <span>High Risk</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded border p-0.5">
                <h4 className="font-medium text-purple-800 text-[8px]">Availability</h4>
                <div className="space-y-0.5 text-[7px]">
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" checked />
                    <span>Available</span>
                  </label>
                  <label className="flex items-center gap-0.5">
                    <input type="checkbox" className="w-1.5 h-1.5" />
                    <span>Busy</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded border p-0.5">
                <h4 className="font-medium text-purple-800 text-[8px]">Recent</h4>
                <div className="space-y-0.5">
                  <div className="bg-purple-50 p-0.5 rounded">
                    <div className="font-medium text-[7px]">Youth Voice</div>
                    <div className="text-zinc-600 text-[6px]">85% participation</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Wide Grid */}
            <div className="flex-1 p-0.5">
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex gap-0.5">
                  <button className="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-[8px]">Projects (8)</button>
                  <button className="text-zinc-500 hover:text-purple-600 px-1 py-0.5 rounded text-[8px]">Partners (12)</button>
                </div>
                <div className="flex gap-0.5">
                  <button className="bg-purple-100 text-purple-700 px-0.5 py-0.5 rounded text-[7px]">Grid</button>
                  <button className="text-zinc-500 hover:text-purple-600 px-0.5 py-0.5 text-[7px]">Export</button>
                </div>
              </div>
              
              {/* Single Column Project Grid */}
              <div className="space-y-1 overflow-y-auto" style={{maxHeight: 'calc(100% - 2rem)'}}>
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div className="mb-0.5">
                    <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-[7px]">Youth</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Birmingham Youth Voice Initiative</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by Sarah Johnson • Active until Dec 2025</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[7px]">Strong Contact</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div className="mb-0.5">
                    <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-[7px]">Health</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Community Mental Health Network</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by Dr. Aisha Patel • Planning Phase</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded text-[7px]">Warm Intro</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">!</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div className="mb-0.5">
                    <span className="bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded text-[7px]">Digital</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Digital Skills Programme</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by Marcus Williams • Active until Mar 2025</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[7px]">Strong Contact</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div className="mb-0.5">
                    <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-[7px]">Env</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Sustainable Communities Project</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by Emma Thompson • Proposal Stage</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded text-[7px]">Warm Intro</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">✗</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div className="mb-0.5">
                    <span className="bg-orange-100 text-orange-800 px-1 py-0.5 rounded text-[7px]">Ed</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Community Learning Hubs</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by David Chen • Seeking Funding</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-[7px]">Cold Outreach</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                {/* Additional project cards to show scrollable nature */}
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">✓</span>
                  </div>
                  <div className="mb-0.5">
                    <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-[7px]">Arts</span>
                  </div>
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Creative Arts Programme</h5>
                  </div>
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by Maya Singh • In Progress</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[7px]">Strong Contact</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative p-1">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">!</span>
                  </div>
                  <div className="mb-0.5">
                    <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-[7px]">Housing</span>
                  </div>
                  <div className="mb-0.5">
                    <h5 className="font-bold text-[9px] text-zinc-800">Affordable Housing Initiative</h5>
                  </div>
                  <div className="mb-0.5">
                    <p className="text-[7px] text-zinc-500">Led by James Wilson • Seeking Partners</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded text-[7px]">Warm Intro</span>
                    <button className="text-purple-600 hover:text-purple-800 text-[7px]">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Powered by footer - Fixed positioning */}
          <div className="border-t border-zinc-200 bg-white px-2 py-1 flex justify-end">
            <p className="text-[8px] text-zinc-500">
              Powered by deployAI Knowledge Platform
            </p>
          </div>
        </div>
      </div>
    </ScreenDemo>
  );
};