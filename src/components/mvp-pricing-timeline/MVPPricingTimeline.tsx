import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeadingH2 } from '@/components/heading-h2';
import { Button } from '@/components/shared/Button';

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

// Design System Typography
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

// Icon components
const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="14" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="10" y2="18" />
    <line x1="14" y1="18" x2="16" y2="18" />
  </svg>
);

const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface PricingFeature {
  id: string;
  title: string;
  description: string;
  included: boolean;
}

interface PricingStep {
  id: string;
  phase: number;
  title: string;
  description: string;
  amount: string;
  percentage: string;
  features: PricingFeature[];
  icon: 'calculator' | 'dollar' | 'creditcard' | 'shield';
  color: 'orange' | 'blue' | 'magenta' | 'red';
  timing: string;
}

interface MVPPricingTimelineProps {
  steps?: PricingStep[];
  title?: string;
  subtitle?: string;
  totalPrice?: string;
  className?: string;
}

const defaultSteps: PricingStep[] = [
  {
    id: 'phase-1',
    phase: 1,
    title: 'Project Kickoff',
    description: 'Discovery, planning, and wireframing to set a solid foundation',
    amount: '$1,000',
    percentage: '10%',
    icon: 'calculator',
    color: 'orange',
    timing: 'To Start',
    features: [
      {
        id: 'feature-1-1',
        title: 'Product Discovery Workshop',
        description: 'Deep dive into your vision, users, and business goals',
        included: true,
      },
      {
        id: 'feature-1-2',
        title: 'Technical Architecture Plan',
        description: 'Complete system design and technology stack selection',
        included: true,
      },
      {
        id: 'feature-1-3',
        title: 'Interactive Wireframes',
        description: 'Clickable prototypes of all key user flows',
        included: true,
      },
      {
        id: 'feature-1-4',
        title: 'Development Roadmap',
        description: 'Week-by-week plan with clear milestones',
        included: true,
      },
    ],
  },
  {
    id: 'phase-2',
    phase: 2,
    title: 'Core Development',
    description: 'Building your MVP\'s foundation with essential features',
    amount: '$4,000',
    percentage: '40%',
    icon: 'dollar',
    color: 'blue',
    timing: 'Week 2 Milestone',
    features: [
      {
        id: 'feature-2-1',
        title: 'Frontend Development',
        description: 'Complete UI with React/Next.js, responsive design',
        included: true,
      },
      {
        id: 'feature-2-2',
        title: 'Backend & Database',
        description: 'API development, database setup, and server configuration',
        included: true,
      },
      {
        id: 'feature-2-3',
        title: 'User Authentication',
        description: 'Secure login, registration, and password recovery',
        included: true,
      },
      {
        id: 'feature-2-4',
        title: 'Payment Integration',
        description: 'Stripe setup for subscriptions or one-time payments',
        included: true,
      },
    ],
  },
  {
    id: 'phase-3',
    phase: 3,
    title: 'Final Delivery',
    description: 'Launch-ready MVP with all features tested and deployed',
    amount: '$5,000',
    percentage: '50%',
    icon: 'shield',
    color: 'red',
    timing: 'On Delivery',
    features: [
      {
        id: 'feature-3-1',
        title: 'AI Integration',
        description: 'OpenAI/Claude API integration for smart features',
        included: true,
      },
      {
        id: 'feature-3-2',
        title: 'Admin Dashboard',
        description: 'Full control panel for managing users and content',
        included: true,
      },
      {
        id: 'feature-3-3',
        title: 'Deployment & Hosting',
        description: 'Live deployment with SSL, domain setup, and monitoring',
        included: true,
      },
      {
        id: 'feature-3-4',
        title: '30 Days Support',
        description: 'Post-launch bug fixes and minor adjustments',
        included: true,
      },
    ],
  },
];

const iconMap = {
  calculator: CalculatorIcon,
  dollar: DollarIcon,
  creditcard: CreditCardIcon,
  shield: ShieldIcon,
};

const colorMap = {
  orange: colors.electricOrange,
  blue: colors.cyberBlue,
  magenta: colors.deepMagenta,
  red: colors.crimsonRed,
};

