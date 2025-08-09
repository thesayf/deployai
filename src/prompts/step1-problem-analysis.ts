import { QuizResponseData } from '@/types/quiz';

export function generateStep1Prompt(responses: QuizResponseData, companyName?: string | null): string {
  // Handle missing or incomplete responses
  if (!responses || Object.keys(responses).length === 0) {
    throw new Error('Quiz responses are empty or missing');
  }

  const quizJson = {
    companyName: companyName || 'Your Organization',
    industry: responses.industry || 'not specified',
    customerCommunication: responses.customerCommunication || 'not specified',
    revenueOptimization: responses.revenueOptimization || 'not specified',
    dataDecisionMaking: responses.dataDecisionMaking || 'not specified',
    repetitiveTasks: responses.repetitiveTasks || [],
    qualityConsistency: responses.qualityConsistency || 'not specified',
    responseSpeed: responses.responseSpeed || 'not specified',
    businessObjectives: responses.businessObjectives || [],
    costImpact: responses.costImpact || 'not specified',
    currentSystems: responses.currentSystems || [],
    integrationChallenges: responses.integrationChallenges || 'not specified',
    teamCapability: responses.teamCapability || 'not specified',
    aiExperience: responses.aiExperience || 'not specified',
    companySize: responses.companySize || 'not specified',
    monthlyBudget: responses.monthlyBudget || 'not specified',
    timeline: responses.timeline || 'not specified',
    decisionAuthority: responses.decisionAuthority || 'not specified'
  };

  return `Deeply analyze this business assessment. Think carefully about their SPECIFIC situation, not generic problems.

THEIR ACTUAL RESPONSES:
${JSON.stringify(quizJson, null, 2)}

YOUR TASK:
Read their responses carefully. What are they ACTUALLY struggling with? Don't give me generic problems like "workflow automation" or "customer service." 

Based on what they told us:
- They said customer communication is: "${responses.customerCommunication}"
- They're losing money because: "${responses.revenueOptimization}"
- Their data problems are: "${responses.dataDecisionMaking}"
- They waste time on: ${JSON.stringify(responses.repetitiveTasks || [])}
- Quality issues: "${responses.qualityConsistency}"
- Response speed: "${responses.responseSpeed}"
- They use these systems: ${JSON.stringify(responses.currentSystems || [])}
- Integration challenges: "${responses.integrationChallenges}"

Now identify their 3 BIGGEST, MOST EXPENSIVE problems. Be SPECIFIC. If they're a dental clinic struggling with appointment reminders, say "Dental clinic staff spending 2 hours daily calling patients for appointment reminders" NOT "customer communication challenges."

OUTPUT FORMAT (return only valid JSON):
{
  "businessContext": {
    "companyName": "${companyName}",
    "industry": "${responses.industry}",
    "companySize": "${responses.companySize}", 
    "monthlyBudget": "${responses.monthlyBudget}",
    "urgency": "${responses.timeline}",
    "techCapability": "${responses.teamCapability}",
    "currentSystems": ${JSON.stringify(responses.currentSystems || [])},
    "integrationNeeds": "${responses.integrationChallenges}",
    "aiExperience": "${responses.aiExperience}",
    "businessObjectives": "Based on their responses, infer their main business goals",
    "decisionAuthority": "${responses.decisionAuthority}"
  },
  "topOpportunities": [
    {
      "problemArea": "The EXACT problem they described, using their words and context",
      "aiSolutionType": "SPECIFIC type of solution for this exact problem",
      "problemEvidence": "Direct quotes from their responses showing this problem",
      "searchKeywords": [
        "Very specific search terms that will find solutions for THEIR exact problem",
        "Include their industry, company size, and specific use case",
        "Name specific software they use that needs integration",
        "Search for '[their exact workflow] automation [their industry]'"
      ],
      "expectedOutcome": "Specific, measurable improvement for their business"
    }
  ]
}

Think about THIS business, not any business. What makes THEIR situation unique? What specific combination of industry + size + current tools + problems do they have?

CRITICAL: Return ONLY the JSON object. Start with { and end with }`;
}