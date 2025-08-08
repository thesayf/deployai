import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';

export function generateStep4Prompt(problemAnalysis: ProblemAnalysis, curatedTools: CuratedTools): string {
  return `You are creating a persuasive AI readiness report that follows a specific structure to build urgency and excitement. Transform the technical analysis into a compelling business case.

BUSINESS CONTEXT:
${JSON.stringify(problemAnalysis.businessContext, null, 2)}

IDENTIFIED PROBLEMS WITH EVIDENCE:
${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}

CURATED SOLUTIONS WITH FULL DATA:
${JSON.stringify(curatedTools, null, 2)}

REPORT STRUCTURE (per improve-report.md):
1. Executive Summary - High-level impact snapshot
2. Key Problems & Missed Opportunities - Quantified pain points
3. Recommended AI Solutions - Solutions with proof
4. Projected Business Outcomes - Table format
5. Where To Start - Clear first step
6. Call to Action - Drive next action

OUTPUT FORMAT (return only valid JSON):
{
  "executiveSummary": {
    "readinessLevel": "High/Medium/Low",
    "estimatedAnnualOpportunity": "$XXX,XXX (from curatedTools)",
    "immediateROI": "XXX% from recommended tools"
  },
  
  "keyProblems": [
    {
      "problem": "Clear headline describing the pain point",
      "currentCost": "$X,XXX monthly or X hours/week",
      "potentialGain": "Time saved or % revenue increase from AI solution"
    },
    {
      "problem": "Second problem headline",
      "currentCost": "Quantified cost or time impact",
      "potentialGain": "Expected improvement from AI"
    },
    {
      "problem": "Third problem headline",
      "currentCost": "Monetary, time, or risk cost",
      "potentialGain": "Specific gain from automation"
    }
  ],
  
  "recommendedSolutions": [
    {
      "solutionName": "Verbose solution name from curated tools (e.g., Advanced Workflow Automation Platform)",
      "directImpact": [
        "Which problem(s) it solves from keyProblems"
      ],
      "primaryBenefits": [
        "One-sentence promise from curatedTools",
        "Second key benefit",
        "Third key benefit"
      ],
      "description": "Paragraph from curatedTools explaining what this tool does and how it works",
      "realWorldProof": [
        {
          "caseStudy": "Company description and result from curatedTools",
          "metric": "Specific improvement metric"
        },
        {
          "caseStudy": "Second case study if available",
          "metric": "Quantified result"
        }
      ],
      "implementationTime": "X weeks"
    }
  ],
  
  "projectedOutcomes": [
    {
      "tool": "Solution name",
      "metric": "Metric name",
      "current": "Current state",
      "projected": "After implementation",
      "improvementPercentage": "XX%"
    }
  ],
  
  "whereToStart": {
    "recommendation": "We recommend starting with [Solution Name]",
    "targetBottleneck": "It addresses your most immediate bottleneck of [problem]",
    "immediateImpact": "Expected immediate impact description",
    "timelineEstimate": "X weeks to full implementation with our expert team",
    "expectedROI": "Based on similar clients, expect XXX% ROI description",
    "implementationNote": "Our team handles all technical complexity"
  },
  
  "callToAction": {
    "primaryCTA": "Schedule Your Free Consultation",
    "secondaryCTA": "Retake the Assessment",
    "urgencyMessage": "Timing-specific reason to act now"
  }
}

CONTENT REQUIREMENTS:
- Use generic AI solution categories, NEVER mention specific tool brands (Zapier, Intercom, HubSpot, etc.)
- Transform tool names into descriptive categories (e.g., "Intercom" → "Intelligent Customer Response System")
- Base all problem descriptions on actual quiz responses and problem analysis
- Include ALL case studies from curatedTools (1-3 per solution) - make anonymous but keep specifics
- Pull exact metrics and improvements from curatedTools success metrics
- whereToStart MUST reference the Priority 1 tool from curatedTools
- Calculate costs and gains from the problem analysis and tool research data
- Executive summary data comes directly from curatedTools.executiveSummary
- Projected outcomes should create a clear before/after table view

TRANSFORMATION RULES:
- Keep case study details but anonymize company names ("Mid-size SaaS with 200 employees" not "Acme Corp")
- Use the verboseName from curatedTools for solutionName
- Pull primaryBenefits directly from curatedTools
- Use full description paragraphs from curatedTools
- Map each solution to specific problems using directImpact data

EXAMPLES OF GOOD SOLUTION NAMES:
- "Intelligent Customer Response and Engagement Platform"
- "Advanced Workflow Automation and Integration System"
- "AI-Powered Sales Intelligence and Forecasting Platform"
- "Document Intelligence and Processing Engine"
- "Predictive Maintenance and Quality Control System"

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}