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
        <div className="md:min-h-screen md:flex md:items-center py-8 md:py-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
            <p className="text-xs md:text-sm font-semibold text-gray-400 mb-3 md:mb-4 uppercase tracking-wide">
              Based on McKinsey, BCG & Deloitte Frameworks
            </p>
            <h1 className="text-2xl md:text-4xl font-black mb-3 leading-tight text-white">
              Feeling Frustrated That Your Competitors Are Already Using AI to Steal Market Share?
            </h1>
            <h2 className="text-base md:text-xl font-semibold text-[#FF6B35] mb-5 md:mb-6">
              Answer 17 questions to find out where you're falling behind.
            </h2>
            
            <div className="space-y-3 mb-5 md:mb-6">
              <div className="flex items-start">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 mt-0.5 text-[#FF6B35] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm md:text-base">
                  <span className="font-bold text-white block md:inline">Revenue Vulnerability:</span>
                  <span className="text-gray-300 block md:inline md:ml-1">How much profit you're losing to AI-powered competitors</span>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 mt-0.5 text-[#FF6B35] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm md:text-base">
                  <span className="font-bold text-white block md:inline">Competitive Threats:</span>
                  <span className="text-gray-300 block md:inline md:ml-1">Which competitors are using AI to steal your customers</span>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 mt-0.5 text-[#FF6B35] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm md:text-base">
                  <span className="font-bold text-white block md:inline">60-Day Quick Wins:</span>
                  <span className="text-gray-300 block md:inline md:ml-1">AI tools you can deploy immediately for measurable impact</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <Button 
                size="large" 
                intent="cta"
                onClick={handleStartAssessment}
                className="transform hover:scale-105 transition-all w-full text-sm md:text-base"
              >
                START YOUR FREE AI ASSESSMENT
              </Button>
              <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  17 questions
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  &lt; 6 minutes
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant results
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  750+ leaders
                </div>
              </div>
            </div>
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

      {/* Authority & Credibility Section */}
      <SectionWrapper variant="warmPeach" spacing="large">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built by AI Transformation Experts</h2>
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team has led AI initiatives at Fortune 500 companies and advised over 100 organizations 
                  on their digital transformation journeys.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This assessment framework is based on analysis of <strong>100+ enterprise AI transformations</strong>, 
                  incorporating best practices from McKinsey's AI Maturity Model, BCG's AI Strategy Framework, 
                  and Deloitte's Cognitive Enterprise methodology.
                </p>
              </div>
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-start gap-3">
                  <div className="text-4xl text-orange-500">❝</div>
                  <div>
                    <p className="text-gray-700 italic mb-3">
                      "I took the assessment expecting generic advice, but was surprised by how specific 
                      the recommendations were to our industry. The roadmap highlighted 3 AI opportunities 
                      I hadn't even considered. We're implementing the first one now."
                    </p>
                    <p className="font-bold">Sarah Chen</p>
                    <p className="text-sm text-gray-600">Operations Director, Manufacturing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-xl mb-4">Research Foundation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>100+ enterprise AI implementations analyzed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>38 countries represented in our data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>750+ assessments completed to date</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Updated quarterly with latest AI trends</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <h3 className="font-bold text-xl mb-3">Quick Assessment Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-sm opacity-90">Find it valuable</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">6 min</p>
                    <p className="text-sm opacity-90">Average time</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">17</p>
                    <p className="text-sm opacity-90">Questions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">$0</p>
                    <p className="text-sm opacity-90">Always free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper variant="concrete" spacing="large">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Leaders Say About The Assessment</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The assessment pinpointed exactly where we were behind competitors. 
                The 90-day roadmap was so detailed, we started implementing it the next day."
              </p>
              <p className="font-bold">Michael Torres</p>
              <p className="text-sm text-gray-600">CEO, Retail Chain</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Skeptical at first, but the questions were surprisingly sophisticated. 
                The report identified our data silos as the #1 blocker - exactly right."
              </p>
              <p className="font-bold">Jessica Park</p>
              <p className="text-sm text-gray-600">CTO, FinTech Startup</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Used this to justify our AI budget to the board. The competitive analysis 
                section was particularly compelling. Got approval within a week."
              </p>
              <p className="font-bold">David Kumar</p>
              <p className="text-sm text-gray-600">VP Operations, Healthcare</p>
            </motion.div>
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