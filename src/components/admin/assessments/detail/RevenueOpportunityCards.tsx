import React from 'react';
import { DollarSign, TrendingUp, Users, Zap } from 'lucide-react';
import { RecommendedSolution, Tool } from '@/types/ai-analysis-new';

interface RevenueOpportunityCardsProps {
  recommendedSolutions?: RecommendedSolution[];
}

interface ToolWithProblem extends Tool {
  problemArea: string;
}

const RevenueOpportunityCards: React.FC<RevenueOpportunityCardsProps> = ({
  recommendedSolutions
}) => {
  if (!recommendedSolutions || recommendedSolutions.length === 0) {
    return null;
  }

  // Extract all tools with consultant revenue data and attach problem area
  const toolsWithRevenue: ToolWithProblem[] = [];

  recommendedSolutions.forEach(solution => {
    solution.tools.forEach(tool => {
      if (tool.consultantRevenue) {
        toolsWithRevenue.push({
          ...tool,
          problemArea: solution.problemArea
        });
      }
    });
  });

  if (toolsWithRevenue.length === 0) {
    return null;
  }

  // Sort by year1TotalRevenue.max and take top 3
  const topOpportunities = toolsWithRevenue
    .sort((a, b) => {
      const aMax = a.consultantRevenue?.year1TotalRevenue.max || 0;
      const bMax = b.consultantRevenue?.year1TotalRevenue.max || 0;
      return bMax - aMax;
    })
    .slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Top Revenue Opportunities</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {topOpportunities.map((tool, index) => {
          const revenue = tool.consultantRevenue!;

          return (
            <div
              key={`${tool.name}-${index}`}
              className="bg-white border-[3px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              {/* Header with ranking badge */}
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 border-b-[3px] border-black">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="bg-black text-white px-2 py-1 text-xs font-bold inline-block mb-2">
                      OPPORTUNITY #{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                    <p className="text-sm font-medium text-gray-700 mt-1">{tool.category}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Problem Area */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">CLIENT PROBLEM</p>
                  <p className="text-sm font-medium text-gray-900">{tool.problemArea}</p>
                </div>

                {/* Solution Description */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">SOLUTION</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{tool.description}</p>
                </div>

                {/* How it Solves Problem */}
                {tool.primaryBenefits && tool.primaryBenefits.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">HOW IT SOLVES</p>
                    <ul className="space-y-1">
                      {tool.primaryBenefits.slice(0, 2).map((benefit, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <Zap className="h-3 w-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tool Cost */}
                <div className="bg-gray-50 border-[2px] border-gray-300 p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">TOOL COST</p>
                  <p className="text-sm font-bold text-gray-900">{tool.pricing.range}</p>
                  <p className="text-xs text-gray-600 mt-1">{tool.pricing.model}</p>
                </div>

                {/* Consultant Revenue Breakdown */}
                <div className="bg-green-50 border-[3px] border-green-500 p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <p className="text-xs font-bold text-green-800 uppercase">YOUR REVENUE</p>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-700">Implementation</span>
                    <span className="text-xs font-bold text-gray-900">
                      {revenue.estimatedImplementationWeeks} weeks
                    </span>
                  </div>

                  {/* Discovery & Assessment Fee */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Discovery</span>
                      <span className="text-xs font-bold text-gray-900">
                        {formatCurrency(revenue.discoveryAssessmentFee.min)} - {formatCurrency(revenue.discoveryAssessmentFee.max)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600">{revenue.discoveryAssessmentFee.basis}</p>
                  </div>

                  {/* Integration Fee */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Integration</span>
                      <span className="text-xs font-bold text-gray-900">
                        {formatCurrency(revenue.integrationFee.min)} - {formatCurrency(revenue.integrationFee.max)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600">{revenue.integrationFee.basis}</p>
                  </div>

                  {/* Customization Fee */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Customization</span>
                      <span className="text-xs font-bold text-gray-900">
                        {formatCurrency(revenue.customizationFee.min)} - {formatCurrency(revenue.customizationFee.max)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600">{revenue.customizationFee.basis}</p>
                  </div>

                  {/* Training Fee */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Training</span>
                      <span className="text-xs font-bold text-gray-900">
                        {formatCurrency(revenue.trainingFee.min)} - {formatCurrency(revenue.trainingFee.max)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600">{revenue.trainingFee.basis}</p>
                  </div>

                  {/* Monthly Retainer */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Monthly Retainer</span>
                      <span className="text-xs font-bold text-gray-900">
                        {formatCurrency(revenue.ongoingMonthlyRetainer.min)} - {formatCurrency(revenue.ongoingMonthlyRetainer.max)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600">{revenue.ongoingMonthlyRetainer.description}</p>
                  </div>

                  {/* Year 1 Total - Highlighted */}
                  <div className="bg-white border-[2px] border-green-600 p-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">Year 1 Total</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(revenue.year1TotalRevenue.min)} - {formatCurrency(revenue.year1TotalRevenue.max)}
                      </span>
                    </div>
                  </div>

                  {/* Profit Margin */}
                  <div className="flex items-center justify-between pt-2 border-t-[2px] border-green-300">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-bold text-green-800">PROFIT MARGIN</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {revenue.profitMarginPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      {topOpportunities.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-[3px] border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Total Revenue Potential</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{topOpportunities.length}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Min Year 1 Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  topOpportunities.reduce((sum, tool) =>
                    sum + (tool.consultantRevenue?.year1TotalRevenue.min || 0), 0
                  )
                )}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Max Year 1 Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  topOpportunities.reduce((sum, tool) =>
                    sum + (tool.consultantRevenue?.year1TotalRevenue.max || 0), 0
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueOpportunityCards;
