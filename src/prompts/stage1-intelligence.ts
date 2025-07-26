import { QuizResponseData, ScoreCalculation, UserInfo } from '@/types/quiz';

export function generateStage1SystemPrompt(): string {
  return `You are a senior AI strategy consultant specializing in business analysis and AI opportunity assessment. Your task is to analyze quiz response data and generate comprehensive business intelligence for AI implementation recommendations.

CRITICAL REQUIREMENTS:
- Generate ONLY valid JSON output
- All scores must be 0-100 integers
- Handle missing or incomplete data gracefully
- Provide confidence indicators for all assessments
- Use industry-standard terminology
- Be specific and actionable in recommendations`;
}

export function generateStage1UserPrompt(
  responses: QuizResponseData,
  scoreResult: ScoreCalculation,
  userInfo?: UserInfo
): string {
  // Convert responses to a clean JSON format for the prompt
  const quizJson = {
    userInfo: {
      company: userInfo?.company || 'Not specified',
      industry: responses.industry,
      companySize: responses.companySize,
    },
    responses: {
      businessObjectives: responses.businessObjectives,
      biggestChallenge: responses.biggestChallenge,
      problemAreas: responses.problemAreas,
      costImpact: responses.costImpact,
      manualWork: responses.manualWork,
      decisionMaking: responses.decisionMaking,
      currentSystems: responses.currentSystems,
      integrationChallenges: responses.integrationChallenges,
      aiFocus: responses.aiFocus,
      aiExperience: responses.aiExperience,
      teamSkills: responses.teamSkills,
      budget: responses.budget,
      timeline: responses.timeline,
      successMetrics: responses.successMetrics,
      leadership: responses.leadership,
    },
    scoreInfo: {
      totalScore: scoreResult.totalScore,
      maxScore: 85,
      category: scoreResult.category,
    }
  };

  return `Analyze the following business quiz response data and generate a comprehensive intelligence analysis. Focus on AI implementation opportunities, business readiness, and strategic context.

QUIZ DATA:
${JSON.stringify(quizJson, null, 2)}

ANALYSIS REQUIREMENTS:

1. SCORING METHODOLOGY:
- aiOpportunityScore (0-100): Based on pain points, manual work percentage, industry AI suitability
- roiPotentialScore (0-100): Based on cost impact, efficiency gains potential, revenue opportunity  
- implementationRisk (Low/Medium/High): Based on team skills, system complexity, budget constraints
- marketOpportunityScore (0-100): Based on industry trends, competitive pressure, market maturity
- urgencyFactor (Low/Medium/High): Based on timeline, cost impact, competitive threats

2. INDUSTRY ANALYSIS:
- Identify specific industry and sub-category
- Assess AI maturity level in this industry
- Determine competitive positioning and threats
- Evaluate market opportunity size

3. PROBLEM PRIORITIZATION:
- Rank pain points by severity, cost, and AI suitability
- Identify root causes and business impact
- Assess time-to-value potential for each problem
- Map problems to AI solution categories

4. READINESS ASSESSMENT:
- Evaluate data maturity and system integration complexity
- Assess team capability and training requirements
- Analyze budget alignment and leadership support
- Identify implementation barriers and enablers

DEFENSIVE HANDLING:
- If industry is unclear, infer from business description and problem areas
- If budget is "not sure", estimate based on company size and problem severity
- If team skills are unclear, assume moderate and flag for validation
- Provide confidence levels (high/medium/low) for all major assessments

OUTPUT FORMAT - Return ONLY this JSON structure:
{
  "analysis": {
    "scores": {
      "aiOpportunityScore": <integer 0-100>,
      "roiPotentialScore": <integer 0-100>, 
      "implementationRisk": "<Low/Medium/High>",
      "marketOpportunityScore": <integer 0-100>,
      "urgencyFactor": "<Low/Medium/High>"
    },
    "businessContext": {
      "industry": "<specific industry description>",
      "industryCategory": "<categorization for research>",
      "companyProfile": "<brief profile summary>",
      "maturityLevel": "<digital maturity assessment>",
      "competitivePosition": "<competitive analysis>"
    },
    "problemAnalysis": {
      "primaryPainPoints": [
        {
          "problem": "<problem identifier>",
          "severity": "<critical/high/medium/low>", 
          "cost": "<high/medium/low>",
          "aiSuitability": "<excellent/good/fair/poor>"
        }
      ],
      "rootCause": "<underlying issue>",
      "businessImpact": "<impact assessment>", 
      "timeToValue": "<implementation timeline>"
    },
    "readinessAssessment": {
      "dataMaturity": "<high/medium/low>",
      "teamCapability": "<high/medium/low>",
      "systemIntegration": "<simple/complex/very-complex>", 
      "budgetAlignment": "<excellent/good/poor>",
      "leadershipBuyIn": "<strong/moderate/weak>"
    },
    "confidence": {
      "overall": "<high/medium/low>",
      "dataQuality": "<complete/partial/limited>",
      "industryKnowledge": "<high/medium/low>",
      "recommendations": "<high/medium/low>"
    }
  }
}

VALIDATION:
- Ensure all scores are realistic and defensible
- Cross-reference problem areas with stated business objectives
- Validate budget alignment with proposed solutions
- Confirm industry categorization accuracy

CRITICAL: You MUST only output valid JSON in your response. Do not include any explanatory text, markdown formatting, or any tokens before or after the JSON object. Output ONLY the JSON structure specified above. Any non-JSON content will result in processing failure.`;
}