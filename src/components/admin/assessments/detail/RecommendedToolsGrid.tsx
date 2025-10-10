import React, { useState } from 'react';
import { Wrench, DollarSign, TrendingUp, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface Tool {
  name: string;
  vendor: string;
  description: string;
  industryFit?: string;
  solvesPainPoints?: string[];
  pricing: {
    model: string;
    cost: number;
    currency: string;
    perUser?: boolean;
    additionalCosts?: string;
  };
  roi: {
    metric: string;
    value: number;
    unit: string;
    timeframe: string;
  };
  implementation: {
    complexity: 'low' | 'medium' | 'high';
    timeToValue: string;
    integrationRequired?: string[];
    trainingRequired?: 'minimal' | 'moderate' | 'extensive';
  };
  confidence?: 'high' | 'medium' | 'low';
}

interface RecommendedSolution {
  category: string;
  tools: Tool[];
}

interface RecommendedToolsGridProps {
  recommendedSolutions?: RecommendedSolution[];
}

const RecommendedToolsGrid: React.FC<RecommendedToolsGridProps> = ({
  recommendedSolutions = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const getComplexityColor = (complexity: string) => {
    const config = {
      low: 'bg-green-100 text-green-800 border-green-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      high: 'bg-red-100 text-red-800 border-red-300',
    };
    return config[complexity as keyof typeof config] || config.medium;
  };

  // Flatten all tools and get top 5
  const allTools = recommendedSolutions.flatMap((solution) =>
    solution.tools.map((tool) => ({ ...tool, category: solution.category }))
  );

  const topTools = allTools.slice(0, 5);
  const remainingTools = allTools.slice(5);
  const displayedTools = showAll ? allTools : topTools;

  if (!recommendedSolutions.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Recommended Solutions</h2>
        </div>
        <p className="text-sm text-gray-500">No tool recommendations available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Recommended Solutions</h2>
        </div>
        <span className="text-sm text-gray-500">{allTools.length} tools found</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedTools.map((tool, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow bg-white"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
                {tool.confidence === 'high' && (
                  <Zap className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">by {tool.vendor}</p>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded">
                {(tool as any).category}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4">{tool.description}</p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Investment</p>
                  <p className="text-sm font-bold text-gray-900">
                    ${tool.pricing.cost.toLocaleString()}/{tool.pricing.model}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Expected ROI</p>
                  <p className="text-sm font-bold text-green-600">
                    {tool.roi.value}{tool.roi.unit}
                  </p>
                  <p className="text-xs text-gray-500">{tool.roi.timeframe}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Time to Value</p>
                  <p className="text-sm font-bold text-gray-900">{tool.implementation.timeToValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Wrench className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Setup</p>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded border capitalize ${getComplexityColor(
                      tool.implementation.complexity
                    )}`}
                  >
                    {tool.implementation.complexity}
                  </span>
                </div>
              </div>
            </div>

            {/* Solves Pain Points */}
            {tool.solvesPainPoints && tool.solvesPainPoints.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Solves
                </p>
                <div className="flex flex-wrap gap-1">
                  {tool.solvesPainPoints.slice(0, 3).map((painPoint, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 border border-gray-200 rounded"
                    >
                      {painPoint}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations */}
            {tool.implementation.integrationRequired &&
              tool.implementation.integrationRequired.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Key Integrations</p>
                  <p className="text-xs text-gray-600">
                    {tool.implementation.integrationRequired.slice(0, 3).join(', ')}
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>

      {/* View All Toggle */}
      {remainingTools.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Top {topTools.length} Only
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View All {allTools.length} Recommendations
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedToolsGrid;
