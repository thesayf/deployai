import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMeasure from 'react-use-measure';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
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
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Design System Typography
const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Design System Spacing (8px base unit)
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px'
};

// Simple chevron icon as SVG
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Plus/Minus icon
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface PeopleAlsoAskProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  defaultOpenIndex?: number | null;
  variant?: 'default' | 'compact' | 'minimal';
  accentColor?: 'orange' | 'blue' | 'magenta';
  allowMultiple?: boolean;
}

export const PeopleAlsoAsk: React.FC<PeopleAlsoAskProps> = ({
  title = "People Also Ask",
  subtitle,
  items,
  className = "",
  defaultOpenIndex = null,
  variant = 'default',
  accentColor = 'orange',
  allowMultiple = false
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(defaultOpenIndex !== null && defaultOpenIndex >= 0 ? [defaultOpenIndex] : [])
  );

  const handleToggle = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev);
      const wasOpen = newSet.has(index);
      
      if (wasOpen) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta
  };

  const currentAccent = accentColors[accentColor];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : extractTextFromNode(item.answer)
      }
    }))
  };

  return (
    <section className={`w-full ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="text-center px-4 sm:px-6" style={{ marginBottom: spacing['2xl'] }}>
          {title && (
            <h2 
              className={`${typography.displayM} uppercase`}
              style={{ 
                color: colors.black,
                textShadow: `2px 2px 0px ${currentAccent}`,
                marginBottom: spacing.lg
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={typography.bodyL} style={{ 
              color: colors.charcoal,
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* FAQ Items */}
      <div 
        className="max-w-4xl mx-auto px-3 sm:px-6 space-y-3 sm:space-y-4"
      >
        {items.map((item, index) => (
          <QuestionCard
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndices.has(index)}
            onToggle={() => handleToggle(index)}
            variant={variant}
            accentColor={currentAccent}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

interface QuestionCardProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  variant: 'default' | 'compact' | 'minimal';
  accentColor: string;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  variant,
  accentColor,
  index
}) => {
  const [ref, { height }] = useMeasure();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative"
    >
      <div
        className="relative overflow-hidden group"
        style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          borderRadius: 0,
          boxShadow: isOpen ? `6px 6px 0px ${colors.black}` : `4px 4px 0px ${colors.black}`,
          transition: 'all 0.15s ease',
          transform: 'translate(0, 0)'
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translate(-2px, -2px)';
          if (!isOpen) {
            el.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translate(0, 0)';
          if (!isOpen) {
            el.style.boxShadow = `4px 4px 0px ${colors.black}`;
          }
        }}
      >
        {/* Accent Bar */}
        {isOpen && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${accentColor}, ${colors.crimsonRed})`,
              transformOrigin: 'left'
            }}
          />
        )}

        {/* Question Button */}
        <button
          ref={buttonRef}
          onClick={() => onToggle()}
          className="w-full flex items-center justify-between text-left"
          style={{
            padding: variant === 'compact' ? '12px 16px' : '16px 20px',
            background: isOpen ? colors.concrete : colors.white,
            transition: 'background-color 0.15s ease'
          }}
        >
          {/* Question Number */}
          {variant !== 'minimal' && (
            <span 
              className={`${typography.caption} uppercase flex-shrink-0`}
              style={{
                marginRight: '8px',
                padding: '4px 6px',
                background: isOpen ? accentColor : colors.steel,
                color: isOpen ? colors.white : colors.charcoal,
                fontWeight: 700,
                letterSpacing: '0.5px',
                minWidth: '28px',
                textAlign: 'center',
                border: `2px solid ${colors.black}`,
                boxShadow: `2px 2px 0px ${colors.black}`
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}

          {/* Question Text */}
          <span 
            className={`flex-1 ${variant === 'compact' ? 'text-base sm:text-xl font-semibold leading-snug' : 'text-lg sm:text-2xl font-bold leading-snug'}`}
            style={{ 
              color: isOpen ? colors.black : colors.obsidian,
              fontWeight: isOpen ? 700 : 600,
              paddingRight: '8px'
            }}
          >
            {question}
          </span>

          {/* Toggle Icon */}
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
            style={{
              padding: '6px',
              background: isOpen ? accentColor : colors.white,
              border: `2px solid ${colors.black}`,
              boxShadow: `2px 2px 0px ${colors.black}`,
              marginLeft: '8px'
            }}
          >
            {variant === 'minimal' ? (
              <div style={{ color: isOpen ? colors.white : colors.black }}>
                {isOpen ? (
                  <MinusIcon className="w-5 h-5" />
                ) : (
                  <PlusIcon className="w-5 h-5" />
                )}
              </div>
            ) : (
              <div style={{ color: isOpen ? colors.white : colors.black }}>
                <ChevronIcon className="w-5 h-5" />
              </div>
            )}
          </motion.div>
        </button>

        {/* Answer Content */}
        <AnimatePresence initial={false} mode="wait">
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
              }}
              style={{ 
                overflow: 'hidden',
                position: 'relative',
                willChange: 'height'
              }}
            >
              <div 
                ref={ref}
                className={typography.bodyM}
                style={{
                  padding: variant === 'compact' 
                    ? `${spacing.md} ${spacing.lg} ${spacing.lg}` 
                    : `${spacing.lg} ${spacing.xl} ${spacing.xl}`,
                  color: colors.charcoal,
                  borderTop: `2px solid ${colors.steel}`,
                  transformOrigin: 'top'
                }}
              >
                <div className="prose prose-zinc max-w-none">
                  {answer}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Helper function to extract text from React nodes for schema
function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromNode).join('');
  if (React.isValidElement(node) && node.props.children) {
    return extractTextFromNode(node.props.children);
  }
  return '';
}