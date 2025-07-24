import React from 'react';
import { motion } from 'framer-motion';

// Design System Colors
const colors = {
  // Foundation
  black: '#000000',
  white: '#FFFFFF',
  
  // Primary
  orange: '#FF6B35',
  blue: '#457B9D',
  magenta: '#D62598',
  red: '#DC2626',
  
  // Neutrals
  charcoal: '#212121',
  graphite: '#424242',
  steel: '#757575',
  concrete: '#F5F5F5',
  
  // Supporting
  amber: '#F59E0B',
  emerald: '#10B981',
  
  // Gradients
  gradients: {
    fire: 'linear-gradient(135deg, #FF6B35 0%, #DC2626 100%)',
    ocean: 'linear-gradient(135deg, #457B9D 0%, #1E3A8A 100%)',
    sunset: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)',
    electric: 'linear-gradient(135deg, #D62598 0%, #457B9D 100%)',
  }
};

interface HeadingH2Props {
  children: React.ReactNode;
  variant?: 'default' | 'side-accent' | 'underline-brutal' | 'box-shadow' | 'bracket' | 'gradient-text' | 'split-bg' | 'offset-border' | 'stamp' | 'slash';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  size?: 'small' | 'medium' | 'large' | 'xl';
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  className?: string;
}

export const HeadingH2: React.FC<HeadingH2Props> = ({
  children,
  variant = 'default',
  accentColor = 'orange',
  size = 'medium',
  align = 'left',
  animate = true,
  className = '',
}) => {
  const currentAccent = colors[accentColor];
  
  const sizeClasses = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseClasses = `${sizeClasses[size]} ${alignClasses[align]} font-black leading-tight`;

  const renderHeading = () => {
    switch (variant) {
      case 'default':
        return (
          <h2 
            className={`${baseClasses} ${className}`}
            style={{ color: colors.charcoal }}
          >
            {children}
          </h2>
        );

      case 'side-accent':
        return (
          <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
            <div
              style={{
                width: '8px',
                height: '100%',
                background: currentAccent,
                flexShrink: 0,
              }}
            />
            <h2 
              className={`${baseClasses} ${className}`}
              style={{ color: colors.charcoal }}
            >
              {children}
            </h2>
          </div>
        );

      case 'underline-brutal':
        return (
          <div className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}>
            <div className="inline-block">
              <h2 
                className={`${baseClasses} ${className} mb-3`}
                style={{ color: colors.charcoal }}
              >
                {children}
              </h2>
              <div
                style={{
                  height: '8px',
                  background: currentAccent,
                  border: `3px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${colors.black}`,
                }}
              />
            </div>
          </div>
        );

      case 'box-shadow':
        return (
          <h2 
            className={`${baseClasses} ${className}`}
            style={{ 
              color: colors.charcoal,
              textShadow: `4px 4px 0px ${currentAccent}`,
            }}
          >
            {children}
          </h2>
        );

      case 'bracket':
        return (
          <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
            <span 
              className={sizeClasses[size]}
              style={{ 
                color: currentAccent,
                fontWeight: 900,
              }}
            >
              [
            </span>
            <h2 
              className={`${baseClasses} ${className}`}
              style={{ color: colors.charcoal }}
            >
              {children}
            </h2>
            <span 
              className={sizeClasses[size]}
              style={{ 
                color: currentAccent,
                fontWeight: 900,
              }}
            >
              ]
            </span>
          </div>
        );

      case 'gradient-text':
        return (
          <h2 
            className={`${baseClasses} ${className}`}
            style={{ 
              background: colors.gradients[accentColor === 'orange' ? 'fire' : accentColor === 'blue' ? 'ocean' : accentColor === 'magenta' ? 'electric' : 'sunset'],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {children}
          </h2>
        );

      case 'split-bg':
        return (
          <div className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}>
            <div className="relative inline-block">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: currentAccent,
                  clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)',
                }}
              />
              <h2 
                className={`${baseClasses} ${className} px-8 py-4`}
                style={{ 
                  color: colors.white,
                  mixBlendMode: 'difference',
                }}
              >
                {children}
              </h2>
            </div>
          </div>
        );

      case 'offset-border':
        return (
          <div className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}>
            <div className="relative inline-block">
              <div
                className="absolute inset-0"
                style={{
                  border: `3px solid ${currentAccent}`,
                  transform: 'translate(8px, 8px)',
                }}
              />
              <h2 
                className={`${baseClasses} ${className} relative px-6 py-3`}
                style={{ 
                  color: colors.charcoal,
                  background: colors.white,
                  border: `3px solid ${colors.black}`,
                }}
              >
                {children}
              </h2>
            </div>
          </div>
        );

      case 'stamp':
        return (
          <div className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}>
            <div 
              className="inline-block"
              style={{
                background: currentAccent,
                border: `3px solid ${colors.black}`,
                padding: '16px 32px',
                transform: 'rotate(-2deg)',
                boxShadow: `6px 6px 0px ${colors.black}`,
              }}
            >
              <h2 
                className={`${baseClasses} ${className}`}
                style={{ 
                  color: colors.white,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transform: 'rotate(2deg)',
                }}
              >
                {children}
              </h2>
            </div>
          </div>
        );

      case 'slash':
        return (
          <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
            <div
              style={{
                width: '60px',
                height: '6px',
                background: currentAccent,
                transform: 'skewX(-20deg)',
              }}
            />
            <h2 
              className={`${baseClasses} ${className}`}
              style={{ color: colors.charcoal }}
            >
              {children}
            </h2>
            <div
              style={{
                width: '60px',
                height: '6px',
                background: currentAccent,
                transform: 'skewX(-20deg)',
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {renderHeading()}
      </motion.div>
    );
  }

  return renderHeading();
};