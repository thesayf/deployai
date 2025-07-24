/**
 * Typography System Constants
 * Based on deployAI's neubrutalist design system
 * All typography values are centralized here for consistency
 */

// Font Families
export const fontFamilies = {
  primary: 'Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
  secondary: 'Inter, SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
  mono: 'JetBrains Mono, SF Mono, Consolas, Liberation Mono, monospace',
} as const;

// Font Weights
export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// Type Scale - Based on design_system.md
export const typeScale = {
  // Display sizes (for heroes and major headings)
  displayXL: {
    fontSize: '4.5rem', // 72px
    lineHeight: 1.1,
    fontWeight: fontWeights.black,
    letterSpacing: '-0.02em',
    className: 'text-6xl sm:text-7xl md:text-8xl',
  },
  displayL: {
    fontSize: '3.75rem', // 60px
    lineHeight: 1.1,
    fontWeight: fontWeights.black,
    letterSpacing: '-0.02em',
    className: 'text-5xl sm:text-6xl',
  },
  displayM: {
    fontSize: '3rem', // 48px
    lineHeight: 1.2,
    fontWeight: fontWeights.extrabold,
    letterSpacing: '-0.01em',
    className: 'text-4xl sm:text-5xl',
  },
  displayS: {
    fontSize: '2.25rem', // 36px
    lineHeight: 1.2,
    fontWeight: fontWeights.extrabold,
    letterSpacing: '-0.01em',
    className: 'text-3xl sm:text-4xl',
  },
  
  // Heading sizes (for section and component headers)
  headingXL: {
    fontSize: '1.875rem', // 30px
    lineHeight: 1.3,
    fontWeight: fontWeights.bold,
    letterSpacing: '0em',
    className: 'text-2xl sm:text-3xl',
  },
  headingL: {
    fontSize: '1.5rem', // 24px
    lineHeight: 1.4,
    fontWeight: fontWeights.bold,
    letterSpacing: '0em',
    className: 'text-xl sm:text-2xl',
  },
  headingM: {
    fontSize: '1.25rem', // 20px
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
    letterSpacing: '0em',
    className: 'text-lg sm:text-xl',
  },
  headingS: {
    fontSize: '1.125rem', // 18px
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
    letterSpacing: '0em',
    className: 'text-base sm:text-lg',
  },
  
  // Body text sizes
  bodyL: {
    fontSize: '1.125rem', // 18px
    lineHeight: 1.6,
    fontWeight: fontWeights.normal,
    letterSpacing: '0em',
    className: 'text-lg',
  },
  bodyM: {
    fontSize: '1rem', // 16px
    lineHeight: 1.6,
    fontWeight: fontWeights.normal,
    letterSpacing: '0em',
    className: 'text-base',
  },
  bodyS: {
    fontSize: '0.875rem', // 14px
    lineHeight: 1.5,
    fontWeight: fontWeights.normal,
    letterSpacing: '0em',
    className: 'text-sm',
  },
  
  // Caption and metadata
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
    letterSpacing: '0.01em',
    className: 'text-xs',
  },
} as const;

// Tailwind Classes for Typography
export const typographyClasses = {
  // Display classes
  displayXL: 'text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight',
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  
  // Heading classes
  headingXL: 'text-2xl sm:text-3xl font-bold leading-tight',
  headingL: 'text-xl sm:text-2xl font-bold leading-snug',
  headingM: 'text-lg sm:text-xl font-semibold leading-snug',
  headingS: 'text-base sm:text-lg font-semibold leading-snug',
  
  // Body classes
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  
  // Caption
  caption: 'text-xs font-medium leading-tight tracking-wide',
} as const;

// Spacing System - Based on 8px grid
export const spacing = {
  // Component spacing
  h1ToP: 32, // 2rem
  h2ToP: 24, // 1.5rem
  h3ToP: 16, // 1rem
  h4ToP: 12, // 0.75rem
  pToP: 16, // 1rem
  
  // Section spacing
  sectionSmall: 48, // 3rem
  sectionMedium: 64, // 4rem
  sectionLarge: 96, // 6rem
  sectionXL: 128, // 8rem
  
  // Element spacing
  elementTight: 8, // 0.5rem
  elementDefault: 16, // 1rem
  elementRelaxed: 24, // 1.5rem
  elementLoose: 32, // 2rem
} as const;

// Spacing Classes
export const spacingClasses = {
  // Heading to paragraph spacing
  h1ToP: 'mb-8', // 32px
  h2ToP: 'mb-6', // 24px
  h3ToP: 'mb-4', // 16px
  h4ToP: 'mb-3', // 12px
  
  // Paragraph spacing
  pToP: 'mb-4', // 16px
  
  // Section spacing
  sectionSmall: 'py-12', // 48px
  sectionMedium: 'py-16', // 64px
  sectionLarge: 'py-24', // 96px
  sectionXL: 'py-32', // 128px
} as const;

// Text Decoration Classes
export const textDecorationClasses = {
  // Underlines
  underlineBrutal: 'underline underline-offset-4 decoration-4 decoration-black',
  underlineAccent: 'underline underline-offset-4 decoration-4',
  
  // Text transforms
  uppercase: 'uppercase tracking-wider',
  
  // Text shadows (for brutal effect)
  shadowBrutal: 'drop-shadow-[3px_3px_0px_#000000]',
  shadowAccent: 'drop-shadow-[3px_3px_0px_var(--accent-color)]',
} as const;

// Export a convenience object with all typography utilities
export const typography = {
  families: fontFamilies,
  weights: fontWeights,
  scale: typeScale,
  classes: typographyClasses,
  spacing,
  spacingClasses,
  decoration: textDecorationClasses,
} as const;

// Type exports for TypeScript
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type TypeScale = keyof typeof typeScale;
export type TypographyClass = keyof typeof typographyClasses;
export type SpacingKey = keyof typeof spacing;
export type SpacingClass = keyof typeof spacingClasses;