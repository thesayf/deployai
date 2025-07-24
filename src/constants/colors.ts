/**
 * Color System Constants
 * Based on deployAI's neubrutalist design system
 * All color values are centralized here for consistency
 */

// Core Colors
export const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand Colors
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
  
  // Semantic Colors
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3',
  
  // Additional Brand Colors
  warmPeach: '#FFF5F0',
  coolMint: '#F0FFF5',
  skyBlue: '#F0F5FF',
  lavender: '#F5F0FF',
} as const;

// Gradients
export const gradients = {
  fire: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
  ocean: 'linear-gradient(135deg, #457B9D 0%, #1E3A8A 100%)',
  sunset: 'linear-gradient(135deg, #F59E0B 0%, #E63946 100%)',
  electric: 'linear-gradient(135deg, #D62598 0%, #457B9D 100%)',
  emeraldSapphire: 'linear-gradient(135deg, #00C851 0%, #2196F3 100%)',
  brand: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
} as const;

// Color Combinations for Components
export const colorCombos = {
  // Text on backgrounds
  textOnWhite: colors.obsidian,
  textOnLight: colors.charcoal,
  textOnDark: colors.white,
  textMuted: colors.graphite,
  
  // Accent colors by name
  accent: {
    orange: colors.electricOrange,
    red: colors.crimsonRed,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
  },
  
  // Background colors
  background: {
    default: colors.white,
    subtle: colors.concrete,
    dark: colors.obsidian,
    warmPeach: colors.warmPeach,
    coolMint: colors.coolMint,
    skyBlue: colors.skyBlue,
    lavender: colors.lavender,
  },
} as const;

// Shadow values for neubrutalist style
export const shadows = {
  brutal: {
    sm: '2px 2px 0px #000000',
    md: '4px 4px 0px #000000',
    lg: '6px 6px 0px #000000',
    xl: '8px 8px 0px #000000',
    xxl: '12px 12px 0px #000000',
  },
  colored: {
    orange: {
      sm: '2px 2px 0px #FF6B35',
      md: '4px 4px 0px #FF6B35',
      lg: '6px 6px 0px #FF6B35',
    },
    blue: {
      sm: '2px 2px 0px #457B9D',
      md: '4px 4px 0px #457B9D',
      lg: '6px 6px 0px #457B9D',
    },
  },
} as const;

// Border styles
export const borders = {
  brutal: '3px solid #000000',
  brutalThin: '2px solid #000000',
  brutalThick: '4px solid #000000',
  colored: {
    orange: '3px solid #FF6B35',
    blue: '3px solid #457B9D',
    red: '3px solid #E63946',
  },
} as const;

// Export type definitions
export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
export type AccentColor = keyof typeof colorCombos.accent;
export type BackgroundColor = keyof typeof colorCombos.background;