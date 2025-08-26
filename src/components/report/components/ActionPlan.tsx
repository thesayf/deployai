import React from 'react';
import { motion } from 'framer-motion';
import { ActionPlanProps } from '../types';

// Icons
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const ActionPlan: React.FC<ActionPlanProps> = ({
  data,
  variant = 'executive',
  onScheduleConsultation,
  className = ''
}) => {
  // Parse readiness level
  const [readinessStatus, readinessExplanation] = data.readinessLevel.split(' - ');
  
  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'impact':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-black text-white',
          roiCard: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-white',
          roiValue: 'text-black',
          readinessCard: 'bg-gray-800 border-yellow-400 text-white',
          readinessBadge: 'bg-yellow-400 text-black border-black',
          urgencyCard: 'bg-red-600 border-white text-white',
          urgencyIcon: 'text-yellow-300',
          ctaCard: 'bg-yellow-400 text-black border-white',
          ctaButton: 'bg-black text-yellow-400 border-white hover:bg-gray-900'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-pink-50',
          roiCard: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-black',
          roiValue: 'text-white',
          readinessCard: 'bg-white border-purple-500',
          readinessBadge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-black',
          urgencyCard: 'bg-gradient-to-r from-orange-400 to-red-400 border-black text-white',
          urgencyIcon: 'text-yellow-200',
          ctaCard: 'bg-gradient-to-r from-yellow-300 to-orange-400 text-black border-black',
          ctaButton: 'bg-black text-white border-black hover:shadow-xl transform hover:-translate-y-1 transition-all'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          roiCard: 'bg-gray-100 border-gray-400 text-gray-900',
          roiValue: 'text-gray-900',
          readinessCard: 'bg-white border-gray-300',
          readinessBadge: 'bg-gray-800 text-white border-gray-800',
          urgencyCard: 'bg-gray-50 border-gray-400 text-gray-900',
          urgencyIcon: 'text-gray-600',
          ctaCard: 'bg-gray-100 border-gray-400',
          ctaButton: 'bg-gray-900 text-white hover:bg-gray-800'
        };
      default: // executive
        return {
          container: 'bg-white',
          roiCard: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-black shadow-hard-lg',
          roiValue: 'text-white',
          readinessCard: 'bg-blue-50 border-blue-900',
          readinessBadge: 'bg-blue-600 text-white border-black',
          urgencyCard: 'bg-red-50 border-red-600 text-red-900',
          urgencyIcon: 'text-red-600',
          ctaCard: 'bg-yellow-300 border-black shadow-hard-lg',
          ctaButton: 'bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all'
        };
    }
  };

  const styles = getVariantStyles();

  const handleCtaClick = () => {
    if (onScheduleConsultation) {
      onScheduleConsultation();
    } else {
      // Default behavior - could open a calendar link or modal
      window.open('https://calendly.com/hello-deployai/30min', '_blank');
    }
  };

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
            Your Action Plan
          </h2>
          <div className="w-24 h-1 bg-current"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ROI Projection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`border-3 ${styles.roiCard} p-8 text-center relative overflow-hidden`}
            style={{
              boxShadow: variant === 'executive' ? '8px 8px 0 rgba(0,0,0,0.3)' : undefined
            }}
          >
            {variant === 'playful' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            )}
            <TrendingUpIcon className={`w-12 h-12 mx-auto mb-4 ${styles.roiValue}`} />
            <h3 className="text-lg font-bold uppercase mb-3 opacity-90">
              Expected ROI
            </h3>
            <div className={`text-5xl md:text-6xl font-black ${styles.roiValue}`}>
              {data.roiProjection.split(' ')[0]}
            </div>
            <p className="text-lg mt-2 opacity-90">
              {data.roiProjection.split(' ').slice(1).join(' ')}
            </p>
          </motion.div>

          {/* Readiness Level */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`border-3 ${styles.readinessCard} p-8`}
            style={{
              boxShadow: variant === 'executive' || variant === 'playful' 
                ? '6px 6px 0 rgba(0,0,0,0.2)' 
                : undefined
            }}
          >
            <h3 className="text-lg font-bold uppercase mb-4">
              AI Readiness Assessment
            </h3>
            <div className="space-y-4">
              <div className={`inline-block px-4 py-2 ${styles.readinessBadge} border-2 font-bold text-lg uppercase`}>
                {readinessStatus}
              </div>
              <p className="text-base leading-relaxed">
                {readinessExplanation}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Urgency Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`border-3 ${styles.urgencyCard} p-6 flex items-start gap-4`}
          style={{
            boxShadow: variant === 'executive' || variant === 'playful'
              ? '6px 6px 0 rgba(0,0,0,0.2)'
              : undefined
          }}
        >
          <AlertIcon className={`w-8 h-8 ${styles.urgencyIcon} flex-shrink-0`} />
          <div>
            <h4 className="font-black uppercase mb-2">
              Why Act Now
            </h4>
            <p className="text-base font-medium">
              {data.urgency}
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`border-3 ${styles.ctaCard} p-8 text-center`}
          style={{
            boxShadow: variant === 'executive' || variant === 'playful'
              ? '10px 10px 0 rgba(0,0,0,0.3)'
              : undefined
          }}
        >
          <CalendarIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl font-bold mb-6">
            {data.ctaText}
          </p>
          <button
            onClick={handleCtaClick}
            className={`px-10 py-4 border-3 font-black text-lg uppercase ${styles.ctaButton}`}
            style={{
              boxShadow: variant === 'executive' ? '4px 4px 0 rgba(0,0,0,0.3)' : undefined
            }}
          >
            Schedule Consultation
          </button>
          
          {variant === 'executive' && (
            <p className="text-sm mt-6 opacity-70">
              30-minute strategy session • No obligation • Expert recommendations
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};