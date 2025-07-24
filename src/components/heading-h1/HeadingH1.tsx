import React from 'react';
import { motion } from 'framer-motion';
import { colors, gradients, shadows, borders, type AccentColor } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface HeadingH1Props {
  children: React.ReactNode;
  variant?: 'hero' | 'brutal-outline' | 'split-color' | 'gradient' | 'shadow-stack' | 'glitch' | 'neon';
  accentColor?: AccentColor;
  size?: 'medium' | 'large' | 'xl';
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  className?: string;
}

export const HeadingH1: React.FC<HeadingH1Props> = ({
  children,
  variant = 'hero',
  accentColor = 'orange',
  size = 'large',
  align = 'center',
  animate = true,
  className = '',
}) => {
  const currentAccent = colors[accentColor === 'orange' ? 'electricOrange' : 
                                accentColor === 'blue' ? 'cyberBlue' : 
                                accentColor === 'red' ? 'crimsonRed' : 
                                'deepMagenta'];

  const sizeMap = {
    medium: typography.classes.displayM,
    large: typography.classes.displayL,
    xl: typography.classes.displayXL,
  };

  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseClasses = `${sizeMap[size]} ${alignMap[align]} ${className}`;

  const renderHeading = () => {
    switch (variant) {
      case 'hero':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${baseClasses} uppercase`}
            style={{
              color: colors.obsidian,
              textShadow: `4px 4px 0px ${currentAccent}`,
            }}
          >
            {children}
          </motion.h1>
        );

      case 'brutal-outline':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`${baseClasses} uppercase`}
            style={{
              WebkitTextStroke: `3px ${colors.black}`,
              WebkitTextFillColor: 'transparent',
              textStroke: `3px ${colors.black}`,
              position: 'relative',
            }}
          >
            {children}
            <span
              style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                WebkitTextStroke: 'none',
                WebkitTextFillColor: currentAccent,
                textStroke: 'none',
                zIndex: -1,
              }}
              aria-hidden="true"
            >
              {children}
            </span>
          </motion.h1>
        );

      case 'split-color':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${baseClasses} uppercase relative overflow-hidden`}
          >
            <span style={{ color: colors.obsidian }}>{children}</span>
            <span
              className="absolute inset-0"
              style={{
                color: currentAccent,
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
              aria-hidden="true"
            >
              {children}
            </span>
          </motion.h1>
        );

      case 'gradient':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${baseClasses} uppercase`}
            style={{
              background: gradients.brand,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            {children}
          </motion.h1>
        );

      case 'shadow-stack':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, y: 30 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${baseClasses} uppercase relative`}
            style={{ color: colors.obsidian }}
          >
            {children}
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute top-0 left-0 w-full"
                style={{
                  color: currentAccent,
                  transform: `translate(${i * 4}px, ${i * 4}px)`,
                  opacity: 1 - i * 0.3,
                  zIndex: -i,
                }}
                aria-hidden="true"
              >
                {children}
              </span>
            ))}
          </motion.h1>
        );

      case 'glitch':
        return (
          <motion.h1
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6 }}
            className={`${baseClasses} uppercase relative`}
            style={{ color: colors.obsidian }}
          >
            {children}
            <motion.span
              className="absolute top-0 left-0"
              animate={{
                x: [-2, 2, -2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                times: [0, 0.5, 1],
              }}
              style={{
                color: currentAccent,
                textShadow: `2px 0 ${colors.cyberBlue}`,
              }}
              aria-hidden="true"
            >
              {children}
            </motion.span>
            <motion.span
              className="absolute top-0 left-0"
              animate={{
                x: [2, -2, 2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                times: [0, 0.5, 1],
                delay: 0.5,
              }}
              style={{
                color: colors.deepMagenta,
                textShadow: `-2px 0 ${currentAccent}`,
              }}
              aria-hidden="true"
            >
              {children}
            </motion.span>
          </motion.h1>
        );

      case 'neon':
        return (
          <motion.h1
            initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${baseClasses} uppercase`}
            style={{
              color: currentAccent,
              textShadow: `
                0 0 10px ${currentAccent},
                0 0 20px ${currentAccent},
                0 0 30px ${currentAccent},
                0 0 40px ${currentAccent}
              `,
            }}
          >
            {children}
          </motion.h1>
        );

      default:
        return (
          <h1 className={baseClasses} style={{ color: colors.obsidian }}>
            {children}
          </h1>
        );
    }
  };

  return renderHeading();
};