// Final Report Generation Prompt
const finalReportPrompt = (problemAnalysis, finalToolsForClient) => `
You are a senior AI consultant creating a business impact report. Generate a concise report that shows this business what AI can achieve for them without revealing specific tool names.

BUSINESS CONTEXT:
${JSON.stringify(problemAnalysis.businessContext, null, 2)}

IDENTIFIED PROBLEMS:
${JSON.stringify(problemAnalysis.topOpportunities, null, 2)}

RESEARCHED TOOLS & DATA:
${JSON.stringify(finalToolsForClient.recommendedSolutions, null, 2)}

Create a report that builds excitement and positions us as the AI implementation experts they need.

OUTPUT FORMAT (return only valid JSON):
{
  "problemSummary": {
    "industryProfile": "1 sentence describing their business type and size (25 words max)",
    "topProblems": [
      "Problem 1 description based on their responses (15 words max)",
      "Problem 2 description based on their responses (15 words max)", 
      "Problem 3 description based on their responses (15 words max)"
    ],
    "monthlyOpportunity": "$X,XXX"
  },
  
  "solutions": [
    {
      "category": "AI solution category name - no tool brands (4 words max)",
      "outcome": "Expected specific result (12 words max)",
      "timeline": "X weeks to implement",
      "caseStudy": "Anonymized success story from similar business (30 words max)"
    },
    {
      "category": "Second AI solution category (4 words max)",
      "outcome": "Expected specific result (12 words max)",
      "timeline": "X weeks to implement", 
      "caseStudy": "Anonymized success story from similar business (30 words max)"
    },
    {
      "category": "Third AI solution category (4 words max)",
      "outcome": "Expected specific result (12 words max)",
      "timeline": "X weeks to implement",
      "caseStudy": "Anonymized success story from similar business (30 words max)"
    }
  ],

  "measurableImprovements": [
    {
      "metric": "Response Time", 
      "currentState": "24 hours",
      "projectedState": "2 minutes",
      "improvement": "95% faster"
    },
    {
      "metric": "Data Entry Hours",
      "currentState": "20 hours/week", 
      "projectedState": "2 hours/week",
      "improvement": "90% reduction"
    },
    {
      "metric": "Lead Conversion Rate",
      "currentState": "15%",
      "projectedState": "25%", 
      "improvement": "67% increase"
    }
  ],
  
  "actionPlan": {
    "roiProjection": "XXX% in X months",
    "readinessLevel": "High/Medium/Foundation + brief 10-word explanation",
    "ctaText": "Book consultation for specific tool recommendations (15 words max)",
    "urgency": "Industry/timing-specific urgency reason (12 words max)"
  }
}

CONTENT REQUIREMENTS:
- Use generic AI solution categories, never mention specific tool names (Zapier, Intercom, etc.)
- Base problem descriptions on their actual quiz responses 
- Pull measurable improvements from the researched tool data and case studies
- Make case studies anonymous but specific ("Law firm with 15 employees...")  
- Calculate monthly opportunity from their stated cost impact and manual work percentage
- Ensure all content limits are strictly followed
- Focus on building confidence and demonstrating our expertise

EXAMPLES OF GOOD SOLUTION CATEGORIES:
- "Intelligent Client Response System" (not "chatbot")
- "Workflow Automation Platform" (not "Zapier alternative")  
- "Sales Intelligence Dashboard" (not "CRM analytics")
- "Document Processing Engine" (not "AI document reader")
- "Quality Control Assistant" (not "inspection software")
`;

export default toolCurationPrompt;