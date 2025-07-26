import { QuizResponseData, UserInfo } from '@/types/quiz';
import { Stage1Analysis, Stage2MarketIntelligence, Stage3FinancialAnalysis } from '@/types/ai-analysis';

export function generateStage4SystemPrompt(): string {
  return `You are a senior strategy consultant specializing in AI implementation roadmaps and change management. Your expertise includes prioritization frameworks, implementation planning, success metrics definition, and organizational transformation strategies.

CRITICAL REQUIREMENTS:
- Provide actionable, phased implementation recommendations
- Prioritize based on ROI, risk, and strategic impact
- Include specific success metrics and timelines
- Address organizational readiness and change management
- Ensure recommendations align with budget and capability constraints`;
}

export function generateStage4UserPrompt(
  responses: QuizResponseData,
  stage1Analysis: Stage1Analysis,
  stage2Market: Stage2MarketIntelligence,
  stage3Financial: Stage3FinancialAnalysis,
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

  return `Generate comprehensive strategic recommendations and implementation roadmap based on all previous analysis.

BUSINESS ANALYSIS:
${JSON.stringify(stage1Analysis, null, 2)}

MARKET INTELLIGENCE:
${JSON.stringify(stage2Market, null, 2)}

FINANCIAL ANALYSIS:
${JSON.stringify(stage3Financial, null, 2)}

ORIGINAL QUIZ DATA:
${JSON.stringify(quizJson, null, 2)}

STRATEGIC PLANNING REQUIREMENTS:

1. PRIORITY FRAMEWORK:
- Rank initiatives by ROI impact, implementation ease, and strategic value
- Identify quick wins vs long-term strategic projects
- Consider budget constraints and resource availability
- Balance risk tolerance with value potential

2. IMPLEMENTATION ROADMAP:
- Create 2-3 phase implementation plan
- Define specific milestones and deliverables
- Sequence initiatives for maximum impact and learning
- Include dependency management and risk mitigation

3. SUCCESS METRICS:
- Define measurable KPIs for each initiative
- Set realistic targets based on industry benchmarks
- Include leading and lagging indicators
- Establish measurement timelines and review points

4. ORGANIZATIONAL READINESS:
- Address team capability gaps and training needs
- Define change management requirements
- Identify stakeholder engagement strategies
- Plan for cultural adaptation and adoption

PRIORITIZATION CRITERIA:
- Financial impact and payback period
- Implementation complexity and risk
- Strategic alignment with business objectives
- Resource requirements and capability fit
- Time to value and quick win potential

OUTPUT FORMAT - Return ONLY this JSON structure:
{
  "strategicRecommendations": {
    "executiveSummary": {
      "headline": "<compelling value proposition>",
      "keyFindings": [
        "<finding 1>",
        "<finding 2>", 
        "<finding 3>",
        "<finding 4>"
      ],
      "topRecommendations": [
        "<recommendation 1>",
        "<recommendation 2>",
        "<recommendation 3>"
      ],
      "businessCase": "<strategic rationale>",
      "urgencyRationale": "<why act now>"
    },
    "priorityRanking": [
      {
        "priority": 1,
        "initiative": "<initiative name>",
        "rationale": "<why this first>",
        "quickWin": <boolean>,
        "timeToValue": "<timeline>",
        "expectedROI": "<roi estimate>",
        "resourceRequirement": "<resource needs>",
        "riskLevel": "<low/medium/high>"
      }
    ],
    "implementationRoadmap": {
      "phase1": {
        "name": "<phase name>",
        "duration": "<timeframe>",
        "focus": "<strategic focus>",
        "initiatives": ["<initiative 1>", "<initiative 2>"],
        "expectedROI": "<roi target>",
        "successCriteria": ["<criteria 1>", "<criteria 2>"],
        "keyMilestones": [
          {
            "milestone": "<milestone name>",
            "timeline": "<completion date>",
            "deliverable": "<what gets delivered>"
          }
        ]
      },
      "phase2": {
        "name": "<phase name>",
        "duration": "<timeframe>",
        "focus": "<strategic focus>", 
        "initiatives": ["<initiative 1>", "<initiative 2>"],
        "expectedROI": "<roi target>",
        "successCriteria": ["<criteria 1>", "<criteria 2>"],
        "dependencies": ["<dependency 1>", "<dependency 2>"]
      }
    },
    "successMetrics": [
      {
        "category": "<metric category>",
        "metric": "<specific metric>",
        "baseline": "<current state>",
        "target": "<target value>",
        "timeframe": "<achievement timeline>",
        "measurement": "<how to measure>",
        "owner": "<who tracks this>"
      }
    ],
    "changeManagement": {
      "readinessLevel": "<high/medium/low>",
      "keyStakeholders": ["<stakeholder 1>", "<stakeholder 2>"],
      "trainingRequirements": [
        {
          "audience": "<who needs training>",
          "type": "<training type>",
          "duration": "<time required>",
          "timing": "<when to deliver>"
        }
      ],
      "adoptionStrategy": "<adoption approach>",
      "riskMitigation": ["<mitigation 1>", "<mitigation 2>"]
    },
    "nextSteps": {
      "immediate": [
        "<action 1>",
        "<action 2>",
        "<action 3>"
      ],
      "week1": [
        "<action 1>",
        "<action 2>"
      ],
      "month1": [
        "<action 1>",
        "<action 2>"
      ],
      "consultationValue": "<why book consultation>"
    },
    "confidence": {
      "recommendationStrength": "<high/medium/low>",
      "implementationFeasibility": "<high/medium/low>",
      "roiProjections": "<high/medium/low>",
      "overallAssessment": "<assessment summary>"
    }
  }
}

STRATEGIC PRINCIPLES:
- Start with highest ROI, lowest risk initiatives
- Build momentum through early wins
- Sequence learning and capability building
- Maintain focus on business value over technology features
- Ensure sustainable adoption and change management
- Balance ambition with realistic capability constraints

CRITICAL: You MUST only output valid JSON in your response. Do not include any explanatory text, markdown formatting, or any tokens before or after the JSON object. Output ONLY the JSON structure specified above. Any non-JSON content will result in processing failure.`;
}