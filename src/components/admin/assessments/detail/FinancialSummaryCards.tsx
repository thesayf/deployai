import React, { useState } from 'react';
import { DollarSign, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface Scenario {
  name: string;
  description: string;
  year1: {
    toolsCost: number;
    implementationCost: number;
    totalInvestment: number;
    projectedSavings: number;
    netBenefit: number;
    roi: number;
    paybackMonths: number;
  };
  year3: {
    cumulativeSavings: number;
    totalInvestment: number;
    netBenefit: number;
    roi: number;
  };
}

interface FinancialAnalysis {
  currentCosts: {
    annualWaste: number;
    monthlyWaste: number;
    breakdown: {
      category: string;
      cost: number;
      percentage: number;
    }[];
  };
  scenarios: Scenario[];
}

interface FinancialSummaryCardsProps {
  financialAnalysis?: FinancialAnalysis;
}

const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({
  financialAnalysis,
}) => {
  const [showAllScenarios, setShowAllScenarios] = useState(false);

  // Get realistic scenario (middle scenario)
  const realisticScenario = financialAnalysis?.scenarios?.find(
    (s) => s.name.toLowerCase().includes('realistic')
  ) || financialAnalysis?.scenarios?.[1];

  // Get other scenarios for expandable section
  const otherScenarios = financialAnalysis?.scenarios?.filter(
    (s) => s.name !== realisticScenario?.name
  ) || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(0)}%`;
  };

  if (!financialAnalysis || !realisticScenario) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Financial Analysis</h2>
        </div>
        <p className="text-sm text-gray-500">Financial data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Financial Analysis</h2>
      </div>

      {/* Two Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Current Annual Cost */}
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Current Annual Cost</p>
              <p className="text-xs text-red-700">Inefficiency + Lost Opportunity</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-700">
            {formatCurrency(financialAnalysis.currentCosts.annualWaste)}
          </p>
          <p className="text-sm text-red-600 mt-1">per year wasted</p>
        </div>

        {/* Year 1 Net Benefit */}
        <div className="border border-green-200 bg-green-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Year 1 Net Benefit</p>
              <p className="text-xs text-green-700">After Investment</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-700">
            {formatCurrency(realisticScenario.year1.netBenefit)}
          </p>

          {/* Key Metrics */}
          <div className="mt-4 pt-4 border-t border-green-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800">ROI:</span>
              <span className="text-sm font-bold text-green-900">
                {formatPercent(realisticScenario.year1.roi)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800">Payback:</span>
              <span className="text-sm font-bold text-green-900">
                {realisticScenario.year1.paybackMonths} months
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800">Investment:</span>
              <span className="text-sm font-bold text-green-900">
                {formatCurrency(realisticScenario.year1.totalInvestment)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Investment Breakdown (Year 1)</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tools & Software:</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(realisticScenario.year1.toolsCost)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Implementation & Setup:</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(realisticScenario.year1.implementationCost)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <span className="text-sm font-semibold text-gray-700">Total Investment:</span>
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(realisticScenario.year1.totalInvestment)}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Other Scenarios */}
      {otherScenarios.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowAllScenarios(!showAllScenarios)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {showAllScenarios ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Alternative Scenarios
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View Conservative/Optimistic Scenarios
              </>
            )}
          </button>

          {showAllScenarios && (
            <div className="mt-4 space-y-4">
              {otherScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{scenario.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Year 1 Net Benefit</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(scenario.year1.netBenefit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Year 1 ROI</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatPercent(scenario.year1.roi)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Payback Period</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {scenario.year1.paybackMonths} months
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Total Investment</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatCurrency(scenario.year1.totalInvestment)}
                      </p>
                    </div>
                  </div>

                  {/* 3-Year Projection */}
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-500 font-medium mb-2">3-Year Cumulative</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Net Benefit:</span>
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(scenario.year3.netBenefit)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialSummaryCards;
