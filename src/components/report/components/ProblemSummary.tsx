import React from 'react';
import { motion } from 'framer-motion';
import { ProblemSummaryProps } from '../types';

export const ProblemSummary: React.FC<ProblemSummaryProps> = ({
  data,
  variant = 'executive',
  className = ''
}) => {
  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'impact':
        return {
          container: 'bg-black text-white',
          profile: 'bg-yellow-400 text-black border-white',
          problemCard: 'bg-red-600 text-white border-white',
          problemNumber: 'bg-white text-black',
          opportunity: 'bg-yellow-400 text-black border-white',
          opportunityAmount: 'text-black'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-orange-50',
          profile: 'bg-white border-pink-500',
          problemCard: 'bg-white border-orange-500 hover:shadow-xl transition-shadow',
          problemNumber: 'bg-gradient-to-r from-pink-500 to-orange-500 text-white',
          opportunity: 'bg-gradient-to-r from-yellow-300 to-orange-400 text-black border-black',
          opportunityAmount: 'text-black'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          profile: 'bg-gray-50 border-gray-300',
          problemCard: 'bg-white border-gray-300',
          problemNumber: 'bg-gray-800 text-white',
          opportunity: 'bg-gray-100 border-gray-400',
          opportunityAmount: 'text-gray-900'
        };
      default: // executive
        return {
          container: 'bg-gray-50',
          profile: 'bg-blue-50 border-blue-900',
          problemCard: 'bg-white border-black shadow-hard',
          problemNumber: 'bg-blue-600 text-white',
          opportunity: 'bg-yellow-300 border-black shadow-hard-lg',
          opportunityAmount: 'text-black'
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
            Your Current Situation
          </h2>
          <div className="w-24 h-1 bg-current"></div>
        </motion.div>

        {/* Industry Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-6 border-3 ${styles.profile} rounded-none`}
        >
          <p className="text-lg font-semibold leading-relaxed">
            {data.industryProfile}
          </p>
        </motion.div>

        {/* Top Problems */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase">Key Challenges Identified</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.topProblems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative p-6 border-3 ${styles.problemCard}`}
                style={{
                  boxShadow: variant === 'executive' ? '6px 6px 0 rgba(0,0,0,0.2)' : undefined
                }}
              >
                <div className={`absolute -top-4 -left-4 w-10 h-10 ${styles.problemNumber} border-2 border-black flex items-center justify-center font-bold text-lg`}>
                  {index + 1}
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed pt-2">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Monthly Opportunity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`p-8 border-3 ${styles.opportunity} text-center`}
          style={{
            boxShadow: variant === 'executive' ? '8px 8px 0 rgba(0,0,0,0.3)' : undefined
          }}
        >
          <h3 className="text-lg font-bold uppercase mb-3 opacity-80">
            Monthly Opportunity Cost
          </h3>
          <div className={`text-5xl md:text-6xl font-black ${styles.opportunityAmount}`}>
            {data.monthlyOpportunity}
          </div>
          <p className="text-sm mt-3 opacity-80">
            Currently losing this amount every month
          </p>
        </motion.div>
      </div>
    </div>
  );
};