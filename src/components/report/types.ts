// Report Data Types - Matches new structure from improve-report.md

export interface ReportData {
  executiveSummary: ExecutiveSummary;
  keyProblems: KeyProblem[];
  recommendedSolutions: RecommendedSolution[];
  projectedOutcomes: ProjectedOutcome[];
  whereToStart: WhereToStart;
  callToAction: CallToAction;
  
  // Legacy fields for backwards compatibility
  problemSummary?: ProblemSummary;
  solutions?: Solution[];
  measurableImprovements?: Improvement[];
  actionPlan?: ActionPlan;
}

// New interfaces for improved report structure
export interface ExecutiveSummary {
  readinessLevel: string; // "High" / "Medium" / "Low"
  estimatedAnnualOpportunity: string; // "$XXX,XXX"
  immediateROI: string; // "XXX%"
}

export interface KeyProblem {
  problem: string; // Clear headline describing the pain
  currentCost: string; // Monetary, time, or risk cost
  potentialGain: string; // Expected improvement from AI
}

export interface RecommendedSolution {
  solutionName: string; // Verbose descriptive name
  directImpact: string[]; // Which problems it solves
  primaryBenefits: string[]; // 3 key benefits
  description: string; // Full paragraph explaining the tool
  realWorldProof: CaseStudy[]; // 1-3 case studies
  implementationTime: string; // "X weeks"
}

export interface CaseStudy {
  caseStudy: string; // Company description and result
  metric: string; // Specific improvement metric
}

export interface ProjectedOutcome {
  tool: string; // Solution name
  metric: string; // What's being measured
  current: string; // Current state
  projected: string; // After implementation
  improvementPercentage: string; // "XX%"
}

export interface WhereToStart {
  recommendation: string; // Which solution to start with
  targetBottleneck: string; // The problem it addresses
  immediateImpact: string; // Expected quick wins
  timelineEstimate: string; // Implementation timeline
  expectedROI: string; // Based on similar clients
  implementationNote?: string; // "Our team handles complexity"
}

export interface CallToAction {
  primaryCTA: string; // "Schedule Your Free Consultation"
  secondaryCTA: string; // "Retake the Assessment"
  urgencyMessage: string; // Timing-specific reason
}

// Legacy interfaces (kept for backwards compatibility)
export interface ProblemSummary {
  industryProfile: string;
  topProblems: [string, string, string];
  monthlyOpportunity: string;
}

export interface Solution {
  category: string;
  outcome: string;
  timeline: string;
  caseStudy: string;
}

export interface Improvement {
  metric: string;
  currentState: string;
  projectedState: string;
  improvement: string;
}

export interface ActionPlan {
  roiProjection: string;
  readinessLevel: string;
  ctaText: string;
  urgency: string;
}

// Report Viewer Props
export interface ReportViewerProps {
  data: ReportData;
  variant?: 'executive' | 'impact' | 'playful' | 'minimal';
  companyName?: string;
  generatedDate?: Date;
  className?: string;
  onScheduleConsultation?: () => void;
}

// Component-specific props
export interface ProblemSummaryProps {
  data: ProblemSummary;
  variant?: 'executive' | 'impact' | 'playful' | 'minimal';
  className?: string;
}

export interface SolutionCardsProps {
  solutions: Solution[];
  variant?: 'executive' | 'impact' | 'playful' | 'minimal';
  className?: string;
}

export interface ImprovementMetricsProps {
  improvements: Improvement[];
  variant?: 'executive' | 'impact' | 'playful' | 'minimal';
  className?: string;
}

export interface ActionPlanProps {
  data: ActionPlan;
  variant?: 'executive' | 'impact' | 'playful' | 'minimal';
  onScheduleConsultation?: () => void;
  className?: string;
}

