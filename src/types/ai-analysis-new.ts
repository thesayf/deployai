// Types for the new AI assessment analysis flow

export interface BusinessContext {
  urgency: string;
  industry: string;
  companyName: string;
  companySize: string;
  aiExperience: string;
  monthlyBudget: string;
  currentSystems: string;
  currentToolEcosystem?: string;
  workflowBreakpoints?: string;
  integrationGaps?: string;
  transformationVision?: string;
  techCapability: string;
  integrationNeeds: string;
  decisionAuthority: string;
  businessObjectives: string;
  repetitiveTasks?: string[];
  businessChallenges?: string[];
}

export interface TopOpportunity {
  problemArea: string;
  monthlyTimeCost: string;
  monthlyFinancialCost: string;
  annualCost: string;
  aiSolutionType: string;
  problemEvidence: string;
  searchKeywords: string[];
  expectedOutcome: string;
  // Legacy fields for backward compatibility
  estimatedMonthlyCost?: string;
  problemSeverity?: string;
}

export interface ProblemAnalysis {
  businessContext: BusinessContext;
  topOpportunities: TopOpportunity[];
}

export interface Tool {
  name: string;
  verboseName: string;
  category: string;
  description: string;
  primaryBenefits: string[];
  pricing: {
    model: string;
    range: string;
    setupFee: string;
    notes: string;
  };
  implementationTime: string;
  caseStudies: Array<{
    company: string;
    industry: string;
    result: string;
    metric: string;
    source: string;
  }>;
  annualROI: {
    potentialSavings: string;
    percentageImprovement: string;
    paybackPeriod: string;
  };
  bestFor: string;
  integrations: string[];
  implementationComplexity: string;
}

export interface RecommendedSolution {
  problemArea: string;
  estimatedMonthlyCost: string;
  estimatedAnnualCost: string;
  tools: Tool[];
}

export interface ToolResearch {
  estimatedAnnualOpportunity: string;
  recommendedSolutions: RecommendedSolution[];
}

export interface SelectedTool {
  name: string;
  category: string;
  problemSolved: string;
  monthlyCost: string;
  annualCost: string;
  implementationTime: string;
  primaryBenefit: string;
  expectedROI: string;
  paybackPeriod: string;
  integrations: string[];
  bestFor: string;
}

export interface ExecutiveSummary {
  estimatedAnnualOpportunity: string;
  totalMonthlyCost: string;
  totalAnnualCost: string;
  averagePaybackPeriod: string;
  implementationTimeline: string;
  topRecommendation: string;
  keyInsight: string;
}

export interface CuratedTools {
  executiveSummary: ExecutiveSummary;
  selectedTools: SelectedTool[];
  implementationRoadmap: Array<{
    phase: string;
    timeline: string;
    tools: string[];
    objectives: string[];
    expectedOutcomes: string[];
  }>;
  budgetBreakdown: {
    monthlyToolCosts: string;
    annualToolCosts: string;
    implementationCosts: string;
    totalFirstYearInvestment: string;
  };
  riskAnalysis: Array<{
    risk: string;
    mitigation: string;
  }>;
}

export interface FinalReport {
  executiveSummary: {
    companyOverview: string;
    keyFindings: string[];
    totalInvestment: string;
    expectedROI: string;
    implementationTimeline: string;
    criticalSuccessFactors: string[];
  };
  problemAnalysis: {
    topChallenges: Array<{
      challenge: string;
      impact: string;
      solution: string;
    }>;
    opportunityCost: string;
  };
  recommendedSolutions: Array<{
    toolName: string;
    problemSolved: string;
    monthlyInvestment: string;
    expectedBenefit: string;
    implementationPhase: string;
  }>;
  implementationPlan: {
    phase1: {
      timeline: string;
      tools: string[];
      expectedOutcomes: string[];
    };
    phase2?: {
      timeline: string;
      tools: string[];
      expectedOutcomes: string[];
    };
    phase3?: {
      timeline: string;
      tools: string[];
      expectedOutcomes: string[];
    };
  };
  successMetrics: Array<{
    metric: string;
    baseline: string;
    target: string;
    timeline: string;
  }>;
  nextSteps: string[];
}