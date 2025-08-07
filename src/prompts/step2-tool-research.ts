import { ProblemAnalysis } from '@/types/ai-analysis-new';

export function generateStep2Prompt(analysis: ProblemAnalysis): string {
  return `Find AI tools for this business using web search:

BUSINESS CONTEXT:
Industry: ${analysis.businessContext.industry}
Company Size: ${analysis.businessContext.companySize}
Budget: ${analysis.businessContext.monthlyBudget}
Tech Capability: ${analysis.businessContext.techCapability}

SEARCH FOR TOOLS THAT SOLVE:
Problem 1: ${analysis.topOpportunities[0].problemArea}
Keywords: ${analysis.topOpportunities[0].searchKeywords.join(', ')}

Problem 2: ${analysis.topOpportunities[1].problemArea}  
Keywords: ${analysis.topOpportunities[1].searchKeywords.join(', ')}

Problem 3: ${analysis.topOpportunities[2].problemArea}
Keywords: ${analysis.topOpportunities[2].searchKeywords.join(', ')}

For each problem area, aim to find 3-5 tools that is applicable to the business and industry. Also pull pricing and results-focussed case studies where available as these are important for conversions; include verifiable company names where available. never make up software or data. if you cannot find a tool or value, return 'no available data'.

OUTPUT FORMAT (return only valid JSON):
{
  "recommendedSolutions": [
    {
      "problemArea": "Customer Service Bottleneck",
      "tools": [
        {
          "name": "Intercom",
          "category": "Customer Service AI", 
          "description": "AI-powered customer messaging platform",
          "pricing": "$39-99/month per seat",
          "bestFor": "Small to medium businesses",
          "keyFeatures": ["AI chatbots", "Live chat", "Help desk"],
          "integrations": ["Salesforce", "Slack", "Shopify"],
          "roiData": {
            "metric": "Response time reduction",
            "improvement": "75% faster responses",
            "source": "[htttp://some-url-to-the-case-study]"
          },
          "caseStudy": "Law firm reduced response time from 24 hours to 2 minutes",
          "implementationComplexity": "Low"
        }
      ]
    },
    {
      "problemArea": "Manual Data Entry",
      "tools": [
        {
          "name": "Zapier",
          "category": "Workflow Automation",
          "description": "Connect apps and automate workflows",
          "pricing": "$19.99-599/month based on tasks",
          "bestFor": "Businesses with multiple software tools",
          "keyFeatures": ["App integrations", "Workflow automation", "Data sync"],
          "integrations": ["5000+ apps"],
          "roiData": {
            "metric": "Time savings",
            "improvement": "10-15 hours per week saved",
            "source": "[htttp://some-url-to-the-case-study]"
          },
          "caseStudy": "Real estate company eliminated 20 hours of weekly data entry",
          "implementationComplexity": "Medium"
        }
      ]
    },
    {
      "problemArea": "Revenue Tracking Gaps",
      "tools": [
        {
          "name": "HubSpot Sales Analytics",
          "category": "Sales Intelligence",
          "description": "AI-powered sales analytics and forecasting",
          "pricing": "$500-1200/month",
          "bestFor": "Growing sales teams",
          "keyFeatures": ["Sales forecasting", "Pipeline analytics", "Revenue attribution"],
          "integrations": ["CRM systems", "Marketing platforms"],
          "roiData": {
            "metric": "Revenue increase",
            "improvement": "25% increase in qualified leads",
            "source": "[htttp://some-url-to-the-report]"
          },
          "caseStudy": "Manufacturing company increased revenue visibility by 40%",
          "implementationComplexity": "Medium"
        }
      ]
    }
  ]
}

Research real tools with actual pricing and verified case studies. Focus on tools that match their budget and technical capability.

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}