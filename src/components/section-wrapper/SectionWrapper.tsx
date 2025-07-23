import React from 'react';

interface SectionWrapperProps {
  variant?: 'default' | 'warmPeach' | 'coolMint' | 'skyBlue' | 'lavender' | 'concrete' | 'dark' | 'gradient' | 'custom';
  customBg?: string;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  width?: 'full' | 'container' | 'narrow';
  children: React.ReactNode;
  className?: string;
  id?: string; // For anchor links
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  variant = 'default',
  customBg,
  spacing = 'medium',
  width = 'container',
  children,
  className = '',
  id
}) => {
  // Background variants mapping
  const backgrounds = {
    default: 'bg-white',
    warmPeach: 'bg-[#FFF5F0]',
    coolMint: 'bg-[#F0FFF5]',
    skyBlue: 'bg-[#F0F5FF]',
    lavender: 'bg-[#F5F0FF]',
    concrete: 'bg-[#F5F5F5]',
    dark: 'bg-[#212121]',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50',
    custom: '',
  };

  // Spacing variants
  const spacingClasses = {
    none: '',
    small: 'py-8 px-4 sm:px-6 lg:px-8',
    medium: 'py-16 px-4 sm:px-6 lg:px-8',
    large: 'py-24 px-4 sm:px-6 lg:px-8',
  };

  // Width variants
  const widthClasses = {
    full: 'w-full',
    container: 'max-w-7xl mx-auto',
    narrow: 'max-w-4xl mx-auto',
  };

  // Get the background class
  const bgClass = variant === 'custom' ? '' : backgrounds[variant];
  
  // Handle dark mode text
  const isDark = variant === 'dark';
  const textColorClass = isDark ? 'text-white' : '';

  // Build the section classes
  const sectionClasses = `
    ${bgClass}
    ${spacingClasses[spacing]}
    ${textColorClass}
    ${className}
    transition-colors duration-300
  `.trim();

  // Container classes (only applied if not full width)
  const containerClasses = width !== 'full' ? widthClasses[width] : '';

  return (
    <section 
      id={id}
      className={sectionClasses}
      style={variant === 'custom' && customBg ? { background: customBg } : {}}
    >
      {width === 'full' ? (
        children
      ) : (
        <div className={containerClasses}>
          {children}
        </div>
      )}
    </section>
  );
};