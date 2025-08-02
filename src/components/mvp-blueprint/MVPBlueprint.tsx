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
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">Your MVP Blueprint</h1>
        <p className="text-xl text-gray-600">Everything you need to build and launch in 4 weeks</p>
      </motion.div>

      {/* 1. Executive Summary Section */}
      <motion.section 
        className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="text-3xl mr-3">📋</span> Executive Summary
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-3xl font-black mb-2">{summary.projectName}</h3>
            <p className="text-lg text-gray-700">{summary.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-black">
                <p className="font-semibold text-sm uppercase text-gray-600 mb-1">Target Market</p>
                <p className="text-lg">{summary.targetMarket}</p>
              </div>
              <div className="p-4 bg-green-50 border-2 border-black">
                <p className="font-semibold text-sm uppercase text-gray-600 mb-1">Main Goal</p>
                <p className="text-lg">{summary.mainGoal}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border-2 border-black">
                <p className="font-semibold text-sm uppercase text-gray-600 mb-1">Timeline</p>
                <p className="text-lg font-bold">{summary.timeline}</p>
              </div>
              <div className="p-4 bg-purple-50 border-2 border-black">
                <p className="font-semibold text-sm uppercase text-gray-600 mb-1">Key Outcome</p>
                <p className="text-lg">{summary.keyOutcome}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Investment Breakdown */}
      <motion.section 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Development Cost */}
        <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            💰 Development Investment
          </h3>
          <div className="text-3xl font-black mb-4 text-green-600">
            £{investment.developmentCost.toLocaleString()}
          </div>
          <div className="space-y-3">
            {investment.weeklyBreakdown.map((week) => (
              <div key={week.week} className="flex justify-between items-center p-2 bg-gray-50">
                <span className="font-semibold">Week {week.week}</span>
                <span className="font-mono">£{week.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Running Costs */}
        <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            🔄 Monthly Running Costs
          </h3>
          <div className="text-3xl font-black mb-4 text-orange-600">
            £{investment.monthlyRunningCosts.min} - £{investment.monthlyRunningCosts.max}
          </div>
          <div className="space-y-2">
            {investment.monthlyRunningCosts.breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between p-2 bg-gray-50">
                <span>{item.item}</span>
                <span className="font-mono">{item.cost}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-300">
            <p className="text-sm font-semibold">Cost per user: {investment.costPerUser}</p>
          </div>
        </div>
      </motion.section>

      {/* 3. User Capabilities Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">🚀 What Your Users Will Be Able To Do</h2>
        <div className="bg-white p-6 border-3 border-black">
          <div className="grid md:grid-cols-2 gap-3">
            {userCapabilities.map((capability, idx) => (
              <motion.div 
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 border-2 border-black hover:bg-yellow-50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
              >
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-800">{capability}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Tech Stack */}
      <motion.section 
        className="bg-[#212121] text-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">🛠️ Recommended Tech Stack</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <TechCard title="Frontend" tech={techStack.frontend} icon="🎨" />
          <TechCard title="Backend" tech={techStack.backend} icon="⚙️" />
          <TechCard title="Database" tech={techStack.database} icon="🗄️" />
          <TechCard title="Infrastructure" tech={techStack.infrastructure} icon="☁️" />
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white text-black p-4 border-3 border-black h-full">
              <h4 className="font-bold mb-2 flex items-center">
                <span className="text-2xl mr-2">🤖</span> APIs & AI Models
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.apis.map((api, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 border-2 border-black text-sm font-semibold">
                    {api}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why This Stack */}
        <div className="bg-white text-black p-6 border-3 border-black">
          <h3 className="text-xl font-bold mb-4">Why This Technology Stack?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StackBenefit icon="⚡" title="Rapid Development" />
            <StackBenefit icon="🛡️" title="Type Safety" />
            <StackBenefit icon="🔄" title="Real-time Features" />
            <StackBenefit icon="📈" title="Scalability" />
            <StackBenefit icon="💻" title="Developer Experience" />
            <StackBenefit icon="💰" title="Cost Effective" />
          </div>
        </div>
      </motion.section>

      {/* 5. Timeline */}
      <motion.section 
        className="bg-gradient-to-r from-orange-100 to-red-100 p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">📅 4-Week Sprint Timeline</h2>
        
        <div className="space-y-6">
          {timeline.map((week, idx) => (
            <motion.div 
              key={week.week}
              className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
                  {week.week}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                  <p className="text-gray-600 mb-3">{week.description}</p>
                  <div className="space-y-1">
                    {week.deliverables.map((deliverable, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
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
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your MVP?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
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
const TechCard: React.FC<{ title: string; tech: string; icon: string }> = ({ title, tech, icon }) => (
  <div className="bg-white text-black p-4 border-3 border-black">
    <h4 className="font-bold mb-2 flex items-center">
      <span className="text-2xl mr-2">{icon}</span> {title}
    </h4>
    <p className="font-mono text-lg">{tech}</p>
  </div>
);

const StackBenefit: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-black">
    <span className="text-2xl">{icon}</span>
    <span className="font-semibold">{title}</span>
  </div>
);