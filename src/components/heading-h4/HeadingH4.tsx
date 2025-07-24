import React from 'react';
import { motion } from 'framer-motion';
import { colors, type AccentColor } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface HeadingH4Props {
  children: React.ReactNode;
  variant?: 'default' | 'caps' | 'tag' | 'icon-left';
  accentColor?: AccentColor;
  icon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  className?: string;
}

export const HeadingH4: React.FC<HeadingH4Props> = ({
  children,
  variant = 'default',
  accentColor = 'orange',
  icon,
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

  const baseClasses = `${typography.classes.headingM} ${alignMap[align]} ${className}`;

  const renderHeading = () => {
    switch (variant) {
      case 'default':
        return (
          <motion.h4
            initial={animate ? { opacity: 0, y: 5 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={baseClasses}
            style={{ color: colors.obsidian }}
          >
            {children}
          </motion.h4>
        );

      case 'caps':
        return (
          <motion.h4
            initial={animate ? { opacity: 0, y: 5 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`${baseClasses} uppercase tracking-wider`}
            style={{ color: colors.charcoal }}
          >
            {children}
          </motion.h4>
        );

      case 'tag':
        return (
          <motion.div
            initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`inline-block ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}
          >
            <h4
              className={`${typography.classes.headingS} px-3 py-1 uppercase tracking-wider`}
              style={{
                background: colors.concrete,
                color: currentAccent,
                border: `2px solid ${currentAccent}`,
                fontWeight: 700,
              }}
            >
              {children}
            </h4>
          </motion.div>
        );

      case 'icon-left':
        return (
          <motion.div
            initial={animate ? { opacity: 0, x: -10 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}
          >
            {icon && (
              <span style={{ color: currentAccent, fontSize: '20px' }}>
                {icon}
              </span>
            )}
            <h4 className={baseClasses} style={{ color: colors.obsidian }}>
              {children}
            </h4>
          </motion.div>
        );

      default:
        return (
          <h4 className={baseClasses} style={{ color: colors.obsidian }}>
            {children}
          </h4>
        );
    }
  };

  return renderHeading();
};