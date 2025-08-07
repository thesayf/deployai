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
    <div className={`max-w-4xl mx-auto p-8 bg-white ${className}`}>
      <header className="border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Readiness Assessment</h1>
        <div className="mt-2 text-sm text-gray-600">
          <p>Prepared for: {companyName}</p>
          <p>Date: {generatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p>Assessment ID: {reportId}</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Executive Summary</h2>
        <div className="text-gray-700 space-y-4">
          <p className="leading-relaxed">
            As a {data.problemSummary.industryProfile.toLowerCase()}, your organization faces three critical 
            operational challenges that are currently costing approximately <span className="font-semibold text-red-600">
            {data.problemSummary.monthlyOpportunity}</span> per month in lost efficiency and missed opportunities.
          </p>
          <p className="leading-relaxed">
            Our analysis identifies immediate opportunities for AI implementation that can deliver 
            <span className="font-semibold text-green-600">{data.actionPlan.roiProjection}</span> return 
            on investment, with implementation possible within 3-6 weeks.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Current State Analysis</h2>
        
        <h3 className="text-lg font-medium mb-3 text-gray-800">Key Operational Challenges</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
          {data.problemSummary.topProblems.map((problem, index) => (
            <li key={index} className="leading-relaxed">
              <span className="font-medium">{problem}</span> — This inefficiency is typical in your 
              industry and directly impacts {index === 0 ? 'customer satisfaction' : 
              index === 1 ? 'operational scalability' : 'overall performance'}.
            </li>
          ))}
        </ol>
        
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500">
          <p className="font-medium text-amber-900">Financial Impact</p>
          <p className="text-amber-800">
            Current inefficiencies result in an estimated {data.problemSummary.monthlyOpportunity} monthly opportunity cost.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recommended AI Solutions</h2>
        
        <div className="space-y-6">
          {data.solutions.map((solution, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-gray-900">{solution.category}</h3>
              <p className="text-gray-700 mt-2">{solution.outcome}</p>
              <p className="text-sm text-gray-600 mt-2">Implementation: {solution.timeline}</p>
              <blockquote className="mt-3 italic text-gray-600 text-sm">
                Similar implementation: {solution.caseStudy}
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected Business Outcomes</h2>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left">
              <th className="py-2 text-gray-700">Metric</th>
              <th className="py-2 text-gray-700">Current State</th>
              <th className="py-2 text-gray-700">After Implementation</th>
              <th className="py-2 text-gray-700">Improvement</th>
            </tr>
          </thead>
          <tbody>
            {data.measurableImprovements.map((improvement, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 text-gray-700">{improvement.metric}</td>
                <td className="py-3 text-red-600">{improvement.currentState}</td>
                <td className="py-3 text-green-600">{improvement.projectedState}</td>
                <td className="py-3 font-semibold text-gray-900">{improvement.improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recommended Next Steps</h2>
        
        <div className="bg-gray-50 p-6 rounded">
          <p className="text-gray-700 mb-4">
            Based on our assessment, your organization shows <span className="font-semibold">{readinessStatus}</span> readiness. {readinessExplanation}.
          </p>
          
          <div className="p-4 bg-red-50 border-l-4 border-red-500 mb-4">
            <p className="text-red-900">
              <strong>Timing:</strong> {data.actionPlan.urgency}
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-white border border-gray-300">
            <p className="font-medium text-gray-900 mb-2">Schedule Your Implementation Planning Session</p>
            <p className="text-gray-700 mb-4">{data.actionPlan.ctaText}</p>
            <button
              onClick={handleConsultation}
              className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 pt-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} deployAI. This report contains proprietary analysis and recommendations.</p>
      </footer>
    </div>
  );
};