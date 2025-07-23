import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

// Simple icon components
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
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
}

interface CaseStudiesBrutalProps {
  title?: string;
  subtitle?: string;
  variant?: 'grid' | 'carousel' | 'stacked' | 'bento' | 'image-grid' | 'image-hover';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  filter?: "all" | "software" | "automation" | "ai" | "webapp";
  className?: string;
}

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
  },
];

export const CaseStudiesBrutal: React.FC<CaseStudiesBrutalProps> = ({
  title = "Real People, Real Impact",
  subtitle = "See how we've transformed operations for companies just like yours",
  variant = 'grid',
  accentColor = 'orange',
  filter = 'all',
  className = '',
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    const isHovered = hoveredCard === caseStudy.id;

    // Grid variant card
    if (variant === 'grid') {
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredCard(caseStudy.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCaseStudyClick(caseStudy)}
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: isHovered ? `8px 8px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`,
            transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
            transition: 'all 0.15s ease',
          }}
        >
          {/* Metric Badge */}
          <div
            className="absolute -top-4 -right-4 z-10"
            style={{
              background: currentAccent,
              color: colors.white,
              border: `3px solid ${colors.black}`,
              padding: '12px 24px',
              boxShadow: `4px 4px 0px ${colors.black}`,
            }}
          >
            <div className="text-2xl font-black">{caseStudy.metric}</div>
            <div className="text-xs uppercase tracking-wider">{caseStudy.subMetric}</div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Service Tag */}
            <div
              className="inline-block mb-4"
              style={{
                background: colors.concrete,
                border: `2px solid ${colors.black}`,
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {caseStudy.service}
            </div>

            {/* Company & Industry */}
            <h3 className="text-2xl font-black mb-2" style={{ color: colors.black }}>
              {caseStudy.company}
            </h3>
            <p className="text-sm mb-4" style={{ color: colors.graphite }}>
              {caseStudy.industry} • {caseStudy.timeline}
            </p>

            {/* Description */}
            <p className="mb-6" style={{ color: colors.charcoal }}>
              {caseStudy.description}
            </p>

            {/* CTA */}
            <button
              className="flex items-center gap-2 font-bold uppercase tracking-wider"
              style={{
                background: colors.black,
                color: colors.white,
                padding: '12px 24px',
                border: `3px solid ${colors.black}`,
                fontSize: '14px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.white;
                e.currentTarget.style.color = colors.black;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.black;
                e.currentTarget.style.color = colors.white;
              }}
            >
              View Case Study
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      );
    }

    // Carousel variant card
    if (variant === 'carousel') {
      return (
        <motion.div
          key={caseStudy.id}
          className="flex-shrink-0 cursor-pointer"
          style={{ width: '400px' }}
          onClick={() => handleCaseStudyClick(caseStudy)}
        >
          <div
            className="h-full"
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
              padding: '32px',
            }}
          >
            {/* Metric Display */}
            <div className="flex items-center gap-4 mb-6">
              <div
                style={{
                  background: currentAccent,
                  color: colors.white,
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${colors.black}`,
                  boxShadow: `3px 3px 0px ${colors.black}`,
                }}
              >
                <TrendingUpIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-black">{caseStudy.metric}</div>
                <div className="text-sm uppercase" style={{ color: colors.graphite }}>
                  {caseStudy.subMetric}
                </div>
              </div>
            </div>

            {/* Details */}
            <h4 className="text-xl font-black mb-2">{caseStudy.company}</h4>
            <p className="text-sm mb-4" style={{ color: colors.graphite }}>
              {caseStudy.service}
            </p>
            <p style={{ color: colors.charcoal }}>{caseStudy.description}</p>
          </div>
        </motion.div>
      );
    }

    // Stacked variant card
    if (variant === 'stacked') {
      const stackOffset = index * 20;
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer"
          style={{
            position: 'absolute',
            top: `${stackOffset}px`,
            left: `${stackOffset}px`,
            zIndex: CASE_STUDIES_DATA.length - index,
            width: 'calc(100% - 40px)',
            maxWidth: '600px',
          }}
          onClick={() => handleCaseStudyClick(caseStudy)}
          onMouseEnter={() => setHoveredCard(caseStudy.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: isHovered ? `10px 10px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`,
              padding: '24px',
              transform: isHovered ? 'translate(-4px, -4px)' : 'translate(0, 0)',
              transition: 'all 0.15s ease',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-block"
                style={{
                  background: currentAccent,
                  color: colors.white,
                  border: `2px solid ${colors.black}`,
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {caseStudy.service}
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">{caseStudy.metric}</div>
                <div className="text-xs uppercase" style={{ color: colors.graphite }}>
                  {caseStudy.subMetric}
                </div>
              </div>
            </div>
            <h4 className="text-xl font-black mb-2">{caseStudy.company}</h4>
            <p style={{ color: colors.charcoal }}>{caseStudy.description}</p>
          </div>
        </motion.div>
      );
    }

    // Bento variant card
    if (variant === 'bento') {
      const isFeatured = index === 0;
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`cursor-pointer ${isFeatured ? 'col-span-2 row-span-2' : ''}`}
          onClick={() => handleCaseStudyClick(caseStudy)}
          onMouseEnter={() => setHoveredCard(caseStudy.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className="h-full"
            style={{
              background: isFeatured ? currentAccent : colors.white,
              color: isFeatured ? colors.white : colors.black,
              border: `3px solid ${colors.black}`,
              boxShadow: isHovered ? `8px 8px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`,
              padding: isFeatured ? '48px' : '32px',
              transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
              transition: 'all 0.15s ease',
            }}
          >
            {isFeatured ? (
              <>
                {/* Featured Case Study */}
                <div className="mb-6">
                  <div className="text-6xl font-black mb-2">{caseStudy.metric}</div>
                  <div className="text-xl uppercase tracking-wider">{caseStudy.subMetric}</div>
                </div>
                <h3 className="text-3xl font-black mb-4">{caseStudy.company}</h3>
                <div
                  className="inline-block mb-6"
                  style={{
                    background: colors.black,
                    color: colors.white,
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {caseStudy.service}
                </div>
                <p className="text-lg mb-8">{caseStudy.description}</p>
                <button
                  className="flex items-center gap-2 font-bold uppercase tracking-wider"
                  style={{
                    background: colors.white,
                    color: colors.black,
                    padding: '16px 32px',
                    border: `3px solid ${colors.black}`,
                    fontSize: '16px',
                  }}
                >
                  Explore Success Story
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                {/* Regular Case Study */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-black">{caseStudy.metric}</div>
                  <div
                    style={{
                      background: currentAccent,
                      color: colors.white,
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${colors.black}`,
                    }}
                  >
                    <TrendingUpIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-sm uppercase mb-2" style={{ color: colors.graphite }}>
                  {caseStudy.subMetric}
                </div>
                <h4 className="text-lg font-black mb-2">{caseStudy.company}</h4>
                <p className="text-sm" style={{ color: colors.charcoal }}>
                  {caseStudy.service}
                </p>
              </>
            )}
          </div>
        </motion.div>
      );
    }

    // Image Grid variant - shows images prominently
    if (variant === 'image-grid') {
      const isCustomMockup = caseStudy.bgUrl === 'chatbot-mockup' || caseStudy.bgUrl === 'centric-mockup';
      
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer group"
          onClick={() => handleCaseStudyClick(caseStudy)}
          onMouseEnter={() => setHoveredCard(caseStudy.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: hoveredCard === caseStudy.id ? `8px 8px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`,
              transform: hoveredCard === caseStudy.id ? 'translate(-2px, -2px)' : 'translate(0, 0)',
              transition: 'all 0.15s ease',
              overflow: 'hidden',
            }}
          >
            {/* Image Section */}
            <div 
              className="relative h-64 overflow-hidden"
              style={{
                borderBottom: `3px solid ${colors.black}`,
              }}
            >
              {isCustomMockup ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
                  {caseStudy.bgUrl === 'chatbot-mockup' ? (
                    <div className="scale-50 transform">
                      <ChatbotMockup />
                    </div>
                  ) : (
                    <img
                      src="/images/centric2.png"
                      alt="Centric Proposal Generator"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ) : (
                <img
                  src={caseStudy.bgUrl}
                  alt={caseStudy.company}
                  className="h-full w-full object-cover"
                  style={{
                    transform: hoveredCard === caseStudy.id ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              )}
              
              {/* Overlay Badge */}
              <div
                className="absolute top-4 right-4"
                style={{
                  background: currentAccent,
                  color: colors.white,
                  border: `3px solid ${colors.black}`,
                  padding: '8px 16px',
                  boxShadow: `3px 3px 0px ${colors.black}`,
                }}
              >
                <div className="text-2xl font-black">{caseStudy.metric}</div>
                <div className="text-xs uppercase">{caseStudy.subMetric}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div
                className="inline-block mb-4"
                style={{
                  background: colors.concrete,
                  border: `2px solid ${colors.black}`,
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {caseStudy.service}
              </div>
              
              <h3 className="text-xl font-black mb-2">{caseStudy.company}</h3>
              <p className="text-sm" style={{ color: colors.charcoal }}>
                {caseStudy.description}
              </p>
            </div>
          </div>
        </motion.div>
      );
    }

    // Image Hover variant - All elements visible with subtle hover effect
    if (variant === 'image-hover') {
      const isCustomMockup = caseStudy.bgUrl === 'chatbot-mockup' || caseStudy.bgUrl === 'centric-mockup';
      
      return (
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="cursor-pointer group relative overflow-hidden"
          onClick={() => handleCaseStudyClick(caseStudy)}
          whileHover={{ y: -4 }}
          style={{
            height: '400px',
            border: `3px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            transition: 'all 0.2s ease',
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {isCustomMockup ? (
              <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
                {caseStudy.bgUrl === 'chatbot-mockup' ? (
                  <div className="scale-75 transform">
                    <ChatbotMockup />
                  </div>
                ) : (
                  <img
                    src="/images/centric2.png"
                    alt="Centric Proposal Generator"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ) : (
              <img
                src={caseStudy.bgUrl}
                alt={caseStudy.company}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Content Overlay - Always visible with darker background for legibility */}
          <div
            className="absolute inset-0 flex flex-col justify-between"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%)`,
              transition: 'background 0.3s ease',
            }}
          >
            {/* Darker overlay on hover */}
            <div 
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />

            {/* Top Section with Badge */}
            <div className="p-6 relative z-10">
              <div
                className="inline-block"
                style={{
                  background: currentAccent,
                  color: colors.white,
                  border: `3px solid ${colors.black}`,
                  padding: '12px 20px',
                  boxShadow: `4px 4px 0px ${colors.black}`,
                }}
              >
                <div className="text-3xl font-black">{caseStudy.metric}</div>
                <div className="text-sm uppercase">{caseStudy.subMetric}</div>
              </div>
            </div>

            {/* Bottom Content - Always visible */}
            <div className="p-6 relative z-10">
              <div
                className="inline-block mb-3"
                style={{
                  background: colors.white,
                  color: colors.black,
                  border: `2px solid ${colors.black}`,
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {caseStudy.service}
              </div>
              
              <h3 className="text-2xl font-black mb-2 text-white">{caseStudy.company}</h3>
              <p className="text-sm text-white mb-4 opacity-90">{caseStudy.description}</p>
              
              <div
                className="flex items-center gap-2 font-bold uppercase tracking-wider text-white transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  fontSize: '14px',
                }}
              >
                View Case Study
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  const renderContent = () => {
    switch (variant) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map(renderCaseStudyCard)}
          </div>
        );

      case 'carousel':
        return (
          <div className="relative">
            <div className="overflow-x-auto pb-8">
              <div className="flex gap-6" style={{ width: 'max-content' }}>
                {filteredCaseStudies.map(renderCaseStudyCard)}
              </div>
            </div>
            {/* Scroll Indicator */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '4px',
                background: colors.steel,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '33%',
                  background: currentAccent,
                  border: `2px solid ${colors.black}`,
                }}
              />
            </div>
          </div>
        );

      case 'stacked':
        return (
          <div 
            className="relative mx-auto" 
            style={{ 
              height: `${(filteredCaseStudies.length - 1) * 20 + 400}px`,
              maxWidth: '700px',
            }}
          >
            {filteredCaseStudies.map(renderCaseStudyCard)}
          </div>
        );

      case 'bento':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {filteredCaseStudies.map(renderCaseStudyCard)}
          </div>
        );

      case 'image-grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map(renderCaseStudyCard)}
          </div>
        );

      case 'image-hover':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map(renderCaseStudyCard)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Header */}
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
          className="text-lg md:text-xl max-w-3xl mx-auto"
          style={{ color: colors.charcoal }}
        >
          {subtitle}
        </p>
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