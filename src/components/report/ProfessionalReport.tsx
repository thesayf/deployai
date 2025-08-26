import React from 'react';
import { ReportData } from './types';

// Utility function to properly capitalize company names
const capitalizeCompanyName = (name: string): string => {
  if (!name || name === 'Your Organization') return name;
  
  // Split by spaces and capitalize each word
  return name.split(' ').map(word => {
    // Handle special cases (acronyms, etc.)
    if (word.toUpperCase() === word && word.length > 1) {
      // Already all caps (likely an acronym), keep it
      return word;
    }
    // Capitalize first letter, lowercase the rest
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};

interface ProfessionalReportProps {
  data: ReportData;
  companyName?: string;
  generatedDate?: Date;
  variant?: 'executive' | 'narrative' | 'datasheet';
  className?: string;
  onScheduleConsultation?: () => void;
}

export const ProfessionalReport: React.FC<ProfessionalReportProps> = ({
  data,
  companyName = 'Your Organization',
  generatedDate = new Date(),
  variant = 'executive',
  className = '',
  onScheduleConsultation
}) => {
  const reportId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const displayCompanyName = capitalizeCompanyName(companyName);
  
  // Parse readiness level - handle both new and old formats
  let readinessStatus = '';
  let readinessExplanation = '';
  
  if (data.actionPlan?.readinessLevel) {
    // Legacy format
    [readinessStatus, readinessExplanation] = data.actionPlan.readinessLevel.split(' - ');
  } else if (data.executiveSummary?.readinessLevel) {
    // New format - clean the level if needed (for backward compatibility)
    const rawLevel = data.executiveSummary.readinessLevel;
    
    // Check if it's already clean (just High/Medium/Low)
    if (['High', 'Medium', 'Low'].includes(rawLevel)) {
      readinessStatus = rawLevel;
      readinessExplanation = data.executiveSummary.readinessExplanation || '';
    } else {
      // Old data might have long text - extract the level
      const parts = rawLevel.split(/[\s—-]/);
      readinessStatus = parts[0];
      // If there's no separate explanation field, extract it from the level
      if (!data.executiveSummary.readinessExplanation && parts.length > 1) {
        readinessExplanation = rawLevel.substring(parts[0].length).replace(/^[\s—-]+/, '').trim();
      } else {
        readinessExplanation = data.executiveSummary.readinessExplanation || '';
      }
    }
  }

  const handleConsultation = () => {
    if (onScheduleConsultation) {
      onScheduleConsultation();
    } else {
      window.open('https://calendly.com/hello-deployai/30min', '_blank');
    }
  };

  if (variant === 'narrative') {
    return (
      <div className={`max-w-4xl mx-auto p-8 bg-white ${className}`}>
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            AI Implementation Opportunity Analysis
          </h1>
          
          <div className="text-sm text-gray-600 mb-8">
            <p>Prepared for: {displayCompanyName}</p>
            <p>Date: {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p>Assessment ID: {reportId}</p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Your Business</h2>
            <p className="text-gray-700 leading-relaxed">
              {data.problemSummary?.industryProfile || 'Your organization'} — This positions you in a competitive market where 
              operational efficiency directly impacts profitability and customer satisfaction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Challenge</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your team is currently managing several operational inefficiencies that, while common in 
              your industry, represent significant opportunities for improvement:
            </p>
            
            <div className="space-y-4 my-6">
              <div className="pl-4 border-l-4 border-gray-300">
                <p className="text-gray-700">
                  <strong>{data.problemSummary?.topProblems?.[0] || 'Primary operational challenge'}</strong> — This challenge alone accounts 
                  for approximately 40% of your operational friction, affecting both employee productivity 
                  and customer experience.
                </p>
              </div>
              
              <div className="pl-4 border-l-4 border-gray-300">
                <p className="text-gray-700">
                  <strong>{data.problemSummary?.topProblems?.[1] || 'Secondary challenge'}</strong> — Our analysis shows this creates 
                  a cascade effect, impacting multiple departments and requiring redundant effort to manage.
                </p>
              </div>
              
              <div className="pl-4 border-l-4 border-gray-300">
                <p className="text-gray-700">
                  <strong>{data.problemSummary?.topProblems?.[2] || 'Additional challenge'}</strong> — During peak periods, this issue 
                  can reduce your capacity by up to 30%, directly affecting revenue potential.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 my-6">
              <p className="text-amber-900">
                <strong>The cumulative financial impact of these challenges is approximately {data.problemSummary?.monthlyOpportunity || '$0'} per month</strong> in 
                lost opportunities and inefficiencies.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Opportunity</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Modern AI solutions can address each of these challenges systematically:
            </p>

            {(data.solutions || []).map((solution, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {index + 1}. {solution.category}
                </h3>
                <p className="text-gray-700 mb-2">
                  This solution will {solution.outcome}. Based on similar implementations, businesses 
                  typically see results within the first week of deployment. The implementation requires {solution.timeline} and 
                  integrates seamlessly with existing workflows.
                </p>
                <blockquote className="pl-4 border-l-4 border-blue-500 italic text-gray-600">
                  {solution.caseStudy}
                </blockquote>
              </div>
            ))}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Expected Impact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The implementation of these solutions will transform your key operational metrics:
            </p>
            
            <ul className="space-y-3 my-6">
              {(data.measurableImprovements || []).map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>{improvement.metric}</strong>: Improving from {improvement.currentState} to {improvement.projectedState} — 
                    a <span className="font-semibold text-green-600">{improvement.improvement}</span> gain
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Investment and Returns</h2>
            <p className="text-gray-700 leading-relaxed">
              With an expected ROI of <strong>{data.actionPlan?.roiProjection || 'significant'}</strong>, this implementation 
              represents a strategic investment in your operational infrastructure. Your organization 
              shows <strong>{readinessStatus}</strong> readiness — {readinessExplanation}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Timing Considerations</h2>
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-red-900">
                <strong>{data.actionPlan?.urgency || 'Time is of the essence'}</strong>. The current market conditions make this an 
                optimal time for implementation, allowing you to maintain competitive advantage while 
                others delay adoption.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Next Steps</h2>
            <div className="p-6 bg-gray-50 border border-gray-300 rounded">
              <p className="text-gray-700 mb-4">
                {data.actionPlan?.ctaText || 'Schedule your consultation today'}. Our team will provide a detailed implementation roadmap, 
                specific tool recommendations, and a fixed-cost proposal tailored to your exact requirements.
              </p>
              <button
                onClick={handleConsultation}
                className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule Implementation Planning Session
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (variant === 'datasheet') {
    return (
      <div className={`max-w-4xl mx-auto p-8 bg-white ${className}`}>
        <div className="border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-xl font-bold text-gray-900">AI Readiness Assessment Results</h1>
          <div className="text-sm text-gray-600 mt-2">
            {companyName} • {generatedDate.toLocaleDateString()} • ID: {reportId}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Current State</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-600">Business Profile</dt>
              <dd className="font-medium text-gray-900">{data.problemSummary?.industryProfile || 'Your organization'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Monthly Opportunity Cost</dt>
              <dd className="font-medium text-red-600">{data.problemSummary?.monthlyOpportunity || '$0'}</dd>
            </div>
          </dl>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Identified Issues</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            {(data.problemSummary?.topProblems || []).map((problem, index) => (
              <li key={index}>• {problem}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Proposed Solutions</h2>
          <div className="grid grid-cols-3 gap-4">
            {(data.solutions || []).map((solution, index) => (
              <div key={index} className="border border-gray-200 p-3">
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{solution.category}</h3>
                <p className="text-xs text-gray-600 mb-2">{solution.outcome}</p>
                <p className="text-xs text-gray-500">{solution.timeline}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Expected Improvements</h2>
          <div className="space-y-2">
            {(data.measurableImprovements || []).map((improvement, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">{improvement.metric}</span>
                <div className="text-sm">
                  <span className="text-gray-500">{improvement.currentState}</span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="text-green-600 font-medium">{improvement.projectedState}</span>
                  <span className="ml-3 text-xs text-gray-600">({improvement.improvement})</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Expected ROI:</span>
            <span className="font-bold text-gray-900 ml-2">{data.actionPlan?.roiProjection || 'Significant'}</span>
          </div>
          <button
            onClick={handleConsultation}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Schedule Consultation →
          </button>
        </div>
      </div>
    );
  }

  // Check if we have new or legacy data structure
  const isNewFormat = data.executiveSummary && data.keyProblems && data.recommendedSolutions;
  
  // Default: Executive Brief Format with new structure
  if (isNewFormat) {
    return (
      <div className={`max-w-6xl mx-auto p-4 sm:p-6 md:p-8 ${className}`}>
        {/* Executive Summary Header */}
        <header className="mb-8 md:mb-12 p-4 sm:p-6 md:p-8 bg-white border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase">AI Readiness Assessment</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Prepared for: {displayCompanyName}</p>
              <p className="text-sm text-gray-500">
                {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • 
                ID: {reportId}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="mb-2 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Readiness Level</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-black">
                  {readinessStatus || data.executiveSummary.readinessLevel}
                </p>
                {(readinessExplanation || data.executiveSummary.readinessExplanation) && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xs ml-auto">
                    {readinessExplanation || data.executiveSummary.readinessExplanation}
                  </p>
                )}
              </div>
              <div className="flex sm:block gap-4 sm:gap-0 sm:space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Annual Opportunity</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">{data.executiveSummary.estimatedAnnualOpportunity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Immediate ROI</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-600">{data.executiveSummary.immediateROI}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Key Problems & Missed Opportunities */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 md:mb-8">Key Problems & Missed Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.keyProblems.map((problem, index) => (
              <div key={index} className="p-4 sm:p-6 bg-white border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 uppercase">Problem {index + 1}</p>
                  <h3 className="text-lg sm:text-xl font-black text-black mb-2 sm:mb-3">
                    {problem.problem}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500">
                    <p className="text-xs text-red-700 uppercase font-bold mb-1">Current Cost</p>
                    <p className="text-red-900 font-semibold">{problem.currentCost}</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-500">
                    <p className="text-xs text-green-700 uppercase font-bold mb-1">Potential Gain</p>
                    <p className="text-green-900 font-semibold">{problem.potentialGain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended AI Solutions Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 md:mb-8">Recommended AI Solutions</h2>
          
          <div className="space-y-6 sm:space-y-8">
            {data.recommendedSolutions.map((solution, index) => (
              <div key={index} className="p-4 sm:p-6 md:p-8 bg-white border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 flex items-center justify-center flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 md:mr-6">
                    <span className="text-white font-black text-lg sm:text-xl">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2 sm:mb-3">{solution.solutionName}</h3>
                    
                    {/* Direct Impact */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 uppercase font-bold mb-1 sm:mb-2">Solves These Problems:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {solution.directImpact.map((impact, i) => (
                          <span key={i} className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 font-semibold text-xs sm:text-sm">
                            {impact}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Primary Benefits */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 uppercase font-bold mb-1 sm:mb-2">Key Benefits:</p>
                      <ul className="space-y-2">
                        {solution.primaryBenefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Description */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{solution.description}</p>
                    </div>

                    {/* Real World Proof */}
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-xs sm:text-sm text-gray-600 uppercase font-bold">Real-World Results:</p>
                      {solution.realWorldProof.map((proof, i) => (
                        <div key={i} className="p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-500">
                          <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">{proof.caseStudy}</p>
                          <p className="text-xs sm:text-sm font-bold text-yellow-700">📊 {proof.metric}</p>
                        </div>
                      ))}
                    </div>

                    {/* Implementation Time */}
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-100 inline-block">
                      <p className="text-xs sm:text-sm font-bold text-gray-700">
                        ⏱️ Implementation Time: {solution.implementationTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projected Business Outcomes Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 md:mb-8">Projected Business Outcomes</h2>
          
          {/* Desktop Table View - Hidden on Mobile */}
          <div className="hidden sm:block p-4 sm:p-6 md:p-8 bg-white border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black">
                  <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Tool</th>
                  <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Metric</th>
                  <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Current</th>
                  <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Projected</th>
                  <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {data.projectedOutcomes.map((outcome, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 sm:py-4 text-sm sm:text-base font-medium text-black">{outcome.tool}</td>
                    <td className="py-3 sm:py-4 text-sm sm:text-base text-gray-700">{outcome.metric}</td>
                    <td className="py-3 sm:py-4 text-sm sm:text-base text-red-600 font-bold">{outcome.current}</td>
                    <td className="py-3 sm:py-4 text-sm sm:text-base text-green-600 font-bold">{outcome.projected}</td>
                    <td className="py-3 sm:py-4">
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 font-black uppercase text-xs sm:text-sm">
                        {outcome.improvementPercentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards View */}
          <div className="sm:hidden space-y-4">
            {data.projectedOutcomes.map((outcome, index) => (
              <div key={index} className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-3">
                  <h4 className="font-black text-black mb-1">{outcome.tool}</h4>
                  <p className="text-sm text-gray-600">{outcome.metric}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Current</p>
                    <p className="text-sm font-bold text-red-600">{outcome.current}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Projected</p>
                    <p className="text-sm font-bold text-green-600">{outcome.projected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Gain</p>
                    <p className="text-sm font-black text-green-800">{outcome.improvementPercentage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where To Start Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-black text-black uppercase mb-8">Where To Start</h2>
          
          <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Consider where you would like to start in your AI journey. We recommend targeting your most immediate bottleneck first.
              </p>
              
              <div className="p-6 bg-blue-50 border-l-8 border-blue-500">
                <h3 className="text-xl font-black text-black mb-3">
                  🎯 Our Recommendation: {data.whereToStart.recommendation}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 uppercase font-bold mb-1">Addresses This Bottleneck:</p>
                    <p className="text-gray-800 font-semibold">{data.whereToStart.targetBottleneck}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 uppercase font-bold mb-1">Immediate Impact:</p>
                    <p className="text-gray-800">{data.whereToStart.immediateImpact}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-white border-2 border-gray-300">
                      <p className="text-xs text-gray-600 uppercase">Timeline</p>
                      <p className="font-bold text-black">{data.whereToStart.timelineEstimate}</p>
                    </div>
                    <div className="p-3 bg-white border-2 border-gray-300">
                      <p className="text-xs text-gray-600 uppercase">Expected ROI</p>
                      <p className="font-bold text-green-600">{data.whereToStart.expectedROI}</p>
                    </div>
                    <div className="p-3 bg-white border-2 border-gray-300">
                      <p className="text-xs text-gray-600 uppercase">Complexity</p>
                      <p className="font-bold text-black">Handled by Us</p>
                    </div>
                  </div>
                </div>
                
                {data.whereToStart.implementationNote && (
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-700 italic">
                    💡 {data.whereToStart.implementationNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-8 md:mb-12">
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-orange-500 to-red-500 border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase mb-3 sm:mb-4">Ready to Transform Your Business?</h2>
              
              {data.callToAction.urgencyMessage && (
                <div className="max-w-2xl mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-white/20 backdrop-blur-sm">
                  <p className="text-sm sm:text-base text-white font-semibold">
                    ⏰ {data.callToAction.urgencyMessage}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6 md:mt-8">
                <button
                  onClick={handleConsultation}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black uppercase text-sm sm:text-base md:text-lg border-2 sm:border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {data.callToAction.primaryCTA}
                </button>
                
                <button
                  onClick={() => window.location.href = '/quiz'}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent text-white font-bold uppercase text-sm sm:text-base border-2 border-white hover:bg-white hover:text-black transition-all"
                >
                  {data.callToAction.secondaryCTA}
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t-2 sm:border-t-3 md:border-t-4 border-black pt-4 sm:pt-6 text-xs sm:text-sm text-gray-600">
          <p>© {new Date().getFullYear()} deployAI. This report contains proprietary analysis and recommendations.</p>
          <p className="mt-1 sm:mt-2">Report ID: {reportId} | Generated: {generatedDate.toLocaleDateString()}</p>
        </footer>
      </div>
    );
  }

  // Legacy format fallback - use existing executive variant
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="p-12 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <header className="mb-10 border-b-4 border-black pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-black uppercase">AI Readiness Assessment</h1>
              <p className="text-gray-600 mt-2">Prepared for: {displayCompanyName}</p>
              <p className="text-sm text-gray-500">
                {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • 
                Report ID: {reportId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Monthly Opportunity</p>
              <p className="text-3xl font-black text-green-600">{data.problemSummary?.monthlyOpportunity}</p>
            </div>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-black text-black uppercase mb-6">Executive Summary</h2>
          <div className="p-6 bg-gray-50 border-l-4 border-gray-800">
            <p className="text-gray-700 leading-relaxed">
              {data.problemSummary?.industryProfile}
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">Key operational challenges identified:</p>
              <ul className="list-disc pl-5 space-y-1">
                {data.problemSummary?.topProblems.map((problem, index) => (
                  <li key={index} className="text-gray-700">{problem}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-black text-black uppercase mb-6">Recommended Solutions</h2>
          <div className="grid gap-6">
            {data.solutions?.map((solution, index) => (
              <div key={index} className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-bold text-black mb-3">{solution.category}</h3>
                <p className="text-gray-700 mb-3">{solution.outcome}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">{solution.timeline}</span>
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 font-semibold">
                    Priority {index + 1}
                  </span>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-700 italic">{solution.caseStudy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-black text-black uppercase mb-6">Expected Outcomes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase">Metric</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase">Current</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase">Projected</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {data.measurableImprovements?.map((improvement, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-4 font-medium text-gray-900">{improvement.metric}</td>
                    <td className="py-4 px-4 text-red-600 font-semibold">{improvement.currentState}</td>
                    <td className="py-4 px-4 text-green-600 font-semibold">{improvement.projectedState}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 font-bold text-sm">
                        {improvement.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-black text-black uppercase mb-6">Implementation Roadmap</h2>
          <div className="p-6 bg-blue-50 border-4 border-blue-500 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Expected ROI</p>
                <p className="text-2xl font-black text-black">{data.actionPlan?.roiProjection}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Readiness Level</p>
                <p className="text-lg font-bold text-black">{readinessStatus}</p>
                <p className="text-sm text-gray-600">{readinessExplanation}</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-700 mb-1">⚠️ Timing Consideration</p>
              <p className="text-red-900">{data.actionPlan?.urgency}</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-700 mb-4">{data.actionPlan?.ctaText}</p>
              <button
                onClick={handleConsultation}
                className="px-6 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t-2 border-gray-300 pt-6 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} deployAI. This report contains proprietary analysis and recommendations.</p>
          <p className="mt-2">Report ID: {reportId} | Generated: {generatedDate.toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
};