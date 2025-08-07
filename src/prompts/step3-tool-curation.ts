import { ProblemAnalysis, ToolResearch } from '@/types/ai-analysis-new';

export function generateStep3Prompt(problemAnalysis: ProblemAnalysis, toolResearch: ToolResearch): string {
  return `You are a senior AI implementation consultant. Based on the problem analysis and tool research, select the 3 most appropriate AI tools for this business and create a comprehensive implementation report.

BUSINESS CONTEXT:
${JSON.stringify(problemAnalysis.businessContext, null, 2)}

IDENTIFIED PROBLEMS:
${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}

RESEARCHED TOOLS:
${JSON.stringify(toolResearch.recommendedSolutions, null, 2)}

SELECTION CRITERIA:
1. Problem-solution fit (how well the tool addresses their specific issues)
2. Budget alignment (fits within their stated budget range)
3. Implementation complexity (matches their technical capability)
4. ROI potential (strong business case with measurable returns)
5. Industry relevance (proven success in similar businesses)

ANALYSIS INSTRUCTIONS:
1. Evaluate all researched tools against the selection criteria
2. Select the 3 highest-scoring tools (may be from different problem areas or multiple tools for the same problem)
3. Provide detailed justification for each selection
4. Include implementation roadmap and success metrics

OUTPUT FORMAT (return only valid JSON):
{
  "executiveSummary": {
    "businessProfile": "Brief description of the business and their main challenges",
    "totalInvestmentRange": "$X,XXX - $X,XXX per month",
    "expectedROI": "X-X months payback period",
    "implementationTimeline": "X-X weeks total setup time",
    "keyBenefits": [
      "Primary benefit 1",
      "Primary benefit 2", 
      "Primary benefit 3"
    ]
  },
  "selectedTools": [
    {
      "priority": 1,
      "toolName": "Specific Tool Name",
      "vendor": "Company Name",
      "category": "AI Tool Category",
      "problemSolved": "Specific problem from original analysis",
      "solutionDescription": "How this tool solves their problem",
      "pricing": {
        "model": "Monthly/Annual/Per-user/One-time",
        "cost": "$XXX per month/year",
        "setupFees": "$XXX (if any)",
        "totalFirstYearCost": "$X,XXX"
      },
      "businessCase": {
        "currentProblemCost": "Monthly cost of current problem",
        "projectedSavings": "Monthly savings expected", 
        "paybackPeriod": "X months",
        "roiPercentage": "XXX% annual ROI",
        "caseStudyEvidence": "Similar business achieved X% improvement"
      },
      "implementation": {
        "complexity": "Low/Medium/High",
        "estimatedSetupTime": "X weeks",
        "technicalRequirements": ["Requirement 1", "Requirement 2"],
        "integrationNeeded": ["System 1", "System 2"],
        "supportLevel": "Vendor support quality/availability",
        "trainingsRequired": "Team training needs"
      },
      "successMetrics": [
        {
          "metric": "Response time",
          "currentState": "24 hours", 
          "targetState": "2 minutes",
          "measurementMethod": "How to track this"
        }
      ],
      "risks": [
        {
          "risk": "Potential implementation risk",
          "mitigation": "How to address it",
          "probability": "Low/Medium/High"
        }
      ]
    }
  ],
  "implementationRoadmap": {
    "phase1": {
      "timeline": "Week 1-2",
      "focus": "Highest priority tool",
      "activities": ["Setup activity 1", "Setup activity 2"],
      "successCriteria": "How to know this phase succeeded"
    },
    "phase2": {
      "timeline": "Week 3-4", 
      "focus": "Second priority tool",
      "activities": ["Setup activity 1", "Setup activity 2"],
      "dependencies": "What needs to be completed first"
    },
    "phase3": {
      "timeline": "Week 5-6",
      "focus": "Third priority tool or optimization",
      "activities": ["Setup activity 1", "Setup activity 2"],
      "dependencies": "What needs to be completed first"
    }
  },
  "totalInvestmentSummary": {
    "monthlyRecurring": "$X,XXX total monthly cost",
    "oneTimeSetup": "$X,XXX total setup investment",
    "firstYearTotal": "$XX,XXX total first year investment",
    "projectedAnnualSavings": "$XX,XXX in cost savings/revenue gains",
    "netROI": "XXX% return on investment",
    "paybackTimeline": "X months to break even"
  },
  "nextSteps": {
    "immediate": [
      "Action to take this week",
      "Contact vendor for demo",
      "Gather required information"
    ],
    "week1": [
      "Action for first week",
      "Sign up for trial",
      "Begin team preparation"
    ],
    "month1": [
      "Action for first month",
      "Complete implementation",
      "Measure initial results"
    ]
  },
  "supportResources": {
    "vendorContacts": [
      {
        "tool": "Tool name",
        "contactInfo": "How to reach for demos/trials",
        "trialAvailable": "Yes/No - trial details"
      }
    ],
    "implementationPartners": [
      "Recommended implementation consultants if needed"
    ],
    "additionalResources": [
      "Helpful guides, documentation, communities"
    ]
  }
}

QUALITY REQUIREMENTS:
- Ensure all cost figures are realistic and sourced from research
- Verify ROI projections are conservative and achievable
- Confirm tools actually integrate with their stated current systems
- Match implementation complexity to their stated technical capability
- Provide specific, actionable next steps
- Include concrete success metrics that can be measured`;
}