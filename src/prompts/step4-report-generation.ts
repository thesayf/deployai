import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';

export function generateStep4Prompt(problemAnalysis: ProblemAnalysis, curatedTools: CuratedTools): string {
  const companyName = problemAnalysis.businessContext.companyName || 'Your organization';
  
  return `You are creating a persuasive AI readiness report. Your job is to transform raw data into a compelling narrative that feels personalized to ${companyName} in the ${problemAnalysis.businessContext.industry} industry.

IMPORTANT: You MUST include ALL tools from curatedTools.selectedTools in the report. If there are 3 tools in selectedTools, the report MUST have 3 solutions. Each tool solves a specific problem - include them all.

CRITICAL CONTEXT FOR NARRATIVE VOICE:
- Company: ${companyName}
- They are a ${problemAnalysis.businessContext.companySize} ${problemAnalysis.businessContext.industry} company
- Their budget is ${problemAnalysis.businessContext.monthlyBudget}
- Their timeline urgency is ${problemAnalysis.businessContext.urgency}
- They currently use: ${problemAnalysis.businessContext.currentSystems}
- Their main objectives: ${problemAnalysis.businessContext.businessObjectives}

RAW DATA TO TRANSFORM:
Problems Identified: ${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}
Solutions & Case Studies: ${JSON.stringify(curatedTools, null, 2)}

YOUR TRANSFORMATION TASK:
1. Extract all numerical data, metrics, and case studies from curatedTools
2. Rewrite everything in language appropriate for their industry
3. Make problems feel urgent using their actual pain points
4. Position solutions as transformative (but stay truthful to data)
5. Use ALL case studies but make them relatable to their business size/type
6. Create a narrative arc: current pain → possible future → clear next step
7. MANDATORY: Include ALL tools from curatedTools.selectedTools - if there are 3 tools, create 3 solution entries
8. MANDATORY: Include projectedOutcomes for ALL tools - one outcome per tool

OUTPUT FORMAT (return only valid JSON):
{
  "executiveSummary": {
    "readinessLevel": "Assess as High/Medium/Low based on: Do they have modern systems? AI experience? Clear objectives? Budget allocated?",
    "estimatedAnnualOpportunity": "Take curatedTools.executiveSummary.estimatedAnnualOpportunity exactly",
    "immediateROI": "Take curatedTools.totalInvestmentSummary.netROI exactly"
  },
  
  "keyProblems": [
    {
      "problem": "Transform problemAnalysis.topOpportunities[0] into urgent headline for ${companyName}. Example: If problem is 'slow customer response', write 'At ${companyName}, customers are waiting 24+ hours while competitors respond instantly'",
      "currentCost": "Extract numbers from problemEvidence. Make it hurt. '$5,000/month in lost sales' or '15 hours/week of manual work at ${companyName}'",
      "potentialGain": "Use actual metrics from curatedTools.selectedTools that solve this. '90% faster response times' or '$60,000 annual savings for ${companyName}'"
    },
    {
      "problem": "Make problem 2 feel like ${companyName} is falling behind competitors",
      "currentCost": "Quantify the pain specifically for ${companyName}'s industry size and type",
      "potentialGain": "Pull real improvement numbers from the matching solution in curatedTools"
    },
    {
      "problem": "Frame problem 3 as missed opportunity or growing risk for ${companyName}",
      "currentCost": "Use industry-appropriate metrics (revenue loss, compliance risk, efficiency gap) that ${companyName} faces",
      "potentialGain": "Use case study improvements from curatedTools to show what's possible for ${companyName}"
    }
  ],
  
  "recommendedSolutions": [
    // CREATE ONE ENTRY FOR EACH TOOL IN curatedTools.selectedTools
    // Example for tool 0:
    {
      "solutionName": "Use curatedTools.selectedTools[0].verboseName exactly - this is already generic",
      "directImpact": [
        "List which problems from above this solves - use curatedTools.selectedTools[0].directImpact"
      ],
      "primaryBenefits": [
        "Copy curatedTools.selectedTools[0].primaryBenefits[0] exactly",
        "Copy curatedTools.selectedTools[0].primaryBenefits[1] exactly",
        "Copy curatedTools.selectedTools[0].primaryBenefits[2] exactly"
      ],
      "description": "Use curatedTools.selectedTools[0].solutionDescription but add context about how it fits their current systems",
      "realWorldProof": [
        {
          "caseStudy": "Rewrite curatedTools.selectedTools[0].businessCase.caseStudies[0] to be relatable. If they're a 50-person company, make the case study about a similar size",
          "metric": "Use exact metric from caseStudies[0].metric"
        },
        {
          "caseStudy": "Transform second case study if available - make industry relevant",
          "metric": "Exact metric from caseStudies[1].metric"
        }
      ],
      "implementationTime": "Use curatedTools.selectedTools[0].implementation.estimatedSetupTime"
    },
    // Example for tool 1:
    {
      "solutionName": "Use curatedTools.selectedTools[1].verboseName exactly",
      "directImpact": ["From curatedTools.selectedTools[1].directImpact"],
      "primaryBenefits": ["Copy all 3 benefits from curatedTools.selectedTools[1].primaryBenefits"],
      "description": "Use curatedTools.selectedTools[1].solutionDescription with context",
      "realWorldProof": [
        {
          "caseStudy": "From curatedTools.selectedTools[1].businessCase.caseStudies[0]",
          "metric": "Exact metric"
        }
      ],
      "implementationTime": "From curatedTools.selectedTools[1].implementation.estimatedSetupTime"
    },
    // Example for tool 2:
    {
      "solutionName": "Use curatedTools.selectedTools[2].verboseName exactly",
      "directImpact": ["From curatedTools.selectedTools[2].directImpact"],
      "primaryBenefits": ["Copy all 3 benefits from curatedTools.selectedTools[2].primaryBenefits"],
      "description": "Use curatedTools.selectedTools[2].solutionDescription with context",
      "realWorldProof": [
        {
          "caseStudy": "From curatedTools.selectedTools[2].businessCase.caseStudies[0]",
          "metric": "Exact metric"
        }
      ],
      "implementationTime": "From curatedTools.selectedTools[2].implementation.estimatedSetupTime"
    }
  ],
  
  "projectedOutcomes": [
    // CREATE ONE ENTRY FOR EACH TOOL'S PRIMARY SUCCESS METRIC
    {
      "tool": "Use curatedTools.selectedTools[0].verboseName",
      "metric": "Pull from curatedTools.selectedTools[0].successMetrics[0].metric",
      "current": "Use curatedTools.selectedTools[0].successMetrics[0].currentState",
      "projected": "Use curatedTools.selectedTools[0].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    },
    {
      "tool": "Use curatedTools.selectedTools[1].verboseName",
      "metric": "Pull from curatedTools.selectedTools[1].successMetrics[0].metric",
      "current": "Use curatedTools.selectedTools[1].successMetrics[0].currentState",
      "projected": "Use curatedTools.selectedTools[1].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    },
    {
      "tool": "Use curatedTools.selectedTools[2].verboseName",
      "metric": "Pull from curatedTools.selectedTools[2].successMetrics[0].metric",
      "current": "Use curatedTools.selectedTools[2].successMetrics[0].currentState",
      "projected": "Use curatedTools.selectedTools[2].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    }
  ],
  
  "whereToStart": {
    "recommendation": "Use curatedTools.whereToStart.recommendedTool but phrase conversationally",
    "targetBottleneck": "Use curatedTools.whereToStart.immediateBottleneck",
    "immediateImpact": "Use curatedTools.whereToStart.expectedImpact",
    "timelineEstimate": "Use curatedTools.whereToStart.timelineToInstallation",
    "expectedROI": "Use curatedTools.whereToStart.expectedROI",
    "implementationNote": "Our senior engineers handle all technical complexity"
  },
  
  "callToAction": {
    "primaryCTA": "Schedule Your Free Consultation",
    "secondaryCTA": "Retake the Assessment",
    "urgencyMessage": "Create urgency based on their timeline (${problemAnalysis.businessContext.urgency}) and industry trends"
  }
}

CONTEXTUAL TRANSFORMATION RULES:

1. PROBLEM FRAMING:
   - Transform generic problems into industry-specific pain points
   - If they're in healthcare: frame in terms of patient outcomes, compliance, efficiency
   - If they're in retail: frame as customer experience, inventory, sales optimization
   - If they're in manufacturing: frame as quality, downtime, supply chain
   - Always quantify pain using their actual numbers from problemEvidence

2. SOLUTION POSITIONING:
   - NEVER mention tool brands (Zapier, Intercom, TenantCloud, etc.)
   - NEVER use "internalToolName" or "internalVendor" fields - those are for internal use only
   - Use ONLY "verboseName" from curatedTools (already generic and client-safe)
   - Do NOT reference "toolName" if it contains a real product name
   - Add context: "This integrates seamlessly with your [current systems they mentioned]"
   - Frame benefits in their business terms, not generic tech terms

3. CASE STUDY ADAPTATION:
   - Keep ALL case studies from curatedTools (don't skip any)
   - Transform company descriptions to match their profile:
     * If case study is "500 employee company" but they have 50, rewrite as "growing company in your industry"
     * If case study is different industry, emphasize the similar challenge not the industry
   - Keep exact metrics (75% improvement, $200K saved) but contextualize

4. URGENCY CREATION:
   - Use their stated timeline urgency
   - Reference their business objectives
   - If they said "ASAP" emphasize competitive pressure
   - If they said "This quarter" emphasize Q4 planning
   - Connect to industry trends they'd recognize

5. DATA EXTRACTION RULES:
   - estimatedAnnualOpportunity: Pull EXACTLY from curatedTools.executiveSummary
   - ROI numbers: Pull EXACTLY from curatedTools.totalInvestmentSummary
   - Success metrics: Pull EXACTLY from curatedTools.selectedTools[x].successMetrics
   - Case study metrics: Keep EXACT numbers, just reframe the context
   - whereToStart: Use EXACT recommendation from curatedTools.whereToStart

Remember: You're translating technical data into THEIR business language while keeping all numbers accurate.

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}