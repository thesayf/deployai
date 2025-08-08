import { ProblemAnalysis } from '@/types/ai-analysis-new';

export function generateStep2Prompt(analysis: ProblemAnalysis): string {
  return `Use web search to find AI tools or AI powere systems or automations that are actively being used by other companies in the market in the same industry or similar industries using web search. You are researching real tools to solve specific business problems.

BUSINESS CONTEXT:
Industry: ${analysis.businessContext.industry}
Company Size: ${analysis.businessContext.companySize}
Monthly Budget: ${analysis.businessContext.monthlyBudget}
Tech Capability: ${analysis.businessContext.techCapability}
Urgency: ${analysis.businessContext.urgency}
Current Systems: ${analysis.businessContext.currentSystems}
Integration Needs: ${analysis.businessContext.integrationNeeds}
AI Experience: ${analysis.businessContext.aiExperience}
Business Objectives: ${analysis.businessContext.businessObjectives}
Decision Authority: ${analysis.businessContext.decisionAuthority}

PROBLEMS TO SOLVE (with estimated costs/impact):
Problem 1: ${analysis.topOpportunities[0].problemArea}
Impact: ${analysis.topOpportunities[0].problemEvidence}
Search Keywords: ${analysis.topOpportunities[0].searchKeywords.join(', ')}

Problem 2: ${analysis.topOpportunities[1].problemArea}
Impact: ${analysis.topOpportunities[1].problemEvidence}
Search Keywords: ${analysis.topOpportunities[1].searchKeywords.join(', ')}

Problem 3: ${analysis.topOpportunities[2].problemArea}
Impact: ${analysis.topOpportunities[2].problemEvidence}
Search Keywords: ${analysis.topOpportunities[2].searchKeywords.join(', ')}

RESEARCH REQUIREMENTS:
For each problem area, find 3-5 real AI tools. For EACH tool, gather:
1. Verbose solution name (descriptive enough to understand function)
2. Three specific benefit promises/value propositions
3. A detailed paragraph explaining what the tool does and how it works
4. 1-3 REAL case studies with specific metrics (MUST include company description)
5. Implementation timeline estimate
6. Pricing information
7. Potential cost savings, revenue gains (annual), or other efficiency gains (e.g. time saved, % revenue increase etc)

CRITICAL DATA INTEGRITY RULES:
- NEVER make up tools, companies, or case studies
- If you cannot find specific data, use "Data not available"
- Case studies MUST be real and verifiable
- Include source URLs where available
- If fewer than 3 case studies exist, provide what's available
- All metrics must be from actual reports/testimonials

OUTPUT FORMAT (return only valid JSON):
{
  "estimatedAnnualOpportunity": "$XXX,XXX",
  "recommendedSolutions": [
    {
      "problemArea": "Customer Service Bottleneck",
      "estimatedMonthlyCost": "$X,XXX",
      "estimatedAnnualCost": "$XX,XXX",
      "tools": [
        {
          "name": "Intercom",
          "verboseName": "Intelligent Customer Response and Engagement Platform",
          "category": "Customer Service AI",
          "description": "Intercom is an AI-powered customer messaging platform that combines live chat, chatbots, and a help desk in one solution. It uses machine learning to automatically route conversations, suggest responses, and resolve common queries without human intervention. The platform learns from your team's interactions to continuously improve its automated responses.",
          "primaryBenefits": [
            "Automate 80% of repetitive customer inquiries with AI chatbots",
            "Reduce average response time from hours to seconds",
            "Scale support without proportionally increasing headcount"
          ],
          "pricing": {
            "model": "Per seat monthly",
            "range": "$39-99/month per seat",
            "setupFee": "$0",
            "notes": "Volume discounts available"
          },
          "implementationTime": "2-3 weeks",
          "caseStudies": [
            {
              "company": "Mid-size SaaS company with 200 employees",
              "industry": "Software",
              "result": "Reduced response time by 75%, handled 10,000 more tickets/month with same team size",
              "metric": "75% faster responses",
              "source": "Data not available"
            },
            {
              "company": "E-commerce retailer with $50M annual revenue",
              "industry": "Retail",
              "result": "Automated 60% of customer inquiries, saved $200K annually in support costs",
              "metric": "$200K annual savings",
              "source": "Data not available"
            }
          ],
          "annualROI": {
            "potentialSavings": "$150,000",
            "percentageImprovement": "250%",
            "paybackPeriod": "4 months"
          },
          "bestFor": "Companies with high volume repetitive inquiries",
          "integrations": ["Salesforce", "Slack", "Shopify", "HubSpot"],
          "implementationComplexity": "Low"
        }
      ]
    }
  ]
}

Focus on finding tools that:
1. Match their budget constraints
2. Provide maximum business value and ROI
3. Have proven success in similar industries
4. Can be implemented within their urgency timeline
5. Integrate with their current systems (${analysis.businessContext.currentSystems})
6. Support their business objectives (${analysis.businessContext.businessObjectives})
7. Are appropriate for their decision-making structure

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}