import { QuizResponseData, UserInfo } from '@/types/quiz';
import { Stage1Analysis, Stage2MarketIntelligence } from '@/types/ai-analysis';

export function generateStage3SystemPrompt(): string {
  return `You are a senior financial analyst specializing in AI/automation business cases and ROI modeling. Your expertise includes cost-benefit analysis, risk assessment, and financial projections for technology implementations across various industries and company sizes.

CRITICAL REQUIREMENTS:
- Provide realistic, conservative financial projections
- Base calculations on actual business data provided
- Include comprehensive risk assessment
- Use industry-standard financial modeling practices
- Ensure all numbers are defensible and well-sourced`;
}

export function generateStage3UserPrompt(
  responses: QuizResponseData,
  stage1Analysis: Stage1Analysis,
  stage2Market: Stage2MarketIntelligence,
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

  return `Generate comprehensive financial analysis and ROI projections based on the business context and AI solution recommendations.

BUSINESS ANALYSIS:
${JSON.stringify(stage1Analysis, null, 2)}

MARKET INTELLIGENCE:
${JSON.stringify(stage2Market, null, 2)}

ORIGINAL QUIZ DATA:
${JSON.stringify(quizJson, null, 2)}

FINANCIAL MODELING REQUIREMENTS:

1. CURRENT STATE COST ANALYSIS:
- Calculate annual cost of manual processes based on stated percentages
- Estimate opportunity costs from inefficiencies (slow sales, errors, delays)
- Factor in company size for labor cost assumptions
- Include hidden costs (rework, customer dissatisfaction, missed opportunities)

2. SOLUTION INVESTMENT MODELING:
- Sum recommended tool costs (monthly/annual)
- Estimate implementation costs (setup, training, integration)
- Include ongoing maintenance and support costs
- Factor in potential additional resource requirements

3. BENEFIT PROJECTIONS:
- Calculate time savings based on automation percentages
- Project revenue increases from efficiency gains
- Estimate error reduction and quality improvements
- Model productivity increases and capacity expansion

4. RISK ASSESSMENT:
- Identify implementation risks and probability
- Calculate potential cost overruns and delays
- Assess adoption risks and mitigation costs
- Include conservative vs optimistic scenarios

CALCULATION GUIDELINES:
- Use $35-50/hour loaded labor costs based on company size and industry
- Apply conservative adoption rates (60-80% in year 1)
- Include 3-6 month ramp-up periods for benefits realization
- Factor in 10-20% implementation cost buffer
- Use industry-standard discount rates for NPV calculations

DEFENSIVE MODELING:
- If budget unclear, estimate based on company size and problem severity
- If manual work percentage missing, estimate from problem descriptions
- Use conservative assumptions when data is incomplete
- Provide confidence ranges for all major projections

OUTPUT FORMAT - Return ONLY this JSON structure:
{
  "financialAnalysis": {
    "currentStateCosts": {
      "manualLaborHours": <weekly hours>,
      "weeklyLaborCost": <dollar amount>,
      "annualInefficiencyCost": <dollar amount>,
      "opportunityCostRevenue": <dollar amount>,
      "totalCurrentStateCost": <dollar amount>,
      "costBreakdown": {
        "directLabor": <amount>,
        "opportunityCost": <amount>, 
        "errorCosts": <amount>,
        "customerImpact": <amount>
      }
    },
    "projectedSavings": {
      "year1": {
        "laborSavings": <dollar amount>,
        "efficiencyGains": <dollar amount>,
        "revenueIncrease": <dollar amount>,
        "errorReduction": <dollar amount>,
        "totalBenefit": <dollar amount>
      },
      "year2": {
        "laborSavings": <dollar amount>,
        "efficiencyGains": <dollar amount>, 
        "revenueIncrease": <dollar amount>,
        "totalBenefit": <dollar amount>
      },
      "investmentRequired": {
        "toolCosts": <annual amount>,
        "implementationCosts": <one-time amount>,
        "trainingCosts": <one-time amount>,
        "ongoingSupport": <annual amount>,
        "totalInvestment": <total amount>
      },
      "netROI": {
        "value": <percentage>,
        "unit": "percent",
        "paybackPeriod": "<timeframe>",
        "npv": <net present value>,
        "irr": <internal rate of return>
      }
    },
    "scenarioAnalysis": {
      "conservative": {
        "adoptionRate": "<percentage>",
        "benefitRealization": "<percentage>",
        "roi": <percentage>,
        "payback": "<timeframe>"
      },
      "realistic": {
        "adoptionRate": "<percentage>", 
        "benefitRealization": "<percentage>",
        "roi": <percentage>,
        "payback": "<timeframe>"
      },
      "optimistic": {
        "adoptionRate": "<percentage>",
        "benefitRealization": "<percentage>", 
        "roi": <percentage>,
        "payback": "<timeframe>"
      }
    },
    "risksAndMitigation": [
      {
        "risk": "<risk description>",
        "probability": "<low/medium/high>",
        "impact": "<financial impact>",
        "mitigation": "<mitigation strategy>",
        "cost": <mitigation cost>
      }
    ],
    "assumptions": {
      "laborRate": <hourly rate>,
      "adoptionCurve": "<assumption>",
      "implementationDuration": "<timeframe>",
      "benefitRealization": "<timeline>",
      "confidenceLevel": "<high/medium/low>"
    }
  }
}

VALIDATION REQUIREMENTS:
- All financial projections must be realistic and industry-appropriate
- ROI calculations must account for risk and implementation complexity
- Payback periods should align with typical AI implementation timelines
- Include confidence indicators for all major financial assumptions
- Ensure conservative bias in projections to maintain credibility

CRITICAL: You MUST only output valid JSON in your response. Do not include any explanatory text, markdown formatting, or any tokens before or after the JSON object. Output ONLY the JSON structure specified above. Any non-JSON content will result in processing failure.`;
}