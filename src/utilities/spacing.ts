/**
 * Spacing utilities for consistent typography spacing throughout the application.
 * These utilities provide CSS classes and helper functions for managing space between elements.
 */

import { spacingClasses } from '@/constants/typography';

/**
 * Get the appropriate spacing class based on element types
 * @param from - The element type spacing from (e.g., 'h1', 'h2', 'p')
 * @param to - The element type spacing to (e.g., 'p', 'h3')
 * @returns The appropriate Tailwind spacing class
 */
export const getSpacingClass = (from: string, to: string): string => {
  const key = `${from}To${to.charAt(0).toUpperCase()}${to.slice(1)}` as keyof typeof spacingClasses;
  return spacingClasses[key] || 'mb-4';
};

/**
 * Combine multiple spacing classes with proper precedence
 * @param classes - Array of spacing classes
 * @returns Combined spacing class string
 */
export const combineSpacing = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Typography spacing presets for common patterns
 */
export const spacingPresets = {
  // Section spacing
  sectionGap: 'space-y-12',
  sectionGapLarge: 'space-y-16',
  sectionGapSmall: 'space-y-8',
  
  // Content spacing
  contentGap: 'space-y-6',
  contentGapLarge: 'space-y-8',
  contentGapSmall: 'space-y-4',
  
  // Card spacing
  cardContent: 'space-y-4',
  cardContentCompact: 'space-y-2',
  
  // List spacing
  listGap: 'space-y-2',
  listGapLarge: 'space-y-4',
  
  // Inline spacing
  inlineGap: 'space-x-2',
  inlineGapLarge: 'space-x-4',
};

/**
 * Responsive spacing utilities
 */
export const responsiveSpacing = {
  // Padding
  section: 'px-4 sm:px-6 lg:px-8',
  content: 'px-4 sm:px-6',
  card: 'p-4 sm:p-6 lg:p-8',
  
  // Margins
  sectionY: 'my-12 sm:my-16 lg:my-20',
  contentY: 'my-6 sm:my-8 lg:my-10',
};

/**
 * Helper to apply conditional spacing
 * @param condition - Boolean condition
 * @param trueClass - Class to apply if true
 * @param falseClass - Class to apply if false
 * @returns The appropriate spacing class
 */
export const conditionalSpacing = (
  condition: boolean,
  trueClass: string,
  falseClass: string = ''
): string => {
  return condition ? trueClass : falseClass;
};