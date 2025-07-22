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

// Arrow Icon
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Download Icon
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

// Calendar Icon
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Mail Icon
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Sparkles Icon
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
  </svg>
);

interface CTABannerProps {
  variant?: 'default' | 'newsletter' | 'download' | 'consultation' | 'minimal';
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  alignment?: 'left' | 'center' | 'right';
  showIcon?: boolean;
  customIcon?: React.ReactNode;
  className?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  variant = 'default',
  title,
  subtitle,
  buttonText,
  buttonLink = '#',
  onButtonClick,
  accentColor = 'orange',
  alignment = 'center',
  showIcon = true,
  customIcon,
  className = ''
}) => {
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed
  };

  const currentAccent = accentColors[accentColor];

  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (variant) {
      case 'newsletter':
        return <MailIcon className="w-8 h-8" />;
      case 'download':
        return <DownloadIcon className="w-8 h-8" />;
      case 'consultation':
        return <CalendarIcon className="w-8 h-8" />;
      default:
        return <SparklesIcon className="w-8 h-8" />;
    }
  };

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      default:
        return 'text-center items-center';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${className}`}
      >
        <div
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div className="flex-1">
            <h3 
              className={`${typography.headingM}`}
              style={{ color: colors.black }}
            >
              {title}
            </h3>
          </div>
          <a
            href={buttonLink}
            onClick={handleClick}
            className={`${typography.bodyM} font-bold uppercase inline-flex items-center gap-2`}
            style={{
              color: currentAccent,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.black;
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = currentAccent;
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {buttonText}
            <ArrowIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    );
  }

  // Full variants
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${currentAccent} 0%, ${colors.crimsonRed} 100%)`,
          border: `4px solid ${colors.black}`,
          boxShadow: `8px 8px 0px ${colors.black}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 20px
            )`,
            pointerEvents: 'none'
          }}
        />

        <div 
          className={`relative z-10 px-6 py-12 sm:px-12 sm:py-16 ${getAlignmentClasses()}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className={`flex flex-col sm:flex-row gap-8 ${alignment === 'center' ? 'items-center' : ''}`}>
              {/* Icon */}
              {showIcon && (
                <div
                  className="flex-shrink-0"
                  style={{
                    background: colors.white,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-5deg)'
                  }}
                >
                  <div style={{ color: colors.black, transform: 'rotate(5deg)' }}>
                    {getIcon()}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className={`flex-1 ${alignment === 'center' ? 'text-center sm:text-left' : ''}`}>
                <h2 
                  className={`${typography.displayS} uppercase mb-3`}
                  style={{ 
                    color: colors.white,
                    textShadow: `3px 3px 0px ${colors.black}`
                  }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p 
                    className={`${typography.bodyL} mb-6`}
                    style={{ color: colors.white }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Button */}
                <motion.a
                  href={buttonLink}
                  onClick={handleClick}
                  className={`${typography.bodyM} font-bold uppercase inline-flex items-center gap-3 px-8 py-4`}
                  style={{
                    background: colors.white,
                    color: colors.black,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                    textDecoration: 'none',
                    transition: 'all 0.1s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    x: -2,
                    y: -2,
                  }}
                  whileTap={{
                    x: 2,
                    y: 2,
                  }}
                  onHoverStart={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.boxShadow = `6px 6px 0px ${colors.black}`;
                  }}
                  onHoverEnd={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.boxShadow = `4px 4px 0px ${colors.black}`;
                  }}
                >
                  {buttonText}
                  <ArrowIcon className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};