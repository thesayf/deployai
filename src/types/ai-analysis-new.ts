// TypeScript interfaces for new 4-step AI process

// Step 1: Problem Analysis
export interface ProblemAnalysis {
  businessContext: {
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
}