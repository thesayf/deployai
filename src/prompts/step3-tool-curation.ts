import { ProblemAnalysis, ToolResearch } from '@/types/ai-analysis-new';

export function generateStep3Prompt(problemAnalysis: ProblemAnalysis, toolResearch: ToolResearch): string {
  return `You are a senior AI implementation consultant at DeployAI. Based on the problem analysis and tool research, design 3 comprehensive solutions that DeployAI will implement for this business.

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
1. Select exactly 3 solutions that provide the best overall value
2. Preserve ALL case studies from the research but present them as "our implementations"
3. Calculate which solution should be implemented FIRST based on:
   - Highest immediate impact on revenue/cost savings
   - Fastest time to value
   - Addresses most urgent business bottleneck
   - Best ROI regardless of complexity
4. Map each solution to the specific problems it solves
5. Calculate total annual opportunity from all problems

CRITICAL DATA SEPARATION:
You MUST create two completely separate objects:
1. "internalReference" - Contains real tool names for DeployAI team's database (NEVER shown to clients)
2. "clientSolution" - Contains ONLY DeployAI-branded solutions (this is what the client sees)

NEVER mention tool names, vendor names, or third-party products in the clientSolution.
Present everything as DeployAI's solutions and implementations.

OUTPUT FORMAT (return only valid JSON):
{
  "internalReference": {
    "tools": [
      {
        "priority": 1,
        "realToolName": "Actual tool name (e.g., TenantCloud)",
        "realVendor": "Actual vendor name",
        "internalNotes": "Implementation notes for DeployAI team",
        "apiRequirements": "Technical integration details",
        "planLevel": "Subscription tier needed"
      }
    ]
  },
  "clientSolution": {
    "executiveSummary": {
      "businessProfile": "Brief description of the business and their main challenges",
      "totalInvestmentRange": "$X,XXX - $X,XXX per month",
      "expectedROI": "X-X months payback period",
      "implementationTimeline": "X-X weeks total for all solutions",
      "keyOutcomes": [
        "Primary outcome we'll deliver",
        "Secondary outcome we'll deliver", 
        "Tertiary outcome we'll deliver"
      ],
      "estimatedAnnualOpportunity": "$XXX,XXX (sum of all problem costs)"
    },
    "implementedSolutions": [
      {
        "priority": 1,
        "solutionName": "Descriptive solution name (e.g., 'Automated Property Documentation System')",
        "solutionCategory": "Category of solution (e.g., 'Document & Invoice Automation')",
        "whatWeImplement": "Full description of what DeployAI will build/implement for them",
        "problemSolved": "Specific problem from original analysis",
        "howItSolvesYourProblem": [
          "Primary way this addresses their pain",
          "Secondary improvement it delivers"
        ],
        "capabilities": [
          "Capability 1 they'll receive",
          "Capability 2 they'll receive",
          "Capability 3 they'll receive"
        ],
        "investment": {
          "monthlyInvestment": "$XXX per month for this solution",
          "setupInvestment": "$XXX one-time setup (if any)",
          "totalFirstYear": "$X,XXX first year total"
        },
        "businessCase": {
          "currentProblemCost": "Monthly cost of current problem",
          "projectedSavings": "Monthly savings we'll deliver", 
          "paybackPeriod": "X months",
          "roiPercentage": "XXX% annual ROI",
          "provenResults": [
            {
              "context": "A similar company we worked with",
              "industry": "Industry",
              "outcome": "What we achieved for them",
              "metric": "Specific metric improvement"
            }
          ]
        },
        "ourImplementation": {
          "timeframe": "X weeks to full deployment",
          "approach": "How DeployAI handles the implementation",
          "integrationsWeHandle": ["Your QuickBooks", "Your CRM"],
          "training": "How we train your team",
          "ongoingSupport": "Our support model post-implementation"
        },
        "successMetrics": [
          {
            "metric": "Key performance indicator",
            "currentState": "Where you are now", 
            "targetState": "Where we'll get you",
            "howWeMeasure": "Our measurement approach"
          }
        ]
      }
    ],
    "ourRecommendation": {
      "firstPhase": "Name of priority 1 solution (from implementedSolutions)",
      "rationale": "Why we recommend starting here",
      "immediateBottleneck": "The urgent problem this addresses",
      "expectedImpact": "What you'll see immediately", 
      "timeToValue": "X weeks to first results",
      "expectedROI": "Based on similar implementations, expect XXX% ROI in X months"
    },
    "implementationRoadmap": {
      "phase1": {
        "timeline": "Week 1-2",
        "whatWeDeliver": "First solution deployment",
        "activities": ["What we do in this phase", "Integration work we handle"],
        "yourMilestone": "What you'll have working"
      },
      "phase2": {
        "timeline": "Week 3-4", 
        "whatWeDeliver": "Second solution deployment",
        "activities": ["What we do next", "Additional capabilities we add"],
        "dependencies": "What needs to be ready"
      },
      "phase3": {
        "timeline": "Week 5-6",
        "whatWeDeliver": "Final solution and optimization",
        "activities": ["Final implementations", "System optimization"],
        "dependencies": "Prerequisites from earlier phases"
      }
    },
    "totalInvestmentSummary": {
      "monthlyInvestment": "$X,XXX total monthly for all solutions",
      "implementationInvestment": "$X,XXX one-time implementation fee",
      "firstYearTotal": "$XX,XXX total first year investment",
      "projectedAnnualReturn": "$XX,XXX in savings and new revenue",
      "netROI": "XXX% return on investment",
      "breakeven": "X months to positive ROI"
    },
    "nextSteps": {
      "immediate": [
        "Schedule implementation planning call with DeployAI",
        "Gather access to your existing systems",
        "Identify key team members for training"
      ],
      "week1": [
        "Begin Phase 1 implementation",
        "Configure initial integrations",
        "Start team onboarding"
      ],
      "month1": [
        "Complete all solution deployments",
        "Optimize based on initial usage",
        "Measure and report on results"
      ]
    }
  }
}

QUALITY REQUIREMENTS:
- Ensure all investment figures are realistic and sourced from research
- Verify ROI projections are conservative and achievable
- Confirm solutions actually work with their stated current systems
- Focus on business value and outcomes DeployAI will deliver
- Position DeployAI as the solution provider, not a tool broker
- Transform case studies into "our similar implementations"
- NEVER mention actual tool/vendor names in clientSolution
- The ourRecommendation section MUST suggest the Priority 1 solution
- Calculate estimatedAnnualOpportunity as the sum of all problem costs
- Each solution must clearly map to which problems it solves

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}