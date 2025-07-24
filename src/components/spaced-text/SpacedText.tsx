import React from 'react';
import { spacingClasses } from '@/constants/typography';

interface SpacedTextProps {
  children: React.ReactNode;
  spacing?: keyof typeof spacingClasses;
  className?: string;
}

/**
 * SpacedText is a utility component that applies consistent spacing between typography elements.
 * It automatically detects the type of children and applies appropriate spacing rules.
 */
export const SpacedText: React.FC<SpacedTextProps> = ({
  children,
  spacing,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        const isLastChild = index === childrenArray.length - 1;
        if (isLastChild) return child;

        // Determine spacing based on the current and next element types
        const nextChild = childrenArray[index + 1];
        let spacingClass = '';

        if (React.isValidElement(nextChild)) {
          const currentType = child.type;
          const nextType = nextChild.type;

          // If spacing is explicitly provided, use it
          if (spacing) {
            spacingClass = spacingClasses[spacing];
          } else {
            // Auto-detect spacing based on element types
            // This is a simplified version - in a real app, you'd check component names
            const currentTag = (child.props as any)?.as || 'div';
            const nextTag = (nextChild.props as any)?.as || 'div';

            if (currentTag === 'h1' && nextTag === 'p') {
              spacingClass = spacingClasses.h1ToP;
            } else if (currentTag === 'h2' && nextTag === 'p') {
              spacingClass = spacingClasses.h2ToP;
            } else if (currentTag === 'h3' && nextTag === 'p') {
              spacingClass = spacingClasses.h3ToP;
            } else if (currentTag === 'p' && nextTag === 'p') {
              spacingClass = spacingClasses.pToP;
            } else {
              // Default spacing
              spacingClass = 'mb-4';
            }
          }
        }

        return React.cloneElement(child as React.ReactElement, {
          className: `${(child as React.ReactElement).props.className || ''} ${spacingClass}`.trim(),
        });
      })}
    </div>
  );
};