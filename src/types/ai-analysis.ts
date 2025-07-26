// TypeScript interfaces for 4-stage AI analysis pipeline

// Stage 1: Intelligence Analysis
export interface Stage1Analysis {
  analysis: {
    scores: {
      aiOpportunityScore: number; // 0-100
      roiPotentialScore: number; // 0-100
      implementationRisk: 'Low' | 'Medium' | 'High';
      marketOpportunityScore: number; // 0-100
      urgencyFactor: 'Low' | 'Medium' | 'High';
    };
    businessContext: {
      industry: string;
      industryCategory: string;
      companyProfile: string;
      maturityLevel: string;
      competitivePosition: string;
    };
    problemAnalysis: {
      primaryPainPoints: Array<{
        problem: string;
        severity: 'critical' | 'high' | 'medium' | 'low';
        cost: 'high' | 'medium' | 'low';
        aiSuitability: 'excellent' | 'good' | 'fair' | 'poor';
      }>;
      rootCause: string;
      businessImpact: string;
      timeToValue: string;
    };
    readinessAssessment: {
      dataMaturity: 'high' | 'medium' | 'low';
      teamCapability: 'high' | 'medium' | 'low';
      systemIntegration: 'simple' | 'complex' | 'very-complex';
      budgetAlignment: 'excellent' | 'good' | 'poor';
      leadershipBuyIn: 'strong' | 'moderate' | 'weak';
    };
    confidence: {
      overall: 'high' | 'medium' | 'low';
      dataQuality: 'complete' | 'partial' | 'limited';
      industryKnowledge: 'high' | 'medium' | 'low';
      recommendations: 'high' | 'medium' | 'low';
    };
  };
}

// Stage 2: Market Intelligence
export interface Stage2MarketIntelligence {
  marketIntelligence: {
    recommendedSolutions: Array<{
      category: string;
      tools: Array<{
        name: string;
        vendor: string;
        description: string;
        industryFit: string;
        solvesPainPoints: string[];
        pricing: {
          model: string;
          cost: number;
          currency: string;
          perUser: boolean;
          additionalCosts: string;
        };
        roi: {
          metric: string;
          value: number;
          unit: string;
          timeframe: string;
          source: string;
          industryValidated: boolean;
          conservativeEstimate: boolean;
        };
        implementation: {
          complexity: 'low' | 'medium' | 'high';
          timeToValue: string;
          integrationRequired: string[];
          trainingRequired: 'minimal' | 'moderate' | 'extensive';
          supportLevel: string;
        };
        confidence: 'high' | 'medium' | 'low';
      }>;
    }>;
    industryBenchmarks: {
      averageAIAdoption: string;
      leaderAISpending: string;
      commonUseCase: string;
      roiTimeline: string;
      successRate: string;
      dataSource: string;
    };
    competitiveIntelligence: {
      trendsAnalysis: string;
      marketGaps: string[];
      opportunityAreas: string[];
      threatLevel: string;
      urgencyFactors: string[];
    };
    researchMetadata: {
      sourcesConsulted: number;
      dataFreshness: string;
      confidenceLevel: string;
      limitationsNoted: string[];
    };
  };
}

// Stage 3: Financial Analysis
export interface Stage3FinancialAnalysis {
  financialAnalysis: {
    currentStateCosts: {
      manualLaborHours: number;
      weeklyLaborCost: number;
      annualInefficiencyCost: number;
      opportunityCostRevenue: number;
      totalCurrentStateCost: number;
      costBreakdown: {
        directLabor: number;
        opportunityCost: number;
        errorCosts: number;
        customerImpact: number;
      };
    };
    projectedSavings: {
      year1: {
        laborSavings: number;
        efficiencyGains: number;
        revenueIncrease: number;
        errorReduction: number;
        totalBenefit: number;
      };
      year2: {
        laborSavings: number;
        efficiencyGains: number;
        revenueIncrease: number;
        totalBenefit: number;
      };
      investmentRequired: {
        toolCosts: number;
        implementationCosts: number;
        trainingCosts: number;
        ongoingSupport: number;
        totalInvestment: number;
      };
      netROI: {
        value: number;
        unit: string;
        paybackPeriod: string;
        npv: number;
        irr: number;
      };
    };
    scenarioAnalysis: {
      conservative: {
        adoptionRate: string;
        benefitRealization: string;
        roi: number;
        payback: string;
      };
      realistic: {
        adoptionRate: string;
        benefitRealization: string;
        roi: number;
        payback: string;
      };
      optimistic: {
        adoptionRate: string;
        benefitRealization: string;
        roi: number;
        payback: string;
      };
    };
    risksAndMitigation: Array<{
      risk: string;
      probability: 'low' | 'medium' | 'high';
      impact: string;
      mitigation: string;
      cost: number;
    }>;
    assumptions: {
      laborRate: number;
      adoptionCurve: string;
      implementationDuration: string;
      benefitRealization: string;
      confidenceLevel: 'high' | 'medium' | 'low';
    };
  };
}

// Stage 4: Strategic Recommendations
export interface Stage4StrategicRecommendations {
  strategicRecommendations: {
    executiveSummary: {
      headline: string;
      keyFindings: string[];
      topRecommendations: string[];
      businessCase: string;
      urgencyRationale: string;
    };
    priorityRanking: Array<{
      priority: number;
      initiative: string;
      rationale: string;
      quickWin: boolean;
      timeToValue: string;
      expectedROI: string;
      resourceRequirement: string;
      riskLevel: 'low' | 'medium' | 'high';
    }>;
    implementationRoadmap: {
      phase1: {
        name: string;
        duration: string;
        focus: string;
        initiatives: string[];
        expectedROI: string;
        successCriteria: string[];
        keyMilestones: Array<{
          milestone: string;
          timeline: string;
          deliverable: string;
        }>;
      };
      phase2: {
        name: string;
        duration: string;
        focus: string;
        initiatives: string[];
        expectedROI: string;
        successCriteria: string[];
        dependencies: string[];
      };
    };
    successMetrics: Array<{
      category: string;
      metric: string;
      baseline: string;
      target: string;
      timeframe: string;
      measurement: string;
      owner: string;
    }>;
    changeManagement: {
      readinessLevel: 'high' | 'medium' | 'low';
      keyStakeholders: string[];
      trainingRequirements: Array<{
        audience: string;
        type: string;
        duration: string;
        timing: string;
      }>;
      adoptionStrategy: string;
      riskMitigation: string[];
    };
    nextSteps: {
      immediate: string[];
      week1: string[];
      month1: string[];
      consultationValue: string;
    };
    confidence: {
      recommendationStrength: 'high' | 'medium' | 'low';
      implementationFeasibility: 'high' | 'medium' | 'low';
      roiProjections: 'high' | 'medium' | 'low';
      overallAssessment: string;
    };
  };
}

// Complete AI Analysis combining all stages
export interface CompleteAIAnalysis {
  stage1: Stage1Analysis;
  stage2: Stage2MarketIntelligence;
  stage3: Stage3FinancialAnalysis;
  stage4: Stage4StrategicRecommendations;
}

// Error response type
export interface AIAnalysisError {
  stage: number;
  error: string;
  details?: any;
}