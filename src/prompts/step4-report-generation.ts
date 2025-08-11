import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';

export function generateStep4Prompt(problemAnalysis: ProblemAnalysis, clientSolution: any): string {
  const companyName = problemAnalysis.businessContext.companyName || 'Your organization';
  
  return `You are creating a persuasive AI readiness report. Your job is to transform raw data into a compelling narrative that feels personalized to ${companyName} in the ${problemAnalysis.businessContext.industry} industry.

IMPORTANT: You MUST include ALL solutions from clientSolution.implementedSolutions in the report. If there are 3 solutions, the report MUST have 3 solution entries. Each solution addresses specific problems - include them all.

CRITICAL CONTEXT FOR NARRATIVE VOICE:
- Company: ${companyName}
- They are a ${problemAnalysis.businessContext.companySize} ${problemAnalysis.businessContext.industry} company
- Their budget is ${problemAnalysis.businessContext.monthlyBudget}
- Their timeline urgency is ${problemAnalysis.businessContext.urgency}
- They currently use: ${problemAnalysis.businessContext.currentSystems}
- Their main objectives: ${problemAnalysis.businessContext.businessObjectives}

RAW DATA TO TRANSFORM:
Problems Identified: ${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}
Our Solutions: ${JSON.stringify(clientSolution, null, 2)}

YOUR TRANSFORMATION TASK:
1. Extract all numerical data, metrics, and proven results from clientSolution
2. Rewrite everything in language appropriate for their industry
3. Make problems feel urgent using their actual pain points
4. Position DeployAI's solutions as transformative (but stay truthful to data)
5. Use ALL proven results but make them relatable to their business size/type
6. Create a narrative arc: current pain → what we'll implement → clear next step
7. MANDATORY: Include ALL solutions from clientSolution.implementedSolutions
8. MANDATORY: Include projectedOutcomes for ALL solutions
9. Present everything as DeployAI's expertise and implementation, not third-party tools

OUTPUT FORMAT (return only valid JSON):
{
  "executiveSummary": {
    "readinessLevel": "Assess as High/Medium/Low based on: Do they have modern systems? AI experience? Clear objectives? Budget allocated?",
    "estimatedAnnualOpportunity": "Take clientSolution.executiveSummary.estimatedAnnualOpportunity exactly",
    "immediateROI": "Take clientSolution.totalInvestmentSummary.netROI exactly"
  },
  
  "keyProblems": [
    {
      "problem": "Transform problemAnalysis.topOpportunities[0] into urgent headline for ${companyName}. Example: If problem is 'slow customer response', write 'At ${companyName}, customers are waiting 24+ hours while competitors respond instantly'",
      "currentCost": "Extract numbers from problemEvidence. Make it hurt. '$5,000/month in lost sales' or '15 hours/week of manual work at ${companyName}'",
      "potentialGain": "Use actual metrics from clientSolution.implementedSolutions that solve this. '90% faster response times' or '$60,000 annual savings for ${companyName}'"
    },
    {
      "problem": "Make problem 2 feel like ${companyName} is falling behind competitors",
      "currentCost": "Quantify the pain specifically for ${companyName}'s industry size and type",
      "potentialGain": "Pull real improvement numbers from the matching solution in clientSolution"
    },
    {
      "problem": "Frame problem 3 as missed opportunity or growing risk for ${companyName}",
      "currentCost": "Use industry-appropriate metrics (revenue loss, compliance risk, efficiency gap) that ${companyName} faces",
      "potentialGain": "Use proven results from clientSolution to show what's possible for ${companyName}"
    }
  ],
  
  "recommendedSolutions": [
    // CREATE ONE ENTRY FOR EACH SOLUTION IN clientSolution.implementedSolutions
    // Example for solution 0:
    {
      "solutionName": "Use clientSolution.implementedSolutions[0].solutionName exactly",
      "directImpact": [
        "Use clientSolution.implementedSolutions[0].howItSolvesYourProblem"
      ],
      "primaryBenefits": [
        "Copy clientSolution.implementedSolutions[0].capabilities[0] exactly",
        "Copy clientSolution.implementedSolutions[0].capabilities[1] exactly",
        "Copy clientSolution.implementedSolutions[0].capabilities[2] exactly"
      ],
      "description": "Use clientSolution.implementedSolutions[0].whatWeImplement and emphasize DeployAI's role",
      "realWorldProof": [
        {
          "caseStudy": "Rewrite clientSolution.implementedSolutions[0].businessCase.provenResults[0] to be relatable",
          "metric": "Use exact metric from provenResults[0].metric"
        },
        {
          "caseStudy": "Transform second proven result if available",
          "metric": "Exact metric from provenResults[1].metric"
        }
      ],
      "implementationTime": "Use clientSolution.implementedSolutions[0].ourImplementation.timeframe"
    },
    // Example for solution 1:
    {
      "solutionName": "Use clientSolution.implementedSolutions[1].solutionName exactly",
      "directImpact": ["From clientSolution.implementedSolutions[1].howItSolvesYourProblem"],
      "primaryBenefits": ["Copy all 3 from clientSolution.implementedSolutions[1].capabilities"],
      "description": "Use clientSolution.implementedSolutions[1].whatWeImplement",
      "realWorldProof": [
        {
          "caseStudy": "From clientSolution.implementedSolutions[1].businessCase.provenResults[0]",
          "metric": "Exact metric"
        }
      ],
      "implementationTime": "From clientSolution.implementedSolutions[1].ourImplementation.timeframe"
    },
    // Example for solution 2:
    {
      "solutionName": "Use clientSolution.implementedSolutions[2].solutionName exactly",
      "directImpact": ["From clientSolution.implementedSolutions[2].howItSolvesYourProblem"],
      "primaryBenefits": ["Copy all 3 from clientSolution.implementedSolutions[2].capabilities"],
      "description": "Use clientSolution.implementedSolutions[2].whatWeImplement",
      "realWorldProof": [
        {
          "caseStudy": "From clientSolution.implementedSolutions[2].businessCase.provenResults[0]",
          "metric": "Exact metric"
        }
      ],
      "implementationTime": "From clientSolution.implementedSolutions[2].ourImplementation.timeframe"
    }
  ],
  
  "projectedOutcomes": [
    // CREATE ONE ENTRY FOR EACH SOLUTION'S PRIMARY SUCCESS METRIC
    {
      "solution": "Use clientSolution.implementedSolutions[0].solutionName",
      "metric": "Pull from clientSolution.implementedSolutions[0].successMetrics[0].metric",
      "current": "Use clientSolution.implementedSolutions[0].successMetrics[0].currentState",
      "projected": "Use clientSolution.implementedSolutions[0].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    },
    {
      "solution": "Use clientSolution.implementedSolutions[1].solutionName",
      "metric": "Pull from clientSolution.implementedSolutions[1].successMetrics[0].metric",
      "current": "Use clientSolution.implementedSolutions[1].successMetrics[0].currentState",
      "projected": "Use clientSolution.implementedSolutions[1].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    },
    {
      "solution": "Use clientSolution.implementedSolutions[2].solutionName",
      "metric": "Pull from clientSolution.implementedSolutions[2].successMetrics[0].metric",
      "current": "Use clientSolution.implementedSolutions[2].successMetrics[0].currentState",
      "projected": "Use clientSolution.implementedSolutions[2].successMetrics[0].targetState",
      "improvementPercentage": "Calculate from current vs projected"
    }
  ],
  
  "whereToStart": {
    "recommendation": "Use clientSolution.ourRecommendation.firstPhase but phrase conversationally",
    "targetBottleneck": "Use clientSolution.ourRecommendation.immediateBottleneck",
    "immediateImpact": "Use clientSolution.ourRecommendation.expectedImpact",
    "timelineEstimate": "Use clientSolution.ourRecommendation.timeToValue",
    "expectedROI": "Use clientSolution.ourRecommendation.expectedROI",
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
   - NEVER use any fields from "internalReference" - those are for internal use only
   - Use ONLY fields from "clientSolution" which are already client-safe
   - Present everything as DeployAI's expertise and implementation
   - Add context: "This integrates seamlessly with your [current systems they mentioned]"
   - Frame benefits in their business terms, not generic tech terms

3. CASE STUDY ADAPTATION:
   - Keep ALL case studies from clientSolution (don't skip any)
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
   - estimatedAnnualOpportunity: Pull EXACTLY from clientSolution.executiveSummary
   - ROI numbers: Pull EXACTLY from clientSolution.totalInvestmentSummary
   - Success metrics: Pull EXACTLY from clientSolution.implementedSolutions[x].successMetrics
   - Case study metrics: Keep EXACT numbers, just reframe the context
   - whereToStart: Use EXACT recommendation from clientSolution.ourRecommendation

Remember: You're translating technical data into THEIR business language while keeping all numbers accurate.

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}