// Example data generators for different industries
export const generateEcommerceExample = (): ReportData => ({
  problemSummary: {
    industryProfile: "Mid-size e-commerce retailer with 50 employees processing 10,000 monthly orders across three warehouses nationwide",
    topProblems: [
      "Customer service team overwhelmed with repetitive order status inquiries",
      "Manual inventory tracking causing stockouts and overselling issues",
      "Order processing delays during peak sales periods impact satisfaction"
    ],
    monthlyOpportunity: "$45,000"
  },
  solutions: [
    {
      category: "Intelligent Customer Response System",
      outcome: "Automate 80% of support tickets with instant accurate responses",
      timeline: "3 weeks to implement",
      caseStudy: "Online retailer with 8,000 SKUs reduced support tickets by 75% while improving customer satisfaction scores by 40% within first month"
    },
    {
      category: "Inventory Optimization Platform",
      outcome: "Real-time stock tracking prevents overselling and optimizes reorder points",
      timeline: "4 weeks to implement",
      caseStudy: "Fashion retailer eliminated stockouts completely, increased inventory turnover by 30%, and reduced holding costs by $200,000 annually through automation"
    },
    {
      category: "Order Processing Engine",
      outcome: "Scale order processing capacity by 10x during peak periods",
      timeline: "2 weeks to implement",
      caseStudy: "E-commerce company processed Black Friday orders 95% faster, handling 50,000 orders in 24 hours with zero system downtime"
    }
  ],
  measurableImprovements: [
    {
      metric: "Response Time",
      currentState: "4 hours",
      projectedState: "30 seconds",
      improvement: "99% faster"
    },
    {
      metric: "Order Processing",
      currentState: "15 minutes/order",
      projectedState: "90 seconds/order",
      improvement: "90% reduction"
    },
    {
      metric: "Inventory Accuracy",
      currentState: "85%",
      projectedState: "99.5%",
      improvement: "17% increase"
    }
  ],
  actionPlan: {
    roiProjection: "280% in 6 months",
    readinessLevel: "High - Strong digital infrastructure and motivated team ready",
    ctaText: "Book consultation for custom e-commerce AI implementation roadmap",
    urgency: "Q4 approaching - implement before holiday rush"
  }
});

export const generateLawFirmExample = (): ReportData => ({
  problemSummary: {
    industryProfile: "Boutique law firm with 15 attorneys specializing in corporate litigation and contract law",
    topProblems: [
      "Document review consuming 60% of billable hours inefficiently",
      "Client intake process takes days instead of hours",
      "Research duplication across cases wastes valuable attorney time"
    ],
    monthlyOpportunity: "$125,000"
  },
  solutions: [
    {
      category: "Document Intelligence Suite",
      outcome: "Extract key clauses and risks from contracts in seconds",
      timeline: "5 weeks to implement",
      caseStudy: "Corporate law firm reviewed 10,000 page merger documents in 2 hours instead of 2 weeks, identifying all critical issues"
    },
    {
      category: "Client Intake Automation",
      outcome: "Complete client onboarding in under 30 minutes automatically",
      timeline: "3 weeks to implement",
      caseStudy: "Litigation firm reduced intake time by 90%, improved data accuracy, and increased new client conversions by 45%"
    },
    {
      category: "Legal Research Assistant",
      outcome: "Find relevant case law and precedents 10x faster",
      timeline: "4 weeks to implement",
      caseStudy: "Law firm saved 200 research hours monthly, improved case win rate by 25% with comprehensive precedent analysis"
    }
  ],
  measurableImprovements: [
    {
      metric: "Document Review",
      currentState: "40 hours/case",
      projectedState: "4 hours/case",
      improvement: "90% reduction"
    },
    {
      metric: "Client Intake",
      currentState: "3 days",
      projectedState: "30 minutes",
      improvement: "99% faster"
    },
    {
      metric: "Billable Efficiency",
      currentState: "60%",
      projectedState: "85%",
      improvement: "42% increase"
    }
  ],
  actionPlan: {
    roiProjection: "450% in 8 months",
    readinessLevel: "Medium - Need training but high potential impact",
    ctaText: "Schedule demo of legal AI tools tailored to your practice",
    urgency: "Competitors adopting AI - maintain competitive advantage now"
  }
});

