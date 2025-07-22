import React from 'react';

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

// Simple Check icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Simple X icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface PricingFeature {
  name: string;
  basic: boolean | string;
  ecommerce: boolean | string;
  enterprise: boolean | string;
}

interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  description: string;
  recommended?: boolean;
}

interface PricingComparisonProps {
  tiers?: PricingTier[];
  features?: PricingFeature[];
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Basic Website',
    price: 'AED 5,000 - 15,000',
    timeline: '2-4 weeks',
    description: 'Perfect for small businesses and startups',
  },
  {
    name: 'E-commerce',
    price: 'AED 15,000 - 50,000',
    timeline: '4-8 weeks',
    description: 'Full-featured online store with payment integration',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'AED 50,000+',
    timeline: '8-12 weeks',
    description: 'Custom solutions for large organizations',
  },
];

const defaultFeatures: PricingFeature[] = [
  {
    name: 'Responsive Design',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'SEO Optimization',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Content Management System',
    basic: 'WordPress',
    ecommerce: 'WooCommerce',
    enterprise: 'Custom CMS',
  },
  {
    name: 'Number of Pages',
    basic: 'Up to 10',
    ecommerce: 'Up to 50',
    enterprise: 'Unlimited',
  },
  {
    name: 'E-commerce Features',
    basic: false,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Payment Gateway Integration',
    basic: false,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Multi-language Support',
    basic: false,
    ecommerce: 'Optional',
    enterprise: true,
  },
  {
    name: 'Custom API Integration',
    basic: false,
    ecommerce: false,
    enterprise: true,
  },
  {
    name: 'Advanced Analytics',
    basic: false,
    ecommerce: 'Basic',
    enterprise: true,
  },
  {
    name: 'Dedicated Support',
    basic: 'Email',
    ecommerce: 'Priority Email',
    enterprise: '24/7 Phone & Email',
  },
  {
    name: 'Maintenance Period',
    basic: '3 months',
    ecommerce: '6 months',
    enterprise: '12 months',
  },
  {
    name: 'Source Code Access',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
];

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  tiers = defaultTiers,
  features = defaultFeatures,
  title = 'Dubai Web Development Pricing Guide',
  subtitle = 'Compare service tiers and find the perfect fit for your project',
  showCTA = true,
}) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center">
          <div 
            style={{
              width: '32px',
              height: '32px',
              background: colors.emerald,
              border: `2px solid ${colors.black}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `2px 2px 0px ${colors.black}`,
              color: colors.white
            }}
          >
            <CheckIcon className="w-5 h-5" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div 
            style={{
              width: '32px',
              height: '32px',
              background: colors.steel,
              border: `2px solid ${colors.black}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
              color: colors.charcoal
            }}
          >
            <XIcon className="w-4 h-4" />
          </div>
        </div>
      );
    }
    return (
      <span 
        className={`${typography.bodyS} font-medium`}
        style={{ color: colors.obsidian }}
      >
        {value}
      </span>
    );
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-12 text-center px-4">
        <h2 
          className={`${typography.displayM} uppercase`}
          style={{ 
            color: colors.black,
            textShadow: `3px 3px 0px ${colors.electricOrange}`,
            marginBottom: '24px'
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className={typography.bodyL} 
            style={{ 
              color: colors.charcoal,
              maxWidth: '48rem',
              margin: '0 auto'
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block px-4">
        <div 
          style={{
            background: colors.white,
            border: `4px solid ${colors.black}`,
            boxShadow: `8px 8px 0px ${colors.black}`,
            borderRadius: 0,
            overflow: 'hidden'
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `4px solid ${colors.black}` }}>
                <th className="px-6 py-6 text-left align-middle">
                  <span 
                    className={`${typography.caption} uppercase`}
                    style={{ 
                      color: colors.charcoal,
                      letterSpacing: '1px',
                      fontWeight: 700
                    }}
                  >
                    Features
                  </span>
                </th>
                {tiers.map((tier, index) => (
                  <th key={index} className="px-6 py-6 text-center" style={{ verticalAlign: 'top' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        minHeight: '260px'
                      }}
                    >
                      {/* Recommended Badge - Fixed Height */}
                      <div style={{ height: '36px', marginBottom: '8px' }}>
                        {tier.recommended && (
                          <span 
                            className={`${typography.caption} uppercase inline-block px-4 py-2`}
                            style={{
                              background: colors.electricOrange,
                              color: colors.white,
                              border: `2px solid ${colors.black}`,
                              boxShadow: `3px 3px 0px ${colors.black}`,
                              fontWeight: 700,
                              letterSpacing: '0.5px'
                            }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>
                      
                      {/* Tier Name - Fixed Position */}
                      <h3 
                        className={`${typography.headingM} uppercase`}
                        style={{ 
                          color: colors.black,
                          marginBottom: '12px'
                        }}
                      >
                        {tier.name}
                      </h3>
                      
                      {/* Price Box - Flexible Height with Max */}
                      <div
                        style={{
                          background: tier.recommended 
                            ? `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`
                            : colors.black,
                          color: colors.white,
                          padding: '12px 16px',
                          border: `2px solid ${colors.black}`,
                          boxShadow: `3px 3px 0px ${tier.recommended ? colors.deepMagenta : colors.charcoal}`,
                          minHeight: '56px',
                          maxHeight: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: '1 1 auto',
                          margin: '0 0 16px 0'
                        }}
                      >
                        <p className={`${typography.headingL} font-black text-center`}>{tier.price}</p>
                      </div>
                      
                      {/* Bottom Section - Timeline & Description */}
                      <div style={{ marginTop: 'auto' }}>
                        <p 
                          className={`${typography.bodyS} font-semibold`}
                          style={{ 
                            color: colors.charcoal,
                            marginBottom: '4px'
                          }}
                        >
                          {tier.timeline}
                        </p>
                        
                        <p 
                          className={typography.caption}
                          style={{ 
                            color: colors.graphite
                          }}
                        >
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `2px solid ${colors.steel}`,
                    background: index % 2 === 0 ? colors.concrete : colors.white
                  }}
                >
                  <td 
                    className="px-6 py-5"
                    style={{
                      borderRight: `2px solid ${colors.steel}`
                    }}
                  >
                    <span 
                      className={`${typography.bodyM} font-semibold`}
                      style={{ color: colors.obsidian }}
                    >
                      {feature.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {renderFeatureValue(feature.basic)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    {renderFeatureValue(feature.ecommerce)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
            {showCTA && (
              <tfoot>
                <tr style={{ background: colors.obsidian }}>
                  <td className="px-6 py-6" />
                  {tiers.map((tier, index) => (
                    <td key={index} className="px-6 py-6 text-center">
                      <button 
                        className={`${typography.bodyM} font-bold uppercase px-8 py-4`}
                        style={{
                          background: tier.recommended 
                            ? `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`
                            : colors.white,
                          color: tier.recommended ? colors.white : colors.black,
                          border: `3px solid ${tier.recommended ? colors.black : colors.white}`,
                          boxShadow: `4px 4px 0px ${tier.recommended ? colors.black : colors.electricOrange}`,
                          letterSpacing: '0.5px',
                          transition: 'all 0.1s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                          e.currentTarget.style.boxShadow = `6px 6px 0px ${tier.recommended ? colors.black : colors.electricOrange}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = `4px 4px 0px ${tier.recommended ? colors.black : colors.electricOrange}`;
                        }}
                      >
                        Get Started
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Mobile View - Vertical Cards */}
      <div className="lg:hidden px-4">
        <div className="space-y-6">
          {tiers.map((tier, tierIndex) => (
            <div
              key={tierIndex}
              style={{
                background: colors.white,
                border: tier.recommended ? `4px solid ${colors.electricOrange}` : `3px solid ${colors.black}`,
                boxShadow: tier.recommended 
                  ? `6px 6px 0px ${colors.black}` 
                  : `4px 4px 0px ${colors.black}`,
                position: 'relative',
                transition: 'all 0.15s ease',
                transform: 'translate(0, 0)'
              }}
              onTouchStart={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(-2px, -2px)';
                el.style.boxShadow = tier.recommended 
                  ? `8px 8px 0px ${colors.black}` 
                  : `6px 6px 0px ${colors.black}`;
              }}
              onTouchEnd={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(0, 0)';
                el.style.boxShadow = tier.recommended 
                  ? `6px 6px 0px ${colors.black}` 
                  : `4px 4px 0px ${colors.black}`;
              }}
            >
              {/* Accent Bar for Recommended */}
              {tier.recommended && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '8px',
                    background: `linear-gradient(90deg, ${colors.electricOrange}, ${colors.crimsonRed}, ${colors.deepMagenta})`
                  }}
                />
              )}

              {/* Tier Header */}
              <div className="p-6 pb-0 text-center">
                {tier.recommended && (
                  <div className="mb-4">
                    <span 
                      className={`${typography.caption} uppercase inline-block px-4 py-2`}
                      style={{
                        background: colors.electricOrange,
                        color: colors.white,
                        border: `2px solid ${colors.black}`,
                        boxShadow: `3px 3px 0px ${colors.black}`,
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                      }}
                    >
                      Recommended
                    </span>
                  </div>
                )}
                <h3 
                  className={`${typography.headingL} uppercase mb-4`}
                  style={{ color: colors.black }}
                >
                  {tier.name}
                </h3>
                <div
                  className="inline-block mb-3"
                  style={{
                    background: tier.recommended 
                      ? `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`
                      : colors.black,
                    color: colors.white,
                    padding: '12px 24px',
                    border: `2px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${tier.recommended ? colors.deepMagenta : colors.charcoal}`
                  }}
                >
                  <p className={`${typography.headingL} font-black`}>{tier.price}</p>
                </div>
                <p 
                  className={`${typography.bodyM} font-semibold mb-2`}
                  style={{ color: colors.charcoal }}
                >
                  {tier.timeline}
                </p>
                <p 
                  className={`${typography.bodyS} mb-6`}
                  style={{ color: colors.graphite }}
                >
                  {tier.description}
                </p>
              </div>

              {/* Features List */}
              <div 
                className="px-6 pb-6"
                style={{ borderTop: `3px solid ${colors.black}` }}
              >
                <div className="pt-6 space-y-4">
                  {features.map((feature, featureIndex) => {
                    const value = tierIndex === 0 ? feature.basic : tierIndex === 1 ? feature.ecommerce : feature.enterprise;
                    return (
                      <div
                        key={featureIndex}
                        className="flex items-center justify-between"
                        style={{
                          paddingBottom: '12px',
                          borderBottom: featureIndex < features.length - 1 ? `2px solid ${colors.steel}` : 'none'
                        }}
                      >
                        <span 
                          className={`${typography.bodyS} font-semibold`}
                          style={{ color: colors.obsidian }}
                        >
                          {feature.name}
                        </span>
                        <span className="flex-shrink-0 ml-4">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <div 
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  background: colors.emerald,
                                  border: `2px solid ${colors.black}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: `2px 2px 0px ${colors.black}`,
                                  color: colors.white
                                }}
                              >
                                <CheckIcon className="w-4 h-4" />
                              </div>
                            ) : (
                              <div 
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  background: colors.steel,
                                  border: `2px solid ${colors.black}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0.5,
                                  color: colors.charcoal
                                }}
                              >
                                <XIcon className="w-3 h-3" />
                              </div>
                            )
                          ) : (
                            <span 
                              className={`${typography.bodyS} font-medium text-right`}
                              style={{ color: colors.obsidian, maxWidth: '120px' }}
                            >
                              {value}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                {showCTA && (
                  <button 
                    className={`${typography.bodyM} font-bold uppercase w-full py-4 mt-6`}
                    style={{
                      background: tier.recommended 
                        ? `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`
                        : colors.white,
                      color: tier.recommended ? colors.white : colors.black,
                      border: `3px solid ${colors.black}`,
                      boxShadow: `4px 4px 0px ${colors.black}`,
                      letterSpacing: '0.5px',
                      transition: 'all 0.1s ease',
                      cursor: 'pointer'
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
                    }}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};