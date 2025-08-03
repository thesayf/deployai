import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';

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
    developmentCost: number;
    weeklyBreakdown: {
      week: number;
      tasks: string[];
      cost: number;
    }[];
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
  };
  timeline: {
    week: number;
    title: string;
    description: string;
    deliverables: string[];
  }[];
}

export const MVPBlueprint: React.FC<MVPBlueprintProps> = ({
  summary,
  investment,
  userCapabilities,
  techStack,
  timeline
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
      {/* Document Header */}
      <motion.div 
        className="bg-[#212121] text-white p-12 border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black mb-4">{summary.projectName}</h1>
        <p className="text-xl text-gray-300 mb-8">{summary.description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white text-black px-4 py-2 border-2 border-black">
            <span className="font-bold">Timeline:</span> {summary.timeline}
          </div>
          <div className="bg-[#FF6B35] text-white px-4 py-2 border-2 border-black">
            <span className="font-bold">Investment:</span> £{investment.developmentCost.toLocaleString()}
          </div>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Executive Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <InfoBlock 
            label="Target Market" 
            value={summary.targetMarket}
            icon="🎯"
          />
          <InfoBlock 
            label="Main Goal" 
            value={summary.mainGoal}
            icon="🎪"
          />
          <InfoBlock 
            label="Timeline" 
            value={summary.timeline}
            icon="⏱️"
          />
          <InfoBlock 
            label="Success Metric" 
            value={summary.keyOutcome}
            icon="📊"
          />
        </div>
      </motion.section>

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
              £{investment.developmentCost.toLocaleString()}
            </div>
            <div className="space-y-3">
              {investment.weeklyBreakdown.map((week) => (
                <div key={week.week} className="flex justify-between items-center p-2 bg-white border border-gray-300">
                  <span className="font-semibold">Week {week.week}</span>
                  <span className="font-mono">£{week.cost.toLocaleString()}</span>
                </div>
              ))}
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

      {/* User Capabilities */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">MVP Features</h2>
        <p className="text-gray-600 mb-6">Your users will be able to:</p>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {userCapabilities.map((capability, idx) => (
            <motion.div 
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.03 }}
            >
              <span className="text-[#00C851] text-xl mt-0.5">●</span>
              <span className="text-gray-800">{capability}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Technical Architecture</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <TechItem label="Frontend" value={techStack.frontend} />
          <TechItem label="Backend" value={techStack.backend} />
          <TechItem label="Database" value={techStack.database} />
          <TechItem label="Hosting" value={techStack.infrastructure} />
        </div>

        <div className="bg-gray-50 p-6 border-2 border-black">
          <h3 className="font-bold mb-3 uppercase">Integrations & APIs</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.apis.map((api, idx) => (
              <span key={idx} className="px-3 py-1 bg-white border-2 border-black text-sm font-medium">
                {api}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Development Timeline */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">4-Week Development Sprint</h2>
        
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

      {/* CTA Section */}
      <motion.section 
        className="bg-[#212121] text-white p-12 text-center border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] print:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your MVP?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          This blueprint gives you everything you need to go from idea to launch in 4 weeks. 
          Let's make it happen together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="large" intent="cta" onClick={() => window.location.href = 'mailto:team@deployai.com'}>
            Start Building Today
          </Button>
          <Button size="large" intent="secondary" onClick={() => window.print()}>
            Download Blueprint PDF
          </Button>
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