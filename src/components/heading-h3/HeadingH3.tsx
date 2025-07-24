import React from 'react';
import { motion } from 'framer-motion';
import { colors, shadows, borders, type AccentColor } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface HeadingH3Props {
  children: React.ReactNode;
  variant?: 'default' | 'pill' | 'arrow' | 'badge' | 'underline' | 'numbered';
  accentColor?: AccentColor;
  number?: string | number;
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  className?: string;
}

export const HeadingH3: React.FC<HeadingH3Props> = ({
  children,
  variant = 'default',
  accentColor = 'orange',
  number,
  align = 'left',
  animate = true,
  className = '',
}) => {
  const currentAccent = colors[accentColor === 'orange' ? 'electricOrange' : 
                                accentColor === 'blue' ? 'cyberBlue' : 
                                accentColor === 'red' ? 'crimsonRed' : 
                                'deepMagenta'];

  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseClasses = `${typography.classes.headingL} ${alignMap[align]} ${className}`;

  const renderHeading = () => {
    switch (variant) {
      case 'default':
        return (
          <motion.h3
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={baseClasses}
            style={{ color: colors.obsidian }}
          >
            {children}
          </motion.h3>
        );

      case 'pill':
        return (
          <motion.div
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`inline-block ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}
          >
            <h3
              className={`${baseClasses} px-6 py-2`}
              style={{
                background: currentAccent,
                color: colors.white,
                border: borders.brutal,
                boxShadow: shadows.brutal.md,
              }}
            >
              {children}
            </h3>
          </motion.div>
        );

      case 'arrow':
        return (
          <motion.div
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}
          >
            <div
              style={{
                width: '0',
                height: '0',
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderLeft: `20px solid ${currentAccent}`,
              }}
            />
            <h3 className={baseClasses} style={{ color: colors.obsidian }}>
              {children}
            </h3>
          </motion.div>
        );

      case 'badge':
        return (
          <motion.div
            initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`inline-block ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}
          >
            <div
              style={{
                background: colors.white,
                border: borders.brutal,
                boxShadow: shadows.brutal.sm,
                padding: '8px 20px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-3px',
                  left: '-3px',
                  right: '-3px',
                  height: '6px',
                  background: currentAccent,
                }}
              />
              <h3 className={baseClasses} style={{ color: colors.obsidian }}>
                {children}
              </h3>
            </div>
          </motion.div>
        );

      case 'underline':
        return (
          <motion.div
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}
          >
            <h3 className={`${baseClasses} inline-block relative`} style={{ color: colors.obsidian }}>
              {children}
              <motion.div
                initial={animate ? { scaleX: 0 } : undefined}
                animate={animate ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: currentAccent,
                  transformOrigin: 'left',
                }}
              />
            </h3>
          </motion.div>
        );

      case 'numbered':
        return (
          <motion.div
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}
          >
            {number !== undefined && (
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: currentAccent,
                  color: colors.white,
                  border: borders.brutal,
                  boxShadow: shadows.brutal.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {number}
              </div>
            )}
            <h3 className={baseClasses} style={{ color: colors.obsidian }}>
              {children}
            </h3>
          </motion.div>
        );

      default:
        return (
          <h3 className={baseClasses} style={{ color: colors.obsidian }}>
            {children}
          </h3>
        );
    }
  };

  return renderHeading();
};