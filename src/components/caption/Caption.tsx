import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface CaptionProps {
  children: React.ReactNode;
  variant?: 'default' | 'meta' | 'label' | 'timestamp';
  color?: 'default' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  animate?: boolean;
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({
  children,
  variant = 'default',
  color = 'muted',
  align = 'left',
  uppercase = false,
  animate = true,
  className = '',
}) => {
  const colorMap = {
    default: colors.charcoal,
    muted: colors.graphite,
    accent: colors.electricOrange,
  };

  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseClasses = `${typography.classes.caption} ${alignMap[align]} ${uppercase ? 'uppercase' : ''} ${className}`;

  const renderCaption = () => {
    switch (variant) {
      case 'default':
        return (
          <motion.span
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={baseClasses}
            style={{ color: colorMap[color] }}
          >
            {children}
          </motion.span>
        );

      case 'meta':
        return (
          <motion.div
            initial={animate ? { opacity: 0, y: 5 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`${baseClasses} flex items-center gap-2`}
            style={{ color: colorMap[color] }}
          >
            {children}
          </motion.div>
        );

      case 'label':
        return (
          <motion.span
            initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`${baseClasses} inline-block px-2 py-1`}
            style={{ 
              color: colors.obsidian,
              background: colors.concrete,
              border: `2px solid ${colors.black}`,
              fontWeight: 700,
            }}
          >
            {children}
          </motion.span>
        );

      case 'timestamp':
        return (
          <motion.time
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`${baseClasses} font-mono`}
            style={{ color: colorMap[color] }}
          >
            {children}
          </motion.time>
        );

      default:
        return (
          <span className={baseClasses} style={{ color: colorMap[color] }}>
            {children}
          </span>
        );
    }
  };

  return renderCaption();
};