import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography, spacingClasses } from '@/constants/typography';

interface ParagraphProps {
  children: React.ReactNode;
  variant?: 'lead' | 'body' | 'small' | 'quote' | 'highlight';
  size?: 'large' | 'medium' | 'small';
  color?: 'default' | 'muted' | 'accent' | 'white';
  align?: 'left' | 'center' | 'right' | 'justify';
  spacing?: boolean;
  animate?: boolean;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = 'body',
  size = 'medium',
  color = 'default',
  align = 'left',
  spacing = true,
  animate = true,
  className = '',
}) => {
  const sizeMap = {
    large: typography.classes.bodyL,
    medium: typography.classes.bodyM,
    small: typography.classes.bodyS,
  };

  const colorMap = {
    default: colors.charcoal,
    muted: colors.graphite,
    accent: colors.electricOrange,
    white: colors.white,
  };

  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const baseClasses = `${sizeMap[size]} ${alignMap[align]} ${spacing ? spacingClasses.pToP : ''} ${className}`;

  const renderParagraph = () => {
    switch (variant) {
      case 'lead':
        return (
          <motion.p
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${typography.classes.bodyL} ${alignMap[align]} ${spacing ? spacingClasses.pToP : ''} ${className}`}
            style={{ 
              color: colorMap[color],
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            {children}
          </motion.p>
        );

      case 'body':
        return (
          <motion.p
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={baseClasses}
            style={{ color: colorMap[color] }}
          >
            {children}
          </motion.p>
        );

      case 'small':
        return (
          <motion.p
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`${typography.classes.bodyS} ${alignMap[align]} ${spacing ? spacingClasses.pToP : ''} ${className}`}
            style={{ color: colorMap[color] }}
          >
            {children}
          </motion.p>
        );

      case 'quote':
        return (
          <motion.blockquote
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${baseClasses} relative pl-6`}
            style={{ 
              color: colorMap[color],
              fontStyle: 'italic',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                background: colors.electricOrange,
              }}
            />
            {children}
          </motion.blockquote>
        );

      case 'highlight':
        return (
          <motion.p
            initial={animate ? { opacity: 0, scale: 0.98 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${baseClasses} px-4 py-3`}
            style={{ 
              color: colors.obsidian,
              background: colors.warmPeach,
              border: `3px solid ${colors.electricOrange}`,
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            {children}
          </motion.p>
        );

      default:
        return (
          <p className={baseClasses} style={{ color: colorMap[color] }}>
            {children}
          </p>
        );
    }
  };

  return renderParagraph();
};