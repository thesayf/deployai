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
    monthlyBudget: responses.monthlyBudget || responses.budget || 'not specified',
    timeline: responses.timeline || 'not specified',
    decisionAuthority: responses.decisionAuthority || responses.leadership || 'not specified'
  };

  return `You are an AI business consultant. Analyze this assessment and identify the top 3 AI opportunity areas for tool research.

ASSESSMENT DATA:
${JSON.stringify(quizJson, null, 2)}

ANALYSIS INSTRUCTIONS:
1. Identify the 3 biggest problems/opportunities based on their responses
2. For each, determine the specific AI solution category needed  
3. Extract key business context for tool research

OUTPUT FORMAT (return only valid JSON):
{
  "businessContext": {
    "companyName": "company name from assessment data",
    "industry": "specific industry from responses",
    "companySize": "employee count range", 
    "monthlyBudget": "budget range from responses",
    "urgency": "timeline from responses",
    "techCapability": "team skill level",
    "currentSystems": "list of current systems they use",
    "integrationNeeds": "any integration challenges mentioned",
    "aiExperience": "current AI experience level",
    "businessObjectives": "primary business goals",
    "decisionAuthority": "who makes decisions"
  },
  "topOpportunities": [
    {
      "problemArea": "Customer Service Bottleneck",
      "aiSolutionType": "customer-service-chatbots",
      "problemEvidence": "Takes next business day to respond, customers often wait too long",
      "searchKeywords": ["customer service AI", "business chatbots", "[industry] customer support automation"],
      "expectedOutcome": "Reduce response time from days to minutes"
    },
    {
      "problemArea": "Manual Data Entry",
      "aiSolutionType": "workflow-automation", 
      "problemEvidence": "Manual data entry between systems, scattered data",
      "searchKeywords": ["workflow automation tools", "data integration AI", "[industry] process automation"],
      "expectedOutcome": "Eliminate manual data transfer, integrate systems"
    },
    {
      "problemArea": "Revenue Tracking Gaps", 
      "aiSolutionType": "sales-analytics-ai",
      "problemEvidence": "Not sure where losing money, basic tracking only", 
      "searchKeywords": ["sales analytics AI", "revenue optimization tools", "[industry] business intelligence"],
      "expectedOutcome": "Identify revenue leaks, predict sales trends"
    }
  ]
}

Focus on extracting clear, specific problems that can be solved with existing AI tools. Replace [industry] placeholder with their actual industry.

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}