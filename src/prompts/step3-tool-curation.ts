wimport { ProblemAnalysis, ToolResearch } from '@/types/ai-analysis-new';

export function generateStep3Prompt(problemAnalysis: ProblemAnalysis, toolResearch: ToolResearch): string {
  return `You are a senior AI implementation consultant. Based on the problem analysis and tool research, select the 3 most appropriate AI tools for this business and determine the optimal starting point.

BUSINESS CONTEXT:
${JSON.stringify(problemAnalysis.businessContext, null, 2)}

IDENTIFIED PROBLEMS WITH COSTS:
${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}

RESEARCHED TOOLS WITH COMPREHENSIVE DATA:
${JSON.stringify(toolResearch, null, 2)}

SELECTION CRITERIA:
1. Problem-solution fit (how well the tool addresses their specific issues)
2. Budget alignment (fits within their stated budget range)
3. ROI potential (strong business case with measurable returns)
4. Industry relevance (proven success in similar businesses)
5. Business impact (maximum value regardless of complexity)

CRITICAL INSTRUCTIONS:
1. Select exactly 3 tools that provide the best overall value
2. Preserve ALL case studies from the research (1-3 per tool)
3. Calculate which tool should be implemented FIRST based on:
   - Highest immediate impact on revenue/cost savings
   - Fastest time to value
   - Addresses most urgent business bottleneck
   - Best ROI regardless of complexity
4. Map each tool to the specific problems it solves
5. Calculate total annual opportunity from all problems

TOOL NAME HANDLING - EXTREMELY IMPORTANT:
- Store REAL tool names in: "internalToolName" and "internalVendor" (for database/team reference)
- Create GENERIC descriptions in: "verboseName" (for client-facing report)
  * Example: Instead of "TenantCloud", use "Comprehensive Property Management Platform with Document Automation"
  * Example: Instead of "LeadSimple", use "Property Management CRM and Process Automation Platform"
- For "toolName" and "vendor": Use generic labels like "Solution 1", "Leading Provider"
- NEVER expose actual product brands in client-facing fields

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
    ],
    "estimatedAnnualOpportunity": "$XXX,XXX (sum of all problem costs)"
  },
  "selectedTools": [
    {
      "priority": 1,
      "toolName": "Specific Tool Name (INTERNAL USE - store real name for database)",
      "vendor": "Company Name (INTERNAL USE - store real vendor)",
      "category": "AI Tool Category",
      "verboseName": "Generic descriptive name WITHOUT brand (CLIENT-FACING - e.g., 'Comprehensive Property Management Platform')",
      "internalToolName": "Real tool name for your reference (e.g., TenantCloud)",
      "internalVendor": "Real vendor name for your reference",
      "problemSolved": "Specific problem from original analysis",
      "directImpact": [
        "Which specific problem it addresses",
        "Secondary problem it helps with"
      ],
      "primaryBenefits": [
        "Benefit 1 from research",
        "Benefit 2 from research",
        "Benefit 3 from research"
      ],
      "solutionDescription": "Full paragraph from research explaining how tool works",
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
        "caseStudies": [
          {
            "company": "Company description from research",
            "industry": "Industry",
            "result": "What they achieved",
            "metric": "Specific metric improvement"
          }
        ]
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
  "whereToStart": {
    "recommendedTool": "Name of priority 1 tool",
    "rationale": "Why this tool should be implemented first",
    "immediateBottleneck": "The specific bottleneck it addresses",
    "expectedImpact": "Immediate impact description", 
    "timelineToInstallation": "X weeks",
    "expectedROI": "Based on similar clients, expect XXX% ROI in X months"
  },
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
- Focus on business value and ROI, not technical limitations
- Provide specific, actionable next steps
- Include concrete success metrics that can be measured
- PRESERVE ALL CASE STUDIES from the research (1-3 per tool, don't summarize)
- The whereToStart section MUST recommend the Priority 1 tool with clear justification
- Calculate estimatedAnnualOpportunity as the sum of all problem costs from the analysis
- Each tool must clearly map to which problems it solves (directImpact field)

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}