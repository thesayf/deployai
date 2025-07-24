import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyModal } from '../case-studies/CaseStudyModal';
import { ChatbotMockup } from '../case-studies/ChatbotMockup';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Icon components
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

interface CaseStudyData {
  id: string;
  service: string;
  metric: string;
  subMetric: string;
  orderCount: string;
  description: string;
  bgUrl: string;
  company: string;
  industry: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  testimonial: string;
  testimonialAuthor: string;
  category: "software" | "automation" | "ai" | "webapp";
  // New fields for conversion optimization
  rating?: number;
  beforeAfterData?: { before: string; after: string; metric: string };
  roi?: string;
}

interface CaseStudiesOptimizedProps {
  title?: string;
  subtitle?: string;
  variant?: 'data-focused' | 'testimonial-first' | 'before-after' | 'minimal-distraction' | 'personalized' | 'image-showcase' | 'image-testimonial';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  filter?: "all" | "software" | "automation" | "ai" | "webapp";
  className?: string;
}

// Enhanced case studies data with conversion optimization fields
const CASE_STUDIES_DATA: CaseStudyData[] = [
  {
    id: "jb-luxury-detailing",
    service: "Custom CRM + AI Chatbot",
    metric: "300%",
    subMetric: "booking increase",
    orderCount: "24/7",
    description: "AI chatbot handles inquiries and books appointments 24/7",
    bgUrl: "chatbot-mockup",
    company: "JB Luxury Mobile Detailing",
    industry: "Automotive Services",
    timeline: "3 weeks implementation",
    challenge:
      "Manual phone booking system was missing 60% of potential customers who called outside business hours. No customer relationship management led to missed follow-ups and repeat business opportunities.",
    solution:
      "Built intelligent chatbot integrated with custom CRM to handle bookings 24/7, qualify leads, provide instant quotes, and automatically schedule services based on availability and location.",
    results: [
      "300% increase in successful bookings",
      "24/7 availability captures after-hours customers",
      "85% of customer inquiries handled automatically",
      "Average response time reduced from 4 hours to 30 seconds",
      "40% increase in repeat customer bookings through automated follow-ups",
    ],
    techStack: [
      "React",
      "Node.js",
      "OpenAI GPT-4",
      "Stripe API",
      "Google Calendar API",
      "Twilio",
    ],
    testimonial:
      "This chatbot works better than having a full-time receptionist. It books appointments while I sleep and my customers love the instant responses. Revenue has tripled since deployment.",
    testimonialAuthor: "James Butler, Owner of JB Luxury Detailing",
    category: "software",
    rating: 4.9,
    beforeAfterData: { 
      before: "20 bookings/month", 
      after: "80 bookings/month", 
      metric: "Monthly Bookings" 
    },
    roi: "320% ROI in 6 months",
  },
  {
    id: "showcase-cinema-scheduling",
    service: "AI Cinema Scheduling",
    metric: "95%",
    subMetric: "time reduction",
    orderCount: "40+",
    description: "AI-powered scheduling platform automates cinema operations",
    bgUrl: "/schomee.png",
    company: "Showcase Cinemas",
    industry: "Entertainment & Media",
    timeline: "4 weeks implementation",
    challenge:
      "Manual scheduling process consumed 40+ hours weekly, frequently invalidated by real-time performance data. Critical Monday morning reschedules across multiple locations were impossible to execute effectively at scale.",
    solution:
      "Built intelligent scheduling platform powered by Anthropic AI that processes historical data, release projections, and real-time performance metrics to generate optimized schedules for all cinema locations in seconds.",
    results: [
      "95% reduction in scheduling time - from 40+ hours to under 2 hours",
      "18% increase in average revenue per screen through optimization",
      "Real-time adaptability - instant schedule regeneration",
      "100% data-driven decisions eliminate guesswork",
      "Multi-site scalability across all cinema locations",
      "Enhanced customer satisfaction through better film placement",
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Anthropic Claude API",
      "PostgreSQL",
      "AWS",
    ],
    testimonial:
      "The platform transformed our entire operation. What used to take our team a full week now happens automatically in minutes. The revenue optimization features alone paid for the system within the first month.",
    testimonialAuthor: "Sarah Johnson, Operations Director at Showcase Cinemas",
    category: "ai",
    rating: 5.0,
    beforeAfterData: { 
      before: "40 hours/week", 
      after: "2 hours/week", 
      metric: "Scheduling Time" 
    },
    roi: "Paid for itself in 1 month",
  },
  {
    id: "centric-research-platform",
    service: "AI Research Platform",
    metric: "15 min",
    subMetric: "proposal generation",
    orderCount: "£150K+",
    description:
      "Community research platform accelerates proposal creation and knowledge sharing",
    bgUrl: "centric-mockup",
    company: "Centric",
    industry: "Community Research & Development",
    timeline: "5 weeks implementation",
    challenge:
      "Manual proposal creation process taking 3-4 weeks per submission, difficulty accessing and aggregating insights from 50+ past community engagement projects, and challenges ensuring authentic community voice integration in research proposals.",
    solution:
      "Built AI-powered research platform with intelligent knowledge base, automated proposal generation using proven templates, and collaborative review workspace ensuring community member participation in all research activities.",
    results: [
      "Proposal generation time reduced from 4 weeks to 15 minutes",
      "Instant access to 50+ past community project insights",
      "100% community voice integration through collaborative review",
      "£150K+ proposals generated with automated budget allocation",
      "Real-time collaboration between community and institutional partners",
    ],
    techStack: [
      "React",
      "Node.js",
      "OpenAI GPT-4",
      "PostgreSQL",
      "WebSockets",
      "Stripe API",
    ],
    testimonial:
      "The platform has transformed how we approach community research. What used to take weeks of manual work now happens in minutes, while ensuring authentic community participation throughout the entire process.",
    testimonialAuthor: "Dr. Sarah Williams, Research Director at Centric",
    category: "software",
    rating: 4.8,
    beforeAfterData: { 
      before: "4 weeks", 
      after: "15 minutes", 
      metric: "Proposal Time" 
    },
    roi: "£500K+ in grants secured",
  },
];

