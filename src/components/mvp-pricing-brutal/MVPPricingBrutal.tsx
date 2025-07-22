import React from 'react';
import { motion } from 'framer-motion';

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

// Simple icon components
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M9.5 21C7.5 21 6 20 6 20s1-3 1-5c0-2.5 1.5-5 4-6.5C13.5 7 16 7 18 7c1 0 2 0 3 1-1 1-1 2-1 3 0 2-0.5 4.5-2 7-1.5 2.5-4 4-6.5 4-2 0-5 1-5 1s0-1 2-2z" />
    <path d="M6 12l-3 3m12-12l3-3" />
  </svg>
);

interface PaymentPhase {
  phase: string;
  amount: string;
  percentage: string;
  description: string;
  icon: 'calendar' | 'creditcard' | 'shield';
}

interface MVPPricingBrutalProps {
  title?: string;
  subtitle?: string;
  price?: string;
  features?: string[];
  paymentSchedule?: PaymentPhase[];
  onCtaClick?: () => void;
  ctaText?: string;
  guaranteeItems?: string[];
  limitText?: string;
  variant?: 'default' | 'compact' | 'minimal';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
}

const defaultFeatures = [
  'Full MVP development',
  'AI integration (OpenAI/Claude)',
  'Payment processing (Stripe)',
  'User authentication',
  'Admin dashboard',
  'Deployment & hosting setup',
  '30 days post-launch support',
  'Complete source code ownership',
];

const defaultPaymentSchedule: PaymentPhase[] = [
  {
    phase: 'To Start',
    amount: '$1,000',
    percentage: '10%',
    description: 'Project kickoff & planning',
    icon: 'calendar',
  },
  {
    phase: 'Week 2 Milestone',
    amount: '$4,000',
    percentage: '40%',
    description: 'Core development complete',
    icon: 'creditcard',
  },
  {
    phase: 'On Delivery',
    amount: '$5,000',
    percentage: '50%',
    description: 'Live MVP with full handover',
    icon: 'shield',
  },
];

const defaultGuaranteeItems = [
  'Only 10% deposit required to start',
  'Weekly progress demos',
  'Full refund if we miss deadline',
  '100% code ownership',
];

const iconMap = {
  calendar: CalendarIcon,
  creditcard: CreditCardIcon,
  shield: ShieldIcon,
};

