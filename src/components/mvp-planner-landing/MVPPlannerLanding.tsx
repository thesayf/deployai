import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { SectionWrapper } from '@/components/section-wrapper';

// Icons
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#00C851"/>
    <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FreeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFB300" stroke="#000" strokeWidth="2"/>
    <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">$0</text>
  </svg>
);

const ReportIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#457B9D" stroke="#000" strokeWidth="2"/>
    <path d="M8 12h8M8 8h8M8 16h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="18" r="4" fill="#FF6B35" stroke="#000" strokeWidth="2"/>
    <path d="M18 16v4M16 18h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface MVPPlannerLandingProps {
  onStartPlanner: () => void;
}

// MVP Planning categories
const categories = [
  {
    title: "Project Scope & Requirements",
    description: "Define your MVP features and technical requirements"
  },
  {
    title: "Timeline & Development Phases",
    description: "Get realistic estimates for building and launching your product"
  },
  {
    title: "Budget & Resource Planning",
    description: "Understand costs and resource needs for your MVP"
  },
  {
    title: "Technical Architecture",
    description: "Receive recommendations for tech stack and infrastructure"
  }
];

export const MVPPlannerLanding: React.FC<MVPPlannerLandingProps> = ({ 
  onStartPlanner 
}) => {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper variant="dark" spacing="none">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
              From Idea to Launch in Record Time
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
              Plan Your MVP Development
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
              Get a personalized roadmap for building your minimum viable product.
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Our MVP planner helps you scope, prioritize, and budget for your product launch. 
              Answer a few questions about your project to receive customized recommendations 
              for development approach, timeline, and technical requirements.
            </p>
            <Button 
              size="large" 
              intent="cta"
              onClick={onStartPlanner}
              className="transform hover:scale-105 transition-all"
            >
              Start Planning Your MVP
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              <img 
                src="/images/mvp-estimator-4.png" 
                alt="AI MVP Cost Analyzer Report"
                className="w-full h-auto rounded-lg border-3 border-black"
              />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper variant="default" spacing="large">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Your Planning Works</h2>
          <h3 className="text-xl text-gray-700 mb-8">
            Quick assessment. Clear roadmap. Faster launch.
          </h3>
          <p className="text-lg text-gray-600 mb-12">
            We'll analyze your project requirements and provide actionable recommendations 
            for building a successful MVP that validates your idea quickly and efficiently.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-3xl mx-auto">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-white flex items-center justify-center">
                <ClockIcon className="w-24 h-24" />
              </div>
              <h3 className="font-black text-xl mb-2">Answer Questions</h3>
              <p className="text-gray-600">Share your project details</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-white flex items-center justify-center">
                <FreeIcon className="w-24 h-24" />
              </div>
              <h3 className="font-black text-xl mb-2">Get Analysis</h3>
              <p className="text-gray-600">Receive instant insights</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-white flex items-center justify-center">
                <ReportIcon className="w-24 h-24" />
              </div>
              <h3 className="font-black text-xl mb-2">Receive Plan</h3>
              <p className="text-gray-600">Custom MVP roadmap</p>
            </motion.div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Process Overview */}
      <SectionWrapper variant="concrete" spacing="large">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What We'll Help You Plan</h2>
          <h3 className="text-xl text-gray-700 text-center mb-12">
            Everything you need to launch successfully.
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{category.title}</h4>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper variant="default" spacing="large">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Ready to Build Your MVP?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join hundreds of founders who've successfully launched their products with our proven planning framework. 
            Get started in minutes.
          </p>
          <Button 
            size="large" 
            intent="cta"
            onClick={onStartPlanner}
            className="transform hover:scale-105 transition-all"
          >
            Get Your MVP Roadmap →
          </Button>
        </motion.div>
      </SectionWrapper>
    </>
  );
};