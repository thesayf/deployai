import React from 'react';
import { motion } from 'framer-motion';
import { ReportViewerProps } from './types';
import { ProblemSummary } from './components/ProblemSummary';
import { SolutionCards } from './components/SolutionCards';
import { ImprovementMetrics } from './components/ImprovementMetrics';
import { ActionPlan } from './components/ActionPlan';
import { SectionWrapper } from '@/components/section-wrapper';

export const ReportViewer: React.FC<ReportViewerProps> = ({
  data,
  variant = 'executive',
  companyName = 'Your Company',
  generatedDate = new Date(),
  className = '',
  onScheduleConsultation
}) => {
  // Get background patterns for each section based on variant
  const getSectionBackgrounds = () => {
    switch (variant) {
      case 'impact':
        return {
          header: 'dark',
          problem: 'custom',
          solutions: 'default',
          improvements: 'dark',
          action: 'custom'
        };
      case 'playful':
        return {
          header: 'gradient',
          problem: 'warmPeach',
          solutions: 'skyBlue',
          improvements: 'coolMint',
          action: 'custom'
        };
      case 'minimal':
        return {
          header: 'default',
          problem: 'concrete',
          solutions: 'default',
          improvements: 'concrete',
          action: 'default'
        };
      default: // executive
        return {
          header: 'default',
          problem: 'concrete',
          solutions: 'default',
          improvements: 'skyBlue',
          action: 'default'
        };
    }
  };

  const backgrounds = getSectionBackgrounds();

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Header */}
      <SectionWrapper variant={backgrounds.header as any} spacing="large">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 ${
            variant === 'impact' ? 'text-white' : 'text-gray-900'
          }`}>
            AI Readiness Report
          </h1>
          <div className={`text-lg ${
            variant === 'impact' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="font-semibold text-xl mb-2">{companyName}</p>
            <p>Generated on {generatedDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</p>
          </div>
          
          {variant === 'executive' && (
            <div className="mt-8 inline-block">
              <div className="flex items-center gap-4 px-6 py-3 bg-blue-100 border-3 border-blue-900">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-blue-900">
                  Custom Analysis Complete
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </SectionWrapper>

      {/* Problem Summary */}
      <SectionWrapper 
        variant={backgrounds.problem as any} 
        spacing="large"
        className={variant === 'impact' ? 'bg-gradient-to-br from-gray-900 to-black' : ''}
      >
        <ProblemSummary data={data.problemSummary} variant={variant} />
      </SectionWrapper>

      {/* Solutions */}
      <SectionWrapper variant={backgrounds.solutions as any} spacing="large">
        <SolutionCards solutions={data.solutions} variant={variant} />
      </SectionWrapper>

      {/* Measurable Improvements */}
      <SectionWrapper 
        variant={backgrounds.improvements as any} 
        spacing="large"
        className={variant === 'impact' ? 'bg-black' : ''}
      >
        <ImprovementMetrics improvements={data.measurableImprovements} variant={variant} />
      </SectionWrapper>

      {/* Action Plan */}
      <SectionWrapper 
        variant={backgrounds.action as any} 
        spacing="large"
        className={variant === 'impact' ? 'bg-gradient-to-br from-gray-900 to-black' : ''}
      >
        <ActionPlan 
          data={data.actionPlan} 
          variant={variant} 
          onScheduleConsultation={onScheduleConsultation}
        />
      </SectionWrapper>

      {/* Footer */}
      <SectionWrapper variant="dark" spacing="small">
        <div className="text-center text-white">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} deployAI. This report contains proprietary analysis.
          </p>
          <p className="text-xs mt-2 opacity-50">
            Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
};