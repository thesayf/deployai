// TypeScript interfaces for new 4-step AI process

// Step 1: Problem Analysis
export interface ProblemAnalysis {
  businessContext: {
    industry: string;
    companySize: string;
    monthlyBudget: string;
    urgency: string;
    techCapability: string;
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
  recommendedSolutions: Array<{
    problemArea: string;
    tools: Array<{
      name: string;
      category: string;
      description: string;
      pricing: string;
      bestFor: string;
      keyFeatures: string[];
      integrations: string[];
      roiData: {
        metric: string;
        improvement: string;
        source: string;
      };
      caseStudy: string;
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
  };
  selectedTools: Array<{
    priority: number;
    toolName: string;
    vendor: string;
    category: string;
    problemSolved: string;
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
      caseStudyEvidence: string;
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
  problemSummary: {
    industryProfile: string;
    topProblems: string[];
    monthlyOpportunity: string;
  };
  solutions: Array<{
    category: string;
    outcome: string;
    timeline: string;
    caseStudy: string;
  }>;
  measurableImprovements: Array<{
    metric: string;
    currentState: string;
    projectedState: string;
    improvement: string;
  }>;
  actionPlan: {
    roiProjection: string;
    readinessLevel: string;
    ctaText: string;
    urgency: string;
  };
}