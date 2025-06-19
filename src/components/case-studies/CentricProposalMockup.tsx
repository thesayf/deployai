import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScreenDemo } from "./ScreenDemo";

export const CentricProposalMockup = () => {
  // Simulated state for demonstration
  const selectedTemplate = "youth-research";
  const selectedProject = "birmingham-youth-voice";
  const projectTitle = "South London Youth Digital Skills Program";
  const projectLocation = "Lambeth";
  const isImporting = false;
  const invitedPartners = ["sarah.johnson@community.org", "dr.patel@research.uk"];
  
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
              generator.centric.org.uk/new-proposal
            </div>
          </div>
        </div>
        
        {/* Proposal Generator Interface - True Desktop Screenshot Scale */}
        <div className="bg-white flex-1 relative overflow-hidden">
          {/* Header - Much smaller for desktop screenshot */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-1 py-0.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Image
                src="/logos/CentricLogo.png"
                alt="Centric Logo"
                width={10}
                height={10}
                className="bg-white rounded p-0.5"
              />
              <span className="font-medium text-[10px]">Proposal Generator</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] bg-yellow-500 text-black px-0.5 py-0.5 rounded">Draft</span>
              <span className="text-[8px]">15 min avg</span>
            </div>
          </div>
          
          {/* Main Content Area - Desktop Scale */}
          <div className="flex-1 p-2 bg-zinc-50 flex flex-col">
            {/* 4-Step Workflow Cards - Much smaller for desktop view */}
            <div className="flex gap-1 mb-2 h-32">
              {/* Step 1 - Template Selection */}
              <div className="flex-1 bg-white rounded border border-zinc-200 p-1 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-medium text-[8px] text-purple-800">Step 1: Choose Template</h3>
                  <div className="w-3 h-3 bg-purple-600 text-white rounded-full flex items-center justify-center text-[6px] font-bold">1</div>
                </div>
                
                <div className="space-y-0.5 overflow-y-auto flex-1 pr-0.5">
                  {/* Youth Research Template - Selected */}
                  <div className={`border rounded p-0.5 cursor-pointer transition-all flex items-center justify-between ${
                    selectedTemplate === "youth-research" 
                      ? "border-purple-600 bg-purple-50" 
                      : "border-zinc-300 hover:border-purple-400"
                  }`}>
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Youth Research</div>
                      <span className="text-[6px] text-zinc-500">£100-200K</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-0.5 rounded text-[6px]">94% match</span>
                  </div>
                  
                  {/* Health Studies Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Health Studies</div>
                      <span className="text-[6px] text-zinc-500">£50-150K</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-0.5 rounded text-[6px]">89% match</span>
                  </div>
                  
                  {/* Digital Inclusion Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Digital Inclusion</div>
                      <span className="text-[6px] text-zinc-500">£75-300K</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-0.5 rounded text-[6px]">76% match</span>
                  </div>
                  
                  {/* Environmental Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Environmental</div>
                      <span className="text-[6px] text-zinc-500">£25-100K</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-0.5 rounded text-[6px]">82% match</span>
                  </div>
                  
                  {/* Community Wellbeing Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Community Wellbeing</div>
                      <span className="text-[6px] text-zinc-500">£50-250K</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-0.5 rounded text-[6px]">71% match</span>
                  </div>
                  
                  {/* Education Access Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Education Access</div>
                      <span className="text-[6px] text-zinc-500">£100-400K</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-0.5 rounded text-[6px]">68% match</span>
                  </div>
                  
                  {/* Social Housing Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Social Housing</div>
                      <span className="text-[6px] text-zinc-500">£200-500K</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-0.5 rounded text-[6px]">65% match</span>
                  </div>
                  
                  {/* Arts & Culture Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Arts & Culture</div>
                      <span className="text-[6px] text-zinc-500">£25-150K</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-0.5 rounded text-[6px]">62% match</span>
                  </div>
                  
                  {/* Employment Skills Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Employment Skills</div>
                      <span className="text-[6px] text-zinc-500">£75-350K</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-0.5 rounded text-[6px]">58% match</span>
                  </div>
                  
                  {/* Food Security Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Food Security</div>
                      <span className="text-[6px] text-zinc-500">£50-200K</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-0.5 rounded text-[6px]">55% match</span>
                  </div>
                  
                  {/* Sports & Recreation Template */}
                  <div className="border border-zinc-300 rounded p-0.5 cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="text-[6px] font-medium">Sports & Recreation</div>
                      <span className="text-[6px] text-zinc-500">£30-180K</span>
                    </div>
                    <span className="bg-red-100 text-red-700 px-0.5 rounded text-[6px]">48% match</span>
                  </div>
                </div>
              </div>
              
              {/* Step 2 - Data Import */}
              <div className="flex-1 bg-white rounded border border-zinc-200 p-1 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-medium text-[8px] text-purple-800">Step 2: Import Data</h3>
                  <div className="w-3 h-3 bg-purple-600 text-white rounded-full flex items-center justify-center text-[6px] font-bold">2</div>
                </div>
                
                <div className="space-y-1">
                  {/* Project Selection Dropdown */}
                  <div>
                    <label className="text-[8px] text-zinc-600 block">Select Previous Project</label>
                    <select className="w-full px-1 py-0.5 text-[8px] border border-zinc-300 rounded bg-white">
                      <option value="birmingham-youth-voice">Birmingham Youth Voice Initiative</option>
                      <option value="mental-health">Community Mental Health Network</option>
                      <option value="digital-skills">Digital Skills Programme</option>
                    </select>
                  </div>
                  
                  {/* Import Button */}
                  <button className={`w-full py-0.5 px-1 rounded text-[8px] font-medium transition-all ${
                    isImporting 
                      ? "bg-purple-100 text-purple-700 cursor-wait" 
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}>
                    {isImporting ? (
                      <span className="flex items-center justify-center gap-0.5">
                        <motion.div
                          className="w-1 h-1 bg-purple-700 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Importing...
                      </span>
                    ) : (
                      "Import Data"
                    )}
                  </button>
                  
                  {/* Preview Text */}
                  <div className="bg-green-50 border border-green-200 rounded p-0.5">
                    <p className="text-[7px] text-green-700">
                      ✓ Ready to import: Community engagement metrics, budget templates, impact frameworks
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 - Project Details */}
              <div className="flex-1 bg-white rounded border border-zinc-200 p-1 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-medium text-[8px] text-purple-800">Step 3: Project Details</h3>
                  <div className="w-3 h-3 bg-purple-600 text-white rounded-full flex items-center justify-center text-[6px] font-bold">3</div>
                </div>
                
                <div className="space-y-0.5">
                  {/* Project Title */}
                  <div>
                    <label className="text-[6px] text-zinc-600 block">Project Title</label>
                    <input 
                      type="text"
                      value="South London Youth Digital..."
                      className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white"
                      readOnly
                    />
                  </div>
                  
                  {/* Brief Description */}
                  <div>
                    <label className="text-[6px] text-zinc-600 block">Brief Description</label>
                    <textarea 
                      className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white h-4 resize-none leading-tight"
                      defaultValue="Empowering young people aged 16-25 with essential digital skills..."
                    />
                  </div>
                  
                  {/* Location and Funding */}
                  <div className="grid grid-cols-2 gap-0.5">
                    <div>
                      <label className="text-[6px] text-zinc-600 block">Location</label>
                      <select className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white">
                        <option value="lambeth" selected>Lambeth</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[6px] text-zinc-600 block">Funding Amount</label>
                      <input 
                        type="text"
                        value="£150,000"
                        className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-0.5">
                    <div>
                      <label className="text-[6px] text-zinc-600 block">Start Date</label>
                      <input 
                        type="text"
                        value="01/09/24"
                        className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-[6px] text-zinc-600 block">End Date</label>
                      <input 
                        type="text"
                        value="01/03/26"
                        className="w-full px-0.5 py-0 text-[6px] border border-zinc-300 rounded bg-white"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 - Collaboration (previously Step 3) */}
              <div className="flex-1 bg-white rounded border border-zinc-200 p-1 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-medium text-[8px] text-purple-800">Step 4: Add Collaborators</h3>
                  <div className="w-3 h-3 bg-purple-600 text-white rounded-full flex items-center justify-center text-[6px] font-bold">4</div>
                </div>
                
                <div className="space-y-1">
                  {/* Email Input */}
                  <div>
                    <label className="text-[8px] text-zinc-600 block">Partner Email</label>
                    <div className="flex gap-0.5">
                      <input 
                        type="email" 
                        placeholder="partner@organization.uk"
                        className="flex-1 px-1 py-0.5 text-[8px] border border-zinc-300 rounded"
                      />
                      <button className="px-1 py-0.5 bg-purple-600 text-white rounded text-[8px] hover:bg-purple-700">
                        Send
                      </button>
                    </div>
                  </div>
                  
                  {/* Invited Partners List */}
                  <div className="space-y-0.5">
                    {invitedPartners.map((partner, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-zinc-50 rounded p-0.5">
                        <span className="text-[7px] text-zinc-700">{partner}</span>
                        <span className="text-[7px] bg-green-100 text-green-700 px-0.5 rounded">Invited</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proposal Preview Section - Desktop Scale */}
            <div className="bg-white rounded border border-zinc-200 p-1 shadow-sm">
              <div className="mb-1">
                <h3 className="font-medium text-[10px] text-purple-800">📄 Your {projectTitle} Proposal Will Include:</h3>
              </div>
              
              {/* Proposal Sections List */}
              <div className="space-y-0.5 mb-1">
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-green-600">✓</span>
                  <span className="text-[8px] text-zinc-700">Executive Summary (auto-generated)</span>
                </div>
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-green-600">✓</span>
                  <span className="text-[8px] text-zinc-700">Community Engagement Plan (from Birmingham Youth Voice, adapted for {projectLocation})</span>
                </div>
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-green-600">✓</span>
                  <span className="text-[8px] text-zinc-700">Budget Breakdown (template + past data)</span>
                </div>
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-green-600">✓</span>
                  <span className="text-[8px] text-zinc-700">Impact Metrics (from similar projects)</span>
                </div>
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-green-600">✓</span>
                  <span className="text-[8px] text-zinc-700">Evaluation Framework</span>
                </div>
                <div className="flex items-start gap-0.5">
                  <span className="text-[8px] text-yellow-600">⚠️</span>
                  <span className="text-[8px] text-zinc-700">Risk Assessment (needs partner input)</span>
                </div>
              </div>
              
              {/* Generate Button - Inside the card */}
              <button className="w-full bg-purple-600 text-white py-0.5 rounded text-[9px] font-medium hover:bg-purple-700 transition-all mt-1">
                Generate {projectTitle} Proposal
              </button>
            </div>
          </div>
                
          {/* Powered by footer - Matching dashboard scale */}
          <div className="border-t border-zinc-200 bg-white px-2 py-1 flex justify-end">
            <p className="text-[8px] text-zinc-500">
              Powered by deployAI Proposal Engine
            </p>
          </div>
        </div>
      </div>
    </ScreenDemo>
  );
};