// Step 1: Problem Identification Prompt
const problemIdentificationPrompt = `
You are an AI business consultant. Analyze this assessment and identify the top 3 AI opportunity areas for tool research.

ASSESSMENT DATA:
${JSON.stringify(quizResponses, null, 2)}

ANALYSIS INSTRUCTIONS:
1. Identify the 3 biggest problems/opportunities based on their responses
2. For each, determine the specific AI solution category needed  
3. Extract key business context for tool research

OUTPUT FORMAT (return only valid JSON):
{
  "businessContext": {
    "industry": "specific industry from responses",
    "companySize": "employee count range", 
    "monthlyBudget": "budget range from responses",
    "urgency": "timeline from responses",
    "techCapability": "team skill level"
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
`;