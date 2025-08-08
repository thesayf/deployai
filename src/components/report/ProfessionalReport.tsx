import React from 'react';
import { ReportData } from './types';

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
  
  // Parse readiness level
  const [readinessStatus, readinessExplanation] = data.actionPlan.readinessLevel.split(' - ');

  const handleConsultation = () => {
    if (onScheduleConsultation) {
      onScheduleConsultation();
    } else {
      window.open('https://calendly.com/deployai-consultation', '_blank');
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
            <p>Prepared for: {companyName}</p>
            <p>Date: {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p>Assessment ID: {reportId}</p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Your Business</h2>
            <p className="text-gray-700 leading-relaxed">
              {data.problemSummary.industryProfile} — This positions you in a competitive market where 
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
                  <strong>{data.problemSummary.topProblems[0]}</strong> — This challenge alone accounts 
                  for approximately 40% of your operational friction, affecting both employee productivity 
                  and customer experience.
                </p>
              </div>
              
              <div className="pl-4 border-l-4 border-gray-300">
                <p className="text-gray-700">
                  <strong>{data.problemSummary.topProblems[1]}</strong> — Our analysis shows this creates 
                  a cascade effect, impacting multiple departments and requiring redundant effort to manage.
                </p>
              </div>
              
              <div className="pl-4 border-l-4 border-gray-300">
                <p className="text-gray-700">
                  <strong>{data.problemSummary.topProblems[2]}</strong> — During peak periods, this issue 
                  can reduce your capacity by up to 30%, directly affecting revenue potential.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 my-6">
              <p className="text-amber-900">
                <strong>The cumulative financial impact of these challenges is approximately {data.problemSummary.monthlyOpportunity} per month</strong> in 
                lost opportunities and inefficiencies.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Opportunity</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Modern AI solutions can address each of these challenges systematically:
            </p>

            {data.solutions.map((solution, index) => (
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
              {data.measurableImprovements.map((improvement, index) => (
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
              With an expected ROI of <strong>{data.actionPlan.roiProjection}</strong>, this implementation 
              represents a strategic investment in your operational infrastructure. Your organization 
              shows <strong>{readinessStatus}</strong> readiness — {readinessExplanation}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Timing Considerations</h2>
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-red-900">
                <strong>{data.actionPlan.urgency}</strong>. The current market conditions make this an 
                optimal time for implementation, allowing you to maintain competitive advantage while 
                others delay adoption.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Next Steps</h2>
            <div className="p-6 bg-gray-50 border border-gray-300 rounded">
              <p className="text-gray-700 mb-4">
                {data.actionPlan.ctaText}. Our team will provide a detailed implementation roadmap, 
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
              <dd className="font-medium text-gray-900">{data.problemSummary.industryProfile}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Monthly Opportunity Cost</dt>
              <dd className="font-medium text-red-600">{data.problemSummary.monthlyOpportunity}</dd>
            </div>
          </dl>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Identified Issues</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            {data.problemSummary.topProblems.map((problem, index) => (
              <li key={index}>• {problem}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-gray-500 mb-3">Proposed Solutions</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.solutions.map((solution, index) => (
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
            {data.measurableImprovements.map((improvement, index) => (
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
            <span className="font-bold text-gray-900 ml-2">{data.actionPlan.roiProjection}</span>
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

  // Default: Executive Brief Format
  return (
    <div className={`max-w-6xl mx-auto p-8 ${className}`}>
      {/* Header Section with Company Info and Readiness Score */}
      <header className="mb-12 p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-600 mb-2">{data.problemSummary.industryProfile}</p>
            <h1 className="text-3xl font-black text-black uppercase">AI Readiness Assessment</h1>
            <p className="text-gray-600 mt-2">Prepared for: {companyName}</p>
            <p className="text-sm text-gray-500">
              {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • 
              ID: {reportId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Readiness</p>
            <p className="text-4xl font-black text-black">{readinessStatus}</p>
            <p className="text-sm text-gray-600 mt-1">team data ready</p>
          </div>
        </div>
      </header>

      {/* Top Problems & Opportunity Section */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-black uppercase mb-2">Top problems & opportunity</h2>
          <p className="text-xl text-gray-700">
            Potential: <span className="font-bold text-black">{data.problemSummary.monthlyOpportunity}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.problemSummary.topProblems.map((problem, index) => (
            <div key={index} className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-sm text-gray-600 mb-2 uppercase">Problem {index + 1}</p>
              <h3 className="text-xl font-black text-black">
                {problem}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended AI Solutions Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-black text-black uppercase mb-8">Recommended AI Solutions</h2>
        
        <div className="space-y-8">
          {data.solutions.map((solution, index) => (
            <div key={index} className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-orange-500 mr-4 flex-shrink-0 mt-1"></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-black mb-2">{solution.category}</h3>
                  <p className="text-gray-600 mb-3">
                    {solution.outcome} • {solution.timeline}
                  </p>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                    <p className="text-gray-700">
                      {solution.caseStudy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expected Business Outcomes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-black text-black uppercase mb-8">Expected Business Outcomes</h2>
        
        <div className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Metric</th>
                <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Current</th>
                <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Projected</th>
                <th className="py-3 text-left text-sm uppercase font-black text-gray-600">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {data.measurableImprovements.map((improvement, index) => (
                <tr key={index} className="border-b-2 border-gray-200">
                  <td className="py-4 font-medium text-black">{improvement.metric}</td>
                  <td className="py-4 text-red-600 font-bold">{improvement.currentState}</td>
                  <td className="py-4 text-green-600 font-bold">{improvement.projectedState}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 font-black uppercase text-sm">
                      {improvement.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommended Next Steps Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-black text-black uppercase mb-8">Recommended Next Steps</h2>
        
        <div className="space-y-6">
          {/* ROI and Readiness Card */}
          <div className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm uppercase text-gray-600 mb-2">Expected ROI</p>
                <p className="text-3xl font-black text-black">{data.actionPlan.roiProjection}</p>
              </div>
              <div>
                <p className="text-sm uppercase text-gray-600 mb-2">Readiness Assessment</p>
                <p className="text-3xl font-black text-black">{readinessStatus}</p>
                <p className="text-gray-600 mt-1">{readinessExplanation}</p>
              </div>
            </div>
          </div>

          {/* Urgency Alert */}
          <div className="p-6 bg-red-50 border-4 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]">
            <p className="text-sm uppercase text-red-700 font-black mb-2">⚠️ Timing Consideration</p>
            <p className="text-red-900 font-bold">{data.actionPlan.urgency}</p>
          </div>

          {/* CTA Section */}
          <div className="p-8 bg-gradient-to-r from-orange-500 to-red-500 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black text-white uppercase mb-4">Ready to Get Started?</h3>
            <p className="text-white mb-6">{data.actionPlan.ctaText}</p>
            <button
              onClick={handleConsultation}
              className="px-8 py-4 bg-white text-black font-black uppercase text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Schedule Implementation Planning
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-black pt-6 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} deployAI. This report contains proprietary analysis and recommendations.</p>
        <p className="mt-2">Report ID: {reportId} | Generated: {generatedDate.toLocaleDateString()}</p>
      </footer>
    </div>
  );
};