export const CaseStudiesOptimized: React.FC<CaseStudiesOptimizedProps> = ({
  title = "Proven Results That Drive Growth",
  subtitle = "Data-backed success stories from businesses like yours",
  variant = 'data-focused',
  accentColor = 'orange',
  filter = 'all',
  className = '',
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Map accent colors
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed,
  };
  const currentAccent = accentColors[accentColor];

  const filteredCaseStudies = filter === 'all' 
    ? CASE_STUDIES_DATA 
    : CASE_STUDIES_DATA.filter(cs => cs.category === filter);

  const handleCaseStudyClick = (caseStudy: CaseStudyData) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const renderCaseStudyCard = (caseStudy: CaseStudyData, index: number) => {
    // Data-Focused Variant (Based on research: Focus on specific results)
    if (variant === 'data-focused') {
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer h-full"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            className="h-full flex flex-col"
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = `8px 8px 0px ${colors.black}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
            }}
          >
            {/* Key Metric Hero */}
            <div
              style={{
                background: `linear-gradient(135deg, ${currentAccent}, ${colors.crimsonRed})`,
                color: colors.white,
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div className="text-5xl font-black mb-2">{caseStudy.metric}</div>
              <div className="text-lg uppercase tracking-wider">{caseStudy.subMetric}</div>
            </div>

            {/* Company & Service */}
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-2 mb-4">
                {caseStudy.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        style={{ 
                          color: i < Math.floor(caseStudy.rating!) ? colors.amber : colors.steel 
                        }}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-sm ml-1" style={{ color: colors.graphite }}>
                      ({caseStudy.rating})
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black mb-2">{caseStudy.company}</h3>
              <p className="text-sm mb-4" style={{ color: colors.graphite }}>
                {caseStudy.service} • {caseStudy.timeline}
              </p>

              {/* Key Results Preview */}
              <div className="space-y-2 mb-6">
                {caseStudy.results.slice(0, 3).map((result, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span style={{ color: colors.emerald }}>
                      <CheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    </span>
                    <span className="text-sm" style={{ color: colors.charcoal }}>{result}</span>
                  </div>
                ))}
              </div>

              {/* ROI Badge */}
              {caseStudy.roi && (
                <div
                  className="inline-block mb-4"
                  style={{
                    background: colors.emerald,
                    color: colors.white,
                    padding: '8px 16px',
                    border: `2px solid ${colors.black}`,
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {caseStudy.roi}
                </div>
              )}
            </div>

            {/* CTA */}
            <div
              style={{
                background: colors.black,
                color: colors.white,
                padding: '20px',
                textAlign: 'center',
                borderTop: `3px solid ${colors.black}`,
              }}
            >
              <span className="font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                View Full Case Study
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>
      );
    }

    // Testimonial-First Variant (Based on research: Social proof emphasis)
    if (variant === 'testimonial-first') {
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
              overflow: 'hidden',
            }}
          >
            {/* Testimonial Quote */}
            <div
              style={{
                background: colors.concrete,
                padding: '32px',
                borderBottom: `3px solid ${colors.black}`,
              }}
            >
              <div className="text-4xl font-black mb-4" style={{ color: currentAccent }}>"</div>
              <p className="text-lg mb-4" style={{ color: colors.black, fontStyle: 'italic' }}>
                {caseStudy.testimonial}
              </p>
              <p className="font-bold" style={{ color: colors.charcoal }}>
                — {caseStudy.testimonialAuthor}
              </p>
            </div>

            {/* Results */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-black" style={{ color: currentAccent }}>
                    {caseStudy.metric}
                  </div>
                  <div className="text-sm uppercase" style={{ color: colors.graphite }}>
                    {caseStudy.subMetric}
                  </div>
                </div>
                {caseStudy.roi && (
                  <div>
                    <div className="text-3xl font-black" style={{ color: colors.emerald }}>
                      {caseStudy.roi.split(' ')[0]}
                    </div>
                    <div className="text-sm uppercase" style={{ color: colors.graphite }}>
                      Return on Investment
                    </div>
                  </div>
                )}
              </div>

              <button
                className="w-full font-bold uppercase tracking-wider"
                style={{
                  background: colors.black,
                  color: colors.white,
                  padding: '16px',
                  border: `3px solid ${colors.black}`,
                }}
              >
                Read Success Story
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Before-After Variant (Based on research: Show transformation clearly)
    if (variant === 'before-after') {
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
            }}
          >
            {/* Company Header */}
            <div className="p-6 pb-0">
              <h3 className="text-2xl font-black mb-2">{caseStudy.company}</h3>
              <p className="text-sm mb-6" style={{ color: colors.graphite }}>
                {caseStudy.service}
              </p>
            </div>

            {/* Before/After Comparison */}
            {caseStudy.beforeAfterData && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    style={{
                      background: colors.steel,
                      padding: '24px',
                      textAlign: 'center',
                      border: `2px solid ${colors.black}`,
                    }}
                  >
                    <div className="text-xs uppercase mb-2" style={{ color: colors.charcoal }}>
                      Before
                    </div>
                    <div className="text-2xl font-black" style={{ color: colors.black }}>
                      {caseStudy.beforeAfterData.before}
                    </div>
                  </div>
                  <div
                    style={{
                      background: currentAccent,
                      color: colors.white,
                      padding: '24px',
                      textAlign: 'center',
                      border: `2px solid ${colors.black}`,
                      boxShadow: `3px 3px 0px ${colors.black}`,
                    }}
                  >
                    <div className="text-xs uppercase mb-2">After</div>
                    <div className="text-2xl font-black">
                      {caseStudy.beforeAfterData.after}
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4 text-sm font-bold uppercase" style={{ color: colors.graphite }}>
                  {caseStudy.beforeAfterData.metric}
                </p>
              </div>
            )}

            {/* Impact Summary */}
            <div
              style={{
                background: colors.concrete,
                padding: '20px',
                borderTop: `3px solid ${colors.black}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black" style={{ color: currentAccent }}>
                    {caseStudy.metric}
                  </div>
                  <div className="text-sm uppercase" style={{ color: colors.graphite }}>
                    {caseStudy.subMetric}
                  </div>
                </div>
                <ArrowRightIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Minimal Distraction Variant (Based on research: Minimize distractions)
    if (variant === 'minimal-distraction') {
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="cursor-pointer"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            className="p-8"
            style={{
              background: colors.white,
              border: `2px solid ${colors.steel}`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `2px solid ${currentAccent}`;
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = `2px solid ${colors.steel}`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Single Focus Metric */}
            <div className="text-center mb-6">
              <div className="text-5xl font-black mb-2" style={{ color: currentAccent }}>
                {caseStudy.metric}
              </div>
              <div className="text-lg" style={{ color: colors.charcoal }}>
                {caseStudy.subMetric}
              </div>
            </div>

            {/* Company */}
            <h3 className="text-xl font-bold text-center mb-4">{caseStudy.company}</h3>

            {/* Single CTA */}
            <button
              className="w-full font-bold uppercase tracking-wider"
              style={{
                background: currentAccent,
                color: colors.white,
                padding: '16px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.black;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = currentAccent;
              }}
            >
              Learn How
            </button>
          </div>
        </motion.div>
      );
    }

    // Personalized Variant (Based on research: AI-driven personalization)
    if (variant === 'personalized') {
      const relevanceScore = Math.random() > 0.5 ? 'Most Relevant' : 'Recommended';
      
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer relative"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          {/* Relevance Badge */}
          {index === 0 && (
            <div
              className="absolute -top-3 -right-3 z-10"
              style={{
                background: colors.emerald,
                color: colors.white,
                padding: '6px 16px',
                border: `2px solid ${colors.black}`,
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: `3px 3px 0px ${colors.black}`,
              }}
            >
              {relevanceScore}
            </div>
          )}

          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
              overflow: 'hidden',
            }}
          >
            {/* Industry Match Indicator */}
            <div
              style={{
                background: colors.concrete,
                padding: '12px 20px',
                borderBottom: `3px solid ${colors.black}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase" style={{ color: colors.charcoal }}>
                  {caseStudy.industry}
                </span>
                <span className="text-sm" style={{ color: colors.graphite }}>
                  Similar to your business
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-black mb-4">{caseStudy.company}</h3>
              
              {/* Problem-Solution Match */}
              <div className="mb-6">
                <div className="mb-4">
                  <div className="text-sm uppercase font-bold mb-2" style={{ color: colors.graphite }}>
                    Challenge
                  </div>
                  <p className="text-sm" style={{ color: colors.charcoal }}>
                    {caseStudy.challenge.substring(0, 100)}...
                  </p>
                </div>
                
                <div>
                  <div className="text-sm uppercase font-bold mb-2" style={{ color: colors.graphite }}>
                    Solution
                  </div>
                  <p className="text-sm" style={{ color: colors.charcoal }}>
                    {caseStudy.solution.substring(0, 100)}...
                  </p>
                </div>
              </div>

              {/* Outcome */}
              <div
                className="text-center"
                style={{
                  background: currentAccent,
                  color: colors.white,
                  padding: '20px',
                  marginLeft: '-24px',
                  marginRight: '-24px',
                  marginBottom: '-24px',
                }}
              >
                <div className="text-3xl font-black mb-1">{caseStudy.metric}</div>
                <div className="text-sm uppercase">{caseStudy.subMetric}</div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Image Showcase Variant (Based on research: Visual engagement)
    if (variant === 'image-showcase') {
      const isCustomMockup = caseStudy.bgUrl === 'chatbot-mockup' || caseStudy.bgUrl === 'centric-mockup';
      
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
              overflow: 'hidden',
            }}
          >
            {/* Image Section with Overlay Data */}
            <div 
              className="relative h-80"
              style={{
                borderBottom: `3px solid ${colors.black}`,
              }}
            >
              {isCustomMockup ? (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
                  <div className="scale-50 transform">
                    {caseStudy.bgUrl === 'chatbot-mockup' ? (
                      <ChatbotMockup />
                    ) : (
                      <img
                        src="/images/centric2.png"
                        alt="Centric Proposal Generator"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <img
                  src={caseStudy.bgUrl}
                  alt={caseStudy.company}
                  className="h-full w-full object-cover"
                />
              )}
              
              {/* Overlay Content */}
              <div 
                className="absolute inset-0 flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)',
                }}
              >
                {/* Top Badge */}
                <div className="p-6">
                  {caseStudy.rating && (
                    <div 
                      className="inline-flex items-center gap-2"
                      style={{
                        background: colors.white,
                        padding: '8px 16px',
                        border: `2px solid ${colors.black}`,
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                          style={{ 
                            color: i < Math.floor(caseStudy.rating!) ? colors.amber : colors.steel 
                          }}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-sm font-bold">{caseStudy.rating}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Content */}
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-black mb-2">{caseStudy.company}</h3>
                  <p className="text-sm opacity-90 mb-4">{caseStudy.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-4xl font-black">{caseStudy.metric}</div>
                      <div className="text-sm uppercase opacity-80">{caseStudy.subMetric}</div>
                    </div>
                    {caseStudy.roi && (
                      <div
                        style={{
                          background: colors.emerald,
                          padding: '8px 16px',
                          border: `2px solid ${colors.white}`,
                        }}
                      >
                        <div className="text-sm font-bold uppercase">{caseStudy.roi}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Bar */}
            <div
              style={{
                background: currentAccent,
                color: colors.white,
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <span className="font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                View Full Case Study
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>
      );
    }

    // Image + Testimonial Variant (Based on research: Combined impact)
    if (variant === 'image-testimonial') {
      const isCustomMockup = caseStudy.bgUrl === 'chatbot-mockup' || caseStudy.bgUrl === 'centric-mockup';
      
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            className="grid md:grid-cols-2 overflow-hidden"
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
            }}
          >
            {/* Image Side */}
            <div 
              className="relative h-64 md:h-auto"
              style={{
                borderRight: `3px solid ${colors.black}`,
              }}
            >
              {isCustomMockup ? (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
                  <div className="scale-50 transform">
                    {caseStudy.bgUrl === 'chatbot-mockup' ? (
                      <ChatbotMockup />
                    ) : (
                      <img
                        src="/images/centric2.png"
                        alt="Centric Proposal Generator"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <img
                  src={caseStudy.bgUrl}
                  alt={caseStudy.company}
                  className="h-full w-full object-cover"
                />
              )}
              
              {/* Metric Overlay */}
              <div
                className="absolute bottom-4 left-4"
                style={{
                  background: currentAccent,
                  color: colors.white,
                  border: `3px solid ${colors.black}`,
                  padding: '16px 24px',
                  boxShadow: `4px 4px 0px ${colors.black}`,
                }}
              >
                <div className="text-3xl font-black">{caseStudy.metric}</div>
                <div className="text-sm uppercase">{caseStudy.subMetric}</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 flex flex-col justify-between">
              {/* Testimonial */}
              <div>
                <div className="text-3xl font-black mb-4" style={{ color: currentAccent }}>
                  "
                </div>
                <p className="text-lg mb-4" style={{ fontStyle: 'italic' }}>
                  {caseStudy.testimonial}
                </p>
                <p className="font-bold mb-6" style={{ color: colors.charcoal }}>
                  — {caseStudy.testimonialAuthor}
                </p>
              </div>

              {/* Stats */}
              {caseStudy.beforeAfterData && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div
                    style={{
                      background: colors.concrete,
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="text-xs uppercase mb-1" style={{ color: colors.graphite }}>
                      Before
                    </div>
                    <div className="font-bold">{caseStudy.beforeAfterData.before}</div>
                  </div>
                  <div
                    style={{
                      background: currentAccent,
                      color: colors.white,
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="text-xs uppercase mb-1">After</div>
                    <div className="font-bold">{caseStudy.beforeAfterData.after}</div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                className="w-full font-bold uppercase tracking-wider"
                style={{
                  background: colors.black,
                  color: colors.white,
                  padding: '16px',
                }}
              >
                Read Full Story
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  const renderContent = () => {
    // Add filtering tabs for better UX (based on research)
    const categories = ['all', 'software', 'ai', 'automation'];
    
    return (
      <>
        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `4px 4px 0px ${colors.black}`,
              display: 'inline-flex',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '12px 24px',
                  background: activeTab === cat ? currentAccent : colors.white,
                  color: activeTab === cat ? colors.white : colors.black,
                  borderRight: cat !== categories[categories.length - 1] ? `3px solid ${colors.black}` : 'none',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className={`grid gap-8 ${
          variant === 'minimal-distraction' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
            : variant === 'image-testimonial'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredCaseStudies
            .filter(cs => activeTab === 'all' || cs.category === activeTab)
            .map(renderCaseStudyCard)}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span style={{ color: currentAccent }}>
                <ClockIcon className="w-5 h-5" />
              </span>
              <span className="font-bold">Average 4-week delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: colors.emerald }}>
                <CheckIcon className="w-5 h-5" />
              </span>
              <span className="font-bold">100% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: currentAccent }}>
                <ChartIcon className="w-5 h-5" />
              </span>
              <span className="font-bold">Measurable ROI</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Header with clear value proposition */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4"
          style={{
            color: colors.black,
            textShadow: `4px 4px 0px ${currentAccent}`,
          }}
        >
          {title}
        </h2>
        <p 
          className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
          style={{ color: colors.charcoal }}
        >
          {subtitle}
        </p>

        {/* Social Proof Summary */}
        <div className="flex justify-center gap-8 mb-8">
          <div>
            <div className="text-3xl font-black" style={{ color: currentAccent }}>
              50+
            </div>
            <div className="text-sm uppercase" style={{ color: colors.graphite }}>
              Projects Delivered
            </div>
          </div>
          <div>
            <div className="text-3xl font-black" style={{ color: currentAccent }}>
              4.9/5
            </div>
            <div className="text-sm uppercase" style={{ color: colors.graphite }}>
              Average Rating
            </div>
          </div>
          <div>
            <div className="text-3xl font-black" style={{ color: currentAccent }}>
              280%
            </div>
            <div className="text-sm uppercase" style={{ color: colors.graphite }}>
              Average ROI
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCaseStudy(null);
        }}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
};