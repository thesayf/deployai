import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

interface MVPBlueprintProps {
  summary: {
    projectName: string;
    description: string;
    targetMarket: string;
    mainGoal: string;
    timeline: string;
    keyOutcome: string;
  };
  investment: {
    mvpPackage: {
      name: string;
      cost: number;
      duration: string;
      sizeRationale?: string;
      simplificationOptions?: string;
      includes: {
        infrastructure: string[];
        coreFeatures: string[];
      };
    };
    phase2Features: {
      name: string;
      rationale: string;
    }[];
    totalInvestment: number;
    monthlyRunningCosts: {
      min: number;
      max: number;
      breakdown: {
        item: string;
        cost: string;
      }[];
    };
    costPerUser: string;
  };
  userCapabilities: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    apis: string[];
    infrastructure: string;
    stackRationale?: string;
  };
  timeline: {
    week: number;
    title: string;
    description: string;
    deliverables: string[];
  }[];
  features: {
    mvp: {
      name: string;
      description: string;
      complexity: string;
    }[];
    phase2: {
      name: string;
      description: string;
      complexity: string;
    }[];
  };
}

export const MVPBlueprint: React.FC<MVPBlueprintProps> = ({
  summary,
  investment,
  userCapabilities,
  techStack,
  timeline,
  features
}) => {
  // Consistent color scheme
  const sectionColors = {
    primary: '#212121',
    accent: '#FF6B35',
    secondary: '#457B9D',
    background: '#FAFAFA',
    success: '#00C851'
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* App Concept & Executive Summary Combined */}
      <motion.div 
        className="bg-[#212121] text-white p-12 border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black mb-4">{summary.projectName}</h1>
        <p className="text-xl text-gray-300 mb-8">{summary.description}</p>
        
        {/* Key Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 p-4 border-2 border-white/20 flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-sm text-gray-400 mb-1">Target Market</p>
              <p className="font-bold">{summary.targetMarket}</p>
            </div>
          </div>
          <div className="bg-white/10 p-4 border-2 border-white/20 flex items-start gap-3">
            <span className="text-2xl">🎪</span>
            <div>
              <p className="text-sm text-gray-400 mb-1">Main Goal</p>
              <p className="font-bold">{summary.mainGoal}</p>
            </div>
          </div>
          <div className="bg-white/10 p-4 border-2 border-white/20 flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-sm text-gray-400 mb-1">Success Metric</p>
              <p className="font-bold">{summary.keyOutcome}</p>
            </div>
          </div>
          <div className="bg-[#FF6B35] p-4 border-2 border-black flex items-start gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <p className="text-sm mb-1">Package</p>
              <p className="font-bold text-2xl">{investment.mvpPackage.name}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Investment Section */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Investment Breakdown</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Development Cost */}
          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              💰 Development Investment
            </h3>
            <div className="text-3xl font-black mb-4 text-[#212121]">
              £{investment.totalInvestment.toLocaleString()}
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white border-2 border-black">
                <h4 className="font-bold text-lg mb-2">{investment.mvpPackage.name}</h4>
                <p className="text-gray-600 mb-2">{investment.mvpPackage.duration} development</p>
              </div>
              <div className="p-3 bg-[#212121] text-white">
                <p className="font-bold mb-2">✅ What's Included:</p>
                <ul className="text-sm space-y-1">
                  <li>• Complete infrastructure setup</li>
                  <li>• {investment.mvpPackage.includes.coreFeatures.length} core business features</li>
                  <li>• Ready for real users</li>
                  <li>• 30-day post-launch support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Running Costs */}
          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              🔄 Monthly Running Costs
            </h3>
            <div className="text-3xl font-black mb-4 text-[#FF6B35]">
              £{investment.monthlyRunningCosts.min} - £{investment.monthlyRunningCosts.max}
            </div>
            <div className="space-y-2">
              {investment.monthlyRunningCosts.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between p-2 bg-white border border-gray-300">
                  <span>{item.item}</span>
                  <span className="font-mono">{item.cost}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#457B9D] text-white border-2 border-black">
              <p className="text-sm font-semibold">Cost per user: {investment.costPerUser}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Package Explanation Section */}
      {(investment.mvpPackage.sizeRationale || investment.mvpPackage.simplificationOptions) && (
        <motion.section
          className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Why This Package?</h2>
          
          {investment.mvpPackage.sizeRationale && (
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {investment.mvpPackage.sizeRationale}
              </p>
            </div>
          )}
          
          {investment.mvpPackage.simplificationOptions && (
            <div className="bg-blue-50 p-6 border-2 border-blue-300">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                💡 Want to reduce costs?
              </h3>
              <p className="text-gray-700 mb-4">
                {investment.mvpPackage.simplificationOptions}
              </p>
              <Link 
                href="/mvp-planner" 
                className="inline-flex items-center text-blue-600 font-bold hover:underline"
              >
                Start over with a simpler scope →
              </Link>
            </div>
          )}
        </motion.section>
      )}

      {/* Complete Feature Overview */}
      <motion.section 
        className="bg-gradient-to-br from-gray-50 to-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div className="absolute inset-0 rotate-45">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`absolute border-2 border-black rounded-none ${i % 2 === 0 ? 'bg-[#FF6B35]' : 'bg-[#457B9D]'}`} 
                   style={{
                     width: `${(i + 1) * 30}px`,
                     height: `${(i + 1) * 30}px`,
                     top: `${i * 15}px`,
                     left: `${i * 15}px`,
                   }} />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-black mb-8 uppercase tracking-wide flex items-center">
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M13 2L3 14l9 0l-1 8l10-12h-9l1-8z" />
          </svg>
          Complete Feature Breakdown
        </h2>
        
        {/* Infrastructure - Always Included */}
        <div className="mb-8 bg-white p-6 border-2 border-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          <h3 className="text-lg font-bold mb-4 flex items-center uppercase">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center mr-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            Foundation Layer
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            {investment.mvpPackage.includes.infrastructure.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 border border-gray-200 flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core MVP Features */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center uppercase">
            <div className="w-8 h-8 bg-[#FF6B35] border-2 border-black flex items-center justify-center mr-3">
              <span className="text-white font-black text-xs">MVP</span>
            </div>
            Core Business Features
          </h3>
          <div className="grid md:grid-cols-1 gap-4">
            {features.mvp.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] p-5 hover:shadow-[6px_6px_0px_0px_rgba(255,107,53,1)] transition-all"
                whileHover={{ x: -2, y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF6B35] border-2 border-black flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-lg">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-black text-lg uppercase">{feature.name}</h4>
                      <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-black ${
                        feature.complexity === 'simple' ? 'bg-[#00C851] text-white' :
                        feature.complexity === 'complex' ? 'bg-[#E63946] text-white' : 'bg-[#FFB300] text-black'
                      }`}>
                        {feature.complexity}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Capabilities */}
        <div className="mb-8 bg-[#212121] text-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-lg font-bold mb-4 uppercase">User Capabilities</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {userCapabilities.map((capability, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00C851] border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2 Features */}
        {features.phase2 && features.phase2.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-2 border-[#457B9D] border-dashed relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="bg-[#457B9D] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black">FUTURE</span>
            </div>
            <h3 className="text-lg font-bold mb-4 flex items-center uppercase">
              <div className="w-8 h-8 bg-[#457B9D] border-2 border-black flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5l-5-3-5 3M17 19l-5 3-5-3" />
                </svg>
              </div>
              Phase 2 Roadmap
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.phase2.map((feature, idx) => (
                <div key={idx} className="bg-white/70 p-3 border border-[#457B9D]">
                  <h5 className="font-bold text-sm">{feature.name}</h5>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* Tech Stack */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Tech Stack</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <TechItem label="Frontend" value={techStack.frontend} />
          <TechItem label="Backend" value={techStack.backend} />
          <TechItem label="Database" value={techStack.database} />
          <TechItem label="Hosting" value={techStack.infrastructure} />
        </div>

        <div className="bg-gray-50 p-6 border-2 border-black mb-6">
          <h3 className="font-bold mb-3 uppercase">Integrations & APIs</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.apis.map((api, idx) => (
              <span key={idx} className="px-3 py-1 bg-white border-2 border-black text-sm font-medium">
                {api}
              </span>
            ))}
          </div>
        </div>

        {techStack.stackRationale && (
          <div className="bg-blue-50 p-6 border-2 border-blue-300">
            <h3 className="font-bold mb-3 uppercase">Why This Stack?</h3>
            <p className="text-gray-700">
              {techStack.stackRationale}
            </p>
          </div>
        )}
      </motion.section>

      {/* Development Timeline */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">{investment.mvpPackage.duration} Development Sprint</h2>
        
        <div className="space-y-4">
          {timeline.map((week, idx) => (
            <motion.div 
              key={week.week}
              className="flex gap-4 p-4 border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            >
              <div className="w-12 h-12 bg-[#FF6B35] text-white flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-black">
                {week.week}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{week.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{week.description}</p>
                <div className="flex flex-wrap gap-2">
                  {week.deliverables.map((deliverable, dIdx) => (
                    <span key={dIdx} className="text-sm text-gray-700">
                      • {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

// Helper Components
const InfoBlock: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-sm uppercase text-gray-600 font-semibold">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

const TechItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center p-4 border-2 border-black">
    <p className="text-xs uppercase text-gray-600 font-semibold mb-1">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);