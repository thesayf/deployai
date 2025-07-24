import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface TextLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'default' | 'underline' | 'arrow' | 'button' | 'highlight';
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'accent' | 'white' | 'muted';
  external?: boolean;
  animate?: boolean;
  className?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  href,
  variant = 'default',
  size = 'medium',
  color = 'accent',
  external = false,
  animate = true,
  className = '',
}) => {
  const sizeMap = {
    small: typography.classes.bodyS,
    medium: typography.classes.bodyM,
    large: typography.classes.bodyL,
  };

  const colorMap = {
    default: colors.cyberBlue,
    accent: colors.electricOrange,
    white: colors.white,
    muted: colors.graphite,
  };

  const baseClasses = `${sizeMap[size]} font-bold inline-flex items-center gap-2 transition-all duration-200 ${className}`;

  const linkProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};

  const renderLink = () => {
    switch (variant) {
      case 'default':
        return (
          <motion.span
            className={baseClasses}
            style={{ color: colorMap[color] }}
            whileHover={animate ? { 
              x: 2,
              color: colors.deepMagenta,
            } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
          >
            {children}
          </motion.span>
        );

      case 'underline':
        return (
          <motion.span
            className={`${baseClasses} relative`}
            style={{ color: colorMap[color] }}
            whileHover={animate ? { y: -1 } : undefined}
          >
            {children}
            <motion.span
              className="absolute left-0 bottom-0 w-full h-0.5"
              style={{ background: colorMap[color] }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.span>
        );

      case 'arrow':
        return (
          <motion.span
            className={baseClasses}
            style={{ color: colorMap[color] }}
            whileHover={animate ? { x: 2 } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
          >
            {children}
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </motion.svg>
          </motion.span>
        );

      case 'button':
        return (
          <motion.span
            className={`${baseClasses} px-4 py-2`}
            style={{ 
              color: colors.obsidian,
              background: colorMap[color],
              border: `3px solid ${colors.black}`,
              boxShadow: '4px 4px 0px #000000',
            }}
            whileHover={animate ? { 
              scale: 1.02,
              boxShadow: '6px 6px 0px #000000',
            } : undefined}
            whileTap={animate ? { 
              scale: 0.98,
              boxShadow: '2px 2px 0px #000000',
            } : undefined}
          >
            {children}
          </motion.span>
        );

      case 'highlight':
        return (
          <motion.span
            className={`${baseClasses} relative px-1`}
            style={{ color: colorMap[color] }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ 
                background: colors.neonYellow,
                transformOrigin: 'bottom',
                zIndex: -1,
              }}
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            {children}
          </motion.span>
        );

      default:
        return (
          <span className={baseClasses} style={{ color: colorMap[color] }}>
            {children}
          </span>
        );
    }
  };

  if (external || href.startsWith('http')) {
    return (
      <a href={href} {...linkProps} className="inline-flex">
        {renderLink()}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex">
      {renderLink()}
    </Link>
  );
};