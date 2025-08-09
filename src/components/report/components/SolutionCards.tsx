import React from 'react';
import { motion } from 'framer-motion';
import { SolutionCardsProps } from '../types';

// Icons for solutions
const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M9.5 21C7.5 21 6 20 6 20s1-3 1-5c0-2.5 1.5-5 4-6.5C13.5 7 16 7 18 7c1 0 2 0 3 1-1 1-1 2-1 3 0 2-0.5 4.5-2 7-1.5 2.5-4 4-6.5 4-2 0-5 1-5 1s0-1 2-2z" />
    <path d="M6 12l-3 3m12-12l3-3" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const SolutionCards: React.FC<SolutionCardsProps> = ({
  solutions,
  variant = 'executive',
  className = ''
}) => {
  const icons = [ZapIcon, RocketIcon, TargetIcon];
  
  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'impact':
        return {
          container: 'bg-gray-900',
          card: 'bg-black border-white text-white',
          header: 'bg-gradient-to-r from-red-600 to-orange-600 text-white border-b-3 border-white',
          timeline: 'bg-yellow-400 text-black border-black',
          caseStudy: 'bg-gray-800 border-l-4 border-yellow-400',
          icon: 'text-yellow-400'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-green-50',
          card: 'bg-white border-black hover:shadow-2xl transition-all transform hover:-translate-y-1',
          header: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-b-3 border-black',
          timeline: 'bg-green-400 text-black border-black',
          caseStudy: 'bg-blue-50 border-l-4 border-blue-500',
          icon: 'text-white'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          card: 'bg-white border-gray-300',
          header: 'bg-gray-100 text-gray-900 border-b border-gray-300',
          timeline: 'bg-gray-200 text-gray-800 border-gray-400',
          caseStudy: 'bg-gray-50 border-l-4 border-gray-400',
          icon: 'text-gray-700'
        };
      default: // executive
        return {
          container: 'bg-white',
          card: 'bg-white border-black shadow-hard-lg',
          header: 'bg-blue-600 text-white border-b-3 border-black',
          timeline: 'bg-blue-100 text-blue-900 border-blue-900',
          caseStudy: 'bg-gray-50 border-l-4 border-blue-600',
          icon: 'text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`p-8 ${styles.container} ${className}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
            Recommended AI Solutions
          </h2>
          <div className="w-24 h-1 bg-current"></div>
        </motion.div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                className={`border-3 ${styles.card} overflow-hidden`}
                style={{
                  boxShadow: variant === 'executive' || variant === 'playful' 
                    ? '8px 8px 0 rgba(0,0,0,0.2)' 
                    : undefined
                }}
              >
                {/* Header with Icon */}
                <div className={`p-6 ${styles.header} relative overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black uppercase flex-1 pr-4">
                      {solution.category}
                    </h3>
                    <Icon className={`w-8 h-8 ${styles.icon} flex-shrink-0`} />
                  </div>
                  {variant === 'playful' && (
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                  {/* Outcome */}
                  <div>
                    <p className="text-base font-semibold leading-snug mb-3">
                      {solution.outcome}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className={`inline-block px-4 py-2 border-2 ${styles.timeline} font-bold text-sm uppercase`}>
                    ⏱ {solution.timeline}
                  </div>

                  {/* Case Study */}
                  <div className={`p-4 ${styles.caseStudy} text-sm`}>
                    <p className="font-semibold mb-2 uppercase text-xs opacity-70">
                      Success Story:
                    </p>
                    <p className="italic leading-relaxed">
                      {solution.caseStudy}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Context */}
        {variant === 'executive' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-sm text-gray-600 mt-8"
          >
            <p>All solutions are customized to your specific business needs and can be implemented incrementally</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};