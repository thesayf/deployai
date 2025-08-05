import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { SectionWrapper } from '@/components/section-wrapper';
import { HeadingH2 } from '@/components/heading-h2';

// Design System Colors
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Icons with neubrutalist style
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={colors.emerald} stroke={colors.black} strokeWidth="3"/>
    <path d="M12 6v6l4 2" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FreeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={colors.amber} stroke={colors.black} strokeWidth="3"/>
    <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill={colors.black}>$0</text>
  </svg>
);

const ReportIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="0" fill={colors.cyberBlue} stroke={colors.black} strokeWidth="3"/>
    <path d="M8 12h8M8 8h8M8 16h4" stroke={colors.white} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="18" cy="18" r="4" fill={colors.electricOrange} stroke={colors.black} strokeWidth="3"/>
    <path d="M18 16v4M16 18h4" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface MVPPlannerLandingProps {
  onStartPlanner: () => void;
}

// MVP Planning categories
const categories = [
  {
    title: "Exact MVP Investment",
    description: "See your total cost broken down: development, infrastructure, and monthly running costs"
  },
  {
    title: "Feature Prioritization Matrix",
    description: "Know exactly which features to build first vs. save for Phase 2"
  },
  {
    title: "Week-by-Week Timeline",
    description: "Realistic development schedule with specific deliverables each week"
  },
  {
    title: "Tech Stack Recommendation",
    description: "Best framework choices for your specific use case with detailed rationale"
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
              FREE MVP COST CALCULATOR • NO EMAIL REQUIRED TO START
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
              Get Your Custom MVP Development Plan & Exact Pricing
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
              Instantly see what it costs to build your app idea – with month-by-month breakdown
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Stop guessing. In just 2 minutes, get a detailed blueprint showing exactly what 
              features to build first, which tech stack to use, realistic timelines, and both 
              upfront + monthly running costs. Used by 500+ founders to plan their MVPs.
            </p>
            <Button 
              size="large" 
              intent="cta"
              onClick={onStartPlanner}
              className="transform hover:scale-105 transition-all"
            >
              Get Your Free MVP Blueprint →
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
                src="/images/mvp-estimation-5.png" 
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
          <HeadingH2
            variant="default"
            accent="blue"
            align="center"
            animate={true}
            className="mb-6"
          >
            Your Complete MVP Blueprint in 2 Minutes
          </HeadingH2>
          <p className="text-xl leading-relaxed text-zinc-700 md:text-2xl mb-8 max-w-3xl mx-auto">
            No fluff. No sales pitch. Just data-driven insights.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our AI analyzes your app idea against 1000+ successful MVPs to give you a realistic, 
            actionable plan. See exactly what to build, how long it takes, and what it costs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div 
                className="w-32 h-32 mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: colors.white,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  transition: 'all 0.15s ease',
                }}
              >
                <ClockIcon className="w-24 h-24" />
              </div>
              <h3 className={`${typography.headingM} mb-2`}>4 Quick Questions</h3>
              <p className={typography.bodyM} style={{ color: colors.charcoal }}>Takes under 2 minutes</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div 
                className="w-32 h-32 mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: colors.white,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  transition: 'all 0.15s ease',
                }}
              >
                <FreeIcon className="w-24 h-24" />
              </div>
              <h3 className={`${typography.headingM} mb-2`}>AI Analysis</h3>
              <p className={typography.bodyM} style={{ color: colors.charcoal }}>Powered by real MVP data</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div 
                className="w-32 h-32 mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: colors.white,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  transition: 'all 0.15s ease',
                }}
              >
                <ReportIcon className="w-24 h-24" />
              </div>
              <h3 className={`${typography.headingM} mb-2`}>Get Blueprint</h3>
              <p className={typography.bodyM} style={{ color: colors.charcoal }}>Detailed 10-page report</p>
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
          <HeadingH2
            variant="default"
            accent="orange"
            align="center"
            animate={true}
            className="mb-6"
          >
            What's in Your Custom MVP Blueprint?
          </HeadingH2>
          <p className="text-xl leading-relaxed text-zinc-700 md:text-2xl text-center mb-12 max-w-3xl mx-auto">
            Real numbers. Real timelines. Real clarity.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  background: colors.white,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  transition: 'all 0.15s ease',
                  transform: 'translate(0, 0)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translate(-2px, -2px)';
                  el.style.boxShadow = `8px 8px 0px ${colors.black}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translate(0, 0)';
                  el.style.boxShadow = `6px 6px 0px ${colors.black}`;
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.electricOrange}, ${colors.crimsonRed})`,
                        border: `3px solid ${colors.black}`,
                        boxShadow: `3px 3px 0px ${colors.black}`,
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`${typography.headingS} mb-2`}>{category.title}</h4>
                      <p className={typography.bodyM} style={{ color: colors.charcoal }}>{category.description}</p>
                    </div>
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
          <HeadingH2
            variant="default"
            accent="red"
            align="center"
            animate={true}
            className="mb-6"
          >
            Stop Overpaying for Your MVP
          </HeadingH2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Most agencies quote $50K+ without explaining why. Get transparent pricing and know exactly 
            what you're building before spending a penny. 93% of founders save 40% using our blueprint.
          </p>
          <motion.button
            onClick={onStartPlanner}
            className="uppercase font-bold text-lg px-8 py-4 transition-all transform hover:scale-105"
            style={{
              background: colors.black,
              color: colors.white,
              border: `4px solid ${colors.black}`,
              boxShadow: `6px 6px 0px ${colors.black}`,
            }}
            whileHover={{
              boxShadow: `8px 8px 0px ${colors.black}`,
              backgroundColor: colors.charcoal,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate Your MVP Cost Now →
          </motion.button>
        </motion.div>
      </SectionWrapper>
    </>
  );
};