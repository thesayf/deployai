import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CentricDashboardMockup = () => {
  return (
    <div className="w-full h-full p-4">
      {/* Browser Window - Clean and Centered */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full h-full">
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
          {/* App Header - Minimal */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/CentricLogo.png"
                alt="Centric Logo"
                width={14}
                height={14}
                className="bg-white rounded-md p-0.5"
              />
              <span className="font-medium text-sm">Partnership Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-yellow-500 text-black px-1 py-0.5 rounded-md">Live</span>
              <span className="text-xs">52 Projects</span>
            </div>
          </div>
          
          {/* Toolbar - Search & Filters */}
          <div className="px-2 py-1 border-b border-zinc-200 bg-zinc-50 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-md px-2 py-1 text-xs border flex items-center gap-1">
              <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-zinc-500">Youth engagement Birmingham</span>
            </div>
            <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-xs">Search</button>
            <button className="text-zinc-500 hover:text-purple-600 px-2 py-1 text-xs rounded-md">Filter</button>
          </div>
          
          {/* Main Layout - Desktop Wide */}
          <div className="flex h-full">
            {/* Sidebar - Clean & Minimal */}
            <div className="w-24 bg-zinc-50 border-r border-zinc-200 p-1 space-y-1">
              <div className="bg-white rounded-md border p-1">
                <h4 className="font-medium text-purple-800 mb-1 text-xs">Stats</h4>
                <div className="space-y-0.5 text-xs">
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
              
              <div className="bg-white rounded-md border p-1">
                <h4 className="font-medium text-purple-800 mb-1 text-xs">Relationship</h4>
                <div className="space-y-0.5 text-xs">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" checked />
                    <span>Strong</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" checked />
                    <span>Warm</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" />
                    <span>Cold</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded-md border p-1">
                <h4 className="font-medium text-purple-800 mb-1 text-xs">Ethics</h4>
                <div className="space-y-0.5 text-xs">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" checked />
                    <span>Community-Led</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" />
                    <span>Needs Review</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" />
                    <span>High Risk</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded-md border p-1">
                <h4 className="font-medium text-purple-800 mb-1 text-xs">Availability</h4>
                <div className="space-y-0.5 text-xs">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" checked />
                    <span>Available</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-2 h-2" />
                    <span>Busy</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded-md border p-1">
                <h4 className="font-medium text-purple-800 mb-1 text-xs">Recent</h4>
                <div className="space-y-0.5 text-xs">
                  <div className="bg-purple-50 p-0.5 rounded">
                    <div className="font-medium text-xs">Youth Voice</div>
                    <div className="text-zinc-600 text-xs">85% participation</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Wide Grid */}
            <div className="flex-1 p-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex gap-1">
                  <button className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-xs">Projects (8)</button>
                  <button className="text-zinc-500 hover:text-purple-600 px-2 py-0.5 rounded-md text-xs">Partners (12)</button>
                </div>
                <div className="flex gap-1 text-xs">
                  <button className="bg-purple-100 text-purple-700 px-1 py-0.5 rounded-md text-xs">Grid</button>
                  <button className="text-zinc-500 hover:text-purple-600 px-1 py-0.5 text-xs">Export</button>
                </div>
              </div>
              
              {/* Single Column Project Grid */}
              <div className="space-y-2 pb-2">
                <div className="bg-white rounded-md border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative" style={{padding: '10px', marginBottom: '8px'}}>
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div style={{marginBottom: '6px'}}>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md text-xs">Youth</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div style={{marginBottom: '4px'}}>
                    <h5 className="font-bold text-sm text-zinc-800">Birmingham Youth Voice Initiative</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div style={{marginBottom: '6px'}}>
                    <p className="text-xs text-zinc-500">Led by Sarah Johnson • Active until Dec 2025</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs">Strong Contact</span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-md border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative" style={{padding: '10px', marginBottom: '8px'}}>
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div style={{marginBottom: '6px'}}>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-xs">Health</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div style={{marginBottom: '4px'}}>
                    <h5 className="font-bold text-sm text-zinc-800">Community Mental Health Network</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div style={{marginBottom: '6px'}}>
                    <p className="text-xs text-zinc-500">Led by Dr. Aisha Patel • Planning Phase</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-xs">Warm Intro</span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-md border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative" style={{padding: '10px', marginBottom: '8px'}}>
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⚠️</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div style={{marginBottom: '6px'}}>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md text-xs">Digital</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div style={{marginBottom: '4px'}}>
                    <h5 className="font-bold text-sm text-zinc-800">Digital Skills Programme</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div style={{marginBottom: '6px'}}>
                    <p className="text-xs text-zinc-500">Led by Marcus Williams • Active until Mar 2025</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs">Strong Contact</span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-md border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative" style={{padding: '10px', marginBottom: '8px'}}>
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div style={{marginBottom: '6px'}}>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-xs">Env</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div style={{marginBottom: '4px'}}>
                    <h5 className="font-bold text-sm text-zinc-800">Sustainable Communities Project</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div style={{marginBottom: '6px'}}>
                    <p className="text-xs text-zinc-500">Led by Emma Thompson • Proposal Stage</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-xs">Warm Intro</span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">View</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-md border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative" style={{padding: '10px', marginBottom: '8px'}}>
                  {/* Ethics Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✗</span>
                  </div>
                  
                  {/* Top Row: Category Tag */}
                  <div style={{marginBottom: '6px'}}>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md text-xs">Ed</span>
                  </div>
                  
                  {/* Middle Row: Project Title */}
                  <div style={{marginBottom: '4px'}}>
                    <h5 className="font-bold text-sm text-zinc-800">Community Learning Hubs</h5>
                  </div>
                  
                  {/* Contact & Timeline Row */}
                  <div style={{marginBottom: '6px'}}>
                    <p className="text-xs text-zinc-500">Led by David Chen • Seeking Funding</p>
                  </div>
                  
                  {/* Bottom Row: Relationship Badge + View Button */}
                  <div className="flex justify-between items-center">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs">Cold Outreach</span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">View</button>
                  </div>
                </div>
              </div>
              
              {/* Load More */}
              <div className="text-center pt-4 border-t border-zinc-200">
                <button className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs hover:bg-purple-200 transition-colors">
                  Load More (44 remaining)
                </button>
              </div>
            </div>
          </div>
          
          {/* Powered by footer - Fixed positioning */}
          <div className="border-t border-zinc-200 bg-white px-2 py-1 flex justify-end">
            <p className="text-xs text-zinc-500">
              Powered by deployAI Knowledge Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};