export const MVPPricingTimeline: React.FC<MVPPricingTimelineProps> = ({
  steps = defaultSteps,
  title = 'Simple, Transparent Pricing',
  subtitle = 'Pay as we progress, with clear milestones and deliverables',
  totalPrice = '$10,000',
  className = '',
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const renderPricingStep = (step: PricingStep, index: number) => {
    const Icon = iconMap[step.icon];
    const isExpanded = expandedSteps.has(step.id);

    return (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        {/* Connector Line */}
        {index < steps.length - 1 && (
          <div
            className="absolute hidden lg:block"
            style={{
              right: '-50%',
              top: '48px',
              width: '100%',
              height: '4px',
              background: colors.steel,
              border: `2px solid ${colors.black}`,
              zIndex: 0,
            }}
          />
        )}

        <div
          className="relative cursor-pointer group"
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
          onClick={() => toggleStep(step.id)}
        >
          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    background: colorMap[step.color],
                    color: colors.white,
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span
                    className={`${typography.caption} uppercase`}
                    style={{
                      color: colors.charcoal,
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    {step.timing}
                  </span>
                  <h3
                    className={typography.headingL}
                    style={{ color: colors.black }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  background: colors.white,
                  border: `2px solid ${colors.black}`,
                  padding: '6px',
                  boxShadow: `2px 2px 0px ${colors.black}`,
                  transition: 'transform 0.2s ease',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronIcon className="w-5 h-5" />
              </div>
            </div>

            <p
              className={typography.bodyM}
              style={{
                color: colors.charcoal,
                marginBottom: '24px',
              }}
            >
              {step.description}
            </p>

            {/* Price Display */}
            <div
              style={{
                background: `linear-gradient(135deg, ${colorMap[step.color]}20, ${colorMap[step.color]}10)`,
                border: `3px solid ${colors.black}`,
                padding: '16px',
                marginBottom: '24px',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`${typography.displayS}`} style={{ color: colors.black }}>
                    {step.amount}
                  </span>
                  <span className={`${typography.bodyM} ml-2`} style={{ color: colors.charcoal }}>
                    ({step.percentage})
                  </span>
                </div>
                <span className={`${typography.caption} uppercase`} style={{ color: colors.charcoal }}>
                  Phase {step.phase} Payment
                </span>
              </div>
            </div>
          </div>

          {/* Features (Expandable) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    borderTop: `3px solid ${colors.black}`,
                    padding: '24px',
                    background: colors.concrete,
                  }}
                >
                  <h4
                    className={`${typography.headingS} uppercase mb-4`}
                    style={{ color: colors.black }}
                  >
                    What's Included
                  </h4>
                  <div className="space-y-3">
                    {step.features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          style={{
                            color: colors.emerald,
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          <CheckIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h5
                            className={typography.bodyM}
                            style={{
                              color: colors.black,
                              fontWeight: 600,
                              marginBottom: '4px',
                            }}
                          >
                            {feature.title}
                          </h5>
                          <p
                            className={typography.bodyS}
                            style={{ color: colors.graphite }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment Badge */}
          <div
            className="absolute -top-3 -right-3"
            style={{
              background: colorMap[step.color],
              color: colors.white,
              border: `3px solid ${colors.black}`,
              padding: '8px 16px',
              boxShadow: `3px 3px 0px ${colors.black}`,
              zIndex: 10,
            }}
          >
            <span className={`${typography.caption} uppercase font-bold`}>
              {step.percentage}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <HeadingH2
              variant="default"
              accent="orange"
              align="center"
              animate={true}
              className="mb-6"
            >
              {title}
            </HeadingH2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-700 md:text-2xl mb-8">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Total Price Banner */}
      <div className="max-w-4xl mx-auto mb-12">
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.electricOrange}, ${colors.crimsonRed})`,
            border: `4px solid ${colors.black}`,
            padding: '32px',
            boxShadow: `6px 6px 0px ${colors.black}`,
            color: colors.white,
            textAlign: 'center',
          }}
        >
          <h3
            className={`${typography.displayM} mb-2`}
          >
            Total Investment: {totalPrice}
          </h3>
          <p className={`${typography.bodyL} opacity-90`}>
            Fixed price • No hidden costs • Pay as we progress
          </p>
        </div>
      </div>

      {/* Pricing Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {steps.map((step, index) => renderPricingStep(step, index))}
      </div>

      {/* Guarantee Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <div
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            padding: '32px',
            boxShadow: `4px 4px 0px ${colors.black}`,
          }}
        >
          <h3
            className={`${typography.headingL} mb-6 text-center`}
            style={{ color: colors.black }}
          >
            Our Guarantee
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Only 10% deposit to start',
              'Weekly progress demos',
              'Full refund if we miss deadline',
              '100% code ownership',
              'No vendor lock-in',
              '30 days post-launch support',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div style={{ color: colors.emerald }}>
                  <CheckIcon className="w-5 h-5" />
                </div>
                <span className={typography.bodyM} style={{ color: colors.black }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Button
          size="large"
          intent="secondary"
          onClick={() => window.location.href = 'https://calendly.com/hello-deployai/30min'}
        >
          Book Your Free Strategy Call
        </Button>
        <p className={`${typography.bodyS} mt-3`} style={{ color: colors.charcoal }}>
          Limited to 3 new MVPs per month
        </p>
      </div>
    </section>
  );
};