export const MVPPricingBrutal: React.FC<MVPPricingBrutalProps> = ({
  title = 'Simple, Transparent Pricing',
  subtitle = 'One price. One deliverable. No hidden costs or scope creep.',
  price = '$10,000',
  features = defaultFeatures,
  paymentSchedule = defaultPaymentSchedule,
  onCtaClick,
  ctaText = 'Book Your Free Strategy Call',
  guaranteeItems = defaultGuaranteeItems,
  limitText = 'Limited to 3 new MVPs per month',
  variant = 'default',
  accentColor = 'orange',
}) => {
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed,
  };

  const currentAccent = accentColors[accentColor];

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.open('https://calendly.com/your-booking-link', '_blank');
    }
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2
              className={`${typography.displayM} uppercase`}
              style={{
                color: colors.black,
                textShadow: `3px 3px 0px ${currentAccent}`,
                marginBottom: '16px',
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={typography.bodyL}
              style={{
                color: colors.charcoal,
                maxWidth: '48rem',
                margin: '0 auto',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className={`grid gap-8 ${variant === 'minimal' ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
          {/* Main Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Popular Badge */}
            <div
              className="absolute -top-4 -right-4 z-10"
              style={{
                background: currentAccent,
                color: colors.white,
                padding: '8px 20px',
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
                transform: 'rotate(3deg)',
              }}
            >
              <span className={`${typography.caption} uppercase font-bold`}>
                Most Popular
              </span>
            </div>

            <div
              className="relative h-full"
              style={{
                background: colors.white,
                border: `4px solid ${colors.black}`,
                boxShadow: `8px 8px 0px ${colors.black}`,
                padding: '48px 32px',
                transition: 'all 0.15s ease',
                transform: 'translate(0, 0)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(-2px, -2px)';
                el.style.boxShadow = `10px 10px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(0, 0)';
                el.style.boxShadow = `8px 8px 0px ${colors.black}`;
              }}
            >
              {/* Pricing Header */}
              <div className="text-center mb-8">
                <h3
                  className={`${typography.headingL} uppercase mb-3`}
                  style={{ color: colors.black }}
                >
                  AI App MVP
                </h3>
                <p
                  className={typography.bodyM}
                  style={{ color: colors.charcoal, marginBottom: '24px' }}
                >
                  From idea to live product in 4 weeks
                </p>

                {/* Price Box */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${currentAccent}, ${colors.crimsonRed})`,
                    color: colors.white,
                    padding: '24px',
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                    marginBottom: '8px',
                  }}
                >
                  <div className={typography.displayL}>{price}</div>
                </div>
                <p
                  className={`${typography.caption} uppercase`}
                  style={{ color: colors.graphite }}
                >
                  Total project cost
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        background: colors.emerald,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${colors.black}`,
                        boxShadow: `2px 2px 0px ${colors.black}`,
                        flexShrink: 0,
                      }}
                    >
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={typography.bodyM}
                      style={{ color: colors.obsidian }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCtaClick}
                className={`${typography.bodyM} font-bold uppercase w-full py-4`}
                style={{
                  background: `linear-gradient(135deg, ${currentAccent}, ${colors.crimsonRed})`,
                  color: colors.white,
                  border: `3px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${colors.black}`,
                  letterSpacing: '0.5px',
                  transition: 'all 0.1s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
                }}
              >
                <RocketIcon className="inline-block w-5 h-5 mr-2" />
                {ctaText}
              </button>

              {/* Limit Text */}
              {limitText && (
                <p
                  className={`${typography.caption} text-center mt-4`}
                  style={{ color: colors.graphite }}
                >
                  {limitText}
                </p>
              )}
            </div>
          </motion.div>

          {/* Payment Schedule */}
          {variant !== 'minimal' && (
            <div className="space-y-6">
              <h3
                className={`${typography.headingL} uppercase text-center mb-6`}
                style={{ color: colors.black }}
              >
                Simple Payment Terms
              </h3>

              {/* Payment Phases */}
              {paymentSchedule.map((payment, index) => {
                const Icon = iconMap[payment.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: colors.white,
                      border: `3px solid ${colors.black}`,
                      padding: '20px',
                      boxShadow: `4px 4px 0px ${colors.black}`,
                      transition: 'all 0.15s ease',
                      transform: 'translate(0, 0)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = 'translate(-2px, -2px)';
                      el.style.boxShadow = `6px 6px 0px ${colors.black}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = 'translate(0, 0)';
                      el.style.boxShadow = `4px 4px 0px ${colors.black}`;
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: currentAccent,
                          color: colors.white,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `3px solid ${colors.black}`,
                          boxShadow: `3px 3px 0px ${colors.black}`,
                          flexShrink: 0,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4
                            className={`${typography.headingS} uppercase`}
                            style={{ color: colors.black }}
                          >
                            {payment.phase}
                          </h4>
                          <div className="text-right">
                            <div
                              className={typography.headingM}
                              style={{ color: currentAccent }}
                            >
                              {payment.amount}
                            </div>
                            <div
                              className={`${typography.caption} uppercase`}
                              style={{ color: colors.graphite }}
                            >
                              {payment.percentage}
                            </div>
                          </div>
                        </div>
                        <p
                          className={typography.bodyS}
                          style={{ color: colors.charcoal }}
                        >
                          {payment.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Guarantee Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: `linear-gradient(135deg, ${colors.emerald}10, ${colors.sapphire}10)`,
                  border: `3px solid ${colors.emerald}`,
                  padding: '24px',
                  boxShadow: `4px 4px 0px ${colors.black}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: colors.emerald,
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `3px solid ${colors.black}`,
                      boxShadow: `3px 3px 0px ${colors.black}`,
                      flexShrink: 0,
                    }}
                  >
                    <ShieldIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      className={`${typography.headingS} uppercase mb-3`}
                      style={{ color: colors.black }}
                    >
                      Risk-Free Guarantee
                    </h4>
                    <ul className="space-y-2">
                      {guaranteeItems.map((item, index) => (
                        <li
                          key={index}
                          className={`${typography.bodyS} flex items-start gap-2`}
                          style={{ color: colors.obsidian }}
                        >
                          <span style={{ color: colors.emerald }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};