export const generateHealthcareExample = (): ReportData => ({
  problemSummary: {
    industryProfile: "Multi-location medical clinic serving 5,000 patients monthly with focus on family medicine",
    topProblems: [
      "Appointment no-shows costing thousands in lost revenue daily",
      "Patient wait times exceeding 45 minutes during peak hours",
      "Insurance verification delays creating billing backlogs and denials"
    ],
    monthlyOpportunity: "$75,000"
  },
  solutions: [
    {
      category: "Appointment Intelligence System",
      outcome: "Reduce no-shows by 70% with smart reminders and rescheduling",
      timeline: "3 weeks to implement",
      caseStudy: "Family practice reduced no-shows from 25% to 7%, recovered $50,000 monthly revenue through automated patient engagement"
    },
    {
      category: "Patient Flow Optimizer",
      outcome: "Cut wait times in half through intelligent scheduling",
      timeline: "4 weeks to implement",
      caseStudy: "Clinic chain decreased average wait from 52 to 12 minutes, improved patient satisfaction scores by 60%"
    },
    {
      category: "Insurance Verification Engine",
      outcome: "Instant eligibility checks reduce denials by 85%",
      timeline: "2 weeks to implement",
      caseStudy: "Medical group eliminated 90% of verification delays, reduced claim denials from 15% to 2% within first month"
    }
  ],
  measurableImprovements: [
    {
      metric: "No-Show Rate",
      currentState: "25%",
      projectedState: "7%",
      improvement: "72% reduction"
    },
    {
      metric: "Wait Time",
      currentState: "45 minutes",
      projectedState: "12 minutes",
      improvement: "73% reduction"
    },
    {
      metric: "Claim Denials",
      currentState: "15%",
      projectedState: "2%",
      improvement: "87% reduction"
    }
  ],
  actionPlan: {
    roiProjection: "320% in 5 months",
    readinessLevel: "High - EHR integration ready and staff eager",
    ctaText: "Book consultation for healthcare-specific AI implementation plan",
    urgency: "New regulations require efficiency improvements this year"
  }
});

export const generateManufacturingExample = (): ReportData => ({
  problemSummary: {
    industryProfile: "Precision manufacturing company with 200 employees operating three production facilities",
    topProblems: [
      "Quality control inspections missing 15% of defects consistently",
      "Machine downtime unpredictable causing production delays costing thousands",
      "Supply chain disruptions discovered too late to mitigate"
    ],
    monthlyOpportunity: "$180,000"
  },
  solutions: [
    {
      category: "Quality Control Assistant",
      outcome: "Detect 99.9% of defects using computer vision inspection",
      timeline: "6 weeks to implement",
      caseStudy: "Auto parts manufacturer reduced defect escape rate from 12% to 0.1%, saving $2M annually in warranty claims"
    },
    {
      category: "Predictive Maintenance Platform",
      outcome: "Predict equipment failures 2 weeks before occurrence",
      timeline: "5 weeks to implement",
      caseStudy: "Factory reduced unplanned downtime by 75%, extended equipment life by 30%, saved $500K in emergency repairs"
    },
    {
      category: "Supply Chain Intelligence",
      outcome: "Get 48-hour advance warning of supply disruptions",
      timeline: "4 weeks to implement",
      caseStudy: "Manufacturer avoided 95% of production delays, reduced inventory costs by 20% through predictive supply management"
    }
  ],
  measurableImprovements: [
    {
      metric: "Defect Rate",
      currentState: "15%",
      projectedState: "0.1%",
      improvement: "99% reduction"
    },
    {
      metric: "Unplanned Downtime",
      currentState: "120 hours/month",
      projectedState: "30 hours/month",
      improvement: "75% reduction"
    },
    {
      metric: "Production Efficiency",
      currentState: "72%",
      projectedState: "94%",
      improvement: "31% increase"
    }
  ],
  actionPlan: {
    roiProjection: "520% in 9 months",
    readinessLevel: "Medium - IoT sensors needed but high ROI potential",
    ctaText: "Schedule factory assessment for AI implementation opportunities",
    urgency: "Industry 4.0 adoption critical for competitiveness"
  }
});