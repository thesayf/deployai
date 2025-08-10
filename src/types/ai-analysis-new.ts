<<<<<<< HEAD
// Types for the new AI assessment analysis flow

export interface BusinessContext {
  urgency: string;
  industry: string;
  companyName: string;
  companySize: string;
  aiExperience: string;
  monthlyBudget: string;
  currentSystems: string[];
  techCapability: string;
  integrationNeeds: string;
  decisionAuthority: string;
  businessObjectives: string;
}

export interface TopOpportunity {
  problemArea: string;
  estimatedMonthlyCost: string;
  problemSeverity: string;
  aiSolutionType: string;
  problemEvidence: string;
  searchKeywords: string[];
  expectedOutcome: string;
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
=======
// TypeScript interfaces for new 4-step AI process

// Step 1: Problem Analysis
export interface ProblemAnalysis {
  businessContext: {
    companyName?: string;
    industry: string;
    companySize: string;
    monthlyBudget: string;
    urgency: string;
    techCapability: string;
    currentSystems: string;
    integrationNeeds: string;
    aiExperience: string;
    businessObjectives: string;
    decisionAuthority: string;
  };
  topOpportunities: Array<{
    problemArea: string;
    aiSolutionType: string;
    problemEvidence: string;
    searchKeywords: string[];
    expectedOutcome: string;
  }>;
}

// Step 2: Tool Research
export interface ToolResearch {
  estimatedAnnualOpportunity: string;
  recommendedSolutions: Array<{
    problemArea: string;
    estimatedMonthlyCost: string;
    estimatedAnnualCost: string;
    tools: Array<{
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
      implementationComplexity: 'Low' | 'Medium' | 'High';
    }>;
  }>;
}

// Step 3: Tool Curation
export interface CuratedTools {
  executiveSummary: {
    businessProfile: string;
    totalInvestmentRange: string;
    expectedROI: string;
    implementationTimeline: string;
    keyBenefits: string[];
    estimatedAnnualOpportunity: string;
  };
  selectedTools: Array<{
    priority: number;
    toolName: string;
    vendor: string;
    category: string;
    verboseName: string;
    problemSolved: string;
    directImpact: string[];
    primaryBenefits: string[];
    solutionDescription: string;
    pricing: {
      model: string;
      cost: string;
      setupFees: string;
      totalFirstYearCost: string;
    };
    businessCase: {
      currentProblemCost: string;
      projectedSavings: string;
      paybackPeriod: string;
      roiPercentage: string;
      caseStudies: Array<{
        company: string;
        industry: string;
        result: string;
        metric: string;
      }>;
    };
    implementation: {
      complexity: 'Low' | 'Medium' | 'High';
      estimatedSetupTime: string;
      technicalRequirements: string[];
      integrationNeeded: string[];
      supportLevel: string;
      trainingsRequired: string;
    };
    successMetrics: Array<{
      metric: string;
      currentState: string;
      targetState: string;
      measurementMethod: string;
    }>;
    risks: Array<{
      risk: string;
      mitigation: string;
      probability: 'Low' | 'Medium' | 'High';
    }>;
  }>;
  whereToStart: {
    recommendedTool: string;
    rationale: string;
    immediateBottleneck: string;
    expectedImpact: string;
    timelineToInstallation: string;
    expectedROI: string;
  };
  implementationRoadmap: {
    phase1: {
      timeline: string;
      focus: string;
      activities: string[];
      successCriteria: string;
    };
    phase2: {
      timeline: string;
      focus: string;
      activities: string[];
      dependencies: string;
    };
    phase3: {
      timeline: string;
      focus: string;
      activities: string[];
      dependencies: string;
    };
  };
  totalInvestmentSummary: {
    monthlyRecurring: string;
    oneTimeSetup: string;
    firstYearTotal: string;
    projectedAnnualSavings: string;
    netROI: string;
    paybackTimeline: string;
  };
  nextSteps: {
    immediate: string[];
    week1: string[];
    month1: string[];
  };
  supportResources: {
    vendorContacts: Array<{
      tool: string;
      contactInfo: string;
      trialAvailable: string;
    }>;
    implementationPartners: string[];
    additionalResources: string[];
  };
}

// Step 4: Final Report Generation
export interface FinalReport {
  executiveSummary: {
    readinessLevel: string;
    estimatedAnnualOpportunity: string;
    immediateROI: string;
  };
  keyProblems: Array<{
    problem: string;
    currentCost: string;
    potentialGain: string;
  }>;
  recommendedSolutions: Array<{
    solutionName: string;
    directImpact: string[];
    primaryBenefits: string[];
    description: string;
    realWorldProof: Array<{
      caseStudy: string;
      metric: string;
    }>;
    implementationTime: string;
  }>;
  projectedOutcomes: Array<{
    tool: string;
    metric: string;
    current: string;
    projected: string;
    improvementPercentage: string;
  }>;
  whereToStart: {
    recommendation: string;
    targetBottleneck: string;
    immediateImpact: string;
    timelineEstimate: string;
    expectedROI: string;
  };
  callToAction: {
    primaryCTA: string;
    secondaryCTA: string;
    urgencyMessage: string;
  };
>>>>>>> origin/main
}