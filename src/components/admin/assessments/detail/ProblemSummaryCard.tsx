import React from 'react';
import { AlertCircle, DollarSign } from 'lucide-react';

interface PainPoint {
  problem: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cost: 'high' | 'medium' | 'low';
  aiSuitability: 'excellent' | 'good' | 'fair' | 'poor';
}

interface ProblemSummaryCardProps {
  industryProfile?: string;
  painPoints?: PainPoint[];
  businessImpact?: string;
  monthlyOpportunity?: string;
}

const ProblemSummaryCard: React.FC<ProblemSummaryCardProps> = ({
  industryProfile,
  painPoints = [],
  businessImpact,
  monthlyOpportunity,
}) => {
  const getSeverityBadge = (severity: string) => {
    const config = {
      critical: 'bg-red-100 text-red-800 border-red-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    return config[severity as keyof typeof config] || config.medium;
  };

  const getAiSuitabilityBadge = (suitability: string) => {
    const config = {
      excellent: 'bg-green-100 text-green-800 border-green-300',
      good: 'bg-blue-100 text-blue-800 border-blue-300',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      poor: 'bg-gray-100 text-gray-800 border-gray-300',
    };

    return config[suitability as keyof typeof config] || config.fair;
  };

  // Show top 5 pain points only
  const topPainPoints = painPoints.slice(0, 5);

  if (!painPoints.length && !businessImpact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Problem Analysis</h2>
        </div>
        <p className="text-sm text-gray-500">Analysis data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <h2 className="text-lg font-semibold text-gray-900">Problem Summary</h2>
      </div>

      {industryProfile && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Industry Profile</p>
          <p className="text-gray-900">{industryProfile}</p>
        </div>
      )}

      {topPainPoints.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Key Pain Points
          </h3>
          {topPainPoints.map((painPoint, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-medium text-gray-900 flex-1">{painPoint.problem}</p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityBadge(
                    painPoint.severity
                  )}`}
                >
                  {painPoint.severity.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600">
                  Cost Impact: <span className="font-medium capitalize">{painPoint.cost}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded border ${getAiSuitabilityBadge(
                    painPoint.aiSuitability
                  )}`}
                >
                  AI Fit: {painPoint.aiSuitability}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {monthlyOpportunity && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Monthly Opportunity</p>
              <p className="text-lg font-bold text-blue-700">{monthlyOpportunity}</p>
            </div>
          </div>
        </div>
      )}

      {businessImpact && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Business Impact</p>
          <p className="text-sm text-gray-900">{businessImpact}</p>
        </div>
      )}
    </div>
  );
};

export default ProblemSummaryCard;
