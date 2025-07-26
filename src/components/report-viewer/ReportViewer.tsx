import { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Target, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Calendar,
  Users,
  Briefcase
} from 'lucide-react';
import type { 
  Stage1Analysis, 
  Stage2MarketIntelligence, 
  Stage3FinancialAnalysis, 
  Stage4StrategicRecommendations 
} from '@/types/ai-analysis';

interface ReportViewerProps {
  stage1Analysis: Stage1Analysis;
  stage2Market: Stage2MarketIntelligence;
  stage3Financial: Stage3FinancialAnalysis;
  stage4Strategic: Stage4StrategicRecommendations;
  companyName?: string;
}

export function ReportViewer({
  stage1Analysis,
  stage2Market,
  stage3Financial,
  stage4Strategic,
  companyName = 'Your Company'
}: ReportViewerProps) {
  const [activeSection, setActiveSection] = useState('executive');

  const sections = [
    { id: 'executive', label: 'Executive Summary', icon: Briefcase },
    { id: 'scores', label: 'AI Readiness', icon: Target },
    { id: 'market', label: 'Recommended Solutions', icon: Zap },
    { id: 'financial', label: 'Financial Analysis', icon: DollarSign },
    { id: 'roadmap', label: 'Implementation Roadmap', icon: Calendar },
    { id: 'next', label: 'Next Steps', icon: ChevronRight },
  ];

  const renderExecutiveSummary = () => (
    <div className="space-y-8">
      <div className="bg-white border-3 border-black p-8 shadow-hard-lg">
        <h2 className="text-3xl font-bold mb-6">
          {stage4Strategic.strategicRecommendations.executiveSummary.headline}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Key Findings</h3>
            <ul className="space-y-3">
              {stage4Strategic.strategicRecommendations.executiveSummary.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Top Recommendations</h3>
            <ul className="space-y-3">
              {stage4Strategic.strategicRecommendations.executiveSummary.topRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border-3 border-black">
          <h4 className="font-bold uppercase mb-2">Business Case</h4>
          <p>{stage4Strategic.strategicRecommendations.executiveSummary.businessCase}</p>
        </div>

        <div className="mt-6 p-6 bg-red-50 border-3 border-black">
          <h4 className="font-bold uppercase mb-2 text-red-700">Why Act Now</h4>
          <p>{stage4Strategic.strategicRecommendations.executiveSummary.urgencyRationale}</p>
        </div>
      </div>
    </div>
  );

  const renderScores = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <ScoreCard
          title="AI Opportunity"
          score={stage1Analysis.analysis.scores.aiOpportunityScore}
          color="blue"
          icon={<Zap className="w-8 h-8" />}
        />
        <ScoreCard
          title="ROI Potential"
          score={stage1Analysis.analysis.scores.roiPotentialScore}
          color="green"
          icon={<TrendingUp className="w-8 h-8" />}
        />
        <ScoreCard
          title="Market Opportunity"
          score={stage1Analysis.analysis.scores.marketOpportunityScore}
          color="purple"
          icon={<BarChart3 className="w-8 h-8" />}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-black p-6 shadow-hard">
          <h3 className="text-lg font-bold uppercase mb-4">Priority Areas</h3>
          <ul className="space-y-3">
            {stage1Analysis.analysis.businessAssessment.priorityProcesses.map((process, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="font-medium">{process}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-3 border-black p-6 shadow-hard">
          <h3 className="text-lg font-bold uppercase mb-4">Risk Assessment</h3>
          <div className="space-y-3">
            <RiskIndicator 
              label="Implementation Risk" 
              level={stage1Analysis.analysis.scores.implementationRisk} 
            />
            <RiskIndicator 
              label="Urgency Factor" 
              level={stage1Analysis.analysis.scores.urgencyFactor} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketIntelligence = () => (
    <div className="space-y-8">
      {stage2Market.marketIntelligence.recommendedSolutions.map((category, idx) => (
        <div key={idx} className="bg-white border-3 border-black p-6 shadow-hard">
          <h3 className="text-xl font-bold uppercase mb-6">{category.category}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {category.tools.map((tool, toolIdx) => (
              <ToolCard key={toolIdx} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFinancialAnalysis = () => {
    const roi = stage3Financial.financialAnalysis.projectedSavings.netROI;
    const payback = stage3Financial.financialAnalysis.projectedSavings.netROI.paybackPeriod;
    
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            label="Projected ROI"
            value={`${roi.value}%`}
            color="green"
          />
          <MetricCard
            label="Payback Period"
            value={payback}
            color="blue"
          />
          <MetricCard
            label="Annual Savings"
            value={`$${stage3Financial.financialAnalysis.projectedSavings.year1.totalBenefit.toLocaleString()}`}
            color="purple"
          />
        </div>

        <div className="bg-white border-3 border-black p-8 shadow-hard">
          <h3 className="text-xl font-bold uppercase mb-6">Cost-Benefit Analysis</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold uppercase mb-4">Current State Costs</h4>
              <div className="space-y-3">
                <CostItem 
                  label="Direct Labor" 
                  value={stage3Financial.financialAnalysis.currentStateCosts.costBreakdown.directLabor} 
                />
                <CostItem 
                  label="Opportunity Cost" 
                  value={stage3Financial.financialAnalysis.currentStateCosts.costBreakdown.opportunityCost} 
                />
                <CostItem 
                  label="Error Costs" 
                  value={stage3Financial.financialAnalysis.currentStateCosts.costBreakdown.errorCosts} 
                />
                <div className="pt-3 border-t-2 border-black">
                  <CostItem 
                    label="Total Annual Cost" 
                    value={stage3Financial.financialAnalysis.currentStateCosts.totalCurrentStateCost} 
                    bold
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase mb-4">Investment Required</h4>
              <div className="space-y-3">
                <CostItem 
                  label="Tool Costs (Annual)" 
                  value={stage3Financial.financialAnalysis.projectedSavings.investmentRequired.toolCosts} 
                />
                <CostItem 
                  label="Implementation" 
                  value={stage3Financial.financialAnalysis.projectedSavings.investmentRequired.implementationCosts} 
                />
                <CostItem 
                  label="Training" 
                  value={stage3Financial.financialAnalysis.projectedSavings.investmentRequired.trainingCosts} 
                />
                <div className="pt-3 border-t-2 border-black">
                  <CostItem 
                    label="Total Investment" 
                    value={stage3Financial.financialAnalysis.projectedSavings.investmentRequired.totalInvestment} 
                    bold
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <ScenarioCard 
              title="Conservative" 
              scenario={stage3Financial.financialAnalysis.scenarioAnalysis.conservative}
              color="gray"
            />
            <ScenarioCard 
              title="Realistic" 
              scenario={stage3Financial.financialAnalysis.scenarioAnalysis.realistic}
              color="blue"
            />
            <ScenarioCard 
              title="Optimistic" 
              scenario={stage3Financial.financialAnalysis.scenarioAnalysis.optimistic}
              color="green"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRoadmap = () => (
    <div className="space-y-8">
      <div className="bg-white border-3 border-black p-8 shadow-hard">
        <h3 className="text-xl font-bold uppercase mb-6">Priority Initiatives</h3>
        <div className="space-y-4">
          {stage4Strategic.strategicRecommendations.priorityRanking.map((priority) => (
            <PriorityCard key={priority.priority} priority={priority} />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <PhaseCard 
          phase={stage4Strategic.strategicRecommendations.implementationRoadmap.phase1}
          number={1}
        />
        <PhaseCard 
          phase={stage4Strategic.strategicRecommendations.implementationRoadmap.phase2}
          number={2}
        />
      </div>
    </div>
  );

  const renderNextSteps = () => (
    <div className="space-y-8">
      <div className="bg-white border-3 border-black p-8 shadow-hard">
        <h3 className="text-xl font-bold uppercase mb-6">Your Action Plan</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            title="Immediate Actions"
            actions={stage4Strategic.strategicRecommendations.nextSteps.immediate}
            color="red"
            icon={<Zap className="w-6 h-6" />}
          />
          <ActionCard
            title="Week 1"
            actions={stage4Strategic.strategicRecommendations.nextSteps.week1}
            color="orange"
            icon={<Calendar className="w-6 h-6" />}
          />
          <ActionCard
            title="Month 1"
            actions={stage4Strategic.strategicRecommendations.nextSteps.month1}
            color="yellow"
            icon={<Target className="w-6 h-6" />}
          />
        </div>

        <div className="mt-8 p-6 bg-blue-50 border-3 border-black">
          <h4 className="font-bold uppercase mb-3">Ready to Get Started?</h4>
          <p className="mb-4">{stage4Strategic.strategicRecommendations.nextSteps.consultationValue}</p>
          <button className="px-8 py-3 bg-blue-600 text-white font-bold uppercase border-3 border-black shadow-hard hover:shadow-hard-lg transition-shadow">
            Schedule Your Consultation
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'executive':
        return renderExecutiveSummary();
      case 'scores':
        return renderScores();
      case 'market':
        return renderMarketIntelligence();
      case 'financial':
        return renderFinancialAnalysis();
      case 'roadmap':
        return renderRoadmap();
      case 'next':
        return renderNextSteps();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b-3 border-black sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-bold uppercase whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black border-3 border-black hover:shadow-hard'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase">
            AI Readiness Report for {companyName}
          </h1>
          <p className="text-gray-600 mt-2">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

// Helper Components
function ScoreCard({ title, score, color, icon }: any) {
  const bgColor = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50'
  }[color];

  const textColor = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600'
  }[color];

  return (
    <div className={`${bgColor} border-3 border-black p-6 shadow-hard`}>
      <div className={`${textColor} mb-4`}>{icon}</div>
      <h3 className="font-bold uppercase mb-2">{title}</h3>
      <div className="text-4xl font-bold">{score}/100</div>
    </div>
  );
}

function RiskIndicator({ label, level }: { label: string; level: string }) {
  const color = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-red-500'
  }[level];

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="font-bold">{level}</span>
      </div>
    </div>
  );
}

function ToolCard({ tool }: any) {
  return (
    <div className="border-3 border-black p-4">
      <h4 className="font-bold text-lg mb-2">{tool.name}</h4>
      <p className="text-sm text-gray-600 mb-3">{tool.vendor}</p>
      <p className="text-sm mb-4">{tool.description}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-bold">${tool.pricing.cost}/{tool.pricing.model}</span>
        </div>
        <div className="flex justify-between">
          <span>ROI:</span>
          <span className="font-bold">{tool.roi.value}{tool.roi.unit} in {tool.roi.timeframe}</span>
        </div>
        <div className="flex justify-between">
          <span>Complexity:</span>
          <span className="font-bold">{tool.implementation.complexity}</span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color }: any) {
  const bgColor = {
    green: 'bg-green-100 border-green-600',
    blue: 'bg-blue-100 border-blue-600',
    purple: 'bg-purple-100 border-purple-600'
  }[color];

  return (
    <div className={`${bgColor} border-3 p-6 text-center`}>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm font-medium uppercase">{label}</div>
    </div>
  );
}

function CostItem({ label, value, bold = false }: any) {
  return (
    <div className={`flex justify-between ${bold ? 'font-bold' : ''}`}>
      <span>{label}:</span>
      <span>${value.toLocaleString()}</span>
    </div>
  );
}

function ScenarioCard({ title, scenario, color }: any) {
  const bgColor = {
    gray: 'bg-gray-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100'
  }[color];

  return (
    <div className={`${bgColor} border-3 border-black p-4`}>
      <h4 className="font-bold uppercase mb-3">{title}</h4>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">ROI:</span> {scenario.roi}%
        </div>
        <div>
          <span className="font-medium">Payback:</span> {scenario.payback}
        </div>
      </div>
    </div>
  );
}

function PriorityCard({ priority }: any) {
  const riskColor = {
    low: 'bg-green-100',
    medium: 'bg-yellow-100',
    high: 'bg-red-100'
  }[priority.riskLevel.toLowerCase()];

  return (
    <div className="border-3 border-black p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-black text-white font-bold flex items-center justify-center text-xl">
        {priority.priority}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg">{priority.initiative}</h4>
        <p className="text-sm text-gray-600 mt-1">{priority.rationale}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="font-medium">ROI: {priority.expectedROI}</span>
          <span className="font-medium">Time: {priority.timeToValue}</span>
          {priority.quickWin && (
            <span className="px-2 py-1 bg-green-500 text-white font-bold uppercase text-xs">
              Quick Win
            </span>
          )}
        </div>
      </div>
      <div className={`px-3 py-1 ${riskColor} border-2 border-black text-sm font-bold`}>
        {priority.riskLevel} Risk
      </div>
    </div>
  );
}

function PhaseCard({ phase, number }: any) {
  return (
    <div className="bg-white border-3 border-black p-6 shadow-hard">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-black text-white font-bold flex items-center justify-center">
          {number}
        </div>
        <h4 className="text-lg font-bold uppercase">{phase.name}</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium">Duration:</span> {phase.duration}
        </div>
        <div>
          <span className="font-medium">Focus:</span> {phase.focus}
        </div>
        <div>
          <span className="font-medium">Expected ROI:</span> {phase.expectedROI}
        </div>
        
        <div className="pt-3 border-t-2 border-gray-200">
          <h5 className="font-medium mb-2">Key Initiatives:</h5>
          <ul className="space-y-1">
            {phase.initiatives.map((initiative: string, idx: number) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span>•</span>
                <span>{initiative}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, actions, color, icon }: any) {
  const bgColor = {
    red: 'bg-red-50',
    orange: 'bg-orange-50',
    yellow: 'bg-yellow-50'
  }[color];

  return (
    <div className={`${bgColor} border-3 border-black p-6`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h4 className="font-bold uppercase">{title}</h4>
      </div>
      <ul className="space-y-2">
        {actions.map((action: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}