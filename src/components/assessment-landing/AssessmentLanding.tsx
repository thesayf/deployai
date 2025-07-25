import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store';
import { openEmailModal } from '@/store/slices/quizSlice';
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

interface AssessmentLandingProps {
  onStartAssessment?: () => void;
}

// Assessment categories
const categories = [
  {
    title: "Strategic Alignment & Business Impact",
    description: "Identify your highest-value AI opportunities based on strategic priorities"
  },
  {
    title: "Data Maturity & Infrastructure",
    description: "Evaluate data quality, accessibility, and technical readiness for AI"
  },
  {
    title: "Operational Efficiency & Process Automation",
    description: "Uncover friction points and repetitive tasks prime for AI transformation"
  },
  {
    title: "Organizational Readiness & Change Capacity",
    description: "Assess cultural factors and resources critical for successful AI adoption"
  }
];

export const AssessmentLanding: React.FC<AssessmentLandingProps> = ({ 
  onStartAssessment 
}) => {
  const dispatch = useAppDispatch();
  
  const handleStartAssessment = () => {
    if (onStartAssessment) {
      onStartAssessment();
    } else {
      dispatch(openEmailModal());
    }
  };

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
              Based on McKinsey, BCG & Deloitte Frameworks
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
              Discover Your AI Transformation Potential
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
              Used by 750+ leaders across 38 countries to identify high-impact AI opportunities.
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Our assessment applies the same multi-dimensional frameworks used by top consulting 
              firms to evaluate your business across strategy, data readiness, operations, and culture. 
              Get an enterprise-grade analysis in just 3 minutes.
            </p>
            <Button 
              size="large" 
              intent="cta"
              onClick={handleStartAssessment}
              className="transform hover:scale-105 transition-all"
            >
              Start Assessment
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/images/ai-blueprint.png" 
              alt="AI Strategy Blueprint - Your Custom Implementation Roadmap"
              className="w-full h-auto max-w-md mx-auto"
            />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Your Assessment Works</h2>
          <h3 className="text-xl text-gray-700 mb-8">
            5-6 minutes. 17 questions. Your complete AI roadmap.
          </h3>
          <p className="text-lg text-gray-600 mb-12">
            We'll analyze your business across 4 critical dimensions to identify exactly where AI 
            can deliver the highest impact and ROI for your specific situation.
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
              <h3 className="font-black text-xl mb-2">Take Assessment</h3>
              <p className="text-gray-600">Answer 14 quick questions</p>
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
              <h3 className="font-black text-xl mb-2">Get Instant Score</h3>
              <p className="text-gray-600">See your AI readiness rating</p>
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
              <h3 className="font-black text-xl mb-2">Receive Roadmap</h3>
              <p className="text-gray-600">Custom AI implementation plan</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The 4-Pillar AI Readiness Framework</h2>
          <h3 className="text-xl text-gray-700 text-center mb-12">
            Validated across 100+ enterprise AI transformations.
          </h3>
          
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our multi-dimensional scoring system benchmarks your organization against industry leaders, 
            revealing precisely where AI can deliver the highest ROI for your business.
          </p>
          
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
            Join 750+ Leaders Who've Unlocked Their AI Potential
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Companies using our framework report 30% faster AI deployment and 2.5x higher success rates. 
            Your competitors might already be ahead.
          </p>
          <Button 
            size="large" 
            intent="cta"
            onClick={handleStartAssessment}
            className="transform hover:scale-105 transition-all"
          >
            Get Your AI Readiness Score →
          </Button>
        </motion.div>
      </SectionWrapper>
    </>
  );
};