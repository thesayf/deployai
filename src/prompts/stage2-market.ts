import { QuizResponseData, UserInfo } from '@/types/quiz';
import { Stage1Analysis } from '@/types/ai-analysis';

export function generateStage2SystemPrompt(): string {
  return `You are a senior market research analyst specializing in AI/automation solutions for businesses. Your expertise includes vendor analysis, ROI benchmarking, competitive intelligence, and implementation best practices across all industries.

You have access to web search capabilities. Use them to find current, accurate information about AI tools, pricing, and case studies.

CRITICAL REQUIREMENTS:
- Use web search to find REAL tools with VERIFIED information
- Search for specific pricing data and ROI case studies
- Focus on industry-appropriate solutions
- Include implementation complexity and timeline assessments
- Generate comprehensive market intelligence for strategic decisions
- Cite sources when providing specific data points`;
}

export function generateStage2UserPrompt(
  responses: QuizResponseData,
  stage1Analysis: Stage1Analysis,
  userInfo?: UserInfo
): string {
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
    }
  };

  return `Research and analyze AI/automation solutions for the following business context. Find specific tools, pricing, ROI data, and implementation guidance.

BUSINESS ANALYSIS:
${JSON.stringify(stage1Analysis, null, 2)}

ORIGINAL QUIZ DATA:
${JSON.stringify(quizJson, null, 2)}

RESEARCH REQUIREMENTS:

1. SOLUTION RESEARCH:
- Find 3-5 specific AI tools per major problem category
- Prioritize industry-specific or highly relevant solutions
- Include vendor names, pricing models, and key features
- Research implementation complexity and timelines

2. ROI VALIDATION:
- Find case studies or benchmark data for similar companies
- Calculate potential savings based on their manual work percentage
- Research industry-standard improvement metrics
- Validate pricing and cost structures

3. COMPETITIVE ANALYSIS:
- Research what similar companies in their industry are using
- Identify market trends and adoption patterns
- Find industry benchmarks for AI spending and ROI
- Assess competitive threats and opportunities

4. IMPLEMENTATION INTELLIGENCE:
- Research integration requirements with their stated systems
- Assess training and change management requirements  
- Identify potential implementation risks and mitigations
- Research vendor support and success rates

SEARCH STRATEGY:
You MUST use web search to find current information. Search for:
- "[industry] AI tools for [specific problem]" (e.g., "${responses.industry} AI tools for ${responses.problemAreas.join(', ')}")
- "[problem area] automation ROI case studies" 
- "best AI solutions for [company size] [industry]" (e.g., "best AI solutions for ${responses.companySize} ${responses.industry}")
- "[specific tool] pricing implementation timeline"
- "[industry] digital transformation benchmarks"

Use multiple searches to gather comprehensive data. Start with broad searches, then refine based on initial results.

DEFENSIVE RESEARCH:
- If specific industry data unavailable, use closest comparable industry
- If exact tools not found, research category leaders and alternatives
- If ROI data limited, use conservative estimates with confidence indicators
- Always provide multiple options per problem category

OUTPUT FORMAT - Return ONLY this JSON structure:
{
  "marketIntelligence": {
    "recommendedSolutions": [
      {
        "category": "<problem category>",
        "tools": [
          {
            "name": "<tool name>",
            "vendor": "<company name>",
            "description": "<brief solution description>",
            "industryFit": "<industry relevance>",
            "solvesPainPoints": ["<pain point 1>", "<pain point 2>"],
            "pricing": {
              "model": "<pricing model>",
              "cost": <numeric value>,
              "currency": "USD",
              "perUser": <boolean>,
              "additionalCosts": "<setup/training costs>"
            },
            "roi": {
              "metric": "<roi metric>",
              "value": <numeric value>,
              "unit": "<unit of measurement>", 
              "timeframe": "<time period>",
              "source": "<data source>",
              "industryValidated": <boolean>,
              "conservativeEstimate": <boolean>
            },
            "implementation": {
              "complexity": "<low/medium/high>",
              "timeToValue": "<timeline>",
              "integrationRequired": ["<system 1>", "<system 2>"],
              "trainingRequired": "<minimal/moderate/extensive>",
              "supportLevel": "<vendor support quality>"
            },
            "confidence": "<high/medium/low>"
          }
        ]
      }
    ],
    "industryBenchmarks": {
      "averageAIAdoption": "<percentage>",
      "leaderAISpending": "<amount range>",
      "commonUseCase": "<primary use case>", 
      "roiTimeline": "<typical payback period>",
      "successRate": "<implementation success rate>",
      "dataSource": "<benchmark source>"
    },
    "competitiveIntelligence": {
      "trendsAnalysis": "<market trend summary>",
      "marketGaps": ["<gap 1>", "<gap 2>"],
      "opportunityAreas": ["<opportunity 1>", "<opportunity 2>"],
      "threatLevel": "<competitive threat assessment>",
      "urgencyFactors": ["<factor 1>", "<factor 2>"]
    },
    "researchMetadata": {
      "sourcesConsulted": <number>,
      "dataFreshness": "<how recent>",
      "confidenceLevel": "<overall confidence>",
      "limitationsNoted": ["<limitation 1>", "<limitation 2>"]
    }
  }
}

QUALITY REQUIREMENTS:
- Minimum 3 tools per major problem category
- All pricing must include source or confidence indicator
- ROI data must be realistic and defensible
- Implementation timelines must account for company size and complexity
- Include fallback options if primary recommendations unavailable

CRITICAL: You MUST only output valid JSON in your response. Do not include any explanatory text, markdown formatting, or any tokens before or after the JSON object. Output ONLY the JSON structure specified above. Any non-JSON content will result in processing failure.`;
}